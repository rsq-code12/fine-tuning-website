import type { Metadata } from 'next';
import type { Doc, Faq, GlossaryTerm, IndustryDoc, ServiceDoc } from '@/data/content/types';
import { plain } from '@/lib/markdown';
import { SITE, absoluteUrl, brand } from '@/lib/site';

/* ───────── Metadata ───────── */

type MetaInput = {
  title: string;
  description: string;
  path: string;
  eyebrow?: string;
  type?: 'website' | 'article';
  keywords?: readonly string[];
  modified?: string;
  /** set false for pages like thank-you screens */
  index?: boolean;
};

export const ogImageUrl = (title: string, eyebrow: string = SITE.tagline) =>
  `/og?${new URLSearchParams({ t: title, e: eyebrow }).toString()}`;

export function pageMeta({ title, description, path, eyebrow, type = 'website', keywords, modified, index = true }: MetaInput): Metadata {
  const t = brand(title);
  const d = plain(description);
  const image = { url: ogImageUrl(t, eyebrow), width: 1200, height: 630, alt: t };
  return {
    title: t,
    description: d,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: path,
      // the Markdown twin of this page, for LLM agents and answer engines
      types: path === '/' ? { 'text/plain': '/llms.txt' } : { 'text/markdown': `${path}.md` },
    },
    openGraph: {
      type,
      url: path,
      title: t,
      description: d,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [image],
      ...(type === 'article' && modified ? { modifiedTime: modified } : {}),
    },
    twitter: { card: 'summary_large_image', title: t, description: d, images: [image.url] },
    robots: index ? undefined : { index: false, follow: true },
  };
}

/* ───────── JSON-LD (schema.org) ───────── */

const ORG_ID = `${SITE.url}/#org`;
const SITE_ID = `${SITE.url}/#website`;

export const KNOWS_ABOUT = [
  'Large language model fine-tuning',
  'LoRA and QLoRA',
  'Supervised fine-tuning',
  'Preference optimization (DPO, RLHF)',
  'Training dataset curation and synthetic data',
  'Retrieval-augmented generation',
  'AI agents and multi-agent systems',
  'Model Context Protocol',
  'LLM evaluation',
  'Business process automation with AI',
];

export function orgLd() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl('/icon.svg'),
    email: SITE.email,
    description: SITE.definition,
    slogan: SITE.tagline,
    areaServed: SITE.areaServed,
    knowsAbout: KNOWS_ABOUT,
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: SITE.email, availableLanguage: ['English'] },
  };
}

export function websiteLd() {
  return { '@type': 'WebSite', '@id': SITE_ID, url: SITE.url, name: SITE.name, description: SITE.description, publisher: { '@id': ORG_ID }, inLanguage: 'en' };
}

export function breadcrumbLd(trail: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [['Home', '/'] as [string, string], ...trail].map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: brand(name),
      item: absoluteUrl(path),
    })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: plain(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  };
}

export function serviceLd(doc: ServiceDoc, path: string) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: brand(doc.title),
    serviceType: brand(doc.seoTitle),
    description: plain(doc.answer),
    url: absoluteUrl(path),
    provider: { '@id': ORG_ID },
    areaServed: SITE.areaServed,
    audience: { '@type': 'BusinessAudience', audienceType: doc.idealFor.map(plain).join('; ') },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Deliverables',
      itemListElement: doc.deliverables.map((d) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: plain(d) } })),
    },
  };
}

export function industryLd(doc: IndustryDoc, path: string) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: brand(doc.title),
    description: plain(doc.answer),
    url: absoluteUrl(path),
    provider: { '@id': ORG_ID },
    audience: { '@type': 'BusinessAudience', audienceType: doc.name },
    areaServed: SITE.areaServed,
  };
}

export function articleLd(doc: Doc, path: string) {
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    headline: brand(doc.title),
    description: plain(doc.description),
    abstract: plain(doc.answer),
    datePublished: doc.updated,
    dateModified: doc.updated,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(ogImageUrl(brand(doc.title), brand(doc.eyebrow))),
    keywords: doc.keywords.join(', '),
    inLanguage: 'en',
  };
}

export function termLd(t: GlossaryTerm, path: string) {
  return {
    '@type': 'DefinedTerm',
    '@id': `${absoluteUrl(path)}#term`,
    name: brand(t.term),
    ...(t.aka ? { alternateName: brand(t.aka) } : {}),
    description: plain(t.short),
    url: absoluteUrl(path),
    inDefinedTermSet: { '@type': 'DefinedTermSet', '@id': `${absoluteUrl('/glossary')}#set`, name: `${SITE.name} AI glossary`, url: absoluteUrl('/glossary') },
  };
}

export function appLd(name: string, description: string, path: string) {
  return {
    '@type': 'WebApplication',
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any (web browser)',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: { '@id': ORG_ID },
  };
}

/** Wrap nodes in one @graph so entities can reference each other by @id. */
export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
