"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { DeploymentRecord, DiagnosticTimeline, FieldEvidence, OperatingSteps, OperationalMoment, PlanObservationSplit, Reveal, StackDisclosure } from "./construction-artifacts";

const trades = [
  ["DRYWALL / PAINT", "Is taping actually observed complete before primer mobilizes?"],
  ["FLOORING", "What substrate condition was observed before installation was scheduled?"],
  ["DRYWALL", "Was prerequisite rough-in evidence present before close-up?"],
  ["CEILINGS / FINISHES", "What overhead work remained observable before finish crews entered?"],
] as const;

const principles = [
  ["PROSPECTIVE RECORD", "The observed state is captured before the outcome is known."],
  ["SOURCE RETAINED", "The underlying evidence retains its timestamp and context."],
  ["CONTRACTOR DECISION", "Scrutexity records evidence. The contractor retains operational authority."],
  ["ACTUAL RECORDED SEPARATELY", "What subsequently happened does not rewrite what was knowable beforehand."],
  ["SEALED LINEAGE", "The record preserves the sequence from intent through actual execution."],
] as const;

export default function ConstructionHomepage() {
  return <div className="sx-shell">
    <section className="sx-hero"><div className="sx-technical-grid" aria-hidden/><div className="sx-container sx-hero-copy"><Reveal eager><p className="sx-eyebrow">CONTRACTOR-SIDE PRODUCTION CONTROL</p></Reveal><Reveal eager delay={.05}><h1 className="sx-display">The schedule says where the crew should go.<br/><em>Know what was actually observed before they go.</em></h1></Reveal><Reveal eager delay={.1}><p className="sx-body sx-hero-support">Scrutexity turns existing field evidence into a contractor-controlled record of planned starts, observed prerequisites, deployment decisions, and actual execution.</p></Reveal><Reveal eager delay={.15} className="sx-hero-actions"><Link href="/contact?intent=construction-diagnostic" className="sx-button sx-button-primary"><ArrowRight size={17}/>Request a 5-Day Diagnostic</Link><Link href="#decision-record" className="sx-button sx-button-secondary"><ArrowDown size={17}/>Inspect the Record</Link></Reveal><Reveal eager delay={.2}><div className="sx-hero-claims"><span>No new field app.</span><span>No invented readiness.</span><span>No reconstructed history.</span></div></Reveal></div></section>

    <section className="sx-record-stage" id="decision-record"><div className="sx-container"><Reveal><OperationalMoment/></Reveal><Reveal delay={.08} className="sx-record-wrap"><DeploymentRecord/></Reveal></div></section>

    <section id="how-it-works" className="sx-section"><div className="sx-container"><Reveal className="sx-section-head"><div><p className="sx-eyebrow">HOW IT WORKS</p><h2 className="sx-h2">Observe. Decide. Record.</h2></div><p className="sx-body">Scrutexity organizes what was knowable before a crew move without taking the decision away from the contractor.</p></Reveal><Reveal delay={.08} className="mt-14"><OperatingSteps/></Reveal><Reveal delay={.1} className="sx-doctrine"><p>A planned start is intent.<br/><strong>An observed state is evidence.</strong></p><PlanObservationSplit/></Reveal></div></section>

    <section id="trades" className="sx-section sx-trades"><div className="sx-container"><Reveal className="sx-section-head"><div><p className="sx-eyebrow">FOR SPECIALTY CONTRACTORS</p><h2 className="sx-h2">Same control problem.<br/>Different prerequisites.</h2></div><p className="sx-body">Scrutexity records the observed condition and decision lineage. It does not certify the condition.</p></Reveal><Reveal delay={.08}><div className="sx-trade-grid">{trades.map(([trade, question], index) => <article key={trade}><p className="sx-mono text-sx-muted">0{index + 1} · {trade}</p><h3>{question}</h3></article>)}</div></Reveal><Reveal delay={.1}><FieldEvidence/></Reveal></div></section>

    <section id="diagnostic" className="sx-section sx-diagnostic"><div className="sx-container"><Reveal className="sx-section-head"><div><p className="sx-eyebrow">5-DAY DIAGNOSTIC</p><h2 className="sx-h2">Bring us one active workfront.</h2></div><p className="sx-body">A bounded engagement built from evidence already available through the contractor’s workflow. Scope and commercial terms are confirmed before work begins.</p></Reveal><Reveal delay={.08} className="mt-14"><DiagnosticTimeline/></Reveal><Reveal delay={.1} className="sx-diagnostic-action"><Link href="/contact?intent=construction-diagnostic" className="sx-button sx-button-primary"><ArrowRight size={17}/>Request the 5-Day Diagnostic</Link><p>No outcome, savings, or labor impact is assumed.</p></Reveal><Reveal delay={.12} className="mt-16"><StackDisclosure/></Reveal></div></section>

    <section id="architecture" className="sx-section sx-control"><div className="sx-container"><Reveal className="sx-section-head"><div><p className="sx-eyebrow">CONTRACTOR CONTROLLED BY DESIGN</p><h2 className="sx-h2">The field produces evidence.<br/>The contractor makes the decision.</h2></div><p className="sx-body">Scrutexity preserves the sequence without turning observations into autonomous authorization.</p></Reveal><Reveal delay={.08}><div className="sx-principle-grid">{principles.map(([title, copy], index) => <article key={title}><p className="sx-mono">0{index + 1}</p><h3>{title}</h3><p>{copy}</p></article>)}</div></Reveal></div></section>

    <section className="sx-final"><div className="sx-container"><Reveal><p className="sx-eyebrow">BEFORE THE NEXT CREW MOVE</p><h2 className="sx-display">Preserve what was knowable.</h2><p className="sx-body">The schedule records intent. The field produces evidence. The contractor makes the decision. Scrutexity preserves the lineage.</p><Link href="/contact?intent=construction-diagnostic" className="sx-button sx-button-primary"><ArrowRight size={17}/>Request a 5-Day Diagnostic</Link></Reveal></div></section>
  </div>;
}
