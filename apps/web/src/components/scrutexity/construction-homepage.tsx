"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Camera, FileText, MessageSquareText, PhoneCall, ShieldCheck } from "lucide-react";
import { DecisionTimeline, DeploymentBento, DeploymentRecord, IntentArtifact, PrerequisiteArtifact, Reveal } from "./construction-artifacts";

const SpatialField = dynamic(() => import("./construction-spatial-field"), { ssr: false });

export default function ConstructionHomepage() {
  return <div className="sx-shell">
    <section className="relative min-h-[1450px] overflow-hidden px-0 pb-24 pt-28 md:min-h-[1510px] md:pt-36">
      <div className="sx-technical-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[920px] opacity-70" aria-hidden><SpatialField /></div>
      <div className="sx-container relative z-10 text-center">
        <Reveal eager><span className="sx-kicker"><span className="sx-kicker-dot"/>Contractor-side production intelligence</span></Reveal>
        <Reveal eager delay={.06}><h1 className="sx-display mx-auto mt-8 max-w-[1040px]">Know what’s actually ready<br className="hidden sm:block"/> before you move the crew.</h1></Reveal>
        <Reveal eager delay={.12}><p className="sx-body mx-auto mt-7 max-w-[670px]">Scrutexity preserves the contractor-controlled record of what was planned, what was known before mobilization, what was decided, and what actually happened.</p></Reveal>
        <Reveal eager delay={.18} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact?intent=construction-diagnostic" className="sx-button sx-button-primary"><span className="sx-button-icon"><ArrowRight size={18}/></span>Request a 5-Day Diagnostic</Link>
          <Link href="#decision-record" className="sx-button sx-button-secondary"><span className="sx-button-icon"><ArrowDown size={18}/></span>See the Decision Record</Link>
        </Reveal>
        <Reveal eager delay={.24}><p className="mt-6 text-xs leading-5 text-sx-muted">No new field system required.<br className="sm:hidden"/> The contractor makes every operational decision.</p></Reveal>
      </div>
      <div id="decision-record" className="sx-container relative z-10 mt-24 scroll-mt-28 md:mt-28"><Reveal><DeploymentRecord/></Reveal></div>
    </section>

    <section id="how-it-works" className="sx-section px-0">
      <div className="sx-container">
        <Reveal><p className="sx-h2 mx-auto max-w-[1080px] text-center">The schedule says what should happen. Scrutexity records what was actually known before your resources moved.</p></Reveal>
        <Reveal delay={.08} className="mt-20"><div className="sx-state-strip">{[
          ["01","Planned","Crew 02 · Primer","Monday · 07:00"], ["02","Observed","3 prerequisites observed","1 verification incomplete"], ["03","Actual","Crew moved to L3 East","Work began · 07:11"]
        ].map(([n,title,line,meta])=><div className="sx-state" key={title}><div className="flex items-center justify-between"><span className="sx-mono text-sx-muted">{n} / 03</span><span className="h-2 w-2 rounded-full bg-sx-accent ring-4 ring-sx-bg"/></div><h3 className="mt-16 text-3xl font-medium tracking-[-.045em]">{title}</h3><p className="mt-4 text-sm font-medium">{line}</p><p className="sx-mono mt-2 text-sx-muted">{meta}</p></div>)}</div></Reveal>
      </div>
    </section>

    <section className="sx-section px-0">
      <div className="sx-container sx-feature">
        <Reveal><div><span className="sx-kicker"><span className="sx-kicker-dot"/>Lock intent</span><h2 className="sx-h2 mt-7">Capture the decision before hindsight rewrites it.</h2><p className="sx-body mt-6 max-w-[520px]">Create the prospective record while the deployment is still a plan—before new field evidence and before the outcome is known.</p></div></Reveal>
        <Reveal delay={.08}><IntentArtifact/></Reveal>
      </div>
    </section>

    <section className="sx-section px-0">
      <div className="sx-container sx-feature sx-feature-reverse">
        <Reveal><PrerequisiteArtifact/></Reveal>
        <Reveal delay={.08}><div><span className="sx-kicker"><span className="sx-kicker-dot"/>Verify the missing state</span><h2 className="sx-h2 mt-7">Ask the field only what the project record cannot answer.</h2><p className="sx-body mt-6 max-w-[520px]">Scrutexity turns a broad readiness debate into a bounded request for the single missing observation.</p></div></Reveal>
      </div>
    </section>

    <section className="sx-section px-0">
      <div className="sx-container">
        <Reveal className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><span className="sx-kicker"><span className="sx-kicker-dot"/>Decision lineage</span><h2 className="sx-h2 mt-7">Planned.<br/>Observed.<br/>Decided.<br/>Actual.</h2></div><p className="sx-body max-w-[520px] lg:justify-self-end">Each update keeps its timestamp, source, and relation to the contractor’s decision. The record remains prospective, not reconstructed after the fact.</p></Reveal>
        <Reveal delay={.1} className="mt-16"><DecisionTimeline/></Reveal>
      </div>
    </section>

    <section className="sx-section px-0">
      <div className="sx-container"><Reveal><span className="sx-kicker"><span className="sx-kicker-dot"/>Decision record</span><h2 className="sx-h2 mt-7 max-w-[820px]">One record.<br/>The whole deployment story.</h2></Reveal><div className="mt-16"><DeploymentBento/></div></div>
    </section>

    <section id="independence" className="sx-dark scroll-mt-24">
      <div className="sx-dark-grid sx-section px-0">
        <div className="sx-container">
          <Reveal><span className="sx-kicker !bg-white/10 !text-white/65 !shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)]"><span className="sx-kicker-dot !bg-white/10 after:!bg-white"/>Independent by design</span><div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><h2 className="sx-h2 text-white">Your shared platform can stay. Your decision record stays yours.</h2><p className="text-lg leading-8 text-white/60">Your project platform can remain the shared system of record. Scrutexity remains the contractor-controlled independent record.</p></div></Reveal>
          <Reveal delay={.1} className="mt-20"><div className="sx-principles">{[["01","Contractor controlled","The trade controls disclosure of its Scrutexity-generated record."],["02","Prospective","The record is created before the outcome is known."],["03","Independent","Scrutexity does not require the GC to control the contractor’s record."]].map(([n,title,copy])=><div className="sx-principle" key={title}><p className="sx-mono text-white/35">{n} / 03</p><h3 className="mt-10 text-2xl font-medium tracking-[-.04em]">{title}</h3><p className="mt-4 text-sm leading-6 text-white/55">{copy}</p></div>)}</div></Reveal>
        </div>
      </div>
    </section>

    <section id="field-inputs" className="sx-section scroll-mt-24 px-0">
      <div className="sx-container">
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-end"><div><span className="sx-kicker"><span className="sx-kicker-dot"/>Field input</span><h2 className="sx-h2 mt-7">Works with what the field already uses.</h2></div><p className="sx-body max-w-[520px] lg:justify-self-end">No new field system required for the diagnostic. Scrutexity begins with existing project information and asks only for the missing state.</p></Reveal>
        <Reveal delay={.08} className="mt-14"><div className="grid grid-cols-2 gap-3 md:grid-cols-5">{[[FileText,"Lookaheads"],[Camera,"Photos"],[MessageSquareText,"Texts"],[PhoneCall,"Calls"],[ArrowUpRight,"Field updates"]].map(([Icon,label])=>{const I=Icon as typeof FileText;return <div key={label as string} className="rounded-2xl bg-white p-5"><I size={20}/><p className="sx-mono mt-10 text-sx-muted">{label as string}</p></div>})}</div></Reveal>
        <Reveal delay={.12} className="mt-12"><div className="sx-input-flow">{["Existing project data","Only missing state","Field evidence","Decision record"].map((label,i)=><div className="sx-input-step" key={label}><div className="flex items-center justify-between"><span className="sx-mono text-sx-muted">0{i+1}</span>{i<3&&<ArrowRight className="text-sx-muted" size={16}/>}</div><p className="mt-16 text-xl font-medium tracking-[-.035em]">{label}</p></div>)}</div></Reveal>
      </div>
    </section>

    <section id="diagnostic" className="sx-section scroll-mt-24 px-0">
      <div className="sx-container"><Reveal><div className="sx-offer"><p className="sx-mono">5-Day Production Control Diagnostic</p><div className="mt-8 grid gap-14 lg:grid-cols-[1.15fr_.85fr]"><div><h2 className="sx-h2">Give us one active project.</h2><p className="mt-6 max-w-[640px] text-lg leading-8 text-sx-ink/70">For five working days, Scrutexity follows a bounded set of upcoming crew deployments and builds the prospective record before mobilization.</p></div><div className="grid gap-1 self-end">{["One active project","Bounded workfronts","Existing field communication","Friday production record"].map((item,i)=><div key={item} className="flex items-center justify-between border-b border-sx-ink/20 py-3"><span className="sx-mono">0{i+1}</span><span className="text-sm font-medium">{item}</span></div>)}<Link href="/contact?intent=construction-diagnostic" className="sx-button sx-button-primary mt-6"><span className="sx-button-icon"><ArrowRight size={18}/></span>Request Diagnostic</Link></div></div><div className="mt-10 flex items-start gap-3 border-t border-sx-ink/20 pt-6 text-xs leading-5 text-sx-ink/60"><ShieldCheck size={16} className="mt-0.5 shrink-0"/><p>Scrutexity observes and records. The contractor retains every operational decision. No certification or guaranteed outcome.</p></div></div></Reveal></div>
    </section>

    <section className="sx-final px-4">
      <div className="sx-container relative z-10 pb-36"><Reveal><span className="sx-kicker"><span className="sx-kicker-dot"/>Next deployment</span><h2 className="sx-display mx-auto mt-8 max-w-[900px]">Know before you mobilize.</h2><p className="sx-body mx-auto mt-7 max-w-[650px]">See what was planned, what changed, and what actually happened before the next crew move becomes hindsight.</p><Link href="/contact?intent=construction-diagnostic" className="sx-button sx-button-primary mt-9"><span className="sx-button-icon"><ArrowRight size={18}/></span>Request a 5-Day Diagnostic</Link></Reveal></div><div className="sx-final-card" aria-hidden /></section>
  </div>;
}
