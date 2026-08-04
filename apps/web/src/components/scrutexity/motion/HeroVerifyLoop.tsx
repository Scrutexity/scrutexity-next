"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { INSTITUTIONAL_SPRING, EASE_ENTERPRISE } from "@/lib/motion";

interface ClaimStep {
  id: string;
  claimText: string;
  enforcementRule: string;
  hash: string;
}

const SAMPLE_DATA: ClaimStep = {
  id: "CLM-99204",
  claimText: '"Completely reverses cellular aging in 14 days"',
  enforcementRule: "FTC Sec. 5 / FDA Unsubstantiated Health Claim",
  hash: "0x8f3c...b41a9e",
};

export function HeroVerifyLoop() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"extract" | "match" | "seal">("extract");

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer1 = setTimeout(() => setPhase("match"), 1000);
    const timer2 = setTimeout(() => setPhase("seal"), 2000);
    const timer3 = setTimeout(() => setPhase("extract"), 4200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [phase, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="rounded-2xl border border-sand-deep/30 bg-cream-deep/90 p-6 font-mono text-xs text-espresso">
        <div>[Extracted Claim]: {SAMPLE_DATA.claimText}</div>
        <div className="text-clay mt-1">[Pattern Match]: {SAMPLE_DATA.enforcementRule}</div>
        <div className="text-sage-deep mt-1 font-semibold">[Receipt Sealed]: SHA-256 {SAMPLE_DATA.hash}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl rounded-3xl border border-sand-deep/40 bg-cream-deep/95 p-6 md:p-8 shadow-[0_20px_50px_-16px_rgba(28,24,20,0.12)] backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-sand-deep/20 pb-4 font-mono text-[10px] tracking-[0.18em] uppercase text-mist">
        <span>RECORD_PIPELINE // REALTIME_OBSERVATION</span>
        <span className="flex items-center gap-2 text-sage-deep font-semibold">
          <span className="h-2 w-2 rounded-full bg-sage-deep animate-ping" />
          ACTIVE INGRESS
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4 font-mono text-xs">
        {/* Step 1: Claim Extraction */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: EASE_ENTERPRISE }}
          className="flex items-start gap-3 rounded-2xl border border-sand-deep/25 bg-bone/70 p-4"
        >
          <span className="text-sage-deep font-bold">01</span>
          <div>
            <div className="text-[10px] text-mist uppercase tracking-widest font-semibold">Public Claim Observed</div>
            <div className="text-espresso mt-1 text-xs md:text-sm font-sans font-medium">{SAMPLE_DATA.claimText}</div>
          </div>
        </motion.div>

        {/* Step 2: Enforcement Match */}
        <AnimatePresence>
          {(phase === "match" || phase === "seal") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ...INSTITUTIONAL_SPRING }}
              className="flex items-start gap-3 rounded-2xl border border-clay/30 bg-clay/10 p-4 text-clay"
            >
              <span className="text-clay font-bold">02</span>
              <div>
                <div className="text-[10px] text-clay/80 uppercase tracking-widest font-semibold">Enforcement Pattern Match</div>
                <div className="mt-1 font-semibold text-xs md:text-sm">{SAMPLE_DATA.enforcementRule}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Receipt Hash Seal */}
        <AnimatePresence>
          {phase === "seal" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_ENTERPRISE }}
              className="flex items-center justify-between flex-wrap gap-2 rounded-2xl border border-sage-deep/40 bg-sage/12 p-4 text-sage-deep"
            >
              <div className="flex items-center gap-3">
                <span className="text-sage-deep font-bold">03</span>
                <div>
                  <div className="text-[10px] text-sage-deep uppercase tracking-widest font-semibold">Audit Record Sealed</div>
                  <div className="text-[11px] text-espresso/70 font-mono mt-0.5">SHA-256: {SAMPLE_DATA.hash}</div>
                </div>
              </div>
              <div className="rounded-xl bg-sage-deep text-cream px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                REVIEWED
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
