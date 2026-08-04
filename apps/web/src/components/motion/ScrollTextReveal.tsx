'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsapSetup';

/**
 * MODULE 2 — Scroll-Triggered Text Reveals
 * 
 * Wraps headline text and splits it into individually animatable word spans.
 * Each word fades in with staggered timing as the element enters viewport.
 * 
 * - Easing: power3.out
 * - Duration: 0.6–1.2s (configurable)
 * - Y translation: 10–20px max
 * - Stagger: 0.04s per word
 * - prefers-reduced-motion: instant reveal
 */

interface ScrollTextRevealProps {
  children: ReactNode;
  /** Animation duration per word (default: 0.8s) */
  duration?: number;
  /** Y-axis translation distance in px (default: 16) */
  yOffset?: number;
  /** Stagger between words in seconds (default: 0.04) */
  stagger?: number;
  /** Split mode: 'words' or 'chars' (default: 'words') */
  splitMode?: 'words' | 'chars';
  /** Additional className for the container */
  className?: string;
  /** HTML tag to render (default: 'div') */
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'section';
  /** ScrollTrigger start position (default: 'top 88%') */
  triggerStart?: string;
}

export function ScrollTextReveal({
  children,
  duration = 0.8,
  yOffset = 16,
  stagger = 0.04,
  splitMode = 'words',
  className = '',
  as: Tag = 'div',
  triggerStart = 'top 88%',
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated.current) return;

    if (prefersReducedMotion()) {
      // Instant reveal — no animation
      container.style.opacity = '1';
      return;
    }

    // Extract text nodes and wrap them in spans
    const textElements = container.querySelectorAll<HTMLElement>('[data-split-target]');
    
    if (textElements.length === 0) {
      // If no explicit targets, treat the container itself as the target
      wrapAndAnimate(container, { duration, yOffset, stagger, splitMode, triggerStart });
      hasAnimated.current = true;
      return;
    }

    textElements.forEach((el) => {
      wrapAndAnimate(el, { duration, yOffset, stagger, splitMode, triggerStart });
    });

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container || (container && container.contains(t.trigger as Node))) {
          t.kill();
        }
      });
    };
  }, [duration, yOffset, stagger, splitMode, triggerStart]);

  return React.createElement(Tag, { ref: containerRef, className }, children);
}

/**
 * Simpler inline component for wrapping a single text string.
 * Use this inside existing JSX where you just want the text to reveal.
 */
export function RevealText({
  text,
  className = '',
  duration = 0.8,
  yOffset = 16,
  stagger = 0.04,
  triggerStart = 'top 88%',
}: {
  text: string;
  className?: string;
  duration?: number;
  yOffset?: number;
  stagger?: number;
  triggerStart?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasInit = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasInit.current) return;
    hasInit.current = true;

    if (prefersReducedMotion()) {
      el.style.opacity = '1';
      return;
    }

    wrapAndAnimate(el, { duration, yOffset, stagger, splitMode: 'words', triggerStart });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [duration, yOffset, stagger, triggerStart]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {text}
    </span>
  );
}

// ─── Internal ────────────────────────────────────────────────────────────

interface AnimateConfig {
  duration: number;
  yOffset: number;
  stagger: number;
  splitMode: 'words' | 'chars';
  triggerStart: string;
}

function wrapAndAnimate(element: HTMLElement, config: AnimateConfig) {
  const text = element.textContent || '';
  if (!text.trim()) return;

  const units = config.splitMode === 'chars'
    ? text.split('')
    : text.split(/(\s+)/);

  // Clear and rebuild
  element.innerHTML = '';
  element.setAttribute('aria-label', text);

  const spans: HTMLSpanElement[] = [];

  units.forEach((unit) => {
    if (/^\s+$/.test(unit)) {
      // Preserve whitespace
      element.appendChild(document.createTextNode(' '));
      return;
    }
    if (!unit) return;

    const span = document.createElement('span');
    span.textContent = unit;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = `translateY(${config.yOffset}px)`;
    span.style.willChange = 'opacity, transform';
    span.setAttribute('aria-hidden', 'true');
    element.appendChild(span);
    spans.push(span);
  });

  if (spans.length === 0) return;

  gsap.to(spans, {
    opacity: 1,
    y: 0,
    duration: config.duration,
    stagger: config.stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: config.triggerStart,
      once: true,
    },
  });
}
