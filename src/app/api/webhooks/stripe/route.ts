import { NextRequest, NextResponse } from 'next/server';
import { unlockAudit } from '../../../../lib/entitlements';

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

  let event: any;
  const rawBody = await req.text();

  try {
    const StripeMod = await import('stripe');
    const StripeClass = (StripeMod.default || StripeMod.Stripe || StripeMod) as any;
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not configured.');
    }

    const stripe = new StripeClass(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-03-31.basil' as any,
    });

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
  } catch (err: any) {
    console.error(`[Stripe Webhook] Signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const paymentStatus = session.payment_status;
    const metadata = session.metadata || {};
    const product = metadata.product;
    const publicId = metadata.publicId || metadata.public_id;
    const email = metadata.email || session.customer_details?.email || null;
    const stripeSessionId = session.id;
    const stripeCustomerId = session.customer;
    const priceId = session.line_items?.data?.[0]?.price?.id || session.metadata?.priceId || null;
    const amountTotal = session.amount_total;
    const currency = session.currency;

    console.log('[Stripe Webhook] checkout.session.completed received:', {
      stripeSessionId,
      paymentStatus,
      product,
      publicId,
      email,
    });

    if (paymentStatus !== 'paid') {
      console.log(`[Stripe Webhook] Ignored checkout session ${stripeSessionId} with payment_status: ${paymentStatus}`);
      return NextResponse.json({ success: true, message: 'Session ignored (unpaid)' });
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
            subject: 'Your full AuditGPT Claim Intelligence Report is ready.',
            text: `Hi,

Your full AuditGPT Claim Intelligence Report is ready.

You can access the report immediately here:
${reportUrl}

Next: Activate the Med Spa Claim Cleanup Sprint — $1,997.
If you are ready to eliminate these compliance risks, fix the visibility gaps, and secure your proof surface, reply to this email to book your Claim Cleanup Sprint.

Best,
The Scrutexity Team
www.scrutexity.com`,
          });
          console.log(`[Stripe Webhook] Sent payment confirmation email to ${email}`);
        } catch (emailErr: any) {
          console.error(`[Stripe Webhook] Failed to send email: ${emailErr.message}`);
        }
      } else {
        console.log('[Stripe Webhook] Email skipped (no API key, or customer email is null)');
      }
    } catch (dbErr: any) {
      console.error(`[Stripe Webhook] Failed to save entitlement to DB: ${dbErr.message}`);
      return NextResponse.json({ error: 'Database write failed' }, { status: 500 });
    }
  } else {
    console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ success: true });
}
