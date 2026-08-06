"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { INSTITUTIONAL_SPRING, EASE_ENTERPRISE } from "@/lib/motion";
import { Hash, AlertTriangle, ShieldCheck } from "lucide-react";

interface ClaimStep {
  id: string;
  originalClaim: string;
  distortedClaim: string;
  hash: string;
}

const SAMPLE_DATA: ClaimStep = {
  id: "CLM-99204",
  originalClaim: '"Noticeable skin tightening after series of treatments"',
  distortedClaim: '"Guarantees complete reversal of cellular aging in 14 days"',
  hash: "0x8f3c...b41a9e",
};

export function HeroVerifyLoop() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"published" | "drift" | "anchor">("published");

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer1 = setTimeout(() => setPhase("drift"), 1800);
    const timer2 = setTimeout(() => setPhase("anchor"), 4000);
    const timer3 = setTimeout(() => setPhase("published"), 6500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [phase, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="rounded-2xl border border-sand-deep/30 bg-cream-deep/90 p-6 font-mono text-xs text-espresso">
        <div>[Original Publication]: {SAMPLE_DATA.originalClaim}</div>
        <div className="text-clay mt-1">[AI Distortion]: {SAMPLE_DATA.distortedClaim}</div>
        <div className="text-sage-deep mt-1 font-semibold">[Immutable Record]: SHA-256 {SAMPLE_DATA.hash}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl rounded-3xl border border-sand-deep/40 bg-cream-deep/95 p-6 md:p-8 shadow-[0_20px_50px_-16px_rgba(28,24,20,0.12)] backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-sand-deep/20 pb-4 font-mono text-[10px] tracking-[0.18em] uppercase text-mist">
        <span>ARCHIVE_NODE // CLAIM_DRIFT_MONITOR</span>
        <span className="flex items-center gap-2 text-sage-deep font-semibold">
          <span className="h-2 w-2 rounded-full bg-sage-deep animate-ping" />
          TRACKING PRECEDENT
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4 font-mono text-xs">
        {/* Step 1: Original Publication */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: EASE_ENTERPRISE }}
          className="flex items-start gap-3 rounded-2xl border border-sand-deep/25 bg-bone/70 p-4"
        >
          <span className="text-sage-deep font-bold mt-0.5">01</span>
          <div>
            <div className="text-[10px] text-mist uppercase tracking-widest font-semibold flex items-center gap-1.5">
              Source Publication <span className="text-sand-deep font-normal">(Jan 12, 2026)</span>
            </div>
            <div className="text-espresso mt-1.5 text-xs md:text-sm font-sans font-medium">{SAMPLE_DATA.originalClaim}</div>
          </div>
        </motion.div>

        {/* Step 2: The Drift (AI Distortion) */}
        <AnimatePresence>
          {(phase === "drift" || phase === "anchor") && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ...INSTITUTIONAL_SPRING }}
              className="flex items-start gap-3 rounded-2xl border border-clay/30 bg-clay/10 p-4 text-clay relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-clay/5"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-clay font-bold mt-0.5 relative z-10">02</span>
              <div className="relative z-10">
                <div className="text-[10px] text-clay/80 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <AlertTriangle size={12} />
                  The Drift (AI Synthesis) <span className="opacity-70 font-normal">(Mar 08, 2026)</span>
                </div>
                <div className="mt-1.5 font-semibold text-xs md:text-sm italic">{SAMPLE_DATA.distortedClaim}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Immutable Record */}
        <AnimatePresence>
          {phase === "anchor" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_ENTERPRISE }}
              className="flex items-center justify-between flex-wrap gap-2 rounded-2xl border border-sage-deep/40 bg-sage/12 p-4 text-sage-deep relative shadow-[0_0_20px_rgba(94,122,90,0.15)]"
            >
              <div className="flex items-start gap-3">
                <span className="text-sage-deep font-bold mt-0.5">03</span>
                <div>
                  <div className="text-[10px] text-sage-deep uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <ShieldCheck size={12} />
                    Permanent Record Anchored
                  </div>
                  <div className="text-[11px] text-espresso/80 font-mono mt-1.5 flex items-center gap-1.5">
                    <Hash size={12} className="text-sage-deep/70" />
                    {SAMPLE_DATA.hash}
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-sage-deep text-cream px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                VERIFIED SOURCE
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
