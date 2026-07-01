'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Activity, Terminal, CheckCircle2 } from 'lucide-react';
import { FadeIn } from './Interactions';
import { playHaptic } from '../lib/audio';
import { useStore } from '../lib/store';

const AnimatedNumber = ({ value }: { value: number }) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString('en-US'));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

const Calculator = () => {
  const [traffic, setTraffic] = useState(2129);
  const [rate, setRate] = useState(2.7);
  const [ticket, setTicket] = useState(262);
  const [leakage, setLeakage] = useState(74500);
  const [recoverable, setRecoverable] = useState(52150);

  const setCalculatorIntensity = useStore((state) => state.setCalculatorIntensity);

  useEffect(() => {
    const leakageValue = (traffic * ((8 - rate) / 100) * 0.6) * ticket * 4.2;
    setLeakage(Math.round(leakageValue));
    setRecoverable(Math.round(leakageValue * 0.7));
    setCalculatorIntensity((traffic / 50000) * 100);
  }, [traffic, rate, ticket, setCalculatorIntensity]);

  return (
    <section id="calculator" className="reveal-section py-32 bg-transparent relative overflow-hidden border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <FadeIn className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-terracotta font-sans tracking-[0.2em] text-sm font-semibold uppercase mb-4 flex items-center justify-center"><Activity size={18} className="inline mr-2 -mt-1"/>LEAK INDEX CALCULATOR</span>
          <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-6 text-white">Calculate Revenue Leakage</h2>
          <p className="text-white/60 text-xl font-sans">Enter your metrics below to expose exactly how much unhandled friction is burning your MRR.</p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <FadeIn className="lg:col-span-7 p-8 md:p-12 relative overflow-hidden bg-charcoal/[0.02] backdrop-blur-xl border border-charcoal/10 rounded-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-charcoal/5 blur-[50px] rounded-full" />
            <h3 className="text-2xl font-bold font-display mb-10 flex items-center gap-3 text-white">
              <Terminal size={24} className="text-terracotta" /> Clinic Pipeline Inputs
            </h3>
            
            <div className="space-y-12">
              <div className="group">
                <label className="flex justify-between text-sm font-semibold text-white/80/90 mb-6 font-sans">
                  <span>MONTHLY TRAFFIC</span>
                  <span className="text-terracotta">{traffic.toLocaleString()}</span>
                </label>
                <input 
                  type="range" className="luxury-slider w-full accent-terracotta h-1.5 bg-charcoal/10 rounded-full appearance-none cursor-pointer hover:bg-charcoal/20 transition-colors" min="500" max="50000" step="1" value={traffic}
                  onChange={(e) => { setTraffic(Number(e.target.value)); playHaptic('hover'); }}
                  aria-label="Monthly Website Traffic"
                />
              </div>

              <div className="group">
                <label className="flex justify-between text-sm font-semibold text-white/80/90 mb-6 font-sans">
                  <span>BOOKING RATE (%)</span>
                  <span className="text-terracotta">{rate.toFixed(1)}%</span>
                </label>
                <input 
                  type="range" className="luxury-slider w-full accent-terracotta h-1.5 bg-charcoal/10 rounded-full appearance-none cursor-pointer hover:bg-charcoal/20 transition-colors" min="0.5" max="8" step="0.1" value={rate}
                  onChange={(e) => { setRate(Number(e.target.value)); playHaptic('hover'); }}
                  aria-label="Current Booking Rate"
                />
              </div>

              <div className="group">
                <label className="flex justify-between text-sm font-semibold text-white/80/90 mb-6 font-sans">
                  <span>AVG TICKET VALUE ($)</span>
                  <span className="text-terracotta">${ticket.toLocaleString()}</span>
                </label>
                <input 
                  type="range" className="luxury-slider w-full accent-terracotta h-1.5 bg-charcoal/10 rounded-full appearance-none cursor-pointer hover:bg-charcoal/20 transition-colors" min="200" max="5000" step="1" value={ticket}
                  onChange={(e) => { setTicket(Number(e.target.value)); playHaptic('hover'); }}
                  aria-label="Average Ticket Value"
                />
              </div>
            </div>
          </FadeIn>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <FadeIn delay={0.2} className="p-8 md:p-10 border border-red-500/20 bg-red-950/20 backdrop-blur-xl relative overflow-hidden group rounded-2xl">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
              <span className="flex items-center gap-2 text-red-400 font-sans tracking-widest text-xs font-bold mb-3"><Activity size={14}/> EST. MONTHLY LEAKAGE</span>
              <span className="block text-5xl lg:text-6xl font-display font-extrabold text-white mb-3 tracking-tighter">
                $<AnimatedNumber value={leakage} />
              </span>
              <span className="text-sm text-white/50 font-sans">Lost to pipeline friction & decay</span>
            </FadeIn>

            <FadeIn delay={0.3} className="p-8 md:p-10 border border-terracotta/40 bg-terracotta/10 backdrop-blur-xl relative overflow-hidden shadow-[0_0_40px_rgba(184,124,110,0.1)] rounded-2xl">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-terracotta shadow-[0_0_15px_rgba(184,124,110,1)]" />
              <span className="flex items-center gap-2 text-terracotta font-sans tracking-widest text-xs font-bold mb-3"><CheckCircle2 size={14}/> RECOVERABLE VIA PILOT</span>
              <span className="block text-5xl lg:text-6xl font-display font-extrabold text-terracotta mb-3 tracking-tighter drop-shadow-[0_0_15px_rgba(184,124,110,0.3)]">
                $<AnimatedNumber value={recoverable} />
              </span>
              <span className="text-sm text-white/60 font-sans">70% recovery rate // 14-day install</span>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
