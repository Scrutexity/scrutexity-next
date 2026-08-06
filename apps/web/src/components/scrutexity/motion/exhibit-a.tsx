"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';
const LUX = [0.22, 1, 0.36, 1] as const;
export function ExhibitA() {
  const [isFixed, setIsFixed] = useState(false);
  const reduce = useReducedMotion();
  return (
    <div className="w-full max-w-4xl mx-auto border border-sand-deep bg-bone overflow-hidden">
      <div className="flex flex-wrap items-center justify-between border-b border-sand-deep px-5 py-3 bg-cream">
        <span className="text-[10px] font-medium tracking-[0.14em] text-mist uppercase" style={{fontFamily:MONO}}>Exhibit A · Live example</span>
        <span className="border border-clay/20 bg-clay/10 px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-clay uppercase" style={{fontFamily:MONO}}>Finding 01</span>
      </div>
      <div className="px-5 py-6 sm:px-7 sm:py-7 flex flex-col gap-6">
        <div className="flex justify-center">
          <div className="inline-flex border border-sand-deep bg-cream p-1">
            <button onClick={()=>setIsFixed(false)} className={`relative px-5 py-2 text-[13px] font-medium tracking-[0.01em] transition-colors ${!isFixed?"bg-espresso text-cream":"text-mist hover:text-espresso"}`} style={{fontFamily:MONO}}><span className="relative z-10">What they claim</span></button>
            <button onClick={()=>setIsFixed(true)} className={`relative px-5 py-2 text-[13px] font-medium tracking-[0.01em] transition-colors ${isFixed?"bg-sage-deep text-cream":"text-mist hover:text-espresso"}`} style={{fontFamily:MONO}}><span className="relative z-10">Safer version</span></button>
          </div>
        </div>
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            {!isFixed ? (
              <motion.div key="unfixed" initial={reduce?false:{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={reduce?{opacity:0}:{opacity:0,y:-6}} transition={{duration:0.4, ease:LUX}} className="flex flex-col gap-5">
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-clay uppercase" style={{fontFamily:MONO}}>Evidence gap found</span>
                  <p className="mt-2 font-display text-[1.5rem] sm:text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-espresso border-l border-clay pl-4 py-1.5">“FDA-approved laser treatments for permanent hair removal.”</p>
                </div>
                <div className="border border-sand-deep bg-cream grid sm:grid-cols-2">
                  <div className="px-4 py-3 border-b sm:border-b-0 sm:border-r border-sand-deep"><span className="text-[10px] tracking-[0.14em] text-mist uppercase block" style={{fontFamily:MONO}}>Support visible</span><span className="mt-1 text-[13px] font-medium text-espresso block">Partial</span></div>
                  <div className="px-4 py-3"><span className="text-[10px] tracking-[0.14em] text-mist uppercase block" style={{fontFamily:MONO}}>Source linked</span><span className="mt-1 text-[13px] font-medium text-espresso block">No</span></div>
                  <div className="col-span-2 border-t border-sand-deep px-4 py-3"><span className="text-[10px] tracking-[0.14em] text-clay uppercase" style={{fontFamily:MONO}}>Analysis</span><p className="mt-1.5 text-[13px] leading-6 text-bark">The public page does not clearly identify the device or supporting documentation. “Permanent” may be considered overstated depending on the specific clearance.</p></div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="fixed" initial={reduce?false:{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={reduce?{opacity:0}:{opacity:0,y:-6}} transition={{duration:0.4, ease:LUX}} className="flex flex-col gap-5">
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-sage-deep uppercase" style={{fontFamily:MONO}}>A clearer version</span>
                  <p className="mt-2 font-display text-[1.5rem] sm:text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-espresso border-l border-sage-deep pl-4 py-1.5">“Treatment performed with an FDA-cleared device for long-term hair reduction.”</p>
                </div>
                <div className="border border-sage-deep/20 bg-cream grid sm:grid-cols-2">
                  <div className="px-4 py-3 border-b sm:border-b-0 sm:border-r border-sand-deep"><span className="text-[10px] tracking-[0.14em] text-mist uppercase block" style={{fontFamily:MONO}}>Status</span><span className="mt-1 text-[13px] font-medium text-sage-deep block">Clarified</span></div>
                  <div className="px-4 py-3"><span className="text-[10px] tracking-[0.14em] text-mist uppercase block" style={{fontFamily:MONO}}>Risk profile</span><span className="mt-1 text-[13px] font-medium text-sage-deep block">Reduced</span></div>
                  <div className="col-span-2 border-t border-sand-deep px-4 py-3"><span className="text-[10px] tracking-[0.14em] text-sage-deep uppercase" style={{fontFamily:MONO}}>Why this is safer</span><p className="mt-1.5 text-[13px] leading-6 text-bark">Replaces “approved” with “cleared” (accurate FDA terminology) and grounds “permanent” into the testable “long-term reduction.”</p></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="pt-3 border-t border-sand-deep flex gap-6">
          <span className="text-[10px] tracking-[0.08em] text-mist" style={{fontFamily:MONO}}>Reviewed · Aug 5, 2026</span>
          <span className="text-[10px] tracking-[0.08em] text-mist/70" style={{fontFamily:MONO}}>hash 4f3a…9c2e · verifiable at /verify</span>
        </div>
      </div>
    </div>
  );
}
