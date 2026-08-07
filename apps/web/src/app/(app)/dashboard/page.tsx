import { IntelligenceOverview } from "@/components/scrutexity/watch/IntelligenceOverview";
import { AlertTriage } from "@/components/scrutexity/watch/AlertTriage";
import { WatchDriftTimeline } from "@/components/scrutexity/watch/WatchDriftTimeline";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export default async function WatchDashboardHome() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  // Fetch the user's domains
  const { data: domains } = await supabase
    .from('domains')
    .select('id, hostname, status, created_at')
    .order('created_at', { ascending: false });

  // For MVP, just get the first domain
  const activeDomain = domains?.[0];

  // Fetch alerts
  const { data: alerts } = await supabase
    .from('claim_drift_alerts')
    .select('*')
    .eq('domain_id', activeDomain?.id || '')
    .order('detected_at', { ascending: false });

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="mb-12">
        <h1 className="font-display text-3xl font-medium text-ink">Intelligence Overview</h1>
        <p className="text-sm text-muted mt-2">
          {activeDomain ? (
            <span>Continuous monitoring for {activeDomain.hostname}</span>
          ) : (
            <span>No active domains. Complete a scan to begin monitoring.</span>
          )}
        </p>
      </header>

      <IntelligenceOverview />
      
      <AlertTriage alerts={alerts || []} />

      <section>
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">Claim Drift Log</h2>
            <p className="text-sm text-muted mt-1">
              Tracking high-severity changes to absolute mechanistic claims.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted bg-paper border border-sand-deep/40 px-3 py-1.5 rounded-lg">
            <span>Filter:</span>
            <span className="text-ink">Highest Risk</span>
          </div>
        </header>

        <WatchDriftTimeline />
      </section>
    </div>
  );
}
