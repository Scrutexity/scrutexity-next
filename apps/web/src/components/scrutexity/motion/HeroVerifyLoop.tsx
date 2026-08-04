'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Search, FileText, AlertTriangle } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroVerifyLoop() {
  const shouldReduce = useReducedMotion();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    if (shouldReduce) return;
    const timers = [1, 2, 3].map((nextStep) =>
      window.setTimeout(() => setStep(nextStep as 1 | 2 | 3), nextStep * 1800),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [shouldReduce]);

  // Reduced motion fallback UI
  if (shouldReduce) {
    return (
      <div className="rounded-[1.75rem] border border-border-muted bg-bone p-6 shadow-card">
        <div className="flex items-center gap-2 border-b border-border-muted pb-4">
          <ShieldCheck size={16} className="text-sage-deep" />
          <span className="font-mono text-xs tracking-wider uppercase">Active Verification Record</span>
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-burgundy-accent/20 bg-burgundy-accent/5 p-3">
            <span className="text-[10px] font-mono text-burgundy-accent uppercase">Observed Claim</span>
            <p className="text-sm font-medium text-espresso font-display italic mt-1">“Clinically proven to reduce body weight by 22%.”</p>
          </div>
          <div className="rounded-xl border border-sage/30 bg-sage/10 p-3">
            <span className="text-[10px] font-mono text-sage-deep uppercase">Safer Rewrite</span>
            <p className="text-sm font-medium text-espresso mt-1">“Helps support weight management when combined with diet.”</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg rounded-[2rem] border border-[#e1d4c5] bg-bone p-6 shadow-[0_22px_70px_rgba(85,62,41,0.08)]">
      {/* Mock Browser Header */}
      <div className="flex items-center justify-between border-b border-[#e1d4c5]/60 pb-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-clay" />
          <span className="h-2.5 w-2.5 rounded-full bg-sand-deep" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage-deep" />
        </div>
        <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-mist">
          Core Loop Review Sequence
        </span>
      </div>

      <div className="relative mt-6 min-h-[220px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* Step 0: Claim Observed */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-clay">
                <Search size={14} />
                <span className="font-mono text-[10px] uppercase tracking-wider">01 // Public claim observed</span>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-clay/35 bg-clay/5 p-4 shadow-sm">
                {/* Scanner sweep line */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-0.5 bg-clay blur-xs"
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
                <span className="text-[9px] font-mono uppercase text-clay-deep">URL: clinic.com/weight-loss</span>
                <p className="mt-2 font-display text-lg text-espresso italic">
                  “Clinically proven to reduce body weight by 22%.”
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 1: Matching Patterns */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-burgundy-accent">
                <AlertTriangle size={14} className="text-[#6b1d2f]" />
                <span className="font-mono text-[10px] uppercase tracking-wider">02 // Pattern matched</span>
              </div>
              <div className="rounded-xl border border-[#6b1d2f]/25 bg-[#6b1d2f]/5 p-4">
                <p className="text-xs font-mono uppercase text-[#6b1d2f] font-semibold">Claim pattern signal</p>
                <p className="mt-2 text-sm text-espresso font-medium leading-relaxed">
                  Substantial health claims lack immediate visible link references or clinical attachments.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#6b1d2f]/10 px-2.5 py-0.5 text-[9px] font-mono uppercase text-[#6b1d2f]">
                  Priority: High Risk
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Hashing and Recording */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-sage-deep">
                <FileText size={14} />
                <span className="font-mono text-[10px] uppercase tracking-wider">03 // Evidence gap recorded</span>
              </div>
              <div className="rounded-xl border border-sand-deep bg-espresso p-4 text-cream font-mono text-[11px] space-y-1">
                <p className="text-sage-soft">Evidence gap recorded...</p>
                <motion.p 
                  className="font-mono text-[10px] text-cream/70 truncate"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  8f92a1b5d6e3c2b18f92a1b5d6e3c2b1...
                </motion.p>
                <div className="h-1 w-full bg-cream/10 rounded-full overflow-hidden mt-3">
                  <motion.div 
                    className="h-full bg-sage-deep"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Verified Receipt & Safer Rewrite */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-sage-deep">
                <ShieldCheck size={14} />
                <span className="font-mono text-[10px] uppercase tracking-wider">04 // CRT receipt sealed</span>
              </div>
              <div className="rounded-xl border border-sage/35 bg-sage-soft/20 p-4">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono uppercase text-sage-deep">Receipt sealed // crt_8f92a</span>
                  <span className="text-[9px] font-mono text-sage-deep uppercase font-bold">Sealed</span>
                </div>
                <div className="mt-3">
                  <span className="text-[9px] font-mono uppercase text-mist/60 block">Corrected phrasing</span>
                  <p className="mt-1 text-sm font-semibold text-espresso">
                    “Helps support weight management when combined with clinical supervision.”
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
