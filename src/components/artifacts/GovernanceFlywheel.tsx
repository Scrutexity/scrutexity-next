'use client';

/**
 * GovernanceFlywheel — the continuous governance loop.
 * Audit → Rewrite → Evidence → Publish → Monitor → (repeat). Slow, elegant
 * continuous rotation; pauses for reduced motion. Warm palette.
 */

import { useReducedMotion, motion } from 'framer-motion';
import { Search, PencilLine, BookOpen, Send, Radar } from 'lucide-react';
import { ArtifactHeading, Reveal, MONO_STACK } from './_shared';

const NODES = [
  { label: 'Audit', Icon: Search },
  { label: 'Rewrite', Icon: PencilLine },
  { label: 'Evidence', Icon: BookOpen },
  { label: 'Publish', Icon: Send },
  { label: 'Monitor', Icon: Radar },
];

export default function GovernanceFlywheel() {
  const reduce = useReducedMotion();
  const radius = 38; // % of container

  return (
    <section className="relative border-t border-sand-deep/15 bg-beige/40 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <ArtifactHeading
              kicker="The Governance Flywheel"
              title="Governance isn't a project."
              italic="It's a loop."
              body="Audit finds the gaps. Rewrite closes them. Evidence backs them. Publish ships them. Monitoring catches drift — and the wheel turns again. Each turn compounds trust."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {NODES.map((n) => (
                <span
                  key={n.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sand-deep/40 bg-cream px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-sage-deep"
                  style={{ fontFamily: MONO_STACK }}
                >
                  <n.Icon size={11} />
                  {n.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              {/* rotating ring */}
              <motion.div
                className="absolute inset-[14%] rounded-full border border-dashed border-sage-deep/30"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-[26%] rounded-full border border-sand-deep/30" />

              {/* center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="font-display text-xl text-espresso">Governed</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO_STACK }}>
                  claims
                </p>
              </div>

              {/* nodes around the circle */}
              {NODES.map((n, i) => {
                const angle = (i / NODES.length) * 2 * Math.PI - Math.PI / 2;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <motion.div
                    key={n.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                    whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-sage-deep/30 bg-cream shadow-[0_8px_20px_-12px_rgba(28,24,20,0.45)]">
                        <n.Icon size={16} className="text-sage-deep" />
                      </span>
                      <span
                        className="rounded-full bg-cream/80 px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-espresso"
                        style={{ fontFamily: MONO_STACK }}
                      >
                        {n.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
