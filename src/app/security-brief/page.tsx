import type { Metadata } from 'next';
import PrintButton from './PrintButton';

export const metadata: Metadata = {
  title: 'Security Architecture Brief | Scrutexity',
  description:
    'A comprehensive overview of Scrutexity security architecture, BAA activation, PHI handling, encryption, access controls, and incident response protocols.',
  alternates: { canonical: '/security-brief' },
};

const sections = [
  {
    eyebrow: '01',
    title: 'BAA Framework & Activation',
    body: [
      'Scrutexity uses a BAA-first activation protocol for clinics and healthcare operators. No API connections are provisioned, no data flows are initiated, and no processing begins until a Business Associate Agreement has been reviewed and executed by the covered client and Scrutexity.',
      'This activation order is intentional. Security review, BAA execution, integration scoping, and access provisioning are sequenced before any production inquiry data is connected. Typical BAA turnaround is under 48 hours once both parties have the correct legal contacts in place.',
      'If the BAA is not executed, Scrutexity does not activate the client workspace, connect to the practice management system, or process inquiry data.',
    ],
  },
  {
    eyebrow: '02',
    title: 'Data Architecture & PHI Handling',
    body: [
      'Scrutexity is designed around a PHI stripped at the edge architecture. Patient identifiers are detected and redacted before an inquiry reaches the processing layer. Names, dates of birth, medical histories, and other patient-specific identifiers are not needed for scheduling-intent classification.',
      'The processing layer receives scheduling intent, source context, and workflow state rather than raw patient identity. AI models see the operational question, not a patient chart. This separation keeps the governed workflow focused on recovering missed demand without turning the system into a clinical decision tool.',
      'Scrutexity does not store raw patient identifiers in its application layer. The retained record is built for verification: inquiry source, redacted transcript, booking status, and deposit status.',
    ],
  },
  {
    eyebrow: '03',
    title: 'Deterministic Clinical Stop-Rule',
    body: [
      'The deterministic clinical-question stop-rule is a core governance control. Automated workflows halt when the inquiry includes clinical questions involving pain, post-op concerns, contraindications, pregnancy, dosing, medical history, adverse reactions, or treatment suitability.',
      'When the stop-rule triggers, the workflow escalates to licensed on-call staff with the relevant context attached. The system does not diagnose, recommend, interpret symptoms, answer treatment-specific medical questions, or substitute for clinical judgment.',
      'This is the operational difference between governed agents and autonomous agents. Scrutexity can assist with administrative recovery, but clinical judgment remains with licensed staff.',
    ],
  },
  {
    eyebrow: '04',
    title: 'Encryption & Data Posture',
    body: [
      'Encryption in Transit: Scrutexity uses TLS 1.3 for data in transit between client systems, Scrutexity-controlled services, and approved endpoints.',
      'Encryption at Rest: Scrutexity stores covered application data using AES-256 encryption at rest in managed infrastructure environments.',
      'Read-Only API Integration: Scrutexity is PMS-agnostic and uses read-only API patterns wherever supported. We cannot write, alter, or delete PMS data through read-only integration scopes. Booking records are appended only through secure, approved endpoints when a client enables that workflow.',
    ],
  },
  {
    eyebrow: '05',
    title: 'Access Controls',
    body: [
      'Scrutexity uses role-based access controls inside client workspaces. Clinic owners and authorized administrators control staff access, user roles, and operational visibility for their organization.',
      'Internal Scrutexity access to production data is restricted. Production access requires MFA, documented justification, and logging. Access is granted for support, security, implementation, or incident-response purposes only, and is reviewed against the minimum access required for the task.',
    ],
  },
  {
    eyebrow: '06',
    title: 'Incident Response Protocol',
    body: [
      'Scrutexity maintains an incident response protocol organized around detection, containment, notification, and remediation. Detection includes monitoring, review of access patterns, system alerts, and client-reported concerns.',
      'Containment focuses on limiting potential exposure, rotating credentials where needed, suspending affected workflows, and preserving evidence for investigation. Notification follows applicable contractual obligations and HIPAA Breach Notification Rule timelines when a reportable incident is confirmed.',
      'Remediation includes root-cause analysis, control updates, client communication, and documentation of corrective actions.',
    ],
  },
  {
    eyebrow: '07',
    title: 'Subprocessors',
    body: [
      'Scrutexity currently does not utilize third-party subprocessors for PHI handling. Should this change, BAA-covered clients will be notified 30 days in advance of any subprocessor addition.',
      'Subprocessor review, where applicable, will include security posture, contractual obligations, data handling boundaries, and BAA coverage before PHI-related processing is approved.',
    ],
  },
];

export default function SecurityBriefPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso print:bg-white print:text-black">
      <style>{`
        @media print {
          nav,
          footer,
          [data-global-trust-strip],
          .print\\:hidden {
            display: none !important;
          }

          main {
            padding-top: 0 !important;
          }

          .security-brief-section {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .security-brief-section + .security-brief-section {
            break-before: page;
            page-break-before: always;
          }

          .security-brief-shell {
            max-width: none !important;
            padding: 0 !important;
          }
        }
      `}</style>

      <main className="security-brief-shell mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <header className="border-b border-[#d8c9b7] pb-10 print:border-black">
          <p className="section-kicker print:text-black">Security Architecture</p>
          <div className="mt-5 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-5xl leading-none tracking-tight sm:text-6xl">
                Scrutexity Security Brief
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-mist print:text-black">
                A comprehensive overview of our Business Associate Agreement framework, data architecture, encryption posture, and incident response protocols.
              </p>
            </div>
            <PrintButton />
          </div>
        </header>

        <div className="mt-12 space-y-12 print:mt-8 print:space-y-0">
          {sections.map((section) => (
            <section
              key={section.title}
              className="security-brief-section rounded-[1.5rem] border border-sand-deep bg-cream p-7 shadow-sm print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-clay-deep print:text-black">
                  {section.eyebrow}
                </span>
                <div>
                  <h2 className="font-display text-3xl leading-tight tracking-tight print:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-8 text-mist print:text-[12pt] print:leading-7 print:text-black">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
