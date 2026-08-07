"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, FileText, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

interface ResultPreviewProps {
  isVisible: boolean;
  url: string;
  industry: string;
}

export function ResultPreview({ isVisible, url, industry }: ResultPreviewProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-full max-w-4xl mx-auto mt-16 z-20"
    >
      <div className="bg-paper-light border border-sand-deep/60 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* Header / Banner */}
        <div className="bg-paper border-b border-sand-deep/40 p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-bureau-sage/10 flex items-center justify-center border border-bureau-sage/30">
              <Lock size={14} className="text-bureau-sage" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">Forensic Snapshot Record</h3>
              <p className="text-[10px] text-muted font-mono" style={{ fontFamily: MONO }}>
                TARGET: {url || "https://example.com"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bureau-sage opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-bureau-sage"></span>
                </span>
                <span className="text-[10px] font-mono text-bureau-sage tracking-wider" style={{ fontFamily: MONO }}>
                  RECORDED
                </span>
              </div>
              <p className="text-[10px] text-muted font-mono mt-1" style={{ fontFamily: MONO }}>
                {new Date().toISOString().split('T')[0]} • SHA-256 HASH CHAIN
              </p>
            </div>
          </div>
        </div>

        {/* Exhibit Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText size={16} className="text-muted" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted" style={{ fontFamily: MONO }}>
                Exhibit A: Highest Risk Claim
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Old Claim */}
              <div className="bg-paper border border-exposure-red/20 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-exposure-red" />
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-mono text-exposure-red bg-exposure-red/10 px-2 py-1 rounded" style={{ fontFamily: MONO }}>
                    FLAGGED
                  </span>
                  <AlertTriangle size={14} className="text-exposure-red" />
                </div>
                <p className="text-sm text-ink font-medium leading-relaxed line-through decoration-exposure-red/50">
                  "Clinically proven to reverse cellular aging in 14 days and guarantee 5x ROI."
                </p>
                <div className="mt-4 pt-3 border-t border-exposure-red/10">
                  <span className="text-[10px] font-mono text-muted uppercase" style={{ fontFamily: MONO }}>
                    Vector: Unsubstantiated mechanism & absolute timeframe
                  </span>
                </div>
              </div>

              {/* Remediated Claim */}
              <div className="bg-paper border border-bureau-sage/20 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-bureau-sage" />
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-mono text-bureau-sage bg-bureau-sage/10 px-2 py-1 rounded" style={{ fontFamily: MONO }}>
                    REMEDIATED
                  </span>
                  <CheckCircle2 size={14} className="text-bureau-sage" />
                </div>
                <p className="text-sm text-ink font-medium leading-relaxed">
                  "Formulated with cellular nutrients observed to support hydration and metabolic resilience."
                </p>
                <div className="mt-4 pt-3 border-t border-bureau-sage/10">
                  <span className="text-[10px] font-mono text-muted uppercase" style={{ fontFamily: MONO }}>
                    Support: Preserves commercial intent within evidentiary bounds
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-sand-deep/40 pt-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-review-amber/10 flex items-center justify-center text-[10px] text-review-amber font-mono" style={{ fontFamily: MONO }}>
                14
              </div>
              <span className="text-xs text-muted">More gaps found on this surface</span>
            </div>
            
            <Link
              href="/snapshot"
              className="inline-flex items-center gap-2 text-xs font-semibold text-ink hover:text-bureau-sage transition-colors"
            >
              Run this on your own site <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
