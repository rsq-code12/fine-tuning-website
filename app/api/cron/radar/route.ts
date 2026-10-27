import { cronAuthorized } from '@/lib/cron';
import { notify } from '@/lib/notify';
import { digest, runRadar } from '@/lib/radar';

export const maxDuration = 300;

/**
 * Daily lead radar (see vercel.json). ?dry=1 returns the digest as JSON instead of sending it,
 * ?hours=72 widens the lookback window for a test run.
 */
export async function GET(req: Request) {
  if (!cronAuthorized(req)) return new Response('Unauthorized', { status: 401 });
  const params = new URL(req.url).searchParams;
  const hours = Number(params.get('hours')) || undefined;
  const result = await runRadar(hours ? { lookbackHours: hours } : {});
  const d = digest(result);

  if (params.get('dry') === '1') return Response.json({ ...result, digest: d.text });
  if (result.hits.length) await notify({ ...d, data: result });
  return Response.json({ scanned: result.scanned, candidates: result.candidates, hits: result.hits.length, sources: result.sources });
}
