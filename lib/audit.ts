/*
 * The 2-minute AI audit. Option values for size, timeline, budget, role and data match the
 * lead-scoring weights in lib/leads/score.ts, so every completed audit arrives pre-qualified.
 */

export type Answers = Record<string, string>;
type Q = { id: string; label: string; options: [string, string][] };

export const QUESTIONS: Q[] = [
  {
    id: 'goal',
    label: 'What do you want AI to do first?',
    options: [
      ['answers', 'Answer questions from our docs, policies or knowledge base'],
      ['voice', 'Write or talk exactly like our brand or our best people'],
      ['extract', 'Read documents and pull out, sort or score the data'],
      ['ops', 'Run multi-step work on its own: leads, support, reporting'],
      ['automate', 'Automate repetitive work between the tools we use'],
      ['product', 'Power an AI product or feature we sell'],
    ],
  },
  {
    id: 'volume',
    label: 'How often will it run?',
    options: [
      ['low', 'A few times a day'],
      ['mid', 'Hundreds to thousands of times a day'],
      ['high', 'Tens of thousands of times a day or more'],
    ],
  },
  {
    id: 'data',
    label: 'What do you have to teach it with?',
    options: [
      ['ready', 'Thousands of real examples: tickets, docs, emails, transcripts'],
      ['some', 'Some documents, nothing organized'],
      ['none', 'Not much yet'],
    ],
  },
  {
    id: 'sensitivity',
    label: 'How sensitive is that data?',
    options: [
      ['public', 'Mostly public or marketing material'],
      ['internal', 'Internal and confidential'],
      ['regulated', 'Regulated: personal, health or financial data'],
    ],
  },
  {
    id: 'size',
    label: 'How big is the company?',
    options: [
      ['solo', 'Just me'],
      ['2-10', '2 to 10 people'],
      ['11-50', '11 to 50'],
      ['51-200', '51 to 200'],
      ['201-1000', '201 to 1,000'],
      ['1000+', 'More than 1,000'],
    ],
  },
  {
    id: 'role',
    label: 'What is your role?',
    options: [
      ['founder', 'Founder or owner'],
      ['exec', 'Executive (C-level, VP, director)'],
      ['manager', 'Manager or team lead'],
      ['ic', 'Engineer, analyst or specialist'],
    ],
  },
  {
    id: 'timeline',
    label: 'When do you want this live?',
    options: [
      ['now', 'This month'],
      ['quarter', 'This quarter'],
      ['year', 'This year'],
      ['exploring', 'Just exploring'],
    ],
  },
  {
    id: 'budget',
    label: 'What budget is realistic for a first project?',
    options: [
      ['<5k', 'Under $5k'],
      ['5k-25k', '$5k to $25k'],
      ['25k-100k', '$25k to $100k'],
      ['100k+', '$100k+'],
      ['unsure', 'Not sure yet'],
    ],
  },
];

export type Recommendation = { key: string; headline: string; why: string; steps: string[]; links: [string, string][] };

export function recommend(a: Answers): Recommendation {
  const noData = a.data === 'none';
  const highVolume = a.volume === 'high';
  const regulated = a.sensitivity === 'regulated';

  let r: Recommendation;
  switch (a.goal) {
    case 'voice':
      r = {
        key: 'fine-tune',
        headline: 'Fine-tune a model on your best work.',
        why: 'Tone, format and judgment are exactly what prompts fail to hold and fine-tuning nails. A LoRA fine-tune on a few hundred to a few thousand of your best examples makes every answer sound like your sharpest person.',
        steps: ['Pick the 300 to 3,000 examples that best represent "great" for you.', 'Write 50 test cases the model must pass before it ships.', 'LoRA fine-tune an open model, compare it head to head with your current setup.', 'Deploy behind your tools, retrain monthly on fresh examples.'],
        links: [
          ['/services/custom-model-fine-tuning', 'LLM fine-tuning services'],
          ['/guides/how-much-data-to-fine-tune', 'How much data you need to fine-tune'],
        ],
      };
      break;
    case 'extract':
      r = {
        key: highVolume ? 'fine-tune-small' : 'prompt-first',
        headline: highVolume ? 'Fine-tune a small, fast specialist.' : 'Start with a frontier model and a tight prompt.',
        why: highVolume
          ? 'At your volume a small fine-tuned model can match a frontier model on one narrow extraction task at a fraction of the cost per document, and it can run in your own cloud.'
          : 'At low volume a well-prompted frontier model is the fastest path. Log every output now: those logs become the training set for a cheaper fine-tuned model later.',
        steps: ['Define the exact fields and labels you need, with 20 worked examples.', 'Build an evaluation set from real documents and measure accuracy field by field.', highVolume ? 'Fine-tune a 3B to 14B model and compare cost per 1,000 documents.' : 'Ship the prompted version, then fine-tune once you have a few thousand verified outputs.', 'Route low-confidence cases to a human.'],
        links: [
          ['/guides/fine-tuning-vs-rag-vs-prompting', 'Fine-tuning vs RAG vs prompting'],
          ['/services/custom-model-fine-tuning', 'LLM fine-tuning services'],
        ],
      };
      break;
    case 'ops':
      r = {
        key: 'agents',
        headline: 'Build an agent crew for one workflow.',
        why: 'Multi-step work with handoffs is where agents beat both chatbots and rigid automations. Start with one workflow, one owner and a human approval step, then expand once it earns trust.',
        steps: ['Pick the workflow that burns the most hours each week.', 'Map each step, the tools it touches and where a human must approve.', 'Ship a 2 to 4 agent crew with logging, retries and evals.', 'Measure hours saved for 30 days, then add the next workflow.'],
        links: [
          ['/services/ai-agent-swarms', 'AI agent development'],
          ['/guides/ai-agents-for-business-operations', 'How to build an AI agent team'],
        ],
      };
      break;
    case 'automate':
      r = {
        key: 'automation',
        headline: 'Automation spine first, AI only where judgment lives.',
        why: 'Most repetitive work is deterministic and belongs in n8n, Make or Zapier. Add AI steps only where a human currently has to read, decide or write. You get reliability and intelligence without paying for either twice.',
        steps: ['List the ten most repeated manual tasks and their volume.', 'Automate the deterministic ones outright.', 'Add an AI step where judgment is needed, with a confidence threshold.', 'Review exceptions weekly and promote recurring ones into rules.'],
        links: [
          ['/services/enterprise-ai-adoption', 'Enterprise AI adoption'],
          ['/guides/ai-agents-vs-automation-tools', 'AI agents vs automation tools'],
        ],
      };
      break;
    case 'product':
      r = {
        key: 'product',
        headline: 'Own the model behind your product.',
        why: 'If AI is the product, renting the same API as your competitors is not a moat. A fine-tuned model plus a proper evaluation harness gives you quality they cannot copy and margins that survive scale.',
        steps: ['Lock the 3 to 5 tasks the product must be world-class at.', 'Build an evaluation suite and baseline the best API model on it.', 'Fine-tune an open model and compare quality, latency and cost per user.', 'Ship behind a harness with tracing, fallbacks and release gates.'],
        links: [
          ['/guides/open-source-vs-closed-models-fine-tuning', 'Open-source vs closed models'],
          ['/services/multi-agent-harnesses', 'Multi-agent harnesses and dev tools'],
        ],
      };
      break;
    default:
      r = {
        key: 'rag',
        headline: 'Retrieval first. Fine-tune for the last mile.',
        why: 'Answering from your own documents is a retrieval problem first: RAG keeps answers current and cites sources. Fine-tuning comes in when you need a consistent format, tone or lower cost at volume.',
        steps: ['Collect and clean the documents the answers must come from.', 'Write 50 real questions with ideal answers as your evaluation set.', 'Ship retrieval with citations and measure answer accuracy.', highVolume ? 'Fine-tune a smaller model on approved answers to cut cost per query.' : 'Add a fine-tune only if tone or format keeps drifting.'],
        links: [
          ['/guides/fine-tuning-vs-rag-vs-prompting', 'Fine-tuning vs RAG vs prompting'],
          ['/services/domain-skills-system-files', 'Domain skills and system files'],
        ],
      };
  }

  if (noData) {
    r.steps.unshift('Build the dataset before the model: capture real examples from your workflow, or let us generate and verify synthetic ones.');
    r.links = [['/services/fine-tuning-datasets', 'Niche datasets for fine-tuning'], r.links[0]];
  }
  if (regulated) {
    r.steps.push('Keep regulated data in your own cloud: open-weight model, private deployment, PII scrubbed before training.');
    r.links = [r.links[0], ['/guides/fine-tuning-data-privacy', 'Is your data safe when you fine-tune?']];
  }
  return r;
}

/** How ready the business is to ship AI now (not how good a lead it is). */
export function readiness(a: Answers): number {
  const data = { ready: 35, some: 20, none: 8 }[a.data] ?? 10;
  const volume = { high: 20, mid: 16, low: 9 }[a.volume] ?? 10;
  const sens = { public: 15, internal: 12, regulated: 9 }[a.sensitivity] ?? 10;
  const time = { now: 15, quarter: 12, year: 7, exploring: 4 }[a.timeline] ?? 6;
  const goal = a.goal ? 15 : 0;
  return Math.min(100, data + volume + sens + time + goal);
}
