'use client';

/**
 * ClaimDashboard — claim confidence scorecard.
 * Metrics are derived from the canonical claims via scoring.deriveConfidence,
 * so demo, sample, and live audits all roll up the same way. Progress ring +
 * trend arrow + sparkline. Warm palette only.
 */

import { TrendingUp, TrendingDown } from 'lucide-react';
import { ArtifactHeading, Reveal, ProgressRing, Sparkline, MONO_STACK } from './_shared';
import {
  SAMPLE_CLAIMS,
  SAMPLE_CITATIONS,
  deriveConfidence,
  highRiskCount,
  type ClaimRecord,
  type CitationEngine,
  type ConfidenceMetric,
} from '@/lib/claim-intelligence';

const SAGE = '#5E7A5A';
const CLAY = '#8A533B';

export interface ClaimDashboardProps {
  claims?: ClaimRecord[];
  citations?: CitationEngine[];
  /** Override the derived metrics entirely (e.g. when a report ships its own). */
  metrics?: ConfidenceMetric[];
}

export default function ClaimDashboard({
  claims = SAMPLE_CLAIMS,
  citations = SAMPLE_CITATIONS,
  metrics,
}: ClaimDashboardProps) {
  const data = metrics ?? deriveConfidence(claims, citations);
  const rewrites = highRiskCount(claims);

  return (
    <section className="relative border-t border-sand-deep/15 bg-cream px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <ArtifactHeading
            kicker="Sample Report · Claim Confidence"
            title="Your claim posture,"
            italic="scored at a glance."
            body="Every audit rolls up to a confidence scorecard so an owner can see exposure and progress in seconds — without reading the full report."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((m, i) => {
            const ring = m.upIsGood ? SAGE : CLAY;
            const goodTrend = m.up === m.upIsGood;
            const trendColor = goodTrend ? 'text-sage-deep' : 'text-[#6b1d2f]';
            const TrendIcon = m.up ? TrendingUp : TrendingDown;
            return (
              <Reveal key={m.label} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-sand-deep/35 bg-beige/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-sage-deep/35 hover:shadow-[0_28px_70px_-50px_rgba(28,24,20,0.55)]">
                  <div className="flex items-start justify-between">
                    <ProgressRing value={m.value} color={ring} size={68}>
                      <span className="font-display text-lg text-espresso">{m.display}</span>
                    </ProgressRing>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${trendColor}`}
                      style={{ fontFamily: MONO_STACK }}
                    >
                      <TrendIcon size={13} />
                      {m.delta}
                    </span>
                  </div>
                  <p className="mt-5 font-display text-lg text-espresso">{m.label}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className="text-[10px] uppercase tracking-[0.13em] text-mist/60"
                      style={{ fontFamily: MONO_STACK }}
                    >
                      30-day trend
                    </span>
                    <Sparkline points={m.spark} stroke={ring} />
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* summary tile */}
          <Reveal delay={0.3}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-sand-deep/35 bg-espresso p-6 text-cream">
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.14em] text-sage-soft"
                  style={{ fontFamily: MONO_STACK }}
                >
                  Owner brief
                </p>
                <p className="mt-3 font-display text-2xl leading-snug">
                  {rewrites} high-risk {rewrites === 1 ? 'claim needs a rewrite' : 'claims need rewrites'} this week.
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-cream/70">
                Coverage is climbing, exposure is falling. Clear the flagged claims to move the
                overall score above 80.
              </p>
            </div>
          </Reveal>
        </div>
        <p className="mt-6 text-xs text-mist">Illustrative sample data. Figures require manual verification.</p>
      </div>
    </section>
  );
}
