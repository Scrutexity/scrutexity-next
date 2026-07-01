'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * ScrollProgress — slim sage progress bar at the very top of the page.
 * Pure polish, signals to the user that the page has narrative depth.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-sage-deep origin-left"
      style={{ scaleX }}
    />
  );
}

/**
 * MobileStickyCta — appears after the hero scrolls off, sticks to bottom
 * of viewport, single tap target. UX audit item: 'Add a position: sticky;
 * bottom: 0 CTA bar that appears after the hero scrolls off, with a single
 * tap target.'
 *
 * Desktop: hidden (lg:hidden). Mobile: visible after 1 viewport of scroll.
 */
export function MobileStickyCta() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after the user has scrolled past ~80% of the first viewport
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{
        y: visible ? 0 : 80,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background: 'rgba(248, 243, 234, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(217, 204, 176, 0.5)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-sage-deep">
            14-day pilot · $0 risk
          </p>
          <p className="font-display text-sm text-ink truncate">
            Audit your last 30 days free
          </p>
        </div>
        <a
          href="#pilot"
          className="sage-cta inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-sans text-xs font-semibold whitespace-nowrap"
        >
          Start
          <span className="ml-1.5" aria-hidden>→</span>
        </a>
      </div>
    </motion.div>
  );
}
