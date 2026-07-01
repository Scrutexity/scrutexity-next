import Link from 'next/link';
import ScrollReveal from '@/components/ui-custom/reveal';

export const metadata = {
  title: 'Revenue Leak Audit | Scrutexity',
  description: '14-day pilot, $0 if recovery isn\'t demonstrated. Scrutexity works alongside Boulevard and Mangomint to recover missed bookings.',
};

export default function RevenueLeakAuditPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-sans">
      <main className="px-5 pb-24 pt-20 sm:px-8 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal className="w-full">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mist">Opportunity Review</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-espresso sm:text-5xl">
              Find, recover, and verify missed bookings.
            </h1>
            <p className="mt-5 text-base leading-7 text-mist max-w-xl mx-auto">
              Scrutexity works alongside Boulevard and Mangomint to find unworked inquiries, re-engage eligible leads, and confirm deposits and bookings. No migration.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10">
            <div className="rounded-2xl border border-sand bg-cream p-8 shadow-[0_8px_32px_rgba(61,43,31,0.07)]">
              <h3 className="font-display text-2xl text-espresso mb-3">Start with a read-only audit</h3>
              <p className="text-mist mb-7 text-sm leading-7">
                We review your last 30 days of missed calls, unanswered inquiries, and incomplete follow-ups. You&rsquo;ll receive a private recovery report within 24 hours.
              </p>
              <Link
                href="/pilot"
                className="inline-flex items-center gap-2 rounded-full bg-sage-deep px-8 py-4 text-base font-semibold text-cream transition-all duration-300 hover:bg-[#4A6347] hover:shadow-[0_8px_30px_-8px_rgba(94,122,90,0.4)]"
              >
                Find My Missed Bookings
              </Link>
              <p className="mt-4 text-xs text-mist">
                Read-only audit first. Recovery requires separately authorized, minimum-necessary write permissions.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </div>
  );
}
