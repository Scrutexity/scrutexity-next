'use client';

import { ShieldCheck } from 'lucide-react';

const trustItems = ['BAA on request', 'Read-only access', 'No migration', 'Works beside Boulevard / Mangomint / Zenoti'];

export default function TrustRail() {
  return (
    <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-clay/30 bg-pine/80 px-3 py-3 text-center shadow-[var(--border-glow)] backdrop-blur-md sm:gap-3 sm:px-4">
      {trustItems.map((item) => (
        <div
          key={item}
          className="inline-flex items-center gap-1.5 rounded-full border border-clay/20 bg-bone/10 px-3 py-1.5 text-[11px] font-semibold leading-none text-porcelain sm:text-xs"
        >
          <ShieldCheck size={13} className="text-clay" />
          {item}
        </div>
      ))}
    </div>
  );
}
