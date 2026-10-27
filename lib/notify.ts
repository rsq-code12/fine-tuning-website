import { SITE } from '@/lib/site';

/*
 * Delivery for leads and radar digests. Configure any or all:
 *   LEAD_WEBHOOK_URL   Slack / Discord incoming webhook, or a Zapier / Make / n8n catch hook (gets the raw JSON too)
 *   RESEND_API_KEY + LEAD_NOTIFY_EMAIL (+ RESEND_FROM)   email via Resend
 * With nothing configured, messages are written to the server log so nothing is silently lost.
 */

export type Notice = { subject: string; text: string; html?: string; data?: unknown };

export const channelsConfigured = () => Boolean(process.env.LEAD_WEBHOOK_URL || (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL));

async function post(url: string, body: unknown) {
  const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${url.split('/')[2]} responded ${res.status}`);
}

export async function sendEmail(to: string, subject: string, text: string, html?: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || `${SITE.name} <onboarding@resend.dev>`,
      to: [to],
      subject,
      text,
      ...(html ? { html } : {}),
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`resend responded ${res.status}: ${await res.text()}`);
  return true;
}

/** Fan a notice out to every configured channel; failures are logged, never thrown. */
export async function notify(n: Notice) {
  const jobs: Promise<unknown>[] = [];
  const hook = process.env.LEAD_WEBHOOK_URL;
  // `text` for Slack, `content` for Discord (2000-char cap), the structured payload for automation tools
  if (hook) jobs.push(post(hook, { text: n.text, content: n.text.slice(0, 1990), subject: n.subject, data: n.data }));
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (to) jobs.push(sendEmail(to, n.subject, n.text, n.html));
  if (!jobs.length) {
    console.log(`[notify] no channel configured. ${n.subject}\n${n.text}`);
    return;
  }
  for (const r of await Promise.allSettled(jobs)) if (r.status === 'rejected') console.error('[notify]', r.reason);
}

export const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
