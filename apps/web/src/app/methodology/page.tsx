import { Metadata } from "next";
import { ShieldCheck, Scale, Network, Activity, Lock, AlertTriangle, FileCheck2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Methodology & Transparency | Scrutexity",
  description: "How Scrutexity maps public marketing claims against established regulatory enforcement patterns to provide forensic intelligence for counsel.",
};

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-bureau-sage/30 pb-32">
      
      {/* ── HEADER ── */}
      <header className="relative pt-40 pb-20 px-6 border-b border-sand-deep/20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-bureau-sage/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sand-deep/40 bg-paper-light/50 backdrop-blur-sm mb-6">
            <ShieldCheck size={14} className="text-bureau-sage" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted" style={{ fontFamily: MONO }}>
              Forensic Intelligence
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-ink tracking-tight mb-6">
            Methodology
          </h1>
          <p className="text-lg md:text-xl text-muted font-light leading-relaxed max-w-2xl mx-auto">
            Scrutexity operates as a forensic intelligence layer for legal, compliance, and regulatory teams. Our system is designed to identify exposure risk in public-facing marketing claims by mapping them against established regulatory enforcement patterns.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-16 space-y-24">
        
        {/* ── 1. SCOPE OF OPERATION ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-sand-deep/20" />
            <span className="text-xs font-mono uppercase tracking-widest text-bureau-sage" style={{ fontFamily: MONO }}>1. Scope of Operation</span>
            <div className="h-px flex-1 bg-sand-deep/20" />
          </div>
          
          <p className="text-ink leading-relaxed mb-8 text-lg font-light text-center max-w-3xl mx-auto">
            We do not provide legal advice, nor does our platform attempt to simulate legal judgment. Instead, Scrutexity automates the deterministic discovery of high-risk syntactic patterns and structural mismatches, allowing counsel to focus on remediation and strategic risk management.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-paper-light border border-sand-deep/40 p-8 rounded-2xl">
              <h3 className="text-lg font-display text-ink mb-6 flex items-center gap-2">
                <CheckCircleIcon /> What Scrutexity Does
              </h3>
              <ul className="space-y-6">
                <ListItem title="Continuous Surface Monitoring" text="Automatically tracks and versions public-facing web properties, capturing the raw DOM and rendered output to identify claim drift." />
                <ListItem title="Pattern Matching" text="Maps isolated marketing claims against a proprietary library of structural mismatches commonly cited in FTC consent decrees and FDA warning letters." />
                <ListItem title="Evidentiary Provenance" text="Generates timestamped, cryptographic hashes (SHA-256) of identified claims to establish an immutable baseline of public exposure." />
                <ListItem title="Structural Remediation Proposals" text="Suggests counsel-ready structural modifications that preserve commercial intent while satisfying common evidentiary bounds." />
              </ul>
            </div>
            
            <div className="bg-paper-light border border-exposure-red/20 p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-exposure-red/5 blur-[40px] pointer-events-none" />
              <h3 className="text-lg font-display text-ink mb-6 flex items-center gap-2">
                <XCircleIcon /> What Scrutexity Does Not Do
              </h3>
              <ul className="space-y-6">
                <ListItem title="We do not provide legal advice" text="The platform cannot interpret the nuance of individual business operations or un-published internal clinical data." />
                <ListItem title="We do not replace counsel" text="Scrutexity is a diagnostic and surveillance tool. Final determination of regulatory compliance requires human legal judgment." />
                <ListItem title="We do not 'freestyle' risk assessments" text="Our engine does not rely on unbounded generative AI guessing; risk vectors must map to established enforcement precedents." />
              </ul>
            </div>
          </div>
        </section>

        {/* ── 2. THE PATTERN LIBRARY ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-bureau-sage" style={{ fontFamily: MONO }}>2. The Pattern Library</span>
            <div className="h-px flex-1 bg-sand-deep/20" />
          </div>
          
          <div className="prose prose-invert prose-p:text-muted prose-p:leading-relaxed max-w-none">
            <p className="text-lg text-ink font-light mb-8">
              At the core of Scrutexity is a proprietary, actively maintained Pattern Library. This library codifies the syntactic and structural markers of regulatory exposure. Our inputs are strictly deterministic and precedent-based.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="border border-sand-deep/30 p-5 rounded-xl bg-paper">
                <Scale className="text-bureau-sage mb-3" size={20} />
                <h4 className="text-sm font-semibold text-ink mb-2">FTC Section 5 Precedents</h4>
                <p className="text-xs text-muted leading-relaxed">We codify patterns of deception and unfairness derived from published consent decrees, specifically focusing on absolute outcome guarantees and implied endorsements.</p>
              </div>
              <div className="border border-sand-deep/30 p-5 rounded-xl bg-paper">
                <Activity className="text-bureau-sage mb-3" size={20} />
                <h4 className="text-sm font-semibold text-ink mb-2">FDA Enforcement Actions</h4>
                <p className="text-xs text-muted leading-relaxed">We maintain a structural mapping of warning letters and Untitled Letters, prioritizing off-label promotion markers and unapproved indications.</p>
              </div>
              <div className="border border-sand-deep/30 p-5 rounded-xl bg-paper">
                <FileCheck2 className="text-bureau-sage mb-3" size={20} />
                <h4 className="text-sm font-semibold text-ink mb-2">Industry Guidelines</h4>
                <p className="text-xs text-muted leading-relaxed">Where applicable, the library incorporates established self-regulatory frameworks (e.g., NAD decisions) to map structural compliance boundaries.</p>
              </div>
            </div>

            <div className="bg-sand-deep/5 border border-sand-deep/30 p-6 rounded-xl">
              <p className="m-0 text-sm font-mono text-ink" style={{ fontFamily: MONO }}>
                When Scrutexity evaluates a page, it is not "asking an AI if the page is legal." It is executing a high-speed matrix comparison between the brand's public language and our codified library of known regulatory triggers.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. CLAIM EVALUATION MECHANICS ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-bureau-sage" style={{ fontFamily: MONO }}>3. Claim Evaluation Mechanics</span>
            <div className="h-px flex-1 bg-sand-deep/20" />
          </div>

          <p className="text-muted leading-relaxed mb-8">
            The Scrutexity engine processes public marketing surfaces through a multi-stage pipeline:
          </p>

          <div className="space-y-4">
            <Step number="01" title="Extraction & Isolation" text="The system parses the raw DOM, isolating distinct semantic claims from structural boilerplate." />
            <Step number="02" title="Modifier Analysis" text='We algorithmically isolate absolute modifiers ("guaranteed," "clinically proven," "permanent," "reverses") and relative modifiers ("supports," "improves," "temporary").' />
            <Step number="03" title="Vector Mapping" text="The isolated claims are mapped against the Pattern Library. If a structural match is found, the claim is flagged with a specific Regulatory Vector (e.g., FTC_SEC_5_DECEPTIVE)." />
            <Step number="04" title="Severity Scoring" text="Vectors are assigned a deterministic severity score (HIGH, MEDIUM, LOW) based strictly on the historical frequency of that specific pattern triggering formal regulatory action." />
          </div>
        </section>

        {/* ── 4. HUMAN IN THE LOOP ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-bureau-sage" style={{ fontFamily: MONO }}>4. The Human-in-the-Loop Principle</span>
            <div className="h-px flex-1 bg-sand-deep/20" />
          </div>

          <div className="bg-paper-light border-l-2 border-bureau-sage pl-6 py-2">
            <p className="text-lg text-ink font-light leading-relaxed mb-4">
              Scrutexity is built on the principle that AI should accelerate discovery, not dictate conclusions.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              When the system flags a "High Severity" gap, it is alerting counsel to a structural mismatch that historically invites regulatory scrutiny. The platform proposes safer structural alternatives, but <strong>these proposals are starting points for human review, not final copy.</strong>
            </p>
            <p className="text-muted leading-relaxed text-sm mt-4">
              We expect—and require—that General Counsel, outside regulatory attorneys, or designated compliance officers review all Exhibit Packages and approve any remediation applied to public surfaces.
            </p>
          </div>
        </section>

        {/* ── 5. EVIDENCE & PROVENANCE ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-bureau-sage" style={{ fontFamily: MONO }}>5. Evidence & Provenance</span>
            <div className="h-px flex-1 bg-sand-deep/20" />
          </div>
          
          <p className="text-muted leading-relaxed mb-8">
            A primary function of Scrutexity is establishing a defensible, immutable record of what a brand claimed publicly on a specific date. This is critical for M&A diligence and regulatory defense.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <div className="h-8 w-8 rounded-lg bg-paper border border-sand-deep/40 flex items-center justify-center mb-4">
                <ClockIcon />
              </div>
              <h4 className="text-sm font-semibold text-ink mb-2">Timestamped Capture</h4>
              <p className="text-xs text-muted leading-relaxed">Every scan records the exact UTC timestamp of the evaluation.</p>
            </div>
            <div>
              <div className="h-8 w-8 rounded-lg bg-paper border border-sand-deep/40 flex items-center justify-center mb-4">
                <HashIcon />
              </div>
              <h4 className="text-sm font-semibold text-ink mb-2">Cryptographic Hashing</h4>
              <p className="text-xs text-muted leading-relaxed">The raw DOM and the specific flagged claims are hashed using SHA-256. This creates a one-way cryptographic fingerprint.</p>
            </div>
            <div>
              <div className="h-8 w-8 rounded-lg bg-paper border border-sand-deep/40 flex items-center justify-center mb-4">
                <Lock size={16} className="text-muted" />
              </div>
              <h4 className="text-sm font-semibold text-ink mb-2">Sealed Audit Trails</h4>
              <p className="text-xs text-muted leading-relaxed">The resulting Exhibit Package serves as a "Provenance Receipt" to prove exactly when a claim was identified and remediated.</p>
            </div>
          </div>
        </section>

        {/* ── 6. LIMITATIONS ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-bureau-sage" style={{ fontFamily: MONO }}>6. System Limitations and Boundaries</span>
            <div className="h-px flex-1 bg-sand-deep/20" />
          </div>
          
          <p className="text-muted leading-relaxed mb-6">
            Transparency requires acknowledging the operational boundaries of our intelligence layer:
          </p>

          <div className="space-y-4">
            <Limitation title="Contextual Blind Spots" text="Scrutexity analyzes the public surface. It cannot evaluate the quality of a brand’s internal clinical trials, nor can it verify if a company possesses competent and reliable scientific evidence off-page." />
            <Limitation title="Visual Nuance" text='While our engine analyzes surrounding text for qualifying disclosures (e.g., "results may vary"), it may struggle to assess the adequacy of disclosures embedded deeply in complex video graphics or obscure UX flows.' />
            <Limitation title="Jurisdictional Constraints" text="The core Pattern Library is currently calibrated for United States federal regulatory frameworks (FTC/FDA). It does not automatically map to state-specific consumer protection laws or international regulatory regimes unless explicitly configured." />
          </div>
        </section>

      </main>
    </div>
  );
}

// ── UI HELPERS ──

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bureau-sage">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-exposure-red">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}

function HashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
      <line x1="4" y1="9" x2="20" y2="9"></line>
      <line x1="4" y1="15" x2="20" y2="15"></line>
      <line x1="10" y1="3" x2="8" y2="21"></line>
      <line x1="16" y1="3" x2="14" y2="21"></line>
    </svg>
  );
}

function ListItem({ title, text }: { title: string, text: string }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink mb-1">{title}</h4>
      <p className="text-sm text-muted leading-relaxed">{text}</p>
    </div>
  );
}

function Step({ number, title, text }: { number: string, title: string, text: string }) {
  return (
    <div className="flex gap-4 p-4 border border-sand-deep/20 rounded-xl bg-paper">
      <div className="text-xs font-mono text-bureau-sage pt-1" style={{ fontFamily: MONO }}>{number}</div>
      <div>
        <h4 className="text-sm font-semibold text-ink mb-1">{title}</h4>
        <p className="text-sm text-muted leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function Limitation({ title, text }: { title: string, text: string }) {
  return (
    <div className="p-5 border border-sand-deep/20 rounded-xl bg-paper flex gap-4 items-start">
      <AlertTriangle size={16} className="text-muted mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="text-sm font-semibold text-ink mb-1">{title}</h4>
        <p className="text-sm text-muted leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
