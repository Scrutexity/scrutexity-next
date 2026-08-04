'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Pillar, Container, Eyebrow, SectionHeading, Lead } from '@/components/ui-custom/section';
import { cn } from '@/lib/utils';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  {
    num: '01',
    title: 'BAA before activation',
    body: 'A Business Associate Agreement is executed and on file before any read connection is established. PHI never enters our system without it.',
  },
  {
    num: '02',
    title: 'PHI minimized at edge',
    body: 'Identifiers and health-intent indicators are stripped at the boundary, never landing in our application layer. We see the workflow, not the patient.',
  },
  {
    num: '03',
    title: 'Read-only bridge',
    body: 'Zero write permission. We observe; we never modify your PMS, calendar, or patient files. The bridge is one-directional by design.',
  },
  {
    num: '04',
    title: 'Clinical questions escalate',
    body: 'Any message flagged as clinical halts the automated reply and routes straight to your licensed staff. No autonomous clinical decisions, ever.',
  },
  {
    num: '05',
    title: 'CPOM-conscious',
    body: 'Designed within the Compliance and Practice Oversight Model — no autonomous clinical decisions, no fee-splitting, no corporate practice of medicine.',
  },
  {
    num: '06',
    title: 'You keep every ledger entry',
    body: 'Your recovery report is yours whether you continue or not. No data retention, no strings, no lock-in. The audit trail is portable.',
  },
];

export default function AlwaysOnProtocols() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(0);

  return (
    <Pillar id="protocols" tone="cream-deep" py="normal">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow tone="gold">
            <span className="h-1 w-1 rounded-full bg-gold" />
            07 · Always-on protocols
          </Eyebrow>
          <SectionHeading className="mt-5">
            Six locks. Always engaged.
          </SectionHeading>
          <Lead className="mt-6">
            Scrutexity reads the floor without touching the floor. Every recovery is performed under
            the same six constraints — the same constraints your compliance officer will want to see
            in writing.
          </Lead>
        </div>

        {/* Compliance spine — vertical line with six nodes */}
        <div className="mt-16 relative">
          {/* Vertical spine */}
          <div
            aria-hidden
            className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-sage via-sage-deep to-sage/30"
          />

          <div className="space-y-2">
            {PILLARS.map((p, i) => {
              const isActive = active === i;
              return (
                <motion.div
                  key={p.num}
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: i * 0.05 }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(isActive ? null : i)}
                  className={cn(
                    'relative pl-12 md:pl-16 py-5 cursor-pointer transition-colors',
                    isActive ? 'bg-cream/60 rounded-xl' : 'hover:bg-cream/30 rounded-xl'
                  )}
                >
                  {/* Node on the spine */}
                  <div
                    className={cn(
                      'absolute left-0 top-6 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border-2 transition-all',
                      isActive
                        ? 'bg-sage-deep border-sage-deep text-cream shadow-cta-sage'
                        : 'bg-cream border-sage text-sage-deep'
                    )}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-semibold">
                      {p.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="ml-2">
                    <h3 className="font-display text-xl md:text-2xl text-ink leading-tight">
                      {p.title}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 8 : 0,
                      }}
                      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-sm leading-[1.6] text-mist max-w-2xl">
                        {p.body}
                      </p>
                    </motion.div>
                    {!isActive && (
                      <p className="md:hidden mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-mist/60">
                        Tap to expand
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Pillar>
  );
}
