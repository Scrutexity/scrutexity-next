'use client';

import { useEffect, useRef, useState } from 'react';

export function AnimatedCurrency({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setDisplay(0);
          const duration = 800;
          const startTime = performance.now();
          const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setDisplay(Math.floor(easeOutQuart(progress) * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      ${display.toLocaleString()}
    </span>
  );
}
