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
        source: '/compare/zenoti',
        destination: '/zenoti',
        permanent: true,
      },
      {
        source: '/comparison/zenoti',
        destination: '/zenoti',
        permanent: true,
      },
      // noindex'd duplicate — 301 to consolidate ranking authority.
      {
        source: '/zenoti-alternative-without-migration',
        destination: '/zenoti',
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
        destination: '/revenue-leak-audit',
        permanent: true,
      },
      {
        source: '/modules/compliance-airlock',
        destination: '/compliance',
        permanent: true,
      },
      {
        source: '/modules/search-schema-injector',
        destination: '/platform',
        permanent: true,
      },
      {
        source: '/mri',
        destination: '/',
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
