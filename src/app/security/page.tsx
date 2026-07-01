
import GovButton from '@/components/GovButton';
import {
  Shield,
  Lock,
  FileText,
  Server,
  Eye,
  EyeOff,
  Route,
  HardDrive,
  UserCheck,
  AlertTriangle,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Security & Compliance | Scrutexity',
  description:
    'How Scrutexity handles PHI, encrypts data, and executes BAAs for premium NYC medical aesthetics clinics.',
};

const principles = [
  {
    icon: EyeOff,
    title: 'PHI is minimized at the edge',
    body: 'Patient identifiers are hashed (SHA-256) before they leave your systems. We never store raw names, DOBs, or medical record numbers in our application layer. Inquiry intent is classified; identity is discarded.',
  },
  {
    icon: Route,
    title: 'Clinical questions route to humans',
    body: 'Any message classified as MEDICAL_QUESTION is locked from AI response and routed to your licensed staff. We never generate medical advice, differential diagnoses, or treatment recommendations.',
  },
  {
    icon: HardDrive,
    title: 'You own your data',
    body: 'Transcripts, routing rules, briefs, and inquiry logs belong to your clinic. Exportable. Deletable on request. We do not train models on your patient communications.',
  },
  {
    icon: FileText,
    title: 'BAA before activation',
    body: 'A Business Associate Agreement is executed during pilot setup — before any patient-adjacent workflow goes live. Standard terms. Reviewed by healthcare counsel.',
  },
];

const stack = [
  {
    layer: 'Transport',
    items: ['TLS 1.3 for all data in transit', 'HSTS preloaded', 'Certificate pinning on API endpoints'],
  },
  {
    layer: 'Application',
    items: [
      'Server-side PHI stripping before logging',
      'SHA-256 hashing of patient identifiers',
      'No raw PHI in request logs, error traces, or analytics',
    ],
  },
  {
    layer: 'Infrastructure',
    items: [
      'Isolated VPC per deployment',
      'Encrypted volumes at rest (AES-256)',
      'Access: founder + designated operator only',
    ],
  },
  {
    layer: 'Access',
    items: [
      'SSO + hardware key enforcement',
      'Full audit log of every admin action',
      'Session timeout: 15 minutes idle',
    ],
  },
];

const dontDo = [
  'We do not sell, share, or monetize patient data.',
  'We do not train AI models on your clinic\u2019s communications.',
  'We do not generate medical advice, diagnoses, or treatment plans.',
  'We do not store raw PHI in analytics, logs, or error traces.',
  'We do not use third-party ad pixels on patient-facing surfaces.',
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-ivory text-[#221f1b] font-sans selection:bg-terracotta/20">


      {/* Hero */}
      <section className="px-5 pb-16 pt-28 sm:px-8 lg:pb-20 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-terracotta/10">
            <Shield className="h-8 w-8 text-terracotta" />
          </div>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-[#221f1b] sm:text-5xl md:text-6xl">
            Security &amp; Compliance
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#6b6259]">
            How we handle PHI, encrypt data, and execute BAAs — in plain English.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-4xl">
          <p className="section-kicker text-center">Principles</p>
          <h2 className="mt-3 text-center font-display text-3xl tracking-tight text-[#221f1b] md:text-4xl">
            What we do — and what we don&rsquo;t
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-[#e1d4c5] bg-[#fffaf2] p-6"
              >
                <p.icon className="h-6 w-6 text-terracotta" />
                <h3 className="mt-4 font-semibold text-[#221f1b]">{p.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5f574f]">{p.body}</p>
              </div>
            ))}
          </div>

          {/* The "Don't Do" list */}
          <div className="mt-8 rounded-2xl border border-[#e1d4c5] bg-[#f3eadf] p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-terracotta" />
              <h3 className="font-semibold text-[#221f1b]">What we don&rsquo;t do</h3>
            </div>
            <ul className="space-y-2">
              {dontDo.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[#5f574f]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="bg-[#f3eadf] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="section-kicker text-center">Infrastructure</p>
          <h2 className="mt-3 text-center font-display text-3xl tracking-tight text-[#221f1b] md:text-4xl">
            The honest stack
          </h2>
          <p className="mt-4 text-center text-sm leading-6 text-[#7a7066]">
            No marketing claims. Here&rsquo;s exactly what runs under the hood.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {stack.map((s) => (
              <div
                key={s.layer}
                className="rounded-2xl border border-[#e1d4c5] bg-[#fffaf2] p-6"
              >
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                  {s.layer}
                </h3>
                <ul className="mt-4 space-y-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-6 text-[#5f574f]"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#221f1b]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAA Process */}
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">BAA Process</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-[#221f1b] md:text-4xl">
            How we execute your BAA
          </h2>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Pilot intake',
                body: 'We send our standard BAA template during pilot setup. Reviewed by healthcare counsel.',
              },
              {
                step: '2',
                title: 'Mutual execution',
                body: 'Signed by both parties before any patient-adjacent workflow is activated.',
              },
              {
                step: '3',
                title: 'Ongoing compliance',
                body: 'Annual review. Updated if your practice structure, EMR, or state regulations change.',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-[#e1d4c5] bg-[#fffaf2] p-6"
              >
                <span className="font-display text-3xl text-terracotta">{s.step}</span>
                <h3 className="mt-3 font-semibold text-[#221f1b]">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f574f]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f3eadf] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-[#221f1b] md:text-4xl">
            Questions about security?
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#7a7066]">
            We&rsquo;ll walk through the stack, the BAA, and your specific compliance
            requirements before you commit to anything.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <GovButton href="/pilot" className="btn-md">
              Email me my leak report
            </GovButton>
            <a
              href="mailto:founder@scrutexity.com"
              className="inline-flex items-center justify-center rounded-full border border-[#cdbda9] px-7 py-4 text-sm font-semibold text-[#2d2924] transition hover:bg-white/70"
            >
              <Mail className="mr-2 h-4 w-4" />
              founder@scrutexity.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
