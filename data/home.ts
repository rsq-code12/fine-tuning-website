// Home-page copy shared by the client sections and the server-side SEO surfaces (JSON-LD, llms.txt, Markdown twin).

export const FAQ: [string, string][] = [
  [
    'What does “fine-tuning” actually mean?',
    'We take a powerful general AI and train it further on your own examples until it knows your business, your formats and your voice. It is the difference between a capable generalist and a specialist trained on your work.',
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
    'Sometimes that is enough, and we will tell you so. When you need consistency, deep domain accuracy, low cost at volume or private deployment, prompting reaches its limit and training is the better tool.',
  ],
  [
    'Who owns the model and the data?',
    'You do. The fine-tuned weights, the training dataset and the evaluation suite are yours, and we can work entirely inside your own cloud.',
  ],
  [
    'Do you work with teams training their own models?',
    'Yes. We build supervised and preference datasets, scoring rubrics and evaluation suites for teams doing their own post-training.',
  ],
  [
    'How fast can you move?',
    'A focused pilot usually ships in two to six weeks. Bigger agent systems roll out in phases, so you see value long before the full rollout is complete.',
  ],
];

export const STEPS = [
  {
    title: 'Diagnose',
    body: 'We map where AI will pay back and where it won’t: one working session, a ranked list of opportunities and a straight answer on whether to proceed.',
    when: 'Week 1',
    gets: ['Workflow audit', 'Ranked opportunities', 'Go / no-go verdict'],
  },
  {
    title: 'Collect & curate',
    body: 'We gather your documents, tickets, transcripts and data, then clean, label and structure them into a versioned training set with personal data removed.',
    when: 'Weeks 1–2',
    gets: ['Versioned dataset', 'PII scrubbed', 'Synthetic top-up'],
  },
  {
    title: 'Train & tune',
    body: 'We choose the base model that fits your quality bar and budget, then fine-tune it with LoRA, preference training or, where it pays, reinforcement learning. Every run is tracked and reproducible.',
    when: 'Weeks 2–4',
    gets: ['Model weights you own', 'Training reports', 'Cost per query'],
  },
  {
    title: 'Evaluate',
    body: 'Custom evaluations test it on held-out real cases for accuracy, tone, safety and cost. Nothing ships until it clears the release gates we agree with you.',
    when: 'Continuous',
    gets: ['Eval suite', 'Red-team pass', 'Release gates'],
  },
  {
    title: 'Deploy & evolve',
    body: 'We deploy into your stack, monitor it in production and retrain on reviewed feedback, so performance improves month over month.',
    when: 'Week 4+',
    gets: ['Production API', 'Monitoring', 'Monthly retrains'],
  },
];

export const RENT = [
  'Knows the internet. Not your business.',
  'Your data leaves your environment',
  'Usage fees that grow with every query',
  'Same answers your competitors get',
  'Quality held together by prompts',
];

export const OWN = [
  'Trained on your documents, decisions and tone',
  'Runs in your cloud, under your controls',
  'Lower cost per query at scale',
  'An advantage competitors cannot rent',
  'Evaluated on your cases before every release',
];
