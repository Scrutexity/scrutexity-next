'use client';

import { ArrowRight } from 'lucide-react';
import { GlassCard, Kicker, Reveal } from './motion-kit';

const POSTS = [
  {
    category: 'Claim Drift',
    date: 'Jul 2026',
    title: 'When marketing language outruns the evidence',
    desc: 'How a single unsupported phrase compounds into real exposure — and how to catch it early.',
    href: '/insights',
  },
  {
    category: 'AI Narratives',
    date: 'Jun 2026',
    title: 'What AI answer systems are saying about your claims',
    desc: 'LLM answers are now a public evidence surface. Here is how we read them as data.',
    href: '/ai-narrative-integrity',
  },
  {
    category: 'Reviews',
    date: 'May 2026',
    title: 'Anatomy of an Exhibit A finding',
    desc: 'Inside a Claim Support Review: claim, gap, safer wording, source links.',
    href: '/methodology',
  },
];

export function MakroBlog() {
  return (
    <section className="border-t border-white/[0.07] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>Insights</Kicker>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#ebedfa] sm:text-5xl">
                Latest insights.
              </h2>
            </div>
            <a
              href="/insights"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#d9ff5c] transition-colors hover:text-[#e4ff85]"
            >
              View all articles
              <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <a href={p.href} className="block h-full">
                <GlassCard className="flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[#d9ff5c]/15 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide text-[#d9ff5c]">
                      {p.category}
                    </span>
                    <span className="text-[11.5px] text-[#9391b8]">{p.date}</span>
                  </div>
                  <h3 className="mt-4 text-[16.5px] font-semibold leading-snug text-[#ebedfa]">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#9391b8]">
                    {p.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#d9ff5c]">
                    Read article
                    <ArrowRight size={13} />
                  </span>
                </GlassCard>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
