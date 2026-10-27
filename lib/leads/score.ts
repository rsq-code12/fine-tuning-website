/*
 * Deterministic lead scoring: every lead gets a 0-100 score and a tier the moment it lands,
 * with or without AI. Weights favour budget, urgency and authority (the classic BANT signals).
 */

export type LeadInput = {
  email: string;
  name?: string;
  company?: string;
  role?: string;
  message?: string;
  source: string;
  /** answers from the audit / calculator, keyed by question id */
  answers?: Record<string, string>;
  page?: string;
  referrer?: string;
  utm?: Record<string, string>;
};

export type Tier = 'HOT' | 'WARM' | 'COLD';
export type Scored = { score: number; tier: Tier; reasons: string[]; domain: string; freeMail: boolean };

const FREE_MAIL = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'msn.com', 'icloud.com', 'me.com', 'aol.com',
  'proton.me', 'protonmail.com', 'gmx.com', 'gmx.de', 'yandex.com', 'mail.com', 'zoho.com', 'qq.com', '163.com', 'hey.com', 'pm.me',
]);

const W: Record<string, Record<string, number>> = {
  budget: { '100k+': 30, '25k-100k': 24, '5k-25k': 14, '<5k': 4, unsure: 8 },
  timeline: { now: 25, quarter: 17, year: 7, exploring: 2 },
  size: { '1000+': 18, '201-1000': 17, '51-200': 15, '11-50': 12, '2-10': 7, solo: 3 },
  role: { founder: 15, exec: 15, manager: 9, ic: 4, other: 3 },
  data: { ready: 10, some: 6, none: 2 },
};

export function scoreLead(l: LeadInput): Scored {
  const a = l.answers ?? {};
  const reasons: string[] = [];
  let score = 0;

  for (const key of Object.keys(W)) {
    const v = a[key];
    if (v && W[key][v] !== undefined) {
      score += W[key][v];
      if (W[key][v] >= 15) reasons.push(`${key}: ${v}`);
    }
  }

  const domain = (l.email.split('@')[1] ?? '').toLowerCase();
  const freeMail = FREE_MAIL.has(domain);
  if (domain && !freeMail) {
    score += 6;
    reasons.push(`business email (${domain})`);
  }
  if (l.company && l.company.trim().length > 1) score += 3;
  if (l.message && l.message.trim().length > 80) {
    score += 6;
    reasons.push('wrote a detailed brief');
  }
  // someone who priced a 70B+ run or a full fine-tune is past the curiosity stage
  if (l.source === 'calculator' && /70|405|full/.test(`${a.model ?? ''} ${a.method ?? ''}`)) {
    score += 8;
    reasons.push('priced a large training run');
  }
  if (l.source === 'contact') score += 8;

  score = Math.max(0, Math.min(100, score));
  const tier: Tier = score >= 65 ? 'HOT' : score >= 40 ? 'WARM' : 'COLD';
  return { score, tier, reasons, domain, freeMail };
}
