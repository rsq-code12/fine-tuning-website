// Home-page copy shared by the client sections and the server-side SEO surfaces (JSON-LD, llms.txt, Markdown twin).

export const FAQ: [string, string][] = [
  [
    'What does “fine-tuning” actually mean?',
    'We take a powerful general AI and train it further on your own examples until it knows your business, your formats and your voice. Think: a genius graduate who gets ten years of experience in one afternoon.',
  ],
  [
    'Do I need a lot of data?',
    'Less than you fear. A few hundred to a few thousand great examples is often enough, and where there are gaps, we manufacture synthetic data to fill them.',
  ],
  [
    'Is my data safe?',
    'Your data works for you and nobody else. We can operate inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control.',
  ],
  [
    'Why not just use ChatGPT with a good prompt?',
    'Sometimes that’s enough, and we’ll tell you to your face. When you need consistency, deep domain accuracy, low cost at volume or private deployment, prompts tap out. We don’t.',
  ],
  [
    'How fast can you move?',
    'A focused pilot usually ships in two to six weeks. Bigger agent systems roll out in phases, so you’re winning long before we’re finished.',
  ],
];

export const STEPS = [
  {
    title: 'Diagnose',
    body: 'We find where AI makes you money, fast. One sit-down, a ranked hit list of opportunities, and a straight answer: worth it or not.',
    when: 'Week 1',
    gets: ['Workflow audit', 'ROI hit list', 'Straight verdict'],
  },
  {
    title: 'Collect & curate',
    body: 'We round up your docs, tickets, transcripts and data, then clean, label and shape them into a training set built to win.',
    when: 'Weeks 1–2',
    gets: ['Versioned dataset', 'PII scrubbed', 'Synthetic top-up'],
  },
  {
    title: 'Train & tune',
    body: 'We pick the right base model for your budget and fine-tune it hard: LoRA, DPO or full fine-tune. Every run tracked, every metric earned.',
    when: 'Weeks 2–4',
    gets: ['Model weights you own', 'Training reports', 'Cost per query'],
  },
  {
    title: 'Evaluate',
    body: 'Custom evals put it through hell on your real cases: accuracy, tone, safety, cost. Nothing ships until it’s undeniable.',
    when: 'Continuous',
    gets: ['Eval suite', 'Red-team pass', 'Release gates'],
  },
  {
    title: 'Deploy & evolve',
    body: 'We ship it straight into your stack and keep it learning from live feedback. It gets sharper every month. Your competitors don’t.',
    when: 'Week 4+',
    gets: ['Production API', 'Monitoring', 'Monthly retrains'],
  },
];

export const RENT = [
  'Knows the internet. Not your business.',
  'Your data walks out the door',
  'Pay per token. Forever.',
  'Same answers your competitors get',
  'Prompt tricks and prayers',
];

export const OWN = [
  'Trained on your docs, deals & tone',
  'Lives in your cloud. Answers to you.',
  'Pennies per query at scale',
  'A moat nobody can cross',
  'Battle-tested with evals, every release',
];
