import type { Metadata } from 'next';
import PilotApplicationForm from './PilotApplicationForm';

export const metadata: Metadata = {
  title: 'Apply for the Scrutexity Pilot | Scrutexity',
  description:
    'Apply for the Scrutexity pilot for Boulevard and Mangomint med spas. 14-day pilot, $0 if recovery is not demonstrated.',
  alternates: { canonical: '/pilot' },
};

export default function PilotPage() {
  return (
    <div className="min-h-screen bg-cream px-5 py-16 text-espresso sm:px-8 lg:py-24">
      <div className="mx-auto flex min-h-[calc(100vh-220px)] w-full max-w-xl flex-col justify-center">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mist">14-Day Pilot</p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-espresso sm:text-5xl">
            Apply for the Scrutexity Pilot
          </h1>
          <p className="mt-5 text-base leading-8 text-mist sm:text-lg">
            14-day pilot. <span className="text-sage-deep font-semibold">$0</span>{" "}if recovery isn&rsquo;t demonstrated. We install a governed recovery layer on top of your existing PMS — no migration, no workflow changes, no front-desk disruption.
          </p>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-sand bg-cream/90 p-6 shadow-[0_24px_70px_-34px_rgba(61,43,31,0.12)] backdrop-blur sm:p-8">
          <PilotApplicationForm />
        </div>
      </div>
    </div>
  );
}
