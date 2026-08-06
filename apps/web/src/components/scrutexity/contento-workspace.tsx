"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Check } from 'lucide-react';
import { HashSeal } from './os';

const SERIF = "var(--font-satoshi), system-ui, sans-serif";
const MONO = 'var(--font-jetbrains-mono), ui-monospace, Menlo, Monaco, monospace';
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Contento — the Governed Workspace (Layer 02 · Fix).
 *
 * A live, interactive demo of the product's core mechanic: a risky claim on the
 * left is rewritten into proof-backed language on the right, which clears the
 * governance lock and unlocks "Seal & Publish". The Seal & Publish button is
 * intentionally hostile to risk — it stays a dead grey block until zero
 * unsupported claims remain.
 *
 * All clinical figures are bracketed illustrative placeholders so the marketing
 * UI never asserts unverified data (CPOM/FTC §6).
 */
export default function ContentoWorkspace() {
  const [resolved, setResolved] = useState(false);
  const [sealed, setSealed] = useState(false);
  const unresolved = resolved ? 0 : 1;

  return (
    <div className="flex h-[80vh] max-h-[760px] w-full flex-col overflow-hidden rounded-2xl border border-espresso/10 bg-bone shadow-[0_22px_70px_-45px_rgba(28,24,20,0.4)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-espresso/10 bg-white/50 px-6 py-5 backdrop-blur-md sm:px-8">
        <div>
          <h3 className="text-2xl text-espresso sm:text-3xl" style={{ fontFamily: SERIF }}>
            Weight Loss Service Page
          </h3>
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-espresso/40" style={{ fontFamily: MONO }}>
            Target: Landing Page · Status: {resolved ? 'GOVERNED' : 'IN REVIEW'}
          </p>
        </div>
        <motion.div
          layout
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
            resolved ? 'bg-sage/15 text-sage-deep' : 'bg-clay/10 text-clay'
          }`}
          style={{ fontFamily: MONO }}
        >
          {resolved ? '0 Risks · Governed' : `${unresolved} Risk Remaining`}
        </motion.div>
      </div>

      {/* Split-pane editor */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* LEFT — raw draft (the risk) */}
        <div className="overflow-y-auto border-b border-espresso/10 p-6 sm:p-8 md:w-1/2 md:border-b-0 md:border-r">
          <h4 className="mb-5 text-[11px] uppercase tracking-[0.16em] text-espresso/40" style={{ fontFamily: MONO }}>
            Raw Draft
          </h4>
          <p className="text-base leading-relaxed text-espresso sm:text-lg">
            Welcome to our premier weight loss clinic. Our new FDA-approved treatments are guaranteed to help you{' '}
            <span
              className={`relative ${
                resolved
                  ? 'text-espresso/40 line-through decoration-clay/60 decoration-2'
                  : 'group border-b border-clay bg-clay/10 pb-0.5 text-clay'
              } transition-colors`}
            >
              lose 20 lbs in your first month
              {!resolved && (
                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded bg-espresso p-2 text-xs text-bone opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  Unsupported numeric guarantee.
                </span>
              )}
            </span>{' '}
            without any extreme dieting.
          </p>

          {!resolved ? (
            <button
              type="button"
              onClick={() => setResolved(true)}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-bone transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-deep"
              style={{ fontFamily: MONO }}
            >
              Apply governed rewrite
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <p className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-sage-deep" style={{ fontFamily: MONO }}>
              <Check size={14} /> Claim rewritten with proof
            </p>
          )}
        </div>

        {/* RIGHT — governed output (the fix) */}
        <div className="relative overflow-y-auto bg-espresso p-6 shadow-inner sm:p-8 md:w-1/2">
          <h4 className="mb-5 text-[11px] uppercase tracking-[0.16em] text-bone/40" style={{ fontFamily: MONO }}>
            Governed Output
          </h4>
          <p className="text-base leading-relaxed text-bone/90 sm:text-lg">
            Welcome to our premier weight loss clinic. Our treatments utilize FDA-approved medications shown to help
            patients achieve meaningful results.{' '}
            <AnimatePresence mode="wait" initial={false}>
              {resolved ? (
                <motion.span
                  key="rewrite"
                  layoutId="rewrite-block"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="group relative inline-block rounded border border-white/10 bg-white/5 px-1.5 py-0.5"
                >
                  In the [ILLUSTRATIVE_TRIAL_NAME] trial (N=[COHORT_SIZE]), patients lost an average of
                  [VERIFIED_PERCENTAGE] body weight over [TIMEFRAME].
                  <span className="absolute left-full top-1/2 z-10 ml-3 hidden -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded bg-bone px-2 py-1 text-espresso opacity-0 shadow-md transition-opacity group-hover:opacity-100 md:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                    <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: MONO }}>
                      [ILLUSTRATIVE_TRIAL_NAME]
                    </span>
                  </span>
                </motion.span>
              ) : (
                <motion.span
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-block rounded border border-dashed border-bone/20 px-1.5 py-0.5 text-bone/35"
                >
                  awaiting governed rewrite…
                </motion.span>
              )}
            </AnimatePresence>{' '}
            Individual results vary, and our clinical team monitors all treatments for safety.
          </p>
        </div>
      </div>

      {/* Governance-lock footer */}
      <div className="flex items-center justify-between gap-4 border-t border-espresso/10 bg-white p-5 sm:p-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`h-2 w-2 shrink-0 rounded-full ${resolved ? 'bg-sage' : 'bg-clay'}`} />
          <span className="truncate text-[11px] uppercase tracking-[0.14em] text-espresso/60" style={{ fontFamily: MONO }}>
            {sealed ? 'Sealed · read-only analysis' : resolved ? 'All claims supported' : 'Governance lock active'}
          </span>
          {sealed && <HashSeal value="0x8f9a17f4e8d2" label="" className="hidden sm:flex" />}
        </div>

        <button
          type="button"
          disabled={unresolved > 0 || sealed}
          onClick={() => setSealed(true)}
          className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-6 py-3 text-xs uppercase tracking-[0.15em] transition-all duration-300 sm:px-8 ${
            sealed
              ? 'cursor-default bg-sage-deep text-bone'
              : unresolved === 0
                ? 'cursor-pointer bg-espresso text-bone hover:-translate-y-0.5 hover:bg-clay hover:shadow-lg'
                : 'cursor-not-allowed border border-espresso/10 bg-bone text-espresso/30'
          }`}
          style={{ fontFamily: MONO }}
        >
          {sealed ? (
            <>
              <Check size={14} /> Sealed &amp; Published
            </>
          ) : (
            <>
              <Lock size={13} /> Seal &amp; Publish
            </>
          )}
        </button>
      </div>
    </div>
  );
}
