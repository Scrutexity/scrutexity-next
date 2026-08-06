"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, FileSearch, ShieldAlert, Edit3, Lock } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const STAGES = [
  {
    id: "observe",
    num: "01",
    name: "Observe",
    label: "Point-in-time DOM capture",
    icon: Search,
    payload: {
      url: "https://example.com/wellness-landing",
      action: "DOM Snapshot Captured",
      detail: "HTML/CSS structural copy indexed with timestamp.",
    },
  },
  {
    id: "extract",
    num: "02",
    name: "Extract",
    label: "Substantive claim extraction",
    icon: FileSearch,
    payload: {
      category: "Biological Mechanism Claim",
      claim: "Reverses cellular aging in 14 days.",
      detail: "Isolated 14 substantive marketing statements.",
    },
  },
  {
    id: "match",
    num: "03",
    name: "Match",
    label: "Regulatory pattern mapping",
    icon: ShieldAlert,
    payload: {
      pattern: "FTC Section 5 Vector Match",
      vector: "Unsubstantiated timeframe & mechanism promise",
      detail: "Cross-referenced against FTC/FDA enforcement database.",
    },
  },
  {
    id: "rewrite",
    num: "04",
    name: "Rewrite",
    label: "Safer wording generation",
    icon: Edit3,
    payload: {
      safer: "Formulated with cellular nutrients observed to support skin hydration.",
      detail: "Language calibrated to visible evidentiary support.",
    },
  },
  {
    id: "seal",
    num: "05",
    name: "Seal",
    label: "Cryptographic hash-chain seal",
    icon: Lock,
    payload: {
      hash: "sha256:e3b0c44298fc1c149afbf4c8996fb924",
      status: "Verified Record Sealed",
      detail: "Immutable record stored in audit ledger.",
    },
  },
];

export function ClaimResolutionRail() {
  const [activeIdx, setActiveIdx] = useState(2);
  const reduced = useReducedMotion();
  const activeStage = STAGES[activeIdx];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-bureau-sage block mb-2" style={{ fontFamily: MONO }}>
          Process Rail // Canonical Stage Sequence
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal">
          Five stages. One verifiable record.
        </h2>
        <p className="mt-3 text-sm text-muted">
          Every claim observed by Scrutexity passes through this exact institutional rail.
        </p>
      </div>

      {/* Horizontal Rail (Desktop) / Stage Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 border-b border-sand-deep pb-6 mb-8">
        {STAGES.map((s, i) => {
          const isActive = activeIdx === i;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`p-4 text-left transition-all border ${
                isActive
                  ? "bg-paper-light border-ink shadow-xs"
                  : "bg-paper border-sand-deep/60 hover:border-sand-deep"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-muted mb-2" style={{ fontFamily: MONO }}>
                <span>{s.num}</span>
                <Icon size={14} className={isActive ? "text-ink" : "text-muted"} />
              </div>
              <div className={`text-sm font-medium ${isActive ? "text-ink" : "text-muted"}`}>
                {s.name}
              </div>
              <div className="text-[10px] font-mono text-muted truncate mt-1" style={{ fontFamily: MONO }}>
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Data Attachment Inspector */}
      <div className="bg-paper-light border border-sand-deep p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-sand-deep/60 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono text-muted uppercase tracking-[0.14em]" style={{ fontFamily: MONO }}>
              STAGE {activeStage.num} PAYLOAD ATTACHMENT
            </span>
            <h3 className="font-display text-2xl text-ink mt-0.5">{activeStage.name} — {activeStage.label}</h3>
          </div>
          <span className="mt-2 sm:mt-0 text-xs font-mono text-bureau-sage border border-bureau-sage/30 bg-paper px-3 py-1" style={{ fontFamily: MONO }}>
            STATUS: ACTIVE RAIL STEP
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(activeStage.payload).map(([key, val]) => (
            <div key={key} className="bg-paper border border-sand-deep/50 p-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted mb-1" style={{ fontFamily: MONO }}>
                {key}
              </div>
              <div className="text-xs font-mono text-ink leading-relaxed break-words" style={{ fontFamily: MONO }}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClaimResolutionRail;
