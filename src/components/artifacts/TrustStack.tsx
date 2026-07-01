'use client';

/**
 * TrustStack — vertical architecture diagram.
 * Website → Claims → Evidence → Verification → Monitoring → AI Answers →
 * Revenue. Reads as an enterprise stack, but warm: dark-brown + sage.
 */

import { Globe, FileText, BookOpen, BadgeCheck, Radar, Sparkles, TrendingUp } from 'lucide-react';
import { ArtifactHeading, Reveal, BlueprintGrid, MONO_STACK } from './_shared';

const LAYERS = [
  { label: 'Website', desc: 'Where claims live', Icon: Globe },
  { label: 'Claims', desc: 'What you assert', Icon: FileText },
  { label: 'Evidence', desc: 'What backs it', Icon: BookOpen },
  { label: 'Verification', desc: 'Sealed receipts', Icon: BadgeCheck },
  { label: 'Monitoring', desc: 'Drift detection', Icon: Radar },
  { label: 'AI Answers', desc: 'How engines cite you', Icon: Sparkles },
  { label: 'Revenue', desc: 'Trust that converts', Icon: TrendingUp },
];

export default function TrustStack() {
  return (
    <section className="relative overflow-hidden border-t border-sand-deep/15 bg-espresso px-5 py-24 text-cream sm:px-8 md:py-32">
      <BlueprintGrid dark />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <ArtifactHeading
            tone="dark"
            kicker="The Trust Stack"
            title="Every layer rests on"
            italic="the one beneath it."
            body="Revenue sits on AI answers, which sit on monitoring, which sits on verified evidence. Pull out the evidence layer and the whole stack wobbles."
            className="mx-auto text-center"
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-md space-y-2.5">
          {LAYERS.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.08}>
              <div
                className="flex items-center gap-4 rounded-xl border border-cream/12 bg-cream/[0.05] px-5 py-4 backdrop-blur transition-colors hover:border-sage-soft/35 hover:bg-cream/[0.08]"
                style={{ marginLeft: `${i * 4}px`, marginRight: `${i * 4}px` }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sage-soft/15 text-sage-soft">
                  <l.Icon size={16} />
                </span>
                <div className="flex-1">
                  <p className="font-display text-lg leading-none text-cream">{l.label}</p>
                  <p className="mt-1 text-xs text-cream/55">{l.desc}</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-cream/35" style={{ fontFamily: MONO_STACK }}>
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
