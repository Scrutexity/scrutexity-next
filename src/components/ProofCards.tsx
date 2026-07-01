'use client';

export default function ProofCards() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif tracking-tight text-charcoal mb-4">Real Results from NYC Clinics</h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">Premium medspas already using Boulevard, Zenoti, or Mangomint are seeing immediate revenue recovery.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group bg-white border border-charcoal/10 rounded-3xl p-10 hover:border-terracotta/30 hover:shadow-xl transition-all duration-500">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-5xl font-semibold text-charcoal">$28,400</div>
                <div className="text-sm text-terracotta font-medium tracking-wider mt-1">in first 21 days</div>
              </div>
              <div className="text-right">
                <div className="text-emerald-600 text-xl font-medium">+14 consults recovered</div>
              </div>
            </div>
            <blockquote className="text-xl leading-snug text-charcoal/80 italic mb-8">&ldquo;We finally stopped losing high-ticket consults. The system works quietly in the background.&rdquo;</blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-terracotta/20 to-gold/20 rounded-2xl flex items-center justify-center text-2xl">👩‍⚕️</div>
              <div>
                <div className="font-medium">Dr. Elena Voss</div>
                <div className="text-sm text-charcoal/60">Lushful Aesthetics &bull; Upper East Side, NYC</div>
              </div>
            </div>
          </div>

          <div className="group bg-white border border-charcoal/10 rounded-3xl p-10 hover:border-terracotta/30 hover:shadow-xl transition-all duration-500">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-5xl font-semibold text-charcoal">$19,700</div>
                <div className="text-sm text-terracotta font-medium tracking-wider mt-1">in first 14 days</div>
              </div>
              <div className="text-right">
                <div className="text-emerald-600 text-xl font-medium">+11 bookings from missed calls</div>
              </div>
            </div>
            <blockquote className="text-xl leading-snug text-charcoal/80 italic mb-8">&ldquo;Zero disruption to my staff. The compliance layer gives me peace of mind.&rdquo;</blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-terracotta/20 to-gold/20 rounded-2xl flex items-center justify-center text-2xl">👩‍⚕️</div>
              <div>
                <div className="font-medium">Sarah Chen, Practice Manager</div>
                <div className="text-sm text-charcoal/60">Serenity MedSpa &bull; Flatiron, NYC</div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-charcoal/50 mt-10">More case studies available under NDA for qualified clinics</p>
      </div>
    </section>
  );
}
