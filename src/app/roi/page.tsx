"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Download, AlertCircle, TrendingUp } from "lucide-react";

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => 
    `${prefix}${Math.round(current).toLocaleString("en-US")}${suffix}`
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  formatValue?: (val: number) => string;
  onChange: (val: number) => void;
}

const PremiumSlider = ({ label, value, min, max, step = 1, formatValue, onChange }: SliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-8 group">
      <div className="flex justify-between items-end mb-3">
        <label className="text-xs uppercase tracking-widest font-bold text-[#221F1B]/70">
          {label}
        </label>
        <span className="font-mono text-sm text-[#B9825F] font-semibold">
          {formatValue ? formatValue(value) : value.toLocaleString()}
        </span>
      </div>
      <div className="relative h-1.5 bg-[#221F1B]/10 rounded-full">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#B9825F] rounded-full"
          style={{ width: `${percentage}%` }}
          layout
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer appearance-none z-10"
          aria-label={label}
        />
        <motion.div 
          className="absolute top-1/2 -mt-2.5 w-5 h-5 bg-[#FBF7EF] border-2 border-[#B9825F] rounded-full pointer-events-none shadow-sm transition-transform group-hover:scale-110"
          style={{ left: `calc(${percentage}% - 10px)` }}
          layout
        />
      </div>
    </div>
  );
};

export default function ScrutexityROICalculator() {
  const [locations, setLocations] = useState(5);
  const [inquiries, setInquiries] = useState(150);
  const [missedRate, setMissedRate] = useState(20);
  const [consultValue, setConsultValue] = useState(1500);

  const monthlyLeakage = locations * inquiries * (missedRate / 100) * consultValue;
  const annualLeakage = monthlyLeakage * 12;
  const recoveryFactor = 0.30;
  const monthlyRecovery = monthlyLeakage * recoveryFactor;
  const annualRecovery = annualLeakage * recoveryFactor;
  const newAnnualLeakage = annualLeakage - annualRecovery;

  return (
    <div className="min-h-screen bg-[#FBF7EF] text-[#221F1B] selection:bg-[#B9825F] selection:text-white py-24 px-6 lg:px-16 flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl"
      >
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-bold text-[#B9825F] mb-3">
            Financial Impact Simulator
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-tight mb-6">
            Quantify your portfolio's structural leakage.
          </h1>
          <p className="text-[#221F1B]/70 leading-relaxed text-lg font-light">
            Fragmented systems obscure missed consultations and routing delays. Adjust the parameters below to visualize the illustrative operational recovery potential of unified governance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <div className="lg:col-span-5 bg-white/40 border border-[#221F1B]/10 p-8 shadow-sm">
            <h2 className="text-xl font-serif mb-8 flex items-center gap-2 border-b border-[#221F1B]/10 pb-4">
              <TrendingUp className="w-5 h-5 text-[#B9825F]" />
              Portfolio Metrics
            </h2>

            <PremiumSlider 
              label="Number of Locations"
              value={locations} min={1} max={50} step={1}
              onChange={setLocations}
            />
            <PremiumSlider 
              label="Avg. Monthly Inquiries per Clinic"
              value={inquiries} min={50} max={500} step={10}
              onChange={setInquiries}
            />
            <PremiumSlider 
              label="Current Missed Follow-up Rate"
              value={missedRate} min={5} max={40} step={1}
              formatValue={(val) => `${val}%`}
              onChange={setMissedRate}
            />
            <PremiumSlider 
              label="Average Consult Value"
              value={consultValue} min={500} max={5000} step={100}
              formatValue={(val) => `$${val.toLocaleString()}`}
              onChange={setConsultValue}
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#221F1B] text-[#FBF7EF] p-8 relative overflow-hidden">
                <p className="text-xs uppercase tracking-widest text-[#FBF7EF]/50 mb-2 font-semibold">Current Annual Leakage</p>
                <div className="text-4xl md:text-5xl font-serif text-[#FBF7EF]">
                  <AnimatedNumber value={annualLeakage} prefix="$" />
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5">
                  <TrendingUp className="w-32 h-32" />
                </div>
              </div>
              
              <div className="border border-[#B9825F] bg-[#B9825F]/5 p-8 relative">
                <div className="absolute top-0 right-0 bg-[#B9825F] text-[#FBF7EF] text-[10px] uppercase tracking-widest px-2 py-1 font-bold">
                  Illustrative Recovery
                </div>
                <p className="text-xs uppercase tracking-widest text-[#221F1B]/60 mb-2 font-semibold">Potential Annual Recovery</p>
                <div className="text-4xl md:text-5xl font-serif text-[#B9825F]">
                  <AnimatedNumber value={annualRecovery} prefix="$" />
                </div>
              </div>
            </div>

            <div className="p-8 border border-[#221F1B]/10 bg-white/40">
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-serif text-xl">Leakage Recovery Distribution</h3>
                <span className="text-xs font-mono text-[#221F1B]/50">Based on 30% Efficiency Gain</span>
              </div>
              
              <div className="w-full h-8 flex rounded-sm overflow-hidden bg-[#221F1B]/5 mb-6 relative">
                <motion.div 
                  className="h-full bg-[#B9825F] flex items-center px-3"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(annualRecovery / annualLeakage) * 100}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 15 }}
                >
                  <span className="text-[10px] font-mono text-[#FBF7EF] font-bold">RECOVERED</span>
                </motion.div>
                <motion.div 
                  className="h-full bg-[#221F1B]/80 flex items-center px-3"
                  initial={{ width: '100%' }}
                  animate={{ width: `${(newAnnualLeakage / annualLeakage) * 100}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 15 }}
                >
                  <span className="text-[10px] font-mono text-[#FBF7EF]/50 font-bold hidden sm:inline">REMAINING BASELINE</span>
                </motion.div>
              </div>

              <p className="text-[#221F1B]/80 text-sm leading-relaxed">
                For a <strong>{locations}-location</strong> MSO processing {locations * inquiries} monthly inquiries, recovering just a fraction of operational leakage could add <strong><AnimatedNumber value={annualRecovery} prefix="$" /></strong> annually to your bottom line, directly improving enterprise valuation multiples.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="/pilot" className="w-full sm:w-auto group px-8 py-4 bg-[#B9825F] text-[#FBF7EF] text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-3 hover:bg-[#221F1B] transition-all duration-300">
                Request a portfolio audit
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="/for-pe" className="w-full sm:w-auto px-8 py-4 border border-[#221F1B]/20 text-[#221F1B] text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:border-[#221F1B] bg-transparent transition-all">
                <Download className="w-4 h-4" />
                Download diligence packet
              </a>
            </div>
            
            <div className="flex items-start gap-2 mt-4 opacity-60">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-[11px] uppercase tracking-wider font-mono leading-relaxed">
                Modeled on early feedback — not live customer results yet. Scrutexity models a conservative 30% reduction in missed follow-ups. Actual recovery depends strictly on clinic-specific factors, regional pricing, and operational execution.
              </p>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
