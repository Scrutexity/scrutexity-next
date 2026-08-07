'use client';

import { ScanSearch, Radar, Activity, CalendarClock } from 'lucide-react';
import { GlassCard, Kicker, Reveal } from './motion-kit';

const FEATURES = [
  {
    icon: ScanSearch,
    name: 'Claim Exposure Diagnostic',
    desc: 'A focused, dated review of whether a company\u2019s public claims survive contact with its visible evidence.',
  },
  {
    icon: Radar,
    name: 'Evidence Gap Detection',
    desc: 'Every claim scored against what the source actually shows — with the gap named, not papered over.',
  },
  {
    icon: Activity,
    name: 'Claim Drift Signals',
    desc: 'Signals when marketing language starts moving away from what the evidence supports.',
  },
  {
    icon: CalendarClock,
    name: 'Progress Over Time',
    desc: 'Recurring records that show whether claims tighten, drift, or stay put — watch the trend.',
  },
];

export function MakroFeatureTabs() {
  return (
    <section id="features" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="max-w-[640px]">
            <Kicker>Features</Kicker>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#ebedfa] sm:text-5xl">
              The claim evidence workflow, end to end.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.07} className="h-full">
              <GlassCard className="flex h-full flex-col p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9ff5c]/15 text-[#d9ff5c]">
                  <f.icon size={19} />
                </span>
                <h3 className="mt-5 text-[15px] font-semibold text-[#ebedfa]">
                  {f.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#9391b8]">
                  {f.desc}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
