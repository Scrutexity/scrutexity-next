'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Bridge, Container, Eyebrow } from '@/components/ui-custom/section';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Proof — honest pilot-evidence framing.
 *
 * No fabricated client outcomes. The three metrics below describe the pilot
 * experience itself — what you'll see inside your own PMS during your 14-day
 * pilot — not invented recoveries from invented clients. Case studies publish
 * only when we have real, supportable examples.
 */
const PILOT_METRICS = [
  {
    value: '≤ 24h',
    label: 'TO FIRST AUDIT REPORT',
    body: 'Read-only connection surfaces your missed-demand baseline within one business day.',
  },
  {
    value: '4 min',
    label: 'MEDIAN RE-ENGAGEMENT',
    body: 'Staff-approved outreach routed inside the cooling window — no autonomous clinical contact.',
  },
  {
    value: '100%',
    label: 'DEPOSIT-VERIFIED',
    body: 'We report deposits recorded in your PMS, not leads. Receipt-grade audit trail, yours whether you continue or not.',
  },
];

export default function Proof() {
  const reduced = useReducedMotion();

  return (
    <Bridge id="proof" tone="sand" py="loose" className="!py-20 md:!py-28">
      <Container>
        {/* Heading */}
        <div className="max-w-2xl mb-12">
          <Eyebrow tone="sage">
            <span className="h-1 w-1 rounded-full bg-sage" />
            06 · Pilot evidence
          </Eyebrow>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.05 }}
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-ink"
          >
            Pilot evidence, not vanity metrics.
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
            className="mt-5 font-sans text-base md:text-lg leading-[1.6] text-mist max-w-xl"
          >
            Every number below is produced inside your own PMS during your 14-day pilot —
            receipt-grade, independently verifiable, yours to keep.
          </motion.p>
        </div>

        {/* Pilot-metric cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-14">
          {PILOT_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.1 }}
              className="border-l-2 border-sage pl-6"
            >
              <p className="font-display text-5xl md:text-6xl text-ink tabular-nums leading-none">
                {m.value}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-sage-deep font-semibold">
                {m.label}
              </p>
              <p className="mt-3 font-sans text-sm md:text-base text-mist leading-[1.55]">
                {m.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-sage-deep flex items-center gap-2"
        >
          <span className="verified-mark" aria-hidden>✓</span>
          Deposit-verified recoveries — not leads, not estimates, not vanity metrics
        </motion.p>

        {/* Honest evidence card — replaces fabricated case studies */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className="mt-16 pt-12 border-t border-sand-deep/50"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist mb-8">
            Where the case studies are
          </p>
          <div className="relative overflow-hidden rounded-2xl bg-cream border border-sand-deep/50 p-8 md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(15,118,110,0.08), transparent 60%), radial-gradient(ellipse 40% 30% at 15% 90%, rgba(197,160,89,0.10), transparent 60%)',
              }}
            />
            <div className="relative z-10 grid md:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="font-display text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.15] text-ink">
                  Case studies publish when we have real, supportable examples.
                </h3>
                <p className="mt-5 font-sans text-base md:text-lg leading-[1.6] text-mist max-w-xl">
                  Until then, your pilot is the case study. We will not invent client outcomes,
                  fabricate dollar figures, or attribute quotes to operators we have not worked with.
                  What you see during your 14-day pilot is what a case study would say — and your
                  PMS ledger is the source of record.
                </p>
              </div>
              <div className="md:text-right">
                <a
                  href="#pilot"
                  className="sage-cta inline-flex items-center justify-center rounded-lg px-7 py-3.5 font-sans text-sm font-semibold tracking-tight"
                >
                  Start your 14-day pilot
                  <span className="ml-2" aria-hidden>→</span>
                </a>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-sage-deep">
                  14 days · $0 · BAA before activation
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Bridge>
  );
}
