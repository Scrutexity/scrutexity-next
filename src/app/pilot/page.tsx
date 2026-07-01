'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Database, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/Input';
import { Field } from '@/components/Field';

export default function PilotOnboardingPage() {
  const [phase, setPhase] = useState<'agreement' | 'connection' | 'sandbox'>('agreement');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });
      if (res.ok) {
        setPhase('sandbox');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-[#221f1b] font-sans selection:bg-terracotta/20 flex flex-col pt-24 pb-12 px-5 sm:px-8">
      
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e6d9c6_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
      </div>

      <div className="relative mx-auto w-full max-w-2xl flex-1 flex flex-col justify-center">
        
        {phase === 'agreement' && (
          <div className="animate-fade-in-down">
            <div className="text-center mb-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8c9b7] bg-white/52 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7d6048] shadow-sm backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-terracotta animate-pulse" />
                Phase 1: Compliance
              </div>
              <h1 className="font-display text-4xl leading-tight tracking-[-0.02em] text-[#201d19] md:text-5xl">
                The Institutional Agreement
              </h1>
            </div>

            <div className="rounded-[1.5rem] border border-[#e1d4c5] bg-[#fffaf2]/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta/10 border border-terracotta/20">
                  <ShieldCheck className="h-6 w-6 text-terracotta" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#221f1b]">Business Associate Agreement</h2>
                  <p className="mt-2 text-[15px] leading-7 text-[#6b6259]">
                    Before a single byte of data is transferred, we execute a BAA. This immediately ensures that we operate strictly within your legal and CPOM constraints. We take your data hygiene seriously.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#e1d4c5]/60 flex flex-col sm:flex-row gap-4 justify-end">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8c4ad] px-6 py-3.5 text-sm font-semibold text-[#5f574f] transition hover:bg-[#f3eadf]"
                >
                  Cancel
                </Link>
                <button
                  onClick={() => setPhase('connection')}
                  className="govbtn inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition duration-300"
                >
                  Execute BAA <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {phase === 'connection' && (
          <div className="animate-fade-in-down">
            <div className="text-center mb-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8c9b7] bg-white/52 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7d6048] shadow-sm backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-terracotta animate-pulse" />
                Phase 2: Integration
              </div>
              <h1 className="font-display text-4xl leading-tight tracking-[-0.02em] text-[#201d19] md:text-5xl">
                Read-Only Connection
              </h1>
            </div>

            <div className="rounded-[1.5rem] border border-[#e1d4c5] bg-[#fffaf2]/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3eadf] border border-[#e1d4c5]">
                  <Lock className="h-5 w-5 text-[#9b6a51]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#221f1b]">Zero write permissions.</h2>
                  <p className="mt-2 text-[15px] leading-7 text-[#6b6259]">
                    Your patient database remains entirely untouched. We use a strictly read-only connection to pull the last 30 days of missed demand into an isolated, secure environment.
                  </p>
                </div>
              </div>

              <div className="bg-[#fbf7ef] rounded-xl border border-terracotta/20 p-5 mb-8 text-[14px] leading-6 text-[#5f574f]">
                <strong className="text-terracotta block mb-1">Concierge Onboarding</strong>
                To ensure strict data hygiene and BAA compliance, I personally walk my first-time pilot clinics through the read-only connection. It takes exactly four minutes on Zoom. Just paste your generated API key below.
              </div>

              <form onSubmit={handleConnect} className="space-y-6">
                <Field label="Boulevard Read-Only API Key">
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    required
                    placeholder="sk_live_..."
                    className="font-mono"
                  />
                </Field>

                <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-end border-t border-[#e1d4c5]/60 mt-6">
                  <button
                    type="button"
                    onClick={() => setPhase('agreement')}
                    className="inline-flex items-center justify-center rounded-full border border-[#d8c4ad] px-6 py-3.5 text-sm font-semibold text-[#5f574f] transition hover:bg-[#f3eadf]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !apiKey}
                    className="govbtn inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Connect Read-Only'} 
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {phase === 'sandbox' && (
          <div className="animate-fade-in-down">
            <div className="text-center mb-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8c9b7] bg-white/52 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7d6048] shadow-sm backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-terracotta animate-pulse" />
                Phase 3: Sandbox
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#e1d4c5] bg-[#fffaf2]/80 p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0f2c2c] border-[4px] border-[#eef3ea] mb-6">
                <Database className="h-8 w-8 text-[#e6b17e]" />
              </div>
              
              <h1 className="font-display text-3xl leading-tight text-[#201d19] mb-4">
                Audit initiated.
              </h1>
              
              <p className="mx-auto max-w-md text-[16px] leading-7 text-[#6b6259]">
                The infrastructure is currently syncing your last 30 days of missed demand into an isolated, secure Postgres environment for analysis.
              </p>

              <div className="mt-8 rounded-xl bg-[#f4ede0] border border-[#e1d4c5] p-5 max-w-sm mx-auto">
                <div className="flex items-center gap-3 justify-center text-[#221f1b] font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-[#7f8f78]" />
                  Delivery timeline
                </div>
                <p className="mt-2 text-sm text-[#5f574f]">
                  Your custom ledger will be delivered via email in exactly <strong className="text-[#221f1b]">24 hours</strong>.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8c4ad] px-8 py-3.5 text-sm font-semibold text-[#5f574f] transition hover:bg-[#f3eadf]"
                >
                  Return to homepage
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
