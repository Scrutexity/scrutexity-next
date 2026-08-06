"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export function LivingClaimReceipt() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(reduced ? 6 : 0);

  useEffect(() => {
    if (reduced) return;

    const t1 = setTimeout(() => setStep(1), 500);   // Underline claim
    const t2 = setTimeout(() => setStep(2), 1200);  // Hairline to evidence
    const t3 = setTimeout(() => setStep(3), 1800);  // Status change: SUPPORT INCOMPLETE
    const t4 = setTimeout(() => setStep(4), 2400);  // Safer rewrite reveals
    const t5 = setTimeout(() => setStep(5), 3200);  // Stamp footer & digest
    const t6 = setTimeout(() => setStep(6), 3500);  // Complete & frozen static

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [reduced]);

  return (
    <div className="w-full max-w-lg mx-auto bg-paper-light border border-sand-deep p-6 sm:p-7 shadow-xs text-ink font-sans relative select-none">
      {/* Archival Folio Header */}
      <div className="flex justify-between items-center pb-4 border-b border-sand-deep/60 text-[10px] tracking-[0.12em] uppercase text-muted font-mono">
        <span>BUREAU RECORD // REC-2026-8942-B</span>
        <span>VERIFIED RECORD</span>
      </div>

      {/* Source URL */}
      <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted">
        <span className="text-bureau-sage">SRC:</span>
        <span className="truncate border-b border-sand-deep/40 pb-0.5 text-ink" style={{ fontFamily: MONO }}>
          https://vitalitymedspa.com/services/cellular-rejuvenation
        </span>
      </div>

      {/* Observed Claim Section */}
      <div className="mt-6">
        <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted mb-1" style={{ fontFamily: MONO }}>
          01. Observed Public Claim
        </div>
        <div className="relative inline-block text-lg sm:text-xl font-normal leading-snug text-ink">
          &ldquo;Clinically proven to reverse aging at cellular level.&rdquo;
          {/* Underline motion */}
          {step >= 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 -bottom-1 h-px bg-review-amber origin-left"
            />
          )}
        </div>
      </div>

      {/* Hairline connector */}
      <div className="my-4 h-4 flex items-center justify-center">
        {step >= 2 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 16, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-px bg-sand-deep"
          />
        )}
      </div>

      {/* Evidence Status & Gap */}
      <div className="p-4 border border-sand-deep bg-paper">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted" style={{ fontFamily: MONO }}>
            02. Visible Evidence Support
          </span>
          {step >= 3 ? (
            <span className="border border-review-amber/30 bg-amber-bg px-2.5 py-0.5 text-[10px] font-mono font-semibold text-review-amber uppercase" style={{ fontFamily: MONO }}>
              SUPPORT INCOMPLETE
            </span>
          ) : (
            <span className="text-[10px] font-mono text-muted" style={{ fontFamily: MONO }}>ANALYZING...</span>
          )}
        </div>
        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs text-muted leading-relaxed"
          >
            No clinical trial registration (NCT#) or peer-reviewed human subject study cited on public landing surface.
          </motion.p>
        )}
      </div>

      {/* Safer Rewrite Reveal */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-4 border border-bureau-sage/30 bg-paper-light"
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-bureau-sage mb-1" style={{ fontFamily: MONO }}>
            03. Evidence-Anchored Language
          </div>
          <p className="text-sm text-ink leading-relaxed font-normal">
            &ldquo;Formulated with antioxidants to support cellular hydration and metabolic wellness.&rdquo;
          </p>
        </motion.div>
      )}

      {/* Footer Timestamp & Digest Stamp */}
      <div className="mt-6 pt-4 border-t border-sand-deep/60 flex items-center justify-between text-[10px] font-mono text-muted" style={{ fontFamily: MONO }}>
        <div>
          STAMPED: <span className="text-ink">AUG 06, 2026</span>
        </div>
        {step >= 5 ? (
          <div className="text-right">
            <span className="text-bureau-sage">HASH:</span> sha256:e3b0c44298...
          </div>
        ) : (
          <div>HASHING...</div>
        )}
      </div>
    </div>
  );
}

export default LivingClaimReceipt;
