import type { Metadata } from 'next';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { AnimatedTableRow, AuditBurstLink, FAQAccordion } from '@/components/ComparisonMotion';
import SalonObject3D from '@/components/SalonObject3D';

const publishedDate = 'June 15, 2026';
const performanceMode = process.env.NEXT_PUBLIC_2026_PERFORMANCE_MODE === 'true';

export const metadata: Metadata = {
  title: 'Zenoti vs. Scrutexity: Automation vs. Governance',
  description: 'A sourced comparison of Zenoti AI Receptionist and AI Lead Manager with Scrutexity missed-demand recovery and clinical governance.',
  alternates: { canonical: '/comparison/zenoti' },
};

const sources = [
  {
    id: 1,
    label: 'Zenoti AI Receptionist',
    href: 'https://www.zenoti.com/ai-workforce/ai-receptionist',
  },
  {
    id: 2,
    label: 'Zenoti AI Lead Manager',
    href: 'https://www.zenoti.com/ai-workforce/lead-manager',
  },
  {
    id: 3,
    label: 'Zenoti AI Workforce overview',
    href: 'https://www.zenoti.com/',
  },
];

const comparisonRows = [
  {
    label: 'Missed call recovery claim',
    zenoti: <>AI Receptionist says it catches calls the front desk misses and completes booking end to end; Zenoti also markets 24/7 missed-call and after-hours coverage.<sup><a href="#source-1">1</a></sup></>,
    scrutexity: 'Finds missed calls and other unworked inquiries, then follows the clinic-approved recovery workflow alongside the existing booking system.',
  },
  {
    label: 'Response time claim',
    zenoti: <>Zenoti describes its AI Workforce as always on and its AI Receptionist as available 24/7. The reviewed public pages do not state a quantified first-response SLA.<sup><a href="#source-1">1</a></sup><sup><a href="#source-3">3</a></sup></>,
    scrutexity: 'The pilot establishes the clinic workflow and records timestamps for each detected inquiry, response, escalation, and outcome. Results are reported from the clinic record, not a generic speed promise.',
  },
  {
    label: 'Staff approval before patient-facing message',
    zenoti: <>Zenoti publicly describes automated booking, upselling, confirmation, and follow-up, including confirmation calls made without staff involvement. The reviewed pages do not describe per-message staff approval.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Patient-facing recovery language and routing rules are approved by the clinic before activation. Messages run within those approved boundaries.',
  },
  {
    label: 'Clinical question handling',
    zenoti: <>AI Receptionist advertises a graceful human handover when a guest requests it or when the situation calls for it. The reviewed public page does not define a deterministic stop specifically for clinical questions.<sup><a href="#source-1">1</a></sup></>,
    scrutexity: 'Clinical language stops the automated sequence and routes the conversation to licensed clinic staff. Scrutexity does not diagnose, recommend treatment, or answer medical questions.',
  },
  {
    label: 'Audit trail / proof of recovery',
    zenoti: <>Zenoti advertises an AI performance dashboard, attributed bookings and revenue, handover rates, call recordings, transcripts, and summaries.<sup><a href="#source-1">1</a></sup></>,
    scrutexity: 'Produces an exportable owner brief tying the inquiry source, staff-approved conversation, booking status, deposit status, and escalation history together for clinic verification.',
  },
  {
    label: 'Data isolation / read-only access',
    zenoti: <>Zenoti describes AI Lead Manager as integrated with the Zenoti booking system and AI Receptionist as receiving forwarded calls. The reviewed public pages do not present the products as a read-only overlay or publish a clinic-level isolation model.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Uses minimum necessary access, begins with a read-only connection where supported, and executes a BAA before patient-adjacent workflows are activated.',
  },
];

const faq = [
  {
    question: 'Does Zenoti recover missed calls?',
    answer: 'Yes. Zenoti publicly states that AI Receptionist handles calls the front desk misses, supports 24/7 coverage, and can complete bookings, cancellations, and rescheduling.',
  },
  {
    question: 'What is the main difference between Zenoti and Scrutexity?',
    answer: 'Zenoti is an all-in-one operating platform with autonomous AI agents. Scrutexity is a governed missed-demand recovery layer designed to work alongside an existing booking system, with staff-approved messaging, clinical escalation, and an exportable recovery record.',
  },
  {
    question: 'Does Zenoti publish a clinical-question stop rule?',
    answer: 'Zenoti publicly describes human handover when requested or when a situation calls for it. As of June 15, 2026, the public product pages reviewed for this comparison did not define a deterministic stop specifically for clinical questions.',
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

export default function ZenotiComparisonPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="relative overflow-hidden border-b border-sand-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_45%,#f8f3eb_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="section-kicker">Platform comparison</p>
          <h1 className={`mt-4 text-4xl leading-tight tracking-[-0.02em] sm:text-5xl md:text-6xl ${performanceMode ? 'font-sans font-semibold' : 'font-display'}`}>
            Zenoti vs. Scrutexity: Automation vs. Governance
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-mist">
            Both recover missed calls. Only one stops at clinical questions.
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
            <h2 id="comparison-heading" className="mt-3 font-display text-3xl md:text-4xl">Different products, different control models.</h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              Zenoti is a broad operating platform with autonomous AI capabilities. Scrutexity is a focused recovery and governance layer. “Not publicly specified” means the control was not stated on the Zenoti pages reviewed; it does not assert that the capability cannot exist elsewhere.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[1.75rem] border border-[#dfd0bf] bg-cream shadow-sm">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#dfd0bf] bg-[#f3eadf]">
                  <th className="w-[23%] px-6 py-5 text-xs font-bold uppercase tracking-[0.13em] text-mist">Capability</th>
                  <th className="w-[38.5%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold">Zenoti public position</th>
                  <th className="w-[38.5%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold text-[#496052]">Scrutexity approach</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <AnimatedTableRow key={row.label} index={index} className="border-b border-[#eadfd2] align-top last:border-b-0">
                    <th scope="row" className="px-6 py-6 text-sm font-semibold leading-6">{row.label}</th>
                    <td className="border-l border-[#eadfd2] px-6 py-6 text-sm leading-7 text-mist">
                      <div className="flex gap-3"><Minus className="mt-1.5 h-4 w-4 shrink-0 text-[#9b806d]" /><p>{row.zenoti}</p></div>
                    </td>
                    <td className="border-l border-[#eadfd2] px-6 py-6 text-sm leading-7 text-[#4d594f]">
                      <div className="flex gap-3"><Check className="mt-1.5 h-4 w-4 shrink-0 text-[#6b8576]" /><p>{row.scrutexity}</p></div>
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
              Zenoti is a trademark of its respective owner. Scrutexity is not affiliated with or endorsed by Zenoti. Product capabilities can change; buyers should confirm current behavior directly with each vendor.
            </p>
          </div>

          <aside className="rounded-[1.75rem] border border-[#d7c6b4] bg-[#f3eadf] p-8 lg:p-10">
            <p className="section-kicker">See your own gap</p>
            <h2 className="mt-3 font-display text-3xl">The useful comparison is your current baseline.</h2>
            <p className="mt-4 text-sm leading-7 text-mist">Run a read-only scan of missed calls, abandoned forms, and stalled inquiries. You keep the report either way.</p>
            <AuditBurstLink className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all btn-lg mt-7 inline-flex items-center gap-2">
              Run Your Free Demand Audit <ArrowRight className="h-4 w-4" />
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
