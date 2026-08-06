"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Shield, Edit, Hash, ArrowUpRight } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const DOCUMENTS = [
  {
    id: "receipt",
    folio: "FOLIO-01/89",
    title: "Claim Receipt",
    tag: "PRIMARY AUDIT RECORD",
    icon: FileText,
    fields: [
      { label: "Observed Text", val: "Clinically proven to reverse cellular aging in 14 days." },
      { label: "Evidentiary Support", val: "SUPPORT INCOMPLETE — No trial registration cited." },
      { label: "Safer Wording", val: "Formulated with cellular nutrients observed to support hydration." },
    ],
  },
  {
    id: "evidence",
    folio: "FOLIO-02/89",
    title: "Evidence Map",
    tag: "SOURCE PROVENANCE",
    icon: Shield,
    fields: [
      { label: "Indexed Source URLs", val: "3 public pages (landing, terms, product sheet)." },
      { label: "Enforcement Vector", val: "FTC Section 5 + FDA 503A compounding guidelines." },
      { label: "Confidence Rating", val: "HIGH COMPLIANCE RISK (Vector Score: 8.4/10)." },
    ],
  },
  {
    id: "rewrite",
    folio: "FOLIO-03/89",
    title: "Rewrite Exhibit",
    tag: "REMEDIATION PROPOSAL",
    icon: Edit,
    fields: [
      { label: "Original Claim", val: "100% safe & guaranteed 5x return on investment." },
      { label: "Remediated Copy", val: "Case study participants experienced measurable operational yield gains." },
      { label: "Status", val: "COUNSEL-APPROVED REMEDIATION MATRIX." },
    ],
  },
  {
    id: "digest",
    folio: "FOLIO-04/89",
    title: "Public Digest",
    tag: "HASH-CHAINED RECORD",
    icon: Hash,
    fields: [
      { label: "Ledger SHA-256 Digest", val: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
      { label: "Capture Date", val: "2026-08-06 T14:32:00Z" },
      { label: "Verification Seal", val: "S-MARK VALIDATED // IMMUTABLE RECORD" },
    ],
  },
];

export function ProofArtifactShelf() {
  const [activeId, setActiveId] = useState("receipt");
  const activeDoc = DOCUMENTS.find((d) => d.id === activeId) || DOCUMENTS[0];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-bureau-sage block mb-2" style={{ fontFamily: MONO }}>
          Proof Artifact Shelf // Canonical Records
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal">
          Institutional evidence documents.
        </h2>
        <p className="mt-3 text-sm text-muted">
          Scrutexity generates four standardized documentary artifacts for every audit engagement.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {DOCUMENTS.map((doc) => {
          const isActive = activeId === doc.id;
          const Icon = doc.icon;
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => setActiveId(doc.id)}
              className={`p-4 text-left transition-all border ${
                isActive
                  ? "bg-paper-light border-ink shadow-xs translate-y-[-2px]"
                  : "bg-paper border-sand-deep/60 hover:border-sand-deep"
              }`}
            >
              <div className="flex justify-between items-center text-[10px] font-mono text-muted mb-2" style={{ fontFamily: MONO }}>
                <span>{doc.folio}</span>
                <Icon size={14} className={isActive ? "text-ink" : "text-muted"} />
              </div>
              <div className={`text-sm font-medium ${isActive ? "text-ink" : "text-muted"}`}>
                {doc.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Document Card Simulation */}
      <div className="bg-paper-light border border-sand-deep p-6 sm:p-8 shadow-xs relative">
        <div className="flex justify-between items-center border-b border-sand-deep/60 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono text-muted uppercase tracking-[0.14em]" style={{ fontFamily: MONO }}>
              {activeDoc.folio} // {activeDoc.tag}
            </span>
            <h3 className="font-display text-2xl text-ink mt-0.5">{activeDoc.title}</h3>
          </div>
          <a
            href="/sample-report"
            className="inline-flex items-center gap-1 text-xs font-mono text-bureau-sage hover:underline"
            style={{ fontFamily: MONO }}
          >
            INSPECT FULL REPORT <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="space-y-4">
          {activeDoc.fields.map((f, i) => (
            <div key={i} className="p-4 border border-sand-deep/50 bg-paper">
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted mb-1" style={{ fontFamily: MONO }}>
                {f.label}
              </div>
              <div className="text-xs sm:text-sm font-mono text-ink leading-relaxed break-words" style={{ fontFamily: MONO }}>
                {f.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProofArtifactShelf;
