'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScrollProvider — Lenis smooth scroll.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (reduced || isTouch) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => { lenis.destroy(); };
  }, []);

  return <>{children}</>;
}
