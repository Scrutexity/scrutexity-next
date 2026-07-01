'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/ui-custom/reveal';
import { CheckCircle, ArrowRight, AlertCircle, Clock, ShieldCheck, EyeOff } from 'lucide-react';

const PMS_OPTIONS = ['Boulevard', 'Mangomint', 'Zenoti', 'Other'];

const PROGRESS_STEPS = [
  { label: 'Your Info', status: 'current' as const },
  { label: 'PMS Connect', status: 'upcoming' as const },
  { label: 'Audit Scheduled', status: 'upcoming' as const },
];

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/* ── 24-hour countdown for the success screen ── */
function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState(targetMs);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.max(0, targetMs - elapsed);
      setRemaining(next);
      if (next <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetMs]);

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

/* ── 3-step progress indicator ── */
function ProgressSteps() {
  return (
    <div className="mx-auto mb-10 max-w-md">
      <div className="flex items-center justify-between">
        {PROGRESS_STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold transition-all duration-500 ${
                  s.status === 'current'
                    ? 'border-gold bg-gold/10 text-gold-deep shadow-[0_0_16px_rgba(197,160,89,0.2)]'
                    : 'border-sand-deep/30 bg-transparent text-mist'
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-500 ${
                  s.status === 'current' ? 'text-ink' : 'text-mist/60'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < PROGRESS_STEPS.length - 1 && (
              <div className="mx-2 mb-5 h-px w-12 bg-gradient-to-r from-sand-deep to-sand-deep/30 sm:w-16" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Champagne shimmer button (scoped — globals.css is locked) ──
   Replaces the champagne-shimmer-btn class with an inline equivalent:
   a gold diagonal shimmer sweeps across the button on hover. */
function ChampagneShimmerButton({
  children,
  loading,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-sage-deep text-cream relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold disabled:opacity-50"
      {...props}
    >
      {/* Champagne shimmer overlay — sweeps on hover */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <motion.span
          className="absolute inset-y-0 -left-1/2 w-1/2"
          style={{
            background:
              'linear-gradient(105deg, transparent 0%, rgba(255,250,235,0.45) 50%, transparent 100%)',
          }}
          initial={{ x: '-150%' }}
          whileHover={{ x: '350%' }}
          transition={{ duration: 0.9, ease: cinematicEase }}
        />
      </span>
      <span className="relative flex items-center gap-2">
        {loading ? 'Submitting...' : children}
      </span>
    </button>
  );
}

export default function PilotCta() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // 24-hour countdown target (only initialized once, on submit)
  const [countdownTarget] = useState(() => 24 * 60 * 60 * 1000);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      practice: (form.elements.namedItem('practice') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      pms: (form.elements.namedItem('pms') as HTMLSelectElement).value,
    };

    try {
      const res = await fetch('/api/report-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          clinic: data.practice,
          locations: [data.pms],
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg =
          body?.error ||
          'Something went wrong on our end. Email us directly at nick@scrutexity.com and we will get your audit started manually.';
        setError(msg);
        setLoading(false);
        return;
      }

      setSubmitted(true);

      // Fire conversion event for analytics (safe no-op if gtag missing).
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
          'event',
          'generate_lead',
          { value: 2000, currency: 'USD' },
        );
      }
    } catch {
      setError(
        'We could not reach the server. Email us directly at nick@scrutexity.com and we will get your audit started manually.',
      );
    }
    setLoading(false);
  };

  if (submitted) {
    return <SuccessScreen countdownTarget={countdownTarget} />;
  }

  return (
    <section id="pilot" className="bg-cream px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="sage-pill mx-auto w-fit text-[10px] uppercase tracking-[0.2em]">
            Start your pilot
          </p>
          <h2
            className="mt-5 text-center font-display text-3xl leading-tight text-ink md:text-4xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            14 days. <span className="text-sage-deep">$0</span>{" "}if missed-demand recovery
            isn&rsquo;t demonstrated.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-6 text-mist">
            Submit your details. We&rsquo;ll connect read-only, audit your last
            30 days, and deliver your recovery report within 24 hours.
          </p>
        </Reveal>

        <Reveal delay={0.15} y={18}>
          <div className="paper-glass mt-10 rounded-2xl p-8">
            {/* 3-step progress indicator */}
            <ProgressSteps />

            {/* 3-icon safety assurances row */}
            <div className="grid grid-cols-3 gap-2.5 mb-8 text-center bg-[#F5F1EB]/50 border border-sand-deep/20 rounded-xl p-3.5">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-sage/12 flex items-center justify-center text-sage-deep">
                  <ShieldCheck size={14} />
                </div>
                <div className="text-[10px] font-sans font-bold text-ink leading-tight">BAA Signed</div>
                <div className="text-[8px] font-sans text-mist leading-tight">Before connection</div>
              </div>
              
              <div className="flex flex-col items-center gap-1 border-x border-sand-deep/20 px-1">
                <div className="w-8 h-8 rounded-full bg-sage/12 flex items-center justify-center text-sage-deep">
                  <EyeOff size={14} />
                </div>
                <div className="text-[10px] font-sans font-bold text-ink leading-tight">PHI-Stripped</div>
                <div className="text-[8px] font-sans text-mist leading-tight">At clinic edge</div>
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-sage/12 flex items-center justify-center text-sage-deep">
                  <Clock size={14} />
                </div>
                <div className="text-[10px] font-sans font-bold text-ink leading-tight">Cancel Anytime</div>
                <div className="text-[8px] font-sans text-mist leading-tight">Keep your report</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-[0.12em] text-mist"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="mt-1.5 w-full rounded-xl border border-sand-deep/30 bg-[#F5F1EB] shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] px-4 py-3 text-sm text-ink outline-none transition-all duration-200 focus:border-sage focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04),0_0_0_3px_rgba(143,169,138,0.15)]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="practice"
                    className="block text-xs font-semibold uppercase tracking-[0.12em] text-mist"
                  >
                    Practice
                  </label>
                  <input
                    id="practice"
                    name="practice"
                    required
                    className="mt-1.5 w-full rounded-xl border border-sand-deep/30 bg-[#F5F1EB] shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-sage focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04),0_0_0_3px_rgba(143,169,138,0.15)]"
                    placeholder="Clinic name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-[0.12em] text-mist"
                >
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1.5 w-full rounded-xl border border-sand-deep/30 bg-[#F5F1EB] shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-sage focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04),0_0_0_3px_rgba(143,169,138,0.15)]"
                  placeholder="you@clinic.com"
                />
              </div>

              <div>
                <label
                  htmlFor="pms"
                  className="block text-xs font-semibold uppercase tracking-[0.12em] text-mist"
                >
                  Current PMS
                </label>
                <select
                  id="pms"
                  name="pms"
                  required
                  className="mt-1.5 w-full rounded-xl border border-sand-deep/30 bg-[#F5F1EB] shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-sage focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04),0_0_0_3px_rgba(143,169,138,0.15)]"
                >
                  <option value="">Select your PMS</option>
                  {PMS_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-sage/40 bg-sage/10 px-4 py-3 text-sm text-sage-deep"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span className="leading-6">{error}</span>
                </div>
              )}

              <ChampagneShimmerButton loading={loading}>
                Get My Free Diagnostic Audit
                <ArrowRight size={16} />
              </ChampagneShimmerButton>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Success screen with 24-hour countdown ── */
function SuccessScreen({ countdownTarget }: { countdownTarget: number }) {
  const { hours, minutes, seconds } = useCountdown(countdownTarget);

  return (
    <section id="pilot" className="bg-cream px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-lg text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 18, stiffness: 200 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/20"
        >
          <CheckCircle size={32} className="text-sage-deep" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: cinematicEase }}
          className="mt-6 font-display text-3xl leading-tight text-ink"
          style={{ letterSpacing: '-0.02em' }}
        >
          Welcome to the Pilot.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: cinematicEase }}
          className="mt-3 text-sm leading-6 text-mist"
        >
          Your diagnostic report will be delivered within 24 hours.
          No sales call. No commitment.
        </motion.p>

        {/* 24-hour countdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: cinematicEase }}
          className="mx-auto mt-8 inline-flex items-center gap-4 rounded-2xl border border-sand-deep/40 bg-cream px-6 py-4"
        >
          <Clock size={18} className="text-sage" />
          <div className="flex items-center gap-1.5 font-mono text-2xl font-bold text-ink tabular-nums">
            <span>{hours}</span>
            <span className="text-mist">:</span>
            <span>{minutes}</span>
            <span className="text-mist">:</span>
            <span className="text-[#C5A059]">{seconds}</span>
          </div>
        </motion.div>

        <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-mist">
          Time remaining · Step 2 of 3: PMS Connect
        </p>
      </div>
    </section>
  );
}
