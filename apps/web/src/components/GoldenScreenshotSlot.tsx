'use client';

import { Camera, ShieldCheck } from 'lucide-react';
import { Reveal } from './Reveal';

/**
 * GoldenScreenshotSlot — Placeholder for the real Boulevard ledger screenshot.
 *
 * This component is designed to be REPLACED, not kept. The moment a pilot
 * lead sends a redacted screenshot of a SCX-RECOVERED appointment with a
 * Stripe deposit note, this entire component gets deleted and replaced with
 * an <img> tag pointing to the real image.
 *
 * Until then, it signals "we have nothing to hide — the screenshot is coming."
 */

export default function GoldenScreenshotSlot() {
  return (
    <Reveal>
      <div className="rounded-[1.75rem] border-2 border-dashed border-clay/30 bg-cream p-8 md:p-12 text-center">
        <div className="mx-auto max-w-md">
          {/* Camera icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-clay/8">
            <Camera className="h-8 w-8 text-clay" />
          </div>

          <h3 className="font-display text-xl text-espresso mb-2">
            Real Screenshot — Pending Pilot Data
          </h3>

          <p className="text-[14px] leading-7 text-mist mb-6">
            This space will be replaced with a raw, redacted screenshot of an actual Boulevard
            appointment created by Scrutexity — showing the SCX-RECOVERED tag, the Stripe
            Transaction ID, and the confirmed booking at 2:00 AM on a Sunday.
          </p>

          {/* What the screenshot will show */}
          <div className="rounded-xl bg-[#f3eadf] p-5 text-left space-y-2 mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-clay-deep">
              The Screenshot Will Show:
            </p>
            <ul className="space-y-1.5">
              {[
                'Appointment title: "Morpheus8 — Full Face (SCX-RECOVERED)"',
                'Status badge: Confirmed (green)',
                'Date/Time: Saturday 2:17 AM or Sunday 11:42 PM',
                'Notes field: "$150.00 Deposit Captured via Stripe. Transaction ID: ch_3M..."',
                'Patient name redacted. All other data visible.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-mist">
                  <ShieldCheck className="h-3.5 w-3.5 text-clay mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[11px] text-[#9e8e7e] italic">
            This placeholder exists by design. We don&apos;t use mockups to sell infrastructure.
            The real screenshot is in the pilot lead&apos;s inbox. It arrives this week.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
