"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ScanAnimation() {
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanned(true);
    }, 2500); // Trigger after the scan animation finishes
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto clinical-card p-8 overflow-hidden min-h-[300px] flex items-center justify-center">
      {/* Background document representation */}
      <div className="absolute inset-0 p-8 opacity-40 select-none flex flex-col gap-4">
        <div className="h-4 bg-charcoal/20 w-3/4 rounded-sm"></div>
        <div className="h-4 bg-charcoal/20 w-full rounded-sm"></div>
        <div className="h-4 bg-charcoal/20 w-5/6 rounded-sm"></div>
        <div className="mt-8 h-8 bg-charcoal/30 w-1/2 rounded-sm flex items-center px-2 font-mono text-xs text-charcoal-muted">
          "Ranked #1 in Medical Wellness"
        </div>
        <div className="mt-4 h-4 bg-charcoal/20 w-full rounded-sm"></div>
        <div className="h-4 bg-charcoal/20 w-4/5 rounded-sm"></div>
      </div>

      {/* The Scanning Line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-terracotta z-10 shadow-[0_0_15px_rgba(184,111,79,0.8)]"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 2, ease: "linear", repeat: 0 }}
      />

      {/* Scan Overlay (tinted area above scanner) */}
      <motion.div
        className="absolute left-0 right-0 top-0 bg-terracotta/5 z-0"
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ duration: 2, ease: "linear", repeat: 0 }}
      />

      {/* Results appearing after scan */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: scanned ? 1 : 0, scale: scanned ? 1 : 0.95 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-20 bg-ivory border border-terracotta p-6 shadow-xl rounded-sm w-full"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></div>
          <span className="font-mono text-xs text-terracotta tracking-widest uppercase">Anomaly Detected</span>
        </div>
        <h4 className="font-display text-2xl text-charcoal mb-2">Unsupported Claim Found</h4>
        <p className="font-mono text-sm text-charcoal-muted mb-4">
          STATEMENT: "Ranked #1 in Medical Wellness"<br />
          EVIDENCE: NULL<br />
          COMPLIANCE RISK: HIGH
        </p>
        <button className="btn-primary w-full text-center">Triage Claim</button>
      </motion.div>
    </div>
  );
}
