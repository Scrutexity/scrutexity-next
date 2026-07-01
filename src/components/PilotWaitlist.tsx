'use client';

/**
 * PilotWaitlist — Real waitlist, not fictional.
 *
 * Displays: number of clinics in queue, estimated wait time,
 * and a CTA to join. All numbers are real and updated manually
 * until automation is built.
 *
 * Usage: <PilotWaitlist position={4} waitDays={14} />
 */

import { Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PilotWaitlistProps {
  position: number;        // queue position for new applicants
  waitDays: number;        // estimated wait in days
  totalQueue: number;      // total clinics in queue
  className?: string;
}

export default function PilotWaitlist({
  position,
  waitDays,
  totalQueue,
  className = '',
}: PilotWaitlistProps) {
  return (
    <div
      className={`rounded-2xl border border-[#e1d4c5] bg-[#fffaf2] p-6 ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-terracotta animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b6a51]">
          Pilot Queue Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="rounded-xl bg-[#fbf7ef] p-4 text-center">
          <Users className="mx-auto mb-2 h-5 w-5 text-terracotta" />
          <p className="font-mono text-2xl font-semibold text-[#221f1b]">
            {totalQueue}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-[#7a7066]">
            Clinics in queue
          </p>
        </div>
        <div className="rounded-xl bg-[#fbf7ef] p-4 text-center">
          <Clock className="mx-auto mb-2 h-5 w-5 text-terracotta" />
          <p className="font-mono text-2xl font-semibold text-[#221f1b]">
            ~{waitDays}d
          </p>
          <p className="text-[10px] uppercase tracking-widest text-[#7a7066]">
            Est. wait time
          </p>
        </div>
      </div>

      <p className="text-sm leading-6 text-[#5f574f] mb-4">
        We only onboard {position} new clinic{position !== 1 ? 's' : ''} per cohort.
        Next available slot: <span className="font-semibold text-[#221f1b]">~{waitDays} days</span>.
      </p>

      <Link
        href="/pilot"
        className="govbtn flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition"
      >
        Join the queue
        <ArrowRight className="h-4 w-4" />
      </Link>

      <p className="mt-3 text-center text-[10px] text-[#9b9085]">
        Applications reviewed within 24 hours. Not every clinic qualifies.
      </p>
    </div>
  );
}
