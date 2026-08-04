'use client';

import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { trackEvent } from '@/utils/analytics';

const offers = [
  { value: 'claim-support-review', label: 'Claim Support Review · $99' },
  { value: 'founders-audit', label: 'Founder’s Audit · from $750' },
  { value: 'agency-claim-qa', label: 'Agency Claim QA · pilot from $1,500' },
  { value: 'agent-evidence-pack', label: 'Agent Evidence Pack · pilot from $2,500' },
  { value: 'monitoring', label: 'Monitoring · later option' },
] as const;

type Offer = (typeof offers)[number]['value'];

export default function ContactIntakeForm({
  initialOffer = 'claim-support-review',
  source = 'contact',
}: {
  initialOffer?: string;
  source?: string;
}) {
  const idempotencyKey = useRef(crypto.randomUUID());
  const [offer, setOffer] = useState<Offer>(
    offers.some((item) => item.value === initialOffer) ? (initialOffer as Offer) : 'claim-support-review',
  );
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
      };
      if (!response.ok) throw new Error(payload.error || 'Unable to save your request.');

      trackEvent('form_submit_success', { offer, source });
      if (payload.checkoutUrl) {
        window.location.assign(payload.checkoutUrl);
        return;
      }

      setState('saved');
      setMessage(
        offer === 'claim-support-review' && payload.checkoutAvailable === false
          ? 'Your request is saved. Checkout is temporarily unavailable, so no payment was taken. Nick will follow up with next steps.'
          : 'Your request is saved. Nick will follow up with scope and next steps.',
      );
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Unable to save your request.');
    }
  }

  if (state === 'saved') {
    return (
      <div className="rounded-lg border border-sage-deep/30 bg-white p-7" role="status">
        <CheckCircle2 className="h-6 w-6 text-sage-deep" aria-hidden="true" />
        <h2 className="mt-4 font-display text-3xl text-espresso">Request received.</h2>
        <p className="mt-3 text-sm leading-6 text-mist">{message}</p>
      </div>
    );
  }

  const fieldClass = 'mt-2 min-h-11 w-full rounded-md border border-sand-deep/50 bg-white px-3 py-2.5 text-sm text-bark outline-none transition-colors placeholder:text-mist/60 focus:border-sage-deep focus:ring-2 focus:ring-sage-deep/15';

  return (
    <form className="rounded-lg border border-sand-deep/45 bg-bone p-6 sm:p-7" onSubmit={handleSubmit}>
      <h2 className="font-display text-3xl text-espresso">Start the conversation</h2>
      <p className="mt-2 text-sm leading-6 text-mist">Your request is stored before any checkout begins.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-espresso">
          Contact name
          <input className={fieldClass} name="name" autoComplete="name" required minLength={2} />
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

      <label className="mt-5 block text-sm font-medium text-espresso">
        Requested review
        <select className={fieldClass} name="offer" value={offer} onChange={(event) => setOffer(event.target.value as Offer)}>
          {offers.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </label>

      <label className="mt-5 block text-sm font-medium text-espresso">
        What decision should this review help you make? <span className="font-normal text-mist">(optional)</span>
        <textarea className={fieldClass} name="context" rows={4} maxLength={2000} />
      </label>

      <label className="sr-only" aria-hidden="true">
        Company website
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-mist">
        <input className="mt-1 h-4 w-4 accent-[#5e7a5a]" name="consent" type="checkbox" required />
        <span>I agree that Scrutexity may use these details to respond to this request. I will not submit confidential, patient, or regulated personal data.</span>
      </label>

      {state === 'error' && <p className="mt-4 text-sm text-red-700" role="alert">{message}</p>}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep disabled:cursor-wait disabled:opacity-70"
      >
        {state === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {state === 'submitting' ? 'Saving request…' : offer === 'claim-support-review' ? 'Continue with the $99 review' : 'Send inquiry'}
      </button>
      <p className="mt-3 text-center text-xs text-mist">No payment is taken until a Stripe checkout page opens.</p>
    </form>
  );
}
