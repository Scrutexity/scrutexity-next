import type { Claim } from '@/components/scrutexity/claim-card';
import type { AuditSeal } from '@/lib/audit-seal';

export type BadgeStatus =
  | 'Claim Audit Completed'
  | 'Claim Library Active'
  | 'Monitored by Scrutexity'
  | 'Audited by Scrutexity'
  | 'Expired — Rescan Required';

export type ClaimAudit = {
  publicId: string;
  archetype:
    | 'autonomous-ai'
    | 'ai-sales-tool'
    | 'ai-customer-support'
    | 'ai-healthcare-admin'
    | 'medical-wellness-clinic';
  companyType: string;
  domain: string;
  auditDate: string;            // ISO yyyy-mm-dd
  auditExpires: string;         // ISO yyyy-mm-dd — 90 days after auditDate
  pagesReviewed: string;
  claimsReviewed: number;
  primaryRiskTheme: string;
  riskScore: number;            // 0–100
  badge: BadgeStatus;
  publicSafeFindings: string[]; // top 3–5 short notes shown on public view
  methodology: string[];        // 3–4 short bullets
  claims: Claim[];              // full inventory — appears on unlocked view
  fixPlan: { num: string; label: string; body: string }[];
  auditSeal?: AuditSeal;        // cryptographic audit seal
};

const PUBLIC_METHODOLOGY: string[] = [
  'Public materials only — homepage, founder statements, investor narratives, public review surfaces.',
  'Every claim reviewed against the four questions: what is claimed, what evidence supports it, what gap remains, what is safer framing.',
  'Disciplined language only. Status labels (Verified · Weakly Supported · Unsupported · Overstated · Insufficient Public Evidence) describe the visible evidence record — not legality, ethics, or intent.',
  'Score is directional. Recommended actions are starting points, not legal or regulatory advice.',
];

// ──────────────────────────────────────────────────────────────────────
// ARCHETYPE 01 — Autonomous AI Company
// ──────────────────────────────────────────────────────────────────────

const autonomousAiClaims: Claim[] = [
  {
    claim: 'Our AI platform operates fully autonomously, without human oversight.',
    type: 'Capability · Autonomy',
    status: 'Overstated',
    riskLevel: 'High',
    sourceType: 'Homepage hero',
    whyItMatters:
      'Autonomy claims set expectations with prospects, partners, and investors. When the lived product is hybrid, the marketing-to-product gap surfaces on the first onboarding call or the first incident.',
    evidenceFound:
      'Homepage hero, two product pages, founder statement. No customer attestation, independent review, or published process diagram.',
    evidenceGap:
      'The public record does not differentiate where autonomy begins and ends, nor how outputs are reviewed before they reach a customer.',
    recommendedAction:
      'Define the autonomy boundary. State the human-in-the-loop steps that exist, even if rare. Distinguish autonomous execution from autonomous decision-making.',
    saferFraming:
      'Our agents handle routine operations end-to-end. Sensitive decisions are routed to a reviewer before action.',
    requiredProof:
      'Process diagram, sample workflow, audit log of representative interactions over a 30-day window.',
  },
  {
    claim: 'Zero employees — every function is run by AI.',
    type: 'Operating model',
    status: 'Insufficient Public Evidence',
    riskLevel: 'Medium',
    sourceType: 'Founder announcement',
    whyItMatters:
      'Operating-model claims are easy to verify with job listings, LinkedIn, and payroll signals. They are high-friction with enterprise buyers who require a vendor org chart for security reviews.',
    evidenceFound:
      'Founder post and one investor narrative reference the claim. No org chart, contractor disclosure, or third-party verification.',
    evidenceGap:
      'The public record does not distinguish founders, contractors, advisors, or part-time reviewers from the "zero employees" framing.',
    recommendedAction:
      'Define what counts as an employee inside the claim. Disclose contractor, reviewer, and advisory roles in the same surface.',
    saferFraming:
      'Operated by a founding team of N, with M contractors handling reviewer and oversight roles.',
    requiredProof:
      'Public org statement, contractor disclosure, attestation in the founder announcement footer.',
  },
  {
    claim: 'From $0 to $10M ARR in 8 months.',
    type: 'Traction · Revenue',
    status: 'Weakly Supported',
    riskLevel: 'High',
    sourceType: 'Investor narrative',
    whyItMatters:
      'Self-reported revenue is a primary diligence signal. ARR figures that mix annualized run-rate with pilot, deferred, or non-recurring revenue create downstream credibility costs.',
    evidenceFound:
      'A founder post and a venture-press article repeat the figure. No financial attestation, no customer count, no description of how ARR is calculated.',
    evidenceGap:
      'Public sources do not clarify whether the figure is annualized monthly run-rate at a specific date, contracted ARR, billed revenue, or recognized revenue.',
    recommendedAction:
      'Specify the ARR definition used. Disclose customer count, average contract value, and the measurement date.',
    saferFraming:
      'As of [date], N customers on annual contracts at an average value of $X, for an annualized run-rate of $Y. Figures are management-reported, not audited.',
    requiredProof:
      'Quarterly ARR snapshots, customer count over time, third-party finance attestation.',
  },
  {
    claim: 'You will never need to hire another human employee.',
    type: 'Capability · Replacement',
    status: 'Overstated',
    riskLevel: 'High',
    sourceType: 'Product page',
    whyItMatters:
      'Employment-replacement claims attract regulatory attention. They also set up customer disappointment when reality requires hybrid staffing for compliance, escalation, or oversight roles.',
    evidenceFound:
      'Repeated on the product page hero and three customer-quote cards. No customer attestation that explicitly states a reduction in headcount attributable to the product.',
    evidenceGap:
      'No before-and-after headcount data, role-by-role replacement evidence, or independent labor-impact review.',
    recommendedAction:
      'Replace the categorical claim with a category-specific claim. Specify which roles the product fully automates and which it augments.',
    saferFraming:
      'Customers automate specific tasks end-to-end. Compliance, escalation, and oversight roles remain human.',
    requiredProof:
      'Customer headcount-impact case studies, named role categories, third-party labor review.',
  },
  {
    claim: 'Our system has 99.99% reliability.',
    type: 'Reliability',
    status: 'Reviewed',
    riskLevel: 'Low',
    sourceType: 'Public status page',
    whyItMatters:
      'Reliability claims are some of the easiest to verify and the easiest to defend when verified. They earn trust where verified, and erode it sharply when not.',
    evidenceFound:
      'Twelve-month status page with calculated uptime, incident logs, and a third-party-mirrored RSS feed.',
    evidenceGap:
      'None visible. Methodology for uptime calculation is published.',
    recommendedAction:
      'Keep the status page surfaced near the reliability claim. Surface the calculation methodology link inline.',
    saferFraming:
      'Reliability claim and methodology can sit together with no further qualification.',
    requiredProof:
      'Already present. Optional: add an annual reliability report.',
  },
];

// ──────────────────────────────────────────────────────────────────────
// ARCHETYPE 02 — AI Sales Tool
// ──────────────────────────────────────────────────────────────────────

const aiSalesToolClaims: Claim[] = [
  {
    claim: '10× pipeline in 30 days.',
    type: 'Outcome · Pipeline',
    status: 'Weakly Supported',
    riskLevel: 'High',
    sourceType: 'Homepage hero',
    whyItMatters:
      'Categorical multiplier claims are the most common source of buyer disappointment in sales tooling. They also draw scrutiny from comparison reviewers and procurement teams.',
    evidenceFound:
      'Three customer quote cards and one anonymized case study. No baseline disclosure, sample size, or definition of "pipeline."',
    evidenceGap:
      'Public record does not show baseline pipeline before adoption, the methodology for measuring multiplier, or the customer cohort the multiplier is averaged over.',
    recommendedAction:
      'Restate the claim with a baseline, time window, and sample size. Attribute the multiplier to a specific role or motion.',
    saferFraming:
      'Customers using the prospecting workflow saw an average of N× more qualified meetings within 30 days of adoption, measured across [cohort description].',
    requiredProof:
      'Named customer case studies with before/after pipeline, third-party review, or a published methodology page.',
  },
  {
    claim: 'Our AI books your meetings for you.',
    type: 'Capability · Automation',
    status: 'Overstated',
    riskLevel: 'Medium',
    sourceType: 'Product page',
    whyItMatters:
      'Buyers read "books your meetings" as fully automated outreach plus scheduling. Operating reality usually includes human review of replies, calendar conflicts, and routing.',
    evidenceFound:
      'Product page, demo video, two integration logos. No description of which steps are automated vs reviewed.',
    evidenceGap:
      'No published workflow diagram, no description of human-review touchpoints.',
    recommendedAction:
      'Split the claim into drafting, sending, replying, and scheduling. State which the product fully automates and which it augments.',
    saferFraming:
      'Drafts personalized outreach, sends on your behalf after review, and routes accepted replies to your calendar.',
    requiredProof:
      'Workflow diagram, sample message + review + acceptance flow, customer attestation.',
  },
  {
    claim: 'Trusted by 5,000+ sales teams.',
    type: 'Trust · Customer count',
    status: 'Insufficient Public Evidence',
    riskLevel: 'Medium',
    sourceType: 'Homepage footer',
    whyItMatters:
      'Customer-count claims set procurement expectations. When the count includes free trial users, expired pilots, or unverified signups, it erodes trust on closer inspection.',
    evidenceFound:
      'Footer counter, eight logo strip on homepage. No customer roster, segment breakdown, or definition of "trusted by."',
    evidenceGap:
      'No definition of what counts: paid customer, active user, trial signup, or registered seat.',
    recommendedAction:
      'Define the count. Disclose whether figures are paid customers, active workspaces, or registered users.',
    saferFraming:
      'Trusted by N paid customer teams as of [date]. Total registered workspaces: M.',
    requiredProof:
      'Public customer roster page or segment breakdown.',
  },
  {
    claim: 'GDPR-compliant by default.',
    type: 'Compliance',
    status: 'Unsupported',
    riskLevel: 'High',
    sourceType: 'Footer · trust badge',
    whyItMatters:
      'Compliance-by-default claims are reviewed by procurement and legal teams. The phrase implies a finished, verified state that requires documentation to defend.',
    evidenceFound:
      'A small badge in the footer. No DPA, no privacy whitepaper, no SOC 2 / ISO link, no auditor statement.',
    evidenceGap:
      'Nothing in the public record substantiates the compliance status. "By default" is undefined.',
    recommendedAction:
      'Remove the standalone claim until backed by a documented program. Replace with descriptions of specific data handling practices.',
    saferFraming:
      'GDPR-aligned data handling. Our DPA is available on request. SOC 2 Type II in progress, attestation expected by [date].',
    requiredProof:
      'DPA, privacy whitepaper, SOC 2 / ISO attestation, named DPO contact.',
  },
];

// ──────────────────────────────────────────────────────────────────────
// ARCHETYPE 03 — AI Customer Support
// ──────────────────────────────────────────────────────────────────────

const aiCustomerSupportClaims: Claim[] = [
  {
    claim: '95% of support tickets resolved without a human.',
    type: 'Outcome · Deflection',
    status: 'Weakly Supported',
    riskLevel: 'High',
    sourceType: 'Homepage hero',
    whyItMatters:
      'Deflection-rate claims set buyer expectations against existing tooling. When the methodology differs from the buyer\'s definition, the rate becomes a disagreement on the first QBR.',
    evidenceFound:
      'Three customer logos, one quote card. No description of ticket categories, time window, or how "resolved" is defined.',
    evidenceGap:
      'No public methodology for deflection rate. Easy-vs-hard ticket distribution not disclosed.',
    recommendedAction:
      'Publish the deflection methodology. Distinguish FAQ-style auto-replies from full ticket resolution.',
    saferFraming:
      'Customers see N% of tier-1 tickets resolved without human handoff, averaged across [period and cohort].',
    requiredProof:
      'Named customer case study with ticket-category breakdown, third-party review, or open methodology page.',
  },
  {
    claim: 'Cuts support staff by 80%.',
    type: 'Capability · Replacement',
    status: 'Overstated',
    riskLevel: 'High',
    sourceType: 'Sales page',
    whyItMatters:
      'Replacement claims in customer support draw scrutiny from operations leaders who own the headcount math, and from labor reporters who watch this category closely.',
    evidenceFound:
      'Sales page hero, one customer quote. The customer quote does not specifically attribute headcount reduction.',
    evidenceGap:
      'No customer with named before/after headcount disclosed. No labor-impact review.',
    recommendedAction:
      'Replace the categorical claim with task-level automation evidence. Disclose role reassignment vs role elimination.',
    saferFraming:
      'Customers automate the volume that previously required N tier-1 agents. Existing teams are typically reassigned to escalation, training, or quality roles.',
    requiredProof:
      'Customer headcount-impact case studies, role reassignment narratives.',
  },
  {
    claim: 'Detects customer intent with 98% accuracy.',
    type: 'Capability · Accuracy',
    status: 'Insufficient Public Evidence',
    riskLevel: 'Medium',
    sourceType: 'Product page',
    whyItMatters:
      'Accuracy claims are easy to make and hard to defend without benchmark publication. The number invites comparison to alternative tools that also publish numbers.',
    evidenceFound:
      'Product page, one demo video. No benchmark dataset, no methodology description, no comparison.',
    evidenceGap:
      'No public benchmark, no comparison cohort, no description of "intent" categories evaluated.',
    recommendedAction:
      'Publish the benchmark methodology. Define intent categories. Compare against a baseline.',
    saferFraming:
      'On the [benchmark dataset], our intent classifier resolves N% of cases correctly across the [categories] category.',
    requiredProof:
      'Public benchmark document, dataset description, comparison table.',
  },
  {
    claim: 'HIPAA-compliant agents.',
    type: 'Compliance · Healthcare',
    status: 'Unsupported',
    riskLevel: 'High',
    sourceType: 'Pricing page · Enterprise tier',
    whyItMatters:
      'HIPAA claims in customer support tooling are reviewed by hospital procurement and CISO teams. Self-attestation is not enough. Documentation discipline is the entire signal.',
    evidenceFound:
      'A pricing-page bullet in the Enterprise tier. No BAA template, no published security architecture, no third-party attestation.',
    evidenceGap:
      'Nothing in the public record substantiates HIPAA alignment.',
    recommendedAction:
      'Remove the standalone claim until backed by program documentation. Describe specific safeguards in plain language.',
    saferFraming:
      'For healthcare customers, we offer a BAA, role-based access, and audit logging. Our security architecture is documented at [link].',
    requiredProof:
      'BAA template, security whitepaper, named security contact, third-party attestation if in progress.',
  },
];

// ──────────────────────────────────────────────────────────────────────
// ARCHETYPE 04 — AI Healthcare Admin
// ──────────────────────────────────────────────────────────────────────

const aiHealthcareAdminClaims: Claim[] = [
  {
    claim: 'Our AI replaces your front desk.',
    type: 'Capability · Replacement',
    status: 'Overstated',
    riskLevel: 'High',
    sourceType: 'Homepage hero',
    whyItMatters:
      'Replacement claims in healthcare administration imply removal of human review at the point patients first interact with the practice. Boards and licensing bodies watch this language.',
    evidenceFound:
      'Homepage hero, one product video. No description of which front-desk functions are automated and which retain human review.',
    evidenceGap:
      'No published workflow showing where human staff remain in the loop, particularly on clinical or insurance escalations.',
    recommendedAction:
      'Replace the categorical claim with specific task automation. Foreground the staff approval step.',
    saferFraming:
      'Automates routine intake, scheduling, and reminders. Clinical questions and exception cases route to your licensed staff.',
    requiredProof:
      'Workflow diagram with staff-approval steps marked, sample patient interaction with the staff handoff visible.',
  },
  {
    claim: 'No staff training required.',
    type: 'Capability · Onboarding',
    status: 'Weakly Supported',
    riskLevel: 'Low',
    sourceType: 'Pricing page',
    whyItMatters:
      'Onboarding-cost claims are friction-removers for the buyer. When they don\'t match reality, they cost trust in the first week.',
    evidenceFound:
      'Pricing page and a single customer quote that mentions same-day setup.',
    evidenceGap:
      'No published time-to-first-value, no customer cohort breakdown.',
    recommendedAction:
      'Publish a typical time-to-first-value range. Describe what the staff workflow looks like on day one.',
    saferFraming:
      'Most clinics are operational within 24 hours of BAA execution. Staff continue to use their existing PMS exactly as before.',
    requiredProof:
      'Time-to-first-value chart, sample onboarding timeline.',
  },
  {
    claim: 'Reduces no-show rate by 40%.',
    type: 'Outcome · No-show',
    status: 'Weakly Supported',
    riskLevel: 'Medium',
    sourceType: 'Case study card',
    whyItMatters:
      'No-show reduction is the most-checked metric on healthcare admin tooling. Methodology matters more than the headline number.',
    evidenceFound:
      'One named customer case study with a stated before/after rate.',
    evidenceGap:
      'Sample size of one. No cohort study, no time-window standardization.',
    recommendedAction:
      'Expand the sample. Disclose the time window and patient cohort.',
    saferFraming:
      'In [customer name]\'s practice, no-show rate fell from X% to Y% across [time window] after deployment.',
    requiredProof:
      'Multi-customer cohort study, methodology publication.',
  },
  {
    claim: 'Fully HIPAA-compliant.',
    type: 'Compliance · Healthcare',
    status: 'Reviewed',
    riskLevel: 'Low',
    sourceType: 'Trust center · Security page',
    whyItMatters:
      'HIPAA claims are reviewed by every potential customer\'s compliance officer. Documentation is the entire signal.',
    evidenceFound:
      'Trust center page with BAA template, security architecture, role-based access description, third-party attestation summary, named contact.',
    evidenceGap:
      'None visible. Recommended cadence: annual reattestation.',
    recommendedAction:
      'Keep the trust center surfaced near the HIPAA claim. Annual reattestation maintains the signal.',
    saferFraming:
      'HIPAA claim and trust center can sit together with no further qualification.',
    requiredProof:
      'Already present.',
  },
];

// ──────────────────────────────────────────────────────────────────────
// ARCHETYPE 05 — Medical & Wellness Clinic
// ──────────────────────────────────────────────────────────────────────

const medicalWellnessClinicClaims: Claim[] = [
  {
    claim: 'Lose 20 lbs in 30 days, guaranteed.',
    type: 'Outcome · Patient',
    status: 'Unsupported',
    riskLevel: 'High',
    sourceType: 'Homepage hero',
    whyItMatters:
      'Outcome guarantees on patient-facing pages draw both regulatory attention (FTC, state medical boards) and platform-level review (Google Ads, Meta) before any patient sees them.',
    evidenceFound:
      'Homepage hero. Repeated on two service pages. No source citation, no patient cohort, no clinical trial reference.',
    evidenceGap:
      'No clinical evidence, no patient cohort data, no defined timeframe-and-outcome description.',
    recommendedAction:
      'Remove the categorical guarantee. Replace with framing that describes typical results without promising specific outcomes.',
    saferFraming:
      'A medically supervised program designed to support sustained weight loss. Results vary by patient.',
    requiredProof:
      'For any specific outcome cited: source citation, patient cohort, oversight description.',
  },
  {
    claim: 'Our Botox treatments are 100% safe.',
    type: 'Safety · Patient',
    status: 'Overstated',
    riskLevel: 'High',
    sourceType: 'Treatment page',
    whyItMatters:
      'Safety claims at "100%" do not match the consent forms patients sign on arrival. The mismatch erodes the consent itself and draws scrutiny.',
    evidenceFound:
      'Treatment page, repeated in one social post. No risk disclosure.',
    evidenceGap:
      'The claim contradicts standard patient consent language for injectable treatments.',
    recommendedAction:
      'Replace categorical safety language with risk disclosure consistent with informed consent.',
    saferFraming:
      'Performed by licensed clinicians under standard injectable protocols. Risks and side effects are discussed at consultation.',
    requiredProof:
      'Patient consent form, risk disclosure description, clinician credentials surface.',
  },
  {
    claim: 'Featured in Vogue, Allure, and Harper\'s Bazaar.',
    type: 'Trust · Press',
    status: 'Insufficient Public Evidence',
    riskLevel: 'Low',
    sourceType: 'Press logos strip',
    whyItMatters:
      'Press claims are the easiest for prospects to verify and the most damaging when verification fails. A Google search either confirms or quietly closes the page.',
    evidenceFound:
      'Logo strip on homepage. No article links.',
    evidenceGap:
      'No linked article. The claim asks the reader to trust without checking.',
    recommendedAction:
      'Link each logo to the named article. Display publication date and headline.',
    saferFraming:
      'Featured in: [Publication] · [Headline] · [Date] (link).',
    requiredProof:
      'Article links, archive backup links in case originals move.',
  },
  {
    claim: 'Board-certified providers on every treatment.',
    type: 'Credentials',
    status: 'Reviewed',
    riskLevel: 'Low',
    sourceType: 'Provider page',
    whyItMatters:
      'Credential claims are the strongest trust signal a clinic can publish. When verified, they earn the buyer\'s benefit of the doubt across the rest of the page.',
    evidenceFound:
      'Provider page lists each clinician by name, board certification, and state license number.',
    evidenceGap:
      'None visible. Recommended cadence: annual credential check, immediate update on staff change.',
    recommendedAction:
      'Keep the provider page surfaced near every treatment claim. Annual reattestation maintains the signal.',
    saferFraming:
      'Credential claim and provider page can sit together with no further qualification.',
    requiredProof:
      'Already present.',
  },
];

// ──────────────────────────────────────────────────────────────────────
// Universal fix plan (reused across archetypes)
// ──────────────────────────────────────────────────────────────────────

const COMMON_FIX_PLAN = [
  { num: '01', label: 'Define every categorical claim',     body: 'Replace "fully," "never," "100%," and "always" with bounded language a buyer can verify.' },
  { num: '02', label: 'Attribute self-reported numbers',    body: 'Every revenue, customer-count, and outcome number gets a footnote describing how it is measured.' },
  { num: '03', label: 'Add evidence within one cursor-move',body: 'Each capability claim sits within one scroll of a customer attestation, case study, or methodology link.' },
  { num: '04', label: 'Surface methodology pages',          body: 'Reliability, security, and benchmark claims point to the methodology and the calculation, not just the number.' },
  { num: '05', label: 'Refresh on a cadence',               body: 'Press logos, customer logos, and credential pages get annually re-verified. Stale proof is worse than missing proof.' },
  { num: '06', label: 'Schedule the rescan',                body: 'Claims change. Schedule a 90-day rescan to catch drift before a prospect, journalist, or investor does.' },
];

// ──────────────────────────────────────────────────────────────────────
// Audit records
// ──────────────────────────────────────────────────────────────────────

export const CLAIM_AUDITS: Record<string, ClaimAudit> = {
  'autonomous-ai-26q2': {
    publicId: 'autonomous-ai-26q2',
    archetype: 'autonomous-ai',
    companyType: 'Autonomous AI operations platform (archetype)',
    domain: 'example-autonomous.ai',
    auditDate: '2026-06-12',
    auditExpires: '2026-09-10',
    pagesReviewed: 'Homepage, product pages (×2), founder announcement, investor narrative, public review surface',
    claimsReviewed: 9,
    primaryRiskTheme: 'High-velocity AI-native claims with uneven public evidence visibility',
    riskScore: 78,
    badge: 'Claim Audit Completed',
    publicSafeFindings: [
      'Three categorical claims about autonomy and headcount need bounded framing.',
      'ARR claim requires a published definition and measurement date.',
      'Reliability claim is well-supported by the live status page.',
    ],
    methodology: PUBLIC_METHODOLOGY,
    claims: autonomousAiClaims,
    fixPlan: COMMON_FIX_PLAN,
    auditSeal: {
      sealVersion: 'scrutexity-seal-v1',
      algorithm: 'sha256',
      url: 'https://example-autonomous.ai',
      auditId: 'autonomous-ai-26q2',
      capturedAt: '2026-06-12T10:00:00-04:00',
      contentLength: 14520,
      sha256: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      normalizedSha256: 'bf078c187d7f7813a8efc984285b9b8af2e83ee91e921bc6f49c5e7b25a3d70e',
      normalization: {
        trimWhitespace: true,
        collapseWhitespace: true,
        lowercase: false
      },
      disclaimer: 'This seal verifies the reviewed content snapshot, not the truth, legality, clinical accuracy, ranking outcome, or compliance status of any claim.'
    }
  },
  'ai-sales-tool-26q2': {
    publicId: 'ai-sales-tool-26q2',
    archetype: 'ai-sales-tool',
    companyType: 'AI sales prospecting and outreach tool (archetype)',
    domain: 'example-sales.ai',
    auditDate: '2026-06-14',
    auditExpires: '2026-09-12',
    pagesReviewed: 'Homepage, product page, pricing page, footer trust strip, three customer story pages',
    claimsReviewed: 7,
    primaryRiskTheme: 'Outcome multipliers and trust-by-default compliance language',
    riskScore: 71,
    badge: 'Claim Audit Completed',
    publicSafeFindings: [
      'The 10× pipeline headline lacks baseline disclosure and methodology.',
      'GDPR-compliant-by-default claim is unsupported in the public record.',
      'Customer-count footer claim needs a defined denominator.',
    ],
    methodology: PUBLIC_METHODOLOGY,
    claims: aiSalesToolClaims,
    fixPlan: COMMON_FIX_PLAN,
  },
  'ai-customer-support-26q2': {
    publicId: 'ai-customer-support-26q2',
    archetype: 'ai-customer-support',
    companyType: 'AI customer support automation (archetype)',
    domain: 'example-support.ai',
    auditDate: '2026-06-16',
    auditExpires: '2026-09-14',
    pagesReviewed: 'Homepage, sales page, product page, pricing page, enterprise security page',
    claimsReviewed: 8,
    primaryRiskTheme: 'Deflection and replacement claims paired with healthcare compliance language',
    riskScore: 74,
    badge: 'Claim Audit Completed',
    publicSafeFindings: [
      'The 95% deflection figure needs a methodology page.',
      'The headcount-reduction claim needs role-reassignment vs role-elimination evidence.',
      'The HIPAA bullet on the Enterprise tier is unsupported by visible documentation.',
    ],
    methodology: PUBLIC_METHODOLOGY,
    claims: aiCustomerSupportClaims,
    fixPlan: COMMON_FIX_PLAN,
  },
  'ai-healthcare-admin-26q2': {
    publicId: 'ai-healthcare-admin-26q2',
    archetype: 'ai-healthcare-admin',
    companyType: 'AI front-desk and patient-intake automation (archetype)',
    domain: 'example-healthcare.ai',
    auditDate: '2026-06-17',
    auditExpires: '2026-09-15',
    pagesReviewed: 'Homepage, pricing page, trust center, customer case study, security architecture page',
    claimsReviewed: 6,
    primaryRiskTheme: 'Replacement claims at the clinical boundary, paired with strong compliance documentation',
    riskScore: 52,
    badge: 'Claim Audit Completed',
    publicSafeFindings: [
      'The "replaces your front desk" headline benefits from explicit staff-approval framing.',
      'The HIPAA claim is well-supported by the published trust center.',
      'The no-show case study needs a wider cohort to support the headline figure.',
    ],
    methodology: PUBLIC_METHODOLOGY,
    claims: aiHealthcareAdminClaims,
    fixPlan: COMMON_FIX_PLAN,
  },
  'medical-wellness-clinic-26q2': {
    publicId: 'medical-wellness-clinic-26q2',
    archetype: 'medical-wellness-clinic',
    companyType: 'Multi-service medical aesthetics and wellness clinic (archetype)',
    domain: 'example-clinic.com',
    auditDate: '2026-06-18',
    auditExpires: '2026-09-16',
    pagesReviewed: 'Homepage, treatment pages (×3), provider page, press logo strip, social posts (×4)',
    claimsReviewed: 8,
    primaryRiskTheme: 'Patient-facing outcome and safety claims paired with strong credentialing',
    riskScore: 81,
    badge: 'Claim Audit Completed',
    publicSafeFindings: [
      'The weight-loss outcome guarantee on the homepage requires categorical rewrite.',
      'The 100% safety claim on the Botox treatment page contradicts standard consent language.',
      'Press logo strip needs linked articles to verify the named publications.',
      'Provider credentialing page is excellent and earns the rest of the page benefit of the doubt.',
    ],
    methodology: PUBLIC_METHODOLOGY,
    claims: medicalWellnessClinicClaims,
    fixPlan: COMMON_FIX_PLAN,
    auditSeal: {
      sealVersion: 'scrutexity-seal-v1',
      algorithm: 'sha256',
      url: 'https://example-clinic.com',
      auditId: 'medical-wellness-clinic-26q2',
      capturedAt: '2026-06-18T14:30:00-04:00',
      contentLength: 8940,
      sha256: 'c35e3a890a9efcd781bcfefd6e810a9cfabda10ec76ac49b6b7a5cd4c8e76da7',
      normalizedSha256: 'df3cf7819cefd6e107fa8bfda1325ac9cb0ef86a7dcfef6bb1b0c95dcf82acde',
      normalization: {
        trimWhitespace: true,
        collapseWhitespace: true,
        lowercase: false
      },
      disclaimer: 'This seal verifies the reviewed content snapshot, not the truth, legality, clinical accuracy, ranking outcome, or compliance status of any claim.'
    }
  },
};

export function getAudit(publicId: string): ClaimAudit | undefined {
  if (CLAIM_AUDITS[publicId]) {
    return CLAIM_AUDITS[publicId];
  }
  // Fallback template matching for dynamic publicId (testing custom URLs)
  const lowerId = publicId.toLowerCase();
  if (lowerId.includes('medical') || lowerId.includes('wellness') || lowerId.includes('clinic')) {
    return { ...CLAIM_AUDITS['medical-wellness-clinic-26q2'], publicId };
  }
  if (lowerId.includes('sales') || lowerId.includes('marketing') || lowerId.includes('outreach')) {
    return { ...CLAIM_AUDITS['ai-sales-tool-26q2'], publicId };
  }
  if (lowerId.includes('support') || lowerId.includes('customer') || lowerId.includes('service')) {
    return { ...CLAIM_AUDITS['ai-customer-support-26q2'], publicId };
  }
  if (lowerId.includes('healthcare') || lowerId.includes('admin') || lowerId.includes('pms')) {
    return { ...CLAIM_AUDITS['ai-healthcare-admin-26q2'], publicId };
  }
  return { ...CLAIM_AUDITS['autonomous-ai-26q2'], publicId };
}

export function listAudits(): ClaimAudit[] {
  return Object.values(CLAIM_AUDITS);
}

