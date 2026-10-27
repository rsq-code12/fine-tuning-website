// Fictional businesses used to show what fine-tuning changes.
export type Scenario = {
  id: string;
  label: string;
  who: string;
  model: string;
  q: string;
  base: string;
  tuned: string;
};

export const scenarios: Scenario[] = [
  {
    id: 'shop',
    label: 'E-commerce',
    who: 'Customer',
    model: 'stride-support-v3',
    q: 'I wore my sneakers once. Can I still return them?',
    base: 'Return policies vary by retailer. Generally, items must be unworn and in their original packaging. Please check the store’s return policy or contact customer service.',
    tuned: 'Yep! Stride takes back lightly worn pairs within 30 days (our test-run guarantee). I’ve opened return #RT-4821 for your Cloudrunner 3s, and the prepaid label is in your inbox. Want to swap for a half-size up instead?',
  },
  {
    id: 'clinic',
    label: 'Dental clinic',
    who: 'Patient',
    model: 'brightside-front-desk-v2',
    q: 'My new filling feels high when I bite. Is that normal?',
    base: 'If you’re experiencing discomfort after a dental procedure, it’s best to contact your dentist. Sometimes fillings need to be adjusted.',
    tuned: 'Very common in the first 48 hours. It usually just needs a 5-minute bite adjustment, free at Brightside. Dr. Patel has an opening tomorrow at 9:40. Shall I book it? If you notice swelling, call our urgent line.',
  },
  {
    id: 'ops',
    label: 'Logistics',
    who: 'Ops manager',
    model: 'northwind-ops-v5',
    q: 'What’s our late-delivery penalty on the Acme contract?',
    base: 'I don’t have access to your contracts. Late-delivery penalties are typically defined in the service-level agreement between the parties.',
    tuned: '2% of shipment value per day late, capped at 10% (Acme MSA §7.3). Three shipments are at risk this week. I’ve flagged them to dispatch and drafted a heads-up email to Acme for your review.',
  },
];

export const feedEvents: [string, string][] = [
  ['Scout', 'found 14 new leads in fintech'],
  ['Writer', 'drafted 14 personalized intro emails'],
  ['Closer', 'booked a call with a VP of Operations'],
  ['Support', 'resolved ticket #2291 in 38 seconds'],
  ['Analyst', 'flagged a 12% dip in trial sign-ups'],
  ['Orchestrator', 're-routed 3 tasks from Writer to Ops'],
  ['Ops', 'updated 220 CRM records'],
  ['Support', 'answered 41 customer questions overnight'],
  ['Scout', 'enriched 60 accounts with funding data'],
  ['Writer', 'turned a webinar into 6 LinkedIn posts'],
  ['Analyst', 'shipped the Monday KPI report'],
  ['Closer', 'sent a proposal to Halcyon Labs'],
];
