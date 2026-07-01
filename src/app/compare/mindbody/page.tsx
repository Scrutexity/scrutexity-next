import type { Metadata } from 'next';
import { ArrowRight, Check, Minus, Sparkles } from 'lucide-react';
import { AnimatedTableRow, AuditBurstLink, FAQAccordion } from '@/components/ComparisonMotion';
import SalonObject3D from '@/components/SalonObject3D';

const publishedDate = 'June 15, 2026';
const performanceMode = process.env.NEXT_PUBLIC_2026_PERFORMANCE_MODE === 'true';

export const metadata: Metadata = {
  title: 'Mindbody vs. Scrutexity – The Modern Alternative',
  description: 'A sourced comparison of Mindbody business management software with Scrutexity missed-demand recovery, clinical governance, and verifiable reporting.',
  alternates: { canonical: '/compare/mindbody' },
};

const sources = [
  {
    id: 1,
    label: 'Mindbody business features',
    href: 'https://www.mindbodyonline.com/business',
  },
  {
    id: 2,
    label: 'Mindbody pricing and feature comparison',
    href: 'https://www.mindbodyonline.com/business/pricing',
  },
];

// <!-- sourced from Mindbody features page -->
const comparisonRows = [
  {
    label: 'AI receptionist',
    mindbody: <>Messenger[ai] is described as a 24/7 chatbot and front-desk assistant that answers client questions, responds to missed calls, supports booking, and drives sales. It is listed as an add-on on eligible plans.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Recovers missed calls and stalled inquiries using clinic-approved language, with deterministic escalation when medical or clinical judgment is required.',
    advantage: 'Clinical-stop governance and a verifiable recovery record.',
  },
  {
    label: 'Lead management',
    mindbody: <>Ultimate includes a sales pipeline with automated lead capture, drag-and-drop stages, follow-up tasks, funnel analytics, and supported advertising integrations.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Focuses specifically on leads that already entered the clinic’s ecosystem but were missed, delayed, abandoned, or left unworked.',
    advantage: 'Purpose-built recovery instead of another general sales queue.',
  },
  {
    label: 'Workforce management',
    mindbody: <>Mindbody documents staff scheduling, permissions, automatic substitutions, performance reviews, payroll support, and multi-location staff controls.<sup><a href="#source-1">1</a></sup></>,
    scrutexity: 'Does not replace workforce software. It reduces repetitive front-desk follow-up and routes exceptions to the appropriate clinic team member.',
    advantage: 'Adds recovery without requiring workforce migration or retraining.',
  },
  {
    label: 'Inventory',
    mindbody: <>Mindbody’s pricing page includes team, schedule, inventory, and revenue management in its comprehensive management tools, with retail products supported through its POS workflows.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Does not manage retail or clinical inventory. Its scope stays on inquiry recovery, booking evidence, deposits, and escalation history.',
    advantage: 'A narrower system with a clearly defined operating boundary.',
  },
  {
    label: 'Marketing',
    mindbody: <>Mindbody offers integrated email and SMS campaigns, automated engagement workflows, list growth tools, marketplace discovery, and third-party marketing integrations.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Does not act as a broad campaign platform. It applies staff-approved follow-up to identifiable missed demand and documents each resulting outcome.',
    advantage: 'Recovery attribution is tied to the original inquiry and clinic record.',
  },
  {
    label: 'Reporting',
    mindbody: <>Mindbody provides dashboards and scheduled reports across sales, visits, memberships, clients, staff, payroll, marketing, retention, and lead conversion.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Produces an exportable owner brief connecting inquiry source, response, staff-approved conversation, booking, deposit status, and clinical escalation.',
    advantage: 'Evidence designed to verify each recovery claim, not only summarize performance.',
  },
  {
    label: 'Mobile app',
    mindbody: <>Mindbody offers its consumer marketplace app, a Business app for staff operations, and an optional branded iOS and Android app for client booking and account management.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Works behind the existing client experience. Clinics do not need to ask patients or staff to adopt another app for recovery workflows.',
    advantage: 'No additional patient app or daily staff interface required.',
  },
  {
    label: 'Pricing model',
    mindbody: <>Public pricing starts at $99 USD per month per location. Higher tiers unlock advanced reporting, marketing, and lead management; branded apps and Messenger[ai] are add-ons, and some payment, messaging, integration, or marketplace activity can carry transaction or usage fees.<sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Begins with a free demand audit and a 14-day pilot. Ongoing plans are flat platform fees scoped by locations and operating complexity, never by patient value, recovered revenue, or clinical outcome.',
    advantage: 'Transparent recovery scope and no percentage-of-revenue pricing. Mindbody’s base plan is lower-priced.',
  },
];

const faq = [
  {
    question: 'Does Mindbody have an AI receptionist?',
    answer: 'Yes. Mindbody offers Messenger[ai], which its public materials describe as a 24/7 AI-powered chatbot and front-desk assistant that answers client questions, responds to missed calls, supports booking, and drives sales. It is listed as an add-on on eligible plans.',
  },
  {
    question: 'Which is more affordable, Mindbody or Scrutexity?',
    answer: 'Mindbody publicly starts at $99 USD per month per location, while Scrutexity ongoing recovery plans begin at a higher price. Scrutexity starts with a free audit and pilot and uses flat scope-based pricing without charging a percentage of patient value or recovered revenue. The products solve different problems and should not be compared on base price alone.',
  },
  {
    question: 'Does Scrutexity replace Mindbody?',
    answer: 'No. Mindbody is broad business-management software for scheduling, payments, staff, marketing, reporting, and client management. Scrutexity is a focused missed-demand recovery and governance layer designed to work alongside existing booking software.',
  },
  {
    question: 'What is Scrutexity’s AI advantage?',
    answer: 'Scrutexity focuses on governed recovery: clinic-approved patient messaging, deterministic escalation of clinical questions, minimum necessary access, and an exportable record that lets an owner verify each claimed recovery.',
  },
  {
    question: 'Can both products report on leads and bookings?',
    answer: 'Yes, but the reporting goals differ. Mindbody provides broad operational and sales reporting. Scrutexity produces a recovery-specific owner brief tying the original inquiry, conversation, booking, deposit status, and escalation history together.',
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

export default function MindbodyComparisonPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="relative overflow-hidden border-b border-sand-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_45%,#f8f3eb_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="section-kicker">Platform comparison</p>
          <h1 className={`mt-4 text-4xl leading-tight tracking-[-0.02em] sm:text-5xl md:text-6xl ${performanceMode ? 'font-sans font-semibold' : 'font-display'}`}>
            Mindbody vs. Scrutexity – The Modern Alternative
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-mist">
            Mindbody runs the business. Scrutexity governs and proves the recovery of missed demand.
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
            <h2 id="comparison-heading" className="mt-3 font-display text-3xl md:text-4xl">Broad incumbent platform or focused recovery governance?</h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              Mindbody is an established all-in-one operating platform. Scrutexity is a narrower recovery layer. The advantage column identifies where Scrutexity’s focused scope creates a practical distinction; it does not imply feature-for-feature replacement.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[1.75rem] border border-[#dfd0bf] bg-cream shadow-sm">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#dfd0bf] bg-[#f3eadf]">
                  <th className="w-[18%] px-6 py-5 text-xs font-bold uppercase tracking-[0.13em] text-mist">Capability</th>
                  <th className="w-[29%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold">Mindbody public position</th>
                  <th className="w-[29%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold text-[#496052]">Scrutexity approach</th>
                  <th className="w-[24%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold text-[#8a533b]">Scrutexity Advantage</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <AnimatedTableRow key={row.label} index={index} className="border-b border-[#eadfd2] align-top last:border-b-0">
                    <th scope="row" className="px-6 py-6 text-sm font-semibold leading-6">{row.label}</th>
                    <td className="border-l border-[#eadfd2] px-6 py-6 text-sm leading-7 text-mist">
                      <div className="flex gap-3"><Minus className="mt-1.5 h-4 w-4 shrink-0 text-[#9b806d]" /><p>{row.mindbody}</p></div>
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
              Mindbody is a trademark of its respective owner. Scrutexity is not affiliated with or endorsed by Mindbody. Product capabilities and pricing can change; buyers should confirm current terms directly with each vendor.
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
