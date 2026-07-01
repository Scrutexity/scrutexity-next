'use client';

import { motion } from 'framer-motion';
import { Clock, Shield, Activity } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="platform" className="relative py-28 w-full max-w-7xl mx-auto px-6 font-sans bg-[#FBFBFA]">
      
      {/* Title */}
      <div className="text-center mb-20">
        <span className="text-[#6B8576] font-mono tracking-[0.2em] text-xs font-semibold uppercase mb-4 block">
          THE SYSTEM FLOW
        </span>
        <h2 className="text-4xl md:text-5xl font-display text-espresso tracking-tight leading-tight">
          From diagnosis to revenue recovery in 14 days.
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="relative mb-24">
        {/* Animated connector line */}
        <div className="hidden md:block absolute top-[36px] left-[16%] right-[16%] h-px z-0">
          <div className="w-full h-px bg-creamlack/[0.05]" />
          <motion.div
            className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#6B8576] to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
          
          {/* DAY 1: MISSED-CALL CAPTURE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col items-stretch text-left group bg-[#F7F5F0] border border-[#E5E3DF] p-6 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#6B8576]/8 border border-[#6B8576]/15 text-[#6B8576] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
                Day 1
              </span>
              <span className="text-[9px] text-[#6E6E6C] font-mono">01 // START</span>
            </div>
 
            {/* Artifact 1: SMS intercept */}
            <div className="w-full bg-white border border-[#E5E3DF] rounded-xl p-3 font-mono text-[8px] text-gray-800 space-y-1 mb-4 shadow-sm">
              <div className="text-gray-400 border-b border-black/[0.05] pb-1">INTERCEPT TRIGGERED</div>
              <div>📞 Missed call intercepted</div>
              <div className="text-[#6B8576] font-bold">SMS Dispatched (3m 12s)</div>
            </div>
 
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 font-mono">
              Missed-Call Recovery
            </h3>
            <p className="text-[11px] leading-relaxed text-[#6E6E6C]">
              We activate immediate SMS dispatch for unanswered clinic calls, intercepting patients before they dial other providers.
            </p>
          </motion.div>
 
          {/* DAY 3: WORKFLOWS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col items-stretch text-left group bg-[#F7F5F0] border border-[#E5E3DF] p-6 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#6B8576]/8 border border-[#6B8576]/15 text-[#6B8576] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
                Day 3
              </span>
              <span className="text-[9px] text-[#6E6E6C] font-mono">02 // REACTIVATE</span>
            </div>
 
            {/* Artifact 2: Reactivation workflows */}
            <div className="w-full bg-white border border-[#E5E3DF] rounded-xl p-3 font-mono text-[8px] text-gray-800 space-y-1 mb-4 shadow-sm">
              <div className="text-gray-400 border-b border-black/[0.05] pb-1">REACTIVATION FLOW</div>
              <div>Uncaptured demand re-engaged</div>
              <div className="text-[#6B8576] font-bold">NP Handoff Active</div>
            </div>
 
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 font-mono">
              Lead Reactivation
            </h3>
            <p className="text-[11px] leading-relaxed text-[#6E6E6C]">
              We deploy automated, HIPAA-conscious text campaigns to re-engage stale inquiries from the past 90 days.
            </p>
          </motion.div>
 
          {/* DAY 5: FRICTION AUDIT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col items-stretch text-left group bg-[#F7F5F0] border border-[#E5E3DF] p-6 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#6B1D2F]/8 border border-[#6B1D2F]/15 text-[#6B1D2F] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
                Day 5
              </span>
              <span className="text-[9px] text-[#6E6E6C] font-mono">03 // AUDIT</span>
            </div>
 
            {/* Artifact 3: Friction Log */}
            <div className="w-full bg-white border border-[#E5E3DF] rounded-xl p-3 font-mono text-[8px] text-gray-800 space-y-1 mb-4 shadow-sm">
              <div className="text-gray-400 border-b border-black/[0.05] pb-1">FRICTION LOG</div>
              <div>✕ Form drop-off isolated</div>
              <div className="text-[#6B1D2F] font-bold">Lost Consults: 42%</div>
            </div>
 
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 font-mono">
              Friction Audit
            </h3>
            <p className="text-[11px] leading-relaxed text-[#6E6E6C]">
              We examine your booking forms and scheduler pipelines, isolating exactly where billing or scheduling friction drops patients.
            </p>
          </motion.div>
 
          {/* DAY 7: VISIBILITY RECEIPT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            className="flex flex-col items-stretch text-left group bg-[#F7F5F0] border border-[#E5E3DF] p-6 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#6B1D2F]/8 border border-[#6B1D2F]/15 text-[#6B1D2F] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
                Day 7
              </span>
              <span className="text-[9px] text-[#6E6E6C] font-mono">04 // PRESENCE</span>
            </div>
 
            {/* Artifact 4: AI citation receipt */}
            <div className="w-full bg-white border border-[#E5E3DF] rounded-xl p-3 font-mono text-[8px] text-gray-800 space-y-1 mb-4 shadow-sm">
              <div className="text-gray-400 border-b border-black/[0.05] pb-1">AI CITATION STATUS</div>
              <div className="text-[#6B1D2F] font-bold">ABSENT on 7/10 prompts</div>
              <div>Competitor: DIRECT (9/10)</div>
            </div>
 
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 font-mono">
              Visibility Receipt
            </h3>
            <p className="text-[11px] leading-relaxed text-[#6E6E6C]">
              You receive a detailed report mapping your clinic's citation status and search gaps inside ChatGPT and Perplexity.
            </p>
          </motion.div>
 
          {/* DAY 14: PERFORMANCE BRIEF */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-stretch text-left group bg-[#F7F5F0] border border-[#E5E3DF] p-6 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#6B8576]/8 border border-[#6B8576]/15 text-[#6B8576] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
                Day 14
              </span>
              <span className="text-[9px] text-[#6E6E6C] font-mono">05 // OUTCOME</span>
            </div>
 
            {/* Artifact 5: Weekly brief */}
            <div className="w-full bg-white border border-[#6B8576]/30 rounded-xl p-3 font-mono text-[8px] space-y-1 mb-4 shadow-sm">
              <div className="text-gray-400 border-b border-black/[0.05] pb-1">RECOVERY BRIEF</div>
              <div className="text-gray-950 font-bold text-[10px]">$28,400 recovered</div>
              <div className="text-[#6B8576]">14 consults booked</div>
            </div>
 
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 font-mono">
              Recovery Brief
            </h3>
            <p className="text-[11px] leading-relaxed text-[#6E6E6C]">
              We deliver your final pilot outcome report summarizing every recovered consultation, booking value, and active pipeline health.
            </p>
          </motion.div>
 
        </div>
      </div>

      {/* SVG System Architecture Flow / Mobile Stack */}
      <div className="mt-24 max-w-4xl mx-auto border-t border-black/[0.05] pt-16">
        <div className="text-center md:text-left mb-8">
          <span className="text-gray-500 font-mono tracking-wider text-[10px] uppercase block mb-1">
            TECHNICAL TOPOLOGY
          </span>
          <h3 className="font-display text-2xl text-espresso">
            Interception at the Edge
          </h3>
        </div>

        {/* MOBILE ARCHITECTURE STACK (< 768px viewport) */}
        <div className="block md:hidden space-y-4">
          <div className="bg-[#F7F5F0] border border-[#E5E3DF] rounded-2xl p-5">
            <span className="text-[8px] text-[#6B8576] font-mono block uppercase mb-1">Step 01 // INGESTION</span>
            <h4 className="text-gray-950 text-sm font-semibold mb-2">Clinic Inquiries (SMS / Web / Voice)</h4>
            <p className="text-xs text-gray-600 leading-normal">
              Inquiries are synchronized directly through our secure integration pipeline alongside your CRM, ensuring no dropped connection goes unlogged.
            </p>
          </div>

          <div className="bg-[#F7F5F0] border border-[#6B8576]/20 rounded-2xl p-5 relative">
            <div className="absolute top-4 right-4 px-2 py-0.5 bg-[#6B8576]/10 border border-[#6B8576]/20 rounded text-[7px] text-[#6B8576] font-mono uppercase">
              BAA Pre-Activated
            </div>
            <span className="text-[8px] text-[#6B8576] font-mono block uppercase mb-1">Step 02 // HIPAA REDACTION</span>
            <h4 className="text-gray-950 text-sm font-semibold mb-2">HIPAA-Conscious Redaction Airlock</h4>
            <p className="text-xs text-gray-600 leading-normal">
              Privacy filters automatically strip Protected Health Information (PHI) prior to message classification.
            </p>
          </div>

          <div className="bg-[#F7F5F0] border border-[#E5E3DF] rounded-2xl p-5">
            <span className="text-[8px] text-gray-500 font-mono block uppercase mb-1">Step 03 // ROUTING</span>
            <h4 className="text-gray-950 text-sm font-semibold mb-2">Logistical & Intent Router</h4>
            <p className="text-xs text-gray-600 leading-normal">
              The router identifies client intent. If a medical clinical question is detected, it is immediately routed to human staff. Scheduling inquiries are routed directly to Zenoti / Mangomint booking systems.
            </p>
          </div>
        </div>

        {/* DESKTOP ARCHITECTURE FLOW (>= 768px viewport) */}
        <div className="hidden md:block relative bg-[#F7F5F0]/50 border border-[#E5E3DF] rounded-3xl p-8 shadow-sm overflow-hidden">
          <svg viewBox="0 0 800 240" className="w-full h-auto">
            {/* Connection Lines */}
            <path d="M 90 120 L 210 120" stroke="rgba(26,26,26,0.05)" strokeWidth="2" />
            <path d="M 310 120 L 430 120" stroke="rgba(26,26,26,0.05)" strokeWidth="2" />
            
            {/* Split Handoff Lines */}
            <path d="M 530 120 C 570 120, 580 65, 630 65 L 710 65" stroke="rgba(26,26,26,0.05)" strokeWidth="2" fill="none" />
            <path d="M 530 120 C 570 120, 580 175, 630 175 L 710 175" stroke="rgba(26,26,26,0.05)" strokeWidth="2" fill="none" />

            {/* Animation particles (sage green) */}
            <path d="M 90 120 L 210 120" stroke="#6B8576" strokeWidth="2" strokeDasharray="10 50" strokeDashoffset="0" fill="none">
              <animate attributeName="strokeDashoffset" values="120;0" dur="3s" repeatCount="Infinity" />
            </path>
            <path d="M 310 120 L 430 120" stroke="#6B8576" strokeWidth="2" strokeDasharray="10 50" strokeDashoffset="0" fill="none">
              <animate attributeName="strokeDashoffset" values="120;0" dur="3s" repeatCount="Infinity" />
            </path>
            <path d="M 530 120 C 570 120, 580 65, 630 65 L 710 65" stroke="#6B8576" strokeWidth="2" strokeDasharray="10 50" strokeDashoffset="0" fill="none">
              <animate attributeName="strokeDashoffset" values="200;0" dur="4s" repeatCount="Infinity" />
            </path>
            <path d="M 530 120 C 570 120, 580 175, 630 175 L 710 175" stroke="#6B8576" strokeWidth="2" strokeDasharray="10 50" strokeDashoffset="0" fill="none">
              <animate attributeName="strokeDashoffset" values="200;0" dur="4s" repeatCount="Infinity" />
            </path>

            {/* Node 1: Medspa Traffic */}
            <g transform="translate(90, 120)">
              <circle r="20" fill="white" stroke="rgba(26,26,26,0.08)" strokeWidth="2" />
              <circle r="4" fill="#6B8576" />
              <text y="-28" textAnchor="middle" fill="#1A1A1A" fontSize="10" fontWeight="600">MEDSPA TRAFFIC</text>
              <text y="30" textAnchor="middle" fill="gray" fontSize="8" fontFamily="monospace">STAGE 01</text>
            </g>

            {/* Node 2: Scrutexity Secure Ingest */}
            <g transform="translate(260, 120)">
              <rect x="-50" y="-35" width="100" height="70" rx="10" fill="white" stroke="#6B8576" strokeWidth="1.5" strokeOpacity="0.4" />
              <text y="10" textAnchor="middle" fill="#1A1A1A" fontSize="10" fontWeight="600">SECURE INGEST</text>
              <text y="22" textAnchor="middle" fill="#6B8576" fontSize="7" fontFamily="monospace">BAA PROTECTED</text>
              <text y="48" textAnchor="middle" fill="gray" fontSize="8" fontFamily="monospace">STAGE 02</text>
            </g>

            {/* Node 3: Logistical & Intent Router */}
            <g transform="translate(480, 120)">
              <rect x="-50" y="-35" width="100" height="70" rx="10" fill="white" stroke="rgba(26,26,26,0.08)" strokeWidth="2" />
              <text y="10" textAnchor="middle" fill="#1A1A1A" fontSize="10" fontWeight="600">INTENT ROUTER</text>
              <text y="22" textAnchor="middle" fill="gray" fontSize="8">PHI Stripped</text>
              <text y="48" textAnchor="middle" fill="gray" fontSize="8" fontFamily="monospace">STAGE 03</text>
            </g>

            {/* Node 4A: automated scheduler */}
            <g transform="translate(710, 65)">
              <circle r="18" fill="white" stroke="rgba(26,26,26,0.08)" strokeWidth="2" />
              <path d="M -4 -2 L -1 1 L 4 -4" fill="none" stroke="#6B8576" strokeWidth="2" />
              <text x="24" y="4" fill="#1A1A1A" fontSize="10" fontWeight="600" textAnchor="start">Automated Booking</text>
              <text x="24" y="14" fill="gray" fontSize="8" textAnchor="start">Boulevard / Zenoti API</text>
            </g>

            {/* Node 4B: Clinical NP Handoff */}
            <g transform="translate(710, 175)">
              <circle r="18" fill="white" stroke="#6B8576" strokeWidth="2" strokeOpacity="0.8" />
              <path d="M -4 0 L 4 0 M 0 -4 L 0 4" fill="none" stroke="#6B8576" strokeWidth="2" />
              <text x="24" y="4" fill="#1A1A1A" fontSize="10" fontWeight="600" textAnchor="start">Clinical Triage</text>
              <text x="24" y="14" fill="#6B8576" fontSize="8" fontWeight="600" textAnchor="start">Direct NP Route</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
