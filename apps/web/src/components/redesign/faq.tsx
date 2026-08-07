'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Kicker, Reveal } from './motion-kit';

type FaqTab = 'General' | 'Reviews' | 'Watch' | 'Security';

const TABS: FaqTab[] = ['General', 'Reviews', 'Watch', 'Security'];

const FAQS: Record<FaqTab, { q: string; a: string }[]> = {
  General: [
    {
      q: 'What does Scrutexity actually do?',
      a: 'We document the gap between what a company claims publicly, what its visible evidence supports, and what AI systems say about it — as a dated, source-linked record.',
    },
    {
      q: 'Is this legal advice?',
      a: 'No. Scrutexity is not a law firm and does not provide legal advice. Records document public claims and visible evidence; consult counsel for legal conclusions.',
    },
    {
      q: 'Where does the evidence come from?',
      a: 'Public sources: the company\u2019s own pages, filings, clinical studies, press, and AI answer systems. Every finding links to the source and is SHA-256 sealed.',
    },
  ],
  Reviews: [
    {
      q: 'What is a Claim Support Review?',
      a: 'A $99 deep dive on one finding: the claim, the evidence gap, safer wording, and a source-linked reference — delivered as a shareable Exhibit A.',
    },
    {
      q: 'How long does a review take?',
      a: 'Typically 2–5 business days from payment. Rush delivery is available on enterprise plans.',
    },
  ],
  Watch: [
    {
      q: 'What does Watch monitor?',
      a: 'Claim drift, evidence changes, new public statements, and AI narrative shifts — on a recurring schedule you set. Alerts land when something moves.',
    },
    {
      q: 'Can Watch cover my competitors?',
      a: 'Yes. Many teams watch their own claims for exposure and competitor pages for positioning intelligence.',
    },
  ],
  Security: [
    {
      q: 'How is my data handled?',
      a: 'Records are sealed with SHA-256 digests you can verify independently. We never mix client data into public samples, and access controls follow your plan tier.',
    },
  ],
};

export function MakroFaq() {
  const [tab, setTab] = useState<FaqTab>('General');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="border-t border-white/[0.07] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <div className="text-center">
            <Kicker>FAQ</Kicker>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#ebedfa] sm:text-5xl">
              We have the answers.
            </h2>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.06}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setOpenIdx(0);
                }}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                  tab === t
                    ? 'bg-[#d9ff5c] text-[#14142d]'
                    : 'border border-white/10 bg-white/[0.04] text-[#9391b8] hover:text-[#ebedfa]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Accordion */}
        <Reveal delay={0.1}>
          <div className="mt-8 space-y-3">
            {FAQS[tab].map((item, i) => {
              const open = openIdx === i;
              return (
                <div
                  key={item.q}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    open ? 'border-[#d9ff5c]/30 bg-white/[0.07]' : 'border-white/10 bg-white/[0.04]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="text-[14.5px] font-semibold text-[#ebedfa]">{item.q}</span>
                    <ChevronDown
                      size={17}
                      className={`shrink-0 text-[#9391b8] transition-transform duration-300 ${
                        open ? 'rotate-180 text-[#d9ff5c]' : ''
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-6 pb-5">
                      <p className="text-[13.5px] leading-relaxed text-[#9391b8]">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
