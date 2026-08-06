"use client";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    num: "01",
    title: "Observation",
    desc: "Capture public web copy and render trees precisely as seen by raw client queries.",
    tag: "DOM Capture",
  },
  {
    num: "02",
    title: "Pattern match",
    desc: "Compare claim structures against active regulatory enforcement patterns and AI claim distortions.",
    tag: "FTC / FDA Guidance",
  },
  {
    num: "03",
    title: "Record",
    desc: "Timestamped, version-tracked, hash-chained — preserved for dispute defense and audit trails.",
    tag: "Cryptographic Evidence",
  },
];

/**
 * ScrollyTimeline — ledger-stamped 3-step reveal.
 * Methodical, not bouncy: fixed cubic-bezier ease, gentle stagger,
 * left-rule ledger cards (bureau/ledger aesthetic).
 */
export function ScrollyTimeline() {
  return (
    <div className="relative mt-12">
      <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, idx) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: idx * 0.15, ease: EASE }}
            whileHover={{ y: -3 }}
            className="flex flex-col gap-3 border-l border-sand-deep bg-cream p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-mist/40">{step.num}</span>
              <span className="rounded-full border border-sand-deep bg-bone px-3 py-1 text-[10px] font-medium tracking-wide text-mist uppercase">
                {step.tag}
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-teal-deep">{step.title}</h3>
            <p className="text-[13px] leading-relaxed text-mist">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
