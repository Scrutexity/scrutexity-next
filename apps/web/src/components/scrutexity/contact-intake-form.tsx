'use client';

import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { trackEvent } from '@/utils/analytics';
import { INQUIRY_OFFERS, isPublicInquiryOffer, type InquiryOffer } from '@/lib/inquiry-offers';

const schedulingUrl = process.env.NEXT_PUBLIC_SCHEDULING_URL;

export default function ContactIntakeForm({
  initialOffer = 'buyer-narrative-alignment-sprint',
  source = 'contact',
  focusOnLoad = false,
}: {
  initialOffer?: string;
  source?: string;
  focusOnLoad?: boolean;
}) {
  const idempotencyKey = useRef(crypto.randomUUID());
  const offer: InquiryOffer = isPublicInquiryOffer(initialOffer)
    ? initialOffer
    : 'buyer-narrative-alignment-sprint';
  const [state, setState] = useState<'idle' | 'submitting' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setMessage('');
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey.current,
        },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          websiteUrl: form.get('websiteUrl'),
          context: form.get('context'),
          companyWebsite: form.get('companyWebsite'),
          offer,
          source,
          consent: form.get('consent') === 'on',
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        checkoutUrl?: string | null;
        checkoutAvailable?: boolean;
        ownerNotified?: boolean;
      };
      if (!response.ok) throw new Error(payload.error || 'Unable to save your request.');

      trackEvent('form_submit_success', { offer, source });
      if (payload.checkoutUrl) {
        window.location.assign(payload.checkoutUrl);
        return;
      }

      setState('saved');
      setMessage('Request received. Nick will review the company, requested scope, and whether the sprint is a useful fit. No payment has been taken.');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Unable to save your request.');
    }
  }

  if (state === 'saved') {
    const config = INQUIRY_OFFERS[offer];
    const emailHref = `mailto:nick@scrutexity.com?subject=${encodeURIComponent(config.subject)}`;
    const nextHref = config.scoped && schedulingUrl ? schedulingUrl : emailHref;
    const nextLabel = config.scoped && schedulingUrl ? 'Schedule the scope call' : 'Email Nick';

    return (
      <div className="rounded-lg border border-sage-deep/30 bg-white p-7">
        <CheckCircle2 className="h-6 w-6 text-sage-deep" aria-hidden="true" />
        <h2 className="mt-4 font-display text-3xl text-espresso">{config.confirmationTitle}</h2>
        <p className="mt-3 text-sm leading-6 text-mist" aria-live="polite">{message}</p>
        <div className="mt-6 border-t border-sand-deep/35 pt-5">
          <p className="text-sm leading-6 text-mist">
            No payment has been taken. Scope, required inputs, and timing are confirmed before work begins.
          </p>
          <a
            href={nextHref}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-espresso px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
          >
            {nextLabel}
          </a>
        </div>
      </div>
    );
  }

  const fieldClass = 'mt-2 min-h-11 w-full rounded-md border border-sand-deep/50 bg-white px-3 py-2.5 text-sm text-bark outline-none transition-colors placeholder:text-mist/60 focus:border-sage-deep focus:ring-2 focus:ring-sage-deep/15';

  return (
    <form className="rounded-lg border border-sand-deep/45 bg-bone p-6 sm:p-7" onSubmit={handleSubmit}>
      <h2 className="font-display text-3xl text-espresso">Request the Buyer Narrative Alignment Sprint</h2>
      <p className="mt-2 text-sm leading-6 text-mist">Nick reviews each request before confirming fit and scope. No payment is taken here.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-espresso">
          Contact name
          <input className={fieldClass} name="name" autoComplete="name" required minLength={2} autoFocus={focusOnLoad} />
        </label>
        <label className="text-sm font-medium text-espresso">
          Email
          <input className={fieldClass} name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-espresso">
        Public URL
        <input className={fieldClass} name="websiteUrl" type="url" placeholder="https://example.com/page" required />
      </label>

      <div className="mt-5">
        <p className="text-sm font-medium text-espresso">Requested review</p>
        <p className={`${fieldClass} flex items-center`}>{INQUIRY_OFFERS[offer].formLabel}</p>
        <input type="hidden" name="offer" value={offer} />
        <input type="hidden" name="intent" value="buyer-narrative-alignment-sprint" />
      </div>

      <label className="mt-5 block text-sm font-medium text-espresso">
        What decision should this review help you make? <span className="font-normal text-mist">(optional)</span>
        <textarea className={fieldClass} name="context" rows={4} maxLength={2000} />
      </label>

      <label className="sr-only" aria-hidden="true">
        Company website
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-mist">
        <input className="mt-1 h-4 w-4 accent-accent" name="consent" type="checkbox" required />
        <span>I agree that Scrutexity may use these details to respond to this request. I will not submit confidential, patient, or regulated personal data.</span>
      </label>

      {state === 'error' && <p className="mt-4 text-sm text-red-700" role="alert">{message}</p>}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep disabled:cursor-wait disabled:opacity-70"
      >
        {state === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {state === 'submitting' ? 'Saving request…' : INQUIRY_OFFERS[offer].submitLabel}
      </button>
      <div className="mt-4 space-y-2 border-t border-sand-deep/35 pt-4 text-xs leading-5 text-mist">
        <p>Your submission is used to review and respond to this request. Scrutexity does not sell inquiry information.</p>
        <p>
          Scoped engagement details, source surfaces, and timing are confirmed before payment. Work begins after payment and receipt of the agreed inputs.
        </p>
      </div>
    </form>
  );
}
