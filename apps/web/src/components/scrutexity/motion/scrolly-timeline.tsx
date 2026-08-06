"use client";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    num: "01",
    title: "Point-in-Time Observation",
    desc: "Capture public web copy and render trees precisely as seen by raw client queries.",
    tag: "DOM Capture",
  },
  {
    num: "02",
    title: "Pattern Vector Match",
    desc: "Compare claim structures against active regulatory enforcement patterns and AI claim distortions.",
    tag: "FTC / FDA Guidance",
  },
  {
    num: "03",
    title: "Hash-Chained Record",
    desc: "Produce a timestamped, version-tracked receipt preserved for dispute defense and audit trails.",
    tag: "Cryptographic Evidence",
  },
];

export function ScrollyTimeline() {
  return (
    <div className="relative mt-12">
      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((step, idx) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: idx * 0.15, ease: EASE }}
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between rounded-[2rem] border border-sand-deep bg-bone p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-2xl font-semibold text-mist/30">{step.num}</span>
                <span className="rounded-full border border-sand-deep bg-cream px-3 py-1 text-[11px] font-medium text-mist">
                  {step.tag}
                </span>
              </div>
              <h3 className="mb-2 font-display text-base font-semibold text-espresso">{step.title}</h3>
              <p className="text-xs leading-relaxed text-mist">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
