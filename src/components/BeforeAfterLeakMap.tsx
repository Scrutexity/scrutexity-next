'use client';

import { ArrowRight, Clock, TrendingDown, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Reveal } from './Reveal';

const comparisons = [
  {
    metric: 'After-Hours Response Time',
    baseline: '6.2 hours',
    systemState: '42 seconds',
    icon: Clock,
    impact: '530x faster',
    impactColor: 'text-[#7f8f78]',
  },
  {
    metric: 'Lead Drop-Off Rate',
    baseline: '40% (booked elsewhere)',
    systemState: '4% (clinical escalation only)',
    icon: TrendingDown,
    impact: '36pp reduction',
    impactColor: 'text-[#7f8f78]',
  },
  {
    metric: 'Deposit Capture Rate',
    baseline: '0% (no after-hours deposits)',
    systemState: '100% of booked consults',
    icon: ShieldCheck,
    impact: '$150/consult captured',
    impactColor: 'text-clay',
  },
  {
    metric: 'Front Desk Manual Chase Work',
    baseline: '~15 DMs/manual follow-ups/day',
    systemState: '~3/day (clinical escalations only)',
    icon: Zap,
    impact: '80% reduction',
    impactColor: 'text-[#7f8f78]',
  },
];

export default function BeforeAfterLeakMap() {
  return (
    <div className="rounded-[1.75rem] border-2 border-clay/20 bg-cream overflow-hidden">
      {/* Header */}
      <div className="bg-[#f3eadf] px-6 py-4 border-b border-sand-deep">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-clay-deep">
          Before → After: The Operational Delta
        </p>
        <p className="text-[12px] text-mist mt-1">
          Owners don&apos;t care about the AI. They care about closing the gap between 6.2 hours and 42 seconds.
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-sand-deep text-[11px] font-semibold uppercase tracking-[0.12em] text-clay-deep">
              <th className="p-5">Operational Metric</th>
              <th className="p-5">Baseline (Before)</th>
              <th className="p-5">System State (After)</th>
              <th className="p-5">Delta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1d4c5]">
            {comparisons.map((row, i) => {
              const Icon = row.icon;
              return (
                <tr key={i} className="hover:bg-[#f3eadf]/20 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay/8">
                        <Icon className="h-4.5 w-4.5 text-clay" />
                      </div>
                      <span className="text-sm font-semibold text-espresso">{row.metric}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-sm text-[#9e8e7e] line-through decoration-[#d9c9b4]">{row.baseline}</span>
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-bold text-espresso">{row.systemState}</span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-[#7f8f78]" />
                      <span className={`text-sm font-bold ${row.impactColor}`}>{row.impact}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-[#e1d4c5]">
        {comparisons.map((row, i) => {
          const Icon = row.icon;
          return (
            <div key={i} className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay/8">
                  <Icon className="h-4.5 w-4.5 text-clay" />
                </div>
                <span className="text-sm font-semibold text-espresso">{row.metric}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-[#f3eadf]/50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9e8e7e] mb-1">Before</p>
                  <p className="text-[13px] text-[#9e8e7e] line-through">{row.baseline}</p>
                </div>
                <div className="rounded-xl bg-[#7f8f78]/5 p-3 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-[#7f8f78]" />
                </div>
                <div className="rounded-xl bg-[#f3eadf]/50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9e8e7e] mb-1">After</p>
                  <p className="text-[13px] font-bold text-espresso">{row.systemState}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-[#7f8f78]" />
                <span className={`text-[13px] font-bold ${row.impactColor}`}>{row.impact}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div className="bg-[#f3eadf]/40 px-6 py-3 border-t border-sand-deep text-center">
        <p className="text-[11px] text-mist">
          Data from 30-day pilot audit. Clinic name withheld for privacy. Individual results vary. Verification hash available under NDA.
        </p>
      </div>
    </div>
  );
}
