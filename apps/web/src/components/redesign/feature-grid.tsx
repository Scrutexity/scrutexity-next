import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanSearch, Radar, Activity, Check, ArrowRight, Settings } from 'lucide-react';
import { CTAButton, GlassCard, Kicker, Reveal } from './motion-kit';

const TAB_FEATURES = [
  {
    id: 'visibility',
    title: 'Visibility',
    subtitle: 'See all public claims, source pages, and evidence gaps in one unified view.',
    metrics: [
      { label: 'Reviewed claims', val: '142' },
      { label: 'Verified support', val: '94.2%' },
    ],
  },
  {
    id: 'forecasting',
    title: 'Forecasting',
    subtitle: 'Know your exposure risk and predict regulatory gaps before they hit.',
    metrics: [
      { label: 'Drift velocity', val: '-18%' },
      { label: 'Risk score', val: 'Low' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    subtitle: 'Claim snapshots, receipts, and hash verification handled without manual work.',
    metrics: [
      { label: 'Auto-scans', val: '24/7' },
      { label: 'Hash locks', val: 'Active' },
    ],
  },
];

export function MakroFeatureTabs({ isLight = true }: { isLight?: boolean }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section id="features" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <Kicker>Feature Overview</Kicker>
          <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-5xl ${
            isLight ? 'text-[#14142d]' : 'text-[#ebedfa]'
          }`}>
            Master your claim evidence.
          </h2>
        </Reveal>

        {/* 2-Column Layout matching screenshot */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Interactive Vertical Tabs */}
          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-6">
              {TAB_FEATURES.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className="group relative flex w-full text-left transition-all duration-300"
                  >
                    {/* Active Lime Bar Indicator */}
                    <div
                      className={`mr-4 w-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-[#d9ff5c] shadow-[0_0_12px_rgba(217,255,92,0.8)]'
                          : 'bg-transparent group-hover:bg-white/20'
                      }`}
                    />

                    <div className="flex-1">
                      <h3
                        className={`text-xl font-bold transition-colors ${
                          isActive
                            ? isLight
                              ? 'text-[#14142d]'
                              : 'text-white'
                            : isLight
                            ? 'text-[#5a6072] group-hover:text-[#14142d]'
                            : 'text-[#9391b8] group-hover:text-[#ebedfa]'
                        }`}
                      >
                        {tab.title}
                      </h3>
                      {isActive && (
                        <p
                          className={`mt-2 text-sm leading-relaxed ${
                            isLight ? 'text-[#5a6072]' : 'text-[#9391b8]'
                          }`}
                        >
                          {tab.subtitle}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4">
              <CTAButton href="/snapshot" variant="lime" className="px-6 py-3 text-sm">
                Get started
              </CTAButton>
            </div>
          </div>

          {/* Right Column: Live Interactive Dashboard Frame matching screenshot */}
          <div className="lg:col-span-7">
            <GlassCard isLight={isLight} hover={false} className="relative overflow-hidden p-6 sm:p-8">
              {/* Outer frame gradient overlay */}
              <div className="rounded-2xl border border-black/10 bg-[#f8fafc] p-6 shadow-2xl dark:border-white/10 dark:bg-[#1a1a2e]">
                {/* Header bar inside frame */}
                <div className="flex items-center justify-between border-b border-black/5 pb-4 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#d9ff5c] shadow-[0_0_8px_rgba(217,255,92,0.8)]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#14142d] dark:text-white">
                      Claim Audit Pipeline
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold text-[#5a6072] shadow-xs dark:border-white/10 dark:bg-white/10 dark:text-white">
                    Live Scan
                  </div>
                </div>

                {/* Main Bar Chart Graphic */}
                <div className="mt-6 rounded-xl border border-black/5 bg-white p-5 shadow-xs dark:border-white/5 dark:bg-[#24243e]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#5a6072] dark:text-[#9391b8]">
                      Evidence support rate over time
                    </span>
                    <span className="rounded-full bg-[#d9ff5c] px-2.5 py-0.5 text-[10px] font-bold text-[#14142d]">
                      94.2% verified
                    </span>
                  </div>

                  {/* Animated Bar Chart */}
                  <div className="mt-8 flex h-32 items-end justify-between gap-2 px-2">
                    {[35, 45, 30, 50, 65, 80, 55, 70, 90, 85, 95, 100].map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                        <div
                          style={{ height: `${h}%` }}
                          className={`w-full rounded-t-sm transition-all duration-500 ${
                            i === 11 || i === 8
                              ? 'bg-[#d9ff5c] shadow-[0_0_10px_rgba(217,255,92,0.5)]'
                              : 'bg-[#5a6072]/30 dark:bg-white/20'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric Cards */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-black/5 bg-white p-4 shadow-xs dark:border-white/5 dark:bg-[#24243e]">
                    <span className="text-[11px] font-medium text-[#5a6072] dark:text-[#9391b8]">
                      Public Claims Audited
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#14142d] dark:text-white">
                        142
                      </span>
                      <span className="text-[10px] font-bold text-[#5E7A5A]">
                        +18% verified
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-black/5 bg-white p-4 shadow-xs dark:border-white/5 dark:bg-[#24243e]">
                    <span className="text-[11px] font-medium text-[#5a6072] dark:text-[#9391b8]">
                      Evidence Gaps Sealed
                    </span>
                    <div className="mt-1 text-xl font-bold text-[#14142d] dark:text-white">
                      32 / 32
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Daily AI Insights Card matching Screenshot 1 */}
        <div className="mt-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#475569] via-[#64748b] to-[#f4f6fa] p-8 text-center text-white shadow-xl sm:p-12">
              <div className="mx-auto flex max-w-[550px] flex-col items-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
                  <Settings size={14} /> Claim Intelligence
                </span>
                <h3 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl text-white">
                  Daily Claim & AI Signals
                </h3>
                <p className="mt-3 text-sm text-white/90">
                  Get an automated summary of public claim modifications, evidence drops, and AI narrative shifts.
                </p>

                {/* Curved icon arc from screenshot with Scrutexity claim audit icons */}
                <div className="mt-10 flex items-center justify-center gap-6">
                  {[
                    { icon: '🔍', label: 'Public Scan' },
                    { icon: '📜', label: 'Audit Record' },
                    { icon: '🛡️', label: 'Hash Lock' },
                    { icon: '⚖️', label: 'Institutional' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      title={item.label}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-[#14142d] shadow-lg transition-transform hover:scale-110"
                    >
                      {item.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
