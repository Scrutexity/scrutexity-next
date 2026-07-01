'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui-custom/section';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const WORDMARKS = ['Boulevard', 'Mangomint'] as const;
const ROADMAP = ['Zenoti'] as const;

/**
 * IntegrationsStrip — "Trusted by" forward social proof.
 * Mosey-style: clean horizontal logo treatment, generous spacing.
 */
export default function IntegrationsStrip() {
  const prefersReduced = useReducedMotion();
  const animate = !prefersReduced;

  return (
    <section className="w-full bg-cream py-14 md:py-16 border-y border-sand-deep/40">
      <Container>
        <motion.div
          initial={animate ? { opacity: 0, y: 8 } : false}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          {/* Label — mosey-style centered "Trusted by" */}
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            <span className="inline-block h-1 w-1 rounded-full bg-sage" aria-hidden />
            Read-only integrations · Live today
          </div>

          {/* Wordmarks — centered, generous spacing */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
            {WORDMARKS.map((w, i) => (
              <Fragment key={w}>
                {i > 0 && (
                  <div className="hidden md:block h-8 w-px bg-sand-deep/60" aria-hidden />
                )}
                <div className="group cursor-default text-center">
                  <div className="font-display text-3xl md:text-4xl tracking-tight text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
                    {w}
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-sage-deep">
                      verified
                    </span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          {/* Roadmap — honest about what's next */}
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mist/60">
            <span className="inline-block h-1 w-1 rounded-full bg-gold" aria-hidden />
            Roadmap: Zenoti · Q3 2025
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
