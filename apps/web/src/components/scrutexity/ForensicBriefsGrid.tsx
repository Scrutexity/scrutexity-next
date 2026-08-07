import { ShieldCheck, ArrowRight, Lock } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const briefs = [
  {
    id: "01",
    industry: "Medical Wellness & Aesthetics",
    title: "Regulatory Intercept: Absolute Efficacy in GLP-1 Promotion",
    summary: "Scrutexity flagged and neutralized an FDA off-label exposure vector related to absolute weight-loss guarantees before a PE roll-up diligence phase.",
    vector: "FDA_OFF_LABEL_PROMOTION",
  },
  {
    id: "02",
    industry: "B2B SaaS & Artificial Intelligence",
    title: "Liability Containment: Algorithmic Output Guarantees",
    summary: "Intercept of unsubstantiated \"hallucination-free\" marketing claims that established a dangerous breach of contract liability surface.",
    vector: "FTC_SEC_5_DECEPTIVE",
  },
  {
    id: "03",
    industry: "Fintech & Digital Assets",
    title: "Enforcement Preemption: Yield and Risk Misrepresentation",
    summary: "Rapid identification and remediation of implied zero-risk yield claims in violation of SEC/CFPB enforcement patterns.",
    vector: "SEC_DECEPTIVE_YIELD",
  }
];

export function ForensicBriefsGrid() {
  return (
    <div className="w-full mt-24">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <div className="h-px w-12 bg-sand-deep/20" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted" style={{ fontFamily: MONO }}>
          Recent Forensic Briefs
        </span>
        <div className="h-px w-12 bg-sand-deep/20" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
        {briefs.map((brief) => (
          <div key={brief.id} className="group relative bg-paper-light border border-sand-deep/30 rounded-2xl p-6 hover:border-bureau-sage/40 transition-all duration-300 hover:shadow-2xl overflow-hidden cursor-default flex flex-col h-full">
            
            {/* Background Accent */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-bureau-sage/5 blur-[20px] group-hover:bg-bureau-sage/10 transition-colors pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-muted tracking-widest uppercase" style={{ fontFamily: MONO }}>
                {brief.industry}
              </span>
              <span className="text-[10px] font-mono text-bureau-sage tracking-widest bg-bureau-sage/10 px-2 py-0.5 rounded" style={{ fontFamily: MONO }}>
                FILE_{brief.id}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-lg font-display text-ink leading-snug mb-3">
              {brief.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed font-light flex-grow">
              {brief.summary}
            </p>

            {/* Footer / Vector */}
            <div className="mt-6 pt-4 border-t border-sand-deep/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-muted" />
                <span className="text-[10px] font-mono text-muted uppercase" style={{ fontFamily: MONO }}>
                  {brief.vector}
                </span>
              </div>
              <Lock size={14} className="text-muted opacity-50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
