import type { MetadataRoute } from 'next';
import { allPages, HUBS, TOOLS } from '@/data/content';
import { absoluteUrl } from '@/lib/site';

const PRIORITY = { service: 0.9, industry: 0.8, guide: 0.8, term: 0.5 } as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = allPages();
  const latest = pages.reduce((m, p) => (p.updated > m ? p.updated : m), '2026-10-27');
  return [
    { url: absoluteUrl('/'), lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    ...HUBS.map((h) => ({ url: absoluteUrl(h.path), lastModified: latest, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...TOOLS.map((t) => ({ url: absoluteUrl(t.path), lastModified: latest, changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified: p.updated, changeFrequency: 'monthly' as const, priority: PRIORITY[p.kind] })),
  ];
}
