import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { ClaimExhibit } from "../types";
import { SecureRedactBlock } from "./SecureRedactBlock";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

interface ExhibitCardProps {
  exhibit: ClaimExhibit;
}

export function ExhibitCard({ exhibit }: ExhibitCardProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Old Claim (Flagged) */}
      <div className="bg-paper border border-exposure-red/20 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-exposure-red" />
        <div className="flex items-start justify-between mb-3">
          <span className="text-[10px] font-mono text-exposure-red bg-exposure-red/10 px-2 py-1 rounded" style={{ fontFamily: MONO }}>
            FLAGGED
          </span>
          <AlertTriangle size={14} className="text-exposure-red" />
        </div>
        
        {exhibit.originalClaimText ? (
          <p className="text-sm text-ink font-medium leading-relaxed line-through decoration-exposure-red/50">
            {exhibit.originalClaimText}
          </p>
        ) : (
          <SecureRedactBlock lines={3} />
        )}
        
        <div className="mt-4 pt-3 border-t border-exposure-red/10">
          <span className="text-[10px] font-mono text-muted uppercase" style={{ fontFamily: MONO }}>
            Vector: {exhibit.vector?.name || "REDACTED"}
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
        
        {exhibit.remediatedClaimText ? (
          <p className="text-sm text-ink font-medium leading-relaxed">
            {exhibit.remediatedClaimText}
          </p>
        ) : (
          <SecureRedactBlock lines={3} />
        )}

        <div className="mt-4 pt-3 border-t border-bureau-sage/10">
          <span className="text-[10px] font-mono text-muted uppercase" style={{ fontFamily: MONO }}>
            Support: {exhibit.missingSupportReason || "REDACTED"}
          </span>
        </div>
      </div>
    </div>
  );
}
