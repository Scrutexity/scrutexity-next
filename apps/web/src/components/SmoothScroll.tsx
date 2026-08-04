'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Mosey-style scroll reveals: gentle, consistent fade-up driven by IntersectionObserver.
  // Reliable cross-browser (not dependent on the experimental animation-timeline API).
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const reveal = (el: Element) => el.classList.add('in', 'is-in');

    if (prefersReducedMotion) {
      // Show everything immediately, no motion.
      document.querySelectorAll('.scroll-reveal, .motion-reveal').forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const observeAll = () => {
      document
        .querySelectorAll('.scroll-reveal:not(.in), .motion-reveal:not(.is-in)')
        .forEach((el) => observer.observe(el));
    };

    observeAll();
    // Re-scan shortly after mount to catch client-rendered sections.
    const t = window.setTimeout(observeAll, 300);

    return () => {
      window.clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
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

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
