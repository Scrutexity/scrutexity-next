"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Camera,
  Check,
  Clock3,
  FileImage,
  LockKeyhole,
  MapPin,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const stateClass: Record<string, string> = {
  "PREREQUISITE OBSERVED": "sx-state-observed",
  "VERIFICATION INCOMPLETE": "sx-state-incomplete",
  "OBSERVED BLOCKER": "sx-state-blocker",
  "NO OBSERVED BLOCKER": "sx-state-neutral",
  "INTENT LOCKED": "sx-state-locked",
  "RECORD SEALED": "sx-state-sealed",
};

function State({ children }: { children: string }) {
  return <span className={`sx-system-state ${stateClass[children] ?? "sx-state-neutral"}`}>{children}</span>;
}

export function DeploymentRecord() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [2, -2]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-2, 2]), { stiffness: 120, damping: 20 });

  function move(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - bounds.left) / bounds.width);
    my.set((event.clientY - bounds.top) / bounds.height);
  }

  return (
    <motion.div
      className="sx-gold-shell"
      onMouseMove={move}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={reduced ? undefined : { rotateX: rx, rotateY: ry }}
    >
      <article className="sx-gold-record" aria-label="GR-0001 sealed deployment record">
        <header className="sx-gold-header">
          <div>
            <p className="sx-mono text-sx-muted">GR-0001</p>
            <p className="mt-2 text-sm font-medium tracking-[-.02em]">L4 · WEST · CORRIDOR 04W</p>
          </div>
          <div className="text-right">
            <State>RECORD SEALED</State>
            <p className="sx-mono mt-3 text-sx-muted">15:56:28</p>
          </div>
        </header>

        <div className="sx-gold-body">
          <section className="sx-gold-section sx-gold-plan">
            <p className="sx-mono text-sx-muted">PLANNED DEPLOYMENT</p>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
              <RecordValue label="CREW">Crew 02</RecordValue>
              <RecordValue label="SCOPE">Primer</RecordValue>
              <RecordValue label="PLANNED START">Monday · 07:00</RecordValue>
            </div>
          </section>

          <section className="sx-gold-section">
            <p className="sx-mono text-sx-muted">PRE-DEPLOYMENT OBSERVED STATE</p>
            <div className="mt-5 divide-y divide-sx-border">
              <ConditionRow label="Taping complete" state="PREREQUISITE OBSERVED" />
              <ConditionRow label="Material staged" state="PREREQUISITE OBSERVED" />
              <ConditionRow label="Access available" state="PREREQUISITE OBSERVED" />
              <ConditionRow label="Corridor clearance" state="VERIFICATION INCOMPLETE" />
            </div>
          </section>

          <section className="sx-gold-section">
            <p className="sx-mono text-sx-muted">EVENT LINEAGE</p>
            <div className="mt-5 divide-y divide-sx-border">
              <EventRow time="15:31:04" title="DEPLOYMENT INTENT LOCKED" detail="Crew 02 · L4 West · Primer" icon={<LockKeyhole size={15} />} />
              <EventRow time="15:42:18" title="FIELD EVIDENCE RECEIVED" detail="PHOTO · IMG_2841" icon={<Camera size={15} />} />
              <EventRow time="15:53:11" title="CONTRACTOR DECISION" detail="REASSIGN → L3 EAST" icon={<ArrowRight size={15} />} />
              <EventRow time="07:11:09" title="ACTUAL EXECUTION" detail="Crew began alternate workfront" icon={<Clock3 size={15} />} />
            </div>
          </section>

          <section className="sx-gold-section sx-economic-row">
            <div>
              <p className="sx-mono text-sx-muted">ECONOMIC CONSEQUENCE</p>
              <p className="mt-3 text-2xl font-medium tracking-[-.04em]">10 affected labor-hours</p>
              <p className="sx-mono mt-2 text-sx-muted">Dollar basis · NOT PROVIDED</p>
            </div>
            <div className="sx-integrity-grid">
              <RecordValue label="SHA256">8e2f…91ad</RecordValue>
              <RecordValue label="EVENTS">14</RecordValue>
              <RecordValue label="DISCLOSURE">CONTRACTOR CONTROLLED</RecordValue>
            </div>
          </section>
        </div>
      </article>
    </motion.div>
  );
}

function RecordValue({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="sx-mono text-sx-muted">{label}</p>
      <p className="mt-2 text-sm font-medium">{children}</p>
    </div>
  );
}

function ConditionRow({ label, state }: { label: string; state: string }) {
  return (
    <div className="sx-condition-row">
      <span className="text-sm font-medium">{label}</span>
      <State>{state}</State>
    </div>
  );
}

function EventRow({ time, title, detail, icon }: { time: string; title: string; detail: string; icon: ReactNode }) {
  return (
    <div className="sx-event-row">
      <span className="sx-event-icon">{icon}</span>
      <p className="sx-mono text-sx-muted">{time}</p>
      <div>
        <p className="sx-mono !text-[9px] text-sx-ink">{title}</p>
        <p className="mt-1 text-sm text-sx-muted">{detail}</p>
      </div>
    </div>
  );
}

const railSteps = [
  ["INTENT", "15:31", "LOCKED"],
  ["STATE", "15:38", "3 OBSERVED"],
  ["EVIDENCE", "15:42", "IMG_2841"],
  ["DECISION", "15:53", "REASSIGN"],
  ["ACTUAL", "07:11", "L3 EAST"],
  ["SEAL", "15:56", "8e2f…91ad"],
] as const;

export function ExecutionRail() {
  return (
    <div className="sx-execution-rail" aria-label="Deployment record lineage">
      <motion.div
        className="sx-rail-progress"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {railSteps.map(([name, time, value], index) => (
        <div className="sx-rail-object" key={name}>
          <div className="flex items-center justify-between">
            <span className="sx-mono text-sx-muted">0{index + 1}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-sx-accent" />
          </div>
          <p className="sx-mono mt-8 text-sx-ink">{name}</p>
          <p className="mt-2 text-sm font-medium">{value}</p>
          <p className="sx-mono mt-2 text-sx-muted">{time}</p>
        </div>
      ))}
    </div>
  );
}

const workfronts = [
  { id: "04W-A", state: "NO OBSERVED BLOCKER", note: "Current observations contain no blocker.", action: "Continue observation" },
  { id: "04W-B", state: "VERIFICATION INCOMPLETE", note: "Corridor clearance · no current observation", action: "Field confirmation required" },
  { id: "04W-C", state: "OBSERVED BLOCKER", note: "Material staging occupies access path", action: "Contractor decision required" },
] as const;

export function WorkfrontMap() {
  const [active, setActive] = useState(1);
  const item = workfronts[active];
  return (
    <div className="sx-workfront-artifact">
      <div className="sx-workfront-top">
        <div>
          <p className="sx-mono text-sx-muted">SPATIAL WORKFRONT</p>
          <h3 className="mt-3 text-2xl font-medium tracking-[-.04em]">LEVEL 04 · WEST</h3>
        </div>
        <MapPin size={19} />
      </div>
      <div className="sx-workfront-grid">
        {workfronts.map((workfront, index) => (
          <button
            type="button"
            key={workfront.id}
            className={`sx-workfront-cell ${active === index ? "is-active" : ""}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
          >
            <span className="sx-mono text-sx-muted">{workfront.id}</span>
            <State>{workfront.state}</State>
          </button>
        ))}
      </div>
      <div className="sx-workfront-detail" aria-live="polite">
        <div><p className="sx-mono text-sx-muted">OBSERVED STATE</p><State>{item.state}</State></div>
        <div><p className="sx-mono text-sx-muted">LAST EVIDENCE</p><p className="mt-2 text-sm">{item.note}</p></div>
        <div><p className="sx-mono text-sx-muted">ACTION</p><p className="mt-2 text-sm font-medium">{item.action}</p></div>
      </div>
    </div>
  );
}

export function FieldEvidenceCapture() {
  return (
    <div className="sx-field-capture">
      <div className="sx-capture-chrome"><span>FIELD EVIDENCE</span><span>3:42 PM</span></div>
      <div className="sx-capture-photo">
        <div className="sx-photo-grid" aria-hidden />
        <span className="sx-photo-label"><FileImage size={15} /> PHOTO · WEST CORRIDOR</span>
      </div>
      <div className="sx-message-object">
        <MessageSquareText size={17} />
        <p>“Still staging material here.<br />Probably another hour.”</p>
      </div>
      <div className="sx-capture-meta">
        <RecordValue label="SOURCE">Field MMS</RecordValue>
        <RecordValue label="OBSERVATION">Access condition unresolved</RecordValue>
      </div>
    </div>
  );
}

export function PlanObservationSplit() {
  return (
    <div className="sx-contradiction">
      <div className="sx-contrast-panel">
        <p className="sx-mono text-sx-muted">PROJECT PLAN</p>
        <h3 className="mt-9 text-3xl font-medium tracking-[-.05em]">L4 WEST</h3>
        <p className="mt-2 text-sm">PRIMER · START 07:00</p>
        <div className="mt-12"><State>INTENT LOCKED</State></div>
      </div>
      <div className="sx-not-equal" aria-label="does not equal">≠</div>
      <div className="sx-contrast-panel sx-contrast-observed">
        <p className="sx-mono text-sx-muted">OBSERVED STATE · 15:42</p>
        <h3 className="mt-9 text-3xl font-medium tracking-[-.05em]">L4 WEST</h3>
        <p className="mt-2 text-sm">CORRIDOR CLEARANCE</p>
        <div className="mt-12"><State>VERIFICATION INCOMPLETE</State></div>
      </div>
    </div>
  );
}

const layers = ["INTENT", "SITE STATE", "EVIDENCE", "DECISION", "ACTUAL", "IMPACT"] as const;

export function ExplodedRecord() {
  const target = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const spread = useTransform(scrollYProgress, [0.12, 0.45, 0.78], [0, 1, 0]);

  return (
    <div ref={target} className="sx-exploded-wrap">
      <div className="sx-exploded-sticky">
        <div className="sx-exploded-head"><span className="sx-mono">GR-0001</span><State>RECORD SEALED</State></div>
        <div className="sx-exploded-stack">
          {layers.map((layer, index) => <ExplodedLayer key={layer} label={layer} index={index} spread={spread} reduced={Boolean(reduced)} />)}
        </div>
        <div className="sx-exploded-foot"><ShieldCheck size={16} /><span className="sx-mono">SEALED RECORD · 14 CONSTITUENT EVENTS</span></div>
      </div>
    </div>
  );
}

function ExplodedLayer({ label, index, spread, reduced }: { label: string; index: number; spread: MotionValue<number>; reduced: boolean }) {
  const direction = index - (layers.length - 1) / 2;
  const y = useTransform(spread, [0, 1], [0, direction * 23]);
  return (
    <motion.div className="sx-exploded-layer" style={reduced ? undefined : { y }}>
      <span className="sx-mono text-sx-muted">0{index + 1}</span>
      <span className="sx-mono text-sx-ink">{label}</span>
      <Check size={14} />
    </motion.div>
  );
}
