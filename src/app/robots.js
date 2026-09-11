import { SITE_URL } from '@/lib/seo';

// Emitted as a static robots.txt at build time (output: 'export').
export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The operations console is never useful in search results.
        disallow: ['/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
