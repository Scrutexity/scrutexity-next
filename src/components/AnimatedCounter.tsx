'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1.5,
  prefix = '',
  suffix = '',
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);
  const prefersReducedMotion = useRef(false);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 20 });
  const displayValue = useTransform(spring, Math.floor);
  const formattedValue = useTransform(
    displayValue,
    (v) => `${prefix}${v.toLocaleString()}${suffix}`,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mq.matches;
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;

      if (prefersReducedMotion.current) {
        motionValue.set(value);
        return;
      }

      const startTime = performance.now();
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

      let rafId: number;
      const tick = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        motionValue.set(easeOutQuart(progress) * value);
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }
  }, [isInView, value, duration, motionValue]);

  return (
    <motion.span ref={ref} className={className}>
      {formattedValue}
    </motion.span>
  );
}
