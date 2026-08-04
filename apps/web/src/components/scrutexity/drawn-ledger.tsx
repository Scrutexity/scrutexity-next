'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * DrawnLedger — a hand-crafted SVG line illustration of the Scrutexity ledger
 * that DRAWS ITSELF ON as the user scrolls into view.
 *
 * This replaces the 3D boxGeometry approach with genuine 2D illustration craft:
 * - The ledger book outline draws on first (stroke-dashoffset → 0)
 * - Row lines draw on in sequence
 * - A gold "VERIFIED" seal stamps on with overshoot
 * - Inquiry particles flow in as dotted paths that animate
 * - A hand-drawn underline accents the headline
 *
 * Every path uses Framer Motion's pathLength (0→1) for the draw-on effect.
 * stroke-linecap: round for the hand-drawn feel.
 */

const SAGE = '#5E7A5A';
const SAGE_LIGHT = '#8FA98A';
const GOLD = '#C5A059';
const GOLD_DEEP = '#A8843B';
const INK = '#1C1814';
const SAND = '#D9CCB0';
const CREAM = '#F8F3EA';

/** A single animated path that draws on. */
function DrawPath({
  d,
  delay = 0,
  duration = 1,
  color = INK,
  width = 1.5,
  dasharray,
  className,
}: {
  d: string;
  delay?: number;
  duration?: number;
  color?: string;
  width?: number;
  dasharray?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dasharray}
      initial={reduced ? false : { pathLength: 0, opacity: 0 }}
      whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        pathLength: { duration, ease: [0.16, 1, 0.3, 1], delay },
        opacity: { duration: 0.3, delay },
      }}
      className={className}
    />
  );
}

/** Animated dot that travels along a path. */
function FlowDot({ cx, cy, delay, color = GOLD }: { cx: number; cy: number; delay: number; color?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={3}
      fill={color}
      initial={reduced ? false : { opacity: 0, scale: 0 }}
      whileInView={reduced ? undefined : { opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.8] }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 2.5,
        delay,
        times: [0, 0.15, 0.85, 1],
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  );
}

/** The verified seal — draws on, then fills with gold. */
function VerifiedSeal({ cx, cy, delay = 1.8 }: { cx: number; cy: number; delay: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.g
      initial={reduced ? false : { scale: 0, opacity: 0 }}
      whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.34, 1.56, 0.64, 1], // snap overshoot — the signature "verified" feeling
      }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Outer ring */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={18}
        fill="none"
        stroke={GOLD}
        strokeWidth={2}
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Gold fill */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={16}
        fill={GOLD}
        initial={reduced ? false : { scale: 0 }}
        whileInView={reduced ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.3, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* Checkmark */}
      <motion.path
        d={`M ${cx - 5} ${cy + 0.5} L ${cx - 1} ${cy + 4} L ${cx + 6} ${cy - 4}`}
        fill="none"
        stroke={CREAM}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.3, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.g>
  );
}

export default function DrawnLedger({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  // Subtle parallax on the whole illustration
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }} className="w-full h-full">
        <svg
          viewBox="0 0 520 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-label="An illustration of the Scrutexity recovery ledger drawing itself"
        >
          {/* ── Ambient connector lines — flowing inquiry paths (draw first) ── */}
          <DrawPath
            d="M 480 60 C 420 80, 380 100, 340 130"
            delay={0.1}
            duration={0.8}
            color={SAGE_LIGHT}
            width={1.5}
            dasharray="2 6"
          />
          <DrawPath
            d="M 490 130 C 430 140, 390 160, 350 175"
            delay={0.25}
            duration={0.8}
            color={SAGE_LIGHT}
            width={1.5}
            dasharray="2 6"
          />
          <DrawPath
            d="M 485 210 C 425 215, 390 225, 355 230"
            delay={0.4}
            duration={0.8}
            color={SAGE_LIGHT}
            width={1.5}
            dasharray="2 6"
          />
          <DrawPath
            d="M 495 290 C 435 290, 395 280, 360 270"
            delay={0.55}
            duration={0.8}
            color={SAGE_LIGHT}
            width={1.5}
            dasharray="2 6"
          />

          {/* Flow dots traveling the inquiry paths */}
          <FlowDot cx={340} cy={130} delay={1.0} color={GOLD} />
          <FlowDot cx={350} cy={175} delay={1.2} color={GOLD} />
          <FlowDot cx={355} cy={230} delay={1.4} color={GOLD} />
          <FlowDot cx={360} cy={270} delay={1.6} color={GOLD} />

          {/* ── Ledger book outline (the main object) ── */}
          {/* Outer cover — rounded rectangle, hand-drawn feel via slight curve */}
          <DrawPath
            d="M 80 90 Q 80 80, 90 80 L 330 80 Q 340 80, 340 90 L 340 370 Q 340 380, 330 380 L 90 380 Q 80 380, 80 370 Z"
            delay={0.3}
            duration={1.2}
            color={INK}
            width={2}
          />

          {/* Gold edge — right side accent */}
          <DrawPath
            d="M 340 90 L 340 370"
            delay={0.5}
            duration={0.6}
            color={GOLD}
            width={3}
          />

          {/* Spine — left side */}
          <DrawPath
            d="M 80 90 L 80 370"
            delay={0.5}
            duration={0.6}
            color={SAGE}
            width={3}
          />

          {/* Page top edge — slight wave for hand-drawn feel */}
          <DrawPath
            d="M 82 88 Q 210 84, 338 88"
            delay={0.7}
            duration={0.5}
            color={SAND}
            width={1}
          />

          {/* ── Ledger rows — draw on in sequence ── */}
          {[
            { y: 140, label: 'IG DM' },
            { y: 180, label: 'Web form' },
            { y: 220, label: 'Missed call' },
            { y: 260, label: 'Voicemail' },
            { y: 300, label: 'After-hours' },
          ].map((row, i) => (
            <g key={i}>
              {/* Row line */}
              <DrawPath
                d={`M 100 ${row.y} L 300 ${row.y}`}
                delay={0.9 + i * 0.12}
                duration={0.4}
                color={SAND}
                width={1}
              />
              {/* Source dot */}
              <motion.circle
                cx={105}
                cy={row.y - 8}
                r={3}
                fill={i % 2 === 0 ? SAGE : GOLD}
                initial={reduced ? false : { scale: 0 }}
                whileInView={reduced ? undefined : { scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.3, delay: 1.0 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
              />
              {/* Amount tick — right side */}
              <DrawPath
                d={`M 310 ${row.y - 4} L 322 ${row.y - 4}`}
                delay={1.1 + i * 0.12}
                duration={0.2}
                color={INK}
                width={1.5}
              />
            </g>
          ))}

          {/* ── Verified seal — stamps on with snap overshoot ── */}
          <VerifiedSeal cx={290} cy={120} delay={2.0} />

          {/* ── "RECEIPT-GRADE" label — draws on under the seal ── */}
          <DrawPath
            d="M 250 150 L 330 150"
            delay={2.3}
            duration={0.4}
            color={GOLD_DEEP}
            width={1}
          />

          {/* ── Hand-drawn underline accent beneath "booked deposits" ── */}
          <DrawPath
            d="M 100 355 Q 210 350, 320 358"
            delay={2.5}
            duration={0.6}
            color={GOLD}
            width={2}
          />

          {/* ── Decorative sparkles around the seal ── */}
          <DrawPath
            d="M 270 100 L 272 96 L 274 100 L 278 102 L 274 104 L 272 108 L 270 104 L 266 102 Z"
            delay={2.4}
            duration={0.4}
            color={GOLD}
            width={1}
          />
          <motion.circle
            cx={315}
            cy={105}
            r={2}
            fill={GOLD}
            initial={reduced ? false : { scale: 0 }}
            whileInView={reduced ? undefined : { scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.3, delay: 2.5, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* ── Bottom flow line — revenue returning ── */}
          <DrawPath
            d="M 90 395 Q 210 405, 330 395"
            delay={2.6}
            duration={0.7}
            color={SAGE_LIGHT}
            width={1.5}
            dasharray="3 6"
          />
        </svg>
      </motion.div>
    </div>
  );
}
