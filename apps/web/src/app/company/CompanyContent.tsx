'use client';

import { ArrowRight, ShieldCheck, CreditCard, Users } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import ScrollReveal from '@/components/ui-custom/reveal';

const tenets = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Protect the License',
    body: 'We believe software should never play doctor. In aesthetics, a hallucinating AI isn\'t a bug — it\'s malpractice. We built our deterministic triage engine to hard-stop and escalate clinical inquiries, keeping your license absolutely safe.',
  },
  {
    number: '02',
    icon: CreditCard,
    title: 'Capture the Deposit',
    body: 'Friendly conversations don\'t pay the lease. If a tool cannot check live room availability and securely capture a credit card authorization for the consult, it is simply creating unpaid busywork for your front desk.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Protect the Staff',
    body: 'Your coordinators are already managing patients, answering phones, and turning over rooms. We built Scrutexity to operate entirely in the background. No new dashboards to monitor. No new logins to remember. Zero staff training.',
  },
];

export default function CompanyContent() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-cream)_0%,var(--color-cream-deep)_35%,var(--color-sand)_70%,var(--color-cream)_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="section-kicker mb-4">Our Origin</p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-espresso sm:text-5xl md:text-[3.8rem]">
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-mist">
            Scrutexity wasn&apos;t born in a Silicon Valley incubator. It was built by sitting behind the front desks of high-volume clinics, watching $150 leads evaporate at 10 PM.
          </p>
        </div>
      </section>

      <main className="px-5 pb-24 sm:px-8">
        {/* The Weekend Bleed */}
        <section className="mx-auto max-w-5xl mb-24">
          <Reveal>
            <div className="rounded-[1.75rem] border border-sand-deep bg-cream p-8 md:p-12 shadow-sm">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="md:w-1/2 space-y-5">
                  <h2 className="font-display text-2xl text-espresso">The Weekend Bleed</h2>
                  <div className="space-y-4 text-mist leading-7 text-[15px]">
                    <p>
                      A few years ago, we audited the digital pipeline of a premier aesthetics practice. They were spending $15,000 a month on perfectly optimized Google and Instagram ads. The traffic was phenomenal.
                    </p>
                    <p>
                      But when we looked at the ledger, the math didn&apos;t add up.
                    </p>
                    <p>
                      We discovered the &ldquo;Weekend Bleed.&rdquo; High-intent patients were clicking ads for Morpheus8 and lip filler at 9:30 PM on Friday nights. They would send a DM asking for availability. The front desk, rightfully off the clock, wouldn&apos;t reply until 9:00 AM Monday.
                    </p>
                    <p className="font-display text-lg text-espresso border-l-2 border-clay pl-4 italic leading-relaxed">
                      By Monday morning, 40% of those leads had already booked with a competitor who answered faster.
                    </p>
                    <p>
                      When the clinic tried a standard &ldquo;AI Receptionist&rdquo; to fix it, the bot hallucinated post-op advice and double-booked a single laser room. That&apos;s when we realized the industry didn&apos;t need a smarter chatbot. It needed a secure, clinical-grade transaction engine. So we built Scrutexity.
                    </p>
                  </div>
                </div>

                {/* Visual anchor */}
                <div className="md:w-1/2 w-full">
                  <div className="aspect-[4/3] rounded-[1.75rem] overflow-hidden border border-sand-deep bg-[var(--color-cream-deep)] flex items-center justify-center">
                    <div className="text-center px-8">
                      <p className="text-6xl font-display text-clay mb-3">40%</p>
                      <p className="text-sm text-mist leading-relaxed">
                        of after-hours leads book with a faster competitor before your front desk clocks in Monday morning.
                      </p>
                      <p className="text-[11px] text-[var(--color-sand-deep)] mt-4 italic">
                        Based on audited clinic data. Results vary by market.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* The Manifesto */}
        <section className="mb-24">
          <div className="rounded-[1.75rem] border border-[var(--color-muted)]/30 bg-[var(--color-ink)] py-20 px-5 sm:px-8">
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <div className="mb-14">
                  <p className="section-kicker mb-3 text-[var(--color-sand-deep)]">What We Believe</p>
                  <h2 className="font-display text-3xl text-[var(--color-sand-deep)] tracking-tight md:text-4xl">
                    The Scrutexity Manifesto
                  </h2>
                  <p className="mt-3 text-[var(--color-sand-deep)]">Three non-negotiable rules of our engineering team.</p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tenets.map((tenet, idx) => {
                  const Icon = tenet.icon;
                  return (
                    <ScrollReveal key={tenet.title} delay={idx * 0.08}>
                      <div className="rounded-[1.75rem] border border-[var(--color-muted)]/50 bg-[var(--color-ink)] p-8 h-full transition duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)]">
                        <span className="font-mono text-lg font-bold text-clay mb-4 block">
                          {tenet.number}.
                        </span>
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-clay/10">
                          <Icon className="h-5 w-5 text-clay" />
                        </div>
                        <h3 className="font-display text-xl text-[var(--color-sand-deep)] mb-3">{tenet.title}</h3>
                        <p className="text-[14px] leading-7 text-[var(--color-sand-deep)]">{tenet.body}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-48 h-48 rounded-full border-4 border-[var(--color-paper-light)] shadow-[0_14px_40px_-14px_rgba(85,62,41,0.15)] overflow-hidden shrink-0 bg-[var(--color-cream-deep)] flex items-center justify-center">
                <span className="text-[var(--color-sand-deep)] font-mono text-xs">Photo</span>
              </div>

              <div>
                <h2 className="font-display text-2xl text-espresso mb-1">Nick</h2>
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-clay mb-4">Founder & Lead Architect</p>
                <p className="text-mist text-[15px] leading-7 mb-4">
                  With a background in enterprise data infrastructure and healthcare operations, I founded Scrutexity to bridge the gap between luxury patient experiences and backend operational mechanics.
                </p>
                <p className="text-mist text-[15px] leading-7">
                  My core belief is that clinical staff should spend 100% of their time on patient care, not chasing down $150 credit card deposits on Monday mornings. I personally oversee the Boulevard integration and security architecture for every clinic we partner with.
                </p>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-clay hover:text-[var(--color-amber-badge)] transition-colors"
                  >
                    Get in touch <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </div>
  );
}
