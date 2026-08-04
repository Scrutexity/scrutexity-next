'use client';

export default function PixelShield() {
  return (
    <section className="py-16 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl text-espresso mb-4">
          The Pixel Compliance Airlock
        </h2>
        <p className="font-sans text-espresso/70 max-w-2xl mx-auto">
          How we protect your clinic from FTC tracking fines while maintaining highly profitable Meta and Google ad campaigns.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* The Old Way */}
        <div className="p-8 rounded-2xl bg-white/70 border border-red-900/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
            </div>
            <h3 className="font-sans font-semibold text-lg text-espresso">
              Standard Agency Setup <span className="text-red-500 text-sm">(High Risk)</span>
            </h3>
          </div>
          
          <ul className="space-y-4 font-sans text-sm text-espresso/80">
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold shrink-0">✕</span>
              Meta/Google pixels installed directly on your website
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold shrink-0">✕</span>
              Patient IP, names, and treatment interests sent directly to Facebook
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold shrink-0">✕</span>
              Direct violation of HHS guidelines — high privacy exposure
            </li>
          </ul>
        </div>

        {/* The Scrutexity Way */}
        <div className="p-8 rounded-2xl bg-[#6B8576]/5 border border-[#6B8576]/20 backdrop-blur-sm shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#6B8576]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#6B8576]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 className="font-sans font-semibold text-lg text-espresso">
              Scrutexity Infrastructure <span className="text-[#6B8576] text-sm">(BAA-Ready)</span>
            </h3>
          </div>
          
          <ul className="space-y-4 font-sans text-sm text-espresso/80">
            <li className="flex items-start gap-3">
              <span className="text-[#6B8576] font-bold shrink-0">✓</span>
              Pixels removed from your front-end site entirely
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#6B8576] font-bold shrink-0">✓</span>
              Data hits Scrutexity encrypted server first — PHI stripped before forwarding
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#6B8576] font-bold shrink-0">✓</span>
              Anonymized server-side conversion signals (CAPI) keep your ROAS high
            </li>
          </ul>
        </div>
      </div>

      {/* Trust badges row */}
      <div className="flex flex-wrap justify-center gap-4 mt-12">
        {['BAA Provided', 'SOC 2 audit in progress', 'AES-256 Encrypted', 'Privacy-First Ad Workflows'].map(badge => (
          <div key={badge} className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 border border-charcoal/10 rounded-full text-xs font-semibold text-espresso/70 font-sans">
            <svg className="w-3.5 h-3.5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}
