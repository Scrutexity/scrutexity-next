'use client';

import { useEffect, useState } from 'react';

/**
 * Gates 3D rendering on mobile, reduced-motion, or save-data.
 * Returns true (= low-power / fallback) by default to keep SSR safe.
 *
 * Detection strategy:
 *  - prefers-reduced-motion: reduce → low power
 *  - navigator.connection.saveData === true → low power
 *  - touch-only device (maxTouchPoints > 1) without fine pointer → low power
 *  - hardwareConcurrency < 4 → low power (catches old phones)
 */
export function useLowPower() {
  const [lowPower, setLowPower] = useState(true); // safe default for SSR + first paint

  useEffect(() => {
    const mqReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const ua = navigator.userAgent;
    const hasTouch = navigator.maxTouchPoints > 1;
    const isMobileUA = /Mobi|Android|iPhone|iPad/i.test(ua);
    const isMacWithTouch = /Mac/.test(ua) && hasTouch;
    const isMobile = isMobileUA || isMacWithTouch;

    // save-data detection (Network Information API, Chrome only)
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const saveData = conn?.saveData === true;

    // low core count → likely weak device
    const weakCores = (navigator.hardwareConcurrency ?? 8) < 4;

    const check = () => {
      const reduced = mqReducedMotion.matches;
      setLowPower(reduced || isMobile || saveData || weakCores);
    };

    check();
    mqReducedMotion.addEventListener('change', check);

    return () => {
      mqReducedMotion.removeEventListener('change', check);
    };
  }, []);

  return lowPower;
}

/**
 * Returns true once the element enters the viewport.
 * Used to lazy-mount 3D Canvases and trigger scroll reveals.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: { amount?: number; once?: boolean } = {}
) {
  const { amount = 0.3, once = true } = options;
  const [inView, setInView] = useState(false);
  const [node, setNode] = useState<T | null>(null);
  const refCallback = (n: T | null) => setNode(n);

  useEffect(() => {
    if (!node) return;

    // IntersectionObserver may be unavailable in some SSR or test environments.
    // In that case, treat as in-view immediately. This setState is intentional
    // — it synchronizes React state with an external browser API capability check.
    if (typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold: amount }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [amount, once, node]);

  return { ref: refCallback, inView };
}
