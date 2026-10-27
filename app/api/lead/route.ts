import { after } from 'next/server';
import { z } from 'zod';
import { structured } from '@/lib/ai';
import { scoreLead, type LeadInput } from '@/lib/leads/score';
import { esc, notify, sendEmail } from '@/lib/notify';
import { SITE, absoluteUrl } from '@/lib/site';

const str = (max: number) => z.string().trim().max(max).optional();

const Body = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  name: str(120),
  company: str(160),
  role: str(80),
  message: str(4000),
  source: z.enum(['audit', 'calculator', 'contact', 'guide']).default('contact'),
  answers: z.record(z.string().max(60), z.string().max(400)).optional(),
  page: str(300),
  referrer: str(500),
  utm: z.record(z.string().max(40), z.string().max(200)).optional(),
  /** honeypot: humans never see this field */
  website: str(200),
});

const Brief = z.object({
  summary: z.string().describe('2 sentences: who this is and what they want'),
  fit: z.enum(['strong', 'possible', 'weak']).describe('fit for an applied-AI studio doing fine-tuning, datasets and agent systems'),
  recommendedService: z.string().describe('the single most relevant service to pitch first'),
  questions: z.array(z.string()).describe('3 sharp discovery questions for the first call'),
  reply: z.string().describe('a ready-to-send first email reply, under 140 words, plain text, confident, specific to their answers, proposing a 20-minute call'),
});

// best-effort burst limit per warm instance; real abuse protection belongs in the firewall
const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 6;
};

export async function POST(req: Request) {
  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await req.json());
  } catch {
    return Response.json({ ok: false, error: 'Please check your email address and try again.' }, { status: 400 });
  }
  // bots that fill the honeypot get a polite success and nothing else
  if (body.website) return Response.json({ ok: true });
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) return Response.json({ ok: false, error: 'Too many requests. Try again in a few minutes.' }, { status: 429 });

  const lead: LeadInput = { ...body, referrer: body.referrer ?? req.headers.get('referer') ?? undefined };
  const s = scoreLead(lead);
  const country = req.headers.get('x-vercel-ip-country') ?? '';

  // respond instantly; research, drafting and delivery run after the response is sent
  after(async () => {
    const answers = Object.entries(lead.answers ?? {})
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    const brief = await structured(
      Brief,
      `You are the head of sales at ${SITE.name}, ${SITE.definition} You qualify inbound leads and draft replies. Never promise prices or timelines beyond: "${SITE.promises.reply}" and "${SITE.promises.pilot}". Sign replies as "The ${SITE.name} team".`,
      `New inbound lead from the ${lead.source} on ${lead.page ?? 'the site'}.\nName: ${lead.name ?? '-'}\nEmail: ${lead.email}\nCompany: ${lead.company ?? '-'} (email domain ${s.domain}${s.freeMail ? ', free webmail' : ''})\nRole: ${lead.role ?? '-'}\nCountry: ${country || '-'}\nAnswers:\n${answers || '-'}\nMessage:\n${lead.message ?? '-'}`
    );

    const lines = [
      `[${s.tier}] lead (${s.score}/100) via ${lead.source}`,
      `${lead.name ?? 'Unknown'} <${lead.email}>${lead.company ? ` · ${lead.company}` : ''}${lead.role ? ` · ${lead.role}` : ''}${country ? ` · ${country}` : ''}`,
      s.reasons.length ? `Signals: ${s.reasons.join(', ')}` : '',
      answers ? `\n${answers}` : '',
      lead.message ? `\nMessage: ${lead.message}` : '',
      lead.page ? `Page: ${absoluteUrl(lead.page)}` : '',
      lead.utm ? `UTM: ${Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join(' ')}` : '',
      brief ? `\nBrief: ${brief.summary} Fit: ${brief.fit}. Pitch: ${brief.recommendedService}.` : '',
      brief ? `Ask:\n${brief.questions.map((q) => `  - ${q}`).join('\n')}` : '',
      brief ? `\nDraft reply (edit and send):\n${brief.reply}` : '',
    ].filter(Boolean);

    await notify({
      subject: `${s.tier} lead ${s.score}/100: ${lead.company || s.domain || lead.email}`,
      text: lines.join('\n'),
      html: `<pre style="font:14px/1.5 ui-monospace,monospace;white-space:pre-wrap">${esc(lines.join('\n'))}</pre>`,
      data: { lead, scoring: s, country, brief },
    });

    // optional instant confirmation to the lead (needs a verified sending domain in Resend)
    if (process.env.LEAD_AUTOREPLY === '1' && process.env.RESEND_FROM) {
      const first = lead.name?.split(' ')[0] ?? 'there';
      await sendEmail(
        lead.email,
        `Got it, ${first}. Your ${SITE.name} plan is on the way`,
        `Hi ${first},\n\nThanks for reaching out to ${SITE.name}. A human (not a bot) is reading your answers now. ${SITE.promises.reply}.\n\nWhile you wait, these are worth five minutes:\n- Fine-tuning vs RAG vs prompting: ${absoluteUrl('/guides/fine-tuning-vs-rag-vs-prompting')}\n- What fine-tuning really costs: ${absoluteUrl('/guides/llm-fine-tuning-cost')}\n\nReply to this email with anything else we should know.\n\nThe ${SITE.name} team`,
        undefined,
        process.env.LEAD_NOTIFY_EMAIL || SITE.email
      ).catch((e) => console.error('[autoreply]', e));
    }
  });

  return Response.json({ ok: true });
}
