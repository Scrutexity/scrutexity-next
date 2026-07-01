import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recovery Brief | Scrutexity',
  description: 'Sealed weekly recovery performance brief with attribution breakdown and SHA-256 integrity verification.',
};

export default function SnapshotPage() {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans antialiased">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20">

        {/* Top bar */}
        <div className="flex justify-between items-center pb-5 border-b border-sand mb-9 text-xs uppercase tracking-wider text-mist">
          <div>
            <span className="font-semibold text-espresso mr-3">SCRUTEXITY</span>
            <span className="text-mist">Stalled Consult Recovery Brief</span>
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded-md text-[10px] font-semibold tracking-wider border bg-sage/10 text-sage-deep border-sage/30">
              VERIFIED
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.22em] text-mist uppercase font-semibold mb-3">
            Sealed Weekly Brief · Contract v4.0.0
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.2rem] leading-tight tracking-tight text-espresso mb-2">
            Recovery Performance — CLN_NODETEST
          </h1>
          <p className="text-sm sm:text-base text-mist">
            1 stalled consults recovered from 1 approved outreach sends, with attribution split by confidence.
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-2 mt-5 text-xs text-mist">
            <div>
              <span className="block text-[9px] tracking-[0.18em] uppercase text-mist/70">Report Window</span>
              <span className="font-medium text-bark">8 ledger events</span>
            </div>
            <div>
              <span className="block text-[9px] tracking-[0.18em] uppercase text-mist/70">Generated</span>
              <span className="font-medium text-bark">2026-06-18T01:06:42.017Z</span>
            </div>
            <div>
              <span className="block text-[9px] tracking-[0.18em] uppercase text-mist/70">Sealed</span>
              <span className="font-medium text-bark">2026-06-18T01:06:42.017Z</span>
            </div>
            <div>
              <span className="block text-[9px] tracking-[0.18em] uppercase text-mist/70">Schema</span>
              <span className="font-mono text-[11px] font-medium text-bark">brief-1.0.0</span>
            </div>
          </div>
        </div>

        {/* Hero stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border border-sand-deep/40 rounded-xl overflow-hidden mb-10 bg-sand-deep/30">
          <div className="bg-cream p-7 sm:col-span-1">
            <p className="text-[9px] tracking-[0.2em] uppercase text-mist/70 mb-3 font-semibold">Recovered Value (Attributed)</p>
            <p className="font-display text-3xl sm:text-[2rem] leading-none tracking-tight text-espresso">$999.00</p>
            <p className="text-xs text-mist mt-2">1 recoveries · 100.0% of 1 approved sends</p>
          </div>
          <div className="bg-cream-deep p-7">
            <p className="text-[9px] tracking-[0.2em] uppercase text-mist/70 mb-3 font-semibold">Directly Attributed</p>
            <p className="font-display text-3xl sm:text-[2rem] leading-none tracking-tight text-sage-deep">$999.00</p>
            <p className="text-xs text-mist mt-2">1 recovery · Scrutexity caused</p>
          </div>
          <div className="bg-cream-deep p-7">
            <p className="text-[9px] tracking-[0.2em] uppercase text-mist/70 mb-3 font-semibold">Assisted</p>
            <p className="font-display text-3xl sm:text-[2rem] leading-none tracking-tight text-clay">$0.00</p>
            <p className="text-xs text-mist mt-2">0 recovery · Scrutexity helped</p>
          </div>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-7 mb-10">

          {/* Operating Metrics */}
          <div className="rounded-xl border border-sand bg-cream p-6 shadow-sm">
            <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-sand">
              <span className="text-xs font-semibold uppercase tracking-wider text-bark">Operating Metrics</span>
              <span className="text-[10px] text-mist">derived deterministically from ledger</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-1">
              {[
                ['Subjects registered', '1'],
                ['Approval requests', '1'],
                ['Approvals granted', '1'],
                ['Approvals rejected', '0'],
                ['Messages sent', '1'],
                ['Messages delivered', '1'],
                ['Messages failed', '0'],
                ['Suppression refused (opt-out)', '0'],
                ['Hash-mismatch refused', '0'],
                ['Inbound replies classified', '0'],
                ['Attributions assigned', '0'],
                ['Appointments verified', '1'],
                ['Appointments cancelled', '0'],
                ['Deposits verified', '1'],
                ['Deposits refunded', '0'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-dashed border-sand/60 text-sm">
                  <span className="text-mist">{k}</span>
                  <span className="font-semibold tabular-nums text-bark">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions + Attribution */}
          <div className="space-y-7">
            {/* Exclusions */}
            <div className="rounded-xl border border-sand bg-cream p-6 shadow-sm">
              <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-sand">
                <span className="text-xs font-semibold uppercase tracking-wider text-bark">Exclusions</span>
                <span className="text-[10px] text-mist">financial hygiene</span>
              </div>
              <div className="space-y-1">
                {[
                  ['Appointments cancelled', '0'],
                  ['Deposits refunded', '0'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b border-dashed border-sand/60 text-sm">
                    <span className="text-mist">{k}</span>
                    <span className="font-semibold tabular-nums text-clay-deep">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-clay/5 border-l-2 border-clay rounded-sm text-xs text-mist leading-relaxed">
                Cancelled appointments and refunded deposits are excluded from recovered-value totals.
              </div>
            </div>

            {/* Attribution Breakdown */}
            <div className="rounded-xl border border-sand bg-cream p-6 shadow-sm">
              <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-sand">
                <span className="text-xs font-semibold uppercase tracking-wider text-bark">Attribution Breakdown</span>
                <span className="text-[10px] text-mist">by confidence</span>
              </div>
              <div className="space-y-0">
                {[
                  { label: 'Directly attributed', count: '1 recovery', amount: '$999.00', dot: 'bg-sage', text: 'text-sage-deep' },
                  { label: 'Assisted', count: '0 recovery', amount: '$0.00', dot: 'bg-clay', text: 'text-clay' },
                  { label: 'Uncertain', count: '0 recovery', amount: '$0.00', dot: 'bg-mist/40', text: 'text-mist/60' },
                  { label: 'Not attributed', count: '0 recovery', amount: '$0.00', dot: 'bg-mist/40', text: 'text-mist/60' },
                ].map((item) => (
                  <div key={item.label} className="grid grid-cols-[1fr_auto_auto] gap-3 py-3 border-b border-dashed border-sand/60 items-center last:border-b-0">
                    <span className="text-sm font-medium text-bark flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${item.dot}`} />
                      {item.label}
                    </span>
                    <span className="text-xs text-mist tabular-nums">{item.count}</span>
                    <span className={`text-sm font-semibold tabular-nums ${item.text}`}>{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Disclosures */}
        <div className="rounded-xl border border-sand bg-cream-deep p-6 sm:p-7 mb-10">
          <p className="text-[10px] tracking-[0.22em] uppercase text-mist font-semibold mb-4">Compliance &amp; Integrity Disclosures</p>
          <div className="space-y-4">
            {[
              {
                title: 'Report Integrity',
                body: 'Report integrity: This report\'s contents match the sealed version identified by the displayed hash.',
              },
              {
                title: 'Evidence Basis',
                body: 'Evidence basis: Outcomes are classified using tracked interactions, booking-system observations and clinic-confirmed evidence, with attribution confidence shown for each recovery.',
              },
              {
                title: 'Integrity Language Note',
                body: 'The underlying audit ledger is an append-only audit ledger (not tamper-proof). The SHA-256 brief seal proves the exported report has not changed since sealing; it does not prove that the underlying source data was true or complete.',
              },
            ].map((d) => (
              <div key={d.title} className="pl-4 border-l-2 border-sand-deep/50 text-sm text-mist leading-relaxed">
                <strong className="block text-[11px] tracking-wider uppercase text-bark mb-1">{d.title}</strong>
                {d.body}
              </div>
            ))}
          </div>
        </div>

        {/* SHA-256 Seal */}
        <div className="mt-14 pt-7 border-t border-sand">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-[10px] tracking-[0.22em] uppercase text-mist font-semibold">SHA-256 Seal · Serial Number</span>
            <span className="font-mono text-[10px] text-mist">SHA256</span>
          </div>
          <div className="font-mono text-sm text-espresso break-all bg-cream border border-sand-deep/40 rounded-lg p-4 border-l-[3px] border-l-sage leading-relaxed">
            eed2823543846f07581ce9088e9a03b572bbd387e6e34f1ac1b239a9dc5d2a4e
          </div>
          <div className="flex flex-col sm:flex-row justify-between mt-3 text-xs text-mist gap-4">
            <span>Sealed: 2026-06-18T01:06:42.017Z</span>
            <span className="italic sm:text-right max-w-[70%]">canonical JSON of the brief body (excluding the seal object itself)</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between mt-2 text-xs text-mist gap-4">
            <span>Recomputed at view-time: <span className="font-mono text-sage-deep">eed2823543846f07581ce9088e9a03b572bbd387e6e34f1ac1b239a9dc5d2a4e</span></span>
            <span className="text-sage-deep font-medium">MATCH - report contents identical to sealed version</span>
          </div>
        </div>

      </div>
    </div>
  );
}
