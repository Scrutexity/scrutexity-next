import Link from 'next/link';
import { ArrowRight, PhoneMissed, MessageSquareText, CalendarX2 } from 'lucide-react';
import AnimatedHeading from '@/components/motion/AnimatedHeading';
import ScrollReveal from '@/components/motion/ScrollReveal';
import RecoveryCalculator from '@/components/calculator/RecoveryCalculator';

const publishedDate = 'June 15, 2026';

const recoveryTypes = [
  { icon: PhoneMissed, title: 'Missed calls', body: 'Identify high-intent callers who never reached the front desk or booked afterward.' },
  { icon: MessageSquareText, title: 'Stalled texts', body: 'Find conversations that stopped before availability, deposit, or booking was confirmed.' },
  { icon: CalendarX2, title: 'Unbooked consults', body: 'Re-engage inquiries and follow-ups that never became an appointment in your existing system.' },
];

export default function RecoveryLandingPage({ platform }: { platform: 'Boulevard' | 'Mangomint' }) {
  const faq = [
    { question: `Does Scrutexity replace ${platform}?`, answer: `No. Your team keeps ${platform}. Scrutexity is a focused recovery overlay for missed demand, not a replacement booking system.` },
    { question: 'Do we have to migrate data or retrain staff?', answer: 'No migration is required. The pilot is designed to work alongside the operating stack your team already uses.' },
    { question: 'What demand can Scrutexity recover?', answer: 'The audit looks for missed calls, stalled messages, abandoned forms, and unbooked follow-ups that can be tied back to a source and booking outcome.' },
    { question: 'How are clinical questions handled?', answer: 'Clinical questions stop the automated recovery flow and route to licensed clinic staff. Scrutexity does not diagnose or provide medical advice.' },
  ];
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };

  return (
    <div className="min-h-screen bg-cream text-espresso">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header className="relative overflow-hidden border-b border-sand-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(247,242,234,.92),rgba(239,230,215,.88),rgba(248,243,235,.94))]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="section-kicker">{platform} lead recovery</p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-[-0.02em] sm:text-5xl md:text-6xl">
            <AnimatedHeading text={`Turn Missed ${platform} Inquiries Into Booked Appointments`} />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-mist">
            Scrutexity finds and recovers the calls, texts, and web leads that never became bookings. No migration. Your team keeps {platform}.
          </p>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-[#8f7d6c]">Published {publishedDate}</p>
          <Link href="/revenue-leak-audit" className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all btn-lg mt-8 inline-flex items-center gap-2">
            Run My Free Demand Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <section>
          <ScrollReveal><p className="section-kicker">How it works</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Keep the system. Add the recovery layer.</h2></ScrollReveal>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              ['01', 'Audit the gap', `Review missed and stalled demand connected to your current ${platform} workflow.`],
              ['02', 'Approve the rules', 'Your clinic defines messaging, booking criteria, and clinical escalation boundaries.'],
              ['03', 'Verify the outcome', 'Connect each recovered inquiry to its conversation, appointment, deposit, and escalation history.'],
            ].map(([number, title, body], index) => (
              <ScrollReveal key={number} delay={index * 0.07} className="rounded-[1.5rem] border border-[#dfd0bf] bg-cream p-7 transition duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="font-mono text-xs font-bold text-[#8a533b]">{number}</span><h3 className="mt-4 font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-mist">{body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div>
            <ScrollReveal><p className="section-kicker">What we recover</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Demand you already paid to generate.</h2></ScrollReveal>
            <div className="mt-8 space-y-4">
              {recoveryTypes.map(({ icon: Icon, title, body }, index) => (
                <ScrollReveal key={title} delay={index * 0.06} className="flex gap-4 rounded-2xl border border-sand-deep bg-cream p-6">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-[#8a533b]" /><div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-mist">{body}</p></div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="mt-8 rounded-2xl border border-[#d7c6b4] bg-[#f3eadf] p-7">
              <h3 className="font-display text-2xl">Why not migrate to Zenoti?</h3>
              <p className="mt-3 text-sm leading-7 text-mist">Zenoti is a broad operating platform. If your team already uses {platform}, replacing the PMS introduces migration, training, and workflow complexity. Scrutexity addresses missed-demand recovery without requiring that replacement.</p>
            </ScrollReveal>
          </div>
        </section>

        <ScrollReveal className="mt-20">
          <RecoveryCalculator />
        </ScrollReveal>

        <section className="mt-20 max-w-4xl">
          <p className="section-kicker">FAQ</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Questions from {platform} operators</h2>
          <div className="mt-8 space-y-4">{faq.map((item, index) => <ScrollReveal key={item.question} delay={index * 0.04} className="rounded-2xl border border-sand-deep bg-cream p-6"><h3 className="font-semibold">{item.question}</h3><p className="mt-2 text-sm leading-7 text-mist">{item.answer}</p></ScrollReveal>)}</div>
        </section>
      </main>
    </div>
  );
}
