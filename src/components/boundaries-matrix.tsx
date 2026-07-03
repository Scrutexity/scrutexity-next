export function BoundariesMatrix() {
  const boundaries = [
    {
      domain: 'Legal & Regulatory',
      status: 'OUT OF SCOPE',
      active: false,
      description:
        'Outputs are structured public-claim review records. They are not legal opinions, regulatory findings, or compliance advice.',
    },
    {
      domain: 'Clinical Accuracy',
      status: 'OUT OF SCOPE',
      active: false,
      description:
        'We index public language and visible proof gaps. We do not evaluate medical efficacy, clinical outcomes, or standard of care.',
    },
    {
      domain: 'Underwriting Decisions',
      status: 'OUT OF SCOPE',
      active: false,
      description:
        'Records are designed to sit beside institutional review materials, not to replace actuarial judgment or diligence advisors.',
    },
    {
      domain: 'Public Claim Indexing',
      status: 'IN SCOPE',
      active: true,
      description:
        'Deterministic structuring of visible public claims, proof artifacts, and language drift over time via read-only architecture.',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl py-16">
      <div className="mb-8 flex items-baseline justify-between border-b border-sand-deep pb-4">
        <h2 className="font-display text-3xl text-espresso">
          Operating Boundaries
        </h2>
        <span className="font-mono text-xs uppercase tracking-widest text-mist">
          Scope Definition
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {boundaries.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-xl border p-6 transition-colors duration-300 ${
              item.active
                ? 'border-clay/30 bg-bone'
                : 'border-sand-deep bg-cream'
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg text-espresso">
                {item.domain}
              </h3>
              <span
                className={`rounded-md px-2 py-1 font-mono text-xs ${
                  item.active
                    ? 'bg-clay/10 text-clay'
                    : 'bg-sand-deep/30 text-mist'
                }`}
              >
                [{item.status}]
              </span>
            </div>
            <p className="text-sm leading-relaxed text-sage-deep">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
