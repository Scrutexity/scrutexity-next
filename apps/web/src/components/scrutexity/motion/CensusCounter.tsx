"use client";

import { Network, FileWarning } from "lucide-react";

const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export function CensusCounter() {
  return (
    <div className="rounded-3xl border border-sand-deep/35 bg-cream-deep/90 p-8 md:p-10 shadow-[0_16px_48px_-16px_rgba(28,24,20,0.06)] backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-sand-deep/20 pb-4 mb-6 font-mono text-[10px] tracking-[0.18em] uppercase text-mist">
        <span>ARCHIVE_NODE // DISTORTION_CENSUS</span>
        <div className="flex items-center gap-1.5 text-sage-deep">
          <Network size={12} />
          NETWORK ACTIVE
        </div>
      </div>
      
      <div className="text-center py-8">
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-espresso mb-3" style={{ fontFamily: MONO_STACK }}>
          <FileWarning size={14} />
          Distortion Census Archive
        </div>
        <div className="font-mono text-2xl font-bold tracking-tight text-espresso mt-4">
          Standard active. Census publishes at first 1,000 records.
        </div>
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-espresso/60 font-mono" style={{ fontFamily: MONO_STACK }}>
        <span className="h-1.5 w-1.5 rounded-full bg-sage-deep animate-ping" />
        Monitoring risk drift across the public web
      </div>
    </div>
  );
}
