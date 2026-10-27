import { indexNowKey } from '@/lib/indexnow';

export const dynamic = 'force-static';

export function GET() {
  return new Response(indexNowKey(), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
