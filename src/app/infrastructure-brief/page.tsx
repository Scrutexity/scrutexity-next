import Link from 'next/link';

export default function InfrastructureBriefPage() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-[#FDF8F0] font-sans selection:bg-[#C48A5C]/20 flex justify-center py-12 px-4 relative overflow-hidden">
      
      {/* Background gradients */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 0%, rgba(196, 138, 92, 0.15), transparent 40%),
            radial-gradient(circle at 85% 100%, rgba(15, 44, 44, 0.4), transparent 40%)
          `,
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="w-full max-w-[800px] relative z-10">
        
        {/* Header */}
        <header className="bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 sm:p-10 mb-8 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2 mb-3 font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C48A5C]">
            <span className="block w-1.5 h-1.5 rounded-full bg-[#C48A5C]" />
            Scrutexity
          </div>
          <h1 className="font-display text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-[#FDF8F0]">
            Missed-Demand Recovery Infrastructure
          </h1>
        </header>

        {/* Content Grid */}
        <div className="flex flex-col gap-6">
          
          {/* Section I */}
          <section className="bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 sm:p-10 transition duration-200 hover:border-[rgba(255,255,255,0.15)] break-inside-avoid">
            <span className="font-mono text-xs text-[#A39E98] mb-2 block">01</span>
            <h2 className="text-xl font-medium mb-4 text-[#FDF8F0] border-b border-[rgba(255,255,255,0.08)] pb-3">The Operational Gap</h2>
            <p className="text-[14.5px] text-[#A39E98] leading-[1.7] mb-4">
              Modern medical aesthetics groups deploy significant capital to acquire top-of-funnel inquiry volume. However, front-desk operational latency—specifically after-hours delays and abandoned booking flows—creates structural revenue leakage.
            </p>
            <p className="text-[14.5px] text-[#A39E98] leading-[1.7]">
              You are paying for yield that your current routing fails to capture.
            </p>
          </section>

          {/* Section II */}
          <section className="bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 sm:p-10 transition duration-200 hover:border-[rgba(255,255,255,0.15)] break-inside-avoid">
            <span className="font-mono text-xs text-[#A39E98] mb-2 block">02</span>
            <h2 className="text-xl font-medium mb-4 text-[#FDF8F0] border-b border-[rgba(255,255,255,0.08)] pb-3">The Scanner Architecture</h2>
            <p className="text-[14.5px] text-[#A39E98] leading-[1.7] mb-4">
              Scrutexity is an automated recovery layer that deploys directly onto your existing PMS.
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-baseline gap-2.5 text-[14px] text-[#A39E98]">
                <span className="font-mono text-[#C48A5C] text-xs">→</span>
                <div><strong className="text-[#FDF8F0] font-medium">Zero Migration:</strong> Native connection to Boulevard and Mangomint.</div>
              </li>
              <li className="flex items-baseline gap-2.5 text-[14px] text-[#A39E98]">
                <span className="font-mono text-[#C48A5C] text-xs">→</span>
                <div><strong className="text-[#FDF8F0] font-medium">Passive Identification:</strong> Scans unworked forms, missed calls, and dormant databases to identify high-intent booking opportunities.</div>
              </li>
              <li className="flex items-baseline gap-2.5 text-[14px] text-[#A39E98]">
                <span className="font-mono text-[#C48A5C] text-xs">→</span>
                <div><strong className="text-[#FDF8F0] font-medium">Automated Reactivation:</strong> Engages stalled inquiries instantly, minimizing the gap between interest and deposit.</div>
              </li>
            </ul>
          </section>

          {/* Section III */}
          <section className="bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 sm:p-10 transition duration-200 hover:border-[rgba(255,255,255,0.15)] break-inside-avoid">
            <span className="font-mono text-xs text-[#A39E98] mb-2 block">03</span>
            <h2 className="text-xl font-medium mb-4 text-[#FDF8F0] border-b border-[rgba(255,255,255,0.08)] pb-3">Strict CPOM & Clinical Guardrails</h2>
            <p className="text-[14.5px] text-[#A39E98] leading-[1.7] mb-4">
              General AI introduces unacceptable medical and legal liabilities. Scrutexity is engineered exclusively for clinical environments.
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-baseline gap-2.5 text-[14px] text-[#A39E98]">
                <span className="font-mono text-[#C48A5C] text-xs">→</span>
                <div><strong className="text-[#FDF8F0] font-medium">Deterministic Routing:</strong> Every clinical question is instantly identified, halted from automated response, and routed directly to licensed staff (NPs/RNs).</div>
              </li>
              <li className="flex items-baseline gap-2.5 text-[14px] text-[#A39E98]">
                <span className="font-mono text-[#C48A5C] text-xs">→</span>
                <div><strong className="text-[#FDF8F0] font-medium">Data Isolation:</strong> PHI is stripped and sanitized before any model interaction.</div>
              </li>
              <li className="flex items-baseline gap-2.5 text-[14px] text-[#A39E98]">
                <span className="font-mono text-[#C48A5C] text-xs">→</span>
                <div><strong className="text-[#FDF8F0] font-medium">Read-Only Integrity:</strong> The system requires zero write-permissions. Your primary patient database remains insulated.</div>
              </li>
              <li className="flex items-baseline gap-2.5 text-[14px] text-[#A39E98]">
                <span className="font-mono text-[#C48A5C] text-xs">→</span>
                <div><strong className="text-[#FDF8F0] font-medium">BAA Compliance:</strong> Executed comprehensively prior to initial connection.</div>
              </li>
            </ul>
          </section>

          {/* Section IV */}
          <section className="bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 sm:p-10 transition duration-200 hover:border-[rgba(255,255,255,0.15)] break-inside-avoid">
            <span className="font-mono text-xs text-[#A39E98] mb-2 block">04</span>
            <h2 className="text-xl font-medium mb-4 text-[#FDF8F0] border-b border-[rgba(255,255,255,0.08)] pb-3">The 14-Day Capital Sandbox</h2>
            <p className="text-[14.5px] text-[#A39E98] leading-[1.7] mb-4">
              We do not ask you to trust modeled industry averages. We require proof of concept on your own operational data.
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-baseline gap-2.5 text-[14px] text-[#A39E98]">
                <span className="font-mono text-[#C48A5C] text-xs">→</span>
                <div><strong className="text-[#FDF8F0] font-medium">The Audit:</strong> A 24-hour read-only scan of your last 30 days to build a baseline ledger of missed demand.</div>
              </li>
              <li className="flex items-baseline gap-2.5 text-[14px] text-[#A39E98]">
                <span className="font-mono text-[#C48A5C] text-xs">→</span>
                <div><strong className="text-[#FDF8F0] font-medium">The Pilot:</strong> A 14-day live recovery sprint.</div>
              </li>
              <li className="flex items-baseline gap-2.5 text-[14px] text-[#A39E98]">
                <span className="font-mono text-[#C48A5C] text-xs">→</span>
                <div><strong className="text-[#FDF8F0] font-medium">The Terms:</strong> $0 cost unless a verifiable, mutually agreed-upon recovery target is demonstrated within your Boulevard ledger.</div>
              </li>
            </ul>
          </section>

        </div>

        {/* Footer Action */}
        <footer className="mt-8 flex flex-col sm:flex-row justify-between items-center p-6 sm:p-8 bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-2xl gap-6 print:hidden">
          <div className="font-mono text-[11px] text-[#A39E98]">
            Document ID: RRS-ONE-PAGER-01<br />
            Status: Approved for External Distribution
          </div>
          <Link 
            href="/pilot"
            className="inline-flex items-center gap-2 bg-[#FDF8F0] text-[#0a0a0a] font-semibold text-[13.5px] px-7 py-3 rounded-full shadow-[0_4px_14px_rgba(253,248,240,0.15)] transition duration-200 hover:scale-[0.98] hover:bg-[#EAE3D5]"
          >
            Initialize 24-Hour Audit →
          </Link>
        </footer>

      </div>
    </div>
  );
}
