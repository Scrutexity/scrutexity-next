'use client';
import { useState } from 'react';
import { BookingModal } from './BookingModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-ivory text-charcoal">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e6d9c6_70%,#f5efe6_100%)]" />
      <div className="absolute inset-0 bg-blob bg-blob-1" />
      <div className="absolute inset-0 bg-blob bg-blob-2" />
      <div className="absolute inset-0 bg-blob bg-blob-3" />
      <div className="absolute inset-0 bg-noise" />

      <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/20 bg-white/60 px-4 py-1.5 text-xs font-medium tracking-wide text-terracotta">
      <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
          BAA-ready · No PHI exposure · No migration
        </span>

        <h1 className="mt-8 font-serif text-4xl leading-[1.1] tracking-tight text-charcoal sm:text-6xl">
          We auto-fill your no-shows and late cancels{" "}
          <span className="text-terracotta">from your waitlist</span> — you keep the revenue.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-charcoal/70">
          Scrutexity connects to your Boulevard, Zenoti, or Mangomint and fills
          canceled appointments automatically — 14-day pilot.{" "}
          <span className="font-semibold text-charcoal">If we don't fill chairs, you don't pay.</span>
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => setIsModalOpen(true)}
            className="govbtn rounded-full px-7 py-3.5 text-sm font-semibold transition duration-200"
          >
            Email me my leak report →
          </button>
          <a href="#pilot" className="text-sm font-medium text-charcoal/60 underline-offset-4 hover:text-charcoal hover:underline">
            How the 14-day pilot works
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-charcoal/50">
          {["BAA-ready", "Zero PHI exposure", "No migration", "You own it forever"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="text-terracotta">✓</span> {t}
            </li>
          ))}
        </ul>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
