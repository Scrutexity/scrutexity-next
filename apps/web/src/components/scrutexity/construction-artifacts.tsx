"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Camera, FileText, LockKeyhole, MessageSquareText, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number; eager?: boolean }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .14 }} transition={{ duration: reduced ? 0 : .65, delay: reduced ? 0 : delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>;
}

const stateClass: Record<string, string> = {
  "PREREQUISITE OBSERVED": "sx-state-observed",
  "PREREQUISITES OBSERVED": "sx-state-observed",
  "VERIFICATION INCOMPLETE": "sx-state-incomplete",
  "OBSERVED BLOCKER": "sx-state-blocker",
  "NO OBSERVED BLOCKER": "sx-state-neutral",
  "INTENT LOCKED": "sx-state-locked",
  "RECORD SEALED": "sx-state-sealed",
};

export function State({ children }: { children: string }) {
  return <span className={`sx-system-state ${stateClass[children] ?? "sx-state-neutral"}`}>{children}</span>;
}

function Value({ label, children }: { label: string; children: ReactNode }) {
  return <div><p className="sx-mono text-sx-muted">{label}</p><p className="mt-2 text-sm font-medium">{children}</p></div>;
}

export function OperationalMoment() {
  return <div className="sx-moment">
    <div><p className="sx-mono text-sx-muted">MONDAY · 06:42</p><p className="mt-4 text-xl font-medium tracking-[-.03em] md:text-2xl">Crew 02 is planned for primer on Level 4 West at 07:00.</p></div>
    <p className="sx-moment-question">What do you actually know?</p>
  </div>;
}

export function DeploymentRecord() {
  const observations = [["Taping complete", "PREREQUISITE OBSERVED"], ["Material staged", "PREREQUISITE OBSERVED"], ["Corridor clearance", "VERIFICATION INCOMPLETE"]] as const;
  const evidence = [["PHOTO", "15:42:08"], ["FIELD UPDATE", "15:47:31"], ["PM DECISION", "15:53:12"]] as const;
  return <article className="sx-gold-record" aria-label="GR-0001 sealed deployment record">
    <header className="sx-gold-header"><div><p className="sx-record-id">GR-0001</p><p className="sx-mono mt-2 text-sx-muted">L4 · WEST · CORRIDOR 04W</p></div><div className="text-right"><State>RECORD SEALED</State><p className="sx-mono mt-3 text-sx-muted">15:56:28</p></div></header>
    <div className="sx-gold-body">
      <section className="sx-gold-section"><p className="sx-mono text-sx-muted">PLANNED DEPLOYMENT</p><div className="sx-record-values"><Value label="CREW">Crew 02</Value><Value label="SCOPE">Primer</Value><Value label="PLANNED START">Monday · 07:00</Value></div></section>
      <section className="sx-gold-section"><p className="sx-mono text-sx-muted">PRE-DEPLOYMENT OBSERVED STATE</p><div className="sx-condition-list">{observations.map(([label, state], index) => <motion.div className="sx-condition-row" key={label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .1 + index * .12 }}><span>{label}</span><State>{state}</State></motion.div>)}</div></section>
      <section className="sx-gold-section sx-record-split"><div><p className="sx-mono text-sx-muted">DECISION RECORD</p><p className="mt-5 text-xl font-medium tracking-[-.03em]">Deployment intent changed</p><p className="mt-2 text-sm leading-6 text-sx-muted">Crew held pending corridor verification.</p><p className="sx-mono mt-5 text-sx-muted">15:53:12 · CONTRACTOR DECISION</p></div><div><p className="sx-mono text-sx-muted">ACTUAL EXECUTION</p><p className="mt-5 text-sm leading-6">Recorded separately after execution.</p><p className="mt-3 text-sm leading-6 text-sx-muted">Subsequent events do not rewrite what was observable before the decision.</p></div></section>
      <section className="sx-gold-section"><p className="sx-mono text-sx-muted">SOURCE EVIDENCE</p><div className="sx-evidence-row">{evidence.map(([label, time], index) => <motion.div key={label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .55 + index * .1 }}><span className="sx-evidence-icon">{index === 0 ? <Camera size={14}/> : index === 1 ? <MessageSquareText size={14}/> : <FileText size={14}/>}</span><Value label={label}>{time}</Value></motion.div>)}</div></section>
      <footer className="sx-record-seal"><div><p className="sx-mono text-sx-muted">RECORD SEALED</p><p className="sx-mono mt-2">SHA256 · 8e2f…91ad</p></div><div className="flex items-center gap-3"><LockKeyhole size={16}/><span className="sx-mono">CONTRACTOR CONTROLLED</span></div></footer>
    </div>
  </article>;
}

const steps = [
  ["01", "OBSERVE", "Existing photos, updates, calls, and field evidence are organized around a specific workfront and planned start."],
  ["02", "DECIDE", "The contractor sees the observed prerequisite state and retains the deployment decision."],
  ["03", "RECORD", "Intent, evidence, decision, and subsequent actual execution become a contractor-controlled record."],
] as const;

export function OperatingSteps() {
  return <div><div className="sx-operating-steps">{steps.map(([n, title, copy]) => <div className="sx-operating-step" key={title}><p className="sx-mono text-sx-muted">{n}</p><h3>{title}</h3><p>{copy}</p></div>)}</div><div className="sx-lineage"><span>Intent</span><i>→</i><span>State</span><i>→</i><span>Evidence</span><i>→</i><span>Decision</span><i>→</i><span>Actual</span><i>→</i><span>Seal</span></div></div>;
}

export function PlanObservationSplit() {
  return <div className="sx-contradiction"><div className="sx-contrast-panel"><p className="sx-mono text-sx-muted">PLANNED START</p><h3>L4 WEST</h3><p>PRIMER · MONDAY · 07:00</p><State>INTENT LOCKED</State></div><div className="sx-not-equal" aria-label="does not equal">≠</div><div className="sx-contrast-panel sx-contrast-observed"><p className="sx-mono text-sx-muted">OBSERVED STATE · 15:42</p><h3>L4 WEST</h3><p>CORRIDOR CLEARANCE</p><State>VERIFICATION INCOMPLETE</State></div></div>;
}

export function FieldEvidence() {
  return <div className="sx-field-evidence"><div className="sx-field-image" role="img" aria-label="Abstracted field capture of an unfinished corridor"><span>PHOTO · WEST CORRIDOR</span></div><div className="sx-field-note"><p className="sx-mono text-sx-muted">FIELD MMS · 15:42</p><blockquote>“Still staging material here. Probably another hour.”</blockquote><div><Value label="OBSERVATION">Access condition unresolved</Value><Value label="SOURCE">Field communication</Value></div></div></div>;
}

export function DiagnosticTimeline() {
  const days = [["MONDAY", "Select one project, one workfront, and an upcoming crew deployment."], ["TUESDAY–THURSDAY", "Build the prospective record from evidence available through the contractor’s existing workflow."], ["FRIDAY", "Deliver the production-control record and disclose unresolved verification gaps."]] as const;
  const deliverables = ["Planned start", "Observed prerequisite state", "Retained source evidence", "Contractor decision", "Actual execution where available", "Unresolved verification gaps", "Sealed lineage"];
  return <div className="sx-diagnostic-grid"><div className="sx-diagnostic-days">{days.map(([day, copy]) => <div key={day}><p className="sx-mono">{day}</p><p>{copy}</p></div>)}</div><div className="sx-deliverable"><p className="sx-mono text-sx-muted">FRIDAY DELIVERABLE</p><ul>{deliverables.map(item => <li key={item}>{item}</li>)}</ul><div className="sx-disclosure"><p>Affected labor-hours <strong>NOT ESTABLISHED</strong></p><p>Dollar basis <strong>NOT PROVIDED</strong></p></div></div></div>;
}

export function StackDisclosure() {
  return <div className="sx-stack-disclosure"><div><p className="sx-mono text-sx-muted">SUPPORTED INGESTION</p><p>Submitted field photos, field updates, call notes, and provided schedule or lookahead exports.</p></div><div><p className="sx-mono text-sx-muted">PLANNED INTEGRATIONS</p><p>No third-party integration is represented as live on this page.</p></div><div className="sx-stack-assurance"><ShieldCheck size={18}/><p><strong>No new field app required.</strong><br/>Designed to work alongside existing contractor communication and production systems.</p></div></div>;
}
