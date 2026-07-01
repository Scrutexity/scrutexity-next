import PageShell, { CTARow } from '@/components/PageShell';

export const metadata = {
  title: 'Company | Scrutexity',
  description:
    'Scrutexity shows multi-location aesthetics groups where revenue is leaking — one unified view across Boulevard, Mangomint, and Zenoti, verifiable in minutes. Founder, operating principles, advisory, and open roles.',
};

const PRINCIPLES = [
  {
    t: 'Read-only by default',
    d: 'We sit on top of the systems a group already runs. No migration, no rip-and-replace, no taking control of clinical workflows.',
  },
  {
    t: 'Every claim survives diligence',
    d: 'If we cannot show it on a verifiable record, we do not say it. The moat is that our numbers are checkable, not self-reported.',
  },
  {
    t: 'Humans make clinical calls',
    d: 'Clinical exceptions route to licensed staff. We never generate medical advice or direct patient care.',
  },
  {
    t: 'Own the layer, not the data',
    d: 'The group owns its data. We provide a normalized, exportable record and a limited license to the derived view.',
  },
];

export default function CompanyPage() {
  return (
    <PageShell
      kicker="Company"
      title="Built by operators. Governed like infrastructure."
      intro="Scrutexity is the revenue visibility layer multi-location aesthetics groups can't build themselves — one unified view of demand across Boulevard, Mangomint, and Zenoti, verifiable in under a minute."
    >
      {/* Founder */}
      <section className="px-7 py-16">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Founder</span>
          <h2 className="mt-3 font-serif text-[1.8rem] font-medium leading-tight sm:text-[2.3rem]">Nick — Founder</h2>
          <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed text-charcoal/75">
            <p>
              Scrutexity started with a pattern I kept seeing inside multi-location aesthetics groups: every
              location ran a different system, and none of them talked to each other. Boulevard at one clinic,
              Mangomint at the next, a mixed stack after an acquisition. Demand leaked through the seams — missed
              consults, dropped inquiries, after-hours calls that never got a callback — and there was no single
              record of any of it.
            </p>
            <p>
              The all-in-one platforms answer that with &ldquo;rip everything out and standardize on us.&rdquo; For a group
              mid-rollup, that&apos;s a non-starter. So I built the opposite: a read-only layer that goes on top of
              whatever a group already runs, normalizes demand across all of it into one record, and routes every
              clinical exception to licensed staff.
            </p>
            <p>
              The part that matters for a PE-backed group is what comes out the other side — a tamper-evident
              record an acquirer&apos;s diligence team can verify independently, in about a minute. Most operational
              claims in this space are self-reported. Ours are checkable. That&apos;s the whole company.
            </p>
          </div>
        </div>
      </section>

      {/* Operating principles */}
      <section className="bg-ivory-2 px-7 py-20">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Operating principles</span>
          <h2 className="mt-3 font-serif text-[1.8rem] font-medium leading-tight sm:text-[2.3rem]">How we decide what to build — and what to claim.</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.t} className="rounded-2xl border border-line bg-porcelain p-7 shadow-card">
                <h3 className="font-serif text-[1.2rem] font-medium text-charcoal">{p.t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/70">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Advisory</span>
          <h2 className="mt-3 font-serif text-[1.8rem] font-medium leading-tight sm:text-[2.3rem]">Guided by people who&apos;ve done this.</h2>
          <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed text-charcoal/75">
            Scrutexity works with advisors across MSO operations, healthcare data governance, and
            aesthetics-sector M&amp;A. We name individual advisors here only with their consent.
          </p>
        </div>
      </section>

      {/* Hiring */}
      <section id="hiring" className="bg-ivory-2 px-7 py-20">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">We&apos;re hiring</span>
          <h2 className="mt-3 font-serif text-[1.8rem] font-medium leading-tight sm:text-[2.3rem]">Early team. Real ownership.</h2>
          <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed text-charcoal/75">
            We&apos;re building the founding team across delivery, integrations, and enterprise sales. If you&apos;ve
            operated inside multi-location healthcare or built data infrastructure that had to survive an audit,
            we want to talk.
          </p>
          <CTARow />
        </div>
      </section>
    </PageShell>
  );
}
