'use client';

import { CheckCircle2, FileSearch, MessageSquareText, Send } from 'lucide-react';

const steps = [
  {
    title: 'Inquiry received',
    detail: 'A prospective customer submits a question through the practice’s existing intake surface.',
    icon: MessageSquareText,
  },
  {
    title: 'Message reviewed',
    detail: 'The team checks the proposed response against its approved wording and visible support.',
    icon: FileSearch,
  },
  {
    title: 'Staff decision recorded',
    detail: 'An authorized team member accepts, edits, or rejects the proposed response.',
    icon: CheckCircle2,
  },
  {
    title: 'Approved response sent',
    detail: 'Only the wording accepted by the practice is returned to the prospective customer.',
    icon: Send,
  },
] as const;

export default function EvidenceChain() {
  return (
    <section id="evidence" className="relative z-10 border-t border-sand-deep/15 bg-cream py-32 md:py-40">
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-12 max-w-2xl">
          <span className="mb-5 block font-mono text-[11px] uppercase tracking-[0.18em] text-sage-deep">
            Review workflow
          </span>
          <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl lg:text-[3.75rem]">
            A human decision at every material step.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-[1.55] text-mist">
            This exhibit shows the intended review sequence. It does not represent a live customer, measured response time, or production system record.
          </p>
          <p className="mt-4 inline-block border border-sand-deep/30 bg-bone px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-mist">
            Sample workflow illustration · fictional data · not a live client record
          </p>
        </div>

        <ol className="grid border border-sand-deep/30 bg-sand-deep/30 sm:grid-cols-2">
          {steps.map(({ title, detail, icon: Icon }, index) => (
            <li key={title} className="bg-bone p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-sand-deep/25 pb-4">
                <Icon className="h-5 w-5 text-sage-deep" aria-hidden="true" />
                <span className="font-mono text-[10px] text-mist">0{index + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-2xl text-espresso">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-mist">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
