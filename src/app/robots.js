import { SITE_URL } from '@/lib/seo';

// Emitted as a static robots.txt at build time (output: 'export').
export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The operations console is never useful in search results. No trailing
        // slash: a robots rule is a plain prefix match, so '/admin' covers the
        // bare /admin path as well as /admin/login/, /admin/dashboard/ and the
        // index.txt RSC payloads sitting beside them — '/admin/' would miss the
        // bare path. Admin pages also carry noindex and sit behind AdminGuard;
        // this only keeps them out of crawl queues.
        disallow: ['/admin'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
