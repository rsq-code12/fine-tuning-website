/*
 * Lead radar sources: public conversations where buyers ask for AI help.
 *   Hacker News   always on (public Algolia API, no key)
 *   Reddit        on when REDDIT_CLIENT_ID + REDDIT_CLIENT_SECRET are set (free "script" app at reddit.com/prefs/apps)
 *   Bluesky       on when BSKY_HANDLE + BSKY_APP_PASSWORD are set (Settings → App passwords)
 * Every source is read-only: the radar never posts, replies or DMs on anyone's behalf.
 */

export type Signal = {
  id: string;
  source: 'hn' | 'reddit' | 'bluesky';
  url: string;
  title: string;
  text: string;
  author: string;
  where: string;
  createdAt: number;
};

const UA = 'web:lead-radar:1.0 (read-only search)';
const clean = (s = '') =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

async function getJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, { ...init, headers: { 'user-agent': UA, ...init?.headers }, signal: AbortSignal.timeout(12000) });
    if (!res.ok) {
      console.warn(`[radar] ${new URL(url).host} ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.warn(`[radar] ${new URL(url).host} failed`, e);
    return null;
  }
}

/* ── Hacker News ── */

const HN_QUERIES = [
  'fine-tuning',
  'fine-tune',
  'finetune',
  '"seeking freelancer"',
  '"AI agency"',
  '"AI consultant"',
  'LLM consultant',
  '"AI agents" business',
  'custom LLM',
  '"training data" LLM',
];

type HnHit = { objectID: string; title?: string; story_title?: string; story_text?: string; comment_text?: string; author: string; created_at_i: number; story_id?: number };

export async function hackerNews(sinceSec: number): Promise<Signal[]> {
  const out = new Map<string, Signal>();
  await Promise.all(
    HN_QUERIES.map(async (q) => {
      const params = new URLSearchParams({ query: q, tags: '(story,comment)', hitsPerPage: '50', numericFilters: `created_at_i>${sinceSec}` });
      const data = await getJson<{ hits: HnHit[] }>(`https://hn.algolia.com/api/v1/search_by_date?${params}`);
      for (const h of data?.hits ?? []) {
        out.set(h.objectID, {
          id: `hn:${h.objectID}`,
          source: 'hn',
          url: `https://news.ycombinator.com/item?id=${h.objectID}`,
          title: clean(h.title || h.story_title || ''),
          text: clean(h.comment_text || h.story_text || '').slice(0, 1800),
          author: h.author,
          where: h.story_title ? `HN thread: ${clean(h.story_title)}` : 'Hacker News',
          createdAt: h.created_at_i * 1000,
        });
      }
    })
  );
  return [...out.values()];
}

/* ── Reddit (OAuth app-only) ── */

const SUBS = [
  'LocalLLaMA', 'MachineLearning', 'learnmachinelearning', 'OpenAI', 'ClaudeAI', 'ChatGPTPro', 'artificial', 'AI_Agents', 'LangChain', 'n8n',
  'automation', 'nocode', 'smallbusiness', 'Entrepreneur', 'startups', 'SaaS', 'agency', 'marketing', 'ecommerce', 'shopify', 'legaltech',
  'LawFirm', 'healthIT', 'fintech', 'Insurance', 'realestate', 'recruiting', 'edtech', 'consulting', 'forhire', 'HireaDeveloper',
];

const REDDIT_QUERIES = [
  '(fine-tune OR fine-tuning OR finetune OR "custom model" OR "train a model")',
  '("looking for" OR hire OR hiring OR recommend OR agency OR consultant OR freelancer) AND (AI OR LLM OR GPT OR chatbot OR agent)',
  '("AI agent" OR "AI agents" OR "AI automation") AND (build OR need OR help OR cost)',
];

async function redditToken(): Promise<string | null> {
  const id = process.env.REDDIT_CLIENT_ID;
  const secret = process.env.REDDIT_CLIENT_SECRET;
  if (!id || !secret) return null;
  const data = await getJson<{ access_token?: string }>('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: { authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`, 'content-type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  return data?.access_token ?? null;
}

type RedditPost = { data: { id: string; title: string; selftext: string; author: string; subreddit: string; permalink: string; created_utc: number } };

export async function reddit(sinceSec: number): Promise<Signal[]> {
  const token = await redditToken();
  if (!token) return [];
  const out = new Map<string, Signal>();
  // reddit caps a multi-subreddit path, so search in chunks
  const chunks: string[][] = [];
  for (let i = 0; i < SUBS.length; i += 10) chunks.push(SUBS.slice(i, i + 10));
  for (const chunk of chunks)
    for (const q of REDDIT_QUERIES) {
      const params = new URLSearchParams({ q, restrict_sr: '1', sort: 'new', t: 'week', limit: '50', raw_json: '1' });
      const data = await getJson<{ data: { children: RedditPost[] } }>(`https://oauth.reddit.com/r/${chunk.join('+')}/search?${params}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      for (const { data: p } of data?.data.children ?? []) {
        if (p.created_utc < sinceSec) continue;
        out.set(p.id, {
          id: `reddit:${p.id}`,
          source: 'reddit',
          url: `https://www.reddit.com${p.permalink}`,
          title: clean(p.title),
          text: clean(p.selftext).slice(0, 1800),
          author: p.author,
          where: `r/${p.subreddit}`,
          createdAt: p.created_utc * 1000,
        });
      }
    }
  return [...out.values()];
}

/* ── Bluesky (app password) ── */

const BSKY_QUERIES = ['fine-tuning', '"fine-tune"', '"AI agency"', '"AI consultant"', '"looking for" AI developer', '"AI agent" business'];

type BskyPost = { uri: string; author: { handle: string }; record: { text?: string; createdAt?: string } };

export async function bluesky(sinceSec: number): Promise<Signal[]> {
  const identifier = process.env.BSKY_HANDLE;
  const password = process.env.BSKY_APP_PASSWORD;
  if (!identifier || !password) return [];
  const session = await getJson<{ accessJwt?: string }>('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  if (!session?.accessJwt) return [];
  const out = new Map<string, Signal>();
  const since = new Date(sinceSec * 1000).toISOString();
  await Promise.all(
    BSKY_QUERIES.map(async (q) => {
      const params = new URLSearchParams({ q, sort: 'latest', since, limit: '50' });
      const data = await getJson<{ posts: BskyPost[] }>(`https://bsky.social/xrpc/app.bsky.feed.searchPosts?${params}`, {
        headers: { authorization: `Bearer ${session.accessJwt}` },
      });
      for (const p of data?.posts ?? []) {
        const rkey = p.uri.split('/').pop();
        out.set(p.uri, {
          id: `bsky:${p.uri}`,
          source: 'bluesky',
          url: `https://bsky.app/profile/${p.author.handle}/post/${rkey}`,
          title: '',
          text: clean(p.record.text).slice(0, 1200),
          author: p.author.handle,
          where: 'Bluesky',
          createdAt: p.record.createdAt ? Date.parse(p.record.createdAt) : Date.now(),
        });
      }
    })
  );
  return [...out.values()];
}
