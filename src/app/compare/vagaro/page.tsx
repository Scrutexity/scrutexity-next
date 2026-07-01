import type { Metadata } from 'next';
import { ArrowRight, Check, Minus, Sparkles } from 'lucide-react';
import { AnimatedTableRow, AuditBurstLink, FAQAccordion } from '@/components/ComparisonMotion';
import SalonObject3D from '@/components/SalonObject3D';

const publishedDate = 'June 15, 2026';
const performanceMode = process.env.NEXT_PUBLIC_2026_PERFORMANCE_MODE === 'true';

export const metadata: Metadata = {
  title: 'Vagaro vs Scrutexity – The AI-First Alternative',
  description: 'A sourced comparison of Vagaro salon, spa, and fitness software with Scrutexity missed-demand recovery, clinical governance, and verifiable reporting.',
  alternates: { canonical: '/compare/vagaro' },
};

const sources = [
  { id: 1, label: 'Vagaro Pro overview', href: 'https://www.vagaro.com/pro' },
  { id: 2, label: 'Vagaro pricing and included tools', href: 'https://www.vagaro.com/pro/pricing' },
  { id: 3, label: 'Vagaro salon software', href: 'https://www.vagaro.com/pro/salon-software' },
  { id: 4, label: 'Vagaro spa software', href: 'https://www.vagaro.com/pro/spa-software' },
  { id: 5, label: 'Vagaro online booking', href: 'https://www.vagaro.com/pro/online-booking' },
  { id: 6, label: 'Vagaro reporting', href: 'https://www.vagaro.com/pro/reports' },
  { id: 7, label: 'Vagaro branded app', href: 'https://www.vagaro.com/pro/branded-app' },
];

// <!-- sourced from Vagaro features page -->
const comparisonRows = [
  {
    label: 'AI receptionist',
    vagaro: <>Vagaro’s pricing page advertises “AI-powered business tools &amp; marketing.” The reviewed public pages do not describe a dedicated AI receptionist that answers missed calls, conducts conversations, or publishes a clinical escalation rule.<sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Recovers missed calls and stalled inquiries using clinic-approved language, with deterministic escalation whenever clinical judgment is required.',
    advantage: 'A defined recovery workflow with clinical hard stops and evidence for every claimed outcome.',
  },
  {
    label: 'Lead management',
    vagaro: <>Vagaro includes customer tracking, client data, booking-source reporting, loyalty tools, reminders, marketing, and marketplace discovery. The reviewed pages do not present a dedicated missed-demand recovery ledger.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup><sup><a href="#source-6">6</a></sup></>,
    scrutexity: 'Focuses on inquiries that were missed, delayed, abandoned, or left unworked, then records the source, response, booking, deposit, and escalation.',
    advantage: 'Purpose-built recovery attribution rather than general customer management.',
  },
  {
    label: 'Booking and POS',
    vagaro: <>Vagaro offers 24/7 online booking, deposits, stored cards, no-show fees, recurring payments, invoicing, checkout hardware, and integrated payment processing.<sup><a href="#source-1">1</a></sup><sup><a href="#source-5">5</a></sup></>,
    scrutexity: 'Does not replace booking or POS. It works alongside the existing system to recover demand before it disappears and document the resulting appointment.',
    advantage: 'Adds recovery without replacing the clinic’s booking or checkout workflow.',
  },
  {
    label: 'Workforce and payroll',
    vagaro: <>Vagaro supports staff access, customizable calendars, hours, tips, commissions, payroll-oriented reports, tax forms, and employee booking widgets.<sup><a href="#source-2">2</a></sup><sup><a href="#source-3">3</a></sup><sup><a href="#source-6">6</a></sup></>,
    scrutexity: 'Does not manage payroll or employee schedules. It reduces repetitive front-desk follow-up and routes exceptions to the appropriate clinic team member.',
    advantage: 'No workforce migration or new staff-management process is required.',
  },
  {
    label: 'Inventory',
    vagaro: <>Vagaro provides inventory tracking, stock controls, in-store and online product sales, and real-time inventory through its branded app and store experience.<sup><a href="#source-2">2</a></sup><sup><a href="#source-3">3</a></sup><sup><a href="#source-7">7</a></sup></>,
    scrutexity: 'Does not manage inventory. Its operating boundary remains inquiry recovery, booking evidence, deposits, and clinical escalation history.',
    advantage: 'A narrower system with less operational overlap and a clearly defined purpose.',
  },
  {
    label: 'Marketing and memberships',
    vagaro: <>Vagaro includes email allowances, reminders, Daily Deals, marketplace listings, loyalty programs, promotions, memberships, packages, and gift certificates.<sup><a href="#source-2">2</a></sup><sup><a href="#source-4">4</a></sup></>,
    scrutexity: 'Does not operate broad campaigns or membership programs. It applies approved follow-up specifically to identifiable missed demand.',
    advantage: 'Recovery activity stays tied to the original inquiry and verifiable outcome.',
  },
  {
    label: 'Reporting',
    vagaro: <>Vagaro provides customizable dashboards and reports for sales, appointments, providers, clients, booking sources, marketing, payroll inputs, fees, tips, and taxes.<sup><a href="#source-2">2</a></sup><sup><a href="#source-6">6</a></sup></>,
    scrutexity: 'Produces an exportable owner brief connecting inquiry source, staff-approved conversation, booking, deposit status, and clinical escalation.',
    advantage: 'Evidence designed to verify each recovery claim rather than only summarize operations.',
  },
  {
    label: 'Mobile app',
    vagaro: <>Vagaro offers business and consumer mobile apps plus an optional branded app for booking, profiles, payments, schedules, notifications, promotions, and shopping.<sup><a href="#source-1">1</a></sup><sup><a href="#source-5">5</a></sup><sup><a href="#source-7">7</a></sup></>,
    scrutexity: 'Works behind the existing customer and staff experience. Recovery does not require another patient-facing app or daily staff interface.',
    advantage: 'No additional app adoption is required for the recovery layer.',
  },
  {
    label: 'Pricing model',
    vagaro: <>Vagaro publicly promotes entry pricing around $30 per month, with a displayed promotional price of $23.99 per month at capture time. Payment processing, optional products, hardware, and other services can add cost.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Begins with a free demand audit and 14-day pilot. Ongoing plans are flat platform fees scoped by locations and operating complexity, never by patient value or recovered revenue.',
    advantage: 'Scrutexity is materially more expensive but includes focused implementation, governance, and recovery evidence rather than general business software.',
  },
];

const faq = [
  {
    question: 'Does Vagaro have an AI receptionist?',
    answer: 'Vagaro publicly advertises AI-powered business tools and marketing. As of June 15, 2026, the public feature pages reviewed for this comparison did not describe a dedicated AI receptionist that answers missed calls and publishes a clinical escalation rule.',
  },
  {
    question: 'Which platform is easier to scale?',
    answer: 'Vagaro is designed to scale broad salon, spa, and fitness operations from independent providers to multiple locations. Scrutexity is easier to add when a clinic wants missed-demand recovery without replacing its existing booking, payroll, inventory, or point-of-sale system.',
  },
  {
    question: 'Is Scrutexity cheaper than Vagaro?',
    answer: 'No. Vagaro’s public entry price is substantially lower. Scrutexity is a specialized recovery service with a free audit and pilot, hands-on implementation, clinical governance, and an exportable evidence record. The products are not substitutes based on price alone.',
  },
  {
    question: 'Does Scrutexity replace Vagaro?',
    answer: 'No. Vagaro handles broad business operations such as booking, payments, inventory, memberships, staff tools, marketing, and reporting. Scrutexity is a focused missed-demand recovery and governance layer.',
  },
  {
    question: 'What is Scrutexity’s AI advantage?',
    answer: 'Scrutexity focuses AI on governed recovery: clinic-approved messaging, deterministic escalation for clinical questions, minimum necessary access, and an owner brief that verifies each claimed recovery.',
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

export default function VagaroComparisonPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="relative overflow-hidden border-b border-sand-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_45%,#f8f3eb_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="section-kicker">Platform comparison</p>
          <h1 className={`mt-4 text-4xl leading-tight tracking-[-0.02em] sm:text-5xl md:text-6xl ${performanceMode ? 'font-sans font-semibold' : 'font-display'}`}>
            Vagaro vs Scrutexity – The AI-First Alternative
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-mist">
            Vagaro runs the business. Scrutexity governs and proves the recovery of missed demand.
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
            <h2 id="comparison-heading" className="mt-3 font-display text-3xl md:text-4xl">Affordable all-in-one operations or governed recovery?</h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              Vagaro is broad, competitively priced business software. Scrutexity is a narrower recovery layer. The advantage column identifies where Scrutexity’s focused scope creates a distinction; it does not imply feature-for-feature replacement.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[1.75rem] border border-[#dfd0bf] bg-cream shadow-sm">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#dfd0bf] bg-[#f3eadf]">
                  <th className="w-[18%] px-6 py-5 text-xs font-bold uppercase tracking-[0.13em] text-mist">Capability</th>
                  <th className="w-[29%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold">Vagaro public position</th>
                  <th className="w-[29%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold text-[#496052]">Scrutexity approach</th>
                  <th className="w-[24%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold text-[#8a533b]">Scrutexity Advantage</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <AnimatedTableRow key={row.label} index={index} className="border-b border-[#eadfd2] align-top last:border-b-0">
                    <th scope="row" className="px-6 py-6 text-sm font-semibold leading-6">{row.label}</th>
                    <td className="border-l border-[#eadfd2] px-6 py-6 text-sm leading-7 text-mist">
                      <div className="flex gap-3"><Minus className="mt-1.5 h-4 w-4 shrink-0 text-[#9b806d]" /><p>{row.vagaro}</p></div>
                    </td>
                    <td className="border-l border-[#eadfd2] px-6 py-6 text-sm leading-7 text-[#4d594f]">
                      <div className="flex gap-3"><Check className="mt-1.5 h-4 w-4 shrink-0 text-[#6b8576]" /><p>{row.scrutexity}</p></div>
                    </td>
                    <td className="border-l border-[#eadfd2] bg-[#f8f1e7]/70 px-6 py-6 text-sm leading-7 text-[#6f4938]">
                      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#b9825f]/30 bg-cream px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8a533b]">
                        <Sparkles className="h-3 w-3" /> Advantage
                      </span>
                      <p>{row.advantage}</p>
                    </td>
                  </AnimatedTableRow>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="section-kicker">Sources</p>
            <h2 className="mt-3 font-display text-3xl">Public evidence reviewed</h2>
            <ol className="mt-6 space-y-4 text-sm leading-7 text-mist">
              {sources.map((source) => (
                <li key={source.id} id={`source-${source.id}`}>
                  <span className="mr-2 font-mono font-bold text-espresso">{source.id}.</span>
                  <a href={source.href} target="_blank" rel="noreferrer" className="font-semibold text-[#8a533b] underline underline-offset-4 hover:text-[#5f3020]">
                    {source.label}
                  </a>{' '}
                  — captured {publishedDate}.
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs leading-6 text-[#8f8174]">
              Vagaro is a trademark of its respective owner. Scrutexity is not affiliated with or endorsed by Vagaro. Product capabilities and pricing can change; buyers should confirm current terms directly with each vendor.
            </p>
          </div>

          <aside className="rounded-[1.75rem] border border-[#d7c6b4] bg-[#f3eadf] p-8 lg:p-10">
            <p className="section-kicker">See your own gap</p>
            <h2 className="mt-3 font-display text-3xl">The useful comparison is your current baseline.</h2>
            <p className="mt-4 text-sm leading-7 text-mist">Run a read-only scan of missed calls, abandoned forms, and stalled inquiries. You keep the report either way.</p>
            <AuditBurstLink className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all btn-lg mt-7 inline-flex items-center gap-2">
              Run My Free Demand Audit <ArrowRight className="h-4 w-4" />
            </AuditBurstLink>
          </aside>
        </section>

        <section className="mt-20 max-w-4xl">
          <p className="section-kicker">FAQ</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Questions buyers ask</h2>
          <FAQAccordion items={faq} />
        </section>
      </main>
      <SalonObject3D />
    </div>
  );
}
