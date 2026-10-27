/*
 * Content schema for every crawlable page (services, industries, guides, glossary).
 * Blocks render to HTML (components/content/Blocks.tsx) AND to Markdown (lib/markdown.ts),
 * so the same words feed Google, the .md twins and llms-full.txt.
 *
 * Inline syntax allowed inside any text string:
 *   **bold**            [label](/internal/path)            {{brand}}
 */

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  /** a highlighted takeaway box */
  | { type: 'callout'; title?: string; text: string };

export type Faq = { q: string; a: string };

export type Doc = {
  slug: string;
  /** H1, sentence case, can be long and question-shaped */
  title: string;
  /** <title>, max ~60 chars, keyword first, no brand (the template appends it) */
  seoTitle: string;
  /** meta description, 140-158 chars, includes the main keyword and a reason to click */
  description: string;
  /** small mono label above the H1, e.g. "Service" or "Guide · Costs" */
  eyebrow: string;
  /** The "short answer": 40-70 words that fully answer the page's main question on their own. Answer engines quote this. */
  answer: string;
  /** 3-6 crisp, self-contained, citable facts */
  facts: string[];
  body: Block[];
  /** 4-6 FAQs, each answer 40-90 words and self-contained */
  faqs: Faq[];
  /** internal hrefs to related pages, e.g. "/guides/llm-fine-tuning-cost" */
  related: string[];
  keywords: string[];
  /** ISO date, e.g. "2026-10-27" */
  updated: string;
};

export type ServiceDoc = Doc & {
  /** index into data/services.ts (0-9) for the card art, tools and pitch */
  serviceIndex: number;
  /** who buys this, 3-5 bullets */
  idealFor: string[];
  /** what the client walks away with, 4-7 bullets */
  deliverables: string[];
  /** e.g. "Pilot in 2-6 weeks" */
  timeline: string;
};

export type IndustryDoc = Doc & {
  /** short display name, e.g. "Legal" */
  name: string;
  /** 4-6 concrete AI use cases */
  useCases: { title: string; detail: string }[];
  /** slugs from SERVICE_SLUGS most relevant to this industry */
  services: string[];
};

export type GlossaryTerm = {
  slug: string;
  term: string;
  /** expanded form, e.g. "Low-Rank Adaptation" */
  aka?: string;
  /** definition sentence(s), max 45 words, of the form "X is ..." */
  short: string;
  body: Block[];
  /** other glossary slugs */
  related: string[];
  /** the most relevant service/guide href */
  seeAlso: string[];
};

/* Canonical slugs. Writers may only link to these (plus /audit, /tools/fine-tuning-cost-calculator, /#contact). */

export const SERVICE_SLUGS = [
  'custom-model-fine-tuning',
  'ai-agent-swarms',
  'domain-skills-system-files',
  'enterprise-ai-adoption',
  'micro-agency-ai-systems',
  'ai-digital-products',
  'multi-agent-harnesses',
  'fine-tuning-datasets',
  'trading-financial-ai-pipelines',
  'ai-content-engine',
] as const;

export const INDUSTRY_SLUGS = [
  'legal',
  'healthcare',
  'financial-services',
  'ecommerce',
  'real-estate',
  'insurance',
  'saas',
  'marketing-agencies',
  'recruiting',
  'education',
] as const;

export const GUIDE_SLUGS = [
  'fine-tuning-vs-rag-vs-prompting',
  'llm-fine-tuning-cost',
  'how-much-data-to-fine-tune',
  'lora-qlora-explained',
  'how-to-prepare-fine-tuning-dataset',
  'open-source-vs-closed-models-fine-tuning',
  'ai-agents-for-business-operations',
  'how-to-choose-ai-fine-tuning-partner',
  'fine-tuning-data-privacy',
  'ai-agents-vs-automation-tools',
] as const;

export const GLOSSARY_SLUGS = [
  'fine-tuning',
  'lora',
  'qlora',
  'peft',
  'supervised-fine-tuning',
  'rlhf',
  'dpo',
  'rag',
  'embeddings',
  'vector-database',
  'ai-agent',
  'multi-agent-system',
  'model-context-protocol',
  'synthetic-data',
  'distillation',
  'quantization',
  'context-window',
  'tokens',
  'hallucination',
  'llm-evals',
  'prompt-engineering',
  'system-prompt',
  'inference',
  'open-weight-models',
  'base-model',
  'catastrophic-forgetting',
  'overfitting',
  'guardrails',
  'tool-calling',
  'reasoning-models',
] as const;
