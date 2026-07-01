'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { playHaptic } from '../lib/audio';
import { Activity, ShieldAlert, CheckCircle } from 'lucide-react';

const AnimatedNumber = ({ value }: { value: number }) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString('en-US'));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

export default function RevenueBridge() {
  const [traffic, setTraffic] = useState(3000);
  const [rate, setRate] = useState(2.5);
  const [ticket, setTicket] = useState(1200);
  const [leakage, setLeakage] = useState(498960);

  useEffect(() => {
    // Preserved formula
    const leakageValue = (traffic * ((8 - rate) / 100) * 0.6) * ticket * 4.2;
    setLeakage(Math.round(leakageValue));
  }, [traffic, rate, ticket]);

  // Recovery Tiers (projected monthly recovery)
  const monthlyLeakage = leakage / 12;
  const lowRecovered = Math.round(monthlyLeakage * 0.15);
  const expectedRecovered = Math.round(monthlyLeakage * 0.30);
  const highRecovered = Math.round(monthlyLeakage * 0.50);

  // Estimates are benchmarked against the Recovery tier monthly fee ($2,000) — see DESIGN_SYSTEM.md §7
  const lowROI = lowRecovered / 2000;
  const expectedROI = expectedRecovered / 2000;
  const highROI = highRecovered / 2000;

  const lowBreakEven = Math.max(1, Math.min(14, Math.round(14 / (lowROI || 1))));
  const expectedBreakEven = Math.max(1, Math.min(14, Math.round(14 / (expectedROI || 1))));
  const highBreakEven = Math.max(1, Math.min(14, Math.round(14 / (highROI || 1))));

  return (
    <section id="audit" className="relative py-24 w-full max-w-6xl mx-auto px-6 font-sans bg-[#FBFBFA]">
      <div className="text-center mb-16">
        <span className="text-[#6B8576] font-mono tracking-[0.2em] text-xs font-semibold uppercase mb-4 block">
          FINANCIAL LEAKAGE DIAGNOSTIC
        </span>
        <h2 className="text-4xl md:text-5xl font-display text-[#1A1A1A] mb-6">
          Quantify Your Clinic's Revenue Leak
        </h2>
        <p className="text-lg text-[#6E6E6C] max-w-2xl mx-auto leading-relaxed">
          Drag the sliders to match your current clinic metrics and see how much high-ticket demand is slip-streaming into competitor calendars.
        </p>
      </div>

      <div className="glass-card overflow-hidden bg-[#F7F5F0] border border-[#E5E3DF] rounded-3xl shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E3DF]">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-white/40">
            <h3 className="text-lg font-semibold mb-10 text-gray-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#6B8576]" />
              Medspa Operational Inputs
            </h3>
            
            <div className="space-y-10">
              <div className="group">
                <div className="flex justify-between text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider">
                  <span>Monthly Traffic</span>
                  <span className="text-[#6B8576] font-bold text-sm">{traffic.toLocaleString()} visitors</span>
                </div>
                <input 
                  type="range" 
                  className="luxury-slider w-full accent-[#6B8576]" 
                  min="500" 
                  max="50000" 
                  step="100" 
                  value={traffic}
                  onChange={(e) => { setTraffic(Number(e.target.value)); playHaptic('hover'); }}
                  aria-label="Monthly Website Traffic"
                />
              </div>

              <div className="group">
                <div className="flex justify-between text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider">
                  <span>Booking Conversion Rate</span>
                  <span className="text-[#6B8576] font-bold text-sm">{rate.toFixed(1)}%</span>
                </div>
                <input 
                  type="range" 
                  className="luxury-slider w-full accent-[#6B8576]" 
                  min="0.5" 
                  max="8" 
                  step="0.1" 
                  value={rate}
                  onChange={(e) => { setRate(Number(e.target.value)); playHaptic('hover'); }}
                  aria-label="Booking Rate"
                />
              </div>

              <div className="group">
                <div className="flex justify-between text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider">
                  <span>Average Treatment Ticket</span>
                  <span className="text-[#6B8576] font-bold text-sm">${ticket.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  className="luxury-slider w-full accent-[#6B8576]" 
                  min="200" 
                  max="5000" 
                  step="50" 
                  value={ticket}
                  onChange={(e) => { setTicket(Number(e.target.value)); playHaptic('hover'); }}
                  aria-label="Average Ticket Value"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 md:p-12 bg-white/10">
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#F5F2EB] border border-[#6B1D2F]/20 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#6B1D2F]" />
                <span className="flex items-center gap-1.5 text-[#6B1D2F] font-mono tracking-widest text-[9px] font-semibold mb-2">
                  <ShieldAlert className="w-3.5 h-3.5" /> EST. REVENUE LEAKAGE (ANNUAL)
                </span>
                <span className="block text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-2 tracking-tight">
                  $<AnimatedNumber value={leakage} />
                </span>
                <span className="text-[11px] text-[#6E6E6C] font-mono">Based on 8% target booking baseline</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#6B8576]/5 border border-[#6B8576]/20 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#6B8576]" />
                <span className="flex items-center gap-1.5 text-[#6B8576] font-mono tracking-widest text-[9px] font-semibold mb-4">
                  <CheckCircle className="w-3.5 h-3.5" /> PROJECTED 30-DAY RECOVERY TIER
                </span>
                
                <div className="space-y-4">
                  {/* Low Tier */}
                  <div className="flex justify-between items-center pb-2 border-b border-black/[0.03]">
                    <div>
                      <div className="text-[10px] font-bold text-gray-700">Low Estimate (15%)</div>
                      <div className="text-[9px] text-[#6E6E6C] font-mono">Break-Even: Day {lowBreakEven}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">${lowRecovered.toLocaleString()}</div>
                      <div className="text-[9px] text-[#6B8576] font-mono font-bold">est. {lowROI.toFixed(1)}x ROI</div>
                    </div>
                  </div>

                  {/* Expected Tier */}
                  <div className="flex justify-between items-center pb-2 border-b border-black/[0.03]">
                    <div>
                      <div className="text-[10px] font-bold text-gray-700">Expected (30%)</div>
                      <div className="text-[9px] text-[#6E6E6C] font-mono">Break-Even: Day {expectedBreakEven}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-[#6B8576]">${expectedRecovered.toLocaleString()}</div>
                      <div className="text-[9px] text-[#6B8576] font-mono font-bold">est. {expectedROI.toFixed(1)}x ROI</div>
                    </div>
                  </div>

                  {/* High Tier */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-bold text-gray-700">High Estimate (50%)</div>
                      <div className="text-[9px] text-[#6E6E6C] font-mono">Break-Even: Day {highBreakEven}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">${highRecovered.toLocaleString()}</div>
                      <div className="text-[9px] text-[#6B8576] font-mono font-bold">est. {highROI.toFixed(1)}x ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING PRODUCT OUTCOME BRIEF CARD */}
            <motion.div 
              key={expectedRecovered}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-6 p-5 rounded-2xl bg-white border-l-[3px] border-[#6B8576] border-y border-r border-[#E5E3DF] font-mono text-[9px] space-y-2.5 shadow-md relative"
            >
              <div className="text-gray-800 font-bold uppercase tracking-wider mb-1.5">
                Pilot Engagement Terms
              </div>
              <div className="text-gray-600 leading-normal">
                Figures above are an estimated opportunity range — they require manual verification against your own records and are not a promise of results. The mid-range estimate of <span className="font-bold text-[#1A1A1A]">${expectedRecovered.toLocaleString()}</span> (an estimated <span className="font-bold text-[#6B8576]">{expectedROI.toFixed(1)}x</span> vs. the Recovery tier fee) is illustrative. The 14-day pilot is $0 if missed-demand recovery isn&apos;t demonstrated in your written Day-14 report.
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
