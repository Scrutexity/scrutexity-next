'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Anchor, Container, Eyebrow } from '@/components/ui-custom/section';
import { cn } from '@/lib/utils';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const PMS_OPTIONS = ['Boulevard', 'Mangomint', 'Other'] as const;
type PMS = (typeof PMS_OPTIONS)[number];

interface FieldErrors {
  name?: string;
  practice?: string;
  email?: string;
  pms?: string;
}

interface ApiResponse {
  ok: boolean;
  error?: string;
  fieldErrors?: FieldErrors;
  message?: string;
  deduped?: boolean;
  submissionId?: string;
}

export default function PilotCta() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0); // 0 = info, 1 = PMS, 2 = done
  const [form, setForm] = useState({
    name: '',
    practice: '',
    email: '',
    pms: '' as PMS | '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deduped, setDeduped] = useState(false);

  const canAdvance = (s: number) => {
    if (s === 0) return form.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (s === 1) return Boolean(form.pms);
    return false;
  };

  const handleFieldChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error on edit
    if (errors[field as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setServerError('');
    setErrors({});

    try {
      const res = await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data: ApiResponse = await res.json();

      if (!data.ok) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
          // If PMS error, stay on step 1; otherwise go back to step 0
          if (data.fieldErrors.pms) setStep(1);
          else if (data.fieldErrors.name || data.fieldErrors.email) setStep(0);
        } else {
          setServerError(data.error || 'Something went wrong. Please try again.');
        }
        setSubmitting(false);
        return;
      }

      setDeduped(Boolean(data.deduped));
      setStep(2);
    } catch {
      setServerError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 0 && canAdvance(0)) {
      setErrors({});
      setStep(1);
    } else if (step === 1 && canAdvance(1)) {
      handleSubmit();
    }
  };

  return (
    <Anchor id="pilot" tone="cream" py="loose" className="relative overflow-hidden">
      {/* Teal + gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(197,160,89,0.14), transparent 60%), radial-gradient(ellipse 50% 40% at 50% 80%, rgba(15,118,110,0.14), transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow tone="gold" className="justify-center">
            <span className="h-1 w-1 rounded-full bg-gold" />
            08 · Start your pilot
          </Eyebrow>

          <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-ink">
            14 days. <span className="text-gold-deep">$0.</span> If we don&rsquo;t recover a documented deposit, you owe nothing.
          </h2>

          <p className="mt-6 font-sans text-base md:text-lg leading-[1.6] text-mist max-w-xl mx-auto">
            We connect read-only under a signed BAA, audit your last 30 days, and deliver your
            recovery report within one business day. What happens next is your call.
          </p>

          {/* Distributed trust — BAA pill inline with the offer */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span className="sage-pill">
              <span className="verified-mark !h-2 !w-2 !text-[7px]" aria-hidden>✓</span>
              BAA before activation
            </span>
            <span className="sage-pill">PHI stripped before processing</span>
            <span className="sage-pill">Cancel anytime, keep your report</span>
          </div>

          {/* Multi-step form */}
          <div className="mt-12 paper-glass rounded-2xl p-7 md:p-10 text-left max-w-xl mx-auto">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-8">
              {[0, 1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={cn(
                      'flex items-center justify-center h-7 w-7 rounded-full border-2 font-mono text-[10px] font-semibold transition-all',
                      step >= s
                        ? 'bg-sage-deep border-sage-deep text-cream'
                        : 'bg-cream border-sand-deep text-mist'
                    )}
                  >
                    {step > s ? '✓' : s + 1}
                  </div>
                  {s < 2 && (
                    <div className="flex-1 h-px bg-sand-deep mx-1 relative">
                      <motion.div
                        className="absolute inset-0 bg-sage-deep origin-left"
                        initial={false}
                        animate={{ scaleX: step > s ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={reduced ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                  className="space-y-4"
                >
                  <FormField
                    label="Your name"
                    error={errors.name}
                    value={form.name}
                    onChange={(v) => handleFieldChange('name', v)}
                    placeholder="Alex Chen"
                    autoComplete="name"
                    disabled={submitting}
                  />
                  <FormField
                    label="Practice name"
                    error={errors.practice}
                    value={form.practice}
                    onChange={(v) => handleFieldChange('practice', v)}
                    placeholder="Lumen Aesthetics"
                    autoComplete="organization"
                    disabled={submitting}
                    required={false}
                  />
                  <FormField
                    label="Work email"
                    error={errors.email}
                    value={form.email}
                    onChange={(v) => handleFieldChange('email', v)}
                    placeholder="alex@lumenaesthetics.com"
                    type="email"
                    autoComplete="email"
                    disabled={submitting}
                  />
                  <button
                    onClick={handleNext}
                    disabled={!canAdvance(0) || submitting}
                    className="sage-cta w-full mt-2 inline-flex items-center justify-center rounded-lg px-6 py-3.5 font-sans text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue
                    <span className="ml-2" aria-hidden>→</span>
                  </button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={reduced ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist mb-4">
                    Select your PMS
                  </p>
                  {errors.pms && (
                    <p className="mb-3 text-sm text-red-700 font-sans">{errors.pms}</p>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {PMS_OPTIONS.map((p) => (
                      <button
                        key={p}
                        onClick={() => handleFieldChange('pms', p)}
                        disabled={submitting}
                        className={cn(
                          'px-4 py-4 rounded-lg border-2 font-sans text-sm font-semibold transition-all',
                          form.pms === p
                            ? 'border-sage-deep bg-sage/10 text-sage-deep'
                            : 'border-sand-deep bg-cream/40 text-mist hover:border-sage',
                          submitting && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep(0)}
                      disabled={submitting}
                      className="gold-cta flex-1 inline-flex items-center justify-center rounded-lg px-4 py-3.5 font-sans text-sm font-semibold disabled:opacity-50"
                    >
                      <span className="mr-2" aria-hidden>←</span>
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!canAdvance(1) || submitting}
                      className="sage-cta flex-[2] inline-flex items-center justify-center rounded-lg px-6 py-3.5 font-sans text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <span
                            className="mr-2 inline-block h-3.5 w-3.5 rounded-full border-2 border-cream/40 border-t-cream animate-spin"
                            aria-hidden
                          />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Get my free diagnostic audit
                          <span className="ml-2" aria-hidden>→</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={reduced ? false : { scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ ...{ type: 'spring' as const, stiffness: 220, damping: 18 }, delay: 0.1 }}
                    className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-sage/15 mb-5"
                  >
                    <span className="verified-mark !h-8 !w-8 !text-base" aria-hidden>✓</span>
                  </motion.div>
                  <h3 className="font-display text-2xl text-ink">
                    {deduped ? 'We\u2019ll be in touch.' : 'Audit scheduled.'}
                  </h3>
                  <p className="mt-3 font-sans text-sm text-mist max-w-sm mx-auto">
                    {deduped
                      ? 'We already have your request on file. Our team will reach out within one business day.'
                      : 'We\u2019ll send a BAA for signature, then connect read-only and deliver your 30-day recovery report within one business day.'}
                  </p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-sage-deep">
                    Confirmation sent to {form.email || 'your inbox'}
                  </p>
                  <button
                    onClick={() => {
                      setStep(0);
                      setForm({ name: '', practice: '', email: '', pms: '' });
                      setDeduped(false);
                    }}
                    className="mt-6 gold-cta inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-sans text-xs font-semibold"
                  >
                    Submit another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Server error (non-field-specific) */}
            <AnimatePresence>
              {serverError && step < 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-800 font-sans text-sm"
                >
                  {serverError}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Anchor>
  );
}

// ── Reusable form field with inline validation ──────────────────────────────

function FormField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  autoComplete,
  disabled,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: 'text' | 'email';
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist block mb-2"
      >
        {label}
        {!required && <span className="ml-1.5 normal-case text-mist/50">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full px-4 py-3 rounded-lg border bg-cream/60 font-sans text-sm text-ink placeholder:text-mist/50 focus:outline-none focus:ring-2 transition-all',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
            : 'border-sand-deep focus:border-sage focus:ring-sage/20',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs text-red-700 font-sans"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
