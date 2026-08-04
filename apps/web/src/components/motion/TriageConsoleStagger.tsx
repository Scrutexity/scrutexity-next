'use client';

import { motion } from 'framer-motion';

interface ConsolePayload {
  text: string;
  classification: string;
  isClinical: boolean;
  response: string;
}

interface TriageConsoleStaggerProps {
  payload: ConsolePayload;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
} as const;

const line = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
} as const;

/**
 * TriageConsoleStagger — Staggered Terminal Output
 *
 * When a user clicks a test scenario, the output lines appear one at a time
 * with a slight spring entrance — like a real data terminal processing a
 * payload. Total stagger duration: ~0.9s for 4 lines (well under 1s).
 *
 * Uses warm-toned terminal colors (not cold blue/green) to match the
 * Scrutexity palette. The terminal panel itself remains dark (#1e1b17)
 * as a semantic UI element, not a section background.
 */
export default function TriageConsoleStagger({ payload }: TriageConsoleStaggerProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
      key={payload.text} // re-trigger animation when payload changes
    >
      {/* Line 1: Ingress Payload */}
      <motion.div variants={line}>
        <span className="text-[#9e8e7e] text-[10px] uppercase tracking-[0.15em]">
          [Ingress Payload]:
        </span>
        <p className="text-[#e1d4c5] mt-1 pl-3 border-l-2 border-[#3d3731] italic leading-relaxed">
          &ldquo;{payload.text}&rdquo;
        </p>
      </motion.div>

      {/* Line 2: Classification Token */}
      <motion.div variants={line}>
        <span className="text-[#9e8e7e] text-[10px] uppercase tracking-[0.15em]">
          [State Classification Token]:
        </span>
        <p
          className={`mt-1 font-bold text-sm ${
            payload.isClinical ? 'text-[#6b1d2f]' : 'text-[#7f8f78]'
          }`}
        >
          {payload.classification}
        </p>
      </motion.div>

      {/* Divider */}
      <motion.hr variants={line} className="border-[#3d3731]/40" />

      {/* Line 3: Execution Strategy */}
      <motion.div variants={line}>
        <span className="text-[#9e8e7e] text-[10px] uppercase tracking-[0.15em]">
          [Engine Execution Strategy]:
        </span>
        <div
          className={`mt-2 p-4 rounded-xl leading-relaxed ${
            payload.isClinical
              ? 'bg-[#6b1d2f]/15 border border-[#6b1d2f]/30 text-[#e8b4b4]'
              : 'bg-[#2a2621] border border-[#3d3731]/40 text-[#d9c9b4]'
          }`}
        >
          {payload.response}
        </div>
      </motion.div>
    </motion.div>
  );
}
