'use client';

/* Dismissible Phase 1 design-partner banner. Budget: localStorage read, one 36px band, no animation loop. */
import Link from 'next/link';
import { X } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'scx_design_partner_banner_dismissed';

export default function PreCaseStudyBanner() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const visible = dismissed !== 'true';

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, 'true');
    window.dispatchEvent(new Event(STORAGE_KEY));
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="sticky top-0 z-[60] border-b border-sand-deep bg-[#f4ede0] text-espresso">
      <div className="relative mx-auto flex min-h-9 max-w-7xl items-center justify-center gap-3 px-10 py-2 text-center text-[11px] leading-5 sm:text-xs">
        <span className="font-bold uppercase tracking-[0.14em] text-clay-deep">Now accepting 3 design partners.</span>
        <span className="hidden h-3 w-px bg-[#d8c9b7] sm:block" aria-hidden="true" />
        <span>
          $0 for 30 days. If we generate $2,000 in deposit-captured bookings, you continue at flat $2,000/mo. If not, we disconnect and you pay nothing. You keep every ledger entry regardless.
        </span>
        <Link href="/pilot" className="shrink-0 font-semibold text-[#8a533b] underline underline-offset-4 hover:text-[#5f3020]">
          Apply →
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss design partner banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-mist transition-colors hover:bg-[#e1d4c5]/70 hover:text-espresso"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(STORAGE_KEY, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(STORAGE_KEY, callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return 'true';
}
