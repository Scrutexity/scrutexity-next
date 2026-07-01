'use client';

const tiers = [
  { name: 'Recovery', price: 2000, tag: 'Plug the biggest leak', items: ['Consultation Recovery', 'Booking Layer'], featured: false },
  { name: 'Growth', price: 2700, tag: 'Recover + get found by AI search', items: ['Everything in Recovery', 'AI Visibility'], featured: true },
  { name: 'Sovereign', price: 3900, tag: 'Full owned infrastructure', items: ['Everything in Growth', 'Compliance Shield', 'Priority owner brief'], featured: false },
];

export default function PricingTiers() {
  return (
    <section id="pricing" className="bg-[#f3eadf] px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto text-center">
          <p className="section-kicker">Transparent pricing</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[#221f1b] md:text-5xl">You pay for what we install. Not for what we promise.</h2>
        </div>

        <div className="mt-14 rounded-[1.75rem] border border-[#e1d4c5] bg-[#fffaf2]/80 p-8 shadow-[0_18px_50px_rgba(85,62,41,0.07)] text-center">
          <p className="font-display text-2xl text-[#221f1b] mb-4">Calibration first. Infrastructure starts at ~$2k/mo per location. Portfolio pricing available for groups with 5+ locations.</p>
          <p className="text-[#5f574f] text-sm leading-relaxed max-w-xl mx-auto">
            We don&apos;t take a dollar of recurring revenue until we&apos;ve first shown you a verified record of your demand. Implementation, infrastructure, and optional attestation are quoted as separate line items.
          </p>
          <a href="/pricing" className="mt-6 inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/5 px-5 py-2.5 text-sm font-semibold text-[#9b6a51] transition-colors hover:bg-terracotta/10">
            See full pricing &amp; tiers →
          </a>
        </div>
      </div>
    </section>
  );
}
