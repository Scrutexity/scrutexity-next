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
import { FileText, Shield, Edit, Hash, ArrowUpRight, CheckCircle2 } from "lucide-react";

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
      { label: "Evidentiary Support", val: "SUPPORT INCOMPLETE. No trial registration cited." },
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
      { label: "Ledger SHA-256 Digest", val: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
      { label: "Capture Date", val: "2026-08-07 T19:00Z" },
      { label: "Verification Seal", val: "CRYPTONET SEALED // IMMUTABLE AUDIT TRAIL" },
    ],
  },
];

export function ProofArtifactShelf() {
  const [activeId, setActiveId] = useState("receipt");
  const reduced = useReducedMotion();
  const shelfRef = useRef<HTMLDivElement>(null);

  // Parallax reactive motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !shelfRef.current) return;
    const rect = shelfRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeDoc = DOCUMENTS.find((d) => d.id === activeId) || DOCUMENTS[0];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-mono uppercase tracking-[0.16em] text-bureau-sage block mb-2"
          style={{ fontFamily: MONO }}
        >
          Proof Artifact Shelf // Canonical Records
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl text-ink font-normal"
        >
          Institutional evidence documents.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-sm text-muted"
        >
          Scrutexity generates four standardized documentary artifacts for every audit engagement.
        </motion.p>
      </div>

      {/* Tabs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 relative z-10">
        {DOCUMENTS.map((doc) => {
          const isActive = activeId === doc.id;
          const Icon = doc.icon;
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => setActiveId(doc.id)}
              className="relative p-4 text-left transition-all rounded-xl overflow-hidden focus-visible:outline-none"
            >
              {/* Active Tab Sliding Pill Effect */}
              {isActive && (
                <motion.div
                  layoutId="activeArtifactTab"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-0 bg-paper-light border border-hairline shadow-md rounded-xl z-0"
                />
              )}

              <div className="relative z-10">
                <div className="flex justify-between items-center text-[10px] font-mono text-muted mb-2" style={{ fontFamily: MONO }}>
                  <span>{doc.folio}</span>
                  <Icon size={14} className={isActive ? "text-bureau-sage" : "text-muted"} />
                </div>
                <div className={`text-sm font-medium transition-colors ${isActive ? "text-ink font-semibold" : "text-muted hover:text-ink"}`}>
                  {doc.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Document Card Simulation with 3D Tilt */}
      <motion.div
        ref={shelfRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
        className="bg-paper/95 backdrop-blur-md border border-hairline p-6 sm:p-8 shadow-2xl rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-bureau-sage/30"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDoc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap justify-between items-center border-b border-hairline pb-4 mb-6 gap-3">
              <div>
                <span className="text-[10px] font-mono text-bureau-sage uppercase tracking-[0.14em] font-semibold" style={{ fontFamily: MONO }}>
                  {activeDoc.folio} // {activeDoc.tag}
                </span>
                <h3 className="font-display text-2xl text-ink mt-0.5">{activeDoc.title}</h3>
              </div>
              <a
                href="/sample-report"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-bureau-sage hover:underline bg-bureau-sage/10 px-3 py-1.5 rounded-full border border-bureau-sage/30 transition-all hover:bg-bureau-sage/20"
                style={{ fontFamily: MONO }}
              >
                INSPECT FULL REPORT <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="space-y-4">
              {activeDoc.fields.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="p-4 border border-hairline bg-paper-light/70 rounded-xl transition-colors hover:border-hairline/80"
                >
                  <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted mb-1 flex items-center gap-1.5" style={{ fontFamily: MONO }}>
                    <CheckCircle2 size={11} className="text-bureau-sage" /> {f.label}
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-ink leading-relaxed break-words" style={{ fontFamily: MONO }}>
                    {f.val}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ProofArtifactShelf;

