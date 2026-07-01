import Image from 'next/image';

export default function ConsultationRecovery() {
  return (
    <section id="platform" className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto bg-ivory">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: The High-Ticket Consultation Image */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[650px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/40">
          <Image 
            src="/simple.webp"
            alt="High-ticket medical aesthetics consultation in a premium NYC clinic"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-terracotta/5 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Right: The Engine Copy & Phantom Receipt UI */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <span className="text-terracotta font-sans font-semibold tracking-[0.15em] text-sm uppercase mb-4">
            Consultation Recovery Engine
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
            Never lose a $3,000 treatment to a missed call again.
          </h2>
          <p className="font-sans text-lg text-charcoal/70 mb-10 leading-relaxed">
            When a high-net-worth patient inquires about Morpheus8 or injectables after hours, your front desk is closed. Our infrastructure instantly engages them, answers clinical questions, and secures the booking directly into your calendar.
          </p>

          {/* Phantom Revenue Receipt */}
          <div className="w-full max-w-md bg-white/60 backdrop-blur-md border border-charcoal/10 rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-charcoal/10 pb-4">
              <span className="font-sans font-semibold text-charcoal">Recovered This Month</span>
              <span className="text-[10px] text-charcoal/50 uppercase tracking-[0.2em] font-semibold border border-charcoal/10 px-2 py-1 rounded">Automated</span>
            </div>
            
            <div className="space-y-4 font-sans text-sm text-charcoal/80 mb-8">
              <div className="flex justify-between items-center">
                <span>4x Morpheus8 Packages</span>
                <span className="font-medium">$14,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>6x Dermal Filler Syringes</span>
                <span className="font-medium">$5,400</span>
              </div>
              <div className="flex justify-between items-center">
                <span>2x Emsculpt NEO Series</span>
                <span className="font-medium">$9,000</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end font-display pt-6 border-t border-charcoal/10">
              <span className="text-lg text-charcoal/80">Leaked Revenue Captured</span>
              <span className="text-3xl text-terracotta font-semibold">$28,400</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
