import type { Metadata } from 'next';
import { Kicker, MONO } from '@/components/scrutexity/intel-kit';

export const metadata: Metadata = {
  title: 'Agent Guardrail Audit | Scrutexity',
  description: 'Auditing AI-agent transcripts for claim drift. Private beta opening Q1 2027.',
  alternates: { canonical: '/agent' },
};

export default function AgentGuardrailPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark flex flex-col items-center justify-center py-32 px-5">
      <div className="mx-auto max-w-2xl text-center">
        <Kicker>Waitlist</Kicker>
        <h1 className="mt-6 font-display text-[2.5rem] leading-[1.07] text-espresso sm:text-5xl lg:text-6xl">
          Agent Guardrail Audit
        </h1>
        <p className="mt-7 text-lg leading-8 text-bark">
          Auditing AI-agent transcripts for claim drift. Private beta opening Q1 2027.
        </p>
        
        <p className="mt-8 text-base font-medium leading-7 text-espresso/90 border-l-2 border-clay pl-4 text-left max-w-md mx-auto">
          Your AI agents are making representations your legal team doesn&apos;t see. We find them before your customers do.
        </p>
        
        <form className="mt-10 w-full max-w-md mx-auto space-y-4 text-left p-6 rounded-xl border border-sand-deep/40 bg-bone shadow-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-espresso mb-2">
              Join the waitlist
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-md border border-sand-deep bg-cream px-4 py-3 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
            />
          </div>
          <button
            type="submit"
            className="w-full flex min-h-12 items-center justify-center rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep"
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
}
