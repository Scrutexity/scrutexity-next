import PageShell from '@/components/PageShell';

export const metadata = {
  title: 'Trust Center | Scrutexity',
  description:
    'Security, privacy, BAA, subprocessors, and status for Scrutexity. Read-only architecture, PHI minimization, and HIPAA-aligned workflows under a Business Associate Agreement.',
};

const SECURITY = [
  {
    t: 'Read-only architecture',
    d: 'We connect to the platforms you already run with read-only access where possible. We do not control clinical workflows or write back into your systems.',
  },
  {
    t: 'PHI minimization',
    d: 'Patient identifiers are stripped and redacted before processing. Inquiry intent is classified; identity is discarded. We do not store raw names, dates of birth, or medical record numbers in our application layer.',
  },
  {
    t: 'Clinical routing to humans',
    d: 'Any message classified as a clinical question is locked from automated response and routed to your licensed staff. We never generate medical advice.',
  },
  {
    t: 'You own your data',
    d: 'Records, routing rules, and logs belong to your group. Exportable, and deletable on request. We do not train models on your patient communications.',
  },
];

export default function TrustPage() {
  return (
    <PageShell
      kicker="Trust center"
      title="Built for a security review, not around one."
      intro="Everything a buyer's security and legal team needs in one place. We publish only the true current state of each item — no certification we don't hold, no badge for an audit that isn't underway."
    >
      {/* Security */}
      <section className="px-7 py-16">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Security</span>
          <h2 className="mt-3 font-serif text-[1.8rem] font-medium leading-tight sm:text-[2.3rem]">How we handle your data.</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {SECURITY.map((s) => (
              <div key={s.t} className="rounded-2xl border border-line bg-porcelain p-7 shadow-card">
                <h3 className="font-serif text-[1.2rem] font-medium text-charcoal">{s.t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIPAA / BAA + subprocessors + status */}
      <section className="bg-ivory-2 px-7 py-16">
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-line bg-porcelain p-7 shadow-card">
            <h3 className="font-serif text-[1.25rem] font-medium text-charcoal">HIPAA &amp; BAA</h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-charcoal/70">
              We operate under a Business Associate Agreement with each client and support HIPAA-aligned
              administrative workflows. There is no &ldquo;HIPAA certification&rdquo; — we describe what we actually do.
            </p>
            <a href="/baa" className="mt-4 inline-block font-mono text-[0.78rem] text-terracotta underline underline-offset-2">View BAA details →</a>
          </div>
          <div className="rounded-2xl border border-line bg-porcelain p-7 shadow-card">
            <h3 className="font-serif text-[1.25rem] font-medium text-charcoal">Subprocessors</h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-charcoal/70">
              We maintain a current list of the infrastructure vendors that process data on our behalf. Available
              to clients and prospects under review.
            </p>
            <a href="/pilot" className="mt-4 inline-block font-mono text-[0.78rem] text-terracotta underline underline-offset-2">Request the list →</a>
          </div>
          <div className="rounded-2xl border border-line bg-porcelain p-7 shadow-card">
            <h3 className="font-serif text-[1.25rem] font-medium text-charcoal">Status &amp; verification</h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-charcoal/70">
              Our public verification endpoint reports live record status. Check it yourself, any time.
            </p>
            <a href="/verify" className="mt-4 inline-block font-mono text-[0.78rem] text-terracotta underline underline-offset-2">Live status →</a>
          </div>
        </div>
      </section>

      {/* Certifications honesty note */}
      <section className="px-7 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-line bg-porcelain p-7">
          <h3 className="font-serif text-[1.25rem] font-medium text-charcoal">On certifications</h3>
          <p className="mt-3 max-w-[62ch] text-[0.98rem] leading-relaxed text-charcoal/75">
            We will display a SOC 2 status here when — and only when — an audit is actually underway, with the
            observation window started. Until then we&apos;d rather show you the architecture above and let your team
            evaluate it directly.
          </p>
          <p className="mt-5 font-mono text-[0.74rem] text-charcoal/55">
            Operational verification only. Not legal or medical advice.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
