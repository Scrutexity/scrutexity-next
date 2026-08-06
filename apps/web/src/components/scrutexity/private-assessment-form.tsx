'use client';

import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { trackEvent } from '@/utils/analytics';

/* Maps the visitor's stated need to the engagement it most likely becomes.
   The value is stored on the inquiry so intake is already qualified. */
const evaluatingOptions = [
  { value: 'acquisition-diligence', label: 'Acquisition / diligence', offer: 'ai-regulatory-diligence' },
  { value: 'regulatory-exposure', label: 'Regulatory exposure', offer: 'counsel-review' },
  { value: 'public-claim-risk', label: 'Public claim risk', offer: 'enterprise-exposure-assessment' },
  { value: 'ai-narrative', label: 'AI narrative', offer: 'ai-narrative-integrity' },
  { value: 'ongoing-monitoring', label: 'Ongoing monitoring', offer: 'monitoring' },
  { value: 'other', label: 'Other', offer: 'private-assessment' },
] as const;

const companyTypes = [
  'Private equity / investment firm',
  'Law firm / outside counsel',
  'Enterprise (in-house counsel or risk)',
  'Multi-location operator',
  'Healthcare or telehealth group',
  'Marketing or agency organization',
  'Other',
];

/* Intent values arriving from CTA links across the site. */
const INTENT_TO_EVALUATING: Record<string, string> = {
  diligence: 'acquisition-diligence',
  counsel: 'regulatory-exposure',
  enterprise: 'public-claim-risk',
  'ai-narrative': 'ai-narrative',
  monitoring: 'ongoing-monitoring',
  diagnostic: 'public-claim-risk',
};

/* Some entry points imply a more specific engagement than the radio group can
   express. A visitor arriving from /claim-exposure-diagnostic selects "public
   claim risk" — the same option an enterprise visitor picks — which would file
   both as enterprise leads. Where the entry point is unambiguous, it wins,
   unless the visitor changes the selection themselves. */
const INTENT_TO_OFFER: Record<string, string> = {
  diagnostic: 'claim-exposure-diagnostic',
  enterprise: 'enterprise-exposure-assessment',
};

export default function PrivateAssessmentForm({
  intent = '',
  source = 'private-assessment',
}: {
  intent?: string;
  source?: string;
}) {
  const idempotencyKey = useRef(crypto.randomUUID());
  const [evaluating, setEvaluating] = useState<string>(
    INTENT_TO_EVALUATING[intent] ?? 'acquisition-diligence',
  );
  // Once the visitor picks for themselves, their choice outranks the entry point.
  const [userChoseEvaluating, setUserChoseEvaluating] = useState(false);
  const [state, setState] = useState<'idle' | 'submitting' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setMessage('');
    const form = new FormData(event.currentTarget);

    const selected =
      evaluatingOptions.find((option) => option.value === evaluating) ?? evaluatingOptions[5];
    const offer =
      !userChoseEvaluating && INTENT_TO_OFFER[intent] ? INTENT_TO_OFFER[intent] : selected.offer;

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
          company: form.get('company'),
          role: form.get('role'),
          companyType: form.get('companyType'),
          entityCount: form.get('entityCount'),
          evaluating: selected.label,
          context: form.get('context'),
          companyWebsite: form.get('companyWebsite'),
          offer,
          source,
          consent: form.get('consent') === 'on',
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || 'Unable to send your request.');

      trackEvent('form_submit_success', { offer, source });
      setState('saved');
      setMessage(
        'Your request is recorded. We will respond directly to confirm scope, timeline, and whether an engagement is the right fit.',
      );
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Unable to send your request.');
    }
  }

  if (state === 'saved') {
    return (
      <div className="rounded-xl border border-sage-deep/40 bg-bone p-8 sm:p-10" role="status">
        <CheckCircle2 className="h-6 w-6 text-sage-deep" aria-hidden="true" />
        <h2 className="mt-5 font-display text-3xl text-espresso">Request received.</h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-mist">{message}</p>
        <p className="mt-6 max-w-xl text-xs leading-5 text-mist">
          Requests are treated as confidential. We do not publish, report, or share third-party
          findings.
        </p>
      </div>
    );
  }

  const fieldClass =
    'mt-2 min-h-11 w-full rounded-md border border-sand-deep/60 bg-bone px-3.5 py-2.5 text-sm text-bark outline-none transition-colors placeholder:text-mist/60 focus:border-clay focus:ring-2 focus:ring-clay/15';
  const labelClass = 'block text-xs font-semibold text-espresso';

  return (
    <form
      className="rounded-xl border border-sand-deep/50 bg-cream p-7 sm:p-9"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="pa-name">Name</label>
          <input id="pa-name" name="name" required minLength={2} maxLength={100} className={fieldClass} autoComplete="name" />
        </div>

        <div>
          <label className={labelClass} htmlFor="pa-company">Company</label>
          <input id="pa-company" name="company" required maxLength={150} className={fieldClass} autoComplete="organization" />
        </div>

        <div>
          <label className={labelClass} htmlFor="pa-email">Work email</label>
          <input id="pa-email" name="email" type="email" required maxLength={254} className={fieldClass} autoComplete="email" />
        </div>

        <div>
          <label className={labelClass} htmlFor="pa-role">Role</label>
          <input id="pa-role" name="role" required maxLength={150} className={fieldClass} placeholder="General Counsel, Principal, VP Risk…" />
        </div>

        <div>
          <label className={labelClass} htmlFor="pa-company-type">Company type</label>
          <select id="pa-company-type" name="companyType" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select one</option>
            {companyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="pa-entities">Number of entities / locations</label>
          <input id="pa-entities" name="entityCount" maxLength={50} className={fieldClass} placeholder="1, 12, 40+, or unknown" />
        </div>
      </div>

      <fieldset className="mt-7">
        <legend className={labelClass}>What are you evaluating?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {evaluatingOptions.map((option) => {
            const active = evaluating === option.value;
            return (
              <label
                key={option.value}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-4 py-2.5 text-sm transition-colors ${
                  active
                    ? 'border-clay bg-clay/10 text-espresso'
                    : 'border-sand-deep/60 bg-bone text-mist hover:border-clay/60'
                }`}
              >
                <input
                  type="radio"
                  name="evaluating"
                  value={option.value}
                  checked={active}
                  onChange={() => { setEvaluating(option.value); setUserChoseEvaluating(true); }}
                  className="h-3.5 w-3.5 accent-[var(--color-clay)]"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-7">
        <label className={labelClass} htmlFor="pa-context">Short description</label>
        <textarea
          id="pa-context"
          name="context"
          rows={5}
          maxLength={2000}
          className={`${fieldClass} min-h-[120px] resize-y`}
          placeholder="What decision does this need to support, and on what timeline?"
        />
      </div>

      {/* Honeypot — hidden from people, attractive to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="pa-company-website">Company website</label>
        <input id="pa-company-website" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-7 flex cursor-pointer items-start gap-3 text-xs leading-5 text-mist">
        <input type="checkbox" name="consent" required className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[var(--color-clay)]" />
        <span>
          I agree that Scrutexity may contact me about this request. Requests are treated as
          confidential.
        </span>
      </label>

      {state === 'error' ? (
        <p className="mt-5 rounded-md border border-clay/50 bg-clay/10 px-4 py-3 text-sm text-espresso" role="alert">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {state === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Request Private Assessment
            <ArrowRight size={16} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
