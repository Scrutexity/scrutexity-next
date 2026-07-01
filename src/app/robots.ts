import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.scrutexity.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/snapshot', '/admin', '/private', '/internal'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
