import { Metadata } from 'next';
import Link from 'next/link';
import ConsultRecoveryPipeline from '@/components/ConsultRecoveryPipeline';
import IntegrityCheck from '@/components/platform/IntegrityCheck';
import AnimatedClinicCard from '@/components/AnimatedClinicCard';

export const metadata: Metadata = {
  title: 'Scrutexity | Platform — Cross-EMR Normalization for MSOs',
  description:
    'The read-only governance layer that normalizes intent and compliance data across Boulevard, Mangomint, and Zenoti — sealed into one portfolio-wide, tamper-evident, independently verifiable record.',
};

export default function PlatformPage() {
  return (
    <div className="text-espresso">
      {/* ──────────────────────────── Hero ──────────────────────────── */}
      <section className="px-5 pb-16 pt-20 sm:px-8 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Whitespace line — positioning callout above the H1 */}
          <div
            className="mb-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-sage-deep"
            style={{
              fontFamily:
                'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
            The only read-only · BAA-governed recovery overlay · alongside Boulevard · Mangomint · Zenoti
          </div>
          <span className="section-kicker">Cross-EMR normalization</span>
          <h1 className="mt-5 font-display text-[2.7rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            One portfolio.
            <br className="hidden sm:block" /> One verifiable record.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
            A single read-only layer above{' '}
            <span className="font-medium text-espresso">Boulevard and Mangomint</span>{' '}
            (Zenoti: Q3) that normalizes every inquiry into one intent record — and seals it into a
            tamper-evident audit trail your entire MSO can verify.
          </p>

          {/* Demo / verify chip */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#b9825f]/30 bg-[#b9825f]/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-clay-deep">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Demo verification record</span>
            <span className="opacity-40">|</span>
            <span className="font-mono normal-case">scrutexity.com/verify</span>
          </div>

          {/* Posture strip — operational states, not integration claims */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
            {['Read-only', 'Intent normalized', 'Tamper-evident', 'BAA-covered', 'HIPAA-aligned'].map(
              (state) => (
                <span
                  key={state}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sand-deep bg-cream/70 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-mist"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sage-accent" />
                  {state}
                </span>
              ),
            )}
          </div>

          {/* Primary CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/pilot" className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all rounded-full px-8 py-3.5">
              Get Your Free Audit →
            </Link>
            <Link href="/for-pe" className="btn-ghost">
              Download diligence packet
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────── Recovery surface ─────────────────────── */}
      <section className="border-y border-sand-deep/60 bg-cream px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="section-kicker">Recovery surface</span>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-[2.6rem]">
              The proof looks as polished as the recovery.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-mist">
              Scrutexity turns missed-demand events into clinic-readable records: source, transcript
              excerpt, staff-approved action, deposit status, and a ledger link your team can verify.
            </p>
          </div>
          <AnimatedClinicCard />
        </div>
      </section>

      {/* ─────────────────────── Structural guarantees ─────────────────────── */}
      <section className="border-y border-sand-deep/60 bg-cream px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="section-kicker">Structural guarantees</span>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-[2.6rem]">
              Not features. Guarantees.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-mist">
              The platform is defined by what it will not do as much as what it does. Three
              properties hold across every location in your portfolio.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <GuaranteeCard
              index="01 / Access"
              title="Read-only by design"
              body="We connect through read-only access only — no write-back, no migration, no staff retraining. Your EMRs keep running exactly as they do today; nothing we do can alter them."
            />
            <GuaranteeCard
              index="02 / Normalization"
              title="One record across every EMR"
              body="Boulevard, Mangomint, and Zenoti each model data differently. We map them into a single intent schema, so a missed consult looks identical whether it began in SoHo or Flatiron."
            />
            <GuaranteeCard
              index="03 / Proof"
              title="Tamper-evident & verifiable"
              body="Every event is sealed into an append-only trail. A later edit is rejected and logged as an exception — and any record can be checked independently at scrutexity.com/verify."
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────── Normalization flow ─────────────────────── */}
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <span className="section-kicker">The pipeline</span>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-[2.6rem]">
              From inquiry to verifiable record.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-mist">
              Four steps, applied identically to every location. What goes in is exactly what gets
              sealed — no interpretation, no drift.
            </p>
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FlowStep
              n="01"
              title="Ingest"
              body="Read-only events from each EMR — missed consults, routing exceptions, deposit intent."
            />
            <FlowStep
              n="02"
              title="Normalize"
              body="Each event is mapped into one shared intent schema across every platform you run."
            />
            <FlowStep
              n="03"
              title="Seal"
              body="The normalized event is written to a tamper-evident, append-only audit trail."
            />
            <FlowStep
              n="04"
              title="Surface"
              body="Records roll up into a portfolio-wide owner brief — one source you can verify."
            />
          </ol>
        </div>
      </section>

      {/* ─────────────────────── Supported platforms ─────────────────────── */}
      <section className="border-y border-sand-deep/60 bg-[#f3ece0] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="section-kicker">Integration ecosystem</span>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-[2.6rem]">
              We sit on top of the platforms you already run.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-mist">
              Read-only by design — no migration, no rip-and-replace. Status reflects what is in
              production today, not a roadmap dressed up as a promise.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <IntegrationCard
              name="Boulevard"
              status="live"
              description="Read-only integration. Captures missed consults, routing exceptions, and deposit intent."
            />
            <IntegrationCard
              name="Mangomint"
              status="live"
              description="Read-only event ingestion. Tracks after-hours inquiries and handoff exceptions."
            />
            <IntegrationCard
              name="Zenoti"
              status="planned"
              description="Portfolio-level normalization for mixed-stack MSOs with 5+ locations. Pipeline pending Q3."
            />
          </div>
          <p className="mt-6 text-center text-sm text-[#857a6e]">
            All integrations are read-only and HIPAA-aligned, operating under a Business Associate
            Agreement. No data migration, no staff retraining.
          </p>
        </div>
      </section>

      {/* ─────────────────────── Live matching (pipeline) ─────────────────────── */}
      <section className="px-5 pt-20 sm:px-8 lg:pt-28">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="section-kicker">Cross-EMR matching</span>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-[2.6rem]">
            Watch a missed consult become a matched record.
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-mist">
            An inquiry missed in one system, surfaced and reconciled across another — routed to
            licensed staff, never auto-actioned.
          </p>
        </div>
        <ConsultRecoveryPipeline />
      </section>

      {/* ─────────────────────── Tamper-evident (ledger + check) ─────────────────────── */}
      <section className="border-y border-sand-deep/60 bg-cream px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <span className="section-kicker">Proof of governance</span>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-[2.6rem]">
              Tamper-evident by design.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-mist">
              For every operational event, a permanent receipt is written beside it. Change the event
              after the fact and the seal breaks — visibly, and on the record.
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-2">
            <LedgerTimeline />
            <IntegrityCheck />
          </div>

          <p className="mt-6 font-mono text-[0.72rem] leading-relaxed text-[#857a6e]">
            Illustrative composite. Operational verification only — not legal or medical advice.
          </p>
        </div>
      </section>

      {/* ─────────────────────── Scale ─────────────────────── */}
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="section-kicker">Built for portfolios</span>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-[2.6rem]">
              Scale without replacing your EMRs.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-mist">
              Add locations, open new markets, or acquire clinics — your comparison layer stays intact.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <StatCard value="14 days" label="to deploy across a new location" />
            <StatCard value="100%" label="read-only — no migration risk" />
            <StatCard value="Unlimited" label="locations per portfolio" />
          </div>
        </div>
      </section>

      {/* ─────────────────────── CTA ─────────────────────── */}
      <section className="border-t border-sand-deep/60 bg-cream px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight sm:text-[2.6rem]">
            Ready to see your unified portfolio?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-mist">
            Request a 14-day calibration. We connect to your existing EMRs and deliver a
            portfolio-wide, independently verifiable audit trail.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/pilot" className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all rounded-full px-8 py-3.5">
              Get Your Free Audit →
            </Link>
            <Link href="/for-pe" className="btn-ghost">
              Download diligence packet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────────── Sub-components ──────────────────────────── */

function GuaranteeCard({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <div className="flex h-full flex-col rounded-[1.5rem] border border-sand-deep bg-cream p-7 shadow-card transition-colors hover:border-[#b9825f]/40">
      <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-clay-deep">
        {index}
      </span>
      <h3 className="mt-4 font-display text-[1.6rem] leading-tight tracking-tight text-espresso">
        {title}
      </h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-mist">{body}</p>
    </div>
  );
}

function FlowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="relative flex h-full flex-col rounded-[1.5rem] border border-sand-deep bg-cream p-7 shadow-card">
      <span className="font-mono text-2xl font-semibold text-clay">{n}</span>
      <h3 className="mt-3 font-display text-[1.45rem] leading-tight tracking-tight text-espresso">
        {title}
      </h3>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-mist">{body}</p>
    </li>
  );
}

function IntegrationCard({
  name,
  status,
  description,
}: {
  name: string;
  status: 'live' | 'planned';
  description: string;
}) {
  const config =
    status === 'live'
      ? { label: 'Live · read-only', dot: 'bg-verified', text: 'text-verified' }
      : { label: 'Planned · Q3', dot: 'bg-[#b9825f]', text: 'text-clay-deep' };

  return (
    <div className="rounded-[1.5rem] border border-sand-deep bg-cream p-7 shadow-card transition-shadow hover:shadow-[0_24px_70px_rgba(85,62,41,0.11)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-[1.45rem] tracking-tight text-espresso">{name}</h3>
        <span className={`inline-flex items-center gap-1.5 font-mono text-[0.72rem] ${config.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-mist">{description}</p>
    </div>
  );
}

function LedgerTimeline() {
  const rows = [
    { time: '10:15', event: 'Missed consult captured', source: 'Boulevard', hash: '0x7f83…1f' },
    { time: '10:22', event: 'Routed to licensed staff', source: 'Scrutexity', hash: '0x4c19…a7' },
    { time: '10:41', event: 'Deposit intent logged', source: 'Mangomint', hash: '0x9b22…3e' },
  ];

  return (
    <div className="rounded-[1.5rem] border border-sand-deep bg-cream p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-clay-deep">
          Intent ledger
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7f8f78]/30 bg-[#7f8f78]/12 px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-verified">
          <span className="h-1.5 w-1.5 rounded-full bg-sage-accent" />
          Sealed
        </span>
      </div>

      <ol className="mt-6">
        {rows.map((r, i) => (
          <li key={r.hash} className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3.5">
            {/* event time + node */}
            <div className="flex items-center gap-3">
              <span className="relative flex flex-col items-center">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-[#b9825f] bg-cream" />
                {i < rows.length - 1 && (
                  <span className="absolute top-2.5 h-[calc(100%+0.4rem)] w-px bg-[#e1d4c5]" />
                )}
              </span>
              <span className="font-mono text-[0.78rem] text-espresso">{r.time}</span>
            </div>

            {/* event description */}
            <div className="min-w-0">
              <div className="truncate text-[0.92rem] text-espresso">{r.event}</div>
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[#857a6e]">
                {r.source}
              </div>
            </div>

            {/* sealed receipt */}
            <div className="flex items-center gap-2 rounded-lg border border-sand-deep bg-cream px-2.5 py-1.5">
              <span className="text-verified" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="font-mono text-[0.72rem] text-clay-deep">{r.hash}</span>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-4 border-t border-sand-deep pt-4 font-mono text-[0.68rem] text-[#857a6e]">
        Each event carries a permanent, verifiable receipt. Illustrative.
      </p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.5rem] border border-sand-deep bg-cream p-8 text-center shadow-card">
      <div className="font-display text-4xl tracking-tight text-clay">{value}</div>
      <div className="mt-2 text-sm text-mist">{label}</div>
    </div>
  );
}
