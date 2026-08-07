"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

/**
 * Reactive motion primitives.
 *
 * Entrance animations fire once and then the page is inert. These respond
 * continuously to the cursor and to scroll, which is what makes a page feel
 * alive rather than merely animated.
 *
 * Everything here is driven by motion values and springs. Pointer position is
 * never React state: that would re-render the subtree on every mousemove and
 * stutter badly. All movement is transform and opacity only, so it stays on
 * the compositor, and every component collapses to static under
 * prefers-reduced-motion.
 */

const SPRING = { stiffness: 120, damping: 18, mass: 0.5 };

/**
 * Card that tilts toward the cursor and carries a spotlight that tracks it.
 * The tilt is small on purpose: past about 8deg it reads as a gimmick.
 */
export function TiltCard({
  children,
  className = "",
  intensity = 6,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const active = useMotionValue(0);

  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const glow = useSpring(active, { stiffness: 90, damping: 20 });

  const rotateX = useTransform(sy, (v) => v * -intensity);
  const rotateY = useTransform(sx, (v) => v * intensity);
  // Spotlight follows the cursor across the surface.
  const lightX = useTransform(sx, (v) => `${50 + v * 60}%`);
  const lightY = useTransform(sy, (v) => `${50 + v * 60}%`);
  const spotlight = useTransform(
    [lightX, lightY],
    ([x, y]) =>
      `radial-gradient(340px circle at ${x} ${y}, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)`
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => active.set(1)}
      onPointerLeave={() => {
        active.set(0);
        px.set(0);
        py.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative isolate ${className}`}
    >
      <motion.div
        aria-hidden
        style={{ opacity: glow, background: spotlight }}
        className="pointer-events-none absolute inset-0 -z-10"
      />
      {children}
    </motion.div>
  );
}

/**
 * Button that pulls toward the cursor as it approaches. Displacement is capped
 * so the control never leaves its own hit area.
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const cap = r.height * 0.6;
    x.set(Math.max(-cap, Math.min(cap, dx * strength)));
    y.set(Math.max(-cap, Math.min(cap, dy * strength)));
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Drifts a layer against the scroll direction. Depth comes from differing rates. */
export function Parallax({
  children,
  className = "",
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [distance, -distance]), {
    stiffness: 80,
    damping: 22,
  });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Skews slightly with scroll velocity, then settles. This is the effect that
 * makes fast scrolling feel like it has weight.
 */
export function VelocitySkew({
  children,
  className = "",
  max = 4,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 90, damping: 30, mass: 0.4 });
  const skewY = useTransform(smooth, [-2500, 0, 2500], [max, 0, -max], {
    clamp: true,
  });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div style={{ skewY }} className={className}>
      {children}
    </motion.div>
  );
}
