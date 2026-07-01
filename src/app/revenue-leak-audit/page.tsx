import Link from 'next/link';
import RevenueBridge from '@/components/RevenueBridge';

export const metadata = {
  title: 'Revenue Leak Audit | Scrutexity',
  description: 'Estimate your missed-demand opportunity range — directional, requires verification. 14-day pilot, $0 if missed-demand recovery isn\'t demonstrated.',
};

export default function RevenueLeakAuditPage() {
  return (
    <div className="min-h-screen bg-ivory text-[#221f1b] font-sans">
      <main className="px-5 pb-24 pt-12 sm:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-10">
          <RevenueBridge />

          <div className="w-full max-w-2xl rounded-[1.75rem] border border-[#e1d4c5] bg-[#fffaf2] p-8 text-center shadow-[0_8px_32px_rgba(85,62,41,0.07)]">
            <h3 className="font-display text-2xl text-[#221f1b] mb-3">See if your clinic qualifies</h3>
            <p className="text-[#6b6259] mb-7 text-sm leading-7">
              Our 14-day pilot activation seals these leaks. $0 if missed-demand recovery isn&rsquo;t demonstrated.
            </p>
            <Link
              href="/pilot"
              className="govbtn inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition duration-300"
            >
              Start the 14-day pilot
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
