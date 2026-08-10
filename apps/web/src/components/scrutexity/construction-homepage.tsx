"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, ShieldCheck } from "lucide-react";
import {
  DeploymentRecord,
  ExecutionRail,
  ExplodedRecord,
  FieldEvidenceCapture,
  PlanObservationSplit,
  Reveal,
  WorkfrontMap,
} from "./construction-artifacts";

export default function ConstructionHomepage() {
  return (
    <div className="sx-shell">
      <section className="sx-hero px-0 pb-24 pt-28 md:pt-36">
        <div className="sx-technical-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="sx-container relative z-10 text-center">
          <Reveal eager><span className="sx-kicker"><span className="sx-kicker-dot" />Contractor-side production intelligence</span></Reveal>
          <Reveal eager delay={0.05}><h1 className="sx-display mx-auto mt-8 max-w-[1060px]">See the observed site state before you move the crew.</h1></Reveal>
          <Reveal eager delay={0.1}><p className="sx-body mx-auto mt-7 max-w-[720px]">Scrutexity preserves the contractor-controlled lineage from planned start to observed state, field evidence, contractor decision, actual execution, and sealed record.</p></Reveal>
          <Reveal eager delay={0.15} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact?intent=construction-diagnostic" className="sx-button sx-button-primary"><span className="sx-button-icon"><ArrowRight size={18} /></span>Request a 5-Day Diagnostic</Link>
            <Link href="#decision-record" className="sx-button sx-button-secondary"><span className="sx-button-icon"><ArrowDown size={18} /></span>Inspect GR-0001</Link>
          </Reveal>
          <Reveal eager delay={0.2}><p className="mt-6 text-xs leading-5 text-sx-muted">No new field app required. The contractor retains every operational decision.</p></Reveal>
        </div>

        <div id="decision-record" className="sx-container relative z-10 mt-20 scroll-mt-28 md:mt-24"><Reveal><DeploymentRecord /></Reveal></div>
      </section>

      <section id="how-it-works" className="sx-rail-section px-0">
        <div className="sx-container">
          <Reveal><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="sx-mono text-sx-muted">THE EXECUTION RAIL</p><h2 className="sx-h3 mt-4 max-w-[650px]">One lineage from deployment intent to sealed record.</h2></div><p className="max-w-[380px] text-sm leading-6 text-sx-muted">Every node is a constituent object with its own timestamp, source, and relation to the contractor’s decision.</p></div></Reveal>
          <Reveal delay={0.08} className="mt-10"><ExecutionRail /></Reveal>
        </div>
      </section>

      <section className="sx-section px-0">
        <div className="sx-container">
          <Reveal className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end"><div><span className="sx-kicker"><span className="sx-kicker-dot" />Spatial observation</span><h2 className="sx-h2 mt-7">Tie each state to a physical workfront.</h2></div><p className="sx-body max-w-[520px] lg:justify-self-end">A schedule names the planned work. Scrutexity records the currently observed condition of the place where that work is expected to occur.</p></Reveal>
          <Reveal delay={0.08} className="mt-14"><WorkfrontMap /></Reveal>
        </div>
      </section>

      <section id="field-inputs" className="sx-section scroll-mt-24 px-0">
        <div className="sx-container sx-feature">
          <Reveal><div><span className="sx-kicker"><span className="sx-kicker-dot" />Field communication capture</span><h2 className="sx-h2 mt-7">Meet the field where it already communicates.</h2><p className="sx-body mt-6 max-w-[520px]">Photos, MMS, calls, and existing project updates become source-retained observations. Scrutexity does not imply a proprietary field app where none is required.</p><div className="mt-9 flex items-start gap-3 border-t border-sx-border pt-6 text-xs leading-5 text-sx-muted"><ShieldCheck size={16} className="mt-0.5 shrink-0" /><p>The observation describes the available evidence. It does not independently certify the workfront.</p></div></div></Reveal>
          <Reveal delay={0.08}><FieldEvidenceCapture /></Reveal>
        </div>
      </section>

      <section className="sx-section px-0">
        <div className="sx-container">
          <Reveal><p className="sx-mono text-center text-sx-muted">PLANNED START VS OBSERVED STATE</p><h2 className="sx-h2 mx-auto mt-6 max-w-[900px] text-center">A planned start is not the same thing as an observed site state.</h2></Reveal>
          <Reveal delay={0.1} className="mt-14"><PlanObservationSplit /></Reveal>
        </div>
      </section>

      <section className="sx-exploded-section px-0">
        <div className="sx-container grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28"><span className="sx-kicker"><span className="sx-kicker-dot" />Constituent record</span><h2 className="sx-h2 mt-7">Show the work once. Seal the lineage.</h2><p className="sx-body mt-6 max-w-[470px]">GR-0001 is not a status label. It is the assembled record of intent, observed state, evidence, decision, actual execution, and disclosed impact.</p></Reveal>
          <ExplodedRecord />
        </div>
      </section>

      <section id="independence" className="sx-dark scroll-mt-24">
        <div className="sx-dark-grid sx-section px-0">
          <div className="sx-container">
            <Reveal><span className="sx-kicker !bg-white/10 !text-white/65 !shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)]"><span className="sx-kicker-dot !bg-white/10 after:!bg-white" />Independent by design</span><div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><h2 className="sx-h2 text-white">The project platform can stay. The contractor’s decision record stays contractor controlled.</h2><p className="text-lg leading-8 text-white/60">Scrutexity observes, preserves, and reconciles. The contractor owns the operational choice and controls disclosure of the resulting record.</p></div></Reveal>
            <Reveal delay={0.1} className="mt-20"><div className="sx-principles">{[["01","Prospective","Intent is locked before the outcome is known."],["02","Source retained","Evidence keeps its time, source, and relation to the decision."],["03","Contractor controlled","Disclosure authority remains with the contractor."]].map(([n,title,copy])=><div className="sx-principle" key={title}><p className="sx-mono text-white/35">{n} / 03</p><h3 className="mt-10 text-2xl font-medium tracking-[-.04em]">{title}</h3><p className="mt-4 text-sm leading-6 text-white/55">{copy}</p></div>)}</div></Reveal>
          </div>
        </div>
      </section>

      <section id="diagnostic" className="sx-section scroll-mt-24 px-0">
        <div className="sx-container"><Reveal><div className="sx-offer"><p className="sx-mono">5-DAY PRODUCTION CONTROL DIAGNOSTIC</p><div className="mt-8 grid gap-14 lg:grid-cols-[1.15fr_.85fr]"><div><h2 className="sx-h2">Give us one active project.</h2><p className="mt-6 max-w-[640px] text-lg leading-8 text-sx-ink/70">For five working days, Scrutexity follows a bounded set of upcoming crew deployments and builds the prospective record before mobilization.</p></div><div className="grid gap-1 self-end">{["One active project","Bounded workfronts","Existing field communication","Friday production record"].map((item,index)=><div key={item} className="flex items-center justify-between border-b border-sx-ink/20 py-3"><span className="sx-mono">0{index+1}</span><span className="text-sm font-medium">{item}</span></div>)}<Link href="/contact?intent=construction-diagnostic" className="sx-button sx-button-primary mt-6"><span className="sx-button-icon"><ArrowRight size={18} /></span>Request Diagnostic</Link></div></div><div className="mt-10 flex items-start gap-3 border-t border-sx-ink/20 pt-6 text-xs leading-5 text-sx-ink/60"><ShieldCheck size={16} className="mt-0.5 shrink-0" /><p>Scrutexity observes and records. The contractor retains every operational decision. No certification or guaranteed outcome.</p></div></div></Reveal></div>
      </section>

      <section className="sx-final px-4"><div className="sx-container relative z-10 pb-36"><Reveal><span className="sx-kicker"><span className="sx-kicker-dot" />Next deployment</span><h2 className="sx-display mx-auto mt-8 max-w-[900px]">Know what was observed before you mobilize.</h2><p className="sx-body mx-auto mt-7 max-w-[650px]">Preserve the planned start, observed state, evidence, contractor decision, and actual execution before the next crew move becomes hindsight.</p><Link href="/contact?intent=construction-diagnostic" className="sx-button sx-button-primary mt-9"><span className="sx-button-icon"><ArrowRight size={18} /></span>Request a 5-Day Diagnostic</Link></Reveal></div><div className="sx-final-card" aria-hidden /></section>
    </div>
  );
}
