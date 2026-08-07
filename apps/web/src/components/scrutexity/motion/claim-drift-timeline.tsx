"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, ShieldAlert, AlertCircle, RefreshCw } from "lucide-react";

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

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-bureau-sage block mb-2" style={{ fontFamily: MONO }}>
          Continuous Monitoring // Claim Drift Timeline
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal">
          Track public copy &amp; evidence changes over time.
        </h2>
        <p className="mt-3 text-sm text-muted">
          A claim is not static. Scrutexity logs every modification, citation removal, and AI distortion date.
        </p>
      </div>

      <div className="bg-paper-light border border-sand-deep p-6 sm:p-8 shadow-xs">
        {/* Timeline Event Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {EVENTS.map((ev, i) => {
            const isActive = selectedIdx === i;
            return (
              <button
                key={ev.id}
                type="button"
                onClick={() => setSelectedIdx(i)}
                className={`p-4 text-left transition-all border ${
                  isActive
                    ? "bg-paper border-ink shadow-xs"
                    : "bg-paper-light border-sand-deep/60 hover:border-sand-deep"
                }`}
              >
                <div className="text-[10px] font-mono text-muted mb-1" style={{ fontFamily: MONO }}>
                  {ev.date}
                </div>
                <div className={`text-xs font-medium mb-2 ${isActive ? "text-ink" : "text-muted"}`}>
                  {ev.title}
                </div>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 border uppercase font-semibold ${
                    ev.statusType === "red"
                      ? "border-exposure-red/30 bg-exposure-red/10 text-exposure-red"
                      : ev.statusType === "amber"
                      ? "border-review-amber/30 bg-amber-bg text-review-amber"
                      : "border-bureau-sage/30 bg-paper text-bureau-sage"
                  }`}
                  style={{ fontFamily: MONO }}
                >
                  {ev.status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Event Inspection */}
        <div className="border border-sand-deep bg-paper p-6">
          <div className="flex justify-between items-center pb-3 border-b border-sand-deep/60 text-[10px] font-mono text-muted uppercase" style={{ fontFamily: MONO }}>
            <span>EVENT RECORD // {EVENTS[selectedIdx].date}</span>
            <span className="text-ink font-semibold">{EVENTS[selectedIdx].status}</span>
          </div>

          <div className="mt-4 space-y-3">
            {EVENTS[selectedIdx].oldText && (
              <div>
                <span className="text-[10px] font-mono uppercase text-muted block mb-1" style={{ fontFamily: MONO }}>
                  Previous State
                </span>
                <p className="text-xs font-mono text-muted line-through bg-paper-light p-3 border border-sand-deep/40" style={{ fontFamily: MONO }}>
                  {EVENTS[selectedIdx].oldText}
                </p>
              </div>
            )}

            <div>
              <span className="text-[10px] font-mono uppercase text-bureau-sage block mb-1" style={{ fontFamily: MONO }}>
                Observed Modification
              </span>
              <p className="text-sm font-mono text-ink bg-paper-light p-3 border border-bureau-sage/40" style={{ fontFamily: MONO }}>
                {EVENTS[selectedIdx].newText}
              </p>
            </div>

            <p className="text-xs text-muted pt-2">
              <span className="font-semibold text-ink">Note:</span> {EVENTS[selectedIdx].note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimDriftTimeline;
