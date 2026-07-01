import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify | Scrutexity',
  description: 'How Scrutexity verification records work. Sample demonstration — real records appear when pilot owners consent to go on record.',
};

export default function VerifyPage() {
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#FBF7EF] text-[#221F1B] p-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="border-b border-[#221F1B]/10 pb-8 mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B9825F] mb-4">Verification Records</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
            How verification works
          </h1>
          <p className="text-[#221F1B]/70 text-lg max-w-2xl">
            Every Scrutexity pilot produces an independently auditable record of surfaced demand.
            Every entry is timestamped and locked so you can verify every recovered dollar yourself in under 60 seconds.
          </p>
          <div className="text-xs text-amber-700 mt-6 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            DEMO RECORD — NO LIVE CLIENT DATA DISPLAYED
          </div>
        </header>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[#221F1B]/50 mb-6 font-semibold">The verification mechanism</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#221F1B]/10 p-8 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-amber-700 text-sm font-semibold">APPEND-ONLY</div>
                  <div className="font-serif text-2xl mt-2 text-[#221F1B]">Tamper-Evident Ledger</div>
                </div>
                <div className="text-5xl text-amber-600/20 font-serif">→</div>
              </div>
              <p className="text-[#221F1B]/60 mt-8 text-sm leading-relaxed">
                Each surfaced consult is logged with a timestamp and content hash. Records cannot be altered retroactively without breaking the chain.
              </p>
            </div>

            <div className="bg-white border border-[#221F1B]/10 p-8 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-amber-700 text-sm font-semibold">INDEPENDENT</div>
                  <div className="font-serif text-2xl mt-2 text-[#221F1B]">Self-Verifiable</div>
                </div>
                <div className="text-5xl text-amber-600/20 font-serif">🔍</div>
              </div>
              <p className="text-[#221F1B]/60 mt-8 text-sm leading-relaxed">
                You verify the record yourself — no dashboard required. The hash and timestamp are all you need to confirm integrity.
              </p>
            </div>
          </div>
        </section>

        {/* Sample Record */}
        <section className="bg-white border border-[#221F1B]/10 p-10 rounded-2xl shadow-sm mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="px-4 py-1.5 bg-amber-50 text-amber-800 text-sm font-semibold rounded-full border border-amber-100">SAMPLE</div>
            <h3 className="font-serif text-2xl text-[#221F1B]">What a verification record looks like</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="font-serif text-5xl text-[#221F1B]">—</div>
              <div className="text-xs uppercase tracking-wide text-[#221F1B]/50 mt-2 font-semibold">Records Verified (live data pending)</div>
            </div>
            <div>
              <div className="font-serif text-5xl text-amber-600">SAMPLE</div>
              <div className="text-xs uppercase tracking-wide text-[#221F1B]/50 mt-2 font-semibold">Status (demo)</div>
            </div>
            <div>
              <div className="font-serif text-5xl text-[#221F1B]">—</div>
              <div className="text-xs uppercase tracking-wide text-[#221F1B]/50 mt-2 font-semibold">Avg Operational Score</div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#221F1B]/10 text-xs text-[#221F1B]/50 leading-relaxed">
            <strong className="text-[#221F1B]/70 block mb-1">Note:</strong>
            This is a structural demonstration. Live verification records will populate here once pilot owners consent to go on record. 
            Operational verification only. Not financial, medical, legal, or insurance advice.
          </div>
        </section>

        {/* Access Request */}
        <section className="text-center border-2 border-dashed border-[#221F1B]/20 p-12 rounded-3xl">
          <p className="text-xl text-[#221F1B]/80 max-w-md mx-auto font-serif">
            Want to see how a real verification record works? Start a pilot and audit the ledger yourself.
          </p>
          <a 
            href="/pilot"
            className="govbtn inline-flex items-center gap-2 rounded-full mt-8 px-10 py-4 font-semibold transition duration-300"
          >
            START THE 14-DAY PILOT →
          </a>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-center text-xs text-[#221F1B]/40">
          <p>Scrutexity Infrastructure • New York, NY • All rights reserved</p>
          <p className="mt-2">Version-controlled assets • Last updated: {currentDate}</p>
        </footer>
      </div>
    </div>
  );
}
