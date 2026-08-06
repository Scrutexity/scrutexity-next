"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const STAGES = [
  "Fetching public page...",
  "Stripping navigation & boilerplate...",
  "Extracting substantive claims...",
  "Cross-referencing visible evidence...",
  "Generating snapshot..."
];

export function SnapshotLoader() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    // Progress through stages roughly every 600ms
    const timer = setInterval(() => {
      setCurrentStage(prev => {
        if (prev < STAGES.length - 1) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-bone rounded-xl border border-sand-deep/50 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-deep/30">
        <Loader2 className="animate-spin text-clay" size={20} />
        <span className="text-sm font-semibold text-espresso">Analyzing public surface</span>
      </div>
      
      <div className="space-y-4">
        {STAGES.map((stage, idx) => {
          const isComplete = currentStage > idx;
          const isActive = currentStage === idx;
          const isPending = currentStage < idx;

          return (
            <motion.div
              key={stage}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isPending ? 0 : 1, x: isPending ? -10 : 0 }}
              className="flex items-center gap-3"
            >
              {isComplete ? (
                <CheckCircle2 size={16} className="text-sage-deep" />
              ) : isActive ? (
                <div className="w-4 h-4 rounded-full border-2 border-clay border-r-transparent animate-spin" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-sand-deep/40" />
              )}
              <span 
                className={`text-xs ${isActive ? "text-espresso font-semibold" : isComplete ? "text-mist" : "text-mist/50"}`}
                style={{ fontFamily: MONO }}
              >
                {stage}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
