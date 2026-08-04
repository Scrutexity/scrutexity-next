'use client';

export default function DashboardMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-charcoal text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-creammerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium tracking-wider">LIVE RECOVERY</span>
          </div>
          <span className="text-xs opacity-70">Week 1 &bull; UES Clinic</span>
        </div>

        <div className="p-8 grid grid-cols-2 gap-6">
          <div>
            <div className="text-4xl font-semibold text-espresso mb-1">14</div>
            <div className="text-sm text-espresso/70">Consults Recovered</div>
            <div className="text-emerald-600 text-xs mt-1 font-medium">&uarr; 92% capture rate</div>
          </div>
          <div>
            <div className="text-4xl font-semibold text-espresso mb-1">$28.4K</div>
            <div className="text-sm text-espresso/70">Revenue Recovered</div>
            <div className="text-emerald-600 text-xs mt-1 font-medium">This month</div>
          </div>
        </div>

        <div className="border-t border-white/60 bg-white/50 px-6 py-5 text-xs">
          <div className="flex justify-between mb-3">
            <span className="text-espresso/70">Yesterday</span>
            <span className="text-emerald-600 font-medium">3 booked &bull; $4,200</span>
          </div>
          <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-terracotta to-gold rounded-full" />
        </div>
      </div>

      <div className="absolute -top-4 -right-4 bg-white shadow-xl rounded-2xl px-5 py-3 text-center border border-white/70">
        <div className="text-emerald-600 text-sm font-semibold">+11 bookings</div>
        <div className="text-[10px] text-espresso/60 -mt-0.5">this week</div>
      </div>
    </div>
  );
}
