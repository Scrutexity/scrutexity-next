'use client';

/**
 * ClaimLifecycle — the pipeline a claim moves through.
 * Horizontal pipeline (vertical on mobile) that fills as it enters view.
 * Warm palette only.
 */

import { useReducedMotion, motion } from 'framer-motion';
import { PencilLine, Send, BadgeCheck, Radar, RefreshCw, Archive } from 'lucide-react';
import { ArtifactHeading, Reveal, MONO_STACK, EASE } from './_shared';

const STAGES = [
  { label: 'Draft', desc: 'Claim written', Icon: PencilLine },
  { label: 'Published', desc: 'Goes live', Icon: Send },
  { label: 'Verified', desc: 'Evidence linked', Icon: BadgeCheck },
  { label: 'Monitored', desc: 'Drift watched', Icon: Radar },
  { label: 'Updated', desc: 'Re-supported', Icon: RefreshCw },
  { label: 'Archived', desc: 'Retired safely', Icon: Archive },
];

export default function ClaimLifecycle() {
  const reduce = useReducedMotion();
  return (
    <section className="relative border-t border-sand-deep/15 bg-cream px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <ArtifactHeading
            kicker="Methodology · Claim Lifecycle"
            title="A claim has a lifecycle."
            italic="We govern all of it."
            body="From the first draft to safe retirement, every claim moves through the same governed pipeline — so nothing goes live, or stays live, without evidence."
          />
        </Reveal>

        <div className="mt-14">
          {/* desktop */}
          <div className="relative hidden md:block">
            <div className="absolute left-[6%] right-[6%] top-7 h-px bg-sand-deep/40" />
            <motion.div
              className="absolute left-[6%] top-7 h-px bg-sage-deep"
              initial={reduce ? { width: '88%' } : { width: 0 }}
              whileInView={{ width: '88%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE }}
            />
            <div className="relative grid grid-cols-6 gap-3">
              {STAGES.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.18 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-sage-deep/30 bg-cream shadow-[0_8px_20px_-12px_rgba(28,24,20,0.4)]">
                    <s.Icon size={18} className="text-sage-deep" />
                  </span>
                  <span
                    className="mt-3 text-[9px] uppercase tracking-[0.14em] text-mist/60"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    0{i + 1}
                  </span>
                  <p className="mt-1 font-display text-lg text-espresso">{s.label}</p>
                  <p className="mt-0.5 text-xs text-mist">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* mobile */}
          <div className="relative space-y-5 md:hidden">
            <div className="absolute bottom-6 left-7 top-6 w-px bg-sand-deep/40" />
            {STAGES.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="relative flex items-center gap-4">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-sage-deep/30 bg-cream">
                    <s.Icon size={18} className="text-sage-deep" />
                  </span>
                  <div>
                    <p className="font-display text-lg text-espresso">
                      {s.label}
                      <span className="ml-2 text-[10px] uppercase tracking-[0.12em] text-mist/50" style={{ fontFamily: MONO_STACK }}>
                        0{i + 1}
                      </span>
                    </p>
                    <p className="text-xs text-mist">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
