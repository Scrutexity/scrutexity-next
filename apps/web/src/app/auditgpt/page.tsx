import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Kicker } from '@/components/scrutexity/intel-kit';

export const metadata: Metadata = {
  title: 'AuditGPT is now Scrutexity',
  description: 'The diagnostic engine evolved into a broader evidence-first claim intelligence platform.',
  alternates: { canonical: '/auditgpt' },
};

export default function AuditGPTBridgePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark flex flex-col items-center justify-center py-32 px-5">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>Brand Update</Kicker>
        <h1 className="mt-6 font-display text-[2.5rem] leading-[1.07] text-espresso sm:text-5xl lg:text-6xl">
          AuditGPT is now Scrutexity.
        </h1>
        <p className="mt-7 text-lg leading-8 text-bark">
          The diagnostic engine evolved into a broader evidence-first claim intelligence platform.
        </p>
        
        <div className="mt-12 flex justify-center">
          <Link
            href="/snapshot"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep"
          >
            Run Your Free Snapshot
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
