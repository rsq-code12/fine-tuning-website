import { serviceDocs } from './services';
import { industryDocs } from './industries';
import { guidesA } from './guides-a';
import { guidesB } from './guides-b';
import { glossary } from './glossary';
import { services as cards } from '@/data/services';
import type { Doc } from './types';
import { brand } from '@/lib/site';

export { serviceDocs, industryDocs, glossary };
export const GLOSSARY_UPDATED = '2026-10-27';
export const guides: Doc[] = [...guidesA, ...guidesB];

export const getService = (slug: string) => serviceDocs.find((d) => d.slug === slug);
export const getIndustry = (slug: string) => industryDocs.find((d) => d.slug === slug);
export const getGuide = (slug: string) => guides.find((d) => d.slug === slug);
export const getTerm = (slug: string) => glossary.find((t) => t.slug === slug);

/** Home-page card data (title, tools, art) for a service doc. */
export const cardFor = (i: number) => cards[i];

/** Section hubs + tools, in the order llms.txt and the sitemap present them. */
export const HUBS = [
  { path: '/services', title: 'AI services', blurb: 'Fine-tuning, datasets, agent systems and automation, one page per service.' },
  { path: '/industries', title: 'AI by industry', blurb: 'Where custom AI pays off in legal, healthcare, finance, ecommerce and more.' },
  { path: '/guides', title: 'Guides', blurb: 'Straight answers on fine-tuning cost, data, privacy, models and agents.' },
  { path: '/glossary', title: 'AI glossary', blurb: 'Plain-English definitions of the terms vendors hide behind.' },
] as const;

export const TOOLS = [
  {
    path: '/audit',
    title: 'Free AI audit',
    blurb: 'Answer 7 questions, get a recommendation (prompting, RAG, fine-tuning or agents), a readiness score and a next step.',
  },
  {
    path: '/tools/fine-tuning-cost-calculator',
    title: 'Fine-tuning cost calculator',
    blurb: 'Estimate GPU hours, GPUs needed and compute cost to fine-tune an LLM by model size, method and dataset.',
  },
] as const;

export type PageRef = { path: string; title: string; description: string; updated: string; kind: 'service' | 'industry' | 'guide' | 'term' };

/** Every content page, for sitemap, llms.txt, feeds and IndexNow. */
export function allPages(): PageRef[] {
  return [
    ...serviceDocs.map((d) => ({ path: `/services/${d.slug}`, title: d.seoTitle, description: d.description, updated: d.updated, kind: 'service' as const })),
    ...industryDocs.map((d) => ({ path: `/industries/${d.slug}`, title: d.seoTitle, description: d.description, updated: d.updated, kind: 'industry' as const })),
    ...guides.map((d) => ({ path: `/guides/${d.slug}`, title: d.seoTitle, description: d.description, updated: d.updated, kind: 'guide' as const })),
    ...glossary.map((t) => ({ path: `/glossary/${t.slug}`, title: `What is ${t.term}?`, description: t.short, updated: GLOSSARY_UPDATED, kind: 'term' as const })),
  ];
}

/** Human title for any internal href (related links, llms.txt). */
export function titleFor(href: string): string | undefined {
  const hub = [...HUBS, ...TOOLS].find((h) => h.path === href);
  if (hub) return hub.title;
  const page = allPages().find((p) => p.path === href);
  return page ? brand(page.title) : undefined;
}
