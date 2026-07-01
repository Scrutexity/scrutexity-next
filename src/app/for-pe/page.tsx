import PageShell, { CTARow } from '@/components/PageShell';
import GovButton from '@/components/GovButton';

export const metadata = {
  title: 'For PE Buyers | Scrutexity',
  description:
    'Built on the same Revenue Leak Snapshot used by operators — extended with governance-grade records, CPOM-safe architecture, multi-entity controls, and 60-second independent verification for acquirers.',
};

const STEPS = [
  {
    n: '01',
    t: 'One normalized record across the portfolio',
    d: 'Demand from every location and every platform — Boulevard, Mangomint, Zenoti — resolved into a single source of truth, regardless of the underlying stack.',
  },
  {
    n: '02',
    t: 'Tamper-evident by construction',
    d: 'Each entry is written to a record that cannot be quietly altered after the fact. What was captured, normalized, and routed stays on the record.',
  },
  {
    n: '03',
    t: 'Verifiable in about a minute',
    d: 'A diligence team queries the verification endpoint and confirms the record independently — no trust required, no waiting on a data room export.',
  },
];

export default function ForPEPage() {
  return (
    <PageShell
      kicker="For PE buyers & operating partners"
      title="What the PMS won't tell you about a group's demand."
      intro="Built on the same Revenue Leak Snapshot used by operators. Extended with governance-grade records, CPOM-safe architecture, and multi-entity controls — independently verifiable in about a minute."
    >
      <section className="px-7 py-12">
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-5 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-line bg-porcelain p-7 shadow-card">
              <span className="font-mono text-[0.78rem] tracking-[0.12em] text-terracotta">{s.n}</span>
              <h3 className="mt-3 font-serif text-[1.25rem] font-medium leading-snug text-charcoal">{s.t}</h3>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-charcoal/70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* governance & controls */}
      <section className="px-7 py-16">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Governance & controls</span>
          <h2 className="mt-3 font-serif text-[1.7rem] font-medium leading-tight sm:text-[2.1rem]">CPOM-safe by design. Multi-entity by default.</h2>
          <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-relaxed text-charcoal/75">
            The record layer is architected to preserve compliance with state-level CPOM requirements (NY, CA, TX, FL) from the
            first entry. Inquiry data flows through a governed routing layer — no call forwarding arbitrage, no revenue-share
            structures, no per-patient attribution. Each location operates as an independent entity within a unified control plane,
            with separate audit boundaries and role-based access scoped by entity.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                t: 'CPOM-safe routing',
                d: 'Inquiry routing governed by state regulatory boundaries. No call-forwarding structures that could trigger co-ownership or fee-splitting concerns.',
              },
              {
                t: 'Entity-scoped controls',
                d: 'Each location is its own audit domain. Role-based access, separate record chains, independent verification paths — all managed from a single pane.',
              },
              {
                t: 'No revenue-share architecture',
                d: 'Designed as infrastructure, not a revenue intermediary. No per-patient attribution, no outcome-based pricing structures, no shared-revenue triggers.',
              },
            ].map((item) => (
              <div key={item.t} className="rounded-2xl border border-line bg-porcelain p-7 shadow-card">
                <h3 className="font-serif text-[1.1rem] font-medium leading-snug text-charcoal">{item.t}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-charcoal/70">{item.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[0.74rem] text-charcoal/55">
            This is operational infrastructure — not legal advice, compliance certification, or a replacement for
            independent regulatory review. Verify application to your specific jurisdictions.
          </p>
        </div>
      </section>

      {/* portfolio benchmarking */}
      <section className="bg-ivory-2 px-7 py-16">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Portfolio benchmarking</span>
          <h2 className="mt-3 font-serif text-[1.7rem] font-medium leading-tight sm:text-[2.1rem]">Compare locations on the same ruler.</h2>
          <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-relaxed text-charcoal/75">
            Once demand is normalized, locations become comparable on consistent operational signals — useful for
            post-close integration planning and for seeing which sites are leaving the most on the table. Benchmarks
            are shown as anonymized percentiles across a portfolio, never as raw clinic-level data, and are provided
            for internal operational insight only.
          </p>
          <p className="mt-6 font-mono text-[0.74rem] text-charcoal/55">
            Built for M&amp;A diligence. Operational verification only — not legal, medical, financial, or insurance
            advice, and not a compliance certification.
          </p>
          <CTARow />
        </div>
      </section>

      <section className="px-7 py-16 text-center">
        <h2 className="mx-auto max-w-[24ch] font-serif text-[1.9rem] font-semibold leading-[1.08] sm:text-[2.5rem]">
          Want to see the 60-second proof on a live record?
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-charcoal/70">
          The same verification a buyer&apos;s team would run is public. Check it yourself.
        </p>
        <div className="mt-7">
          <GovButton label="Run live verification →" href="/verify" className="btn-md" />
        </div>
      </section>
    </PageShell>
  );
}
