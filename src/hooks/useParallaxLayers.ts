'use client';

import { useRef, useEffect, RefObject } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsapSetup';

/**
 * MODULE 5 — Parallax Depth Layers
 * 
 * Maps scroll progress to CSS translateY transforms at different speeds.
 * Three layers: background (0.1x), mid (0.3x), foreground (0.5x)
 * Uses will-change: transform for GPU acceleration.
 * prefers-reduced-motion: all layers at 1:1 (no parallax).
 */

interface ParallaxLayer {
  /** React ref for the layer element */
  ref: RefObject<HTMLElement | null>;
  /** Speed multiplier (0 = no movement, 1 = full scroll speed) */
  speed: number;
}

interface UseParallaxOptions {
  /** Container ref that defines the scroll range */
  containerRef: RefObject<HTMLElement | null>;
  /** Array of layer definitions */
  layers: ParallaxLayer[];
  /** ScrollTrigger start position. Default: 'top bottom' */
  start?: string;
  /** ScrollTrigger end position. Default: 'bottom top' */
  end?: string;
}

export function useParallaxLayers({
  containerRef,
  layers,
  start = 'top bottom',
  end = 'bottom top',
}: UseParallaxOptions) {
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion()) return; // No parallax under reduced motion

    // Mobile check — reduce parallax on small screens
    const isMobile = window.innerWidth < 768;

    layers.forEach(({ ref, speed }) => {
      const el = ref.current;
      if (!el) return;

      // On mobile, use single-layer (no parallax)
      if (isMobile) return;

      // Calculate total travel distance based on speed
      const travel = speed * 80; // max 80px displacement at speed=1

      el.style.willChange = 'transform';

      const trigger = ScrollTrigger.create({
        trigger: container,
        start,
        end,
        scrub: 1.2, // silky smooth scrub
        onUpdate: (self) => {
          const progress = self.progress; // 0 → 1
          const y = (progress - 0.5) * travel * 2; // center the motion range
          el.style.transform = `translateY(${y}px)`;
        },
      });

      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      // Clean up will-change
      layers.forEach(({ ref }) => {
        if (ref.current) ref.current.style.willChange = '';
      });
    };
  }, [containerRef, layers, start, end]);
}

/**
 * Simple single-element parallax — convenience wrapper.
 * Used for individual elements that need a subtle depth shift.
 */
export function useSimpleParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.15
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;
    if (window.innerWidth < 768) return;

    const travel = speed * 100;
    el.style.willChange = 'transform';

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        const y = (self.progress - 0.5) * travel * 2;
        el.style.transform = `translateY(${y}px)`;
      },
    });

    return () => {
      trigger.kill();
      if (el) el.style.willChange = '';
    };
  }, [ref, speed]);
}
