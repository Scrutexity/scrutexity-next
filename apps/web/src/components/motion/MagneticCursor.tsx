'use client';

import React, { useRef, useEffect, useCallback } from 'react';

/**
 * MODULE 4 — Magnetic Cursor & Micro-Interactions
 * 
 * Custom cursor: 24px terracotta-toned circle that expands on hover over interactive elements.
 * Desktop only, hidden on touch devices and when prefers-reduced-motion is set.
 */

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef({ x: 12, y: 12 });
  const targetPos = useRef({ x: 12, y: 12 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);
  const isActive = useRef(false);

  const updateCursor = useCallback(() => {
    if (!isActive.current) return;

    // Smooth interpolation (lerp)
    const ease = 0.15;
    cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * ease;
    cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * ease;

    if (cursorRef.current) {
      cursorRef.current.style.transform = 
        `translate(${cursorPos.current.x - 12}px, ${cursorPos.current.y - 12}px)`;
    }

    rafId.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    // Guards: touch, reduced motion, hover capability
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (prefersReduced || !hasHover) return;

    let isTouchDevice = false;
    const touchCheck = () => { 
      isTouchDevice = true;
      isActive.current = false;
      if (cursorRef.current) cursorRef.current.style.display = 'none';
    };
    window.addEventListener('touchstart', touchCheck, { once: true, passive: true });

    isActive.current = true;

    const interactiveSelectors = 'a, button, .clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all, [role="button"], input, textarea, select, .magnetic-target';

    const onMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      if (isTouchDevice) return;
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        isHovering.current = true;
        cursorRef.current?.classList.add('cursor-expanded');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (isTouchDevice) return;
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        isHovering.current = false;
        cursorRef.current?.classList.remove('cursor-expanded');
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      if (cursorRef.current && !isTouchDevice) {
        cursorRef.current.style.opacity = '1';
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // Start animation loop
    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      isActive.current = false;
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('touchstart', touchCheck);
    };
  }, [updateCursor]);

  return (
    <div
      ref={cursorRef}
      className="magnetic-cursor"
      aria-hidden="true"
    />
  );
}
