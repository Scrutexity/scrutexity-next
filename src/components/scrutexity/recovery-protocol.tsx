'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Pillar, Container, Eyebrow, SectionHeading, Lead } from '@/components/ui-custom/section';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    num: '01',
    eyebrow: 'Diagnostic Audit',
    badge: 'READ-ONLY',
    badgeTone: 'sage' as const,
    title: 'Read-only first. Permissioned always.',
    body: 'We connect to your PMS with zero-write permissions. Within 24 hours, you receive a report detailing exactly how much demand was left on the table over the last 30 days. We observe; we never modify.',
    trust: ['Zero write access', '24-hour turnaround', '30-day lookback'],
  },
  {
    num: '02',
    eyebrow: 'Authorized Recovery',
    badge: 'CLINICAL ESCALATION',
    badgeTone: 'gold' as const,
    title: 'Every reply staff-approved before it sends.',
    body: 'Once approved, our protocol re-engages stalled patients in your clinic’s voice. Any message flagged as clinical — symptoms, contraindications, post-care questions — halts the automated reply and routes straight to your licensed staff. No autonomous clinical decisions, ever.',
    trust: ['Staff-approved before send', 'Clinical flags route to humans', 'In your clinic’s voice'],
  },
  {
    num: '03',
    eyebrow: 'Verification',
    badge: 'PMS-VERIFIED',
    badgeTone: 'sage' as const,
    title: 'A booking is only counted once the deposit lands.',
    body: 'A booking is only “Verified” once the deposit is recorded in your PMS and the appointment is synced. We report deposits, not leads. Every recovery shows up as a real line item your finance team can reconcile against.',
    trust: ['Deposit recorded in PMS', 'Appointment synced', 'Receipt-grade audit trail'],
  },
];

export default function RecoveryProtocol() {
  const reduced = useReducedMotion();

  return (
    <Pillar id="protocol" tone="cream-deep" py="normal">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow tone="sage">
            <span className="h-1 w-1 rounded-full bg-sage" />
            04 · The recovery protocol
          </Eyebrow>
          <SectionHeading className="mt-5">
            From missed inquiry to verified deposit — in three governed steps.
          </SectionHeading>
          <Lead className="mt-6">
            Every recovery moves through the same protocol. Trust is built into each step, not bolted
            on at the end. The badges you see here accompany the claim they protect — that’s the
            design principle.
          </Lead>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-8 lg:gap-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={reduced ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.12 }}
              className="relative"
            >
              {/* Connecting line between cards — visualizes the protocol flow */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="hidden lg:block absolute top-12 -right-5 w-10 h-px bg-gradient-to-r from-sage/40 to-transparent"
                />
              )}

              <div className="p-7 lg:p-8 rounded-2xl bg-cream border border-sand-deep/50 h-full flex flex-col">
                {/* Top: number + badge (distributed trust) */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage-deep">
                    {step.num}
                  </span>
                  <span
                    className={
                      step.badgeTone === 'gold'
                        ? 'gold-pill'
                        : 'sage-pill'
                    }
                  >
                    {step.badge}
                  </span>
                </div>

                {/* Eyebrow + title */}
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist/80 mb-2">
                  {step.eyebrow}
                </p>
                <h3 className="font-display text-2xl lg:text-[1.7rem] leading-[1.15] text-ink">
                  {step.title}
                </h3>

                {/* Body */}
                <p className="mt-4 font-sans text-sm leading-[1.6] text-mist flex-1">
                  {step.body}
                </p>

                {/* Trust signals inline with the step they protect */}
                <div className="mt-7 pt-5 border-t border-sand-deep/40 space-y-2">
                  {step.trust.map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className="verified-mark !h-2.5 !w-2.5 !text-[7px]" aria-hidden>
                        ✓
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-sage-deep">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Pillar>
  );
}
