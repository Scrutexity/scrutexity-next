import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/ui-custom/reveal';

export const metadata: Metadata = {
  title: 'Diagnostic Engagement | Scrutexity',
  description:
    'A 14-day, $3,500 paid diagnostic of your missed-demand baseline. Written report, sized opportunity, and three named workflow gaps. Yours to keep regardless of next step.',
  alternates: { canonical: '/diagnostic' },
};

const includes = [
  {
    title: 'Baseline missed-demand audit',
    body:
      'A read-only review of your last 30 days of inquiries across calls, web forms, IG/FB DMs, and after-hours activity. Sized against your paid ad spend.',
    icon: ClipboardCheck,
  },
  {
    title: 'Three named workflow gaps',
    body:
      'Specific, observable failure points in your current front-desk and PMS flow. Not generic best-practices — three concrete gaps with operational examples.',
    icon: FileText,
  },
  {
    title: 'Sized recovery opportunity',
    body:
      'A directional, hedged estimate of recoverable revenue from your current funnel — tied to deposit-captured booking math, not aspirational projections.',
    icon: CheckCircle2,
  },
  {
    title: 'Configuration recommendation',
    body:
      'If Scrutexity is a fit, the report names the workflows and integrations that match your stack. If we are not a fit, the report says so plainly.',
    icon: ShieldCheck,
  },
];

const process = [
  {
    day: 'Day 0',
    title: 'Kickoff + read-only access',
    body:
      'Contract signed, BAA executed, read-only API connection to Boulevard or Mangomint. 30-minute scoping call.',
  },
  {
    day: 'Days 1–10',
    title: 'Quiet review',
    body:
      'We pull the last 30 days of inquiry data, map it against your paid ad activity, and surface where demand stalled. No staff involvement required.',
  },
  {
    day: 'Day 12',
    title: 'Draft report walkthrough',
    body:
      '45-minute call walking through findings before final delivery. You get the chance to push back on framing and add context.',
  },
  {
    day: 'Day 14',
    title: 'Final report delivered',
    body:
      'A 10–12 page written report covering baseline, gaps, sized opportunity, and configuration recommendation. PDF + editable version, yours to keep.',
  },
];

const faq = [
  {
    q: 'How is this different from the free pilot?',
    a: 'The free pilot is a 30-day run of the Scrutexity recovery layer with a $2,000 threshold gate. The diagnostic is a paid 14-day written analysis of your missed-demand baseline. The diagnostic answers "is there a problem worth solving here and what does it look like." The pilot answers "can Scrutexity solve it." Many clinics do the diagnostic first and decide the pilot from there.',
  },
  {
    q: 'What if Scrutexity is not a fit?',
    a: 'The report says so plainly. You keep the report. We do not run a pilot. Roughly one in five engagements ends here — the diagnostic surfaces a gap that does not match what Scrutexity is built for. That is a useful outcome, not a failed one.',
  },
  {
    q: 'Is the $3,500 credited toward a SaaS subscription?',
    a: 'No. The diagnostic is a separate engagement with its own deliverable. If you continue to a Scrutexity SaaS pilot afterward, that runs under its own terms. The diagnostic stands on its own.',
  },
  {
    q: 'Who signs off on the engagement on your end?',
    a: 'The founder runs every diagnostic personally. Capped at three concurrent engagements so quality stays high.',
  },
  {
    q: 'What access do you actually need?',
    a: 'Read-only API access to your PMS (Boulevard or Mangomint), summary access to your ad platform reporting (Meta or Google Ads), and a 30-minute scoping call. No PHI is required for the diagnostic — we work at the inquiry-volume and timing layer, not the patient-record layer.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="relative overflow-hidden border-b border-sand-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_45%,#f8f3eb_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="section-kicker">Paid diagnostic</p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-[-0.02em] sm:text-5xl md:text-6xl">
            Find out where your demand actually leaks.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-mist">
            A 14-day paid diagnostic of your missed-demand baseline. We audit the last 30 days of inquiries, name three
            workflow gaps, and size the recovery opportunity against your paid ad spend. You get a written report
            regardless of whether you continue with Scrutexity.
          </p>

          <div className="mt-10 inline-flex flex-col items-center gap-3 rounded-2xl border border-[#d8c9b7] bg-cream px-8 py-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-clay-deep">Engagement</p>
            <p className="font-display text-4xl font-semibold text-espresso">$3,500</p>
            <p className="text-xs text-mist">Flat fee · 14-day delivery · paid up front</p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="mailto:nick@scrutexity.com?subject=Diagnostic%20Engagement%20Inquiry"
              className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all btn-lg inline-flex items-center gap-2"
            >
              Apply for a Diagnostic Engagement <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-clay-deep">Three concurrent engagements max. Currently accepting applications.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        <section aria-labelledby="includes-heading">
          <ScrollReveal>
            <p className="section-kicker">What you receive</p>
            <h2 id="includes-heading" className="mt-3 font-display text-3xl md:text-4xl">
              A written report, not a sales deck.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-mist">
              The deliverable is a 10–12 page report you can hand to your operations lead, your medical director, or your
              ad agency. It stands on its own.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {includes.map(({ title, body, icon: Icon }) => (
              <ScrollReveal key={title}>
                <div className="h-full rounded-2xl border border-sand-deep bg-cream p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-sand-deep bg-[#f3eadf] text-clay-deep">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-espresso">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-mist">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="process-heading" className="mt-20">
          <ScrollReveal>
            <p className="section-kicker">The 14-day timeline</p>
            <h2 id="process-heading" className="mt-3 font-display text-3xl md:text-4xl">
              How the engagement runs.
            </h2>
          </ScrollReveal>

          <div className="mt-10 space-y-4">
            {process.map((step) => (
              <ScrollReveal key={step.day}>
                <div className="flex flex-col gap-4 rounded-2xl border border-sand-deep bg-cream p-6 sm:flex-row sm:items-start sm:gap-6">
                  <div className="sm:w-40 sm:shrink-0">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-clay-deep">{step.day}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-espresso">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-mist">{step.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="governance-heading" className="mt-20">
          <ScrollReveal>
            <div className="rounded-2xl border border-sand-deep bg-[#f3eadf]/60 p-8">
              <p className="section-kicker">Compliance posture</p>
              <h2 id="governance-heading" className="mt-3 font-display text-2xl md:text-3xl">
                Same governance as the platform.
              </h2>
              <p className="mt-4 text-sm leading-7 text-mist">
                Diagnostic engagements run under the same BAA, the same read-only access posture, and the same
                deterministic clinical stop-rule as the Scrutexity platform. The report is operational, not clinical. We
                do not advise on patient interactions, treatment protocols, or clinical workflow. We audit infrastructure
                and surface workflow gaps.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/governance"
                  className="text-sm font-semibold text-[#8a533b] underline underline-offset-4 hover:text-[#5f3020]"
                >
                  Read the governance brief
                </Link>
                <Link
                  href="/trust"
                  className="text-sm font-semibold text-[#8a533b] underline underline-offset-4 hover:text-[#5f3020]"
                >
                  Trust Center
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section aria-labelledby="faq-heading" className="mt-20 max-w-4xl">
          <ScrollReveal>
            <p className="section-kicker">FAQ</p>
            <h2 id="faq-heading" className="mt-3 font-display text-3xl md:text-4xl">
              Questions buyers ask.
            </h2>
          </ScrollReveal>

          <div className="mt-8 space-y-4">
            {faq.map((item) => (
              <ScrollReveal key={item.q}>
                <div className="rounded-2xl border border-sand-deep bg-cream p-6">
                  <h3 className="font-semibold text-espresso">{item.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-mist">{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <ScrollReveal>
            <div className="rounded-2xl border border-[#d7c6b4] bg-[#f3eadf] p-8 text-center lg:p-12">
              <p className="section-kicker">Ready to start</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Apply for a Diagnostic Engagement.</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-mist">
                Email the founder directly. Include your clinic name, PMS, monthly inquiry volume, and approximate paid
                ad spend. Replies within one business day.
              </p>
              <Link
                href="mailto:nick@scrutexity.com?subject=Diagnostic%20Engagement%20Inquiry"
                className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all btn-lg mt-7 inline-flex items-center gap-2"
              >
                Email the founder <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </div>
  );
}
