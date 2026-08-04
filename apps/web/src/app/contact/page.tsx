import { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ui-custom/reveal';

export const metadata: Metadata = {
  title: 'Contact | Scrutexity',
  description: 'Get Your Free Audit or 14-day infrastructure assessment.',
};

export const dynamic = 'force-dynamic';

export default async function ContactPage(props: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await props.searchParams;
  const subject = plan === 'essentials' ? 'Inquiry about Essentials Plan'
    : plan === 'portfolio' ? 'Inquiry about Portfolio Plan'
    : plan === 'enterprise' ? 'Inquiry about Enterprise Plan'
    : 'General Inquiry';

  return (
    <div className="min-h-screen bg-cream text-espresso font-sans antialiased">
      <main className="max-w-2xl mx-auto px-6 py-24">
        <ScrollReveal className="text-center mb-12">
          <p className="text-espresso/70 text-lg">
            {plan === 'essentials' ? 'Tell us about your practice and we\'ll set up your 14-day calibration.'
            : plan === 'portfolio' ? 'Tell us about your portfolio and we\'ll scope your cross-EMR deployment.'
            : plan === 'enterprise' ? 'Tell us about your organization and we\'ll prepare an enterprise proposal.'
            : 'Tell us about your practice and we\'ll find the right fit.'}
          </p>
        </ScrollReveal>

        <a
          href={`mailto:nick@scrutexity.com?subject=${encodeURIComponent(subject)}`}
          className="block w-full py-4 bg-[#B9825F] text-[#FBF7EF] text-center text-sm uppercase tracking-widest font-semibold rounded-lg transition duration-300 hover:-translate-y-1 hover:bg-[#A06E4D] hover:shadow-[0_14px_30px_rgba(185,130,95,0.30)] active:scale-[0.99] mb-4"
        >
          Email nick@scrutexity.com →
        </a>

        <div className="mt-8 text-center text-sm text-espresso/50">
          <p>Or start with a <Link href="/roi" className="text-[#B9825F] hover:underline">self-serve ROI estimate →</Link></p>
        </div>
      </main>
    </div>
  );
}
