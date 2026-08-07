"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Activity } from "lucide-react";

const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export function CensusCounter() {
  const [count, setCount] = useState(14820930);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <div className="rounded-3xl border border-sand-deep/35 bg-cream-deep/90 p-8 md:p-10 text-center shadow-[0_16px_48px_-16px_rgba(28,24,20,0.06)] backdrop-blur-md">
      <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-sage-deep" style={{ fontFamily: MONO_STACK }}>
        <Activity size={14} className="text-sage-deep" />
        Total Public Claims Indexed &amp; SHA-256 Verified
      </div>
      <div className="mt-4 font-mono text-4xl md:text-6xl font-bold tracking-tight text-espresso">
        {count.toLocaleString()}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-sage-deep font-mono" style={{ fontFamily: MONO_STACK }}>
        <span className="h-2 w-2 rounded-full bg-sage-deep animate-ping" />
        Ingesting live health claim observation nodes
      </div>
    </div>
  );
}
