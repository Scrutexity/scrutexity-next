'use client';

const STATUS_FIELDS = [
  { label: 'Archive Status', value: '20-domain validation set initializing' },
  { label: 'Pattern Registry', value: 'FTC · FDA · AG · platform claim signals' },
  { label: 'Observation Mode', value: 'Public pages only' },
];

export function CensusCounter() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 w-full max-w-5xl mx-auto p-6 items-center">
      <div>
        <span className="font-mono text-[10px] text-sage-deep uppercase tracking-wider">Historical Moat</span>
        <h2 className="font-display text-4xl md:text-5xl text-espresso mt-2">
          Longitudinal Claim Archive
        </h2>
        <p className="mt-4 text-sm text-mist leading-relaxed max-w-md">
          Scrutexity is initializing the public-claim archive from a controlled validation set before
          publishing any aggregate observation count.
        </p>
      </div>

      <div className="rounded-lg border border-sand-deep/30 bg-bone/70 p-5">
        <span className="font-mono text-[9px] text-mist/60 uppercase tracking-widest border-b border-sand-deep/20 pb-3 block">
          Registry Initialization
        </span>

        <div className="mt-4 divide-y divide-sand-deep/20">
          {STATUS_FIELDS.map((field) => (
            <div key={field.label} className="grid gap-1 py-4 first:pt-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-mist/60">
                {field.label}
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-espresso">
                {field.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
