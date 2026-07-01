import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact | Scrutexity',
  description: 'Request a portfolio audit or 14-day infrastructure assessment.',
};

export default async function ContactPage(props: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await props.searchParams;
  const subject = plan === 'essentials' ? 'Inquiry about Essentials Plan'
    : plan === 'portfolio' ? 'Inquiry about Portfolio Plan'
    : plan === 'enterprise' ? 'Inquiry about Enterprise Plan'
    : 'General Inquiry';

  return (
    <div className="min-h-screen bg-[#FBF7EF] text-[#221F1B] font-sans antialiased">
      <main className="max-w-2xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">Get in touch</h1>
          <p className="text-[#221F1B]/70 text-lg">
            {plan === 'essentials' ? 'Tell us about your practice and we\'ll set up your 14-day calibration.'
            : plan === 'portfolio' ? 'Tell us about your portfolio and we\'ll scope your cross-EMR deployment.'
            : plan === 'enterprise' ? 'Tell us about your organization and we\'ll prepare an enterprise proposal.'
            : 'Tell us about your practice and we\'ll find the right fit.'}
          </p>
        </div>

        <a
          href={`mailto:nicholas@scrutexity.com?subject=${encodeURIComponent(subject)}`}
          className="block w-full py-4 bg-[#B9825F] text-[#FBF7EF] text-center text-sm uppercase tracking-widest font-semibold rounded-lg hover:bg-[#A06E4D] transition-colors mb-4"
        >
          Email nicholas@scrutexity.com →
        </a>

        <div className="mt-8 text-center text-sm text-[#221F1B]/50">
          <p>Or start with a <Link href="/roi" className="text-[#B9825F] hover:underline">self-serve ROI estimate →</Link></p>
        </div>
      </main>
    </div>
  );
}
