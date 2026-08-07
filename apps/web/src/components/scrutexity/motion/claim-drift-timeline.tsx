"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Clock, ShieldAlert, AlertCircle, RefreshCw, GitCommit } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const EVENTS = [
  {
    id: 1,
    date: "JUNE 03, 2026",
    title: "Initial Baseline Observation",
    status: "RECORD VERIFIED",
    statusType: "sage",
    oldText: "",
    newText: '"FDA-approved laser treatment"',
    note: "Public claim captured on treatments page.",
  },
  {
    id: 2,
    date: "JUNE 18, 2026",
    title: "Claim Modification Detected",
    status: "LANGUAGE DRIFT",
    statusType: "amber",
    oldText: '"FDA-approved laser treatment"',
    newText: '"FDA-cleared laser technology"',
    note: "Copy adjusted from 'approved' to 'cleared'.",
  },
  {
    id: 3,
    date: "JULY 07, 2026",
    title: "Evidence Link Removal",
    status: "SUPPORT REMOVED",
    statusType: "red",
    oldText: "Citation link: clinicaltrials.gov/ct2/show/NCT04...",
    newText: "[Evidence link removed from public footer]",
    note: "Primary evidentiary citation deleted by site owner.",
  },
  {
    id: 4,
    date: "AUGUST 01, 2026",
    title: "Record Expiration & Review Trigger",
    status: "REVIEW REQUIRED",
    statusType: "red",
    oldText: "S-Mark Status: ACTIVE (Age: 30d)",
    newText: "S-Mark Status: EXPIRED (Age: 60d, audit due)",
    note: "Hash record requires re-verification.",
  },
];

export function ClaimDriftTimeline() {
  const [selectedIdx, setSelectedIdx] = useState(1);
  const reduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Parallax reactive motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const selectedEvent = EVENTS[selectedIdx];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-mono uppercase tracking-[0.16em] text-bureau-sage inline-flex items-center gap-1.5 mb-2"
          style={{ fontFamily: MONO }}
        >
          <GitCommit size={13} className="text-bureau-sage" /> Continuous Monitoring // Claim Drift Timeline
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl text-ink font-normal"
        >
          Track public copy &amp; evidence changes over time.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-sm text-muted"
        >
          A claim is not static. Scrutexity logs every modification, citation removal, and AI distortion date.
        </motion.p>
      </div>

      <motion.div
        ref={timelineRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
        className="bg-paper/95 backdrop-blur-md border border-hairline p-6 sm:p-8 shadow-2xl rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-bureau-sage/30"
      >
        {/* Timeline Event Cards */}
        <div className="grid md:grid-cols-4 gap-3 mb-8 relative z-10">
          {EVENTS.map((ev, i) => {
            const isActive = selectedIdx === i;
            return (
              <button
                key={ev.id}
                type="button"
                onClick={() => setSelectedIdx(i)}
                className="relative p-4 text-left transition-all rounded-xl overflow-hidden focus-visible:outline-none"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTimelineCard"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-paper-light border border-hairline shadow-md rounded-xl z-0"
                  />
                )}

                <div className="relative z-10">
                  <div className="text-[10px] font-mono text-muted mb-1 flex items-center justify-between" style={{ fontFamily: MONO }}>
                    <span>{ev.date}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-bureau-sage animate-ping" />}
                  </div>
                  <div className={`text-xs font-medium mb-2 transition-colors ${isActive ? "text-ink font-semibold" : "text-muted hover:text-ink"}`}>
                    {ev.title}
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-md border uppercase font-semibold inline-block ${
                      ev.statusType === "red"
                        ? "border-exposure-red/30 bg-exposure-red/10 text-exposure-red"
                        : ev.statusType === "amber"
                        ? "border-review-amber/30 bg-amber-bg text-review-amber"
                        : "border-bureau-sage/30 bg-bureau-sage/10 text-bureau-sage"
                    }`}
                    style={{ fontFamily: MONO }}
                  >
                    {ev.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Event Inspection */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="border border-hairline bg-paper-light/70 p-6 rounded-xl space-y-4"
          >
            <div className="flex justify-between items-center pb-3 border-b border-hairline text-[10px] font-mono text-muted uppercase" style={{ fontFamily: MONO }}>
              <span>EVENT RECORD // {selectedEvent.date}</span>
              <span className="text-bureau-sage font-semibold">{selectedEvent.status}</span>
            </div>

            <div className="space-y-3">
              {selectedEvent.oldText && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted block mb-1" style={{ fontFamily: MONO }}>
                    Previous State
                  </span>
                  <p className="text-xs font-mono text-muted line-through bg-paper p-3 rounded-lg border border-hairline" style={{ fontFamily: MONO }}>
                    {selectedEvent.oldText}
                  </p>
                </div>
              )}

              <div>
                <span className="text-[10px] font-mono uppercase text-bureau-sage block mb-1" style={{ fontFamily: MONO }}>
                  Observed Modification
                </span>
                <p className="text-sm font-mono text-ink bg-paper p-3 rounded-lg border border-bureau-sage/40 shadow-xs" style={{ fontFamily: MONO }}>
                  {selectedEvent.newText}
                </p>
              </div>

              <p className="text-xs text-muted pt-1">
                <span className="font-semibold text-ink">Note:</span> {selectedEvent.note}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ClaimDriftTimeline;

