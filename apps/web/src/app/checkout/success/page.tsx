import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Clock3 } from 'lucide-react';
import { verifyClaimSupportSession } from '@/lib/claim-support-payment';

export const metadata: Metadata = {
  title: 'Payment received | Scrutexity',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  let paid = false;

  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      const { Stripe } = await import('stripe');
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const priceId = process.env.STRIPE_CLAIM_SUPPORT_REVIEW_PRICE_ID;
      if (priceId) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        paid = (await verifyClaimSupportSession(stripe, session, priceId)).valid;
      }
    } catch (error) {
      console.error('[CheckoutSuccess] Verification failed:', error instanceof Error ? error.message : 'unknown');
    }
  }

  return (
    <main className="min-h-screen bg-cream px-5 pb-20 pt-32 text-bark sm:px-8 md:pt-40">
      <div className="mx-auto max-w-2xl rounded-lg border border-sand-deep/45 bg-white p-8 sm:p-10">
        {paid ? <CheckCircle2 className="h-7 w-7 text-sage-deep" aria-hidden="true" /> : <Clock3 className="h-7 w-7 text-sage-deep" aria-hidden="true" />}
        <h1 className="mt-5 font-display text-4xl text-espresso">{paid ? 'Payment confirmed.' : 'Payment confirmation pending.'}</h1>
        <p className="mt-4 text-base leading-7 text-mist">
          {paid
            ? 'Your Claim Support Review is in the queue. Nick will confirm the reviewed URL and delivery timing by email.'
            : 'No report access has been unlocked. If you completed payment, confirmation may still be processing; contact Nick with your checkout email.'}
        </p>
        <Link href="/contact?intent=claim-support-review" className="mt-7 inline-flex min-h-11 items-center rounded-md bg-espresso px-5 py-2.5 text-sm font-semibold text-cream hover:bg-sage-deep">
          Return to contact
        </Link>
      </div>
    </main>
  );
}
