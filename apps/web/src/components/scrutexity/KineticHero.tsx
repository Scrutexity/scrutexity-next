'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * KineticHero — scroll-driven kinetic typography hero (MX brief).
 *
 * The headline is the interface: as the user scrolls through the 150vh
 * runway, font-weight climbs 300 → 700 and letter-spacing widens
 * -0.02em → 0.04em, then the block fades/compresses as it leaves.
 *
 * Design-system compliance (VERIFIED tokens from globals.css @theme):
 * - `bg-paper`         (#F7F6F3)  — the ivory base (brief's #FAF9F6)
 * - `text-accent`      lime (#D9FF5C) — fill only; emphasis type uses accent-text
 * - `bg-review-amber`  (#8A6415)  — the gold accent (brief's #D4AF37)
 * - No new @theme tokens, no hardcoded hexes, no dead classes
 */
export default function KineticHero() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const fontWeight = useTransform(scrollYProgress, [0, 0.7], [300, 700]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.7], ['-0.02em', '0.04em']);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full bg-paper">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-review-amber animate-pulse" />
          Claim Intelligence Bureau
        </motion.span>

        <motion.h1
          style={reduce ? undefined : { fontWeight, letterSpacing, opacity, scale }}
          className="max-w-6xl select-none text-center text-4xl leading-[1.1] tracking-tight text-accent md:text-6xl lg:text-7xl"
        >
          See what your site claims—and what&rsquo;s missing to back it up
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-xl text-center font-sans text-sm tracking-normal text-accent/70 md:text-base"
        >
          A review record should be boring, dated, and checkable. Scrutexity
          observes public marketing claims, compares them against enforcement
          patterns, and produces a timestamped record.
        </motion.p>
      </div>
    </div>
  );
}
