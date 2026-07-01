'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const enabled = process.env.NEXT_PUBLIC_ENABLE_2026_UI === 'true';

export default function PageTransition({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  if (!enabled || reducedMotion) return children;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.995 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
