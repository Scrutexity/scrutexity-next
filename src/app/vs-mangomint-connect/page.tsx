import type { Metadata } from 'next';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { AnimatedTableRow, AuditBurstLink, FAQAccordion } from '@/components/ComparisonMotion';

const publishedDate = 'June 15, 2026';
const performanceMode = process.env.NEXT_PUBLIC_2026_PERFORMANCE_MODE === 'true';

export const metadata: Metadata = {
  title: 'Scrutexity vs. Mangomint Connect — Why Native AI Isn’t Enough',
  description:
    'Mangomint Connect is the native messaging and AI layer in the Mangomint PMS. Scrutexity is a governed missed-demand recovery layer with multi-channel follow-up, deep recovery sequencing, and cross-location reporting.',
  alternates: { canonical: '/vs-mangomint-connect' },
};

const comparisonRows = [
  {
    label: 'Recovery sequencing depth',
    competitor:
      'Native messaging covers first-touch and basic follow-ups. No multi-stage reactivation cadence purpose-built for dormant leads, missed calls, or unrebooked no-shows.',
    scrutexity:
      'Multi-step recovery sequences run for the full lead lifecycle — first-touch, 24-hour, 72-hour, dormant (30/60/90d), no-show rebook — with clinic-approved language at each stage.',
  },
  {
    label: 'Multi-channel follow-up',
    competitor:
      'Centers on the Mangomint inbox (SMS + voice). IG/FB DMs, web-form catch, and dormant-lead reactivation live in adjacent tools or staff queues.',
    scrutexity:
      'Recovers across missed calls, IG/FB DMs, web forms, and SMS in one normalized pipeline so the same lead is followed up once, not five times across tools.',
  },
  {
    label: 'Analytics visibility',
    competitor:
      'Reporting lives inside the Mangomint dashboard. AI-assisted booking attribution is visible at a summary level; deposit-level recovery attribution per inquiry source typically requires manual stitching.',
    scrutexity:
      'Exportable owner brief shows every inquiry source, transcript, escalation, booking status, and deposit status — independently verifiable, not a black box.',
  },
  {
    label: 'Cross-location reporting',
    competitor:
      'Roll-up reporting is scoped per Mangomint tenant. Multi-location operators typically stitch reports manually or in a BI tool downstream.',
    scrutexity:
      'Portfolio-level recovery benchmarks across every connected location, with per-location and per-source breakdowns built for PE operators and multi-site med spas.',
  },
  {
    label: 'Clinical question handling',
    competitor:
      'Native AI follows Mangomint’s guardrails; clinical handover behavior is configured inside the platform.',
    scrutexity:
      'Deterministic stop on clinical language. Conversation halts and routes to licensed clinic staff. Scrutexity does not diagnose, recommend treatment, or answer medical questions.',
  },
  {
    label: 'Setup and migration',
    competitor: 'Lives inside Mangomint; turn-on is configuration of an existing module.',
    scrutexity:
      'Read-only API connection to Mangomint. No migration, no stack change, no workflow change for the front desk. Disconnect in one click from Mangomint settings.',
  },
];

const faq = [
  {
    question: 'Why not just use what Mangomint already built?',
    answer:
      'If Mangomint Connect covers your needs, use it. Scrutexity is for clinics that need deeper recovery sequencing across more channels, cleaner attribution down to the deposit, and cross-location reporting that a single PMS tenant does not expose. We install read-only on top of Mangomint — you do not have to choose.',
  },
  {
    question: 'Does Scrutexity replace Mangomint or Connect?',
    answer:
      'No. Mangomint remains your booking system of record. Scrutexity sits alongside it as a governed recovery layer and writes confirmed bookings back through the same Mangomint workflow your front desk already uses.',
  },
  {
    question: 'Will running both create duplicate replies to a lead?',
    answer:
      'During pilot setup we map which inquiry sources Scrutexity handles vs. which stay native. The goal is to avoid double-touching a lead — Scrutexity’s value is the dormant, missed, and cross-channel inquiries that aren’t being worked at all today.',
  },
  {
    question: 'What proof do we get that recovery actually happened?',
    answer:
      'Every recovered booking ties to a source log, the full conversation transcript, the booking record, and the deposit status. The 14-day pilot produces an owner brief you keep regardless of whether you continue.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function VsMangomintConnectPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="relative overflow-hidden border-b border-sand-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_45%,#f8f3eb_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="section-kicker">Platform comparison</p>
          <h1
            className={`mt-4 text-4xl leading-tight tracking-[-0.02em] sm:text-5xl md:text-6xl ${
              performanceMode ? 'font-sans font-semibold' : 'font-display'
            }`}
          >
            Scrutexity vs. Mangomint Connect — Why Native AI Isn’t Enough
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-mist">
            Connect answers first. Scrutexity recovers the rest — across every channel, every dormant lead, every location.
          </p>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-[#8f7d6c]">
            Published {publishedDate} · Based on public information captured {publishedDate}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <section aria-labelledby="comparison-heading">
          <div className="mb-9 max-w-3xl">
            <p className="section-kicker">Side-by-side</p>
            <h2 id="comparison-heading" className="mt-3 font-display text-3xl md:text-4xl">
              Native AI vs. governed recovery layer.
            </h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              Mangomint Connect is a feature inside the PMS. Scrutexity is a focused recovery and reporting layer that runs alongside it. Both can co-exist; this page is for buyers who want to know what the gap is.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[1.75rem] border border-[#dfd0bf] bg-cream shadow-sm">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#dfd0bf] bg-[#f3eadf]">
                  <th className="w-[23%] px-6 py-5 text-xs font-bold uppercase tracking-[0.13em] text-mist">
                    Capability
                  </th>
                  <th className="w-[38.5%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold">
                    Mangomint Connect
                  </th>
                  <th className="w-[38.5%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold text-[#496052]">
                    Scrutexity
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <AnimatedTableRow
                    key={row.label}
                    index={index}
                    className="border-b border-[#eadfd2] align-top last:border-b-0"
                  >
                    <th scope="row" className="px-6 py-6 text-sm font-semibold leading-6">
                      {row.label}
                    </th>
                    <td className="border-l border-[#eadfd2] px-6 py-6 text-sm leading-7 text-mist">
                      <div className="flex gap-3">
                        <Minus className="mt-1.5 h-4 w-4 shrink-0 text-[#9b806d]" />
                        <p>{row.competitor}</p>
                      </div>
                    </td>
                    <td className="border-l border-[#eadfd2] px-6 py-6 text-sm leading-7 text-[#4d594f]">
                      <div className="flex gap-3">
                        <Check className="mt-1.5 h-4 w-4 shrink-0 text-[#6b8576]" />
                        <p>{row.scrutexity}</p>
                      </div>
                    </td>
                  </AnimatedTableRow>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="section-kicker">Trademarks</p>
            <h2 className="mt-3 font-display text-3xl">Notes on this comparison</h2>
            <p className="mt-6 text-xs leading-6 text-[#8f8174]">
              Mangomint and Mangomint Connect are trademarks of their respective owner. Scrutexity is not affiliated with or
              endorsed by Mangomint. Product capabilities can change; buyers should confirm current behavior directly with each
              vendor.
            </p>
          </div>

          <aside className="rounded-[1.75rem] border border-[#d7c6b4] bg-[#f3eadf] p-8 lg:p-10">
            <p className="section-kicker">See your own gap</p>
            <h2 className="mt-3 font-display text-3xl">See How Much Revenue You’re Missing</h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              Read-only scan of missed calls, abandoned forms, and stalled inquiries across your channels. You keep the
              report either way.
            </p>
            <AuditBurstLink className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all btn-lg mt-7 inline-flex items-center gap-2">
              See How Much Revenue You&apos;re Missing <ArrowRight className="h-4 w-4" />
            </AuditBurstLink>
          </aside>
        </section>

        <section className="mt-20 max-w-4xl">
          <p className="section-kicker">FAQ</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Questions buyers ask</h2>
          <FAQAccordion items={faq} />
        </section>
      </main>
    </div>
  );
}
