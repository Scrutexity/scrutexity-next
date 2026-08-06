import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveInquiry, type InquiryOffer } from '@/lib/inquiries';

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  // Optional: Private Assessment requests may not have a single public URL
  // (e.g. an undisclosed acquisition target). Legacy callers still send it.
  websiteUrl: z.string().trim().url().max(2048).optional().default(''),
  offer: z.enum([
    'claim-support-review',
    'founders-audit',
    'agency-claim-qa',
    'agent-evidence-pack',
    'monitoring',
    'claim-exposure-diagnostic',
    'enterprise-exposure-assessment',
    'ai-regulatory-diligence',
    'counsel-review',
    'ai-narrative-integrity',
    'private-assessment',
  ]),
  context: z.string().trim().max(2000).optional().default(''),
  source: z.string().trim().max(100).optional().default('contact'),
  consent: z.literal(true),
  companyWebsite: z.string().max(0).optional().default(''),
  // Qualification fields — Private Assessment intake only.
  company: z.string().trim().max(150).optional().default(''),
  role: z.string().trim().max(150).optional().default(''),
  companyType: z.string().trim().max(100).optional().default(''),
  entityCount: z.string().trim().max(50).optional().default(''),
  evaluating: z.string().trim().max(100).optional().default(''),
});

async function notifyOwner(record: {
  id: string;
  name: string;
  email: string;
  websiteUrl: string;
  offer: InquiryOffer;
  context: string | null;
  company?: string;
  role?: string;
  companyType?: string;
  entityCount?: string;
  evaluating?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const owner = process.env.INQUIRY_OWNER_EMAIL ?? 'nick@scrutexity.com';
  if (!apiKey || !from) return false;

  const optional = (label: string, value?: string) => (value ? `${label}: ${value}` : null);

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: owner,
    replyTo: record.email,
    subject: `New Scrutexity inquiry: ${record.offer}`,
    text: [
      `Inquiry ID: ${record.id}`,
      `Offer: ${record.offer}`,
      `Name: ${record.name}`,
      optional('Company', record.company),
      optional('Role', record.role),
      `Email: ${record.email}`,
      record.websiteUrl ? `Website: ${record.websiteUrl}` : null,
      optional('Company type', record.companyType),
      optional('Entities / locations', record.entityCount),
      optional('Evaluating', record.evaluating),
      '',
      'Context:',
      record.context || 'Not provided',
    ]
      .filter((line) => line !== null)
      .join('\n'),
  });
  if (result.error) throw new Error('OWNER_NOTIFICATION_FAILED');
  return true;
}

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
  const appUrl = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? origin;
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: record.email,
    line_items: [{ price: priceId, quantity: 1 }],
    client_reference_id: record.id,
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/contact?intent=claim-support-review&checkout=cancelled`,
    metadata: {
      product: 'claim_support_review',
      inquiryId: record.id,
      email: record.email,
    },
  });
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
        ownerNotified = await notifyOwner(saved.record);
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
        checkoutAvailable: saved.record.offer !== 'claim-support-review' || Boolean(checkoutUrl),
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
