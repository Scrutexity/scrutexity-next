import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { unlockAudit } from '../../../../lib/entitlements';
import { markInquiryPaid } from '../../../../lib/inquiries';
import { notifyInquiryOwner } from '../../../../lib/inquiry-notifications';
import { CLAIM_SUPPORT_PRODUCT, verifyClaimSupportSession } from '../../../../lib/claim-support-payment';

const ENTITLEMENTS: Record<string, 'snapshot' | 'full_report' | 'monitoring' | 'agency'> = {
  claim_intelligence_report: 'full_report',
  claim_drift_monitoring: 'monitoring',
  agency_founding_beta: 'agency',
  agency_partner: 'agency',
};

export async function POST(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === 'production';
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  let stripe: Stripe;
  const rawBody = await req.text();

  try {
    const { Stripe: StripeClient } = await import('stripe');
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not configured.');
    }

    stripe = new StripeClient(process.env.STRIPE_SECRET_KEY);

    if (isProduction || webhookSecret) {
      if (!sig || !webhookSecret) {
        console.error('[Stripe Webhook] Error: Missing stripe-signature or STRIPE_WEBHOOK_SECRET in production.');
        return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
      }
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } else {
      console.warn('[Stripe Webhook] Warning: Running in development mode without signature verification.');
      event = JSON.parse(rawBody);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown webhook error';
    console.error(`[Stripe Webhook] Signature verification failed: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session;

    const paymentStatus = session.payment_status;
    const metadata = session.metadata || {};
    const product = metadata.product;
    const publicId = metadata.publicId || metadata.public_id;
    const email = metadata.email || session.customer_details?.email || null;
    const stripeSessionId = session.id;
    const stripeCustomerId = typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id ?? null;
    const priceId = session.line_items?.data?.[0]?.price?.id || session.metadata?.priceId || null;
    const amountTotal = session.amount_total;
    const currency = session.currency;

    console.log('[Stripe Webhook] checkout.session.completed received:', {
      stripeSessionId,
      paymentStatus,
      product,
      publicId,
    });

    if (paymentStatus !== 'paid') {
      console.log(`[Stripe Webhook] Ignored checkout session ${stripeSessionId} with payment_status: ${paymentStatus}`);
      return NextResponse.json({ success: true, message: 'Session ignored (unpaid)' });
    }

    if (product === CLAIM_SUPPORT_PRODUCT) {
      try {
        const configuredPriceId = process.env.STRIPE_CLAIM_SUPPORT_REVIEW_PRICE_ID;
        if (!configuredPriceId) {
          return NextResponse.json({ error: 'Payment configuration is incomplete' }, { status: 500 });
        }
        const verified = await verifyClaimSupportSession(stripe, session, configuredPriceId);
        if (!verified.valid) {
          console.error(`[Stripe Webhook] Rejected claim review payment: ${verified.reason}`);
          return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
        }
        const paid = await markInquiryPaid({
          id: verified.inquiryId,
          stripeSessionId,
          stripePriceId: verified.priceId,
          amountTotal: verified.amountTotal,
          currency: verified.currency,
        });
        try {
          await notifyInquiryOwner(paid.record, 'payment');
        } catch (notificationError) {
          console.error('[Stripe Webhook] Paid owner notification failed:', notificationError instanceof Error ? notificationError.message : 'unknown');
        }
        console.log(`[Stripe Webhook] Claim review payment processed; state changed: ${paid.changed}`);
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error('[Stripe Webhook] Failed to mark inquiry paid:', error instanceof Error ? error.message : 'unknown');
        return NextResponse.json({ error: 'Inquiry update failed' }, { status: 500 });
      }
    }

    if (!product || !ENTITLEMENTS[product]) {
      console.log(`[Stripe Webhook] Ignored checkout session ${stripeSessionId} with unknown product: ${product}`);
      return NextResponse.json({ success: true, message: 'Session ignored (unknown product)' });
    }

    if (!publicId) {
      console.error(`[Stripe Webhook] Error: Missing publicId for paid product ${product} in session ${stripeSessionId}`);
      return NextResponse.json({ error: 'Missing publicId in metadata' }, { status: 400 });
    }

    const entitlement = ENTITLEMENTS[product];

    try {
      await unlockAudit({
        publicId,
        email,
        stripeSessionId,
        stripeCustomerId,
        priceId,
        amountTotal,
        currency,
        entitlement,
      });
      console.log(`[Stripe Webhook] Successfully unlocked audit ${publicId} with entitlement ${entitlement}`);

      // Send email via Resend if API key exists and email is known
      if (process.env.RESEND_API_KEY && email) {
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);
          const origin = req.nextUrl.origin;
          const reportUrl = `${origin}/claim-audit/${publicId}`;

          await resend.emails.send({
            from: 'Scrutexity <onboarding@resend.dev>',
            to: email,
            subject: 'Your full AuditGPT Claim Exposure Audit is ready.',
            text: `Hi,

Your full AuditGPT Claim Exposure Audit is ready.

You can access the report immediately here:
${reportUrl}

Next: Activate your Claim Cleanup Record — $1,997.
If you are ready to address these claim risk findings and secure your proof surface, reply to this email to request your Claim Cleanup Record.

Not legal, clinical, regulatory, or medical advice.

Best,
The Scrutexity Team
www.scrutexity.com`,
          });
          console.log(`[Stripe Webhook] Sent payment confirmation email to ${email}`);
        } catch (emailErr: unknown) {
          console.error(`[Stripe Webhook] Failed to send email: ${emailErr instanceof Error ? emailErr.message : 'unknown'}`);
        }
      } else {
        console.log('[Stripe Webhook] Email skipped (no API key, or customer email is null)');
      }
    } catch (dbErr: unknown) {
      console.error(`[Stripe Webhook] Failed to save entitlement to DB: ${dbErr instanceof Error ? dbErr.message : 'unknown'}`);
      return NextResponse.json({ error: 'Database write failed' }, { status: 500 });
    }
  } else {
    console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ success: true });
}
