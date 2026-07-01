'use client';

import { useEffect, useRef } from 'react';

const enabled = process.env.NEXT_PUBLIC_ENABLE_2026_UI === 'true';
const DOT_COUNT = 10;

export default function CursorTrail() {
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ((navigator.hardwareConcurrency ?? 4) < 4 || !window.matchMedia('(hover: hover)').matches) return;

    const positions = Array.from({ length: DOT_COUNT }, () => ({ x: -40, y: -40 }));
    const pointer = { x: -40, y: -40 };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const animate = () => {
      let x = pointer.x;
      let y = pointer.y;
      positions.forEach((position, index) => {
        position.x += (x - position.x) * 0.28;
        position.y += (y - position.y) * 0.28;
        x = position.x;
        y = position.y;
        const dot = dotRefs.current[index];
        if (dot) dot.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      });
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      {Array.from({ length: DOT_COUNT }, (_, index) => (
        <span
          key={index}
          ref={(element) => { dotRefs.current[index] = element; }}
          className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-[#d695b8] will-change-transform"
          style={{ opacity: (DOT_COUNT - index) / DOT_COUNT * 0.34 }}
        />
      ))}
    </div>
  );
}
