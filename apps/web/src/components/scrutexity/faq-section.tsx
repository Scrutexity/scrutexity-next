'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Anchor, Container, Eyebrow, SectionHeading, Lead } from '@/components/ui-custom/section';
import { HandUnderline } from '@/components/scrutexity/hand-accents';

const EASE = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: 'Do you actually write to my PMS?',
    a: 'No. Scrutexity operates with strictly read-only access. We observe unworked inquiries and surface them, but we never modify your PMS, calendar, or patient records. Every recovery is staff-approved before anything sends. Zero write access — this is structural, not a setting.',
  },
  {
    q: 'What does "BAA before activation" mean?',
    a: 'A Business Associate Agreement is executed and on file before any read connection opens. We do not touch PHI without one. This is the first gate every recovery passes through — governance first, always. The BAA is standard, mutual, and can be reviewed by your legal team before signing.',
  },
  {
    q: 'How is this different from a chatbot or automated responder?',
    a: 'It is not autonomous. Any message flagged as clinical — symptoms, contraindications, post-care questions — halts the automated reply and routes straight to your licensed staff. No autonomous clinical decisions, ever. We are a governed concierge layer, not a bot. Your staff approves every outreach before it sends.',
  },
  {
    q: 'What counts as a "recovered deposit"?',
    a: 'A booking is only counted as recovered once the deposit is recorded in your PMS and the appointment is synced. We report deposits, not leads, not clicks, not "engaged conversations." Receipt-grade, independently verifiable. If it is not in your ledger, we do not count it.',
  },
  {
    q: 'Which PMS platforms do you support?',
    a: 'Boulevard and Mangomint are live today. Zenoti is on the roadmap for Q3 2025. We connect read-only — no workflow changes, no calendar modifications, no staff retraining. If you are on a platform we do not yet support, we will tell you honestly rather than overpromise.',
  },
  {
    q: 'What happens during the 14-day pilot?',
    a: 'We connect read-only to your PMS, surface your missed-demand baseline within 24 hours, and run the governed recovery protocol under staff approval. At the end, you receive a report of verified deposits recovered during the pilot — yours whether you continue or not. If we do not recover a verified deposit, you owe nothing. No card required.',
  },
  {
    q: 'Is this HIPAA-compliant?',
    a: 'We operate under a Business Associate Agreement with HIPAA-aligned administrative workflows. PHI is minimized at the edge — identifiers and health-intent indicators are stripped at the boundary, never stored. We are designed CPOM-conscious: no fee-splitting, no corporate practice of medicine, no direction of licensed staff. Your practice retains full clinical and financial authority.',
  },
  {
    q: 'What does it cost after the pilot?',
    a: 'Pricing is tied to verified deposit recovery, not vanity metrics. You pay a percentage of deposits actually recovered and recorded in your PMS — not leads, not inquiries, not "engagement." If we do not recover, you do not pay. Full pricing is transparent and reviewed before the pilot concludes.',
  },
];

export default function FaqSection() {
  const reduced = useReducedMotion();
  const animate = !reduced;

  return (
    <Anchor id="faq" tone="cream" py="loose">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          {/* LEFT — heading */}
          <motion.div
            initial={animate ? { opacity: 0, y: 16 } : false}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <Eyebrow tone="sage">
              <span className="h-1 w-1 rounded-full bg-sage" />
              09 · Questions
            </Eyebrow>
            <SectionHeading className="mt-5">
              Everything you&apos;d{' '}
              <span className="relative inline-block">
                <span className="font-serif italic text-sage-deep">ask before signing.</span>
                <HandUnderline className="absolute left-0 right-0 -bottom-2 w-full h-3" delay={0.4} />
              </span>
            </SectionHeading>
            <Lead className="mt-6">
              Straight answers to the questions operators and PE partners actually ask.
              No hedging, no &ldquo;schedule a call to find out.&rdquo;
            </Lead>
            <div className="mt-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream border border-sand-deep/50">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-sage-deep">
                Still have questions? · hello@scrutexity.com
              </span>
            </div>
          </motion.div>

          {/* RIGHT — accordion */}
          <motion.div
            initial={animate ? { opacity: 0, y: 16 } : false}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl border border-sand-deep/50 bg-cream/60 px-5 data-[state=open]:bg-cream data-[state=open]:border-sage/30 transition-colors"
                >
                  <AccordionTrigger className="text-left font-display text-lg lg:text-xl text-ink hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-base leading-[1.65] text-mist pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </Container>
    </Anchor>
  );
}
