'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldCheck, AlertTriangle, CalendarCheck, Terminal, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { trackScrutexityEvent } from '@/utils/telemetry';
import TriageConsoleStagger from './motion/TriageConsoleStagger';

const PRESETS = [
  {
    title: 'Routine Scheduling Intent',
    text: 'Hi! Do you have any openings for 30 units of Botox this Thursday afternoon with Nurse Sarah?',
    classification: 'OPERATIONAL_LOGISTICS',
    isClinical: false,
    response: 'Checking Nurse Sarah\'s calendar matrix inside Boulevard... I have a 2:30 PM and a 4:00 PM open this Thursday. Which slot would you like to reserve? (Note: A $100 deposit is required to lock in your appointment.)',
  },
  {
    title: 'Post-Treatment Vascular Concern',
    text: 'I had a syringe of filler in my nasolabial folds 3 hours ago and now the skin looks white, blotchy, and it feels like a sharp throbbing pain. Is that normal?',
    classification: 'CRITICAL_CLINICAL_HANDOFF',
    isClinical: true,
    response: '[AUTOMATED SYSTEM SHUTDOWN] Conversation flagged for immediate medical review. Script access terminated. Alert broadcasted via Slack and SMS to On-Call Nurse Coordinator.',
  },
  {
    title: 'General Amenity Check',
    text: 'Where is the best place to park near your SoHo location? Is there a parking garage close by?',
    classification: 'OPERATIONAL_LOGISTICS',
    isClinical: false,
    response: 'Our SoHo clinic is located at 122 Prince Street. The closest parking structure is the Icon Parking garage situated at 110 Mercer Street, just a 2-minute walk from our front doors.',
  },
  {
    title: 'Medication Contraindication',
    text: 'Can I schedule a laser session if I\'m currently taking doxycycline for acne?',
    classification: 'CONTRAINDICATION_FILTER',
    isClinical: true,
    response: '[BOOKING BLOCKED] Recognized photosensitizing medication (doxycycline). Cited clinic safety policy. Calendar access restricted. Prompted user to schedule an in-person NP assessment before any laser treatment.',
  },
];

export default function InteractiveTriagePlayground() {
  const [selectedPreset, setSelectedPreset] = useState<typeof PRESETS[0] | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [simulating, setSimulating] = useState(false);
  const [simulationCount, setSimulationCount] = useState(0);

  // ─── Telemetry ───────────────────────────────────────────────────

  // Track viewport entry once on mount
  const hasTrackedView = useRef(false);
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    const params = new URLSearchParams(window.location.search);
    trackScrutexityEvent('triage_playground_viewed', {
      source_campaign: params.get('utm_campaign') || params.get('utm_source') || 'direct',
    });
  }, []);

  const handleRunSimulation = useCallback((preset: typeof PRESETS[0]) => {
    setSimulating(true);
    setSelectedPreset(null);

    const newCount = simulationCount + 1;
    setSimulationCount(newCount);

    // Fire telemetry based on preset vs custom
    if (preset.title === 'Custom Input Evaluation') {
      trackScrutexityEvent('triage_custom_prompt_run', {
        classification_result: preset.classification,
        is_clinical_flag: preset.isClinical,
        prompt_length: preset.text.length,
        attempt_number: newCount,
      });
    } else {
      trackScrutexityEvent('triage_preset_executed', {
        preset_name: preset.title,
        classification_result: preset.classification,
        attempt_number: newCount,
      });
    }

    setTimeout(() => {
      setSelectedPreset(preset);
      setSimulating(false);
    }, 750);
  }, [simulationCount]);

  // Track CTA click after simulation
  const handlePilotCTA = useCallback(() => {
    trackScrutexityEvent('triage_pilot_started', {
      simulations_run_count: simulationCount,
      last_classification_seen: selectedPreset?.classification || null,
      last_was_clinical: selectedPreset?.isClinical || false,
    });
  }, [simulationCount, selectedPreset]);

  const handleCustomSimulation = () => {
    if (!customInput.trim()) return;
    const hasClinical = /pain|hurt|swelling|bruising|bleeding|pregnant|medication|antibiotic|doxycycline|normal\?|vascular|purple|white|blotchy|cold|throbbing/i.test(customInput);
    const hasContraindication = /taking|prescribed|dose|mg|pill|tablet/i.test(customInput);

    let classification = 'OPERATIONAL_LOGISTICS';
    let isClinical = false;
    if (hasClinical && hasContraindication) {
      classification = 'CONTRAINDICATION_FILTER';
      isClinical = true;
    } else if (hasClinical) {
      classification = 'CRITICAL_CLINICAL_HANDOFF';
      isClinical = true;
    }

    handleRunSimulation({
      title: 'Custom Input Evaluation',
      text: customInput,
      classification,
      isClinical,
      response: isClinical
        ? '[AUTOMATED SYSTEM SHUTDOWN] Custom payload flagged. Classification node detected clinical or contraindication markers. Script access terminated. Alert routed to clinical staff.'
        : 'Payload cleared Stage 1 classification. No clinical markers detected. Routing to operational scheduling engine for calendar matching and deposit capture.',
    });
  };

  return (
    <div className="min-h-screen bg-cream text-espresso font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e8dfcf_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#7f8f78]/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#7f8f78]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Classification Sandbox
          </span>
          <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-espresso mt-6 sm:text-5xl md:text-[3.8rem]">
            Stress-Test the<br />
            <span className="text-clay">Deterministic Classifier</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-mist">
            Select an inbound patient scenario below. Watch how the Stage 1 classification node handles scheduling inquiries vs. high-liability medical concerns — before anything touches your EMR.
          </p>
        </div>
      </section>

      {/* Playground */}
      <main className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Inputs */}
            <div className="lg:col-span-5 space-y-4 flex flex-col">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-clay-deep uppercase tracking-[0.18em]">
                  Select a Pre-Configured Test Prompt
                </p>
                {PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleRunSimulation(preset)}
                    disabled={simulating}
                    className="w-full text-left p-5 rounded-[1.25rem] border border-sand-deep bg-cream hover:border-clay/40 hover:shadow-[0_8px_30px_-8px_rgba(185,130,95,0.12)] transition-all duration-200 group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-espresso group-hover:text-clay transition-colors">
                        {preset.title}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-medium text-[#9e8e7e] group-hover:text-clay transition-colors">
                        <Play className="h-3 w-3" /> Run
                      </span>
                    </div>
                    <p className="text-xs text-mist mt-2 font-mono leading-relaxed line-clamp-2">
                      &ldquo;{preset.text}&rdquo;
                    </p>
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="border-t border-sand-deep pt-6 mt-4">
                <label htmlFor="custom-input" className="text-xs font-semibold text-clay-deep uppercase tracking-[0.18em] block mb-3">
                  Custom Prompt Testing
                </label>
                <textarea
                  id="custom-input"
                  className="w-full p-4 rounded-[1.25rem] border border-sand-deep bg-cream text-sm font-mono text-espresso placeholder:text-[#9e8e7e] focus:outline-none focus:border-clay/50 transition-colors resize-none"
                  rows={3}
                  placeholder="Type a patient scenario to test classification..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                />
                <button
                  onClick={handleCustomSimulation}
                  disabled={simulating || !customInput.trim()}
                  className="mt-3 w-full rounded-full border border-sand-deep bg-[#f3eadf] px-5 py-3 text-sm font-semibold text-espresso hover:bg-[#e8d9c6] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Evaluate Custom Ingress
                </button>
              </div>
            </div>

            {/* Right: Simulated Console */}
            <div className="lg:col-span-7 rounded-[1.75rem] border border-[#3d3731]/30 bg-[#1e1b17] p-6 shadow-xl font-mono text-xs flex flex-col justify-between min-h-[500px]">
              <div className="space-y-4 w-full">
                {/* Console header */}
                <div className="flex items-center justify-between border-b border-[#3d3731]/50 pb-3">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6b1d2f]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d8b17a]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7f8f78]/80" />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-mist">
                    SCX-Classification-Console
                  </span>
                </div>

                {simulating ? (
                  <div className="py-20 text-center text-mist animate-pulse">
                    <Terminal className="h-8 w-8 mx-auto mb-3 opacity-40" />
                    Evaluating payload safety parameters...
                  </div>
                ) : selectedPreset ? (
                  <TriageConsoleStagger
                    payload={{
                      text: selectedPreset.text,
                      classification: selectedPreset.classification,
                      isClinical: selectedPreset.isClinical,
                      response: selectedPreset.response,
                    }}
                  />
                ) : (
                  <div className="py-24 text-center text-mist italic">
                    <Terminal className="h-10 w-10 mx-auto mb-4 opacity-20" />
                    Awaiting operational payload entry.<br />
                    Select a test prompt on the left to monitor execution.
                  </div>
                )}
              </div>

              {/* Console footer */}
              <div className="mt-6 pt-4 border-t border-[#3d3731]/40 text-[10px] text-mist flex justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7f8f78]" />
                  EHR Target: BOULEVARD_API
                </span>
                <span>Data Retention: ZERO_PHI</span>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-xl rounded-[1.75rem] border-2 border-clay/20 bg-cream p-8">
              <p className="font-display text-xl text-espresso mb-2">
                See it work on your own clinic&rsquo;s data.
              </p>
              <p className="text-[14px] text-mist mb-6">
                14-day pilot. Read-only Boulevard access. $0 if recovery isn&rsquo;t demonstrated.
              </p>
              <Link
                href="/pilot"
                onClick={handlePilotCTA}
                className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(185,130,95,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a36b5d]"
              >
                Get Your Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-[11px] text-[#9e8e7e]">
                BAA signed before any connection. PHI stripped before processing. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
