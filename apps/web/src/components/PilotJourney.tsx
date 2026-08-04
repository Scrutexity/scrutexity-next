'use client';

const steps = [
  { day: "Day 1", title: "Revenue Leak Audit", desc: "We analyze missed calls, stale inquiries, AI search gaps, and pixel compliance risk.", icon: "01" },
  { day: "Days 2–3", title: "Quiet, Read-Only Install", desc: "BAA executed. Secure integration with your existing system (Boulevard, Zenoti, or Mangomint).", icon: "02" },
  { day: "Days 4–10", title: "Active Recovery", desc: "AI reactivation + treatment funnel runs in background. You see live recovered bookings.", icon: "03" },
  { day: "Days 11–14", title: "Recovery Brief & Ownership", desc: "Full report delivered. You keep permanent infrastructure. Pay only if results are delivered.", icon: "04" },
];

export default function PilotJourney() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif tracking-tight text-espresso mb-4">Your 14-Day Revenue Recovery Sprint</h2>
          <p className="text-xl text-espresso/70">What actually happens after you request the audit</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-white rounded-3xl p-10 border border-white/60 group hover:border-clay/30 transition-all">
              <div className="font-mono text-clay font-bold text-2xl mb-4 opacity-60 group-hover:opacity-100 transition-all">{step.icon}</div>
              <div className="font-mono text-clay text-sm tracking-widest mb-3">{step.day}</div>
              <h3 className="text-2xl font-semibold text-espresso mb-4">{step.title}</h3>
              <p className="text-espresso/70 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-terracotta/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
