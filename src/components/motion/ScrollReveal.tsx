'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * ScrollReveal — 3D Fold entrance.
 *
 * "Concierge Reveal": sections fold up from a slight 3D tilt into flat,
 * readable position. Like a fine brochure being opened.
 *
 * Variant: initial { opacity:0, y:40, rotateX:12, scale:0.98 }
 *        → animate { opacity:1, y:0, rotateX:0, scale:1 }
 * Transition: duration 1.2s, bezier(.16, 1, .3, 1) — viscous luxury.
 *
 * Respects prefers-reduced-motion (snaps to visible immediately).
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  fold = true,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
  /** Override translateY delta (default: 40) */
  y?: number;
  /** Disable 3D fold for inline / small elements (default: true) */
  fold?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={
        fold
          ? { opacity: 0, y, rotateX: 12, scale: 0.98 }
          : { opacity: 0, y }
      }
      whileInView={
        fold
          ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        transformOrigin: 'center bottom',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
}
