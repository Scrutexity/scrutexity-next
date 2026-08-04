'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';

/**
 * AmbientCursor — soft Champagne Gold radial wash that follows the cursor.
 * Creates an "illuminated paper" effect: warm white surfaces glow briefly
 * as the gold light passes over charcoal text.
 *
 * Physics: High damping (45), Low stiffness (120) — slow, intentional drift.
 * Opacity: 5% Champagne Gold (#D4AF37) — never competes with content.
 */
export default function AmbientCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const x = useSpring(0, { damping: 45, stiffness: 120, mass: 0.8 });
  const y = useSpring(0, { damping: 45, stiffness: 120, mass: 0.8 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced, x, y, visible]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: '620px',
        height: '620px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle at center, rgba(212,175,55,0.05) 0%, rgba(212,175,55,0.03) 20%, rgba(212,175,55,0.01) 45%, transparent 70%)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    />
  );
}
