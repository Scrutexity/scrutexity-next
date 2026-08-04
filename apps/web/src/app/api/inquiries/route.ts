import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveInquiry, type InquiryOffer } from '@/lib/inquiries';
import { notifyInquiryOwner } from '@/lib/inquiry-notifications';
import { CLAIM_SUPPORT_PRODUCT } from '@/lib/claim-support-payment';
import { INQUIRY_OFFER_VALUES } from '@/lib/inquiry-offers';

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  websiteUrl: z.string().trim().url().max(2048),
  offer: z.enum(INQUIRY_OFFER_VALUES),
  context: z.string().trim().max(2000).optional().default(''),
  source: z.string().trim().max(100).optional().default('contact'),
  consent: z.literal(true),
  companyWebsite: z.string().max(0).optional().default(''),
});

async function createCheckout(record: {
  id: string;
  email: string;
  offer: InquiryOffer;
}, origin: string) {
  if (record.offer !== 'claim-support-review') return null;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_CLAIM_SUPPORT_REVIEW_PRICE_ID;
  if (!secretKey || !priceId) return null;

  const { Stripe } = await import('stripe');
  const stripe = new Stripe(secretKey);
  const appUrl = process.env.VERCEL_ENV === 'production'
    ? process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? origin
    : origin;
  const session = await stripe.checkout.sessions.create(
    {
      mode: 'payment',
      customer_email: record.email,
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: record.id,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/contact?intent=claim-support-review&checkout=cancelled`,
      metadata: {
        product: CLAIM_SUPPORT_PRODUCT,
        inquiryId: record.id,
        email: record.email,
        priceId,
      },
    },
    { idempotencyKey: `claim-support-review:${record.id}` },
  );
  return session.url;
}

export async function POST(request: NextRequest) {
  try {
    const parsed = inquirySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please check the required fields.' }, { status: 400 });
    }

    const idempotencyKey = request.headers.get('idempotency-key');
    if (!idempotencyKey || !/^[a-zA-Z0-9-]{16,100}$/.test(idempotencyKey)) {
      return NextResponse.json({ error: 'Invalid submission key.' }, { status: 400 });
    }

    const { companyWebsite, ...input } = parsed.data;
    if (companyWebsite) return NextResponse.json({ success: true });

    const saved = await saveInquiry(
      {
        ...input,
        context: input.context || null,
        consent: true,
      },
      idempotencyKey,
    );

    let ownerNotified = false;
    if (!saved.duplicate) {
      try {
        ownerNotified = (await notifyInquiryOwner(saved.record, 'submission')).sent;
      } catch (error) {
        console.error('[Inquiry] Owner notification failed:', error instanceof Error ? error.message : 'unknown');
      }
    }

    let checkoutUrl: string | null = null;
    try {
      checkoutUrl = await createCheckout(saved.record, request.nextUrl.origin);
    } catch (error) {
      console.error('[Inquiry] Checkout creation failed:', error instanceof Error ? error.message : 'unknown');
    }

    return NextResponse.json(
      {
        success: true,
        inquiryId: saved.record.id,
        duplicate: saved.duplicate,
        ownerNotified,
        checkoutUrl,
        checkoutAvailable: Boolean(checkoutUrl),
      },
      { status: saved.duplicate ? 200 : 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    console.error('[Inquiry] Submission failed:', message);
    const unavailable = message.startsWith('INQUIRY_STORAGE_');
    return NextResponse.json(
      { error: unavailable ? 'Intake is temporarily unavailable. No payment was taken.' : 'Unable to save the request.' },
      { status: unavailable ? 503 : 500 },
    );
  }
}
