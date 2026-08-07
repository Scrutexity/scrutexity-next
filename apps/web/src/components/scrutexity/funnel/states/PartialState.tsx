"use client";

import { ForensicHeader } from "../ui/ForensicHeader";
import { ExhibitCard } from "../ui/ExhibitCard";
import { EmbeddedCheckout } from "../ui/EmbeddedCheckout";
import { PartialRevealResult } from "../types";

interface PartialStateProps {
  data: PartialRevealResult;
  onPurchaseSuccess: () => void;
}

export function PartialState({ data, onPurchaseSuccess }: PartialStateProps) {
  return (
    <div className="bg-paper-light border border-sand-deep/60 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
      <ForensicHeader targetUrl={data.targetUrl} scannedAt={data.scannedAt} />
      
      <div className="p-6 sm:p-8 space-y-8">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-ink font-semibold">
              Exhibit A Unlocked.
            </span>
          </div>
          
          <ExhibitCard exhibit={data.exhibitA} />
        </div>

        <div className="border-t border-sand-deep/40 pt-8 relative">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-6 w-6 rounded-full bg-review-amber/10 flex items-center justify-center text-[10px] text-review-amber font-mono">
              {data.totalGapsFound - 1}
            </div>
            <span className="text-sm text-ink font-medium">
              We found {data.totalGapsFound - 1} more high-exposure claims on this surface.
            </span>
          </div>
          
          {/* Embedded Checkout overrides the blur/locked list */}
          <EmbeddedCheckout onSuccess={onPurchaseSuccess} scanId={data.scanId} />
        </div>
      </div>
    </div>
  );
}
