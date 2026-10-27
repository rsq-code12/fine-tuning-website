import { guides, industryDocs, serviceDocs } from '@/data/content';
import { plain } from '@/lib/markdown';
import { SITE, absoluteUrl, brand } from '@/lib/site';

export const dynamic = 'force-static';

const x = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

/**
 * RSS of every guide and page. Plug it into any auto-poster (Buffer, Zapier, Make, dlvr.it, LinkedIn/X schedulers)
 * and each new page announces itself on social with no manual work.
 */
export function GET() {
  const items = [
    ...guides.map((d) => ({ d, path: `/guides/${d.slug}`, cat: 'Guide' })),
    ...serviceDocs.map((d) => ({ d, path: `/services/${d.slug}`, cat: 'Service' })),
    ...industryDocs.map((d) => ({ d, path: `/industries/${d.slug}`, cat: 'Industry' })),
  ].sort((a, b) => b.d.updated.localeCompare(a.d.updated));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${x(`${SITE.name}: ${SITE.tagline}`)}</title>
<link>${SITE.url}</link>
<atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml"/>
<description>${x(SITE.definition)}</description>
<language>en</language>
${items
  .map(
    ({ d, path, cat }) => `<item>
<title>${x(brand(d.title))}</title>
<link>${absoluteUrl(path)}</link>
<guid isPermaLink="true">${absoluteUrl(path)}</guid>
<category>${cat}</category>
<pubDate>${new Date(`${d.updated}T09:00:00Z`).toUTCString()}</pubDate>
<description>${x(plain(d.answer))}</description>
</item>`
  )
  .join('\n')}
</channel>
</rss>`;
  return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8', 'cache-control': 'public, s-maxage=86400' } });
}
