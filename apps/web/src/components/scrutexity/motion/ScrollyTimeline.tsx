"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const STEPS = [
  { title: "Public Claim Ingestion", desc: "Automated crawling of public-facing web copy, testimonials, and metadata." },
  { title: "Pattern Matching", desc: "Cross-matching against FDA, FTC, and state medical board precedent databases." },
  { title: "AI Search Perception Check", desc: "Evaluating drift between original page text and LLM answer engine summaries." },
  { title: "SHA-256 Receipt Generation", desc: "Logging every claim, evidence gap, and safer rewrite to a cryptographically hashed record." },
];

export function ScrollyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl py-12">
      {/* Structural Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-sand-deep/30" />
      
      {!shouldReduceMotion && (
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-6 top-0 w-0.5 bg-sage-deep origin-top"
        />
      )}

      <div className="flex flex-col gap-12">
        {STEPS.map((step, idx) => (
          <div key={idx} className="relative flex items-start gap-8 pl-14">
            <div className="absolute left-6 top-1.5 -translate-x-1/2 rounded-full border border-sand-deep/40 bg-cream p-1.5 shadow-sm">
              <div className="h-2.5 w-2.5 rounded-full bg-sage-deep" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-semibold text-sage-deep uppercase tracking-[0.2em]">
                Phase 0{idx + 1}
              </span>
              <h3 className="text-xl font-display font-semibold text-espresso mt-1">{step.title}</h3>
              <p className="text-sm text-mist mt-1.5 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
