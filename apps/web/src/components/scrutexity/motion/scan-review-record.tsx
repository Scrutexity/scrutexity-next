"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Search, Eye, FileText } from "lucide-react";
import { useEffect, useState } from "react";
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';
const LUX = [0.22, 1, 0.36, 1] as const;
const STEPS = [
  { num:"01", title:"Observation", micro:"Point-in-time DOM capture", desc:"Extract substantive public marketing copy and structural DOM claims.", icon: Search },
  { num:"02", title:"Pattern Match", micro:"Regulatory vector mapping (FDA / FTC / NAD)", desc:"Cross-reference claims against FTC/FDA enforcement vectors and AI distortions.", icon: Eye },
  { num:"03", title:"Record", micro:"Hash-chained snapshot", desc:"Generate a dated, immutable audit record with full provenance.", icon: FileText },
];
export function ScanReviewRecordPipeline(){
  const [active,setActive] = useState(0);
  const reduce = useReducedMotion();
  useEffect(()=>{ if(reduce) return; const t=setInterval(()=>setActive(p=>(p+1)%STEPS.length),3800); return ()=>clearInterval(t); },[reduce]);
  return (
    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-sand-deep border-t md:border-t-0 border-sand-deep">
      {STEPS.map((s,i)=>{
        const on = active===i;
        const Icon=s.icon;
        return (
          <div key={s.num} className={`p-6 sm:p-7 transition-colors duration-500 ${on?"bg-bone":"bg-cream opacity-80"}`}>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] tracking-[0.08em] uppercase ${on?"text-clay font-semibold":"text-mist"}`} style={{fontFamily:MONO}}>{s.num} — {s.title}</span>
              <span className={`h-7 w-7 flex items-center justify-center border ${on?"border-clay/20 bg-clay/10 text-clay":"border-sand-deep bg-cream text-mist"}`}><Icon size={14} /></span>
            </div>
            <div className="mt-6 h-[64px] flex items-center">
              {i===0 && on && (<div className="w-full border border-sand-deep bg-cream px-3 py-2 text-[11px] text-espresso truncate" style={{fontFamily:MONO}}>https://example.com/services/weight-loss</div>)}
              {i===1 && on && (<div className="w-full space-y-2">{[ "100%","75%","50%"].map((w,idx)=>(<motion.div key={idx} initial={reduce?false:{opacity:0}} animate={{opacity:1}} transition={{duration:0.5, delay:idx*0.12, ease:LUX}} className="h-px bg-sand-deep" style={{width:w}} />))}</div>)}
              {i===2 && on && (<div className="w-[72px] border border-sand-deep bg-bone p-2 space-y-1.5"><div className="h-px bg-sage-deep/50 w-full" /><div className="h-px bg-sage-deep/50 w-3/4" /><div className="h-px bg-sand-deep w-full mt-2" /><div className="h-px bg-sand-deep w-1/2" /></div>)}
              {i!==0 && !on && (<div className="w-full h-px bg-sand-deep/40" />)}
            </div>
            <p className={`mt-4 text-[13px] leading-6 ${on?"text-bark":"text-mist"}`}>{s.desc}</p>
            <span className="mt-3 inline-block border border-teal-deep/15 bg-teal-deep/10 px-2 py-1 text-[10px] tracking-[0.06em] text-teal-deep uppercase" style={{fontFamily:MONO}}>{s.micro}</span>
          </div>
        );
      })}
    </div>
  );
}
