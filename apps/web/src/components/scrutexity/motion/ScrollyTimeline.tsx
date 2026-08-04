'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    num: '01',
    title: 'Extraction',
    desc: 'System ingests your page URL, parses the raw HTML, and extracts explicit marketing claims.',
  },
  {
    num: '02',
    title: 'Pattern Match',
    desc: 'Claims are compared against enforcement-pattern references, FTC/FDA source material, and public claim-risk signals.',
  },
  {
    num: '03',
    title: 'Distortion Capture',
    desc: 'Detects evidence gaps, structural overstatements, and potential AI reply inaccuracies.',
  },
  {
    num: '04',
    title: 'Receipt Sealed',
    desc: 'Compiles standard CRT records, generates SHA256 hashes, and commits to the immutable digest.',
  },
];

export function ScrollyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 45, damping: 15 });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-2xl px-4 py-16">
      {/* Scroll-driven Vertical Line */}
      {!shouldReduce && (
        <div className="absolute left-[33px] top-6 bottom-6 w-px bg-sand-deep/30">
          <motion.div
            className="w-full bg-sage-deep origin-top"
            style={{ height: '100%', scaleY: pathLength }}
          />
        </div>
      )}

      <div className="space-y-12">
        {steps.map((step, idx) => (
          <motion.div
            key={step.num}
            initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE, delay: idx * 0.1 }}
            className="relative flex gap-6 items-start"
          >
            {/* Step Number Circle */}
            <div className="z-10 flex h-[18px] w-[18px] translate-x-[24px] items-center justify-center rounded-full bg-cream ring-4 ring-cream border border-sand-deep">
              <span className="font-mono text-[9px] font-bold text-espresso">{step.num}</span>
            </div>

            {/* Information Card */}
            <div className="flex-1 ml-10 rounded-2xl border border-sand-deep/40 bg-bone p-5 hover:border-sand-deep transition-all duration-300">
              <span className="font-mono text-[10px] uppercase text-sage-deep font-semibold">
                Phase {step.num}
              </span>
              <h3 className="mt-1 font-display text-xl text-espresso">{step.title}</h3>
              <p className="mt-2 text-sm text-mist leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
