import type { Doc } from './types';

/*
 * Guides, part A: strategy, cost, data volume, LoRA/QLoRA and dataset preparation.
 * Cost figures follow the same model as /tools/fine-tuning-cost-calculator:
 * full FT ≈ 6·P·T FLOPs, LoRA ≈ 4·P·T, QLoRA ≈ LoRA × 1.4, ×1.5 real-world overhead,
 * H100 ≈ 250 TFLOPS effective at $2-4/hr.
 */

export const guidesA: Doc[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Fine-tuning vs RAG vs prompting                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: 'fine-tuning-vs-rag-vs-prompting',
    title: 'Fine-tuning vs RAG vs prompt engineering: which does your business need?',
    seoTitle: 'Fine-Tuning vs RAG vs Prompt Engineering: Which to Use',
    description:
      'Fine-tuning vs RAG vs prompt engineering: a plain-English decision table, real costs and timelines, and when to combine all three in production AI.',
    eyebrow: 'Guide · Strategy',
    answer:
      'Start with prompt engineering: it costs almost nothing and you can test it in an afternoon. Add RAG (retrieval-augmented generation) when the model needs your private or fast-changing facts. Fine-tune when the model knows enough but behaves wrong: inconsistent format, off-brand tone, or a narrow task at high volume. A focused fine-tune usually needs 500 to 5,000 good examples.',
    facts: [
      "Prompt engineering changes the instructions, RAG changes what the model can read at answer time, and fine-tuning changes the model's weights.",
      'Retrieval-augmented generation (RAG) was introduced by Lewis et al. in 2020 and is the standard way to ground model answers in private, current documents.',
      'LoRA fine-tuning of an 8B open-weight model on 5,000 examples typically costs a few dollars of GPU compute per run; data preparation and evaluation cost far more.',
      'A basic RAG prototype can be built in days, while a production RAG system with access controls and evaluation typically takes 2 to 8 weeks.',
      'Fine-tuning is a poor way to teach a model fast-changing facts, because every update requires retraining and the model can still state outdated facts with confidence.',
    ],
    body: [
      {
        type: 'p',
        text: 'Every AI vendor has a favorite hammer. Prompt shops say prompting. Vector database companies say RAG. Training shops say fine-tune. The honest answer depends on one question: is your model failing because it lacks knowledge, or because it lacks behavior?',
      },
      {
        type: 'p',
        text: 'This guide gives you a decision rule, a table that maps common business problems to the right approach, realistic costs and timelines, and the patterns that work when you combine them.',
      },
      { type: 'h2', text: 'What is the difference between prompting, RAG and fine-tuning?' },
      {
        type: 'p',
        text: "[Prompt engineering](/glossary/prompt-engineering) is the practice of writing instructions, examples and constraints into a model's input to steer its output. Nothing about the model changes. You edit text, rerun and compare.",
      },
      {
        type: 'p',
        text: '[Retrieval-augmented generation (RAG)](/glossary/rag) is a pattern that searches your documents at question time and pastes the most relevant passages into the prompt. The model then answers from that context. Lewis et al. (2020) introduced the term, and it is now the default way to ground answers in private or current data.',
      },
      {
        type: 'p',
        text: "[Fine-tuning](/glossary/fine-tuning) is additional training that adjusts a model's weights on your own examples so it learns a behavior: a format, a tone, a decision pattern or a specialized task. The change sticks until you train again.",
      },
      {
        type: 'callout',
        title: 'The one-line rule',
        text: 'RAG changes what the model knows at answer time. Fine-tuning changes how the model behaves every time. Prompting is the cheapest way to find out which one you are missing.',
      },
      { type: 'h2', text: 'Quick verdict: which one should you start with?' },
      {
        type: 'ol',
        items: [
          '**Start with prompting.** If a strong model plus a careful system prompt and 3-10 examples gets you most of the way, stop there and ship.',
          '**Add RAG when answers depend on facts the model has never seen:** your policies, product catalog, contracts, tickets or anything that changes weekly.',
          '**Fine-tune when the facts are fine but the behavior is not:** the output format drifts, the tone is off, the prompt has ballooned to thousands of tokens, or per-call costs are too high at your volume.',
          '**Combine them when you need both:** private knowledge from retrieval and reliable behavior from training.',
        ],
      },
      {
        type: 'p',
        text: 'One warning. Fine-tuning is a weak way to teach a model new facts. Models tend to learn the style of your documents faster than their content, and every policy change means another training run. Put facts in retrieval. Put behavior in weights.',
      },
      { type: 'h2', text: 'Which approach fits which business problem?' },
      {
        type: 'table',
        caption: 'Decision table: common problems mapped to the best first approach',
        head: ['Problem you are seeing', 'Best first approach', 'Why'],
        rows: [
          ['Answers need your internal docs, policies or product data', 'RAG', 'The model reads the right passage at answer time, and updates are a re-index, not a retrain'],
          ['Answers must cite a source', 'RAG', 'Retrieved passages give you the citation for free'],
          ['Facts change daily or weekly (prices, stock, rules)', 'RAG', 'Retraining for every change is slow and costly'],
          ['Output format drifts (JSON, reports, forms)', 'Fine-tuning', 'Training on examples locks in structure more reliably than instructions'],
          ['Tone or brand voice is inconsistent', 'Fine-tuning', 'Style is a behavior, and behavior lives in the weights'],
          ['High-volume classification or extraction', 'Fine-tuning a small model', 'A tuned 7-8B model can match a large model on one narrow task at a fraction of the per-call cost'],
          ['Your prompt is 3,000+ tokens of rules and examples', 'Fine-tuning', 'Training bakes the rules in, so each call is shorter, faster and cheaper'],
          ['Requirements are still unclear', 'Prompting', 'Iterate in hours before you invest in data or infrastructure'],
          ['Fewer than about 50 good examples exist', 'Prompting with a few examples', 'There is not enough signal to train on yet'],
          ['Data cannot leave your infrastructure', 'Fine-tune an open-weight model and self-host, with RAG as needed', 'You control the weights, the hardware and the logs'],
        ],
      },
      { type: 'h2', text: 'How much does each approach cost, and how long does it take?' },
      {
        type: 'p',
        text: 'The ranges below are typical for a single use case, not quotes. They assume a business team with a clear task and some existing data. API and GPU prices vary by provider and change often.',
      },
      {
        type: 'table',
        caption: 'Typical cost and timeline by approach (late 2026, one use case)',
        head: ['Approach', 'Time to first working version', 'Upfront cost drivers', 'Ongoing cost drivers'],
        rows: [
          ['Prompt engineering', 'Hours to a few days', 'Team time writing and testing prompts', 'Per-token API fees, which grow with long prompts'],
          ['RAG', 'Days for a prototype, 2-8 weeks for production', 'Document cleanup, chunking, embedding, access controls, evaluation', 'Vector database hosting, re-embedding updated documents, longer prompts per call'],
          ['Fine-tuning (LoRA on an open model)', '2-6 weeks for a focused pilot', 'Dataset preparation, evaluation set, engineering; compute is usually tens to low hundreds of dollars', 'Hosting the model or adapter, periodic retraining'],
          ['Managed fine-tuning API', '1-4 weeks', 'Dataset preparation plus per-training-token fees', 'Inference on the tuned model, often priced above the base model'],
        ],
      },
      {
        type: 'p',
        text: 'Notice where the money goes. Embedding a million tokens with a hosted embedding model costs cents. Training a LoRA adapter on an 8B model costs a few dollars per run. The real spend in RAG and fine-tuning is people time: cleaning documents, building the dataset and proving quality with evaluations. Our [fine-tuning cost guide](/guides/llm-fine-tuning-cost) breaks that down line by line.',
      },
      { type: 'h2', text: 'When does prompt engineering stop being enough?' },
      {
        type: 'p',
        text: 'Prompting hits a ceiling in four predictable ways. The prompt grows past a few thousand tokens and every call pays for it. Outputs are right 90% of the time, but the other 10% breaks a downstream system. The model hedges or refuses on legitimate domain tasks. Or a smaller, cheaper model cannot follow the long instructions at all.',
      },
      {
        type: 'p',
        text: 'If you see any of these at production volume, test fine-tuning. If the failure is wrong or invented facts, which is called [hallucination](/glossary/hallucination), test RAG first.',
      },
      { type: 'h2', text: 'When is RAG the wrong answer?' },
      {
        type: 'p',
        text: 'RAG fails when retrieval fails. If the right passage is not found, the model answers from memory or guesses. Messy PDFs, scanned tables and documents that contradict each other are the usual culprits, so budget real time for cleanup.',
      },
      {
        type: 'p',
        text: "RAG also does little for style, format or reasoning patterns. Retrieving ten examples of good legal summaries into every prompt is a slow, expensive way to teach a writing style that a fine-tune learns once. Every retrieved passage also eats space in the model's context window, the maximum text it can read at once, and adds latency.",
      },
      { type: 'h2', text: 'When is fine-tuning worth it?' },
      {
        type: 'p',
        text: 'Fine-tuning earns its cost when the task is narrow, repeated at volume and judged on consistency. Think ticket triage, claims extraction, contract clause tagging, product descriptions in a fixed voice, or support replies in a regulated tone.',
      },
      {
        type: 'p',
        text: 'It also pays off on unit economics. A fine-tuned 7-8B open model can often match a frontier model on one narrow task while costing far less per call and running on hardware you control. With LoRA (Hu et al., 2021) and QLoRA (Dettmers et al., 2023), training is cheap enough that compute is rarely the blocker. Data is. See [how much data you need to fine-tune](/guides/how-much-data-to-fine-tune).',
      },
      {
        type: 'callout',
        title: 'Rule of thumb',
        text: 'If you cannot write 50 examples of the perfect output by hand, you are not ready to fine-tune. Write the examples first. They become your evaluation set either way.',
      },
      { type: 'h2', text: 'Can you combine fine-tuning and RAG?' },
      {
        type: 'p',
        text: "Yes, and most mature systems do. The common pattern is a fine-tuned model that has learned your format, tone and reasoning style, fed by a retrieval layer that supplies current facts. Some teams go further and fine-tune on examples that include retrieved passages, so the model learns to quote its sources and to say 'not in the documents' instead of guessing.",
      },
      {
        type: 'ul',
        items: [
          '**Prompting + RAG:** the fastest path to a grounded internal assistant. Good for most knowledge-base and support use cases.',
          '**Fine-tuning + prompting:** a tuned model with a short system prompt. Good for high-volume extraction, classification and generation.',
          '**Fine-tuning + RAG:** behavior from training, facts from retrieval. Good for regulated, high-stakes answers that must be both correct and consistent.',
          '**All three inside an agent:** a tuned model that calls tools, retrieves documents and follows prompted guardrails.',
        ],
      },
      { type: 'h2', text: 'How do you decide with evidence instead of opinions?' },
      {
        type: 'p',
        text: 'Build a small evaluation set before choosing. Collect 50 to 200 real inputs with the outputs you would accept, then score each approach against them. [LLM evals](/glossary/llm-evals) are repeatable tests that score model outputs against defined criteria, and they turn an architecture debate into a spreadsheet.',
      },
      {
        type: 'p',
        text: 'Run the cheapest option first. If prompting scores 95% on your evaluation set, you are done. If it scores 70% and the misses are factual, add retrieval. If the misses are format and tone, fine-tune. Re-run the same evaluation after every change so you can see whether you actually improved.',
      },
      { type: 'h2', text: 'How {{brand}} can help' },
      {
        type: 'p',
        text: '{{brand}} builds all three, so we have no reason to push one. Tell us the task and we return a plan, a price and an honest verdict within 24 hours, including when prompting alone will do. A focused pilot usually ships in two to six weeks. Start with the 2-minute [AI audit](/audit), price a training run in the [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator), or see how [custom model fine-tuning](/services/custom-model-fine-tuning) works.',
      },
    ],
    faqs: [
      {
        q: 'Is RAG cheaper than fine-tuning?',
        a: 'RAG is usually cheaper to start than fine-tuning, because a prototype needs no training and embedding documents costs cents per million tokens. Over time, RAG can cost more per call, because every request carries retrieved passages and pays for a longer prompt. Fine-tuning has higher upfront data and evaluation costs, but a tuned small model with a short prompt is often cheaper per call at high volume.',
      },
      {
        q: 'Can fine-tuning teach a model new facts?',
        a: 'Fine-tuning can teach a model some new facts, but it is an unreliable and expensive way to do it. Models tend to absorb the style of training documents faster than the details, and they may still state outdated or invented facts with confidence. Every fact change also requires a new training run. For facts that change often or must be cited, retrieval-augmented generation (RAG) is the better tool.',
      },
      {
        q: 'Does fine-tuning reduce hallucinations?',
        a: 'Fine-tuning reduces some hallucinations, especially format errors and made-up fields in structured outputs, and it can teach a model to say it does not know. Fine-tuning does not give a model access to facts it never saw, so factual hallucinations about your business are better addressed with RAG plus evaluation. The strongest setups combine a fine-tuned model, retrieval, and a test set that measures hallucination rates.',
      },
      {
        q: 'How long does it take to fine-tune a model for a business task?',
        a: 'Fine-tuning a model for a focused business task typically takes two to six weeks end to end. The training run itself often takes minutes to a few hours on a single GPU when using LoRA. Most of the calendar goes to collecting and cleaning examples, writing labeling guidelines, building an evaluation set, comparing runs and integrating the fine-tuned model into production systems.',
      },
      {
        q: 'Should I use RAG or a long context window?',
        a: 'A long context window lets you paste whole documents into a prompt, which works for a handful of documents at low volume. RAG is better when the knowledge base is large, when answers need citations, or when cost and latency matter, because RAG sends only the most relevant passages. Many teams prototype with long context, then move to RAG once document count or traffic grows.',
      },
      {
        q: 'Do I need a data scientist to choose between prompting, RAG and fine-tuning?',
        a: 'Choosing between prompting, RAG and fine-tuning does not require a data scientist, but it does require an evaluation set. Collect 50 to 200 real examples with acceptable answers, test the cheapest approach first, and move up only when the scores tell you to. A product owner who knows what a good answer looks like is often the most important person in that decision.',
      },
    ],
    related: [
      '/guides/llm-fine-tuning-cost',
      '/guides/how-much-data-to-fine-tune',
      '/services/custom-model-fine-tuning',
      '/glossary/rag',
      '/glossary/prompt-engineering',
    ],
    keywords: [
      'fine-tuning vs rag',
      'rag vs fine-tuning',
      'prompt engineering vs fine-tuning',
      'when to fine-tune an llm',
      'fine-tuning vs prompt engineering',
      'rag or fine-tuning for business',
      'should i fine-tune or use rag',
      'combine rag and fine-tuning',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ */
  /* 2. LLM fine-tuning cost                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: 'llm-fine-tuning-cost',
    title: 'How much does it cost to fine-tune an LLM in 2026?',
    seoTitle: 'LLM Fine-Tuning Cost in 2026: Full Breakdown',
    description:
      'What it really costs to fine-tune an LLM in 2026: GPU hours by model size and method, managed API fees, hosting, and why data work outweighs compute.',
    eyebrow: 'Guide · Costs',
    answer:
      'Fine-tuning an open 7-8B model with LoRA costs a few dollars of GPU compute per run, and a 70B model with QLoRA costs roughly $15-35 per run on 5,000 examples. Compute is rarely the big number. Data preparation, evaluation and engineering make up most of a first project budget. Full fine-tunes of 70B+ models are where compute reaches thousands of dollars.',
    facts: [
      'Training compute for full fine-tuning is roughly 6 × parameters × training tokens FLOPs; for LoRA it is roughly 4 × parameters × tokens, because frozen weights need no weight gradients.',
      'An 8B model fine-tuned with LoRA on 5,000 examples of 800 tokens for 3 epochs (12 million training tokens) needs about 0.4 H100-hours of raw compute.',
      'QLoRA (Dettmers et al., 2023) fine-tuned a 65B model on a single 48GB GPU by quantizing the frozen weights to 4 bits.',
      'Full fine-tuning needs about 16-20 bytes of GPU memory per parameter, so a 70B full fine-tune requires a multi-node GPU cluster.',
      'Hosting a fine-tuned model on one dedicated H100 at $2-4 per hour costs roughly $1,500-2,900 per month.',
      'Managed fine-tuning APIs charge per training token, roughly $1 to $25 or more per million training tokens depending on the base model, and these prices change often.',
    ],
    body: [
      {
        type: 'p',
        text: 'Most fine-tuning quotes hide the math. Here it is. Training compute follows a simple formula, the GPU-hours are smaller than most people expect, and the real money sits in places the GPU bill never shows.',
      },
      {
        type: 'p',
        text: 'Below: the formula, a cost table by model size and method, managed API pricing, hosting after training, and the full project breakdown. Run your own numbers in the [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator), which uses the same model.',
      },
      { type: 'h2', text: 'Quick verdict: what does fine-tuning cost?' },
      {
        type: 'ul',
        items: [
          '**LoRA on a 7-8B open model:** a few dollars of compute per run, and tens of dollars across a full set of experiments.',
          '**QLoRA on a 70B open model:** roughly $15-35 per run on a typical 5,000-example dataset, on a single GPU.',
          '**Full fine-tune of a 70B+ model, or continued pre-training:** hundreds to many thousands of dollars per run, plus a multi-node cluster.',
          '**Managed APIs (OpenAI, Google Vertex AI, Amazon Bedrock):** roughly $1 to $25 or more per million training tokens, depending on the model.',
          '**The whole project:** dominated by data preparation, evaluation and engineering time, not GPUs.',
        ],
      },
      { type: 'h2', text: 'How do you estimate GPU compute for fine-tuning?' },
      {
        type: 'p',
        text: "Training cost starts with FLOPs, the number of floating-point operations the GPUs must perform. For full fine-tuning, a standard estimate is 6 × parameters × training tokens. For [LoRA](/glossary/lora), it is about 4 × parameters × tokens, because the frozen base weights need no weight gradients. [QLoRA](/glossary/qlora) adds roughly 40% on top of LoRA for unpacking its 4-bit weights on the fly.",
      },
      {
        type: 'p',
        text: "Training tokens are easy to count: examples × average [tokens](/glossary/tokens) per example × epochs. An epoch is one full pass over the dataset. Divide total FLOPs by the GPU's effective throughput, then multiply by about 1.5 for real-world overhead such as data loading, checkpointing and evaluation passes.",
      },
      {
        type: 'table',
        caption: 'Assumed effective throughput and on-demand prices (late 2026; these vary by provider and change often)',
        head: ['GPU', 'Effective training throughput', 'Typical on-demand rate'],
        rows: [
          ['NVIDIA H100 80GB', '~250 TFLOPS', '$2-4 per hour'],
          ['NVIDIA A100 80GB', '~100 TFLOPS', '$1.20-2 per hour'],
          ['NVIDIA L40S 48GB', '~90 TFLOPS', '$0.80-1.20 per hour'],
        ],
      },
      { type: 'h2', text: 'What does a worked example look like?' },
      {
        type: 'p',
        text: 'Take an 8B model, LoRA, and 5,000 examples averaging 800 tokens, trained for 3 epochs. That is 12 million training tokens. Compute is 4 × 8 billion × 12 million, or about 3.8 × 10^17 FLOPs.',
      },
      {
        type: 'p',
        text: 'At 250 TFLOPS effective, an H100 finishes that in about 0.4 hours. The 1.5x overhead brings it to roughly 0.6 hours, and in practice you pay for 1-2 GPU-hours once you add setup, model download and evaluation. That is a few dollars per run. Run ten experiments and the compute bill is still well under $100.',
      },
      {
        type: 'p',
        text: 'Now scale to a 70B model with QLoRA on the same data. The formula gives about 4.7 × 10^18 FLOPs, or roughly 8 H100-hours with overhead. That is about $15-35 per run, and a 70B QLoRA job fits on one 80GB GPU, so you need no cluster.',
      },
      { type: 'h2', text: 'How much does fine-tuning cost by model size and method?' },
      {
        type: 'p',
        text: 'The table below uses the same 12 million training tokens (5,000 examples × 800 tokens × 3 epochs), 250 TFLOPS effective per H100, a 1.5x overhead factor and $2-4 per GPU-hour. Treat each cell as the floor for one clean run, not a quote.',
      },
      {
        type: 'table',
        caption: 'Estimated compute per training run: 12M training tokens on H100s, including 1.5x overhead',
        head: ['Model size', 'LoRA', 'QLoRA', 'Full fine-tune', 'GPUs needed for full fine-tune'],
        rows: [
          ['7-8B', '~0.6 GPU-h · $1-3', '~0.9 GPU-h · $2-4', '~1 GPU-h · $2-4', '2-4 × 80GB'],
          ['13-14B', '~1.1 GPU-h · $2-5', '~1.6 GPU-h · $3-7', '~1.7 GPU-h · $3-7', '4 × 80GB'],
          ['32-34B', '~2.6 GPU-h · $5-10', '~3.6 GPU-h · $7-15', '~3.8 GPU-h · $8-16', '8-16 × 80GB'],
          ['70B', '~5.6 GPU-h · $11-23', '~8 GPU-h · $15-35', '~8.4 GPU-h · $17-34 in theory', '16-24 × 80GB, multi-node'],
        ],
      },
      {
        type: 'p',
        text: 'Two things jump out. First, LoRA and QLoRA are cheap at every size. Second, the full fine-tune column looks cheap on paper and is not in practice. The formula assumes perfect scaling, but a 70B full fine-tune needs roughly 1.1-1.4 TB of GPU memory, clusters are usually rented by the node, and multi-node jobs run well below peak efficiency.',
      },
      {
        type: 'p',
        text: 'Full fine-tunes also tend to use far more data. At 500 million training tokens, the same 70B formula gives about 350 H100-hours, or $700-1,400 per run before any inefficiency. Continued pre-training of a 70B model on 10 billion tokens lands around 7,000 H100-hours, or $14,000-28,000 per run. That is where compute becomes real money.',
      },
      {
        type: 'callout',
        title: 'Rule of thumb',
        text: 'For LoRA or QLoRA on an open model, budget tens to low hundreds of dollars of compute across all your experiments. If someone quotes thousands in GPU time for a 5,000-example LoRA fine-tune, ask what the GPUs are doing.',
      },
      { type: 'h2', text: 'What do managed fine-tuning APIs cost?' },
      {
        type: 'p',
        text: "Managed fine-tuning services, such as OpenAI's fine-tuning API, Google Vertex AI and Amazon Bedrock, charge per training token instead of per GPU-hour. As of late 2026, published rates range from roughly $1 to $25 or more per million training tokens, depending on the base model tier. These prices change often, so check the provider's pricing page before you budget.",
      },
      {
        type: 'p',
        text: "Billed training tokens usually equal dataset tokens × epochs, so the 12M-token job above would cost roughly $12-300 or more per run. You skip GPU setup entirely. In exchange, you are tied to that provider's models, and inference on a tuned model is often priced above the base model or requires reserved capacity.",
      },
      { type: 'h2', text: 'What does it cost to host a fine-tuned model?' },
      {
        type: 'p',
        text: 'Training is a one-off. [Inference](/glossary/inference), meaning running the trained model to answer requests, is the bill that keeps coming. There are two main ways to pay for it.',
      },
      {
        type: 'ul',
        items: [
          "**Serverless, per token:** several inference providers host LoRA adapters on shared base models and charge per million tokens, often at or near the base model's rate. Small open models commonly cost well under $1 per million tokens. Best for spiky or modest traffic.",
          '**Dedicated GPU:** you rent a GPU around the clock. One H100 at $2-4 per hour is roughly $1,500-2,900 per month, and one L40S at $0.80-1.20 is roughly $600-900. Best for steady high volume, strict latency targets or data that must stay on your infrastructure.',
        ],
      },
      {
        type: 'p',
        text: 'One useful trick: LoRA adapters are small files, often a few megabytes to a few hundred megabytes, so one base model on one GPU can serve many adapters. That keeps hosting costs flat as you add use cases.',
      },
      { type: 'h2', text: 'What does a full fine-tuning project cost, line by line?' },
      {
        type: 'p',
        text: 'On most first projects, the GPU bill is the smallest line. The table shows how budget typically splits for a LoRA fine-tune of an open model on one business task. These are relative shares based on common industry patterns, not a price list.',
      },
      {
        type: 'table',
        caption: 'Typical share of a first fine-tuning project budget (LoRA, open model, one task)',
        head: ['Line item', 'Typical share', 'What it covers'],
        rows: [
          ['Data preparation', '30-45%', 'Sourcing, cleaning, PII scrubbing, labeling, deduplication, synthetic augmentation'],
          ['Engineering', '25-40%', 'Training pipeline, experiment runs, integration, deployment, monitoring'],
          ['Evaluation', '10-20%', 'Building the test set, automated and human scoring, regression checks'],
          ['Training compute', '1-5%', 'GPU-hours across all experiment runs'],
          ['Hosting (first months)', '5-15%', 'Serverless tokens or a dedicated GPU, plus logging'],
        ],
      },
      {
        type: 'p',
        text: 'Data preparation leads because a model is only as good as its examples. Our guide to [preparing a fine-tuning dataset](/guides/how-to-prepare-fine-tuning-dataset) shows where those hours go, and [how much data you need](/guides/how-much-data-to-fine-tune) helps you size the job before you start.',
      },
      { type: 'h2', text: 'How can you cut fine-tuning costs?' },
      {
        type: 'ol',
        items: [
          '**Start with the smallest model that passes your evaluation.** A tuned 7-8B model is cheaper to train, host and run than a 70B one.',
          '**Use LoRA or QLoRA before full fine-tuning.** On a narrow task, full fine-tuning rarely wins by enough to justify the cluster.',
          '**Curate, do not hoard.** 2,000 clean examples often beat 20,000 noisy ones, and they train in a tenth of the time.',
          '**Build the evaluation set first,** so every run is judged the same way and you stop experimenting when scores plateau.',
          '**Use spot or interruptible GPUs for experiments,** with checkpointing, and on-demand capacity only for final runs.',
          '**Serve adapters on a shared base model** instead of hosting a separate model per use case.',
        ],
      },
      { type: 'h2', text: 'How {{brand}} can help' },
      {
        type: 'p',
        text: '{{brand}} scopes fine-tuning projects around the real cost drivers: data, evaluation and deployment. Send us the task and we return a plan, a price and an honest verdict within 24 hours. We can work inside your own cloud and deploy on infrastructure you control. Model your compute first in the [cost calculator](/tools/fine-tuning-cost-calculator), then take the 2-minute [AI audit](/audit) or [get in touch](/#contact).',
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to fine-tune Llama or another open model?',
        a: 'Fine-tuning an open model such as Llama, Qwen or Mistral with LoRA typically costs a few dollars of GPU compute per run at 7-8B parameters, and roughly $15-35 per run at 70B with QLoRA. Those figures assume about 12 million training tokens on H100 GPUs at $2-4 per hour. The full project cost is driven mainly by data preparation, evaluation and engineering time, not compute.',
      },
      {
        q: 'Is it cheaper to fine-tune with OpenAI or on my own GPUs?',
        a: 'Fine-tuning an open model on rented GPUs is usually cheaper per run, often a few dollars for a LoRA job on an 8B model. Managed APIs from OpenAI, Google Vertex AI or Amazon Bedrock charge roughly $1 to $25 or more per million training tokens, but they remove setup work. The better choice depends on quality needs, data residency rules and long-term inference costs.',
      },
      {
        q: 'Why is full fine-tuning so much more expensive than LoRA?',
        a: 'Full fine-tuning is more expensive than LoRA mainly because of memory. Full fine-tuning updates every weight and stores gradients and optimizer states, which takes about 16-20 bytes of GPU memory per parameter, so a 70B model needs a multi-node cluster. LoRA freezes the base model and trains small adapter matrices, needing about 2 bytes per parameter and roughly a third less compute.',
      },
      {
        q: 'How much does it cost to host a fine-tuned LLM?',
        a: "Hosting a fine-tuned LLM is paid either per token or per GPU-hour. Serverless providers that host LoRA adapters often charge near the base model's per-token rate, commonly under $1 per million tokens for small open models. A dedicated H100 running around the clock costs roughly $1,500-2,900 per month at $2-4 per hour. Hosting prices vary by provider and change often.",
      },
      {
        q: 'How many training runs does a fine-tuning project need?',
        a: 'A fine-tuning project often needs somewhere between 5 and 30 training runs, covering hyperparameter tests, dataset revisions and final candidates. For LoRA on a 7-8B model, that is still only tens of dollars of GPU compute in total. The number of runs matters less than a fixed evaluation set, which keeps comparisons fair and tells you when to stop experimenting.',
      },
      {
        q: 'What is the biggest hidden cost in LLM fine-tuning?',
        a: 'The biggest hidden cost in LLM fine-tuning is data preparation: finding, cleaning, labeling, deduplicating and reviewing examples until they show exactly the behavior you want. Evaluation is the second, because proving a fine-tuned model is better requires a trusted test set and human review. Together with engineering, these typically outweigh GPU compute many times over on LoRA projects.',
      },
    ],
    related: [
      '/tools/fine-tuning-cost-calculator',
      '/guides/lora-qlora-explained',
      '/guides/how-much-data-to-fine-tune',
      '/services/custom-model-fine-tuning',
      '/guides/fine-tuning-vs-rag-vs-prompting',
    ],
    keywords: [
      'llm fine-tuning cost',
      'how much does it cost to fine-tune an llm',
      'fine-tuning cost 2026',
      'cost to fine-tune llama',
      'lora fine-tuning cost',
      'gpu cost for fine-tuning',
      'openai fine-tuning pricing',
      'fine-tuned model hosting cost',
      'fine-tune 70b model cost',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ */
  /* 3. How much data to fine-tune                                       */
  /* ------------------------------------------------------------------ */
  {
    slug: 'how-much-data-to-fine-tune',
    title: 'How much data do you need to fine-tune a model?',
    seoTitle: 'How Much Data to Fine-Tune an LLM? Ranges by Task',
    description:
      'How much data you need to fine-tune an LLM: 100-500 examples for style, 500-5,000 for extraction, 5,000-50,000+ for reasoning, and how to know when to stop.',
    eyebrow: 'Guide · Data',
    answer:
      'Most business fine-tunes need far less data than people expect. Teaching a style or output format takes about 100-500 high-quality examples. Classification and extraction usually need 500-5,000. Domain reasoning and specialist work can need 5,000-50,000 or more. Quality beats quantity: the LIMA study built a strong assistant from a 65B model with roughly 1,000 carefully curated examples.',
    facts: [
      'Style and output-format fine-tunes typically need 100-500 high-quality examples.',
      'Classification and extraction fine-tunes typically need 500-5,000 labeled examples, with at least 30-50 examples per class.',
      'Domain reasoning fine-tunes typically need 5,000-50,000 or more examples covering the full range of production cases.',
      `"LIMA: Less Is More for Alignment" (Zhou et al., 2023) showed that about 1,000 carefully curated examples were enough to turn a 65B base model into a strong instruction-following assistant.`,
      'The most reliable way to know you have enough data is a learning curve: train on 25%, 50% and 100% of the data and check whether evaluation scores are still rising.',
      'Synthetic data generated by a stronger model can fill gaps, but it should be filtered and spot-checked by humans, and the evaluation set should stay real.',
    ],
    body: [
      {
        type: 'p',
        text: 'Everyone asks how much data they need. The honest answer: less than you fear, and better than you have. A few hundred excellent examples will beat ten thousand sloppy ones on most business tasks.',
      },
      {
        type: 'p',
        text: 'This guide gives ranges by task type, explains why quality wins, covers when synthetic data helps, and shows how to tell from your own numbers when you have enough.',
      },
      { type: 'h2', text: 'Quick verdict: how many examples do you need?' },
      {
        type: 'table',
        caption: 'Typical example counts for supervised fine-tuning, by task type',
        head: ['Task type', 'Typical examples', 'What the model learns', 'Business examples'],
        rows: [
          ['Style, tone or output format', '100-500', 'How to say things, not what to know', 'Brand voice, JSON schemas, report templates'],
          ['Classification and extraction', '500-5,000', 'Where your labels and fields begin and end', 'Ticket routing, invoice fields, clause tagging'],
          ['Domain reasoning and specialist tasks', '5,000-50,000+', 'Multi-step patterns in a specialized field', 'Claims assessment, medical coding, financial analysis'],
          ['Continued pre-training on domain text', 'Millions to billions of tokens', 'Vocabulary and broad domain knowledge', 'Legal corpora, scientific literature'],
        ],
      },
      {
        type: 'p',
        text: '[Supervised fine-tuning](/glossary/supervised-fine-tuning) is training on pairs of inputs and ideal outputs, and these ranges assume it is applied with [LoRA](/glossary/lora) to a capable modern open model. A stronger starting model needs fewer examples, because it already knows most of what you are teaching.',
      },
      { type: 'h2', text: 'Why does a style fine-tune need so few examples?' },
      {
        type: 'p',
        text: 'A style fine-tune teaches behavior the model can already perform. It can already write, summarize and produce JSON. You are only showing it which of its many possible voices and formats you want, every single time.',
      },
      {
        type: 'p',
        text: `The clearest evidence is "LIMA: Less Is More for Alignment" (Zhou et al., 2023). The authors fine-tuned a 65B model on roughly 1,000 carefully curated prompts and responses, with no reinforcement learning, and got a strong general assistant. Their argument: a model learns most of its knowledge in pre-training, and a small, high-quality set mainly teaches it the shape of a good answer.`,
      },
      {
        type: 'p',
        text: 'For a single business format, 100-500 examples is usually plenty. Below about 50, putting a few examples straight into the prompt often works just as well as training.',
      },
      { type: 'h2', text: 'How much data do classification and extraction need?' },
      {
        type: 'p',
        text: 'Classification and extraction need more examples because the model must learn where your boundaries sit. Is this ticket about billing or account access? Is this clause an indemnity or a limitation of liability? Those lines are specific to your business.',
      },
      {
        type: 'p',
        text: 'A practical floor is 30-50 examples per class, and more for classes that look alike. A ten-label ticket router often lands between 1,000 and 3,000 examples. Rare but important classes need deliberate oversampling, or the model will learn to ignore them.',
      },
      {
        type: 'callout',
        title: 'Rule of thumb',
        text: 'Count examples per class, not in total. A 5,000-example dataset with 12 examples of your most expensive error case is a 12-example dataset for the thing you care about most.',
      },
      { type: 'h2', text: 'When do you need 5,000 to 50,000+ examples?' },
      {
        type: 'p',
        text: 'Large datasets earn their keep when the task needs multi-step reasoning in a specialized field, long and varied inputs, or many sub-tasks inside one model. Think insurance claims assessment, medical coding or analyst-grade financial summaries.',
      },
      {
        type: 'p',
        text: 'At this scale, coverage matters more than raw count. You want examples across every document type, edge case and difficulty level you expect in production. Teams usually get there with a mix of historical records, expert-written examples and filtered [synthetic data](/glossary/synthetic-data).',
      },
      {
        type: 'p',
        text: 'If the goal is new knowledge rather than new behavior, such as a large body of facts the model has never seen, consider retrieval before training. Our guide to [fine-tuning vs RAG vs prompting](/guides/fine-tuning-vs-rag-vs-prompting) explains why.',
      },
      { type: 'h2', text: 'What counts as one training example?' },
      {
        type: 'p',
        text: "One example is one complete input paired with the ideal output. For a chat model, that is one conversation: an optional system prompt, the user's message and the assistant's reply, or several turns of each. Length varies widely, from about 100 tokens for a classification label to several thousand for a long document summary.",
      },
      {
        type: 'p',
        text: 'Length matters for cost, not for counting. A dataset of 2,000 examples averaging 2,000 tokens costs about five times more to train than one averaging 400 tokens, even though both hold 2,000 examples.',
      },
      { type: 'h2', text: 'Does model size change how much data you need?' },
      {
        type: 'p',
        text: 'Yes. Larger, stronger models usually need fewer examples to learn the same behavior, because they start closer to the target. A large model may reach your quality bar with a few hundred examples on a task where a 1-3B model needs several thousand, and some tasks a small model never masters at any volume.',
      },
      {
        type: 'p',
        text: 'That creates a common trade-off. Small models are cheaper and faster to run, so teams often have a large model produce high-quality outputs, review them, and train a small model on the result. That technique is called [distillation](/glossary/distillation), and it turns data effort into lower serving costs.',
      },
      { type: 'h2', text: 'What about preference data for DPO or RLHF?' },
      {
        type: 'p',
        text: 'Supervised fine-tuning shows the model good answers. Preference training shows it pairs of answers and which one is better. InstructGPT (Ouyang et al., 2022) used roughly 13,000 demonstration prompts for supervised training plus tens of thousands of human-ranked comparisons, and labelers preferred its 1.3B model over the 175B GPT-3.',
      },
      {
        type: 'p',
        text: 'DPO, or Direct Preference Optimization (Rafailov et al., 2023), trains directly on chosen-versus-rejected pairs without a separate reward model. Business teams often start with a few hundred to a few thousand pairs, focused on the judgment calls where the supervised model still slips. Do supervised fine-tuning first, and add preference data only when evaluations show a need.',
      },
      { type: 'h2', text: 'Why does data quality matter more than quantity?' },
      {
        type: 'p',
        text: 'A model copies what it sees, including mistakes. If 10% of your examples have wrong labels, inconsistent formats or lazy answers, the model learns that 10% too. Duplicates make it worse by over-weighting whatever is repeated.',
      },
      {
        type: 'p',
        text: 'Quality has four parts, and each one is checkable:',
      },
      {
        type: 'ul',
        items: [
          '**Correct:** every output is one you would send to a customer without edits.',
          '**Consistent:** written labeling guidelines settle every judgment call the same way.',
          '**Representative:** inputs match real traffic in length, messiness and mix.',
          '**Diverse:** rare cases and hard negatives, the near-misses that look right but are wrong, are deliberately included.',
        ],
      },
      {
        type: 'p',
        text: 'Cutting a noisy dataset in half and fixing what remains often improves scores. Our step-by-step guide to [preparing a fine-tuning dataset](/guides/how-to-prepare-fine-tuning-dataset) covers cleaning, deduplication and labeling in detail.',
      },
      { type: 'h2', text: 'Can synthetic data replace real examples?' },
      {
        type: 'p',
        text: 'Synthetic data is training data generated by a model or program rather than collected from real activity. A strong model can draft thousands of examples in hours, which makes it the fastest way to fill gaps in rare classes, edge cases and new formats.',
      },
      {
        type: 'p',
        text: 'Synthetic data works best as a supplement. Seed generation with real examples, filter the outputs with automated checks, and have a domain expert review a sample. Watch for sameness: generated examples tend to share phrasing, which can teach a narrower range than real users produce.',
      },
      {
        type: 'p',
        text: "Two hard rules. Keep your evaluation set real, so you measure performance on actual traffic. And check the terms of service of whichever model generates the data, since some providers restrict using their outputs to train competing models.",
      },
      { type: 'h2', text: 'How do you know when you have enough data?' },
      {
        type: 'p',
        text: 'Stop guessing and draw a learning curve. Hold out a fixed evaluation set first, then train on 25%, 50% and 100% of your training data and score each run on that same set. [LLM evals](/glossary/llm-evals) are repeatable tests that score outputs against defined criteria, and they are the only honest way to answer this question.',
      },
      {
        type: 'ul',
        items: [
          '**Scores still climbing steeply from 50% to 100%:** more data will help. Collect more, focused on the error types you see.',
          '**Scores flat from 50% to 100%:** you have enough volume. Improve quality, coverage or the base model instead.',
          '**Training loss falling while validation loss rises:** the model is memorizing examples instead of learning the pattern, which is called overfitting. Reduce epochs or add variety.',
        ],
      },
      {
        type: 'p',
        text: 'Read the failures, not just the score. If every miss is the same edge case, 50 targeted examples will do more than 5,000 random ones. Dataset size also drives training cost, which you can estimate in the [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator).',
      },
      { type: 'h2', text: 'How {{brand}} can help' },
      {
        type: 'p',
        text: 'Too few good examples is the most common reason fine-tuning projects stall, and the most fixable. {{brand}} builds [niche fine-tuning datasets](/services/fine-tuning-datasets): collected, cleaned, labeled and synthesized for your domain, with the evaluation set built first. We can sign NDAs and DPAs and work inside your own cloud. Take the 2-minute [AI audit](/audit) and get a plan, a price and an honest verdict within 24 hours.',
      },
    ],
    faqs: [
      {
        q: 'What is the minimum dataset size for fine-tuning an LLM?',
        a: 'The practical minimum dataset size for fine-tuning an LLM is around 50-100 high-quality examples for a narrow style or format task, and some managed APIs accept as few as 10. Below roughly 50 examples, putting a few examples directly in the prompt often performs just as well. For classification, extraction or reasoning tasks, plan on hundreds to thousands of examples.',
      },
      {
        q: 'Is 1,000 examples enough to fine-tune a model?',
        a: 'One thousand examples is enough to fine-tune a model for many business tasks, including style, format and most narrow extraction jobs, provided the examples are correct, consistent and representative. The LIMA study (Zhou et al., 2023) built a strong assistant from about 1,000 curated examples. For many-class classification or domain reasoning, 1,000 examples is a solid start, and a learning curve will show whether more helps.',
      },
      {
        q: 'Can I fine-tune with synthetic data only?',
        a: "Fine-tuning with synthetic data only is possible and can work for format and style tasks, but it carries risks. Fully synthetic datasets tend to be repetitive, can inherit the generating model's errors, and may not match how real users write. The safer approach is to seed synthetic generation with real examples, filter and review the output, and always evaluate on real, held-out data.",
      },
      {
        q: 'Does more training data always improve a fine-tuned model?',
        a: 'More training data does not always improve a fine-tuned model. Once evaluation scores plateau, extra examples of the same kind add cost without gains, and noisy or duplicated examples can make results worse. Improvements after the plateau usually come from better quality, wider coverage of edge cases, a stronger base model or a clearer task definition rather than more volume.',
      },
      {
        q: 'How many tokens is a typical fine-tuning dataset?',
        a: 'A typical business fine-tuning dataset ranges from about 100,000 to 10 million tokens. For example, 5,000 examples averaging 800 tokens is 4 million tokens, or 12 million training tokens across three epochs. Token count matters because training compute and managed API fees scale with it, while example count and quality matter more for how well the fine-tuned model performs.',
      },
      {
        q: 'How do I fine-tune a model if I have very little data?',
        a: 'With very little data, start by writing 50 to 100 ideal examples by hand with a domain expert and use them as an evaluation set. Test prompting with a few of those examples first. If fine-tuning is still needed, expand the dataset with synthetic examples seeded from the real ones, filter them carefully, and add more data wherever the evaluation shows errors.',
      },
    ],
    related: [
      '/guides/how-to-prepare-fine-tuning-dataset',
      '/services/fine-tuning-datasets',
      '/glossary/synthetic-data',
      '/guides/llm-fine-tuning-cost',
      '/glossary/supervised-fine-tuning',
    ],
    keywords: [
      'how much data to fine-tune llm',
      'how many examples to fine-tune',
      'minimum dataset size for fine-tuning',
      'fine-tuning dataset size',
      'is 1000 examples enough to fine-tune',
      'synthetic data for fine-tuning',
      'lima less is more for alignment',
      'fine-tuning data requirements',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ */
  /* 4. LoRA and QLoRA explained                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: 'lora-qlora-explained',
    title: 'LoRA and QLoRA explained in plain English',
    seoTitle: 'LoRA and QLoRA Explained: Memory, Cost, Use Cases',
    description:
      'LoRA and QLoRA explained in plain English: how adapters cut GPU memory, what rank and alpha mean, a memory table by model size, and when to fully fine-tune.',
    eyebrow: 'Guide · Techniques',
    answer:
      'LoRA (Low-Rank Adaptation) fine-tunes a model by freezing its original weights and training small add-on matrices, often well under 1% of the parameters. QLoRA does the same on a model compressed to 4 bits. The result: a 70B model that needs over 1 TB of GPU memory to fully fine-tune can be QLoRA-tuned on a single 80GB GPU.',
    facts: [
      'LoRA (Low-Rank Adaptation) was introduced by Hu et al. in 2021 and trains small low-rank matrices beside frozen model weights instead of updating every weight.',
      'QLoRA (Dettmers et al., 2023) combines 4-bit quantization of the frozen model with LoRA adapters and fine-tuned a 65B model on a single 48GB GPU.',
      'Full fine-tuning needs about 16-20 bytes of GPU memory per parameter, LoRA about 2 bytes per parameter plus activations, and QLoRA about 0.5-0.7 bytes per parameter.',
      "LoRA typically trains well under 1% of a model's parameters, so adapter files are often a few megabytes to a few hundred megabytes.",
      'LoRA needs roughly 4 × parameters × tokens FLOPs to train versus about 6 × for full fine-tuning, because frozen weights need no weight gradients.',
    ],
    body: [
      {
        type: 'p',
        text: 'LoRA is the reason fine-tuning stopped being a big-lab sport. Before it, adapting a large model meant renting a cluster. Now a 70B model can be tuned on one GPU in a working day, and an 8B model in under an hour.',
      },
      {
        type: 'p',
        text: 'Here is what LoRA and QLoRA actually do, why they are so cheap, what the knobs mean, and when you should skip them and run a full fine-tune instead.',
      },
      { type: 'h2', text: 'What is LoRA?' },
      {
        type: 'p',
        text: "[LoRA](/glossary/lora), short for Low-Rank Adaptation, is a fine-tuning method that freezes a model's original weights and trains small add-on matrices that adjust its behavior. Hu et al. introduced it in 2021. It belongs to a family called [parameter-efficient fine-tuning (PEFT)](/glossary/peft): methods that train only a small fraction of a model's parameters.",
      },
      {
        type: 'p',
        text: 'Picture a mixing desk with billions of knobs. Full fine-tuning nudges every knob. LoRA leaves the desk alone and plugs in a small effects unit that shapes the sound. The original model stays intact, and only the effects unit is trained.',
      },
      {
        type: 'p',
        text: 'Technically, LoRA learns the change to each weight matrix as the product of two thin matrices. Because the change is squeezed through a narrow middle, the number of trainable parameters drops from billions to a few million or tens of millions.',
      },
      { type: 'h2', text: 'Why is LoRA so much cheaper than full fine-tuning?' },
      {
        type: 'p',
        text: 'The savings come mostly from memory. Full fine-tuning must store, for every parameter, the weight itself, its gradient and two optimizer states for the Adam optimizer. That adds up to about 16-20 bytes per parameter. LoRA keeps the frozen weights in 16-bit precision, about 2 bytes per parameter, and stores gradients and optimizer states only for the tiny adapter.',
      },
      {
        type: 'p',
        text: 'Compute drops too, by about a third. Training compute for full fine-tuning is roughly 6 × parameters × tokens; for LoRA it is roughly 4 ×, because the frozen weights need no weight gradients. On a typical 5,000-example dataset, that makes an 8B fine-tune a run that costs a few dollars. Our [fine-tuning cost guide](/guides/llm-fine-tuning-cost) shows the full math.',
      },
      { type: 'h2', text: 'What is QLoRA?' },
      {
        type: 'p',
        text: '[QLoRA](/glossary/qlora) is LoRA applied to a model whose frozen weights have been compressed to 4 bits. Dettmers et al. (2023) showed it could fine-tune a 65B model on a single 48GB GPU while preserving the task performance of 16-bit fine-tuning on their benchmarks.',
      },
      {
        type: 'p',
        text: 'The compression step is [quantization](/glossary/quantization), which stores each weight with fewer bits. QLoRA uses a 4-bit format called NF4 plus a few memory-saving tricks, bringing memory down to roughly 0.5-0.7 bytes per parameter. The price is speed: weights are unpacked on the fly during training, which adds roughly 40% to compute compared with plain LoRA.',
      },
      { type: 'h2', text: 'How much GPU memory do LoRA and QLoRA need?' },
      {
        type: 'p',
        text: 'The table applies the rules of thumb above to model weights and training state. Activations, which grow with sequence length and batch size, come on top, so leave headroom.',
      },
      {
        type: 'table',
        caption: 'Approximate GPU memory for training, before activations',
        head: ['Model size', 'Full fine-tune (16-20 bytes/param)', 'LoRA (~2 bytes/param)', 'QLoRA (~0.5-0.7 bytes/param)'],
        rows: [
          ['7-8B', '~130-160 GB: 2-4 × 80GB GPUs', '~16 GB: one 24-48GB GPU', '~4-6 GB: one 16-24GB GPU'],
          ['13-14B', '~220-280 GB: 4 × 80GB GPUs', '~28 GB: one 48GB GPU', '~7-10 GB: one 24GB GPU'],
          ['32-34B', '~510-680 GB: 8+ × 80GB GPUs', '~64-68 GB: one 80GB GPU, tight', '~16-24 GB: one 24-48GB GPU'],
          ['70B', '~1.1-1.4 TB: multi-node cluster', '~140 GB: 2-4 × 80GB GPUs', '~35-49 GB: one 80GB GPU'],
        ],
      },
      {
        type: 'p',
        text: 'The headline: QLoRA puts a 70B fine-tune on one 80GB GPU, and LoRA puts an 8B fine-tune on a single workstation-class card. Full fine-tuning the same 70B model takes a cluster of 16 or more GPUs.',
      },
      { type: 'h2', text: 'How do LoRA, QLoRA and full fine-tuning compare?' },
      {
        type: 'table',
        caption: 'LoRA vs QLoRA vs full fine-tuning at a glance',
        head: ['Factor', 'Full fine-tuning', 'LoRA', 'QLoRA'],
        rows: [
          ['What is trained', 'Every weight', 'Small adapter matrices; base frozen in 16-bit', 'Small adapter matrices; base frozen in 4-bit'],
          ['GPU memory per parameter', '~16-20 bytes', '~2 bytes plus activations', '~0.5-0.7 bytes plus activations'],
          ['Training compute', '~6 × params × tokens', '~4 × params × tokens', '~5.6 × params × tokens (LoRA plus ~40%)'],
          ['What you get', 'A full new copy of the model', 'An adapter file, megabytes to hundreds of megabytes', 'An adapter file, megabytes to hundreds of megabytes'],
          ['Risk of forgetting general skills', 'Highest', 'Lower', 'Lower'],
          ['Best for', 'Large new knowledge, continued pre-training, small models', 'Most business tasks when memory allows', 'Large models on limited GPUs'],
        ],
      },
      { type: 'h2', text: 'What do LoRA rank and alpha mean?' },
      {
        type: 'p',
        text: 'Rank, written r, is the size of the adapter: how wide the narrow middle between the two thin matrices is. Rank 8 squeezes each adjustment through 8 dimensions. Rank 64 allows a richer adjustment, with eight times the adapter parameters.',
      },
      {
        type: 'p',
        text: "Alpha is a volume knob. It scales how strongly the adapter's output is added to the frozen model, and the effective scale is alpha divided by rank. A common starting point is alpha equal to the rank or twice the rank.",
      },
      {
        type: 'ul',
        items: [
          '**Low rank (4-16):** style, tone, format and most classification. A small adapter with less room to overfit, meaning to memorize training examples instead of learning the pattern.',
          '**Higher rank (32-128):** harder domain tasks or larger datasets, where the model has more to learn.',
          '**Target modules:** applying LoRA to all linear layers, not only the attention layers, often improves quality for a modest memory cost.',
        ],
      },
      {
        type: 'callout',
        title: 'Rule of thumb',
        text: 'Start at rank 16, alpha 32, LoRA on all linear layers, 2-3 epochs. Change one knob at a time and judge every change on the same evaluation set.',
      },
      { type: 'h2', text: 'Why are swappable adapters such a big deal?' },
      {
        type: 'p',
        text: 'A LoRA adapter is a separate file, often a few megabytes to a few hundred megabytes, that sits beside an unchanged base model. That has three practical benefits.',
      },
      {
        type: 'ol',
        items: [
          '**Many tasks, one model.** Serve a support adapter, a sales adapter and an extraction adapter from the same base model on the same GPU, picking the right one per request.',
          '**Cheap versioning.** Each retrain produces a small new file you can store, compare and roll back in seconds.',
          '**Flexible deployment.** Merge the adapter into the base weights for maximum speed, or keep it separate so one GPU can serve many adapters.',
        ],
      },
      { type: 'h2', text: 'Does LoRA slow down inference?' },
      {
        type: 'p',
        text: 'Not if you merge it. Hu et al. (2021) designed LoRA so the adapter can be folded back into the base weights after training, which means the tuned model runs exactly as fast as the original. Keeping adapters separate adds a small overhead at [inference](/glossary/inference), the stage where the model answers requests, in exchange for serving many adapters from one base model.',
      },
      {
        type: 'p',
        text: 'QLoRA is a training technique, not a serving requirement. After a QLoRA run you can merge the adapter into a 16-bit copy of the base model or serve it on a quantized model, depending on your speed, memory and quality targets.',
      },
      { type: 'h2', text: 'What tools do teams use to train LoRA adapters?' },
      {
        type: 'p',
        text: "The most common open-source stack is PyTorch with Hugging Face's PEFT and TRL libraries, which implement LoRA, QLoRA and preference training. Unsloth and Axolotl wrap these into faster, config-driven training runs. Whatever the tool, the inputs are the same: a base model, a dataset, a rank, an alpha, a learning rate and a number of epochs.",
      },
      { type: 'h2', text: 'When is full fine-tuning better than LoRA?' },
      {
        type: 'p',
        text: 'LoRA matches full fine-tuning on most narrow business tasks, but not all. Full fine-tuning tends to pull ahead when the model must absorb a large body of new domain knowledge, learn a new language or programming language deeply, or train on hundreds of millions of tokens or more.',
      },
      {
        type: 'p',
        text: 'It also makes sense for continued pre-training, where you keep training a model on raw domain text before teaching it tasks. And for small models under about 3B parameters, full fine-tuning is cheap enough that there is little reason to avoid it.',
      },
      {
        type: 'p',
        text: 'The trade-off is cost and risk. Full fine-tuning changes every weight, so it is more prone to [catastrophic forgetting](/glossary/catastrophic-forgetting), where a model loses general abilities it had before training. With LoRA, the frozen base acts as a safety net.',
      },
      { type: 'h2', text: 'How {{brand}} can help' },
      {
        type: 'p',
        text: '{{brand}} runs LoRA, QLoRA and full fine-tunes on open-weight models, and picks the method by evaluation results, not habit. We can train inside your own cloud and deploy on infrastructure you control. See how [custom model fine-tuning](/services/custom-model-fine-tuning) works, estimate GPU hours in the [cost calculator](/tools/fine-tuning-cost-calculator), or take the 2-minute [AI audit](/audit).',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between LoRA and QLoRA?',
        a: 'The difference between LoRA and QLoRA is how the frozen base model is stored. LoRA keeps the base model in 16-bit precision, about 2 bytes per parameter, and trains small adapter matrices. QLoRA compresses the frozen base model to 4 bits, about 0.5-0.7 bytes per parameter, then trains the same kind of adapters. QLoRA uses far less memory but trains roughly 40% slower.',
      },
      {
        q: 'Is LoRA as good as full fine-tuning?',
        a: 'LoRA is as good as full fine-tuning for most narrow business tasks, such as style, format, classification and extraction, when rank and target layers are set sensibly. Full fine-tuning can outperform LoRA when a model must absorb large amounts of new knowledge or train on hundreds of millions of tokens. The reliable way to decide is to compare both on the same evaluation set.',
      },
      {
        q: 'Does QLoRA reduce model quality?',
        a: 'QLoRA usually causes little or no quality loss compared with 16-bit LoRA. The QLoRA paper (Dettmers et al., 2023) reported preserving 16-bit fine-tuning performance on its benchmarks while fine-tuning a 65B model on a single 48GB GPU. Results still vary by task, so teams with enough memory often prefer standard LoRA, and every team should verify quality on its own evaluation set.',
      },
      {
        q: 'What LoRA rank should I use?',
        a: 'A good default LoRA rank is 16, with alpha set to 32 and adapters applied to all linear layers. Lower ranks from 4 to 16 suit style, tone, format and classification tasks. Higher ranks from 32 to 128 suit harder domain tasks with larger datasets. LoRA rank changes should be tested one at a time against a fixed evaluation set rather than chosen by intuition.',
      },
      {
        q: 'Can I run multiple LoRA adapters on one model?',
        a: 'Multiple LoRA adapters can run on one base model at the same time. Because each LoRA adapter is a small separate file, modern serving frameworks can load several adapters beside a single copy of the base model and pick the right adapter per request. This lets a business serve support, sales and extraction models from one GPU instead of hosting several full models.',
      },
      {
        q: 'Can I fine-tune a 70B model on one GPU?',
        a: 'A 70B model can be fine-tuned on one GPU using QLoRA. QLoRA stores the frozen weights in 4 bits, about 0.5-0.7 bytes per parameter, so a 70B model needs roughly 35-49 GB plus activations, which fits on a single 80GB GPU such as an H100 or A100. Full fine-tuning of the same 70B model needs over 1 TB of GPU memory across a cluster.',
      },
    ],
    related: [
      '/glossary/lora',
      '/glossary/qlora',
      '/guides/llm-fine-tuning-cost',
      '/services/custom-model-fine-tuning',
      '/glossary/peft',
    ],
    keywords: [
      'lora explained',
      'qlora explained',
      'lora vs qlora',
      'what is lora fine-tuning',
      'lora vs full fine-tuning',
      'lora rank and alpha',
      'qlora gpu memory requirements',
      'fine-tune 70b on one gpu',
      'parameter-efficient fine-tuning',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ */
  /* 5. How to prepare a fine-tuning dataset                             */
  /* ------------------------------------------------------------------ */
  {
    slug: 'how-to-prepare-fine-tuning-dataset',
    title: 'How to prepare a dataset for fine-tuning: a step-by-step guide',
    seoTitle: 'Fine-Tuning Dataset Preparation: Step-by-Step Guide',
    description:
      'How to prepare a fine-tuning dataset in 9 steps: build the eval set first, then source, clean, scrub PII, dedupe, label, augment, format as JSONL and split.',
    eyebrow: 'Guide · Data',
    answer:
      "To prepare a fine-tuning dataset, define the task and build a held-out evaluation set first. Then source real examples, clean them, remove personal data, deduplicate, label against written guidelines, fill gaps with filtered synthetic data, format everything as chat-style JSONL, and split roughly 80/10/10 into train, validation and test. Expect data work to take most of the project's effort.",
    facts: [
      'Most supervised fine-tuning datasets use JSONL, a text file with one JSON object per line, where each object holds one conversation as a list of system, user and assistant messages.',
      'A common split is 80% training, 10% validation and 10% test, with deduplication done before splitting so near-identical examples cannot leak into the test set.',
      'The evaluation set should be built before the training set and kept frozen, so every model version is measured against the same 50 to 500 examples.',
      'Personal data such as names, emails, phone numbers and account numbers should be removed or replaced with placeholders before training, because models can memorize and repeat training text.',
      'On a LoRA fine-tuning project, data preparation (sourcing, cleaning, labeling and review) usually takes more effort than training itself.',
    ],
    body: [
      {
        type: 'p',
        text: 'Models do not learn from your intentions. They learn from your examples, typos and all. Dataset preparation is the unglamorous work that decides whether a fine-tune ships or gets quietly shelved.',
      },
      {
        type: 'p',
        text: 'Here is the process step by step, from defining the task to a training-ready file. It applies whether you fine-tune an open model yourself or upload data to a managed fine-tuning API.',
      },
      { type: 'h2', text: 'Quick verdict: what are the steps?' },
      {
        type: 'ol',
        items: [
          'Define the task and write down what a perfect output looks like.',
          'Build the evaluation set first, and freeze it.',
          'Source real examples from your systems.',
          'Clean and normalize them.',
          'Scrub personal and sensitive data.',
          'Deduplicate exact and near-duplicate examples.',
          'Label or rewrite outputs against written guidelines.',
          'Fill gaps with filtered synthetic data.',
          'Format as chat JSONL and split into train, validation and test.',
        ],
      },
      { type: 'h2', text: 'Step 1: How do you define the task?' },
      {
        type: 'p',
        text: "Write one paragraph that says what goes in, what comes out and how a reviewer would judge it. 'Turn a customer email into a JSON ticket with category, priority and a one-sentence summary' is a task. 'Make the AI better at support' is not.",
      },
      {
        type: 'p',
        text: 'Then write 10-20 perfect examples by hand with a domain expert. If your team cannot agree on what perfect looks like, stop here. No amount of data fixes an undefined target.',
      },
      { type: 'h2', text: 'Step 2: Why build the evaluation set first?' },
      {
        type: 'p',
        text: 'An evaluation set is a fixed collection of inputs and accepted outputs used to score every model version the same way. Build it before the training set so you never tune toward it by accident, and so you can measure the un-tuned model before spending anything on training.',
      },
      {
        type: 'p',
        text: 'Aim for 50-500 real examples covering common cases, hard cases and known failure modes, then freeze it. [LLM evals](/glossary/llm-evals), repeatable tests that score outputs against defined criteria, run on this set and are how you will prove the fine-tune worked.',
      },
      {
        type: 'callout',
        title: 'Rule of thumb',
        text: 'Evaluation set first, training set second. If test examples ever leak into training, your scores become fiction.',
      },
      { type: 'h2', text: 'Step 3: Where do you source training examples?' },
      {
        type: 'p',
        text: 'The best data is usually already in your systems: resolved support tickets, approved reports, signed-off contract reviews, CRM notes, chat logs and past expert decisions. Prefer outputs a trusted person approved, since the model will copy their quality.',
      },
      {
        type: 'p',
        text: 'Pull more than you need, because cleaning, deduplication and review will discard a large share. Record where each example came from, so you can trace it, fix it or remove it later.',
      },
      { type: 'h2', text: 'Step 4: How do you clean the data?' },
      {
        type: 'p',
        text: 'Cleaning removes noise the model would otherwise learn. Typical fixes include stripping email signatures and legal footers, repairing broken text encoding, removing leftover HTML, normalizing dates and currencies, and dropping examples that are empty, truncated or in the wrong language.',
      },
      {
        type: 'p',
        text: 'Cut bad outputs ruthlessly. A support reply that was later escalated, or a report a manager had to rewrite, is a negative example, not a training example.',
      },
      { type: 'h2', text: 'Step 5: How do you remove personal data (PII)?' },
      {
        type: 'p',
        text: 'PII, or personally identifiable information, is any data that can identify a person: names, emails, phone numbers, addresses, account and ID numbers, and health or financial details. Remove it or replace it with consistent placeholders such as CUSTOMER_NAME or ACCOUNT_ID before training, because models can memorize and repeat training text.',
      },
      {
        type: 'p',
        text: 'Use automated detection for the obvious patterns, then have a person spot-check a sample, because tools miss context-dependent details. Regulated sectors such as [healthcare](/industries/healthcare) and finance need a documented process. Our guide to [fine-tuning data privacy](/guides/fine-tuning-data-privacy) covers this in depth.',
      },
      { type: 'h2', text: 'Step 6: Why does deduplication matter?' },
      {
        type: 'p',
        text: 'Duplicates over-weight whatever is repeated, so the model leans toward your most common template and away from edge cases. Worse, duplicates that land in both the training and test sets inflate your scores.',
      },
      {
        type: 'p',
        text: 'Remove exact duplicates with hashing, then near-duplicates with similarity checks such as MinHash or [embeddings](/glossary/embeddings), numeric representations of text that put similar meanings close together. Deduplicate before you split, never after.',
      },
      { type: 'h2', text: 'Step 7: How do you write labeling guidelines?' },
      {
        type: 'p',
        text: 'Labeling guidelines are a written rulebook that tells every annotator how to handle each judgment call. They define every label or field, show 2-3 examples of each, and settle the edge cases that cause disagreements.',
      },
      {
        type: 'ul',
        items: [
          '**Have two people label the same 50-100 examples** and measure how often they agree. Low agreement means the guidelines need work, not the people.',
          '**Log every new edge case** and add a rule for it, so decisions stay consistent across the dataset.',
          '**Prefer rewriting to rating.** For generation tasks, have experts rewrite weak outputs into ideal ones. The model learns from the rewrite.',
        ],
      },
      { type: 'h2', text: 'Step 8: When should you add synthetic data?' },
      {
        type: 'p',
        text: '[Synthetic data](/glossary/synthetic-data) is training data generated by a model or script rather than collected from real activity. Use it to fill specific gaps your evaluation reveals: rare categories, unusual formats, adversarial inputs, or new products with no history.',
      },
      {
        type: 'p',
        text: 'Seed generation with real examples, filter the outputs with automated checks, and have an expert review a sample. Keep synthetic data a minority of the set unless the task is purely about format, and never put synthetic examples in your evaluation set.',
      },
      { type: 'h2', text: 'Step 9: What format should a fine-tuning dataset use?' },
      {
        type: 'p',
        text: 'Most fine-tuning tools and managed APIs accept chat-style JSONL. JSONL is a text file with one JSON object per line, and each line holds one training example: a list of messages, each with a role (system, user or assistant) and its content. The model learns to produce the assistant message.',
      },
      {
        type: 'table',
        caption: 'One chat JSONL training example, shown message by message',
        head: ['Role', 'Content'],
        rows: [
          ['system', 'You are a support triage assistant. Return JSON with category, priority and summary.'],
          ['user', 'My card was charged twice for the March invoice and I need a refund today.'],
          ['assistant', '{"category": "billing", "priority": "high", "summary": "Customer was charged twice for the March invoice and wants an urgent refund."}'],
        ],
      },
      {
        type: 'p',
        text: 'Multi-turn conversations go on one line, with every turn in order. If your model will call tools, include the tool calls and tool results in the exact format your training framework expects, because the model learns the format as well as the content.',
      },
      {
        type: 'p',
        text: 'Keep the system prompt identical to the one you will use in production. Then split the deduplicated data, typically 80% train, 10% validation and 10% test. The validation set guides training decisions such as when to stop. If your frozen evaluation set from Step 2 is large enough, it can serve as the test set, and you split the rest about 90/10 into train and validation.',
      },
      { type: 'h2', text: 'What are the most common dataset mistakes?' },
      {
        type: 'p',
        text: 'Most failed fine-tunes trace back to the same handful of data problems. Check for these before you spend a dollar on training.',
      },
      {
        type: 'ul',
        items: [
          '**Training on everything you have.** Unreviewed history teaches the model your average day, not your best day.',
          '**A different system prompt in training and production.** The model learned one setup and is being tested on another.',
          '**Evaluation examples leaking into training.** Scores look great until real traffic arrives.',
          '**Ignoring class balance.** The model learns to predict the most common label and skips the rare, expensive ones.',
          '**One-person labeling.** Without a second labeler, nobody notices the guidelines are ambiguous.',
        ],
      },
      { type: 'h2', text: 'How do you know the dataset is ready?' },
      {
        type: 'ul',
        items: [
          "**Every example passes a schema check:** valid JSON, correct roles, no empty messages, and within the model's maximum length.",
          '**A reviewer has read a random sample of 50-100 examples** and would ship every output.',
          '**Coverage matches production,** with deliberate extra examples for rare but costly cases.',
          '**No overlap exists between training data and the evaluation set,** checked after deduplication.',
          '**A baseline score exists** for the un-tuned model on the evaluation set, so you can measure the gain.',
        ],
      },
      {
        type: 'p',
        text: 'Not sure you have enough examples? Read [how much data you need to fine-tune](/guides/how-much-data-to-fine-tune), then estimate the training bill in the [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator).',
      },
      { type: 'h2', text: 'How {{brand}} can help' },
      {
        type: 'p',
        text: 'Dataset work is where most fine-tuning projects win or lose, and it is a core part of what {{brand}} does. Our [fine-tuning dataset service](/services/fine-tuning-datasets) covers collection, cleaning, PII scrubbing, labeling and synthetic augmentation, with the evaluation set built first. We can sign NDAs and DPAs and work inside your own cloud. Take the 2-minute [AI audit](/audit) or [contact us](/#contact) for a plan, a price and an honest verdict within 24 hours.',
      },
    ],
    faqs: [
      {
        q: 'What format should fine-tuning data be in?',
        a: 'Fine-tuning data is usually formatted as chat-style JSONL, a text file with one JSON object per line. Each object contains a list of messages with roles such as system, user and assistant, and the model learns to produce the assistant message. OpenAI, Google Vertex AI, Amazon Bedrock and most open-source training tools accept this format or a close variant, so check the exact field names your tool expects.',
      },
      {
        q: 'How should I split a fine-tuning dataset?',
        a: 'A fine-tuning dataset is commonly split 80% training, 10% validation and 10% test. The training set teaches the model, the validation set guides decisions such as when to stop training, and the test set measures final quality once. Deduplicate before splitting so near-identical examples cannot appear in both training and test sets, which would inflate scores and hide real errors.',
      },
      {
        q: 'Do I need to remove personal data before fine-tuning?',
        a: 'Personal data should be removed or replaced with placeholders before fine-tuning in almost every business case. Language models can memorize and later reproduce parts of their training data, including names, emails, account numbers and health details. Removing personal data also simplifies compliance with privacy rules such as GDPR and HIPAA. Use automated detection first, then have a person review a sample.',
      },
      {
        q: 'How long does it take to prepare a fine-tuning dataset?',
        a: 'Preparing a fine-tuning dataset typically takes a few days for a style dataset of a few hundred examples and several weeks for a labeled dataset of thousands. The main time drivers are how scattered the source data is, how much personal data must be scrubbed, how many expert judgment calls labeling requires, and how many review rounds the dataset needs.',
      },
      {
        q: 'Can I use ChatGPT or Claude to generate fine-tuning data?',
        a: "Large language models such as ChatGPT or Claude can generate synthetic fine-tuning data, and teams often use them to fill gaps in rare categories or formats. Seed the generation with real examples, filter outputs automatically, have an expert review a sample, and keep the evaluation set real. Also check each provider's terms of service, since some restrict using outputs to train competing models.",
      },
      {
        q: 'What makes a good fine-tuning example?',
        a: 'A good fine-tuning example has a realistic input, an output an expert would approve without edits, and the same system prompt and format used in production. A good example follows the labeling guidelines, contains no personal data, and differs enough from other examples to add new information. A dataset of such examples beats a much larger pile of unreviewed historical records.',
      },
    ],
    related: [
      '/guides/how-much-data-to-fine-tune',
      '/services/fine-tuning-datasets',
      '/guides/fine-tuning-data-privacy',
      '/glossary/synthetic-data',
      '/glossary/llm-evals',
    ],
    keywords: [
      'how to prepare dataset for fine-tuning',
      'fine-tuning dataset preparation',
      'fine-tuning dataset format',
      'jsonl format for fine-tuning',
      'chat jsonl example',
      'train validation test split fine-tuning',
      'remove pii from training data',
      'labeling guidelines for llm data',
      'how to create a fine-tuning dataset',
    ],
    updated: '2026-10-27',
  },
];
