import { createHash } from 'node:crypto';
import { SITE } from '@/lib/site';

/**
 * IndexNow pings Bing, Yandex, Seznam, Naver and Yep the moment pages change. Bing's index feeds
 * ChatGPT search and Copilot, so this is the fastest route from "published" to "citable".
 * The key is derived from the domain unless INDEXNOW_KEY is set; it is public by design (served as a file).
 */
export const indexNowKey = () => process.env.INDEXNOW_KEY || createHash('sha256').update(`${SITE.url}:indexnow`).digest('hex').slice(0, 32);

export async function submitIndexNow(urls: string[]) {
  if (!urls.length) return { submitted: 0, status: 0 };
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE.url).host, key: indexNowKey(), keyLocation: `${SITE.url}/indexnow-key.txt`, urlList: urls.slice(0, 10000) }),
    signal: AbortSignal.timeout(15000),
  });
  return { submitted: urls.length, status: res.status };
}
