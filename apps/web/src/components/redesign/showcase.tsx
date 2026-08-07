'use client';

import { GlassCard, Kicker, Reveal } from './motion-kit';

/* -------------------------------------------------------------------------- */
/*  Product showcase band — 6 mini mock-dashboard modules                      */
/* -------------------------------------------------------------------------- */

function Row({
  left,
  right,
  rightClass = 'text-[#d9ff5c]',
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  rightClass?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-[#242426]/50 px-3.5 py-2.5">
      <span className="truncate text-[12px] text-[#ebedfa]">{left}</span>
      <span className={`shrink-0 text-[11px] font-bold tracking-wide ${rightClass}`}>
        {right}
      </span>
    </div>
  );
}

function Module({
  tag,
  title,
  children,
  footer,
}: {
  tag: string;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <GlassCard className="flex h-full flex-col p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9391b8]">
        {tag}
      </p>
      <h3 className="mt-2 text-[16px] font-semibold text-[#ebedfa]">{title}</h3>
      <div className="mt-4 flex-1 space-y-2">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </GlassCard>
  );
}

export function MakroShowcase({ isLight = true }: { isLight?: boolean }) {
  return (
    <section id="showcase" className={`transition-colors duration-500 px-5 py-24 sm:px-8 ${
      isLight ? 'bg-[#14142d] text-[#ebedfa] border-y border-white/10' : 'bg-[#14142d] text-[#ebedfa]'
    }`}>
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="max-w-[680px]">
            <Kicker>Product tour</Kicker>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#ebedfa] sm:text-5xl">
              Everything on one evidence board.
            </h2>
            <p className="mt-4 max-w-[540px] text-[15px] leading-relaxed text-[#9391b8]">
              Claims in, evidence attached, status visible. The same board
              serves a founder checking exposure and a diligence team running a
              review pipeline.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Sort / Claim intake */}
          <Reveal className="h-full" delay={0}>
            <Module tag="Sort" title="Claim Intake">
              <p className="px-1 text-[12px] text-[#9391b8]">
                AI groups every claim into evidence buckets:
              </p>
              <Row left="Operations" right="12" />
              <Row left="Marketing" right="27" />
              <Row left="Clinical" right="9" />
              <Row left="Regulatory" right="4" />
              <Row left="Taxes &amp; Fees" right="2" />
            </Module>
          </Reveal>

          {/* Connect / Source sync */}
          <Reveal className="h-full" delay={0.06}>
            <Module tag="Connect" title="Source Sync">
              <p className="px-1 text-[12px] text-[#9391b8]">
                Sources auto-imported and fingerprinted:
              </p>
              <Row left="FDA label · 1 min ago" right="+$1,250.00" />
              <Row left="Clinical study · 2h ago" right="+$480.00" />
              <Row left="Webinar transcript · yesterday" right="+$320.00" />
              <Row left="Press release · 3d ago" right="+$2,100.00" />
            </Module>
          </Reveal>

          {/* Control / Daily signals */}
          <Reveal className="h-full" delay={0.12}>
            <Module tag="Control" title="Daily AI Insights">
              <div className="rounded-lg border border-white/[0.07] bg-[#d9ff5c]/10 px-3.5 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9391b8]">
                  Claim drift detected
                </p>
                <p className="mt-1 text-2xl font-bold text-[#d9ff5c]">+15%</p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#9391b8]">
                  Balance increase in unsupported claims this month
                </p>
              </div>
            </Module>
          </Reveal>

          {/* Track / Claim status */}
          <Reveal className="h-full" delay={0}>
            <Module tag="Track" title="Claim Status">
              <Row left="#002-12 · Verified · Mira Studio" right="$1,200" />
              <Row left="#003-12 · Overdue · Silver Desk" right="$550" rightClass="text-[#e0c5b6]" />
              <Row left="#004-12 · In review · Brightline" right="$900" rightClass="text-[#b8deff]" />
              <Row left="#005-12 · Paid · Kinetic" right="$300" />
            </Module>
          </Reveal>

          {/* Plan / Renewal watch */}
          <Reveal className="h-full" delay={0.06}>
            <Module tag="Plan" title="Upcoming Renewals">
              <Row left="Scrutexity Watch" right="$1,500" />
              <Row left="Claim Support Review" right="$99" />
              <Row left="Snapshot refresh" right="Free" rightClass="text-[#b8deff]" />
              <p className="px-1 pt-1 text-[11px] text-[#9391b8]">
                Recurring checks scheduled — never miss a drift window.
              </p>
            </Module>
          </Reveal>

          {/* Protect / Anomaly detection */}
          <Reveal className="h-full" delay={0.12}>
            <Module tag="Protect" title="Anomaly Detection">
              <div className="rounded-lg border border-white/[0.07] bg-[#242426]/50 px-3.5 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#e0c5b6]">
                  Distortion spike
                </p>
                <div className="mt-2 space-y-1.5 text-[12px] text-[#ebedfa]">
                  <p>Now: <span className="font-bold text-[#e0c5b6]">6 flags</span></p>
                  <p>Avg: 2 flags</p>
                  <p className="text-[11px] text-[#9391b8]">Mark as expected</p>
                </div>
              </div>
            </Module>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
