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
      // The old /snapshot route rendered an internal test artifact
      // (CLN_NODETEST recovery brief). All scan intent goes to the live
      // AuditGPT scanner. [publicId] subroutes still resolve to /claim-audit.
      {
        source: '/snapshot',
        destination: 'https://auditgpt.ai/?source=scrutexity-snapshot',
        permanent: false,
      },
      // Routes whose names assert compliance/certification — outside our
      // language constraints. 301 to constraint-safe equivalents.
      {
        source: '/compliance',
        destination: '/trust',
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
        destination: '/security',
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
      { source: '/pilot', destination: '/', permanent: true },
      { source: '/radar-pilot', destination: '/', permanent: true },
      { source: '/radar-pilot/:path*', destination: '/', permanent: true },
      { source: '/roi', destination: '/', permanent: true },
      { source: '/flow', destination: '/', permanent: true },
      { source: '/diagnostic', destination: '/', permanent: true },
      { source: '/architecture-visual', destination: '/', permanent: true },
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
        destination: '/trust',
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
