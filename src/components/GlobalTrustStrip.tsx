import Link from 'next/link';

const signals = [
  'Claims-first governance',
  'Clinical questions escalate',
  'Read-only bridge',
];

export default function GlobalTrustStrip() {
  return (
    <div className="border-b border-[#d8c9b7] bg-[#f3eadf] px-4 py-2.5 text-[#514a43]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[11px]">
        {signals.map((signal, index) => (
          <span key={signal} className="inline-flex items-center gap-3">
            {index > 0 && <span className="text-clay" aria-hidden="true">·</span>}
            {signal}
          </span>
        ))}
        <Link href="/what-we-do" className="ml-1 text-[#8a533b] underline underline-offset-4 hover:text-[#5f3020]">
          See the boundary
        </Link>
      </div>
    </div>
  );
}
