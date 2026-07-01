'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Shared GSAP defaults — warm luxury easing
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
});

// Reduced motion detection utility
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Re-export for convenience
export { gsap, ScrollTrigger };
