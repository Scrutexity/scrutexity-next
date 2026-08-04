'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { trackScrutexityEvent, createDebouncedTrack } from '@/utils/telemetry';
import AnimatedRevenueCounter, { AnimatedProfitCounter } from './motion/AnimatedRevenueCounter';

/**
 * MedspaROICalculator — Cinematic Unification pass.
 *
 * Visual shell: warm glassmorphism (white/0.6 + backdrop-blur-2xl), 1px ink/5 border,
 * subtle inner highlight. Native range sliders are visually hidden and overlaid with
 * custom Tailwind tracks that fill in `--color-clay`. The Recovered Revenue readout
 * still uses AnimatedRevenueCounter (motion.span count-up) under the hood — driven
 * by slider changes, not viewport.
 *
 * Preserved: pricing ($2,000/mo per DESIGN_SYSTEM §7), 35% recovery rate,
 * telemetry events, "$0 if not demonstrated" disclaimer, CTA wiring to /pilot.
 */

interface ClaySliderProps {
  id: string;
  label: string;
  helper?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  formatValue: (v: number) => string;
  formatMin: (v: number) => string;
  formatMax: (v: number) => string;
  onChange: (v: number) => void;
}

function ClaySlider({
  id,
  label,
  helper,
  value,
  min,
  max,
  step,
  formatValue,
  formatMin,
  formatMax,
  onChange,
}: ClaySliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-[#1C1814]">
          {label}
        </label>
        <span className="rounded-full border border-[#1C1814]/5 bg-white/70 px-3 py-1 text-[13px] font-semibold tabular-nums text-[#1C1814] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-md">
          {formatValue(value)}
        </span>
      </div>
      {helper && <p className="!mt-0.5 text-xs text-[#1C1814]/55">{helper}</p>}

      {/* Luxury watch configurator track — hairline + champagne fill + tick marks */}
      <div className="group/track relative h-7 w-full">
        {/* Hairline track */}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#1C1814]/10" />
        {/* Tick marks — 11 fine vertical hairlines */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-[1px]">
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={i}
              className="block w-px"
              style={{
                height: i === 0 || i === 10 ? '8px' : i === 5 ? '6px' : '4px',
                backgroundColor: 'rgba(28,24,20,0.22)',
              }}
            />
          ))}
        </div>
        {/* Champagne+clay progress fill — fine line, no glow */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full transition-[width] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, rgba(184,125,107,0.85) 0%, var(--color-clay) 70%, var(--color-champagne) 100%)',
          }}
        />
        {/* Thumb — fine ring, no glow, watch-crown precision */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-10 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1C1814]/15 bg-cream shadow-[0_2px_6px_rgba(28,24,20,0.18),inset_0_0_0_2px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(28,24,20,0.08)] transition-[left,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/track:scale-110"
          style={{ left: `${pct}%` }}
        />
        {/* Inner thumb dot — champagne when not at min */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-10 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[left,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            left: `${pct}%`,
            backgroundColor: pct > 2 ? 'var(--color-clay)' : 'rgba(28,24,20,0.25)',
          }}
        />
        {/* Real (hidden) range input — sits on top, captures all input */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
        />
      </div>

      <div className="flex justify-between text-[11px] font-medium text-[#1C1814]/45">
        <span>{formatMin(min)}</span>
        <span>{formatMax(max)}</span>
      </div>
    </div>
  );
}

export default function MedspaROICalculator() {
  // Core State Inputs — high-end clinic defaults
  const [adSpend, setAdSpend] = useState(8000);
  const [leadValue, setLeadValue] = useState(800);
  const [unansweredLeads, setUnansweredLeads] = useState(25);

  // Canonical pricing from DESIGN_SYSTEM.md §7
  const SCRUTEXITY_MONTHLY_COST = 2000;
  const ESTIMATED_RECOVERY_RATE = 0.35;

  const calculations = useMemo(() => {
    const totalTrappedPipeline = unansweredLeads * leadValue;
    const grossRecoveredRevenue = Math.round(totalTrappedPipeline * ESTIMATED_RECOVERY_RATE);
    const netMonthlyProfit = grossRecoveredRevenue - SCRUTEXITY_MONTHLY_COST;
    const annualSavingsMultiplier = netMonthlyProfit * 12;

    return {
      totalTrappedPipeline,
      grossRecoveredRevenue,
      netMonthlyProfit,
      annualSavingsMultiplier,
    };
  }, [leadValue, unansweredLeads]);

  // ─── Telemetry ───────────────────────────────────────────────────
  const hasTrackedView = useRef(false);
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    trackScrutexityEvent('roi_calculator_viewed', {});
  }, []);

  const debouncedTrack = useRef(createDebouncedTrack(800)).current;

  const prevProfit = useRef(calculations.netMonthlyProfit);
  useEffect(() => {
    if (prevProfit.current >= 0 && calculations.netMonthlyProfit < 0) {
      trackScrutexityEvent('roi_negative_yield_seen', {
        ad_spend: adSpend,
        unanswered_leads: unansweredLeads,
        lead_value: leadValue,
        calculated_net_profit: calculations.netMonthlyProfit,
      });
    }
    prevProfit.current = calculations.netMonthlyProfit;
  }, [calculations.netMonthlyProfit, adSpend, unansweredLeads, leadValue]);

  const handleSliderChange = useCallback(
    (inputType: string, value: number) => {
      if (inputType === 'ad_spend') setAdSpend(value);
      if (inputType === 'lead_value') setLeadValue(value);
      if (inputType === 'unanswered_leads') setUnansweredLeads(value);

      debouncedTrack('roi_slider_adjusted', {
        input_type: inputType,
        final_value: value,
        ad_spend: inputType === 'ad_spend' ? value : adSpend,
        lead_value: inputType === 'lead_value' ? value : leadValue,
        unanswered_leads: inputType === 'unanswered_leads' ? value : unansweredLeads,
        calculated_net_profit: calculations.netMonthlyProfit,
      });
    },
    [adSpend, leadValue, unansweredLeads, calculations.netMonthlyProfit, debouncedTrack]
  );

  const handleCTAClick = useCallback(() => {
    trackScrutexityEvent('roi_cta_clicked', {
      projected_annual_recovery: calculations.annualSavingsMultiplier,
      calculated_net_profit: calculations.netMonthlyProfit,
      ad_spend: adSpend,
      unanswered_leads: unansweredLeads,
    });
  }, [calculations, adSpend, unansweredLeads]);

  const fmtCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div
      className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[#1C1814]/5 bg-white/[0.6] p-6 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_30px_80px_-30px_rgba(28,24,20,0.18)] md:p-10"
    >
      {/* Soft warm wash inside the glass */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(184,125,107,0.10),transparent_55%),radial-gradient(circle_at_110%_120%,rgba(47,93,74,0.08),transparent_50%)]" />

      <div className="relative">
        {/* Header */}
        <div className="mb-9 border-b border-[#1C1814]/8 pb-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-clay)]">
            Revenue Recovery Calculator
          </p>
          <h3 className="mt-3 font-display text-3xl font-normal leading-[1.1] tracking-tight text-[#1C1814] md:text-[34px]">
            How much revenue is hiding in your unanswered inquiries?
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#1C1814]/60">
            See what happens to after-hours leads when your front desk goes home.
            Calculations use a conservative{' '}
            <span className="font-semibold text-[#1C1814]">35% recovery rate</span>{' '}
            based on anonymized pilot data. Your results may vary.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left: Sliders */}
          <div className="space-y-7 lg:col-span-7">
            <ClaySlider
              id="ad-spend"
              label="Monthly Paid Ad Spend (Google + Instagram)"
              value={adSpend}
              min={2000}
              max={30000}
              step={500}
              formatValue={fmtCurrency}
              formatMin={(v) => `$${(v / 1000).toFixed(0)}k`}
              formatMax={(v) => `$${(v / 1000).toFixed(0)}k`}
              onChange={(v) => handleSliderChange('ad_spend', v)}
            />

            <ClaySlider
              id="lead-value"
              label="Average Aesthetic Inbound Lead Value"
              helper="Average ticket value for filler, Morpheus8, or laser consult series"
              value={leadValue}
              min={200}
              max={2500}
              step={50}
              formatValue={fmtCurrency}
              formatMin={(v) => `$${v}`}
              formatMax={(v) => `$${(v / 1000).toFixed(1)}k`}
              onChange={(v) => handleSliderChange('lead_value', v)}
            />

            <ClaySlider
              id="unanswered-leads"
              label="Monthly After-Hours / Missed Inquiries"
              helper="Calls, forms, and DMs that arrive after 7 PM or over weekends"
              value={unansweredLeads}
              min={5}
              max={100}
              step={1}
              formatValue={(v) => `${v} leads`}
              formatMin={(v) => `${v}`}
              formatMax={(v) => `${v}`}
              onChange={(v) => handleSliderChange('unanswered_leads', v)}
            />
          </div>

          {/* Right: Financial readout */}
          <div className="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-[#1C1814]/5 bg-white/70 p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_20px_50px_-24px_rgba(184,125,107,0.30)] backdrop-blur-xl lg:col-span-5">
            <div className="space-y-6">
              {/* Trapped Pipeline */}
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#1C1814]/45">
                  Your Trapped Monthly Pipeline
                </p>
                <p className="mt-1 text-xl font-medium text-[#1C1814]/40 line-through decoration-[#1C1814]/15 tabular-nums">
                  {fmtCurrency(calculations.totalTrappedPipeline)}
                </p>
              </div>

              {/* Recovered Revenue — the headline number */}
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#1C1814]/60">
                  Est. Recovered Monthly Revenue
                </p>
                <AnimatedRevenueCounter
                  value={calculations.grossRecoveredRevenue}
                  className="mt-1 block font-display text-[44px] font-normal tracking-tight text-[var(--color-clay)] tabular-nums leading-[1.05]"
                />
                <p className="mt-2 text-[11px] leading-5 text-[#1C1814]/50">
                  At 35% recovery rate · $2,000/mo platform fee · Requires manual verification
                </p>
              </div>

              <div className="h-px w-full bg-[#1C1814]/8" />

              {/* Net monthly profit */}
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#1C1814]/60">
                  Net New Monthly Profit
                </p>
                <AnimatedProfitCounter
                  value={calculations.netMonthlyProfit}
                  className={`mt-1 block font-display text-[38px] font-normal tracking-tight tabular-nums leading-[1.05] ${
                    calculations.netMonthlyProfit > 0
                      ? 'text-[var(--color-pine)]'
                      : 'text-[#6b1d2f]'
                  }`}
                />
              </div>
            </div>

            {/* CTA panel */}
            <div className="mt-7 rounded-[1.1rem] border border-[#1C1814]/5 bg-[var(--color-bone)]/65 p-5 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.55)]">
              <p className="text-[11px] text-[#1C1814]/60">
                Projected annual recovery:{' '}
                <AnimatedRevenueCounter
                  value={calculations.annualSavingsMultiplier}
                  className="inline font-semibold text-[var(--color-pine)]"
                />
              </p>
              <Link
                href="/pilot"
                onClick={handleCTAClick}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold text-[var(--color-bone)] shadow-[0_18px_40px_-18px_rgba(28,24,20,0.55),inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2a2118]"
              >
                Get Your Free Audit →
              </Link>
              <p className="mt-3 text-[11px] text-[#1C1814]/45">
                $0 if recovery isn&rsquo;t demonstrated. Read-only access. Cancel anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="relative mx-auto mt-7 max-w-xl text-center text-[11px] leading-5 text-[#1C1814]/45">
          Estimates based on anonymized pilot data and industry benchmarks ($1,500 avg. treatment value,
          22% no-show rate, 35% est. recovery rate). Actual results vary by clinic volume, response
          patterns, and existing workflows. This calculator is illustrative — not a guarantee of performance.
        </p>
      </div>
    </div>
  );
}
