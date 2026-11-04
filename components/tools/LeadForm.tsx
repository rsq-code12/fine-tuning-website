'use client';

import { useState, type FormEvent } from 'react';
import { Arrow } from '@/components/ui/Logo';
import { API_ORIGIN } from '@/lib/site';

type Props = {
  source: 'audit' | 'calculator' | 'contact' | 'guide';
  answers?: Record<string, string>;
  heading: string;
  sub: string;
  cta?: string;
  /** ask for a free-text brief */
  withMessage?: boolean;
};

const utm = () => {
  const out: Record<string, string> = {};
  try {
    new URLSearchParams(window.location.search).forEach((v, k) => {
      if (k.startsWith('utm_') || k === 'ref' || k === 'gclid') out[k] = v.slice(0, 200);
    });
  } catch {}
  return Object.keys(out).length ? out : undefined;
};

/** Every tool ends here: a short form that lands in /api/lead, gets scored, and pings the owner. */
export default function LeadForm({ source, answers, heading, sub, cta = 'Get my plan', withMessage = true }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState('sending');
    try {
      const res = await fetch(`${API_ORIGIN}/api/lead`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          source,
          answers,
          email: f.get('email'),
          name: f.get('name') || undefined,
          company: f.get('company') || undefined,
          message: f.get('message') || undefined,
          website: f.get('website') || undefined,
          page: window.location.pathname,
          referrer: document.referrer || undefined,
          utm: utm(),
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error || 'Something went wrong.');
      setState('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setState('error');
    }
  }

  if (state === 'done')
    return (
      <div className="panel flex flex-col gap-4 p-8" role="status">
        <p className="eyebrow">Received</p>
        <p className="doc-h2">Thank you. We have it.</p>
        <p className="text-bone-3">You will get a plan, a price and an honest verdict within 24 hours. If it does not arrive, check your spam folder.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="panel flex flex-col gap-6 p-6 md:p-10">
      <div className="flex flex-col gap-3">
        <p className="eyebrow">Next step</p>
        <h2 className="doc-h2">{heading}</h2>
        <p className="text-bone-3">{sub}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field">
          <span>Name</span>
          <input className="input" name="name" autoComplete="name" maxLength={120} />
        </label>
        <label className="field">
          <span>Work email *</span>
          <input className="input" name="email" type="email" required autoComplete="email" maxLength={200} />
        </label>
        <label className="field sm:col-span-2">
          <span>Company</span>
          <input className="input" name="company" autoComplete="organization" maxLength={160} />
        </label>
        {withMessage && (
          <label className="field sm:col-span-2">
            <span>Anything we should know? (optional)</span>
            <textarea className="input min-h-28" name="message" maxLength={4000} />
          </label>
        )}
        {/* honeypot */}
        <label className="absolute -left-[9999px]" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <button type="submit" className="btn btn--lg" disabled={state === 'sending'}>
          <span>{state === 'sending' ? 'Sending' : cta}</span>
          <Arrow />
        </button>
        <p className="text-mono-xs text-bone-5">No spam. No sales cadence. One human reply.</p>
      </div>
      {state === 'error' && (
        <p role="alert" className="text-bone-2">
          {error}
        </p>
      )}
    </form>
  );
}
