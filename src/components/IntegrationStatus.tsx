'use client';

/**
 * Honest integration status. Flags reflect production reality only.
 * Update `status` here when a real read-only connection ships.
 */

type Status = 'live' | 'beta' | 'roadmap';

const STATUS_META: Record<Status, { label: string; dot: string; text: string }> = {
  live: { label: 'Live', dot: 'bg-verified', text: 'text-verified' },
  beta: { label: 'Beta', dot: 'bg-clay', text: 'text-clay' },
  roadmap: { label: 'Roadmap', dot: 'bg-charcoal/30', text: 'text-espresso/55' },
};

const INTEGRATIONS: { name: string; note: string; status: Status }[] = [
  { name: 'Boulevard', note: 'Read-only consult + booking comparison', status: 'beta' },
  { name: 'Mangomint', note: 'Read-only consult + booking comparison', status: 'beta' },
  { name: 'Zenoti', note: 'Mixed-stack portfolios, by exception', status: 'roadmap' },
];

export default function IntegrationStatus({ heading = true }: { heading?: boolean }) {
  return (
    <section id="platform" className="bg-cream-2 px-7 py-28">
      <div className="mx-auto max-w-6xl">
        {heading && (
          <div className="mb-12 max-w-[52ch]">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
              Integration ecosystem
            </span>
            <h2 className="mt-3 font-serif text-[1.9rem] font-medium leading-tight sm:text-[2.6rem]">
              We sit on top of the platforms you already run.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-espresso/70">
              Read-only by design — no migration, no rip-and-replace. Status reflects what is in
              production today, not a roadmap dressed up as a promise.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {INTEGRATIONS.map((it) => {
            const m = STATUS_META[it.status];
            return (
              <div
                key={it.name}
                className="rounded-2xl border border-line bg-warm-card p-7 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[1.35rem] font-medium text-espresso">
                    {it.name}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 font-mono text-[0.74rem] ${m.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
                    {m.label}
                  </span>
                </div>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-espresso/65">{it.note}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 max-w-[60ch] font-mono text-[0.74rem] leading-relaxed text-espresso/55">
          A platform is marked Live only when a read-only connection is running in production. Need a
          stack we don&apos;t list yet? <a href="/company#hiring" className="text-clay underline underline-offset-2">Talk to us.</a>
        </p>
      </div>
    </section>
  );
}
