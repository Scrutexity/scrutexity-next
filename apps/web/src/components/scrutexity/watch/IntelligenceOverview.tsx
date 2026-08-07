import { ShieldAlert, TrendingUp, Search } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export function IntelligenceOverview() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-paper-light border border-sand-deep/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-exposure-red" />
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest" style={{ fontFamily: MONO }}>
            Active Exposure
          </span>
          <ShieldAlert size={16} className="text-exposure-red" />
        </div>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-display text-ink font-light">3</span>
          <span className="text-sm text-muted mb-1">Flagged Vectors</span>
        </div>
        <p className="text-xs text-exposure-red mt-4 font-medium bg-exposure-red/10 px-2 py-1 rounded inline-block">
          FDA Title 21 Mismatches Detected
        </p>
      </div>

      <div className="bg-paper border border-sand-deep/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest" style={{ fontFamily: MONO }}>
            Drift Velocity
          </span>
          <TrendingUp size={16} className="text-bureau-sage" />
        </div>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-display text-ink font-light">+12%</span>
          <span className="text-sm text-muted mb-1">30-Day Change</span>
        </div>
        <p className="text-xs text-muted mt-4">
          Marketing altered 4 base claims since last review.
        </p>
      </div>

      <div className="bg-paper border border-sand-deep/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest" style={{ fontFamily: MONO }}>
            Monitored Surface
          </span>
          <Search size={16} className="text-muted" />
        </div>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-display text-ink font-light">42</span>
          <span className="text-sm text-muted mb-1">Pages</span>
        </div>
        <p className="text-xs text-muted mt-4">
          Across 2 primary domains and 3 ad platforms.
        </p>
      </div>
    </div>
  );
}
