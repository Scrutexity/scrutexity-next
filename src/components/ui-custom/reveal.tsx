'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/* ── Stagger variants ── */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Single reveal wrapper ── */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
}: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
