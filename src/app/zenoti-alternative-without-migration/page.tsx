import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Minus } from 'lucide-react';
import ScrollReveal from '@/components/ui-custom/reveal';

const publishedDate = 'June 15, 2026';
const faq = [
  { question: 'Do I have to leave Boulevard or Mangomint?', answer: 'No. Scrutexity is designed as a recovery overlay. Your team keeps its current booking system and workflows.' },
  { question: 'Is Scrutexity a Zenoti competitor?', answer: 'It is a different model. Zenoti is an all-in-one operating platform; Scrutexity is a focused missed-demand recovery overlay for clinics keeping Boulevard or Mangomint.' },
  { question: 'Does Scrutexity replace Zenoti?', answer: 'No. Scrutexity does not claim to replace Zenoti’s scheduling, POS, workforce, inventory, or broader operating features.' },
  { question: 'What does recovery without migration mean?', answer: 'It means auditing and re-engaging missed calls, stalled messages, forms, and follow-ups without moving the clinic onto a new PMS.' },
  { question: 'How does Scrutexity govern AI workflows?', answer: 'Scrutexity uses governed agents, not free-running agents. Clinical questions stop the workflow and route to licensed staff.' },
];
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) };
const rows = [
  ['Operating model', 'All-in-one salon, spa, and wellness platform', 'Recovery overlay alongside Boulevard or Mangomint'],
  ['Migration', 'Adoption generally means moving core operations into Zenoti', 'No PMS migration required'],
  ['Scope', 'Scheduling, POS, staff, inventory, marketing, reporting, and AI tools', 'Missed-demand recovery, clinical escalation, and outcome evidence'],
  ['Start path', 'Broader platform evaluation and implementation', 'Read-only demand audit and focused pilot'],
];

export const metadata: Metadata = { title: 'Zenoti-Style Recovery Without PMS Migration | Scrutexity', description: 'Keep Boulevard or Mangomint and add focused missed-demand recovery without replacing your PMS.', alternates: { canonical: '/zenoti-alternative-without-migration' } };

export default function Page() {
  return <div className="min-h-screen bg-cream text-espresso">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <section className="grid gap-6 md:grid-cols-2"><ScrollReveal className="rounded-[1.75rem] border border-sand-deep bg-cream p-8"><p className="section-kicker">The Zenoti question</p><h2 className="mt-3 font-display text-3xl">Migration, cost, and complexity</h2><p className="mt-4 text-sm leading-7 text-mist">Zenoti can make sense for groups seeking a broad all-in-one operating platform. For a Boulevard or Mangomint clinic that primarily needs better follow-up, a full PMS change can be more transformation than the problem requires.</p></ScrollReveal><ScrollReveal delay={.08} className="rounded-[1.75rem] border border-[#d7c6b4] bg-[#f3eadf] p-8"><p className="section-kicker">The Scrutexity alternative</p><h2 className="mt-3 font-display text-3xl">Overlay. Governed agents. No migration.</h2><p className="mt-4 text-sm leading-7 text-mist">Keep the booking system your staff knows. Add a focused layer that identifies missed demand, follows clinic-approved rules, escalates clinical questions, and documents recoveries.</p></ScrollReveal></section>
      <section className="mt-20"><p className="section-kicker">Different models</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Zenoti vs. Scrutexity for Boulevard users</h2><div className="mt-8 overflow-x-auto rounded-[1.75rem] border border-[#dfd0bf] bg-cream"><table className="w-full min-w-[760px] text-left"><thead><tr className="border-b border-[#dfd0bf] bg-[#f3eadf]"><th className="p-5">Category</th><th className="border-l border-[#dfd0bf] p-5">Zenoti</th><th className="border-l border-[#dfd0bf] p-5">Scrutexity</th></tr></thead><tbody>{rows.map((row)=><tr key={row[0]} className="border-b border-[#eadfd2] last:border-0"><th className="p-5 text-sm">{row[0]}</th><td className="border-l border-[#eadfd2] p-5 text-sm text-mist"><Minus className="mr-2 inline h-4 w-4 text-[#9b806d]"/>{row[1]}</td><td className="border-l border-[#eadfd2] p-5 text-sm text-[#4d594f]"><Check className="mr-2 inline h-4 w-4 text-[#6b8576]"/>{row[2]}</td></tr>)}</tbody></table></div></section>
      <section className="mt-20 max-w-4xl"><p className="section-kicker">FAQ</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Choosing recovery without replacement</h2><div className="mt-8 space-y-4">{faq.map((item,index)=><ScrollReveal key={item.question} delay={index*.04} className="rounded-2xl border border-sand-deep bg-cream p-6"><h3 className="font-semibold">{item.question}</h3><p className="mt-2 text-sm leading-7 text-mist">{item.answer}</p></ScrollReveal>)}</div></section>
    </main>
  </div>;
}
