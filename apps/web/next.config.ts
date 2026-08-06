import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'scrutexity.com' }],
        destination: 'https://www.scrutexity.com/:path*',
        permanent: true,
      },
      // Keep legacy product entry points on the canonical Scrutexity intake.
      // Sending these routes back to auditgpt.ai creates a cross-project loop.
      // The /snapshot route is now the active front door.
      // Claim Intelligence Standard — /standards is referenced in crawl audits
      // and by name on the site; route it to the methodology page that hosts it.
      { source: '/standards', destination: '/methodology', permanent: true },
      // NYC enforcement page removed (2026-08); fold into methodology.
      { source: '/nyc', destination: '/methodology', permanent: true },
      // Benchmarks page retired with the positioning consolidation (e48bc025);
      // keep any external links landing on methodology instead of a 404.
      { source: '/benchmarks/state-of-medspa-claims', destination: '/methodology', permanent: true },
      // Batch 3a — Internal / Test routes
      { source: '/dashboard-test', destination: '/claim-audit', permanent: true },
      { source: '/radar', destination: '/claim-audit', permanent: true },
      { source: '/contento', destination: '/contact', permanent: true },
      { source: '/techweek', destination: '/what-we-do', permanent: true },
      { source: '/proof/telemetry-alpha', destination: '/proof', permanent: true },
      // Batch 3b — P0 Banned name slugs & cross-brand redirects
      { source: '/agency/claim-intelligence-receipt', destination: '/agency/claim-receipt', permanent: true },
      // Sub-batch 3c-1 — Legacy /about/* routes
      { source: '/about/clinical-demand-governance', destination: '/methodology', permanent: true },
      { source: '/about/clinical-demand-governance/ai-ingress-protocols', destination: '/methodology', permanent: true },
      { source: '/about/clinical-demand-governance/medical-director-sign-off', destination: '/methodology', permanent: true },
      { source: '/about/clinical-demand-governance/patient-leakage-audit', destination: '/claim-audit', permanent: true },
      { source: '/about/pms-telemetry-integration', destination: '/methodology', permanent: true },
      { source: '/about/pms-telemetry-integration/parallel-connections', destination: '/methodology', permanent: true },
      { source: '/about/pms-telemetry-integration/zenoti-mindbody-pipelines', destination: '/methodology', permanent: true },
      { source: '/about/pms-telemetry-integration/zero-downtime-telemetry', destination: '/methodology', permanent: true },
      { source: '/about/revenue-recovery-infrastructure', destination: '/pricing', permanent: true },
      { source: '/about/revenue-recovery-infrastructure/claim-safe-lead-capture', destination: '/claim-audit', permanent: true },
      { source: '/about/revenue-recovery-infrastructure/leakage-cost', destination: '/claim-audit', permanent: true },
      { source: '/about/revenue-recovery-infrastructure/recovery-pilot', destination: '/pricing', permanent: true },
      // Sub-batch 3c-2 — Legacy /versus/* and category overlap routes
      { source: '/versus/mindbody', destination: '/what-we-do', permanent: true },
      { source: '/versus/vagaro', destination: '/what-we-do', permanent: true },
      { source: '/versus/zenoti', destination: '/what-we-do', permanent: true },
      { source: '/claim-intelligence', destination: '/what-we-do', permanent: true },
      { source: '/audit', destination: '/claim-audit', permanent: true },
      { source: '/ai-readiness-index', destination: '/ai-visibility', permanent: true },
      { source: '/governance', destination: '/methodology', permanent: true },
      { source: '/infrastructure-brief', destination: '/methodology', permanent: true },
      { source: '/intelligence', destination: '/ai-visibility', permanent: true },
      { source: '/intelligence/ai-search-visibility', destination: '/ai-visibility', permanent: true },
      // Sub-batch 3c-3 — Remaining stale positioning routes
      { source: '/personal-brand-audit', destination: '/claim-audit', permanent: true },
      { source: '/partners/agency-console', destination: '/partners', permanent: true },
      { source: '/remediation', destination: '/methodology', permanent: true },
      { source: '/roadmap', destination: '/what-we-do', permanent: true },
      { source: '/security', destination: '/data-handling', permanent: true },
      { source: '/security-brief', destination: '/data-handling', permanent: true },
      { source: '/terms-of-pilot', destination: '/terms', permanent: true },
      { source: '/thesis', destination: '/what-we-do', permanent: true },
      { source: '/trust', destination: '/what-we-do', permanent: true },
      // Routes whose names assert compliance/certification — outside our
      // language constraints. 301 to constraint-safe equivalents.
      {
        source: '/compliance',
        destination: '/what-we-do',
        permanent: true,
      },
      {
        source: '/certified-agency-program',
        destination: '/partners',
        permanent: true,
      },
      {
        source: '/dscsa-compliance',
        destination: '/medical-wellness',
        permanent: true,
      },
      {
        source: '/iv-therapy-compliance',
        destination: '/medical-wellness',
        permanent: true,
      },
      {
        source: '/baa',
        destination: '/data-handling',
        permanent: true,
      },
      // Legacy med-spa revenue-recovery / booking-competitor positioning —
      // conflicts with the claim-bureau narrative. Consolidate to home.
      { source: '/revenue-leak-audit', destination: '/', permanent: true },
      { source: '/boulevard-lead-recovery', destination: '/', permanent: true },
      { source: '/mangomint-lead-recovery', destination: '/', permanent: true },
      { source: '/vs-boulevard-billie', destination: '/', permanent: true },
      { source: '/vs-mangomint-connect', destination: '/', permanent: true },
      { source: '/zenoti', destination: '/', permanent: true },
      { source: '/compare', destination: '/', permanent: true },
      { source: '/compare/:slug', destination: '/', permanent: true },
      { source: '/yield', destination: '/', permanent: true },
      { source: '/triage', destination: '/', permanent: true },
      { source: '/recovery', destination: '/', permanent: true },
      { source: '/medspa-revenue-benchmarks', destination: '/', permanent: true },
      { source: '/intelligence/medspa-revenue-recovery', destination: '/', permanent: true },
      { source: '/case-studies/weekend-recovery', destination: '/', permanent: true },
      { source: '/integrations/boulevard', destination: '/', permanent: true },
      { source: '/sample-snapshot', destination: '/sample-report', permanent: true },
      { source: '/platform', destination: '/', permanent: true },
      { source: '/demo', destination: '/', permanent: true },
      // Legacy pilot route — agency pilot is the active equivalent.
      { source: '/pilot', destination: '/agency', permanent: true },
      { source: '/radar-pilot', destination: '/', permanent: true },
      { source: '/radar-pilot/:path*', destination: '/', permanent: true },
      { source: '/roi', destination: '/', permanent: true },
      { source: '/flow', destination: '/', permanent: true },
      { source: '/diagnostic', destination: '/claim-exposure-diagnostic', permanent: true },
      { source: '/architecture-visual', destination: '/', permanent: true },
      // ── August 2026 repositioning ──────────────────────────────────────
      // Forensic Intelligence for AI, Claims & Regulatory Risk. Legacy
      // positioning routes fold into the new product ladder. Every old URL
      // keeps resolving; none are dropped.
      { source: '/scan', destination: '/snapshot', permanent: true },
      { source: '/for-investors', destination: '/diligence', permanent: true },
      { source: '/private-equity/claim-diligence', destination: '/diligence', permanent: true },
      { source: '/private-equity/report', destination: '/diligence', permanent: true },
      { source: '/ai-visibility', destination: '/ai-narrative-integrity', permanent: true },
      { source: '/monitoring', destination: '/watch', permanent: true },
      { source: '/exposure-assessment', destination: '/enterprise', permanent: true },
      { source: '/for-counsel', destination: '/counsel', permanent: true },
      { source: '/general-counsel', destination: '/counsel', permanent: true },
      { source: '/request-assessment', destination: '/private-assessment', permanent: true },
      { source: '/assessment', destination: '/private-assessment', permanent: true },
      { source: '/sample-diligence-file', destination: '/sample-report', permanent: true },
      { source: '/intelligence/ftc-pixel-compliance', destination: '/tracker', permanent: true },
      { source: '/intelligence/morpheus8-consult-conversion', destination: '/', permanent: true },
      { source: '/insights/what-is-governed-marketing-demand-recovery', destination: '/', permanent: true },
      {
        source: '/case-studies',
        destination: '/sample-owner-brief',
        permanent: true,
      },
      {
        source: '/for-pe',
        destination: '/proof',
        permanent: true,
      },
      {
        source: '/private-equity',
        destination: '/proof',
        permanent: true,
      },
      // Deleted re-export route — 301 to canonical /zenoti.
      {
        source: '/comparison/zenoti',
        destination: '/',
        permanent: true,
      },
      {
        source: '/zenoti-alternative-without-migration',
        destination: '/',
        permanent: true,
      },
      // Old product module routes — removed in the warm-earth rebuild.
      // These preserve inbound links from Google and prevent 404s.
      {
        source: '/modules/ai-reactivation',
        destination: '/',
        permanent: true,
      },
      {
        source: '/modules/morpheus8-estimator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/modules/compliance-airlock',
        destination: '/what-we-do',
        permanent: true,
      },
      {
        source: '/modules/search-schema-injector',
        destination: '/',
        permanent: true,
      },
      {
        source: '/mri',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
