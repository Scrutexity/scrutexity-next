import type { Metadata } from 'next';
import Link from 'next/link';
import { ENFORCEMENT_TRACKER, ENFORCEMENT_TRACKER_LAST_REVIEWED } from '@/data/enforcement-tracker';

export const metadata: Metadata = {
  title: 'Enforcement Tracker | Scrutexity',
  description:
    'Source-linked enforcement tracker. FDA and FTC warning letters, cited claim patterns, severity ratings, and per-pattern claim review requests.',
  alternates: { canonical: '/tracker' },
  robots: { index: false, follow: true },
};

export default function TrackerPage() {
  const entries = ENFORCEMENT_TRACKER.filter((e) => e.sourceUrl !== 'TODO_SOURCE');

  return (
    <div className="min-h-screen bg-cream py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Terminal Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-sand-deep/30 pb-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-espresso mb-1">
              Live Enforcement Tracker
            </h1>
            <p className="font-mono text-xs text-mist uppercase tracking-widest">
              Regulatory Signals &amp; Claim Pattern Intelligence
            </p>
          </div>
          <div className="font-mono text-xs text-mist flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sage-deep animate-pulse" />
            Live Telemetry Active
            <span className="text-sand-deep">·</span>
            Last reviewed: {ENFORCEMENT_TRACKER_LAST_REVIEWED}
          </div>
        </div>

        {/* Terminal Data Table */}
        <div className="w-full overflow-x-auto rounded-xl border border-sand-deep/30 shadow-sm bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-espresso text-cream">
                <th className="px-6 py-4 font-display font-normal text-base border-b border-espresso">Agency</th>
                <th className="px-6 py-4 font-display font-normal text-base border-b border-espresso">Market</th>
                <th className="px-6 py-4 font-display font-normal text-base border-b border-espresso">Claim Pattern</th>
                <th className="px-6 py-4 font-display font-normal text-base border-b border-espresso">Severity</th>
                <th className="px-6 py-4 font-display font-normal text-base border-b border-espresso text-right">Source</th>
                <th className="px-6 py-4 font-display font-normal text-base border-b border-espresso text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-deep/20 font-mono text-sm">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-mist font-mono">
                    No active enforcement signals detected.
                  </td>
                </tr>
              ) : (
                entries.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-bone/60 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-bone/40'
                    }`}
                  >
                    <td className="px-6 py-5 text-espresso font-semibold">{row.agency}</td>
                    <td className="px-6 py-5 text-mist max-w-[200px]">{row.market}</td>
                    <td className="px-6 py-5 text-espresso max-w-xs">
                      <span title={row.pattern}>{row.pattern}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
                          row.severity === 'High'
                            ? 'bg-clay/10 text-clay border border-clay/20'
                            : row.severity === 'Medium'
                            ? 'bg-amber/10 text-amber-deep border border-amber/20'
                            : 'bg-sand-deep/20 text-mist border border-sand-deep/30'
                        }`}
                      >
                        {row.severity}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <a
                        href={row.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sage-deep hover:text-espresso underline underline-offset-2 text-xs"
                      >
                        Source
                      </a>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/auditgpt?pattern=${encodeURIComponent(row.pattern)}`}
                        className="inline-flex items-center justify-center rounded-full bg-sage-deep hover:bg-espresso text-cream px-4 py-2 text-[10px] uppercase tracking-widest font-semibold transition-all shadow-sm hover:-translate-y-px"
                      >
                        Check My Page
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Stats row */}
        <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-mist">
          <span>{entries.length} active signals tracked</span>
          <span className="text-sand-deep">·</span>
          <span>{entries.filter(e => e.severity === 'High').length} high severity</span>
          <span className="text-sand-deep">·</span>
          <span>{new Set(entries.map(e => e.agency)).size} agencies</span>
        </div>

        {/* CTA section */}
        <div className="mt-16 border-t border-sand-deep/30 pt-10">
          <h2 className="font-display text-2xl text-espresso mb-3">Is your page language close to one of these patterns?</h2>
          <p className="text-sm text-mist leading-relaxed max-w-xl mb-6">
            AuditGPT reviews your GLP-1 or med-spa page against the patterns regulators have already cited.
            Returns safer rewrites with a dated review record. Not legal, clinical, or regulatory advice.
          </p>
          <Link
            href="/auditgpt"
            className="inline-flex items-center gap-2 rounded-full bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold px-6 py-3 text-sm transition-all hover:-translate-y-px shadow-sm"
          >
            Request a Claim Exposure Audit
          </Link>
        </div>

        {/* Data Feed teaser */}
        <div className="mt-10 border-t border-sand-deep/30 pt-8">
          <h3 className="font-display text-xl text-espresso mb-2">Enforcement Data Feed</h3>
          <p className="text-sm text-mist leading-relaxed max-w-xl mb-4">
            Weekly claim-pattern brief and structured data feed for compliance teams, agencies,
            and health-market operators. Spreadsheet access available for early partners.
          </p>
          <a
            href="mailto:nick@scrutexity.com?subject=Enforcement%20Data%20Feed%20Access"
            className="text-sm font-semibold text-sage-deep hover:text-espresso underline underline-offset-2"
          >
            Ask about feed access
          </a>
        </div>
      </div>
    </div>
  );
}
