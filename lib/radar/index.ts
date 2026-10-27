import { z } from 'zod';
import { aiEnabled, structured } from '@/lib/ai';
import { esc } from '@/lib/notify';
import { SITE, absoluteUrl } from '@/lib/site';
import { bluesky, hackerNews, reddit, type Signal } from './sources';

/*
 * The lead radar: scans public conversations for people asking to buy what we sell,
 * ranks them by buying intent, drafts a genuinely helpful reply for each, and returns a digest.
 * It never posts. A human reads the digest and decides what to send.
 */

const TOPIC =
  /\b(fine[- ]?tun\w*|finetun\w*|llms?|gpt[- ]?\w*|openai|claude|anthropic|gemini|llama|mistral|qwen|ai[- ]agents?|agentic|chat ?bots?|rag|retrieval|embeddings?|machine learning|ml engineers?|custom (ai|model)s?|training data|datasets?|n8n|langchain|ai automation|automate \w+ with ai|ai (tool|solution|system|model|developer|engineer|consultant|agency|partner)s?)\b/i;

const INTENT: [RegExp, number][] = [
  [/\bseeking freelancers?\b/i, 40],
  [/\b(looking for|seeking|need(ed|s)?|searching for|want to hire)\b.{0,50}\b(someone|developer|dev|engineer|freelancer|consultant|agency|expert|partner|help|team|contractor|studio|company)\b/i, 35],
  [/\b(hire|hiring|contract(or)?|freelance|paid (gig|project|work)|budget|quote|rfp|vendor|outsourc\w+|retainer)\b/i, 18],
  [/\b(recommend(ation)?s?|anyone know|who (can|could)|can anyone|any suggestions|where (do|can) i find)\b/i, 15],
  [/\b(our|my) (company|business|team|startup|firm|clients?|clinic|practice|agency|store|shop)\b/i, 10],
  [/\b(how much (does|would|should|will) it cost|what does it cost|pricing for)\b/i, 10],
];

// sellers, job seekers and self-promotion are not buyers
const NEGATIVE = /\b(\[for hire\]|for hire|i('| a)?m (a|an) (freelancer|developer|consultant|ml engineer)|hire me|my portfolio|we('| a)re (an? )?(agency|studio|consultancy)|check out my|i built|show hn|launch hn|we built|open to work)\b/i;

export function keywordScore(s: Signal) {
  const hay = `${s.title} ${s.text}`;
  if (!TOPIC.test(hay)) return 0;
  let score = 10;
  for (const [re, w] of INTENT) if (re.test(hay)) score += w;
  if (NEGATIVE.test(hay)) score -= 35;
  if (s.where.toLowerCase().includes('seeking freelancer')) score += 20;
  return Math.max(0, Math.min(100, score));
}

const Triage = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      intent: z.number().int().min(0).max(100).describe('probability-like score that this author would pay an outside team for AI model training, datasets, agents or automation within ~3 months'),
      buyer: z.boolean().describe('true only if the author is (or speaks for) a potential client, not a seller, job seeker or hobbyist'),
      need: z.string().describe('their need in under 15 words'),
      industry: z.string().describe('industry, or "unknown"'),
      reply: z.string().describe('a genuinely helpful public reply, under 90 words, that answers their actual question first'),
    })
  ),
  contentIdeas: z.array(z.string()).describe('up to 5 guide titles worth publishing, based on what these people repeatedly ask'),
});

export type RadarHit = Signal & { score: number; buyer?: boolean; need?: string; industry?: string; reply?: string };
export type RadarResult = { scanned: number; candidates: number; hits: RadarHit[]; ideas: string[]; sources: Record<string, number>; ai: boolean };

export async function runRadar({ lookbackHours = Number(process.env.RADAR_LOOKBACK_HOURS || 26), max = 30 } = {}): Promise<RadarResult> {
  const since = Math.floor(Date.now() / 1000 - lookbackHours * 3600);
  const [hn, rd, bs] = await Promise.all([hackerNews(since), reddit(since), bluesky(since)]);
  const all = [...hn, ...rd, ...bs];

  const ranked = all
    .map((s) => ({ ...s, score: keywordScore(s) }))
    .filter((s) => s.score >= 25)
    .sort((a, b) => b.score - a.score)
    .slice(0, max);

  let hits: RadarHit[] = ranked;
  let ideas: string[] = [];

  if (aiEnabled() && ranked.length) {
    const triage = await structured(
      Triage,
      `You triage public posts for ${SITE.name}, ${SITE.definition}
Score buying intent strictly: a developer asking a how-to question is low intent; a business owner asking who can build or train something for them is high intent; sellers, job seekers and people promoting their own product are not buyers.
Replies must be useful on their own and fit the community's norms: answer the question, share one concrete insight, no hard sell, no links, no hashtags, no emojis. Mention ${SITE.name} only if the author explicitly asks for vendor or agency recommendations, and then disclose the affiliation plainly ("I work with ${SITE.name}, so I'm biased, but...").`,
      ranked.map((s) => `<post id="${s.id}" where="${s.where}">\n${s.title ? `Title: ${s.title}\n` : ''}${s.text}\n</post>`).join('\n\n'),
      { effort: 'low', maxTokens: 16000 }
    );
    if (triage) {
      const byId = new Map(triage.items.map((t) => [t.id, t]));
      hits = ranked
        .map((s): RadarHit => {
          const t = byId.get(s.id);
          return t ? { ...s, score: Math.round(t.intent * 0.75 + s.score * 0.25), buyer: t.buyer, need: t.need, industry: t.industry, reply: t.reply } : s;
        })
        .filter((s) => s.buyer !== false)
        .sort((a, b) => b.score - a.score);
      ideas = triage.contentIdeas;
    }
  }

  return {
    scanned: all.length,
    candidates: ranked.length,
    hits: hits.filter((h) => h.score >= 40),
    ideas,
    sources: { hn: hn.length, reddit: rd.length, bluesky: bs.length },
    ai: aiEnabled(),
  };
}

const tierOf = (n: number) => (n >= 70 ? 'HOT' : n >= 50 ? 'WARM' : 'MAYBE');

export function digest(r: RadarResult) {
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const hot = r.hits.filter((h) => h.score >= 70).length;
  const head = `Lead radar · ${date} · ${hot} hot, ${r.hits.length - hot} more worth a look (scanned ${r.scanned} posts: ${Object.entries(r.sources)
    .map(([k, v]) => `${k} ${v}`)
    .join(', ')})`;

  const items = r.hits.map((h, i) =>
    [
      `${i + 1}. [${tierOf(h.score)} ${h.score}] ${h.where} · ${h.title || h.text.slice(0, 90)}`,
      h.url,
      h.need ? `Need: ${h.need}${h.industry && h.industry !== 'unknown' ? ` · ${h.industry}` : ''}` : `"${h.text.slice(0, 220)}${h.text.length > 220 ? '…' : ''}"`,
      h.reply ? `Draft reply: ${h.reply}` : '',
    ]
      .filter(Boolean)
      .join('\n')
  );

  const tail = [
    r.ideas.length ? `\nContent ideas from what people asked:\n${r.ideas.map((x) => `- ${x}`).join('\n')}` : '',
    !r.ai ? '\nTip: set ANTHROPIC_API_KEY to rank by real buying intent and get a drafted reply for each post.' : '',
    `\nWhen a thread asks for vendors, point people at ${absoluteUrl('/audit')}.`,
  ];

  const text = [head, '', ...items.flatMap((x) => [x, '']), ...tail].join('\n').trim();
  return { subject: `Lead radar: ${hot} hot, ${r.hits.length} total`, text, html: `<pre style="font:14px/1.5 ui-monospace,monospace;white-space:pre-wrap">${esc(text)}</pre>` };
}
