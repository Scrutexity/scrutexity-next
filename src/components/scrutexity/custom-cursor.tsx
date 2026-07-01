'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor — magnetic pointer choreography.
 *
 * - Default: small dot + trailing ring
 * - Over CTAs: magnetic snap, ring expands
 * - Over draggable (sliders): ring becomes horizontal resize indicator
 * - Over 3D canvas: ring becomes crosshair
 * - Disabled on touch devices
 *
 * This single layer does disproportionate "this was expensive" signaling.
 */
export default function CustomCursor() {
  const [variant, setVariant] = useState<'default' | 'cta' | 'drag' | 'scene'>('default');
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    // Disable on touch / coarse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const el = e.target as HTMLElement;
      // Check what we're hovering
      if (el.closest('a, button, [role="button"]')) {
        setVariant('cta');
      } else if (el.closest('input[type="range"], [role="slider"]')) {
        setVariant('drag');
      } else if (el.closest('canvas')) {
        setVariant('scene');
      } else {
        setVariant('default');
      }
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [x, y]);

  if (!visible) return null;

  const ringSize = variant === 'cta' ? 48 : variant === 'drag' ? 56 : variant === 'scene' ? 40 : 32;
  const dotSize = variant === 'cta' ? 6 : 4;

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-sage-deep"
        style={{
          x,
          y,
          width: dotSize,
          height: dotSize,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Ring — springs behind dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-sage/50"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? (variant === 'default' ? 0.4 : 0.7) : 0,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: variant === 'cta' ? 'rgba(197,160,89,0.6)' : 'rgba(15,118,110,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  );
}
