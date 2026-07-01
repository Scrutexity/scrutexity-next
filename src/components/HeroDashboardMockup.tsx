'use client';

import React from 'react';
import { Shield, CheckCircle2, ArrowRightLeft, FileCheck } from 'lucide-react';

export default function HeroDashboardMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-[1.75rem] border border-[#e1d4c5] bg-[#fffaf2] shadow-[0_28px_90px_rgba(85,62,41,0.10)] select-none overflow-hidden md:h-[600px] flex flex-col justify-between backdrop-blur-sm">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: -20; } }
        .animate-flow { stroke-dasharray: 6, 4; animation: dash 1.8s linear infinite; }
        .animate-flow-rev { stroke-dasharray: 6, 4; animation: dash 1.8s linear infinite reverse; }
        @media (prefers-reduced-motion: reduce) {
          .animate-flow, .animate-flow-rev { animation: none; stroke-dasharray: none; }
        }
      `}</style>

      {/* Header bar */}
      <div className="border-b border-[#e1d4c5] px-5 py-2.5 flex items-center justify-between bg-[#fffaf2]/90">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#b9825f] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#9b6a51]">Consult Recovery Pipeline</span>
        </div>
        <span className="font-mono text-[10px] text-[#c4b4a0]">Boulevard → Mangomint → Ledger</span>
      </div>

      {/* Main grid */}
      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-10 p-4 md:p-5 gap-4 items-stretch bg-[#fffaf2]">

        {/* Responsive SVG flow lines */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 30% 38% Q 38% 38% 38% 44%" fill="none" stroke="#d8b17a" strokeWidth="1.5" className="animate-flow" />
            <path d="M 30% 54% Q 38% 54% 38% 52%" fill="none" stroke="#d8b17a" strokeWidth="1.5" className="animate-flow" />
            <path d="M 70% 38% Q 62% 38% 62% 44%" fill="none" stroke="#d8b17a" strokeWidth="1.5" className="animate-flow-rev" />
            <path d="M 70% 54% Q 62% 54% 62% 52%" fill="none" stroke="#d8b17a" strokeWidth="1.5" className="animate-flow-rev" />
          </svg>
        </div>

        {/* LEFT: Boulevard */}
        <div className="md:col-span-3 flex flex-col justify-between rounded-xl border border-[#e1d4c5] bg-white/70 p-4 z-10 shadow-[0_2px_12px_rgba(85,62,41,0.05)]">
          <div>
            <div className="flex items-center justify-between border-b border-[#e1d4c5] pb-2.5 mb-4">
              <h3 className="font-display text-base tracking-tight text-[#221f1b]">Boulevard · NYC Flatiron</h3>
              <span className="rounded-full bg-[#f3eadf] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-[#9b6a51]">Source A</span>
            </div>
            <div className="space-y-2">
              {[
                { time: '10:15 AM', initial: 'J.K.', treatment: 'Morpheus8 Consult' },
                { time: '11:45 AM', initial: 'A.L.', treatment: 'Morpheus8 Consult' },
                { time: '02:30 PM', initial: 'M.R.', treatment: 'Morpheus8 Consult' },
              ].map((entry, idx) => (
                <div key={idx} className="rounded-lg border border-[#f0c8b8]/60 bg-[#fdf6f2] p-2.5">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-[11px] font-medium text-[#221f1b]">{entry.time}</span>
                    <span className="rounded-full bg-[#8C4343]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8C4343]">MISSED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[11px] text-[#6b6259]">Patient: {entry.initial}</span>
                    <span className="text-[11px] text-[#9b9085] truncate max-w-[100px]">{entry.treatment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#e1d4c5] flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b9825f] animate-pulse flex-shrink-0" />
            <span className="text-[10px] font-semibold text-[#b9825f]">Unreconciled demand detected</span>
          </div>
        </div>

        {/* CENTER: Scrutexity */}
        <div className="md:col-span-4 flex flex-col justify-between rounded-xl border border-[#d8c4ae] bg-[#fffaf2] p-5 z-20 relative shadow-[0_8px_32px_rgba(185,130,95,0.12)]">
          <div className="absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_at_50%_0%,rgba(185,130,95,0.07),transparent_60%)] pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 border-b-2 border-[#b9825f]/30 pb-3 mb-4">
              <Shield className="w-4 h-4 text-[#b9825f]" />
              <h3 className="font-display text-lg tracking-tight text-[#221f1b]">Scrutexity Layer</h3>
              <span className="ml-auto flex items-center gap-1 rounded-full bg-[#7f8f78]/10 border border-[#7f8f78]/25 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#7f8f78]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7f8f78] animate-pulse inline-block" />
                VERIFIED
              </span>
            </div>
            <div className="rounded-xl border border-[#e1d4c5] bg-white/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#9b6a51] font-semibold mb-3">Matched Record</p>
              <div className="space-y-2 font-mono text-[11px]">
                {[
                  { key: 'PATIENT', val: 'J. Kennedy', color: '#221f1b' },
                  { key: 'SOURCE', val: 'Boulevard / Mangomint', color: '#b9825f' },
                  { key: 'INTENT', val: 'Morpheus8 Consult', color: '#221f1b' },
                  { key: 'STATUS', val: 'NP Assigned', color: '#7f8f78' },
                  { key: 'ESCALATION', val: 'Clinically Routed', color: '#7f8f78' },
                ].map(({ key, val, color }) => (
                  <div key={key} className="flex justify-between py-1 border-b border-[#e1d4c5]/60 last:border-0">
                    <span className="text-[#9b9085]">{key}</span>
                    <span style={{ color }} className="font-medium flex items-center gap-1">
                      {key === 'STATUS' && <FileCheck className="w-3 h-3" />}
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Warm terracotta resolution bar — replaces dark charcoal */}
          <div className="relative mt-4 rounded-lg border border-[#d8b17a]/40 bg-[#f3eadf] px-4 py-2.5 flex items-center gap-2">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#b9825f] flex-shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#9b6a51] font-semibold">Lead Matched Across EMRs</span>
          </div>
        </div>

        {/* RIGHT: Mangomint */}
        <div className="md:col-span-3 flex flex-col justify-between rounded-xl border border-[#e1d4c5] bg-white/70 p-4 z-10 shadow-[0_2px_12px_rgba(85,62,41,0.05)]">
          <div>
            <div className="flex items-center justify-between border-b border-[#e1d4c5] pb-2.5 mb-4">
              <h3 className="font-display text-base tracking-tight text-[#221f1b]">Mangomint · NYC SoHo</h3>
              <span className="rounded-full bg-[#f3eadf] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-[#9b6a51]">Source B</span>
            </div>
            <div className="space-y-2">
              <div className="rounded-lg border border-[#7f8f78]/30 bg-[#f4f7f4] p-2.5">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-[11px] font-medium text-[#221f1b]">10:22 AM</span>
                  <span className="rounded-full bg-[#7f8f78]/12 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#7f8f78]">ROUTED ✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[11px] text-[#6b6259]">Patient: J.K.</span>
                  <span className="text-[11px] text-[#7f8f78] font-semibold">Matched ✓</span>
                </div>
              </div>
              <div className="rounded-lg border border-[#f0c8b8]/60 bg-[#fdf6f2] p-2.5 opacity-55">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-[11px] font-medium text-[#221f1b]">04:10 PM</span>
                  <span className="rounded-full bg-[#8C4343]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8C4343]">MISSED</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[11px] text-[#6b6259]">Patient: S.M.</span>
                  <span className="text-[11px] text-[#9b9085] truncate max-w-[100px]">Botox Follow-up</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#e1d4c5] flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7f8f78] flex-shrink-0" />
            <span className="text-[10px] font-semibold text-[#7f8f78]">Matching active</span>
          </div>
        </div>
      </div>

      {/* Audit trail footer — warm */}
      <div className="border-t border-[#e1d4c5] bg-[#f7f2ea] px-5 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-[#221f1b]">
            <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#b9825f]" /> Consult Trail
            </span>
            <span className="text-[#c4b4a0]">·</span>
            <span className="text-[#221f1b]/70">3 consults matched</span>
            <span className="text-[#c4b4a0]">·</span>
            <span className="text-[#7f8f78]">1 routed to NP</span>
            <span className="text-[#c4b4a0]">·</span>
            <span className="text-[#b9825f]">2 flagged for recovery</span>
          </div>
          <div className="font-mono text-[10px] text-[#c4b4a0]">
            Demo — not a live deployment
          </div>
        </div>
        <p className="mt-2 text-[10px] text-[#c4b4a0] leading-relaxed">
          Operational verification only. Not legal or medical advice. Multi-EMR comparison subject to individual practice setup.
        </p>
      </div>
    </div>
  );
}
