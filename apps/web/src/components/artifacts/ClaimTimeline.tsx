'use client';

/**
 * ClaimTimeline — claim drift over time, git-commit style.
 * Consumes DriftEvent[] from the canonical model. Horizontal on desktop,
 * vertical on mobile. Warm palette.
 */

import { GitCommit, FileEdit, Trash2, AlertTriangle } from 'lucide-react';
import { ArtifactHeading, Reveal, MONO_STACK, STATUS_META } from './_shared';
import { SAMPLE_DRIFT, type DriftEvent } from '@/lib/claim-intelligence';

const KIND_ICON: Record<DriftEvent['kind'], typeof GitCommit> = {
  created: GitCommit,
  updated: FileEdit,
  removed: Trash2,
  risk: AlertTriangle,
};

export interface ClaimTimelineProps {
  drift?: DriftEvent[];
}

export default function ClaimTimeline({ drift = SAMPLE_DRIFT }: ClaimTimelineProps) {
  return (
    <section className="relative border-t border-sand-deep/15 bg-beige/40 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <ArtifactHeading
            kicker="Monitoring · Claim Drift"
            title="Claims don't fail loudly."
            italic="They drift."
            body="A claim that was supported in January can be unsupported by April — same words, vanished evidence. Claim exposure monitoring catches the gap before a prospect or partner does."
          />
        </Reveal>

        <div className="mt-14">
          {/* desktop horizontal */}
          <div className="relative hidden md:block">
            <div className="absolute left-0 right-0 top-[18px] h-px bg-sand-deep/40" />
            <div
              className="relative grid gap-4"
              style={{ gridTemplateColumns: `repeat(${drift.length}, minmax(0, 1fr))` }}
            >
              {drift.map((c, i) => {
                const meta = STATUS_META[c.status];
                const Icon = KIND_ICON[c.kind];
                return (
                  <Reveal key={c.hash} delay={i * 0.12}>
                    <div className="flex flex-col items-start">
                      <span
                        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-cream ${meta.border}`}
                      >
                        <Icon size={15} className={meta.text} />
                      </span>
                      <span
                        className="mt-4 text-[10px] uppercase tracking-[0.14em] text-mist"
                        style={{ fontFamily: MONO_STACK }}
                      >
                        {c.date} · {c.hash}
                      </span>
                      <p className="mt-1 font-display text-lg text-espresso">{c.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-mist">{c.detail}</p>
                      <span
                        className={`mt-3 inline-block rounded-full border px-2.5 py-1 text-[10px] font-semibold ${meta.border} ${meta.bg} ${meta.text}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* mobile vertical */}
          <div className="relative space-y-6 md:hidden">
            <div className="absolute bottom-4 left-[18px] top-4 w-px bg-sand-deep/40" />
            {drift.map((c, i) => {
              const meta = STATUS_META[c.status];
              const Icon = KIND_ICON[c.kind];
              return (
                <Reveal key={c.hash} delay={i * 0.1}>
                  <div className="relative flex gap-4">
                    <span
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-cream ${meta.border}`}
                    >
                      <Icon size={15} className={meta.text} />
                    </span>
                    <div>
                      <span
                        className="text-[10px] uppercase tracking-[0.14em] text-mist"
                        style={{ fontFamily: MONO_STACK }}
                      >
                        {c.date} · {c.hash}
                      </span>
                      <p className="mt-1 font-display text-lg text-espresso">{c.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-mist">{c.detail}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
