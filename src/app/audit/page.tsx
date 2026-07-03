'use client';

import { useState, useTransition, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { runAudit, fetchRisksByScan, submitLead } from '@/actions/run-audit';
import type { ScanRecord, ClaimRisk } from '@/lib/db';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AuditPdfReport } from '@/components/pdf-report';

function SeverityBadge({ score }: { score: number }) {
  const colors: Record<number, string> = {
    5: 'bg-espresso/15 text-espresso',
    4: 'bg-clay/15 text-clay',
    3: 'bg-sage-deep/10 text-sage-deep',
    2: 'bg-sand-deep/40 text-mist',
    1: 'bg-sand-deep/20 text-mist/70',
  };
  return (
    <span className={`rounded px-2 py-0.5 font-mono text-[10px] font-semibold ${colors[score] || colors[3]}`}>
      {score}/5
    </span>
  );
}

function CitationDot({ present }: { present: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${
        present ? 'bg-sage-deep shadow-[0_0_6px_rgba(94,122,90,0.4)]' : 'bg-mist/30'
      }`}
      title={present ? 'Citation present' : 'No visible citation'}
    />
  );
}

// ── Lead Capture Modal ──

function LeadCaptureModal({
  url,
  risks,
  onSubmit,
  onSkip,
}: {
  url: string;
  risks: ClaimRisk[];
  onSubmit: (email: string, name: string) => Promise<void>;
  onSkip: () => void;
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const highSeverity = risks.filter((r) => r.severity_score >= 4).length;
  const allTriggers = [...new Set(risks.flatMap((r) => r.regulatory_triggers))];
  const topSeverity = Math.max(...risks.map((r) => r.severity_score));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    setSubmitting(true);
    setError('');
    await onSubmit(email, name);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/40 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onSkip()}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-sand-deep/30 bg-bone shadow-float"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-clay/10 blur-[60px]" />

        <div className="relative z-10 p-8">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-sage-deep/20 bg-sage-deep/8 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-sage-deep">
              Audit Complete
            </span>
          </div>

          <h2 className="font-display text-3xl leading-tight tracking-tight text-espresso">
            Your Claim-Risk Audit is Ready
          </h2>

          {/* Teaser stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-sand-deep/25 bg-cream p-3 text-center">
              <p className="font-display text-2xl text-espresso">{risks.length}</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-mist">
                Claims
              </p>
            </div>
            <div className="rounded-lg border border-sand-deep/25 bg-cream p-3 text-center">
              <p className="font-display text-2xl text-espresso">{topSeverity}/5</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-mist">
                Top Severity
              </p>
            </div>
            <div className="rounded-lg border border-sand-deep/25 bg-cream p-3 text-center">
              <p className="font-display text-2xl text-espresso">{allTriggers.length}</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-mist">
                Triggers
              </p>
            </div>
          </div>

          {highSeverity > 0 && (
            <p className="mt-3 font-mono text-[11px] text-clay">
              {highSeverity} high-severity claim{highSeverity > 1 ? 's' : ''} requiring immediate review
            </p>
          )}

          <p className="mt-4 text-sm leading-relaxed text-mist">
            Enter your details to access the full risk landscape, regulatory triggers,
            drift analysis, and remediation wording.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full rounded-lg border border-sand-deep/40 bg-cream px-4 py-3 font-mono text-sm text-espresso transition-colors focus:border-sage-deep focus:outline-none focus:ring-1 focus:ring-sage-deep"
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full rounded-lg border border-sand-deep/40 bg-cream px-4 py-3 font-mono text-sm text-espresso transition-colors focus:border-sage-deep focus:outline-none focus:ring-1 focus:ring-sage-deep"
              />
            </div>
            {error && (
              <p className="font-mono text-[11px] text-clay">{error}</p>
            )}
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-lg bg-espresso px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-espresso/90 disabled:opacity-50"
              >
                {submitting ? 'Unlocking...' : 'View Full Report'}
              </button>
              <button
                type="button"
                onClick={onSkip}
                className="rounded-lg border border-sand-deep/40 px-6 py-3 font-mono text-xs text-mist transition-colors hover:bg-cream"
              >
                Skip
              </button>
            </div>
          </form>

          <p className="mt-4 text-center font-mono text-[9px] text-mist/50">
            Your data is used solely for pilot follow-up. No spam.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Dashboard ──

export default function AuditDashboard() {
  const [targetUrl, setTargetUrl] = useState('');
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [risksMap, setRisksMap] = useState<Record<string, ClaimRisk[]>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingRisks, setLoadingRisks] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Lead capture gate
  const [pendingLead, setPendingLead] = useState<{
    scanId: string;
    url: string;
    risks: ClaimRisk[];
  } | null>(null);

  const handleRunAudit = () => {
    if (!targetUrl) return;

    startTransition(async () => {
      try {
        const result = await runAudit(targetUrl);
        if (result.success && result.scanId) {
          const risks = await fetchRisksByScan(result.scanId);
          // Gate behind lead capture instead of showing immediately
          setPendingLead({ scanId: result.scanId, url: targetUrl, risks });
        }
        setTargetUrl('');
      } catch (error) {
        console.error('Audit failed:', error);
      }
    });
  };

  const handleLeadSubmit = useCallback(
    async (email: string, name: string) => {
      if (!pendingLead) return;
      await submitLead(pendingLead.scanId, email, name || undefined);

      // Release the scan into the archive
      const newScan: ScanRecord = {
        scan_id: pendingLead.scanId,
        scanned_url: pendingLead.url,
        scanned_at: new Date().toISOString(),
        status: 'complete',
      };
      setScans((prev) => [newScan, ...prev]);
      setRisksMap((prev) => ({ ...prev, [pendingLead.scanId]: pendingLead.risks }));
      setExpandedId(pendingLead.scanId);
      setPendingLead(null);
    },
    [pendingLead],
  );

  const handleLeadSkip = useCallback(() => {
    if (!pendingLead) return;
    // Still release the scan but mark as unreachable (still exists in DB)
    const newScan: ScanRecord = {
      scan_id: pendingLead.scanId,
      scanned_url: pendingLead.url,
      scanned_at: new Date().toISOString(),
      status: 'complete',
    };
    setScans((prev) => [newScan, ...prev]);
    setRisksMap((prev) => ({ ...prev, [pendingLead.scanId]: pendingLead.risks }));
    setPendingLead(null);
  }, [pendingLead]);

  const handleExpand = useCallback(
    async (scanId: string) => {
      if (expandedId === scanId) {
        setExpandedId(null);
        return;
      }
      setExpandedId(scanId);
      if (!risksMap[scanId]) {
        setLoadingRisks(scanId);
        const risks = await fetchRisksByScan(scanId);
        setRisksMap((prev) => ({ ...prev, [scanId]: risks }));
        setLoadingRisks(null);
      }
    },
    [expandedId, risksMap],
  );

  const totalClaims = Object.values(risksMap).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="min-h-screen bg-cream w-full p-8 md:p-12">
      {/* Lead Capture Modal */}
      <AnimatePresence>
        {pendingLead && (
          <LeadCaptureModal
            url={pendingLead.url}
            risks={pendingLead.risks}
            onSubmit={handleLeadSubmit}
            onSkip={handleLeadSkip}
          />
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-6xl">
        {/* Input Panel */}
        <section className="relative mb-16 overflow-hidden rounded-2xl border border-mist bg-bone p-8 shadow-sm">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-cream/50 blur-[80px]" />
          <div className="relative z-10">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-sage-deep" />
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-espresso/60">
                Pipeline Active
              </span>
            </div>
            <h2 className="mb-2 font-display text-3xl tracking-tight text-espresso">
              Initiate Telemetry Scan
            </h2>
            <p className="mb-6 max-w-xl text-sm text-espresso/70">
              Enter a public URL to run the deterministic evidence pipeline.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-espresso/40">
                  https://
                </span>
                <input
                  type="text"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="domain.com/surface"
                  disabled={isPending}
                  className="w-full rounded-lg border border-mist bg-cream py-3 pl-20 pr-4 font-mono text-sm text-espresso transition-all focus:border-sage-deep focus:outline-none focus:ring-1 focus:ring-sage-deep disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleRunAudit}
                disabled={isPending || !targetUrl}
                className="flex min-w-[160px] shrink-0 items-center justify-center rounded-lg bg-espresso px-8 py-3 text-sm font-medium text-cream transition-colors hover:bg-espresso/90 disabled:opacity-50"
              >
                {isPending ? 'Scanning...' : 'Run AuditGPT'}
              </button>
            </div>
          </div>
        </section>

        {/* Results Table */}
        <section>
          <div className="mb-6 flex items-end justify-between px-2">
            <div>
              <h3 className="font-display text-2xl text-espresso">Review Archive</h3>
              <p className="mt-1 font-mono text-[11px] text-mist/60">
                {scans.length} scans &middot; {totalClaims} claims extracted
              </p>
            </div>
            <span className="font-mono text-xs text-espresso/60">
              {scans.length} SCANS
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-mist bg-bone shadow-sm">
            {/* Ledger Header */}
            <div className="grid grid-cols-12 gap-4 border-b border-mist bg-cream/30 px-6 py-4">
              <div className="col-span-5 text-xs font-semibold uppercase tracking-wider text-espresso/60">
                Target URL
              </div>
              <div className="col-span-3 text-xs font-semibold uppercase tracking-wider text-espresso/60">
                Timestamp
              </div>
              <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-espresso/60">
                Claims
              </div>
              <div className="col-span-2 text-right text-xs font-semibold uppercase tracking-wider text-espresso/60">
                Status
              </div>
            </div>

            {/* Ledger Rows */}
            <div className="divide-y divide-mist">
              {scans.length === 0 ? (
                <div className="px-6 py-8 text-center font-mono text-sm text-espresso/50">
                  Awaiting telemetry output. Paste a URL and run your first scan.
                </div>
              ) : (
                scans.map((scan) => {
                  const risks = risksMap[scan.scan_id] || [];
                  const isExpanded = expandedId === scan.scan_id;
                  const isLoading = loadingRisks === scan.scan_id;

                  return (
                    <div key={scan.scan_id}>
                      {/* Row */}
                      <div
                        onClick={() => handleExpand(scan.scan_id)}
                        className="grid cursor-pointer grid-cols-12 gap-4 px-6 py-4 items-center transition-colors duration-200 hover:bg-cream/50"
                      >
                        <div className="col-span-5">
                          <p className="truncate text-sm font-medium text-espresso">
                            {scan.scanned_url}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-mist/50">
                            {scan.scan_id.slice(0, 8)}...
                          </p>
                        </div>
                        <div className="col-span-3">
                          <span className="font-mono text-xs text-espresso/60">
                            {new Date(scan.scanned_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="font-mono text-xs text-espresso/60">
                            {risks.length} items
                          </span>
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <span
                            className={`rounded px-2 py-1 font-mono text-[10px] font-semibold uppercase ${
                              scan.status === 'complete'
                                ? 'bg-sage-deep/10 text-sage-deep'
                                : scan.status === 'failed'
                                  ? 'bg-clay/10 text-clay'
                                  : 'bg-sand-deep/30 text-mist'
                            }`}
                          >
                            {scan.status}
                          </span>
                        </div>
                      </div>

                      {/* Detail: Risk Landscape */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-mist bg-cream"
                          >
                            <div className="p-6">
                              <div className="mb-4 flex items-center justify-between">
                                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-espresso/50">
                                  Risk Landscape
                                </p>
                                {risks.length > 0 && (
                                  <PDFDownloadLink
                                    document={
                                      <AuditPdfReport
                                        scannedUrl={scan.scanned_url}
                                        scanId={scan.scan_id}
                                        scannedAt={scan.scanned_at}
                                        risks={risks}
                                      />
                                    }
                                    fileName={`scrutexity-audit-${scan.scan_id.slice(0, 8)}.pdf`}
                                    className="rounded-full border border-sage-deep/30 bg-sage-deep/5 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-sage-deep transition-colors hover:bg-sage-deep/10"
                                  >
                                    {({ loading }) =>
                                      loading ? 'Generating...' : 'Download Official Report →'
                                    }
                                  </PDFDownloadLink>
                                )}
                              </div>

                              {isLoading ? (
                                <div className="flex items-center gap-3 py-8 text-center font-mono text-sm text-espresso/50">
                                  <div className="h-2 w-2 animate-pulse rounded-full bg-sage-deep" />
                                  Loading extracted claims...
                                </div>
                              ) : risks.length === 0 ? (
                                <div className="py-8 text-center font-mono text-sm text-espresso/50">
                                  No claims extracted.
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  {risks.map((risk) => (
                                    <div
                                      key={risk.id}
                                      className="rounded-xl border border-sand-deep/30 bg-bone p-5"
                                    >
                                      <div className="mb-3 flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-3">
                                            <p className="font-display text-base text-espresso">
                                              &ldquo;{risk.claim_text}&rdquo;
                                            </p>
                                          </div>
                                        </div>
                                        <SeverityBadge score={risk.severity_score} />
                                      </div>

                                      <div className="flex flex-wrap gap-2">
                                        {risk.regulatory_triggers.map((tag) => (
                                          <span
                                            key={tag}
                                            className="rounded-md border border-clay/20 bg-clay/5 px-2 py-0.5 font-mono text-[10px] font-medium text-clay"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                        <span className="flex items-center gap-1.5 rounded-md border border-mist/20 px-2 py-0.5 font-mono text-[10px] text-mist">
                                          <CitationDot present={risk.visible_citation} />
                                          {risk.visible_citation ? 'Cited' : 'No citation'}
                                        </span>
                                        {risk.drift_detected && (
                                          <span className="rounded-md border border-espresso/20 bg-espresso/5 px-2 py-0.5 font-mono text-[10px] text-espresso">
                                            Drift detected
                                          </span>
                                        )}
                                      </div>

                                      {risk.drift_context && (
                                        <p className="mt-3 text-xs italic leading-relaxed text-mist/70">
                                          {risk.drift_context}
                                        </p>
                                      )}

                                      {risk.safer_wording && (
                                        <div className="mt-3 rounded-lg border border-sage-deep/20 bg-sage-deep/5 p-3">
                                          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-sage-deep">
                                            Safer Wording
                                          </p>
                                          <p className="mt-1 text-sm font-medium text-espresso/90">
                                            &ldquo;{risk.safer_wording}&rdquo;
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
