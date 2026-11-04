/*
 * Single source of truth for brand, domain and contact details.
 * Every SEO surface (metadata, JSON-LD, sitemap, llms.txt, feeds, emails) reads from here,
 * and all content files write {{brand}} instead of the name, so a rebrand is one edit.
 *
 * The public name is Ramanujan. The domain is not decided yet — do not invent one.
 * TODO(brand): replace `email` (and the fallback origin below) when the Ramanujan
 * domain exists. Until then the previous address stays, and search stays noindex.
 */

const envUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');

export const SITE = {
  name: 'Ramanujan',
  legalName: 'Ramanujan',
  /** TODO(brand): previous domain. Do not invent a replacement. Set NEXT_PUBLIC_SITE_URL when the real origin exists. */
  url: (envUrl || 'https://weightcraft.ai').replace(/\/$/, ''),
  /**
   * TODO(brand): contact address. Still on the previous domain because the new one is unknown.
   * This is the only stored copy — pages, schema, llms.txt and lead mail all read SITE.email.
   */
  email: 'hello@weightcraft.ai',
  tagline: 'The Godfathers of Applied AI',
  /** One-sentence entity definition. Repeated verbatim across pages so search and answer engines learn it. */
  definition:
    'Ramanujan is an applied AI studio that trains and fine-tunes custom language models, builds niche training datasets, and ships production AI agent systems for businesses.',
  description:
    'The godfathers of applied AI. Ramanujan fine-tunes language models on your data, builds training datasets and deploys evaluated AI agents for businesses.',
  /** Typical commitments already stated on the site. Keep in sync with the home page copy. */
  promises: {
    reply: 'A plan, a price and an honest verdict within 24 hours',
    pilot: 'A focused pilot usually ships in two to six weeks',
  },
  /** Only list profiles that really exist: these feed schema.org sameAs. */
  sameAs: [] as string[],
  social: {
    x: '',
    linkedin: '',
    github: '',
    huggingface: '',
  },
  locale: 'en_US',
  areaServed: 'Worldwide',
} as const;

/**
 * Search visibility. Off by default so nothing gets indexed under the placeholder brand:
 * robots.txt blocks every crawler and every response carries `X-Robots-Tag: noindex`.
 * Set SITE_INDEXABLE=1 in Vercel (then redeploy) once the real brand and domain are in.
 */
export const INDEXABLE = process.env.SITE_INDEXABLE === '1';

/**
 * The GitHub Pages mirror is a static export served under /<repo>. Plain <a> hrefs need the prefix
 * (next/link adds it itself), and server work (lead API, OG images) stays on the Vercel origin.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN ?? '';
export const withBase = (href: string) => (href.startsWith('/') ? `${BASE_PATH}${href}` : href);

export const absoluteUrl = (path = '/') => `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;

/** Replace {{brand}} / {{email}} tokens in content strings. */
export const brand = (s: string) => s.replaceAll('{{brand}}', SITE.name).replaceAll('{{email}}', SITE.email);
