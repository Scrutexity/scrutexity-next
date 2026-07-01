import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/ui-custom/reveal';

export const metadata: Metadata = {
  title: 'Clinical Governance | Scrutexity',
  description: 'Governed AI workflows for medical aesthetics: BAA-first activation, PHI stripping at the edge, and a deterministic clinical-question stop-rule.',
  alternates: { canonical: '/governance' },
};

const boundaries = [
  {
    title: 'BAA-First Activation',
    body: "Before a single API call reads your inquiry data, we execute a Business Associate Agreement. No exceptions, no provisional connections, no 'we'll send it next week.'",
    fact: 'Median time from contract sign to BAA execution: under 48 hours.',
    icon: FileText,
  },
  {
    title: 'PHI Stripped at the Edge',
    body: 'Patient identifiers - names, dates of birth, medical histories, treatment specifics - are detected and redacted before the inquiry reaches our processing layer. The AI sees scheduling intent only.',
    fact: 'Scrutexity does not store raw patient identifiers in its application layer.',
    icon: ShieldCheck,
  },
  {
    title: 'Deterministic Clinical Stop-Rule',
    body: 'When a patient asks a clinical question - pain, post-op concerns, treatment contraindications, pregnancy-related queries - the automated workflow halts. The conversation is routed to the on-call provider with full context. The AI does not diagnose, recommend, or interpret.',
    fact: 'Stop-rule triggers route to your staff within seconds, with the full inquiry context attached.',
    icon: CheckCircle2,
  },
];

const stopRuleRows = [
  [
    'Is this redness normal 48 hours after Morpheus8?',
    'Escalate to provider, no AI response.',
    'Could hallucinate "apply ice" - clinical liability.',
  ],
  [
    'Can I get Botox while pregnant?',
    'Refuse to schedule, cite clinic policy, escalate.',
    'Could book the appointment, creating a clinical incident.',
  ],
  [
    'What dose did I get last time?',
    'Escalate, AI does not access medical records.',
    "Could surface PHI it shouldn't have.",
  ],
];

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-cream text-espresso">
      <header className="border-b border-sand-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="section-kicker">Clinical governance</p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Governed AI, not autonomous AI.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-mist">
            Everyone's worried about staff pasting patient data into ChatGPT. The quieter, more expensive liability is the bot on your homepage making clinical promises no one approved. Scrutexity's governance framework ensures every AI interaction operates inside three boundaries: a BAA executed before activation, PHI stripped at the edge, and a deterministic stop-rule for clinical questions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/agent-guardrail" 
              className="w-full sm:w-auto group px-7 py-4 bg-espresso hover:bg-sage-deep text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center justify-center gap-2"
            >
              Run an Agent Guardrail Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link 
              href="/sample-report" 
              className="w-full sm:w-auto px-7 py-4 bg-cream-deep border border-sand-deep/30 hover:bg-sand-deep/20 text-ink font-sans font-semibold rounded-xl transition-all duration-300 text-sm text-center"
            >
              View a Sample Claim Receipt
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
        <section>
          <ScrollReveal>
            <p className="section-kicker">For Design Partners</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">The API Middleware Layer.</h2>
            <p className="mt-4 text-mist max-w-2xl leading-7 text-sm">
              Our point-in-time audits prove the gaps in your AI stack. For select design partners, our Governance API sits inline, filtering AI outputs in real-time before they reach the patient.
            </p>
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {boundaries.map(({ title, body, fact, icon: Icon }, index) => (
              <ScrollReveal key={title} delay={index * 0.06} className="rounded-[1.5rem] border border-sand-deep bg-cream p-6 shadow-sm">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-[#7f8f78]/25 bg-[#7f8f78]/10 text-[#496052]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{body}</p>
                <p className="mt-5 border-t border-sand-deep pt-4 text-xs font-semibold leading-6 text-[#8a533b]">{fact}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <ScrollReveal className="mt-20">
          <p className="section-kicker">What the stop-rule catches</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">Clinical questions stop the workflow.</h2>
          <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-[#dfd0bf] bg-cream">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#dfd0bf] bg-[#f3eadf]">
                  <th className="w-1/3 p-5 text-xs font-bold uppercase tracking-[0.13em] text-mist">Patient inquiry</th>
                  <th className="w-1/3 border-l border-[#dfd0bf] p-5 text-xs font-bold uppercase tracking-[0.13em] text-[#496052]">How Scrutexity handles it</th>
                  <th className="w-1/3 border-l border-[#dfd0bf] p-5 text-xs font-bold uppercase tracking-[0.13em] text-[#8a533b]">What standard chatbots might do</th>
                </tr>
              </thead>
              <tbody>
                {stopRuleRows.map(([inquiry, handling, risk]) => (
                  <tr key={inquiry} className="border-b border-[#eadfd2] last:border-b-0">
                    <td className="p-5 text-sm font-semibold leading-7">{inquiry}</td>
                    <td className="border-l border-[#eadfd2] p-5 text-sm leading-7 text-[#4d594f]">{handling}</td>
                    <td className="border-l border-[#eadfd2] p-5 text-sm leading-7 text-mist">{risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-20 rounded-[1.75rem] border border-[#d7c6b4] bg-[#f3eadf] p-8">
          <p className="section-kicker">The verifiable ledger</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight">Every governed workflow leaves a receipt.</h2>
          <p className="mt-4 text-sm leading-7 text-mist">
            Every governed workflow produces an exportable artifact. Source + conversation transcript + booking status + deposit status. You can verify every recovery against your bank statements. Yours to export and keep regardless of whether you continue.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12 flex flex-col gap-4 rounded-[1.5rem] border border-sand-deep bg-cream p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-kicker">Review the architecture</p>
            <p className="mt-2 text-sm text-mist">Security brief and trust center are available before any connection.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/security-brief" className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all btn-sm inline-flex items-center gap-2">
              Read the Security Architecture Brief <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/trust" className="btn-ghost btn-sm">Trust Center</Link>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}
