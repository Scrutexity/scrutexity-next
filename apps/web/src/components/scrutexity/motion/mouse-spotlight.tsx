"use client";
import { useRef, type ReactNode } from "react";

/**
 * MouseSpotlight — a subtle cursor-tracking luminance artifact for cards.
 * Clinical by design: a soft teal radial that follows the mouse, fades in on
 * hover, never tilts or bounces. Sets --spot-x / --spot-y on the wrapper so the
 * overlay gradient can track without re-rendering.
 */
export function MouseSpotlight({
  children,
  className = "",
  radius = 260,
  alpha = 0.07,
  tint = "94,143,116",
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  alpha?: number;
  tint?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`group relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(${tint}, ${alpha}), transparent 65%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
