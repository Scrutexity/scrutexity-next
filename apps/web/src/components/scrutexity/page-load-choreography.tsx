'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageLoadChoreography — directed first ~900ms.
 *
 * A brief intro sequence: logo resolves → ambient glow ignites → hero settles.
 * Transforms "live DOM paint" into a cinematic experience.
 * Degrades instantly if JS fails (content is already in the DOM).
 */
export default function PageLoadChoreography() {
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }

    // Phase 0: curtain visible (0ms)
    // Phase 1: logo resolves (200ms)
    // Phase 2: glow ignites (400ms)
    // Phase 3: curtain lifts (600ms)
    // Done: 900ms
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 400);
    const t3 = setTimeout(() => setPhase(3), 600);
    const t4 = setTimeout(() => setDone(true), 950);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase >= 3 ? 0 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream pointer-events-none"
        >
          {/* Ambient glow — ignites at phase 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: phase >= 2 ? 0.6 : 0,
              scale: phase >= 2 ? 1 : 0.8,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[400px] h-[400px] rounded-full bg-sage/8 blur-3xl"
          />

          {/* Logo — resolves at phase 1 */}
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{
              opacity: phase >= 1 ? 1 : 0,
              y: phase >= 1 ? 0 : 8,
              scale: phase >= 1 ? 1 : 0.96,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center gap-2.5"
          >
            <motion.span
              animate={{
                scale: phase >= 2 ? [1, 1.08, 1] : 1,
              }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-sage-deep"
            >
              <span className="font-display text-cream text-sm font-semibold">S</span>
            </motion.span>
            <span className="font-display text-xl text-ink tracking-tight">crutexity</span>
          </motion.div>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-1/3 left-1/2 -translate-x-1/2 h-[1px] bg-sage"
            initial={{ width: 0 }}
            animate={{ width: phase >= 1 ? 120 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
