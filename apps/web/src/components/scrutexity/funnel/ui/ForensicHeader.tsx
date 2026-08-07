import { Lock } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

interface ForensicHeaderProps {
  targetUrl: string;
  scannedAt: string;
  hash?: string; // Only present in full package
}

export function ForensicHeader({ targetUrl, scannedAt, hash }: ForensicHeaderProps) {
  const dateStr = scannedAt.split('T')[0];

  return (
    <div className="bg-paper border-b border-sand-deep/40 p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-bureau-sage/10 flex items-center justify-center border border-bureau-sage/30">
          <Lock size={14} className="text-bureau-sage" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">Forensic Snapshot Record</h3>
          <p className="text-[10px] text-muted font-mono" style={{ fontFamily: MONO }}>
            TARGET: {targetUrl}
          </p>
        </div>
      </div>
      
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
        <p className="text-[10px] text-muted font-mono mt-1 uppercase" style={{ fontFamily: MONO }}>
          {dateStr} • {hash ? "SHA-256 HASH CHAIN" : "SECURE AUDIT"}
        </p>
      </div>
    </div>
  );
}
