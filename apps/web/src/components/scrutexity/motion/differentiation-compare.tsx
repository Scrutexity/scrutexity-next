"use client";

import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export function DifferentiationCompare() {
  const [key, setKey] = useState(0);

  // Replay animation loop every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setKey(prev => prev + 1);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div key={key} className="w-full bg-bone rounded-xl border border-sand-deep/40 shadow-sm overflow-hidden flex flex-col">
      
      {/* Top: Competitor (Risk Score) */}
      <div className="p-6 sm:p-8 border-b border-sand-deep/30 bg-cream/50 relative overflow-hidden">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mist block mb-6" style={{ fontFamily: MONO }}>
          Most Tools
        </span>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-2.5 rounded-lg border border-sand-deep bg-bone shadow-sm text-sm font-medium text-bark"
          >
            Claim
          </motion.div>
          
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 40, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden sm:flex items-center"
          >
            <div className="h-px bg-sand-deep flex-1" />
            <ArrowRight size={14} className="text-sand-deep -ml-1" />
          </motion.div>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 20, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex sm:hidden items-center justify-center w-full"
          >
            <div className="w-px bg-sand-deep h-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="px-4 py-2.5 rounded-lg border border-clay/30 bg-clay/5 text-sm font-medium text-clay flex items-center gap-2 shadow-sm"
          >
            <AlertTriangle size={16} />
            Risk Score: High
          </motion.div>
        </div>
      </div>

      {/* Bottom: Scrutexity */}
      <div className="p-6 sm:p-8 bg-bone relative overflow-hidden">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep block mb-6" style={{ fontFamily: MONO }}>
          Scrutexity
        </span>
        
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="px-4 py-2.5 rounded-lg border border-sage-deep/30 bg-sage/5 text-sm font-medium text-espresso shadow-sm"
          >
            Claim
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
            <ArrowRight size={14} className="text-sage-deep/50 rotate-90 sm:rotate-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 3 }}
            className="px-4 py-2.5 rounded-lg border border-sage-deep/30 bg-sage/5 text-sm font-medium text-espresso shadow-sm"
          >
            Evidence Check
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}>
            <ArrowRight size={14} className="text-sage-deep/50 rotate-90 sm:rotate-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 4 }}
            className="px-4 py-2.5 rounded-lg border border-clay/40 bg-clay/10 text-sm font-medium text-clay shadow-sm"
          >
            Gap Identified
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }}>
            <ArrowRight size={14} className="text-sage-deep/50 rotate-90 sm:rotate-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 5 }}
            className="px-4 py-2.5 rounded-lg border border-sage-deep bg-sage-deep text-sm font-semibold text-cream shadow-sm flex items-center gap-2"
          >
            <ShieldCheck size={16} />
            Safer Language
          </motion.div>
        </div>
      </div>

    </div>
  );
}
