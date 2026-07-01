'use client';
 
import { Activity } from 'lucide-react';
 
export default function SocialProof() {
  return (
    <section className="w-full bg-[#F7F5F0] border-y border-[#E5E3DF] py-6 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
        <div className="flex items-center gap-2 bg-[#6B8576]/10 border border-[#6B8576]/25 px-2.5 py-1 rounded-full">
          <Activity className="w-3.5 h-3.5 text-[#6B8576] animate-pulse" />
          <span className="text-[9px] font-mono font-bold text-[#6B8576] uppercase tracking-widest">
            Airlock Live
          </span>
        </div>
        
        <p className="text-xs text-[#6E6E6C] font-mono uppercase tracking-wider">
          Closed-loop clinical revenue infrastructure active across premium NYC-area aesthetics clinics.
        </p>
      </div>
    </section>
  );
}
