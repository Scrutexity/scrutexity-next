'use client';

import { useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';

interface AnimatedRevenueCounterProps {
  value: number;
  className?: string;
  prefix?: string;
}

/**
 * AnimatedRevenueCounter — Smooth Number Ticker
 *
 * Replaces static number rendering in the ROI calculator. Numbers count up
 * smoothly when the user adjusts sliders, creating a psychological hook —
 * they watch their revenue grow in real time.
 *
 * Duration: 0.8s (well under 1s constraint).
 */

export default function AnimatedRevenueCounter({
  value,
  className = '',
  prefix = '',
}: AnimatedRevenueCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const formatted = useTransform(rounded, (latest) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(latest);
    return prefix ? `${prefix}${formatted}` : formatted;
  });

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.8,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [value, count]);

  return (
    <motion.span className={className}>
      {formatted}
    </motion.span>
  );
}

/**
 * AnimatedProfitCounter — color-aware variant.
 * Switches between sage (positive) and burgundy (negative) dynamically.
 */
export function AnimatedProfitCounter({
  value,
  className = '',
}: {
  value: number;
  className?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const formatted = useTransform(rounded, (latest) => {
    const prefix = latest > 0 ? '+' : '';
    return `${prefix}${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(latest)}`;
  });

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.8,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [value, count]);

  return (
    <motion.span
      className={className}
      style={{
        color: value > 0 ? undefined : undefined, // CSS classes handle color
      }}
    >
      {formatted}
    </motion.span>
  );
}
