"use client";

import React from "react";
import { ShieldCheck, RefreshCw, FileWarning } from "lucide-react";

export function SMarkLifecycle() {
  return (
    <div className="rounded-3xl border border-sand-deep/40 bg-cream-deep/95 p-6 md:p-8 max-w-md shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-sand-deep/20 pb-4 mb-5 font-mono text-[10px] tracking-[0.18em] uppercase text-mist">
        <span>RECORD_LIFECYCLE // REVIEW_STATE</span>
        <div className="flex items-center gap-1.5 text-sage-deep">
          <ShieldCheck size={12} />
          RECORD ACTIVE
        </div>
      </div>

      <div className="rounded-2xl border border-sage-deep/40 bg-sage/12 p-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-sage-deep shrink-0" size={18} />
          <div>
            <div className="text-[10px] uppercase tracking-widest font-semibold text-sage-deep">
              Dated review record
            </div>
            <div className="mt-1 font-mono text-xs text-espresso">
              Reviewed 06/26/2026 · claims, support, and rewrites on file
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-start gap-3 rounded-2xl border border-sand-deep/25 bg-bone/70 p-3.5">
          <RefreshCw className="text-espresso/60 shrink-0 mt-0.5" size={15} />
          <p className="text-xs text-espresso/75 font-sans leading-relaxed">
            A re-review is triggered by change, not a clock: published page edits, new
            evidence, or an enforcement update that affects a mapped claim.
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-sand-deep/25 bg-bone/70 p-3.5">
          <FileWarning className="text-espresso/60 shrink-0 mt-0.5" size={15} />
          <p className="text-xs text-espresso/75 font-sans leading-relaxed">
            The record keeps the dated chronology: what was claimed, what supported it,
            who approved the change, and how the surface evolved.
          </p>
        </div>
      </div>
    </div>
  );
}
