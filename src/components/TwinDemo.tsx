'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, Clock, CheckCircle2, Lock } from 'lucide-react';

type Message = {
  id: string;
  sender: 'ai' | 'lead' | 'np';
  text: string;
  delayMs: number;
  telemetry?: {
    intent: string;
    action: string;
    status: string;
    auditLog: string;
  };
};

const script: Message[] = [
  {
    id: '1',
    sender: 'ai',
    text: 'Hi Sarah, this is the concierge desk at Manhattan Aesthetics Partners. We noticed you scheduled a Morpheus8 consultation but didn\'t complete the deposit. Are you still interested in addressing skin laxity this month?',
    delayMs: 1500,
    telemetry: {
      intent: 'Lead Reactivation (Ghosted > 48h)',
      action: 'Send compliance-shielded bump',
      status: 'Awaiting intent class',
      auditLog: 'Consent match: Active Opt-In verified.'
    }
  },
  {
    id: '2',
    sender: 'lead',
    text: 'I am, but honestly I heard Morpheus8 can cause hyperpigmentation on darker skin types. I\'m pretty nervous about it.',
    delayMs: 5000,
  },
  {
    id: '3',
    sender: 'ai',
    text: 'I completely understand that safety is your top priority, Sarah. Because skin classification and RF settings require medical expertise, I\'ve routed your inquiry directly to our Nurse Practitioner, Sarah. She will text you back from this number in less than 10 minutes to discuss our safe-treatment protocols.',
    delayMs: 8500,
    telemetry: {
      intent: 'Clinical safety objection detected',
      action: 'Hard-route to NP (No AI medical advice)',
      status: 'PHI Redaction Executed',
      auditLog: 'Trigger §4.2: AI clinical guardrail active. Logged.'
    }
  },
  {
    id: '4',
    sender: 'np',
    text: 'Hi Sarah, NP Sarah here. For Fitzpatrick IV-VI skin types, we pre-treat with a customized tyrosinase inhibitor and adjust depth/energy profiles to guarantee safety. Let\'s do a quick visual check. Do you have 5 minutes for a secure FaceTime call tomorrow at 10 AM?',
    delayMs: 14000,
    telemetry: {
      intent: 'NP Triage Response',
      action: 'Secure video scheduling request',
      status: 'Human session active',
      auditLog: 'NP credential verified. Session locked.'
    }
  },
  {
    id: '5',
    sender: 'lead',
    text: 'Oh wow, thank you! Yes, tomorrow at 10 AM works perfectly.',
    delayMs: 18500,
  },
  {
    id: '6',
    sender: 'np',
    text: 'Perfect. Slot is held. Here is your secure, PHI-sanitized confirmation link: [https://booking.manhattan-aesthetics.com/confirm]. See you tomorrow!',
    delayMs: 22000,
    telemetry: {
      intent: 'Triage complete & booking closed',
      action: 'Send secure deposit invoice',
      status: 'Automated ledger sync',
      auditLog: 'Consult booked. Handoff to CRM.'
    }
  }
];

export default function TwinDemo() {
  const [activeMessages, setActiveMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTelemetry, setCurrentTelemetry] = useState<Message['telemetry']>();
  const [hasStarted, setHasStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasStarted) return;

    let timers: NodeJS.Timeout[] = [];
    let typingTimers: NodeJS.Timeout[] = [];

    script.forEach((msg) => {
      // Simulate typing state before message arrives
      const typeStartTimer = setTimeout(() => {
        setIsTyping(true);
        if (msg.telemetry) setCurrentTelemetry(msg.telemetry);
      }, msg.delayMs - 1500);
      typingTimers.push(typeStartTimer);

      // Reveal the message
      const msgTimer = setTimeout(() => {
        setIsTyping(false);
        setActiveMessages(prev => [...prev, msg]);
        
        // Auto scroll
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 100);

      }, msg.delayMs);
      
      timers.push(msgTimer);
    });

    return () => {
      timers.forEach(clearTimeout);
      typingTimers.forEach(clearTimeout);
    };
  }, [hasStarted]);

  return (
    <section id="demo-section" className="py-24 max-w-7xl mx-auto px-6 border-b border-black/[0.05] font-sans bg-[#FBFBFA]">
      <div className="text-center mb-16">
        <span className="text-[#6B8576] font-mono tracking-[0.2em] text-xs font-semibold uppercase mb-4 block">
          CLINICAL CONVERSATION ARCHITECTURE
        </span>
        <h2 className="text-4xl md:text-5xl font-display text-[#1A1A1A] mb-6">
          See Clinical Routing in Real-Time
        </h2>
        <p className="text-[#6E6E6C] text-lg max-w-2xl mx-auto leading-relaxed">
          System recovers missed consultations. Clinical questions are hard-routed instantly to licensed practitioners. No false medical claims. Underpinned by BAA-ready infrastructure supporting HIPAA-conscious administrative workflows.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT: Phone Simulator (Mangomint style container) */}
        <div className="lg:col-span-7 bg-[#F7F5F0] rounded-[30px] border border-[#E5E3DF] shadow-md p-6 lg:p-8 flex flex-col justify-between min-h-[600px] relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent pointer-events-none" />

          {/* iOS Notification Overlay (Top-Left - hidden on mobile) */}
          {hasStarted && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-6 left-6 z-30 w-[300px] bg-white text-gray-900 rounded-2xl p-3.5 shadow-xl border border-[#E5E3DF] hidden md:block"
            >
              <div className="flex items-center gap-2 mb-1">
                {/* App icon: emerald/sage circle with "S" monogram */}
                <div className="w-4.5 h-4.5 rounded-full bg-[#6B8576] flex items-center justify-center text-[10px] font-bold text-white font-mono">
                  S
                </div>
                <span className="text-[10px] font-bold text-gray-800">Scrutexity · UES Aesthetics</span>
                <span className="text-[9px] text-gray-400 font-mono ml-auto">now</span>
              </div>
              <div className="text-xs font-semibold text-gray-900 leading-snug">New inquiry: Morpheus8 on darker skin tone</div>
              <div className="text-[10px] text-[#6B8576] mt-0.5 font-medium">Clinical routing triggered</div>
            </motion.div>
          )}

          {/* Phone Frame Simulator */}
          <div className="relative mx-auto w-full max-w-[340px] bg-white rounded-[36px] overflow-hidden border border-[#E5E3DF] shadow-md mt-10 md:mt-24 mb-4">
            
            {/* Header */}
            <div className="bg-[#F7F5F0] py-4 px-6 border-b border-[#E5E3DF] flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#6B8576]/10 border border-[#6B8576]/30 flex items-center justify-center text-[#6B8576] font-bold text-sm">
                  MA
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-xs leading-none mb-1">Sarah (Morpheus8 Lead)</h3>
                  <span className="text-[9px] text-[#6B8576] uppercase tracking-widest font-mono">Secured Concierge Tunnel</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-[#6B8576]/10 border border-[#6B8576]/25 px-2 py-0.5 rounded text-[8px] font-mono text-[#6B8576] uppercase">
                <Lock className="w-2.5 h-2.5" /> BAA Active
              </div>
            </div>

            {/* Messages Feed */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto space-y-6 scroll-smooth pb-20 bg-[#FBFBFA] h-[380px]"
            >
              <AnimatePresence>
                {activeMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'lead' ? 'mr-auto items-start' : 'ml-auto items-end'}`}
                  >
                    <div 
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'lead' 
                          ? 'bg-[#E9E9EB] text-[#1A1A1A] rounded-tl-sm'
                          : 'bg-[#007AFF] text-white rounded-tr-sm shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-mono">
                      {msg.sender === 'lead' ? 'Patient' : msg.sender === 'np' ? 'Nurse Practitioner' : 'AI Twin'}
                    </span>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex max-w-[85%] ml-auto"
                  >
                    <div className="bg-[#007AFF] p-4 rounded-2xl rounded-tr-sm flex items-center gap-1.5 w-16 h-10 shadow-sm">
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-white/70 rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/70 rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/70 rounded-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trigger Button Overlay */}
            {!hasStarted && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center">
                <Activity className="w-8 h-8 text-[#6B8576] mb-4 animate-pulse" />
                <h4 className="text-gray-900 text-base font-semibold mb-2">Simulate Patient Triage Flow</h4>
                <p className="text-xs text-[#6E6E6C] max-w-xs mb-6 leading-relaxed">
                  Watch how Scrutexity intercepts clinical safety concerns and routes to NP staff.
                </p>
                <button 
                  onClick={() => setHasStarted(true)}
                  className="px-6 py-3 bg-[#6B8576] hover:bg-[#5A7365] text-white font-bold rounded-xl shadow-md transition-all font-mono text-xs uppercase tracking-wider cursor-pointer"
                >
                  Initialize Architecture Brief
                </button>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT: EMR Practitioner Ledger + State-synced overlays */}
        <div className="lg:col-span-5 bg-[#F7F5F0] rounded-[30px] p-6 lg:p-8 border border-[#E5E3DF] shadow-md min-h-[600px] flex flex-col justify-between relative overflow-hidden">
          
          <div className="flex items-center gap-3 mb-6 border-b border-[#E5E3DF] pb-4">
            <Activity className="w-6 h-6 text-[#6B8576]" />
            <div>
              <h2 className="text-gray-800 font-semibold text-sm font-mono uppercase tracking-wider">Clinical Handoff Ledger</h2>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-mono mt-0.5">Automated Practice Safeguard</p>
            </div>
          </div>

          <div className="flex-1 space-y-6 relative z-10 overflow-y-auto">
            {!hasStarted ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4 py-20">
                <Shield className="w-10 h-10 opacity-30 text-[#6B8576]" />
                <p className="font-mono text-xs uppercase tracking-widest text-center text-gray-500">
                  Ledger Idle<br/>Awaiting Pipeline Inbound
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {currentTelemetry ? (
                    <motion.div 
                      key={currentTelemetry.intent}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-5 text-gray-800"
                    >
                      <div>
                        <span className="block text-gray-500 text-[9px] uppercase tracking-widest font-mono mb-1.5">Patient Inquiry Intent</span>
                        <div className="bg-white border border-[#E5E3DF] rounded-xl p-3 text-gray-900 text-xs font-mono">
                          {currentTelemetry.intent}
                        </div>
                      </div>

                      <div>
                        <span className="block text-gray-500 text-[9px] uppercase tracking-widest font-mono mb-1.5">Airlock Routing Action</span>
                        <div className="bg-[#6B8576]/5 border border-[#6B8576]/20 rounded-xl p-3 text-[#6B8576] text-xs font-semibold flex items-center gap-2.5">
                          <Activity className="w-4 h-4 shrink-0 animate-pulse" />
                          {currentTelemetry.action}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 py-10">
                      <Clock className="w-6 h-6 mb-3 animate-spin text-gray-400" />
                      <p className="font-mono text-[10px] uppercase tracking-widest">Awaiting edge data routing...</p>
                    </div>
                  )}
                </AnimatePresence>

                {/* FLOATING RIGHT: Monospace Audit Trace Chip (appears when activeMessages.length >= 3) */}
                <AnimatePresence>
                  {activeMessages.length >= 3 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-white border border-[#6B8576]/30 rounded-2xl p-4 shadow-md font-mono text-[10px] text-gray-700 space-y-1 relative"
                    >
                      <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#6B8576] animate-ping" />
                      <div className="font-bold text-xs uppercase tracking-wider mb-2 text-[#1A1A1A]">MEDICAL_QUESTION detected</div>
                      <div>Trigger: contraindication keyword (safety/hyperpigmentation)</div>
                      <div>PHI Status: <span className="bg-[#6B8576]/10 px-1.5 py-0.5 rounded text-[#6B8576] font-bold">REDACTED</span> via Presidio</div>
                      <div className="text-gray-500 mt-1">Routed → Dr. Martinez · 0.3s execution latency</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* BOTTOM-RIGHT OUTCOME CARD (appears when activeMessages.length >= 6) */}
                <AnimatePresence>
                  {activeMessages.length >= 6 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-[#6B8576] text-white rounded-2xl p-5 shadow-xl relative overflow-hidden"
                    >
                      <div className="font-bold text-[10px] uppercase tracking-widest font-mono text-white/80 mb-1">BOOKING CONFIRMED</div>
                      <div className="text-xl font-bold leading-tight">Morpheus8 Full Face · $3,200</div>
                      <div className="text-[10px] text-white/90 font-medium mt-2 leading-relaxed">
                        Recovered from clinical safety objection inquiry. Sync complete to Boulevard CRM.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
