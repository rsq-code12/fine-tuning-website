import Link from 'next/link';
import Blocks from '@/components/content/Blocks';
import Breadcrumbs from '@/components/content/Breadcrumbs';
import FaqList from '@/components/content/FaqList';
import JsonLd from '@/components/content/JsonLd';
import CostCalculator from '@/components/tools/CostCalculator';
import type { Block, Faq } from '@/data/content/types';
import { estimate, GPUS, METHODS } from '@/lib/calc';
import { appLd, breadcrumbLd, faqLd, graph, pageMeta } from '@/lib/seo';

const path = '/tools/fine-tuning-cost-calculator';

export const metadata = pageMeta({
  title: 'LLM Fine-Tuning Cost Calculator (GPU Hours & Price)',
  description: 'Free calculator: estimate GPU hours, GPUs needed and compute cost to fine-tune Llama, Qwen or Mistral with LoRA, QLoRA or full fine-tuning on H100, A100 or L40S.',
  path,
  eyebrow: 'Free tool',
  keywords: ['fine-tuning cost calculator', 'LLM fine-tuning cost', 'cost to fine-tune llama', 'GPU hours fine-tuning', 'LoRA training cost', 'QLoRA cost'],
});

const usd = (n: number) => `$${n < 10 ? n.toFixed(2) : Math.round(n).toLocaleString('en-US')}`;
const ex8 = estimate({ model: '8b', method: 'lora', gpu: 'h100', examples: 5000, tokensPerExample: 800, epochs: 3, runs: 1 });
const ex70 = estimate({ model: '70b', method: 'qlora', gpu: 'h100', examples: 5000, tokensPerExample: 800, epochs: 3, runs: 1 });

const method: Block[] = [
  { type: 'h2', text: 'How the estimate works' },
  {
    type: 'p',
    text: 'The calculator uses the standard compute rule of thumb for transformer training: about **6 × parameters × training tokens** floating-point operations for a full fine-tune, and about **4 ×** for [LoRA](/glossary/lora), because frozen weights need no weight gradients. [QLoRA](/glossary/qlora) adds roughly 40% for de-quantizing the 4-bit base model on the fly.',
  },
  {
    type: 'ol',
    items: [
      'Training tokens = examples × average tokens per example × epochs.',
      'FLOPs = multiplier (6 full, 4 LoRA, 5.6 QLoRA) × parameters × training tokens.',
      'GPU-hours = FLOPs ÷ effective GPU throughput ÷ 3,600, × 1.5 for real-world overhead (data loading, evaluation, checkpointing), and ÷ 0.85 when the job is sharded across several GPUs.',
      'GPUs needed = parameters × bytes per parameter × 1.2 ÷ 90% of one GPU’s memory. Bytes per parameter: about 18 for full fine-tuning (weights, gradients and Adam states), 2.2 for LoRA, 0.65 for QLoRA.',
      'Cost = GPU-hours × your hourly rate × number of experiment runs.',
    ],
  },
  {
    type: 'table',
    caption: 'Default assumptions (edit the rate to match your provider)',
    head: ['GPU', 'Memory', 'Effective throughput', 'Default rate'],
    rows: GPUS.map((g) => [g.label, `${g.mem} GB`, `~${g.tflops} TFLOPS`, `$${g.rate.toFixed(2)}/h`]),
  },
  {
    type: 'p',
    text: `Worked example: an 8B model, LoRA, 5,000 examples of 800 tokens, 3 epochs is 12 million training tokens. That is about ${ex8.gpuHours.toFixed(1)} H100-hours, or roughly ${usd(ex8.costPerRun)} of compute per run. The same data on a 70B model with QLoRA needs about ${Math.round(ex70.gpuHours)} H100-hours, roughly ${usd(ex70.costPerRun)} per run.`,
  },
  {
    type: 'callout',
    title: 'The honest part',
    text: 'For LoRA fine-tunes of open models, compute is usually the smallest line in the budget. Data preparation, evaluation and engineering time decide the cost and the outcome. Read the full breakdown in [how much it costs to fine-tune an LLM](/guides/llm-fine-tuning-cost).',
  },
  {
    type: 'p',
    text: `Rates for cloud GPUs vary widely between providers and change often, and effective throughput depends on sequence length, batch size and kernels. Treat results as order-of-magnitude planning numbers. Methods available: ${METHODS.map((m) => m.label).join('; ')}.`,
  },
];

const faqs: Faq[] = [
  {
    q: 'How much does it cost to fine-tune Llama 8B?',
    a: `Fine-tuning an 8B Llama-class model with LoRA on 5,000 examples of 800 tokens for 3 epochs takes about ${ex8.gpuHours.toFixed(1)} H100 GPU-hours, roughly ${usd(ex8.costPerRun)} of compute per run at $2.50 per hour. Across five experiment runs that is still under $20. Data preparation and evaluation usually cost far more than the GPUs.`,
  },
  {
    q: 'How many GPUs do I need to fine-tune a 70B model?',
    a: 'A 70B model fits on a single 80GB GPU with QLoRA, needs two to three 80GB GPUs with 16-bit LoRA, and needs a multi-node cluster of roughly 16 to 24 80GB GPUs for a full fine-tune, because full fine-tuning stores gradients and optimizer states for every weight.',
  },
  {
    q: 'Is LoRA cheaper than full fine-tuning?',
    a: 'LoRA is cheaper mainly because it needs far less GPU memory, so it runs on fewer and smaller GPUs. Compute per token drops by about a third compared with full fine-tuning. For most business tasks LoRA matches full fine-tuning quality, which is why it is the default choice.',
  },
  {
    q: 'What is not included in this fine-tuning cost estimate?',
    a: 'The estimate covers GPU compute only. It excludes data collection and cleaning, labeling, evaluation, engineering time, failed experiments beyond the runs you enter, storage, and hosting the model afterwards. For a complete, fixed quote, send the estimate through the form on this page.',
  },
];

export default function Page() {
  const trail: [string, string][] = [['Fine-tuning cost calculator', path]];
  return (
    <div className="mx-auto max-w-7xl px-gutter pt-[124px] pb-24">
      <JsonLd
        data={graph(
          appLd('LLM fine-tuning cost calculator', 'Estimate GPU hours, GPUs needed and compute cost to fine-tune an LLM by model size, method and dataset.', path),
          breadcrumbLd(trail),
          faqLd(faqs)
        )}
      />
      <Breadcrumbs trail={trail} />
      <header className="max-w-5xl">
        <p className="eyebrow mb-6">Free tool</p>
        <h1 className="doc-title">LLM fine-tuning cost calculator</h1>
      </header>
      <section aria-label="Short answer" className="answer mt-10 max-w-4xl">
        <p className="answer__label">Short answer</p>
        <p className="answer__text">
          Fine-tuning an 8B model with LoRA on a typical business dataset costs about {usd(ex8.costPerRun)} of GPU compute per run, and a 70B model with QLoRA about {usd(ex70.costPerRun)}. Plug in your own numbers below.
        </p>
      </section>
      <div className="mt-14">
        <CostCalculator />
      </div>
      <div className="mt-20 max-w-3xl">
        <Blocks blocks={method} />
        <FaqList faqs={faqs} />
        <p className="mt-12 text-bone-3">
          Not sure fine-tuning is even the right move?{' '}
          <Link href="/audit" className="ilink">
            Take the 2-minute AI audit
          </Link>{' '}
          or read{' '}
          <Link href="/guides/fine-tuning-vs-rag-vs-prompting" className="ilink">
            fine-tuning vs RAG vs prompting
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
