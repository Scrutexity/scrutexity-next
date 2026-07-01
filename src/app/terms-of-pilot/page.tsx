

export const metadata = {
  title: { absolute: 'Terms of Pilot | Scrutexity' },
  description: 'Terms and conditions for the Scrutexity 14-day pilot — $0 if missed-demand recovery isn\'t demonstrated.',
  alternates: { canonical: '/terms-of-pilot' },
};

export default function TermsOfPilot() {
  return (
    <main className="min-h-screen bg-cream text-espresso font-sans selection:bg-clay/20 pt-32 pb-24 px-6 flex flex-col">

      <div className="max-w-4xl mx-auto flex-1 w-full bg-white p-8 md:p-12 rounded-3xl border border-charcoal/10 shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-espresso font-display mb-8">Terms of Pilot</h1>
        <p className="text-sm uppercase tracking-widest font-sans font-bold text-espresso/50 mb-12">Last Updated: June 2026</p>

        <div className="prose prose-lg max-w-none font-sans prose-headings:font-display prose-headings:font-bold prose-p:leading-relaxed prose-p:text-mist prose-headings:text-espresso prose-strong:text-espresso">
          <h2>1. Introduction</h2>
          <p>
            These Terms of Pilot govern the 14-day implementation of Scrutexity’s non-clinical administrative infrastructure (the "Pilot"). By executing the Business Associate Agreement (BAA) and authorizing activation, the participating medical clinic ("Clinic") agrees to these terms.
          </p>

          <h2>2. The $0 Pilot Condition</h2>
          <p>
            The Pilot fee is $0 if missed-demand recovery is not demonstrated. "Demonstrated" is defined administratively, in writing, before activation — never by reference to procedure value, patient value, or clinical revenue:
          </p>
          <ul>
            <li><strong>Specific Metric:</strong> Missed-demand recovery is demonstrated when the minimum number of verified re-engaged bookings — agreed in writing with the Clinic at Day 0, prior to activation — is reached within the assessment window. A verified re-engaged booking means a previously missed or dormant inquiry with its source logged, a staff-approved conversation transcript on file, and a completed booking deposit (a non-clinical administrative event).</li>
            <li><strong>Counting Methodology:</strong> Only entries in the recovery ledger qualify. Scrutexity counts logged administrative events; it does not calculate, estimate, or claim clinical or appointment values. Any downstream value is the Clinic's own to assess.</li>
            <li><strong>Assessment Window:</strong> The assessment window begins on the date of Pilot activation and runs 30 days. If the agreed threshold is not met within this window, the Clinic qualifies for a full fee waiver under Section 5.</li>
            <li><strong>Determination and Disputes:</strong> Scrutexity and the Clinic will mutually review the recovery ledger at the conclusion of the assessment window. In the event of a dispute, Scrutexity's un-editable audit logs shall serve as the source of truth for logged entries.</li>
            <li><strong>Material Conditions:</strong> The condition applies only if the Clinic maintains the agreed-upon technical stack, does not interfere with inquiry routing during the assessment window, and processes routed booking links in the ordinary course of business.</li>
          </ul>
          <p>
            For clarity: Scrutexity provides non-clinical administrative infrastructure. Fees are flat platform fees and are never contingent on, calculated from, or shared with patient volume, procedure value, or medical revenue. Nothing in these terms is a guarantee of business results.
          </p>

          <h2>3. Business Associate Agreement (BAA)</h2>
          <p>
            Scrutexity will not activate any infrastructure until a formal BAA is executed by an authorized signatory of the Clinic. The BAA governs all handling of Protected Health Information (PHI) during the Pilot.
          </p>

          <h2>4. AI Search Citation Claims</h2>
          <p>
            Scrutexity's modules (such as Port 04) are <em>engineered for</em> optimal citation in AI search engines (e.g., Perplexity, ChatGPT). However, AI search citation algorithms are proprietary to third parties and not deterministic. Scrutexity makes no legal guarantee of specific ranking positions or first-card citations. Results vary based on local competition and algorithmic updates.
          </p>

          <h2>5. Rollback and Full Fee Waiver</h2>
          <p>
            If the threshold defined in Section 2 is not reached within the 30-day assessment window, the Clinic pays nothing for the Pilot period. All Pilot fees — including setup fees and recurring fees — are waived in full, and the infrastructure is cleanly rolled back at no cost to the Clinic.
          </p>
        </div>
      </div>
      <div className="mt-24">
      </div>
    </main>
  );
}
