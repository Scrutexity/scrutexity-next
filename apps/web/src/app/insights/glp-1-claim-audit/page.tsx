import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'We Reviewed 10 GLP-1 Clinic Pages — 5 Claim Patterns That Keep Appearing | Scrutexity',
  description: 'We analyzed 10 GLP-1 and medical weight-loss clinic websites. Here are the 5 most common claim patterns — numeric outcome promises, FDA approval confusion, missing side effect disclosure, before/after without context, and unsupported "clinically proven" language.',
  alternates: { canonical: '/insights/glp-1-claim-audit' }
};

const patterns = [
  {
    id: 'guaranteed-results',
    title: 'Pattern 1: Guaranteed Results — Numeric Outcome Promises Without Cohort Data',
    summary: 'A specific weight-loss number or percentage presented as what patients will achieve, without disclosing what the supporting cohort looked like.',
    examples: [
      '"Lose 15–20 pounds in your first month"',
      '"Average 12% body weight reduction"',
      '"80% of patients lose significant weight within 90 days"'
    ],
    analysis: 'The FTC\'s Guides for Weight Loss Advertising are explicit: numeric outcome claims require competent and reliable scientific evidence, typically a well-designed clinical study with a subject population relevant to the target audience. The issue isn\'t that the numbers are wrong — it\'s that the claim implies a guaranteed outcome while the data backing it is either absent or drawn from manufacturer trials for brand-name medications (not compound formulations or the specific program being advertised).',
    example: {
      name: 'Ro.co/weight-loss',
      detail: 'Ro\'s weight-loss page is one of the better-disclaimed examples in the sample. They use "Lose 20% body weight on average with Zepbound*" — and the asterisk correctly points to the SURMOUNT-1 manufacturer trials (tirzepatide). The disclaimer is present and references a named study. However, the claim still sits in the hero section, above the fold. A patient who reads "Lose 20% body weight" and then clicks "Get Started" isn\'t necessarily parsing the asterisk footnote about clinical trial averages. And if the page is also referencing compounded alternatives — a growing pattern for telehealth providers — the same data doesn\'t transfer.',
      safer: 'Pair numeric language with a named source and the relevant cohort. "In the SURMOUNT-1 clinical trial (N=2,539), patients taking tirzepatide lost an average of 20.9% body weight over 72 weeks. Individual results vary."'
    }
  },
  {
    id: 'fda-approved-confusion',
    title: 'Pattern 2: FDA Approved Confusion — Conflating FDA-Approved Drugs with Compounded Formulations',
    summary: 'Using "FDA approved" descriptively on pages that offer compounded semaglutide or tirzepatide, or failing to distinguish between the FDA status of the brand-name drug versus the compounded version.',
    examples: [
      '"FDA-approved GLP-1 medications for weight loss"',
      '"Our providers prescribe FDA-approved semaglutide"',
      'Mixing photos of Ozempic/Mounjaro pens with "Now offering compounded semaglutide" in the same section'
    ],
    analysis: 'The FDA has been explicit: compounded drugs are not FDA-approved. The FDA\'s September 2024 and March 2025 enforcement updates on GLP-1 compounding make clear that stating or implying FDA approval for compounded semaglutide or tirzepatide is misleading. Even when a page correctly links to brand-name trials, presenting those trial results alongside a compounding offer creates an implied equivalence that the public record does not support. In March 2025, the FDA sent warning letters to multiple compounding pharmacies and telehealth operations specifically for misleading GLP-1 advertising.',
    safer: 'Use precise language. "Brand-name Wegovy (semaglutide) is FDA approved for weight management. Compounded semaglutide is not FDA approved, but is available through licensed compounding pharmacies when the brand-name drug is in shortage." Then separate the offers visually so the patient understands what they are choosing.'
  },
  {
    id: 'no-side-effects',
    title: 'Pattern 3: No Side Effects / Safe for Everyone — Minimizing Known Side Effect Profiles',
    summary: 'Downplaying or omitting the side effect profile of GLP-1 medications, or presenting them as universally safe.',
    examples: [
      '"Safe for all patients"',
      '"Well-tolerated with minimal side effects" (without listing what those are)',
      'Zero side effect disclosure near the sign-up CTA — buried in a terms page or absent entirely',
      '"No downtime" used interchangeably with "no side effects"'
    ],
    analysis: 'GLP-1 medications have documented, non-trivial side effects. Nausea, vomiting, diarrhea, constipation, and abdominal pain affect a significant portion of patients in clinical trials. More serious risks — pancreatitis, gallbladder events, thyroid C-cell tumors (in animal studies), and gastroparesis — are listed in prescribing information for brand-name medications. The FDA prescribing information for semaglutide (Wegovy/Ozempic) includes a boxed warning for thyroid C-cell tumors. When a page says "no side effects" or "safe for everyone," the contrast with the FDA prescribing information is stark. Compound GLP-1 medications may have additional risks related to sterility, potency variability, and dosing errors.',
    safer: 'List common and serious side effects near the offer, with a link to full prescribing information. Never claim "no side effects" — it is directly contradicted by FDA documentation.'
  },
  {
    id: 'before-after',
    title: 'Pattern 4: Before/After Without Context — Testimonial Framing Without Typical Result Disclosure',
    summary: 'Testimonial carousels with dramatic before/after imagery or transformation stories, without disclosing whether the results shown are typical or telling the viewer what typical results look like.',
    examples: [
      'Five-photo before/after carousels with no accompanying text about average or expected results',
      '"I lost 45 pounds in 3 months!" testimonials without any indication of whether that experience is representative',
      'Patient stories framed as "transformations" with no mention of program duration, adherence requirements, or concomitant lifestyle changes'
    ],
    analysis: 'The FTC\'s Endorsement Guides and Guides for Weight Loss Advertising treat before/after claims in weight-loss advertising as a high-scrutiny category. If a testimonial presents a specific outcome, and that outcome is not typical, the advertiser must clearly disclose what the generally expected result is. The FTC\'s 2023 update to its Endorsement Guides reinforced this: if you show an exceptional result, you cannot assume viewers will understand it\'s exceptional. You must state what typical results are. The combination of "transformation" language and a weight-loss medication creates a claim that requires evidentiary support from both a marketing and medical standpoint.',
    safer: 'Pair testimonials with a clear disclosure: "Individual results vary. In clinical trials, average weight loss with [medication] was [X]% over [Y] weeks." Place this text immediately adjacent to the testimonial, not in a footer.'
  },
  {
    id: 'clinically-proven',
    title: 'Pattern 5: Clinically Proven Unsupported — Citing Clinical Proof Without Naming Studies',
    summary: 'Using phrases like "clinically proven," "doctor recommended," or "scientifically formulated" without citing a specific study, journal, trial identifier, or named recommending physician.',
    examples: [
      '"Clinically proven results" with no hyperlink, footnote, or study reference',
      '"Doctor recommended" generically — no attribution to any specific physician or medical body',
      '"Backed by science" used as a header above a pricing table',
      '"Thousands of patients trust us" without any source for the patient count'
    ],
    analysis: '"Clinically proven" is a high-evidence claim. It asserts the existence of clinical data supporting the specific offering. Without naming the study, the trial, the journal, or the outcome measure, the claim is untestable by the reader. In a regulatory context, "clinically proven" for a compounded medication is particularly fraught. The clinical trials for semaglutide and tirzepatide were conducted on brand-name, FDA-approved formulations with specific dosing, purity, and delivery mechanisms. Applying that evidence base to compounded versions requires a level of bridging argument that most pages do not attempt. Ro\'s approach stands out — their Zepbound claim cites SURMOUNT-1 by name and links to the data. That level of specificity is what "clinically proven" should look like. Most pages in our sample did not reach that bar.',
    safer: 'Name the study. "In the SURMOUNT-1 trial (N=2,539), patients taking tirzepatide lost an average of 20.9% body weight." No unnamed studies.'
  }
];

const prevalenceData = [
  { category: 'Numeric outcome without cohort', pages: 8 },
  { category: 'FDA approval language issue', pages: 6 },
  { category: 'Side effect disclosure missing', pages: 7 },
  { category: 'Before/after without context', pages: 5 },
  { category: '"Clinically proven" unsupported', pages: 6 },
  { category: 'Compound equivalence implied', pages: 4 },
];

export default function GLP1ClaimTeardownPage() {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        
        <article className="prose prose-lg prose-slate max-w-none">
          
          {/* Title */}
          <p className="text-[10px] uppercase tracking-[0.2em] text-sage-deep font-semibold mb-4 font-mono">
            Published June 2026 · Scrutexity
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-espresso tracking-tight leading-[1.05] mb-8">
            We Reviewed 10 GLP-1 Clinic Pages — Here Are the 5 Claim Patterns That Keep Appearing
          </h1>
          <p className="lead text-xl text-mist leading-[1.6] mb-12">
            Every week, another med-spa, wellness clinic, or telehealth provider launches a weight-loss landing page. We ran 10 of them through the same claim-review framework to see what&apos;s actually being said — not in the fine print, but in the hero copy, testimonial sections, and price-comparison tables where patients actually look.
          </p>

          {/* Enforcement context */}
          <h2 className="font-display text-2xl text-espresso mt-12 mb-4">Why This Matters Right Now</h2>
          <p className="text-mist leading-[1.6] mb-6">
            GLP-1 advertising sits at the intersection of three active enforcement zones:
          </p>
          <ul className="text-mist leading-[1.6] mb-8 space-y-2">
            <li><strong className="text-espresso">FTC weight-loss advertising scrutiny</strong> — Numeric outcome claims, before/after testimonials, and weight-loss guarantees remain a priority enforcement category.</li>
            <li><strong className="text-espresso">FDA medication advertising standards</strong> — &ldquo;FDA approved&rdquo; has a specific meaning for specific medications. Compound semaglutide and tirzepatide do not carry FDA approval, yet the line between brand-name and compound language is blurred on many pages.</li>
            <li><strong className="text-espresso">State AG consumer protection actions</strong> — Attorneys general in New York, California, Texas, and Florida have opened inquiries into weight-loss clinic advertising, particularly around compounded GLP-1 claims.</li>
          </ul>

          {/* The patterns */}
          {patterns.map((pattern) => (
            <section key={pattern.id}>
              <h2 className="font-display text-2xl text-espresso mt-16 mb-4">{pattern.title}</h2>
              <p className="text-mist leading-[1.6] mb-4"><strong className="text-espresso">The pattern:</strong> {pattern.summary}</p>
              
              <h3 className="font-display text-lg text-espresso mt-8 mb-3">What we saw</h3>
              <ul className="text-mist leading-[1.6] mb-6 space-y-1">
                {pattern.examples.map((ex) => (
                  <li key={ex} className="text-clay font-mono text-sm italic">&ldquo;{ex}&rdquo;</li>
                ))}
              </ul>

              <h3 className="font-display text-lg text-espresso mt-8 mb-3">Why this is a problem</h3>
              <p className="text-mist leading-[1.6] mb-6">{pattern.analysis}</p>

              {'example' in pattern && pattern.example && (
                <>
                  <h3 className="font-display text-lg text-espresso mt-8 mb-3">Real example: {pattern.example.name}</h3>
                  <div className="bg-bone border border-sand-deep/30 rounded-xl p-6 mb-6">
                    <p className="text-sm text-mist leading-[1.6] mb-4">{pattern.example.detail}</p>
                    <div className="pl-4 border-l-2 border-sage-deep">
                      <p className="text-[10px] uppercase tracking-wider text-sage-deep font-semibold mb-1 font-mono">Safer approach</p>
                      <p className="text-sm text-espresso italic leading-[1.6]">{pattern.example.safer}</p>
                    </div>
                  </div>
                </>
              )}

              {!('example' in pattern) && (
                <div className="pl-4 border-l-2 border-sage-deep bg-bone/50 rounded-r-xl p-4 mb-6">
                  <p className="text-[10px] uppercase tracking-wider text-sage-deep font-semibold mb-1 font-mono">Safer approach</p>
                  <p className="text-sm text-espresso italic leading-[1.6]">{pattern.safer}</p>
                </div>
              )}
            </section>
          ))}

          {/* Summary table */}
          <h2 className="font-display text-2xl text-espresso mt-16 mb-4">Summary: What the 10-Page Review Told Us</h2>
          <p className="text-mist leading-[1.6] mb-6">
            We scanned 10 GLP-1 clinic pages through the same claim-review framework we use for every audit — checking medication language, outcome claims, testimonial framing, FDA approval wording, side effect disclosure, and AI answer surfaces.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-sand-deep/40">
                  <th className="text-left py-3 px-4 font-semibold text-espresso">Category</th>
                  <th className="text-right py-3 px-4 font-semibold text-espresso">Pages with at least one flagged claim</th>
                </tr>
              </thead>
              <tbody>
                {prevalenceData.map((row) => (
                  <tr key={row.category} className="border-b border-sand-deep/15">
                    <td className="py-3 px-4 text-mist">{row.category}</td>
                    <td className="py-3 px-4 text-right font-semibold text-espresso">{row.pages} / 10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-mist leading-[1.6] mb-12">
            These aren&apos;t isolated copywriting errors. They are industry-wide patterns produced by a market that grew faster than its regulatory guardrails. And they matter because the regulatory environment is catching up. A single page with three flagged claims — say, a numeric promise, an ambiguous FDA reference, and an unsupported &ldquo;clinically proven&rdquo; — creates exposure in multiple directions simultaneously. One FTC inquiry, one state AG letter, or one ad account suspension changes the economics of that page overnight.
          </p>

        </article>

        {/* CTA */}
        <div className="mt-12 border-t border-sand-deep/20 pt-12">
          <div className="text-center bg-bone border border-sand-deep/30 rounded-2xl p-8 md:p-12">
            <h2 className="font-display text-3xl text-espresso mb-4">Run a Free GLP-1 Claim Snapshot</h2>
            <p className="text-sm text-mist leading-[1.6] mb-8 max-w-xl mx-auto">
              The same framework we used to review these 10 pages is available to any clinic. Submit your GLP-1 or medical weight-loss page — you&apos;ll see your top three claim exposures with a risk label and a safer rewrite option for each.
            </p>
            <Link
              href="https://auditgpt.ai/snapshot?source=glp1-teardown"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sage-deep hover:bg-espresso text-cream font-bold uppercase tracking-wider text-xs rounded-xl transition-all duration-300"
            >
              Run Free Snapshot
              <ArrowRight size={16} />
            </Link>
            <p className="mt-6 text-xs text-mist/60 max-w-lg mx-auto leading-relaxed">
              For a full review covering every claim phrase, proof-gap table, AI Answer Reality Receipt, and structured next-action record: <Link href="/contact?intent=claim-support-review&source=glp1-teardown" className="text-sage-deep underline underline-offset-2 hover:text-espresso">Start a Claim Review</Link>.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-bone/50 border border-sand-deep/20 rounded-xl">
          <p className="text-[10px] text-mist/50 leading-relaxed font-mono">
            AuditGPT by Scrutexity reviews public-facing claim language against visible support. It does not provide legal, medical, clinical, regulatory, or prescribing advice, and does not certify compliance with FDA, FTC, or any state regulator. This teardown reflects claim observations from 10 publicly-accessible pages reviewed in June 2026. Pages may have been updated since the review date.
          </p>
        </div>

      </main>
    </div>
  );
}
