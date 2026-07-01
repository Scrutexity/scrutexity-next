'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * useMagneticEffect — Hook for magnetic pull on CTA buttons
 * 
 * When cursor enters a magnetic element's bounding area, the element
 * translates toward the cursor position (strength: 0.3, max 8px).
 * Uses CSS transforms exclusively for GPU-composited 120fps smoothness.
 */

interface MagneticOptions {
  /** Pull strength multiplier (0-1). Default: 0.3 */
  strength?: number;
  /** Maximum displacement in pixels. Default: 8 */
  maxDisplacement?: number;
  /** Detection radius multiplier around element bounds. Default: 1.4 */
  detectionRadius?: number;
}

export function useMagneticEffect(
  ref: React.RefObject<HTMLElement | null>,
  options: MagneticOptions = {}
) {
  const { strength = 0.3, maxDisplacement = 8, detectionRadius = 1.4 } = options;
  const isTouch = useRef(false);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el || isTouch.current) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Expanded detection area
    const expandedW = rect.width * detectionRadius;
    const expandedH = rect.height * detectionRadius;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const isInRange =
      Math.abs(dx) < expandedW / 2 && Math.abs(dy) < expandedH / 2;

    if (isInRange) {
      const moveX = Math.max(-maxDisplacement, Math.min(maxDisplacement, dx * strength));
      const moveY = Math.max(-maxDisplacement, Math.min(maxDisplacement, dy * strength));
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      el.style.transform = 'translate(0px, 0px)';
    }
  }, [ref, strength, maxDisplacement, detectionRadius]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  }, [ref]);

  useEffect(() => {
    // Detect touch devices
    const touchCheck = () => { isTouch.current = true; };
    window.addEventListener('touchstart', touchCheck, { once: true, passive: true });

    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Check hover capability (desktop only)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('touchstart', touchCheck);
    };
  }, [handleMove, handleLeave]);
}
