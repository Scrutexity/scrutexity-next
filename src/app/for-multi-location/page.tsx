import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Flag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Multi-Location Operators | Scrutexity',
  description: 'A unified missed-demand recovery layer for Boulevard, Mangomint, and Zenoti portfolios with location-level visibility and governance-ready reporting.',
  alternates: { canonical: '/for-multi-location' },
};

const realityCards = [
  {
    title: 'Mixed PMS stacks',
    body: '% of multi-location operators running mixed PMS stacks: directionally significant, varies by region. We see it in nearly every 5+ location deal.',
  },
  {
    title: 'Hidden operational variance',
    body: 'Response time SLA breaches can differ 4-7x between top and bottom locations in the same portfolio. Treat this as directional until verified against your data.',
  },
  {
    title: 'Native PMS dashboards',
    body: 'Scoped per tenant. Multi-location roll-up requires manual stitching or a BI tool downstream.',
  },
  {
    title: 'Scrutexity dashboard',
    body: 'Per-location and portfolio-level recovery benchmarks, source attribution, and SLA tracking in one view.',
  },
];

const locationRows = [
  ['SoHo', '312', '9 min · 18 breaches', '$8,400', 'ok'],
  ['Flatiron', '226', '24 min · 41 breaches', '$4,950', 'flag'],
  ['Williamsburg', '188', '12 min · 11 breaches', '$6,250', 'ok'],
];

export default function ForMultiLocationPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso">
      <header className="border-b border-sand-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="section-kicker">For multi-location operators</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
            One recovery layer across every location, every PMS.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-mist">
            If your portfolio runs on a mix of Boulevard, Mangomint, and Zenoti, your VP of Operations sees three dashboards and zero portfolio-level demand visibility. Scrutexity is the unified recovery layer that normalizes inquiry data across every tenant and surfaces operational variance at the location level.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        <section>
          <p className="section-kicker">The multi-PMS reality</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">Variance hides inside each tenant.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {realityCards.map((card) => (
              <div key={card.title} className="rounded-[1.5rem] border border-sand-deep bg-cream p-6 shadow-sm">
                <h3 className="font-display text-2xl tracking-tight">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <p className="section-kicker">Dashboard preview</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">The four metrics every VP Ops needs.</h2>
          <p className="mt-3 inline-flex rounded-full border border-clay/30 bg-cream-deep px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-clay-deep">
            Illustrative. Your dashboard reflects your locations, your data.
          </p>
          <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-sand-deep bg-cream">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-sand-deep bg-cream-deep">
                  {['Location', 'Total inquiries (last 30d)', 'Median response + SLA breaches', 'Recovered revenue contribution', 'Audit trail status'].map((heading) => (
                    <th key={heading} className="border-l border-sand-deep p-5 first:border-l-0 text-xs font-bold uppercase tracking-[0.13em] text-mist">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {locationRows.map(([location, inquiries, response, revenue, status]) => (
                  <tr key={location} className="border-b border-sand-deep last:border-b-0">
                    <th className="p-5 text-sm font-semibold">{location}</th>
                    <td className="border-l border-sand-deep p-5 font-mono text-sm">{inquiries}</td>
                    <td className="border-l border-sand-deep p-5 text-sm text-mist">{response}</td>
                    <td className="border-l border-sand-deep p-5 font-mono text-sm text-sage-deep">{revenue}</td>
                    <td className="border-l border-sand-deep p-5">
                      {status === 'ok' ? (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-sage-deep"><CheckCircle2 className="h-4 w-4" /> Green check</span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-clay-deep"><Flag className="h-4 w-4" /> Amber flag</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20 rounded-[1.75rem] border border-sand-deep bg-cream-deep p-8">
          <p className="section-kicker">Compliance+ tier preview</p>
          <h3 className="mt-3 font-display text-3xl tracking-tight">Built for operators who answer to PE governance reviews.</h3>
          <p className="mt-4 text-sm leading-7 text-mist">
            Multi-location operators in PE-backed portfolios face a different compliance bar. Scrutexity Compliance+ includes a third-party SOC 2 Type I audit in progress, pre-signed BAAs across every connected location, and the deterministic clinical stop-rule configured to your state medical board guidelines.
          </p>
          <p className="mt-5 text-sm font-semibold text-espresso">Recovery + Compliance - enterprise pricing for portfolios of 5+ locations. Contact for terms.</p>
          <a href="mailto:nick@scrutexity.com?subject=Multi-location%20inquiry" className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all btn-sm mt-7 inline-flex">Talk to founder</a>
        </section>

        <section className="mt-20">
          <p className="section-kicker">Why portfolio operators choose us</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              'Read-only across every PMS. No migration, no stack consolidation required.',
              'BAA pre-signed per tenant. Governance scales with the portfolio.',
              'Per-location and portfolio-level visibility. Your VP Ops sees variance, your front desks stay independent.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-sand-deep bg-cream p-5 text-sm leading-7 text-mist">
                {item}
              </div>
            ))}
          </div>
          <Link href="/governance" className="mt-8 inline-flex text-sm font-semibold text-clay-deep underline underline-offset-4 hover:text-clay-deep">Review governance model</Link>
        </section>
      </main>
    </div>
  );
}
