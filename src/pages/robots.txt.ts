import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

/**
 * Production serves a normal robots.txt pointing at the sitemap. Staging
 * builds (STAGING=1) serve a blanket disallow instead — belt and braces
 * alongside the site-wide noindex tag in Seo.astro, because a temporary host
 * carrying this content must never be crawled: it would compete with the real
 * domain for the brand's own terms.
 */
export const GET: APIRoute = () => {
  const isStaging = import.meta.env.STAGING === '1';

  const body = isStaging
    ? ['# Staging build — not for indexing.', 'User-agent: *', 'Disallow: /', ''].join('\n')
    : [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${new URL('sitemap-index.xml', SITE.url).href}`,
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
