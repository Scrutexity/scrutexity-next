'use client';

import { Eye, TrendingUp, Wand2 } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { GlassCard, Kicker, Reveal } from './motion-kit';

const CLARITY_CARDS = [
  {
    icon: Eye,
    title: 'Visibility',
    desc: 'Every public claim and its evidence, in one dated record — no more guessing which source says what.',
  },
  {
    icon: TrendingUp,
    title: 'Forecasting',
    desc: 'Know where claim exposure is heading: drift trends, enforcement patterns, and AI answer shifts.',
  },
  {
    icon: Wand2,
    title: 'Automation',
    desc: 'Recurring watch runs itself. New claims, changed pages, and fresh AI answers get checked automatically.',
  },
];

export function MakroClarity({ isLight = true }: { isLight?: boolean }) {
  return (
    <section className={`transition-colors duration-500 px-5 py-24 sm:px-8 border-t ${
      isLight ? 'bg-[#f4f6fa] border-black/5 text-[#14142d]' : 'bg-[#14142d] border-white/10 text-[#ebedfa]'
    }`}>
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="max-w-[680px]">
            <Kicker isLight={isLight}>Built for clarity</Kicker>
            <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-5xl ${
              isLight ? 'text-[#14142d]' : 'text-[#ebedfa]'
            }`}>
              Claim evidence, finally simple.
            </h2>
            <p className={`mt-4 text-[15px] leading-relaxed ${
              isLight ? 'text-[#5a6072]' : 'text-[#9391b8]'
            }`}>
              Master your exposure — instead of your exposure mastering you.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CLARITY_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="h-full">
              <GlassCard isLight={isLight} className="flex h-full flex-col p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d9ff5c] text-[#14142d] font-bold shadow-xs">
                  <c.icon size={20} />
                </span>
                <h3 className={`mt-5 text-lg font-semibold ${isLight ? 'text-[#14142d]' : 'text-[#ebedfa]'}`}>{c.title}</h3>
                <p className={`mt-2 flex-1 text-[13.5px] leading-relaxed ${isLight ? 'text-[#5a6072]' : 'text-[#9391b8]'}`}>
                  {c.desc}
                </p>
                <a
                  href="/snapshot"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#14142d] underline transition-colors hover:text-[#5E7A5A]"
                >
                  Get started
                  <ArrowRight size={14} />
                </a>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
