"use client";

import { useMemo, useState } from "react";
import { ChevronRight, CircleAlert, FileSearch, MapPinned, PanelRightClose } from "lucide-react";
import {
  claimFlags,
  formatCurrency,
  formatPercent,
  portfolioTotals,
  telemetryLocations,
  type LocationTelemetry,
} from "@/lib/july-governance-data";

const totals = portfolioTotals();

export default function RadarCommandCenter() {
  const [selectedClinicId, setSelectedClinicId] = useState(telemetryLocations[0]?.id);
  const selectedClinic = telemetryLocations.find((location) => location.id === selectedClinicId) ?? telemetryLocations[0];
  const selectedFlags = claimFlags.filter((flag) => flag.clinicId === selectedClinic.id);

  const regions = useMemo(() => {
    return telemetryLocations.reduce<Record<string, LocationTelemetry[]>>((acc, location) => {
      acc[location.region] = acc[location.region] ?? [];
      acc[location.region].push(location);
      return acc;
    }, {});
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4F0] text-[#1C1C1C]">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="grid gap-8 border-b border-[#1C1C1C]/15 pb-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B86F4F]">
              Claim Intelligence Review / Franchise Command Center
            </p>
            <h1 className="mt-4 font-display text-5xl leading-none tracking-normal md:text-7xl">
              Parent-child governance for multi-site claims.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#1C1C1C]/68">
              The franchise view exists for one purpose: make location-level claim exposure financially legible before it damages retention, ad efficiency, or diligence posture.
            </p>
          </div>
          <div className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1C1C1C]/55">
              HQ roll-up
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Metric label="Demand at risk" value={formatCurrency(totals.leakage)} />
              <Metric label="Opportunity" value={formatCurrency(totals.remediationOpportunity)} />
              <Metric label="Risk score" value={`${totals.riskBefore} -> ${totals.riskAfter}`} />
              <Metric label="NRR delta" value={formatPercent(totals.nrrProtectionDelta)} />
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr_380px]">
          <aside className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-4">
            <div className="flex items-center gap-2">
              <MapPinned size={17} className="text-[#B86F4F]" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">Hierarchy</h2>
            </div>
            <div className="mt-5 space-y-5">
              <div className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-3">
                <p className="font-display text-2xl tracking-normal">Northline Holdings HQ</p>
                <p className="mt-1 font-mono text-[11px] text-[#1C1C1C]/55">5 active pilot clinics / 2 PMS systems</p>
              </div>
              {Object.entries(regions).map(([region, clinics]) => (
                <div key={region}>
                  <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B86F4F]">
                    {region}
                  </p>
                  <div className="space-y-2">
                    {clinics.map((clinic) => (
                      <button
                        key={clinic.id}
                        type="button"
                        onClick={() => setSelectedClinicId(clinic.id)}
                        className={`flex w-full items-center justify-between rounded-md border p-3 text-left transition-colors ${
                          selectedClinic.id === clinic.id
                            ? "border-[#B86F4F] bg-[#B86F4F]/10"
                            : "border-[#1C1C1C]/12 bg-white/35 hover:border-[#B86F4F]/55"
                        }`}
                      >
                        <span>
                          <span className="block text-xs font-semibold">{clinic.clinic}</span>
                          <span className="mt-1 block font-mono text-[10px] text-[#1C1C1C]/55">{clinic.pms}</span>
                        </span>
                        <ChevronRight size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className="rounded-lg border border-[#1C1C1C]/15 bg-white/35 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B86F4F]">
                  Location risk map
                </p>
                <h2 className="mt-1 font-display text-3xl tracking-normal">Atmospheric risk, financial controls.</h2>
              </div>
              <div className="flex gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#1C1C1C]/55">
                <span className="rounded border border-[#B86F4F]/35 bg-[#B86F4F]/10 px-2 py-1">Moderate</span>
                <span className="rounded border border-[#B86F4F]/45 bg-[#1C1C1C] px-2 py-1 text-[#F8F4F0]">Severe</span>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {telemetryLocations.map((clinic) => {
                const severe = clinic.riskScoreBefore >= 78;
                return (
                  <button
                    key={clinic.id}
                    type="button"
                    onClick={() => setSelectedClinicId(clinic.id)}
                    className={`relative min-h-[220px] rounded-lg border p-4 text-left transition-transform hover:-translate-y-0.5 ${
                      severe
                        ? "border-[#B86F4F]/70 bg-[#1C1C1C] text-[#F8F4F0] shadow-[0_0_46px_-22px_rgba(184,111,79,0.95)]"
                        : "border-[#B86F4F]/30 bg-[#F8F4F0] shadow-[0_0_42px_-26px_rgba(184,111,79,0.8)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-60">{clinic.region}</p>
                        <h3 className="mt-2 font-display text-2xl leading-tight tracking-normal">{clinic.clinic}</h3>
                      </div>
                      <CircleAlert size={17} className={severe ? "text-[#D7A18A]" : "text-[#B86F4F]"} />
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-2 font-mono text-[11px]">
                      <MiniStat label="Risk" value={`${clinic.riskScoreBefore}`} severe={severe} />
                      <MiniStat label="At risk" value={formatCurrency(clinic.leakage)} severe={severe} />
                      <MiniStat label="Remediate" value={formatCurrency(clinic.remediationOpportunity)} severe={severe} />
                      <MiniStat label="NRR" value={formatPercent(clinic.nrrProtectionDelta)} severe={severe} />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="rounded-lg border border-[#1C1C1C]/15 bg-[#1C1C1C] p-4 text-[#F8F4F0]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D7A18A]">
                  Clinic drill-down
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-normal">{selectedClinic.clinic}</h2>
              </div>
              <PanelRightClose size={18} className="text-[#D7A18A]" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-xs">
              <DarkMetric label="Capture" value={formatPercent(selectedClinic.revenueCaptureRate)} />
              <DarkMetric label="Claims" value={`${selectedClinic.unsupportedClaims}`} />
              <DarkMetric label="Before" value={`${selectedClinic.riskScoreBefore}`} />
              <DarkMetric label="After" value={`${selectedClinic.riskScoreAfter}`} />
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <FileSearch size={16} className="text-[#D7A18A]" />
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">Flagged claims</p>
              </div>
              {selectedFlags.length ? (
                selectedFlags.map((flag) => (
                  <article key={flag.id} className="rounded-md border border-[#F8F4F0]/15 bg-[#F8F4F0]/5 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#D7A18A]">{flag.surface}</p>
                      <span className="rounded border border-[#D7A18A]/35 px-2 py-1 font-mono text-[10px]">{flag.severity}</span>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-[#F8F4F0]/72">{flag.claim}</p>
                    <p className="mt-3 text-xs leading-5 text-[#F8F4F0]/55">{flag.recommendation}</p>
                    <p className="mt-3 font-mono text-[11px] text-[#D7A18A]">Revenue at risk: {formatCurrency(flag.revenueAtRisk)}</p>
                  </article>
                ))
              ) : (
                <p className="rounded-md border border-[#F8F4F0]/15 bg-[#F8F4F0]/5 p-3 text-xs leading-5 text-[#F8F4F0]/60">
                  No severe active claim flags. Retain weekly telemetry to prove continued governance.
                </p>
              )}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#1C1C1C]/12 bg-[#F8F4F0] p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#1C1C1C]/55">{label}</p>
      <p className="mt-2 font-display text-2xl tracking-normal">{value}</p>
    </div>
  );
}

function MiniStat({ label, value, severe }: { label: string; value: string; severe: boolean }) {
  return (
    <div className={`rounded border p-2 ${severe ? "border-[#F8F4F0]/15 bg-[#F8F4F0]/5" : "border-[#1C1C1C]/10 bg-white/40"}`}>
      <p className={severe ? "text-[#F8F4F0]/45" : "text-[#1C1C1C]/45"}>{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}

function DarkMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#F8F4F0]/15 bg-[#F8F4F0]/5 p-3">
      <p className="text-[#F8F4F0]/45">{label}</p>
      <p className="mt-2 text-lg text-[#F8F4F0]">{value}</p>
    </div>
  );
}
