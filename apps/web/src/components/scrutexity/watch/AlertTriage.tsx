import { BellRing, ArrowRight } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export interface Alert {
  claim_id: string;
  domain_id: string;
  scan_id: string;
  claim_text: string;
  vector_category: string;
  current_severity: string;
  detected_at: string;
}

export function AlertTriage({ alerts = [] }: { alerts?: Alert[] }) {
  if (alerts.length === 0) return null;

  return (
    <div className="bg-paper-light border border-exposure-red/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12">
      <div className="absolute top-0 right-0 w-32 h-32 bg-exposure-red/10 blur-[50px] pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 rounded-full bg-exposure-red/10 flex items-center justify-center border border-exposure-red/30">
          <BellRing size={14} className="text-exposure-red" />
        </div>
        <h3 className="text-lg font-display text-ink">Action Required: {alerts.length} New Mismatch{alerts.length > 1 ? 'es' : ''}</h3>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.claim_id} className="bg-paper border border-sand-deep/40 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono bg-exposure-red/10 text-exposure-red px-2 py-0.5 rounded uppercase" style={{ fontFamily: MONO }}>
                  {alert.vector_category}_DRIFT
                </span>
                <span className="text-xs text-muted font-mono" style={{ fontFamily: MONO }}>
                  DETECTED {new Date(alert.detected_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-ink font-medium">
                "{alert.claim_text.substring(0, 80)}{alert.claim_text.length > 80 ? '...' : ''}"
              </p>
              <p className="text-xs text-muted mt-1">
                Claim severity elevated to {alert.current_severity}. Immediate remediation required.
              </p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 py-2 bg-paper text-ink border border-sand-deep/40 rounded-lg text-xs font-semibold hover:border-bureau-sage transition-colors">
                Acknowledge
              </button>
              <button className="flex-1 md:flex-none px-4 py-2 bg-exposure-red text-paper-light rounded-lg text-xs font-semibold hover:bg-red-500 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,77,77,0.3)]">
                Review Remediations <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
