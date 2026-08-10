"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, Camera, Check, Clock3, Eye, LockKeyhole, MapPin, Minus, ShieldCheck } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number; eager?: boolean }) {
  const reduced = useReducedMotion();
  const visible = { opacity: 1, y: 0, filter: "blur(0px)" };
  return <motion.div className={`${className} sx-enter`} initial={false} animate={visible} transition={{ duration: reduced ? 0 : .9, delay: reduced ? 0 : delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>;
}

const status = {
  planned: "Planned deployment",
  observed: "Prerequisites observed",
  incomplete: "Verification incomplete",
  actual: "Observed actual",
};

export function DeploymentRecord() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(.5);
  const my = useMotionValue(.5);
  const rx = useSpring(useTransform(my, [0, 1], [2, -2]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-3, 3]), { stiffness: 120, damping: 18 });
  const gx = useTransform(mx, [0, 1], ["8%", "92%"]);
  const gy = useTransform(my, [0, 1], ["8%", "92%"]);

  function move(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const r = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - r.left) / r.width);
    my.set((event.clientY - r.top) / r.height);
  }

  return (
    <motion.div className="sx-record-shell" onMouseMove={move} onMouseLeave={() => { mx.set(.5); my.set(.5); }} style={reduced ? undefined : { rotateX: rx, rotateY: ry }}>
      <motion.div className="sx-pointer-glare pointer-events-none absolute inset-2 z-10 rounded-2xl opacity-25" style={{ background: useTransform([gx, gy], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,.95), transparent 34%)`) }} />
      <article className="sx-record relative z-0" aria-label="Representative prospective deployment decision record">
        <header className="sx-record-top">
          <div><p className="sx-mono text-sx-muted">Prospective deployment decision record</p><p className="mt-2 text-lg font-semibold tracking-[-.025em]">GR-0001</p></div>
          <div className="text-right"><span className="sx-chip sx-chip-accent">Representative record</span><p className="sx-mono mt-2 text-sx-muted">L4 · West · Corridor 04W</p></div>
        </header>
        <div className="sx-record-grid">
          <div className="sx-record-main">
            <RecordRow label="Planned deployment"><div className="grid grid-cols-2 gap-4"><Value label="Crew">Crew 02</Value><Value label="Scope">Primer</Value><Value label="Mobilize">Monday · 07:00</Value><Value label="Intent locked">15:31:04</Value></div></RecordRow>
            <RecordRow label="Pre-deployment state"><div className="flex flex-wrap gap-2"><span className="sx-chip">{status.observed}</span><span className="sx-chip sx-chip-warning">{status.incomplete}</span></div><p className="mt-3 text-sm text-sx-muted">3 prerequisites observed · corridor-clear verification incomplete</p></RecordRow>
            <RecordRow label="New evidence"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sx-bg"><Camera size={16} /></span><div><p className="text-sm font-medium">Field photo</p><p className="sx-mono mt-1 text-sx-muted">Captured 15:42 · source retained</p></div></div><Eye size={16} className="text-sx-muted" /></div></RecordRow>
            <RecordRow label="Contractor decision"><div className="flex items-start justify-between gap-5"><div><p className="text-xl font-semibold tracking-[-.03em]">Reallocate crew</p><p className="mt-1 text-sm text-sx-muted">Alternate workfront · L3 East</p></div><ArrowDownRight className="mt-1" size={20} /></div></RecordRow>
          </div>
          <aside className="sx-record-aside">
            <p className="sx-mono text-sx-muted">Execution reconciliation</p>
            <div className="mt-8 space-y-8">
              <div><span className="sx-chip">{status.actual}</span><p className="mt-4 text-4xl font-medium tracking-[-.05em]">07:11</p><p className="mt-2 text-sm text-sx-muted">Work began · L3 East</p></div>
              <div className="sx-divider" />
              <div><p className="sx-mono text-sx-muted">Observed production impact</p><p className="mt-3 text-2xl font-medium tracking-[-.04em]">10 labor-hours protected</p><p className="mt-2 text-xs leading-5 text-sx-muted">Representative scenario. Cost basis not provided.</p></div>
              <div className="sx-divider" />
              <div className="flex items-start gap-3"><ShieldCheck size={18} /><div><p className="text-sm font-medium">Contractor-controlled record</p><p className="mt-1 text-xs leading-5 text-sx-muted">Upstream disclosure not authorized.</p></div></div>
            </div>
          </aside>
        </div>
      </article>
    </motion.div>
  );
}

function RecordRow({ label, children }: { label: string; children: ReactNode }) {
  return <div className="sx-record-row"><p className="sx-mono text-sx-muted">{label}</p><div>{children}</div></div>;
}

function Value({ label, children }: { label: string; children: ReactNode }) {
  return <div><p className="sx-mono text-sx-muted">{label}</p><p className="mt-2 text-sm font-medium">{children}</p></div>;
}

export function IntentArtifact() {
  return <div className="sx-artifact"><div className="sx-artifact-pad"><div className="flex items-center justify-between"><p className="sx-mono text-sx-muted">Deployment intent</p><LockKeyhole size={18} /></div><div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6"><Value label="Crew">Crew 02</Value><Value label="Workfront">Floor 9 West</Value><Value label="Scope">Primer</Value><Value label="Mobilize">Monday · 07:00</Value></div></div><div className="border-t border-sx-border bg-sx-accent p-7"><div className="flex items-center justify-between"><div><p className="sx-mono">Intent locked</p><p className="mt-2 text-3xl font-medium tracking-[-.045em]">15:31:04</p></div><p className="sx-mono text-right">Before<br />new evidence</p></div></div></div>;
}

export function PrerequisiteArtifact() {
  const rows = [["Taping complete", true, "Lookahead"], ["Material staged", true, "Field update"], ["Corridor clear", null, "Missing state"], ["Access available", true, "Photo · 15:42"]] as const;
  return <div className="sx-artifact"><div className="sx-artifact-pad"><div className="flex items-center justify-between"><div><p className="sx-mono text-sx-muted">Prerequisites</p><h3 className="mt-3 text-2xl font-medium tracking-[-.04em]">Only ask what is missing.</h3></div><MapPin size={20} /></div><div className="mt-8 divide-y divide-sx-border">{rows.map(([label, done, source]) => <div key={label} className="flex items-center gap-4 py-4"><span className={`grid h-8 w-8 place-items-center rounded-full ${done ? "bg-sx-accent" : "bg-[#faf1df] text-[#936c2e]"}`}>{done ? <Check size={15} /> : <Minus size={15} />}</span><div className="min-w-0 flex-1"><p className="text-sm font-medium">{label}</p><p className="sx-mono mt-1 truncate text-sx-muted">Source · {source}</p></div>{done ? <span className="sx-chip">Observed</span> : <span className="sx-chip sx-chip-warning">Incomplete</span>}</div>)}</div></div></div>;
}

export function DecisionTimeline() {
  const events = [["15:31", "Deployment intent"], ["15:42", "New field evidence"], ["15:48", "Information updated"], ["15:53", "Contractor decision"], ["07:11", "Observed actual"]] as const;
  return <div className="sx-artifact sx-artifact-pad"><div className="relative grid gap-8 md:grid-cols-5"><div className="sx-timeline-line hidden md:block"><motion.div className="sx-timeline-progress" initial={false} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: [.16,1,.3,1] }} /></div>{events.map(([time,label],i)=><motion.div key={label} className="relative" initial={false} animate={{ opacity:1,y:0 }} transition={{delay:i*.09,duration:.65}}><span className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border-4 border-white ${i===3 ? "bg-sx-accent" : "bg-sx-dark text-white"}`}><Clock3 size={13}/></span><p className="mt-5 font-mono text-xs">{time}</p><p className="sx-mono mt-2 text-sx-muted">{label}</p></motion.div>)}</div></div>;
}

const bento = [
  { code: "01", title: "Intent", copy: "Current deployment plan", visual: <div className="mt-8 rounded-2xl bg-sx-bg p-5"><p className="sx-mono text-sx-muted">Crew 02 / Monday</p><div className="mt-4 flex items-end justify-between"><p className="text-xl font-medium">L4 West · Primer</p><LockKeyhole size={18}/></div></div> },
  { code: "02", title: "Evidence", copy: "What was known and when", visual: <div className="mt-8 space-y-3"><EvidenceLine label="Lookahead" time="14:10"/><EvidenceLine label="Field photo" time="15:42"/><EvidenceLine label="Foreman update" time="15:47"/></div> },
  { code: "03", title: "Decision", copy: "What the contractor chose", visual: <div className="mt-8 rounded-2xl bg-sx-dark p-5 text-white"><p className="sx-mono text-white/50">15:53 · Contractor decision</p><p className="mt-5 text-2xl font-medium tracking-[-.04em]">Reallocate crew</p></div> },
  { code: "04", title: "Actual", copy: "Where the crew actually went", visual: <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4"><div className="rounded-xl border border-sx-border p-4"><p className="sx-mono text-sx-muted">Planned</p><p className="mt-2 text-sm">L4 West</p></div><ArrowDownRight size={18}/><div className="rounded-xl bg-sx-accent p-4"><p className="sx-mono">Actual</p><p className="mt-2 text-sm">L3 East</p></div></div> },
  { code: "05", title: "Impact", copy: "Labor and production consequence", visual: <div className="mt-8 flex items-end gap-3"><span className="text-5xl font-medium tracking-[-.06em]">10</span><span className="pb-1 text-sm text-sx-muted">labor-hours protected<br/>representative scenario</span></div> },
  { code: "06", title: "Control", copy: "Who can see the record", visual: <div className="mt-8 flex items-center justify-between rounded-2xl border border-sx-border p-5"><div><p className="text-sm font-medium">Contractor only</p><p className="sx-mono mt-1 text-sx-muted">Disclosure off</p></div><ShieldCheck size={22}/></div> },
];

function EvidenceLine({label,time}:{label:string;time:string}){return <div className="flex items-center gap-3 rounded-xl bg-sx-bg px-4 py-3"><span className="h-2 w-2 rounded-full bg-sx-good"/><span className="flex-1 text-sm">{label}</span><span className="sx-mono text-sx-muted">{time}</span></div>}

export function DeploymentBento() {
  return <div className="sx-bento">{bento.map((item,i)=><Reveal key={item.code} delay={i*.05} className="sx-bento-card"><div className="flex items-start justify-between"><div><p className="sx-mono text-sx-muted">{item.code} / 06</p><h3 className="mt-4 text-2xl font-medium tracking-[-.04em]">{item.title}</h3><p className="mt-2 text-sm text-sx-muted">{item.copy}</p></div><span className="h-2 w-2 rounded-full bg-sx-accent ring-4 ring-sx-bg"/></div>{item.visual}</Reveal>)}</div>;
}
