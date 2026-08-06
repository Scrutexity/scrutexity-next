"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';
const STAGES = ["CLAIM","EVIDENCE","GAP","LANGUAGE","RECORD"] as const;
export function ClaimFindingCard() {
  const [stage, setStage] = useState(0);
  const shouldReduce = useReducedMotion();
  useEffect(() => {
    if (shouldReduce) return;
    const t = setInterval(() => setStage((p)=>(p+1)%STAGES.length), 3200);
    return ()=>clearInterval(t);
  }, [shouldReduce]);
  return (
    <div className="w-full max-w-lg mx-auto bg-bone border border-sand-deep overflow-hidden flex flex-col">
      <div className="flex gap-1 p-3 border-b border-sand-deep/40 bg-cream">
        {STAGES.map((s,i)=>(
          <div key={s} className="flex-1 h-px bg-sand-deep/40 relative overflow-hidden">
            {i < stage && <div className="absolute inset-0 bg-clay" />}
            {i===stage && !shouldReduce && <motion.div initial={{width:"0%"}} animate={{width:"100%"}} transition={{duration:3.2, ease:[0.22,1,0.36,1]}} className="absolute inset-0 bg-clay" />}
            {i===stage && shouldReduce && <div className="absolute inset-0 bg-clay" />}
          </div>
        ))}
      </div>
      <div className="p-6 sm:p-7 flex-1">
        <div className="mb-5">
          <span className="text-[10px] font-medium tracking-[0.14em] text-mist uppercase" style={{fontFamily:MONO}}>Claim observed — 01</span>
          <p className={`mt-2 font-display text-[1.45rem] leading-[1.15] tracking-[-0.02em] text-espresso ${stage>=3?'line-through decoration-sand-deep decoration-1 opacity-40':''}`}>“Clinically proven to deliver 22% weight loss.”</p>
        </div>
        {stage>=1 && (
          <motion.div initial={shouldReduce?false:{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:0.5, ease:[0.22,1,0.36,1]}} className="mb-4 flex items-center gap-2 border border-sand-deep bg-cream px-3 py-2.5">
            <span className="h-1.5 w-1.5 bg-mist" aria-hidden />
            <span className="text-[11px] tracking-[0.06em] text-mist" style={{fontFamily:MONO}}>Checking sources…</span>
          </motion.div>
        )}
        {stage>=2 && (
          <motion.div initial={shouldReduce?false:{opacity:0}} animate={{opacity:1}} transition={{duration:0.6, ease:[0.22,1,0.36,1]}} className="mb-5 border border-clay/25 bg-clay/[0.04] px-4 py-3">
            <span className="text-[10px] font-semibold tracking-[0.14em] text-clay uppercase" style={{fontFamily:MONO}}>Evidence gap</span>
            <p className="mt-1 text-[13px] leading-6 text-espresso">Evidence not clearly visible on public page.</p>
          </motion.div>
        )}
        {stage>=3 && (
          <motion.div initial={shouldReduce?false:{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:0.6, ease:[0.22,1,0.36,1]}} className="mb-5">
            <span className="text-[10px] font-semibold tracking-[0.14em] text-sage-deep uppercase" style={{fontFamily:MONO}}>Safer language — ready</span>
            <p className="mt-2 font-display text-[1.35rem] leading-[1.15] tracking-[-0.02em] text-espresso">“Patients observed up to 22% average weight reduction in clinical trials.”</p>
          </motion.div>
        )}
        {stage>=4 && (
          <div className="pt-4 border-t border-sand-deep flex justify-between items-center">
            <span className="text-[10px] tracking-[0.08em] text-mist" style={{fontFamily:MONO}}>hash 4f3a…9c2e · verifiable</span>
            <span className="text-[10px] font-semibold tracking-[0.08em] text-sage-deep uppercase" style={{fontFamily:MONO}}>Dated record</span>
          </div>
        )}
      </div>
    </div>
  );
}
