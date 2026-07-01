'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const lux = [0.16, 1, 0.3, 1] as const;

/**
 * Lightweight scroll-reveal for subpages. Fades + lifts into view once.
 * Reliable across browsers (framer whileInView) — unlike the CSS
 * scroll-timeline `Reveal`, which only animates in Chromium.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 22,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: lux }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
