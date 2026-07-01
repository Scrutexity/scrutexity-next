'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedNumberProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

/** Counts up from 0 to `target` when scrolled into view. rAF-driven, ease-out cubic. */
export default function AnimatedNumber({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  decimals = 0,
  className = '',
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const final = target;

    function tick(now: number) {
      const elapsed = (now - startTime) / 1000;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(eased * final);
      if (t < 1) requestAnimationFrame(tick);
      else setDisplay(final);
    }
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  if (display === null) return <span ref={ref} className={className} />;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
