'use client';
import { useState } from 'react';
import { BookingModal } from './BookingModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-cream text-espresso">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e6d9c6_70%,#f5efe6_100%)]" />
      <div className="absolute inset-0 bg-blob bg-blob-1" />
      <div className="absolute inset-0 bg-blob bg-blob-2" />
      <div className="absolute inset-0 bg-blob bg-blob-3" />
      <div className="absolute inset-0 bg-noise" />

      <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-white/60 px-4 py-1.5 text-xs font-medium tracking-wide text-clay">
      <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          BAA on request · PHI-minimized · No migration
        </span>

        <h1 className="mt-8 font-serif text-4xl leading-[1.1] tracking-tight text-espresso sm:text-6xl">
          We auto-fill your no-shows and late cancels{" "}
          <span className="text-clay">from your waitlist</span> — you keep the revenue.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-espresso/70">
          Scrutexity connects to your Boulevard, Zenoti, or Mangomint and fills
          canceled appointments automatically — 14-day pilot.{" "}
          <span className="font-semibold text-espresso">If we don't fill chairs, you don't pay.</span>
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => setIsModalOpen(true)}
            className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all rounded-full px-7 py-3.5 text-sm font-semibold transition duration-200"
          >
            Email me my leak report →
          </button>
          <a href="#pilot" className="text-sm font-medium text-espresso/60 underline-offset-4 hover:text-espresso hover:underline">
            How the 14-day pilot works
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-espresso/50">
          {["BAA on request", "PHI-minimized", "No migration", "You own it forever"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="text-clay">✓</span> {t}
            </li>
          ))}
        </ul>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
