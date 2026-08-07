"use client";

import { Download, Table } from "lucide-react";
import { ForensicHeader } from "../ui/ForensicHeader";
import { ExhibitCard } from "../ui/ExhibitCard";
import { FullExhibitPackage } from "../types";

interface UnlockedStateProps {
  data: FullExhibitPackage;
}

export function UnlockedState({ data }: UnlockedStateProps) {
  return (
    <div className="bg-paper-light border border-sand-deep/60 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Full provenance header */}
      <ForensicHeader targetUrl={data.targetUrl} scannedAt={data.scannedAt} hash={data.provenanceHash} />
      
      <div className="p-6 sm:p-8">
        
        {/* Export Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-sand-deep/40">
          <h3 className="text-lg font-display text-ink font-normal">Complete Exhibit Package</h3>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 text-xs font-mono text-muted hover:text-ink transition-colors">
              <Table size={14} /> Export CSV
            </button>
            <button className="flex items-center gap-2 text-xs font-mono bg-ink text-paper-light px-3 py-1.5 rounded hover:bg-clay-deep transition-colors">
              <Download size={14} /> Download Secure PDF
            </button>
          </div>
        </div>

        {/* Matrix */}
        <div className="space-y-12">
          {data.exhibits.map((exhibit, index) => (
            <div key={exhibit.id}>
              <div className="mb-3 text-xs font-mono text-muted uppercase tracking-widest">
                Exhibit {String.fromCharCode(65 + index)}
              </div>
              <ExhibitCard exhibit={exhibit} />
            </div>
          ))}
        </div>

        {/* Watch Upsell Pitch (Bottom) */}
        <div className="mt-16 pt-8 border-t border-dashed border-sand-deep/60">
          <div className="bg-paper border border-sand-deep/40 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-lg">
              <h4 className="text-xl font-display text-ink mb-2">Don't let these claims drift.</h4>
              <p className="text-sm text-muted leading-relaxed">
                You can fix these {data.totalGapsFound} claims today. But what happens when marketing updates the landing page next week? Scrutexity Watch is a surveillance perimeter for your public exposure.
              </p>
            </div>
            <div className="flex-shrink-0 text-center">
              <button className="h-11 px-6 bg-ink text-paper-light rounded-lg font-semibold text-sm hover:bg-clay-deep transition-colors w-full mb-3">
                Deploy Scrutexity Watch
              </button>
              <p className="text-[10px] text-muted max-w-[200px]">
                *We will apply your $99 audit fee toward your first month.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
