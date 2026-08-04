'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import HolographicDataCard from '@/components/HolographicDataCard';

const layers = [
  {
    id: 'recovery',
    title: 'Recovery',
    accent: '#B87D6B',
    desc: 'Real-time capture of every lost lead',
    cards: [
      {
        metric: '35%',
        label: 'Missed calls recovered by rapid AI reply',
        ledgerContext:
          "Zenoti's benchmark data shows AI receptionists recover 35% of missed calls. Scrutexity delivers this without migration.",
      },
      {
        metric: '$1.7k+',
        label: 'Recovered monthly revenue per location',
        ledgerContext:
          'At $484 average ticket and 10 missed calls/week, recovered calls alone generate $1,700+/month.',
      },
    ],
  },
  {
    id: 'reactivation',
    title: 'Reactivation',
    accent: '#8F6A5B',
    desc: 'Dormant clients brought back to life',
    cards: [
      {
        metric: '2-3x',
        label: 'Additional lift from dormant leads',
        ledgerContext:
          'Dormant consult threads and past inquiries add 2-3x beyond recovered calls when timed follow-up sequences are active.',
      },
      {
        metric: '90 sec',
        label: 'AI reply window before intent cools',
        ledgerContext:
          'Fast first response preserves booking intent while routing clinical questions back to licensed staff.',
      },
    ],
  },
  {
    id: 'retention',
    title: 'Retention',
    accent: '#2F5D4A',
    desc: 'Compounding loyalty and lifetime value',
    cards: [
      {
        metric: 'Real-time',
        label: 'Median response time after activation',
        ledgerContext:
          'Scrutexity routes after-hours inquiries to staff within seconds. Speed-to-lead is the #1 predictor of conversion.',
      },
      {
        metric: 'Ledger',
        label: 'Every recovered thread is provable',
        ledgerContext:
          'Scrutexity preserves source, timestamp, reply, booking, and deposit context so recovered revenue can be audited.',
      },
    ],
  },
];

export default function LayerReveal() {
  const [activeLayer, setActiveLayer] = useState('recovery');
  const current = layers.find((layer) => layer.id === activeLayer) ?? layers[0];

  return (
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 lg:gap-16">
      <div className="self-start md:sticky md:top-24 md:col-span-4">
        <div className="font-jetbrains mb-6 text-xs uppercase tracking-[0.18em] text-[#5d7475]">
          The Neural System
        </div>
        {layers.map((layer) => (
          <button
            key={layer.id}
            type="button"
            onClick={() => setActiveLayer(layer.id)}
            className={`group mb-3 flex w-full items-center gap-5 rounded-lg px-5 py-5 text-left transition-all sm:px-7 sm:py-6 ${
              activeLayer === layer.id
                ? 'bg-white shadow-[0_24px_70px_-42px_rgba(11,82,91,0.5)]'
                : 'hover:bg-white/55'
            }`}
          >
            <div className="font-space-grotesk text-4xl font-light text-[#c9d8d3] transition-colors group-hover:text-[#9eb9b2]">
              {layer.title[0]}
            </div>
            <div>
              <div
                className="font-space-grotesk text-2xl font-semibold tracking-normal"
                style={{ color: activeLayer === layer.id ? layer.accent : '#062b2f' }}
              >
                {layer.title}
              </div>
              <div className="mt-1 text-sm leading-6 text-[#5d7475]">{layer.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="md:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.38 }}
            className="rounded-lg border border-[#d9e5df] bg-white p-6 shadow-[0_28px_80px_-48px_rgba(11,82,91,0.45)] sm:p-10 lg:p-12"
          >
            <div className="font-jetbrains mb-3 text-xs uppercase tracking-[0.18em]" style={{ color: current.accent }}>
              Layer {layers.findIndex((layer) => layer.id === activeLayer) + 1}
            </div>
            <h3
              className="font-space-grotesk mb-5 text-4xl font-semibold tracking-normal sm:text-6xl"
              style={{ color: current.accent }}
            >
              {current.title}
            </h3>
            <p className="mb-10 max-w-lg text-lg leading-8 text-[#4b6265] sm:mb-14 sm:text-xl">{current.desc}</p>

            <div className="grid gap-5">
              {current.cards.map((card) => (
                <HolographicDataCard key={`${current.id}-${card.metric}`} {...card} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
