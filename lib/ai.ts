import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import type { z } from 'zod';

/*
 * Optional Claude layer for the growth engine (lead briefs, radar triage).
 * Everything works without ANTHROPIC_API_KEY; with it, leads arrive pre-researched with a drafted reply.
 */

export const AI_MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-5-5';
export const aiEnabled = () => Boolean(process.env.ANTHROPIC_API_KEY);

let client: Anthropic | null = null;

/** One structured call. Returns null (never throws) when AI is off, refused or failing, so callers degrade gracefully. */
export async function structured<S extends z.ZodType>(
  schema: S,
  system: string,
  user: string,
  { effort = 'low', maxTokens = 8000 }: { effort?: 'low' | 'medium' | 'high'; maxTokens?: number } = {}
): Promise<z.infer<S> | null> {
  if (!aiEnabled()) return null;
  client ??= new Anthropic();
  try {
    const res = await client.beta.messages.parse({
      model: AI_MODEL,
      max_tokens: maxTokens,
      // if a safety classifier declines, the API retries on Anthropic's recommended fallback model
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system,
      messages: [{ role: 'user', content: user }],
      output_config: { effort, format: betaZodOutputFormat(schema) },
    });
    if (res.stop_reason === 'refusal') return null;
    return res.parsed_output ?? null;
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) console.warn('[ai] rate limited');
    else if (error instanceof Anthropic.APIError) console.error(`[ai] API error ${error.status}: ${error.message}`);
    else console.error('[ai]', error);
    return null;
  }
}
