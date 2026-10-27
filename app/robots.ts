import type { MetadataRoute } from 'next';
import { INDEXABLE, SITE } from '@/lib/site';

/*
 * Open doors for every search engine AND every AI crawler (answer engines and model training),
 * because being cited by ChatGPT, Claude, Perplexity and Gemini is the whole point.
 * A bot named in its own group ignores the `*` group, so /api/ is disallowed in both.
 */
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'meta-externalagent',
  'Amazonbot',
  'MistralAI-User',
  'cohere-ai',
  'YouBot',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: AI_BOTS, allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
