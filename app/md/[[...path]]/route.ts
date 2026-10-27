import { markdownFor, textResponse } from '@/lib/llms';

/** Serves `/<any page>.md` (rewritten here in next.config.ts): the page as clean Markdown for LLM agents. */
export async function GET(_req: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const parts = (await params).path ?? [];
  const path = `/${parts.join('/')}`;
  const body = markdownFor(path);
  if (!body) return new Response('Not found', { status: 404 });
  return textResponse(body, { type: 'text/markdown', canonical: path === '/index' || path === '/' ? '/' : path });
}
