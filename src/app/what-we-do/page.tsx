import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What Scrutexity Does and Does Not Do',
  description: 'A plain-language boundary for Scrutexity missed-demand recovery, data access, and clinical escalation.',
  alternates: { canonical: '/what-we-do' },
};

const rows = [
  ['Identify missed calls, abandoned forms, stalled messages, and unrebooked inquiries.', 'Replace your practice-management system or electronic medical record.'],
  ['Send staff-approved scheduling follow-up and document the outcome.', 'Diagnose, recommend treatment, answer clinical questions, or make medical decisions.'],
  ['Escalate clinical language to the clinic team for human review.', 'Allow an AI system to continue when a conversation requires clinical judgment.'],
  ['Use the minimum access needed and execute a BAA before patient-adjacent workflows activate.', 'Sell patient data, use clinic conversations to train public models, or require broad account access.'],
  ['Provide an exportable record of source, conversation, booking, and deposit status.', 'Claim recovered revenue without a record the clinic can verify.'],
];

export default function WhatWeDoPage() {
  return (
    <div className="min-h-screen bg-cream px-5 py-20 sm:px-8">
      <main className="mx-auto max-w-5xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Operating boundary</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-espresso sm:text-5xl md:text-6xl">
            What we do. What we do not do.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-mist">
            Scrutexity helps clinics follow up on missed demand. It does not practice medicine, replace licensed staff, or ask you to trust an uncheckable result.
          </p>
        </header>

        <section className="mt-14 overflow-hidden rounded-[1.75rem] border border-[#dfd0bf] bg-cream shadow-sm">
          <div className="grid grid-cols-2 border-b border-[#dfd0bf] bg-[#f3eadf]">
            <h2 className="px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#4c5948] sm:px-8">What we do</h2>
            <h2 className="border-l border-[#dfd0bf] px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#7c4435] sm:px-8">What we do not do</h2>
          </div>
          {rows.map(([does, doesNot]) => (
            <div key={does} className="grid grid-cols-2 border-b border-[#eadfd2] last:border-b-0">
              <div className="flex gap-3 px-5 py-6 text-sm leading-6 text-[#4f4942] sm:px-8">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#6b8576]" />
                <p>{does}</p>
              </div>
              <div className="flex gap-3 border-l border-[#eadfd2] px-5 py-6 text-sm leading-6 text-[#4f4942] sm:px-8">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[#a45f49]" />
                <p>{doesNot}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-[#dfd0bf] bg-[#f3eadf] p-8 text-center sm:p-10">
          <p className="font-display text-2xl text-espresso">The simple test: can your team verify every claimed recovery?</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-mist">
            The owner brief ties each result to its inquiry source, staff-approved conversation, booking status, and deposit status. Illustrative materials are labeled until named pilot evidence is available.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/proof" className="btn-ghost btn-md">See the illustrative brief</Link>
            <Link href="/pilot" className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all btn-md inline-flex items-center gap-2">
              Get Your Free Audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
