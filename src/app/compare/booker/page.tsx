import type { Metadata } from 'next';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { AnimatedTableRow, AuditBurstLink, FAQAccordion } from '@/components/ComparisonMotion';
import SalonObject3D from '@/components/SalonObject3D';

const publishedDate = 'June 15, 2026';
const performanceMode = process.env.NEXT_PUBLIC_2026_PERFORMANCE_MODE === 'true';

export const metadata: Metadata = {
  title: 'Booker vs. Scrutexity: Operations vs. Recovery Governance',
  description: 'A sourced comparison of Booker salon and spa management software with Scrutexity missed-demand recovery and clinical governance.',
  alternates: { canonical: '/compare/booker' },
};

const sources = [
  {
    id: 1,
    label: 'Booker product overview',
    href: 'https://www.booker.com/',
  },
  {
    id: 2,
    label: 'Booker pricing and feature comparison',
    href: 'https://www.booker.com/pricing',
  },
  {
    id: 3,
    label: 'Booker spa software',
    href: 'https://www.booker.com/spa-software',
  },
  {
    id: 4,
    label: 'Booker salon software',
    href: 'https://www.booker.com/salon-software',
  },
];

// <!-- sourced from Booker public materials -->
const comparisonRows = [
  {
    label: 'Core product scope',
    booker: <>Booker describes itself as all-in-one salon and spa management software covering bookings, rooms, equipment, staff schedules, inventory, payments, payroll, and marketing.<sup><a href="#source-1">1</a></sup></>,
    scrutexity: 'Works alongside existing booking software to identify, recover, and document missed demand. It does not replace the clinic’s scheduling, payroll, inventory, or point-of-sale system.',
  },
  {
    label: 'Missed call and after-hours response',
    booker: <>Booker offers Messenger[ai] as a 24/7 chatbot that can answer client questions, respond to missed calls, handle texts, schedule appointments, and drive sales. Availability varies by plan and region.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Finds missed calls, abandoned forms, and stalled messages, then follows clinic-approved recovery rules and records the resulting booking, deposit, or escalation.',
  },
  {
    label: 'Inventory and daily operations',
    booker: <>Booker publicly documents inventory tracking, automatic product deduction, room and equipment management, staff scheduling, compensation tools, cash drawer management, and payroll support.<sup><a href="#source-1">1</a></sup><sup><a href="#source-3">3</a></sup><sup><a href="#source-4">4</a></sup></>,
    scrutexity: 'Does not manage inventory, payroll, staff compensation, or checkout. Its scope is the inquiry-to-booking handoff and the evidence needed to verify that recovery.',
  },
  {
    label: 'Marketing and client retention',
    booker: <>Booker offers branded booking, targeted email and text campaigns, smart contact lists, loyalty tools, referrals, reviews, and automated marketing on eligible plans.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Does not operate as a general campaign platform. It focuses follow-up on identifiable missed or stalled demand using messaging and routing rules approved by the clinic.',
  },
  {
    label: 'Reporting and proof of recovery',
    booker: <>Booker advertises reporting for sales, transactions, revenue trends, staff performance, inventory, and overall business performance.<sup><a href="#source-2">2</a></sup><sup><a href="#source-3">3</a></sup><sup><a href="#source-4">4</a></sup></>,
    scrutexity: 'Produces an exportable owner brief that ties each claimed recovery to its inquiry source, staff-approved conversation, booking status, deposit status, and escalation history.',
  },
  {
    label: 'Clinical question governance',
    booker: <>Booker publicly says Messenger[ai] can answer client questions and schedule appointments. The reviewed public pages do not define a deterministic stop specifically for medical or clinical questions.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Clinical language stops the automated sequence and routes the conversation to licensed clinic staff. Scrutexity does not diagnose, recommend treatment, or answer medical questions.',
  },
  {
    label: 'Deployment and data access model',
    booker: <>Booker is the system of record for scheduling, client management, payments, inventory, marketing, and reporting. Its public pricing page also describes data migration into the platform and PCI-focused security controls.<sup><a href="#source-2">2</a></sup></>,
    scrutexity: 'Uses minimum necessary access and begins with a read-only connection where supported. A BAA is executed before patient-adjacent workflows are activated.',
  },
];

const faq = [
  {
    question: 'Is Booker only an appointment scheduler?',
    answer: 'No. Booker publicly positions itself as all-in-one salon and spa management software with scheduling, payments, inventory, staff management, marketing, reporting, memberships, packages, and other operating tools.',
  },
  {
    question: 'Can Booker respond to missed calls?',
    answer: 'Booker offers Messenger[ai], which its public pricing page describes as a 24/7 AI-powered chatbot that answers client questions, responds to missed calls, and drives sales. It is listed as an add-on on eligible plans, and availability can vary by region.',
  },
  {
    question: 'What is the main difference between Booker and Scrutexity?',
    answer: 'Booker is broad salon and spa operating software. Scrutexity is a focused missed-demand recovery and governance layer that works alongside booking software, routes clinical questions to staff, and produces an exportable record of each claimed recovery.',
  },
  {
    question: 'Does Booker publish a clinical-question stop rule?',
    answer: 'As of June 15, 2026, the Booker public product and pricing pages reviewed for this comparison did not define a deterministic stop specifically for medical or clinical questions.',
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

export default function BookerComparisonPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="relative overflow-hidden border-b border-sand-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_45%,#f8f3eb_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="section-kicker">Platform comparison</p>
          <h1 className={`mt-4 text-4xl leading-tight tracking-[-0.02em] sm:text-5xl md:text-6xl ${performanceMode ? 'font-sans font-semibold' : 'font-display'}`}>
            Booker vs. Scrutexity: Operations vs. Recovery Governance
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-mist">
            Booker runs the spa. Scrutexity proves what happened to the demand that slipped past it.
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
            <h2 id="comparison-heading" className="mt-3 font-display text-3xl md:text-4xl">An operating platform and a recovery layer solve different problems.</h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              Booker is broad salon and spa management software. Scrutexity is a focused missed-demand recovery and governance layer. “Not publicly specified” means the control was not stated on the Booker pages reviewed; it does not assert that the capability cannot exist elsewhere.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[1.75rem] border border-[#dfd0bf] bg-cream shadow-sm">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#dfd0bf] bg-[#f3eadf]">
                  <th className="w-[23%] px-6 py-5 text-xs font-bold uppercase tracking-[0.13em] text-mist">Capability</th>
                  <th className="w-[38.5%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold">Booker public position</th>
                  <th className="w-[38.5%] border-l border-[#dfd0bf] px-6 py-5 text-sm font-bold text-[#496052]">Scrutexity approach</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <AnimatedTableRow key={row.label} index={index} className="border-b border-[#eadfd2] align-top last:border-b-0">
                    <th scope="row" className="px-6 py-6 text-sm font-semibold leading-6">{row.label}</th>
                    <td className="border-l border-[#eadfd2] px-6 py-6 text-sm leading-7 text-mist">
                      <div className="flex gap-3"><Minus className="mt-1.5 h-4 w-4 shrink-0 text-[#9b806d]" /><p>{row.booker}</p></div>
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
              Booker and Mindbody are trademarks of their respective owners. Scrutexity is not affiliated with or endorsed by Booker or Mindbody. Product capabilities can change; buyers should confirm current behavior directly with each vendor.
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
