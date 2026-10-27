import { allPages, HUBS, TOOLS } from '@/data/content';
import { cronAuthorized } from '@/lib/cron';
import { submitIndexNow } from '@/lib/indexnow';
import { INDEXABLE, absoluteUrl } from '@/lib/site';

/**
 * Daily: submits pages whose `updated` date is within the last 3 days.
 * After launch (or a big content drop) call once with ?all=1 to submit every URL.
 */
export async function GET(req: Request) {
  if (!cronAuthorized(req)) return new Response('Unauthorized', { status: 401 });
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') return Response.json({ skipped: 'not production' });
  if (!INDEXABLE) return Response.json({ skipped: 'SITE_INDEXABLE is off' });

  const all = new URL(req.url).searchParams.get('all') === '1';
  const cutoff = Date.now() - 3 * 86400_000;
  const pages = allPages().filter((p) => all || Date.parse(p.updated) >= cutoff);
  const urls = [...(all ? ['/', ...HUBS.map((h) => h.path), ...TOOLS.map((t) => t.path), '/llms.txt'] : []), ...pages.map((p) => p.path)].map((p) => absoluteUrl(p));

  try {
    return Response.json(await submitIndexNow(urls));
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 502 });
  }
}
