'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScrollProvider — wraps children with Lenis smooth scrolling.
 *
 * - Lenis with lerp 0.08, smoothWheel true
 * - Disabled when prefers-reduced-motion: reduce
 * - rAF loop is properly cleaned up on unmount
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
