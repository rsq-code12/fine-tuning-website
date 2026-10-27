import type { Doc } from './types';

/*
 * Guides, batch B: models, agents, buying, privacy, automation.
 * Write {{brand}} instead of the brand name; it is replaced at render time.
 */

export const guidesB: Doc[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Open-source vs closed models                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: 'open-source-vs-closed-models-fine-tuning',
    title: 'Open-source vs closed models for fine-tuning: Llama, Qwen, Mistral or GPT?',
    seoTitle: 'Open-Source vs Closed LLMs for Fine-Tuning: Which to Pick',
    description:
      'Llama, Qwen, Mistral or GPT? Compare licenses, cost at volume, privacy and quality for fine-tuning, plus a decision table to pick the right model fast.',
    eyebrow: 'Guide · Models',
    answer:
      'Fine-tune an open-weight model (Qwen, Mistral, Llama, Gemma, gpt-oss) when you need to own the weights, keep data in your own cloud, or serve high volume cheaply. Use a closed model (GPT, Gemini) when you need top general reasoning fast and volume is modest. A LoRA fine-tune of an 8B open model often costs under $100 in GPU time.',
    facts: [
      'Qwen3, OpenAI’s gpt-oss models and many Mistral models are released under the Apache 2.0 license, which allows commercial use, modification and redistribution as long as license notices are kept.',
      'Meta’s Llama community license allows commercial use, but products with more than 700 million monthly active users need a separate license from Meta, and all use must follow Meta’s acceptable use policy.',
      'Fine-tuning a closed model on OpenAI, Google Vertex AI or Amazon Bedrock never hands you the weights: the tuned model runs only on that vendor’s platform.',
      'The 2023 QLoRA paper showed a 65-billion-parameter model can be fine-tuned on a single 48 GB GPU by training small adapters on top of a 4-bit quantized base model.',
      'Renting one H100-class GPU around the clock costs roughly $1,100 to $2,900 a month at $1.50 to $4 per hour, the usual baseline for self-hosting a fine-tuned model (late 2026 prices, which vary and keep falling).',
    ],
    body: [
      {
        type: 'p',
        text: "Every fine-tuning project hits the same fork in the road. Pick wrong and you pay for it every month: in API bills, in lock-in, or in a legal review nobody budgeted for. Pick right and the model becomes an asset you own. Here is how to choose, without the vendor spin.",
      },
      { type: 'h2', text: 'Quick verdict: should you fine-tune an open or a closed model?' },
      {
        type: 'p',
        text: 'If the model is core to your product, touches sensitive data, or will answer millions of requests, fine-tune an [open-weight model](/glossary/open-weight-models). If you need the strongest general reasoning this quarter, have low volume, and are comfortable with a vendor holding the model, start with a closed model and prompting.',
      },
      {
        type: 'callout',
        title: 'Rule of thumb',
        text: 'Ownership, privacy or high volume points to open weights. Speed to a first result and peak general reasoning point to closed models. If none of these is pressing, try prompting and retrieval before you fine-tune anything.',
      },
      {
        type: 'p',
        text: 'Many production systems end up hybrid. A closed frontier model handles the rare, hard reasoning. A small fine-tuned open model handles the repetitive, high-volume work. The rest of this guide shows why.',
      },
      { type: 'h2', text: 'What is the difference between open-weight and closed models?' },
      {
        type: 'p',
        text: 'An open-weight model is a model whose trained parameters, the weights, are published so anyone can download, run and fine-tune it. Llama, Qwen, Mistral, Gemma, DeepSeek and OpenAI’s gpt-oss family are all open-weight. A closed model is one you can only reach through the vendor’s API, such as GPT models from OpenAI, Claude from Anthropic and Gemini from Google.',
      },
      {
        type: 'p',
        text: '“Open source” is the popular label, but it is loose. Most releases share the weights, not the training data or the full training code. Some use true open-source licenses like Apache 2.0. Others use custom licenses with real conditions attached. That difference matters more than most buyers expect.',
      },
      {
        type: 'p',
        text: '[Fine-tuning](/glossary/fine-tuning) is further training of an existing model on your own examples so it learns your formats, vocabulary and decisions. With open weights you can fine-tune anywhere: your laptop, a GPU cloud or your own data center. With closed models you fine-tune only where the vendor allows it, through the vendor’s own tools.',
      },
      { type: 'h2', text: 'Which model licenses let you fine-tune and sell the result?' },
      {
        type: 'p',
        text: 'Read the license before you read the benchmark. The license decides whether you can ship the model commercially, in which regions, and under what name.',
      },
      {
        type: 'table',
        caption: 'Licensing at a glance (general summary, not legal advice; always check the exact checkpoint)',
        head: ['Model family', 'Typical license', 'What to watch'],
        rows: [
          ['Qwen (recent releases such as Qwen3)', 'Apache 2.0 for most sizes', 'Some older Qwen sizes used a custom Qwen license. Check each checkpoint.'],
          ['Mistral', 'Apache 2.0 for many open models', 'Some Mistral models use research-only or commercial licenses instead.'],
          ['gpt-oss (OpenAI, 2025)', 'Apache 2.0', 'Very permissive for commercial use. A usage policy still applies.'],
          ['Llama (Meta)', 'Llama community license', 'User cap, acceptable use policy, attribution and naming rules, some regional limits.'],
          ['Gemma (Google)', 'Gemma terms of use', 'Custom terms with a prohibited use policy that passes on to your derivatives.'],
          ['DeepSeek', 'MIT for recent releases', 'Permissive. Some procurement policies restrict models by origin, so check internally.'],
          ['GPT, Claude, Gemini', 'Commercial terms of service', 'No weights. You license access to the model, not the model itself.'],
        ],
      },
      { type: 'h3', text: 'The Llama license caveats in plain English' },
      {
        type: 'ul',
        items: [
          '**Scale cap.** If your products had more than 700 million monthly active users on the release date, you need a separate license from Meta. Almost nobody hits this, but acquirers and large platforms ask about it.',
          '**Acceptable use policy.** Certain uses are banned outright, and Meta can update the policy. Your use has to stay inside it.',
          '**Attribution and naming.** Recent versions require you to display “Built with Llama” and to start the name of a distributed fine-tuned model with “Llama”.',
          '**Regional carve-outs.** Some Llama multimodal releases did not grant rights to companies based in the EU. Check the exact version you plan to use.',
        ],
      },
      {
        type: 'p',
        text: 'None of this makes Llama a bad choice. Llama has the largest tooling ecosystem of any open model family. It makes Llama a choice your legal team should read once. If you want the fewest strings, Apache 2.0 models like Qwen3, gpt-oss and many Mistral releases are the cleanest path.',
      },
      { type: 'h2', text: 'How do costs compare at real volume?' },
      {
        type: 'p',
        text: 'Closed models charge per token, the small chunk of text a model reads or writes (roughly three quarters of an English word). That is ideal at low volume: no servers and no idle cost. As traffic grows, the bill grows with it in a straight line.',
      },
      {
        type: 'p',
        text: 'A self-hosted open model costs about the same whether it serves ten requests or ten thousand, up to the capacity of the GPU. A fine-tuned 7B to 14B model fits on one modern GPU, and inference servers such as vLLM batch many requests at once. So cost per request falls as traffic rises. A middle path also exists: serverless providers that host open-weight models and LoRA adapters and bill per token, usually well below closed frontier prices.',
      },
      {
        type: 'table',
        caption:
          'Illustrative monthly model cost. Assumptions: closed frontier API at a blended $3 to $5 per million tokens; serverless 8B open model at $0.20 to $1.00 per million; dedicated GPU at $1.50 to $4 per hour; the fine-tuned small model passes your quality bar. Late 2026 prices; they vary and change.',
        head: ['Monthly tokens', 'Closed frontier API', 'Serverless open model', 'Dedicated GPU you control'],
        rows: [
          ['10 million', '$30 to $50', '$2 to $10', '$1,100 to $2,900 (mostly idle)'],
          ['300 million', '$900 to $1,500', '$60 to $300', '$1,100 to $2,900'],
          ['3 billion', '$9,000 to $15,000', '$600 to $3,000', '$1,100 to $5,800 (one or two GPUs)'],
        ],
      },
      {
        type: 'p',
        text: 'Two lessons stand out. First, a well fine-tuned small model is dramatically cheaper than a frontier API at volume, as long as it is accurate enough. Second, a dedicated GPU only wins at very high steady volume, or when data must stay in your environment. Add engineering and on-call time to that column before you decide.',
      },
      {
        type: 'callout',
        title: 'Compare the right number',
        text: 'Compare cost per correct answer, not cost per token. A cheap model that is wrong 10% of the time can cost more than an expensive one once you count the human cleanup.',
      },
      {
        type: 'p',
        text: 'Training itself is rarely the big number. A [LoRA](/glossary/lora) fine-tune, which trains small adapter layers instead of the whole model, of an 8B model on a few thousand examples usually takes a few GPU-hours, often under $100 in compute. Data preparation and evaluation cost far more in people time. The [fine-tuning cost guide](/guides/llm-fine-tuning-cost) and the [cost calculator](/tools/fine-tuning-cost-calculator) break this down.',
      },
      { type: 'h2', text: 'Which option is better for privacy and ownership?' },
      {
        type: 'p',
        text: 'With open weights, the model can run inside your own cloud account or on your own hardware. Prompts, outputs and training data never have to leave infrastructure you control. You keep the fine-tuned weights as files. No vendor can deprecate them, reprice them or change their behavior overnight.',
      },
      {
        type: 'p',
        text: 'With closed models, your training data is uploaded to the vendor and the tuned model lives on the vendor’s platform. Major providers state that business API data is not used to train their models by default, and many offer data processing agreements and regional hosting. That is often good enough. But you are renting, and vendors do retire older base models, which can force a re-tune on a schedule you did not choose.',
      },
      {
        type: 'p',
        text: 'For regulated data such as health records or client files, the open-weight path makes audits simpler. The [fine-tuning data privacy guide](/guides/fine-tuning-data-privacy) has the full checklist.',
      },
      { type: 'h2', text: 'Are open models good enough on quality?' },
      {
        type: 'p',
        text: 'On broad, hard reasoning, the best closed frontier models still tend to lead, although the gap to the top open models has narrowed sharply since 2024. On narrow, repeated tasks the picture flips. Classification, extraction, routing, fixed-format drafting and house-style writing are where a fine-tuned small model shines.',
      },
      {
        type: 'p',
        text: 'Predibase’s 2024 “LoRA Land” study is a useful data point: small open models fine-tuned with LoRA matched or beat GPT-4 on many narrow tasks. The pattern has held since. A specialist beats a generalist when the task is well defined and you have good examples.',
      },
      {
        type: 'p',
        text: 'The honest answer is to test. Build a set of 100 to 300 real examples with known good answers, run each candidate model, and score the results the same way every time. That set of [evals](/glossary/llm-evals) settles the question better than any public leaderboard.',
      },
      { type: 'h2', text: 'What does hosting an open model involve?' },
      {
        type: 'p',
        text: 'Closed models need no hosting: you call an API. Open models need a serving stack, monitoring and someone on call. Managed options cut most of this work. Amazon Bedrock and Google Vertex AI can host many open-weight models, serverless endpoints bill per token, and dedicated GPU platforms handle the hardware.',
      },
      {
        type: 'p',
        text: 'Size drives cost. A 7B to 14B model runs comfortably on one modern GPU. A 70B model typically needs several GPUs, or one large GPU with quantization, which stores each weight in fewer bits to save memory at a small quality cost. Start small: fine-tune the smallest model that passes your evals, and move up only if it fails.',
      },
      { type: 'h2', text: 'Decision table: open or closed model for your use case?' },
      {
        type: 'table',
        head: ['Your situation', 'Best fit', 'Why'],
        rows: [
          ['Sensitive data that must stay in your cloud', 'Open-weight, self-hosted', 'Data and weights never leave your environment.'],
          ['Millions of requests a month on one narrow task', 'Small fine-tuned open model', 'Flat GPU cost or cheap per-token serving beats frontier prices.'],
          ['Low volume, need results this month', 'Closed model, prompting first', 'No infrastructure and the fastest path to a working prototype.'],
          ['Hardest multi-step reasoning', 'Closed frontier model', 'Still the strongest general reasoners, often without fine-tuning.'],
          ['You will sell or embed the model in a product', 'Open-weight under Apache 2.0', 'Fewest license strings and full ownership of the weights.'],
          ['Already standardized on one cloud', 'Managed fine-tuning on that cloud', 'Vertex AI or Bedrock keeps billing, access control and compliance in one place.'],
          ['Mixed workload', 'Hybrid', 'Route rare hard cases to a closed model and volume to a fine-tuned open one.'],
        ],
      },
      { type: 'h2', text: 'How {{brand}} can help' },
      {
        type: 'p',
        text: "{{brand}} fine-tunes both open-weight and closed models, so we have no reason to push one over the other. We can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control. If you don't need fine-tuning at all, we'll say so.",
      },
      {
        type: 'p',
        text: 'Run your numbers in the [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator), or take the [2-minute AI audit](/audit). Want a straight answer for your stack? [Get in touch](/#contact): {{brand}} returns a plan, a price and an honest verdict within 24 hours. Details of the work are on the [custom model fine-tuning](/services/custom-model-fine-tuning) page.',
      },
    ],
    faqs: [
      {
        q: 'Can I fine-tune GPT, Gemini or Claude models?',
        a: 'Closed models can be fine-tuned only where the vendor allows it. OpenAI offers fine-tuning for selected GPT models on its platform, Google offers Gemini tuning on Vertex AI, and Amazon Bedrock supports fine-tuning for a subset of the models it hosts. Fine-tuning options for Claude have been far more limited, so check current availability. In every case, a fine-tuned closed model stays on the vendor’s platform and its weights cannot be downloaded.',
      },
      {
        q: 'Is Llama really open source?',
        a: 'Llama is open-weight but not open source in the strict sense used by the Open Source Initiative, which has said the Llama license does not qualify. Meta publishes Llama weights under a community license that allows commercial use but adds an acceptable use policy, attribution and naming rules, and a separate-license requirement above 700 million monthly active users. Llama is usable commercially by most companies, but the license deserves one careful legal read.',
      },
      {
        q: 'Which open-source model is best for fine-tuning in 2026?',
        a: 'The best open-weight model for fine-tuning depends on the task, the size budget and the license you can accept. Recent Qwen releases are a strong default for multilingual and general tasks under Apache 2.0. Mistral and gpt-oss models are also Apache 2.0. Llama has the largest tooling ecosystem, and Gemma suits small, efficient deployments. Fine-tune two or three candidates on the same data and keep whichever scores best on your evals.',
      },
      {
        q: 'Is self-hosting an open model cheaper than using the OpenAI API?',
        a: 'Self-hosting an open model becomes cheaper than a closed API at steady, high volume, roughly hundreds of millions of tokens a month or more when compared against frontier pricing. One rented H100-class GPU costs about $1,100 to $2,900 a month. At low or spiky volume, per-token APIs or serverless open-model endpoints usually win because nothing is paid while idle. Count engineering and on-call time, not just GPU rent.',
      },
      {
        q: 'Do I own a model I fine-tune?',
        a: 'Ownership of a fine-tuned model depends on the path. With an open-weight base model, you hold the fine-tuned weights or adapter files and can run them anywhere the base license allows. With a closed model, the vendor hosts the tuned model and you hold usage rights, not the weights. When hiring a partner, the contract should assign the fine-tuned weights, datasets and eval sets to you.',
      },
      {
        q: 'Can I switch from a closed model to an open model later?',
        a: 'Switching from a closed model to an open-weight model later is common, and it is easy if you keep your training data and eval set. The dataset is the durable asset; the model is replaceable. Many teams prototype on a closed API, collect real examples, then fine-tune a smaller open model once volume justifies it. Check the closed vendor’s terms first, since some restrict using their outputs to train competing models.',
      },
    ],
    related: [
      '/services/custom-model-fine-tuning',
      '/guides/llm-fine-tuning-cost',
      '/guides/lora-qlora-explained',
      '/guides/fine-tuning-data-privacy',
      '/glossary/open-weight-models',
    ],
    keywords: [
      'open source vs closed LLM for fine-tuning',
      'best open source model for fine-tuning',
      'Llama vs Qwen vs Mistral',
      'fine-tune GPT vs Llama',
      'Llama license commercial use',
      'Apache 2.0 LLM',
      'self-hosted LLM cost',
      'open-weight models for business',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ */
  /* 2. AI agents for business operations                                */
  /* ------------------------------------------------------------------ */
  {
    slug: 'ai-agents-for-business-operations',
    title: 'How to build an AI agent team for business operations',
    seoTitle: 'AI Agents for Business Operations: How to Build a Team',
    description:
      'How to build AI agents for business operations: roles, handoffs, human approval, MCP tools, evals and a starter blueprint for lead gen, support and reporting.',
    eyebrow: 'Guide · Agents',
    answer:
      'An AI agent team is a set of language-model agents, each with one job and a few tools, coordinated by a router or orchestrator and checked by humans at risky steps. Start with one agent on one process, add evals and approval gates, then add roles. A focused pilot usually ships in two to six weeks.',
    facts: [
      'An AI agent is a language model running in a loop that chooses which tools to call, reads the results, and continues until it reaches a goal or hands off to a human.',
      'Anthropic reported in 2025 that its multi-agent research system used about 15 times more tokens than a standard chat, compared with about 4 times for a single agent.',
      'Reliability compounds across steps: an agent that is 95% reliable per step completes a 10-step task without error only about 60% of the time.',
      'The Model Context Protocol (MCP), introduced by Anthropic in November 2024, is an open standard for connecting AI agents to tools and data, and has since been adopted by OpenAI, Google and Microsoft.',
      'Human approval gates belong on irreversible or customer-facing actions such as sending external messages, issuing refunds, changing records and moving money.',
    ],
    body: [
      {
        type: 'p',
        text: 'Everyone wants an AI workforce. Most teams build a demo that impresses on Friday and breaks on Monday. The difference between the two is not the model. It is roles, handoffs, tests and knowing where a human must stay in charge. This guide gives you the blueprint.',
      },
      { type: 'h2', text: 'What is an AI agent, in plain English?' },
      {
        type: 'p',
        text: 'An [AI agent](/glossary/ai-agent) is a language model that runs in a loop: it reads a goal, decides on a step, calls a tool, looks at the result, and repeats until the job is done or it hands off. The tools are the point. Without them a model can only talk. With them it can search a CRM, read an inbox, draft a reply or update a ticket.',
      },
      {
        type: 'p',
        text: '[Tool calling](/glossary/tool-calling) is the model feature that makes this work. The model outputs a structured request, such as “look up order 4512”, your code runs it, and the result goes back to the model. The model never touches your systems directly. Your code decides what it is allowed to do.',
      },
      {
        type: 'p',
        text: 'An agent team, also called a multi-agent system, is a group of agents with separate roles that pass work between them, like a small department with a manager and specialists.',
      },
      { type: 'h2', text: 'Quick verdict: one agent or a team of agents?' },
      {
        type: 'p',
        text: 'Start with one agent. Add a second only when the first has a job it is measurably bad at. Anthropic’s widely cited engineering guidance on building agents makes the same point: use the simplest pattern that works and add complexity only when it earns its keep.',
      },
      {
        type: 'callout',
        title: 'Rule of thumb',
        text: 'Split work into multiple agents when tasks need different tools, different permissions or different context. Keep one agent when the work is a single flow that one clear brief and a few tools can handle.',
      },
      {
        type: 'p',
        text: 'Multi-agent systems cost more and fail in more ways. Anthropic reported that its multi-agent research system used roughly 15 times the tokens of a normal chat. That trade is worth it for broad research. It is waste for answering a refund question.',
      },
      { type: 'h2', text: 'How do roles and handoffs work in an AI agent team?' },
      {
        type: 'p',
        text: 'Give each agent one job, a short written brief and the minimum tools for that job. A support triage agent reads and labels tickets; it does not need access to billing. A reporting agent reads analytics; it does not need to send email. Narrow roles are easier to test and much harder to misuse.',
      },
      { type: 'p', text: 'Coordination usually follows one of four patterns:' },
      {
        type: 'ul',
        items: [
          '**Router.** One small agent classifies each incoming item and sends it to the right specialist. Cheap, predictable and the best starting pattern.',
          '**Orchestrator and workers.** A lead agent breaks a big task into parts, assigns them, then merges the results. Good for research and reports.',
          '**Pipeline.** Agents run in a fixed order, each adding to a shared record. Good for lead enrichment and content production.',
          '**Reviewer.** A second agent checks the first agent’s output against a checklist before anything leaves the building.',
        ],
      },
      {
        type: 'p',
        text: 'Handoffs should pass structured data, not chat transcripts. A handoff record with fields like customer ID, intent, confidence and next action keeps agents aligned and makes every step auditable. When something goes wrong, you can see exactly which agent decided what.',
      },
      { type: 'h2', text: 'Where should humans stay in the loop?' },
      {
        type: 'p',
        text: 'Human-in-the-loop means a person approves, edits or rejects an agent’s action before it takes effect. Put approval gates on anything irreversible or customer-facing: outbound emails, refunds, contract changes, price quotes and record deletions.',
      },
      {
        type: 'p',
        text: 'Gates are not a sign of failure. They are how an agent earns trust. Track how often humans accept the agent’s draft unchanged. When acceptance holds above an agreed bar, for example 95% across several hundred cases, remove the gate for that action type and keep sampling a share of the work.',
      },
      {
        type: 'p',
        text: 'Agents also need a clean way to give up. Every agent should have an “escalate to human” tool with a reason field. An agent that asks for help is far cheaper than one that guesses.',
      },
      { type: 'h2', text: 'How do agents connect to your tools? (MCP and APIs)' },
      {
        type: 'p',
        text: 'Agents reach your systems through APIs wrapped as tools. The [Model Context Protocol](/glossary/model-context-protocol) (MCP) is an open standard, introduced by Anthropic in 2024 and since adopted by OpenAI, Google and Microsoft, that packages tools and data sources so any compatible agent can use them. Many SaaS products now ship ready-made MCP servers.',
      },
      {
        type: 'p',
        text: 'Treat each tool as a permission. Prefer read-only tools where you can, scope write tools tightly, and log every call with its inputs and outputs. Rate limits and spending caps stop a looping agent from emailing 5,000 people or burning a month of API budget overnight.',
      },
      { type: 'h2', text: 'How do you test an AI agent before it touches customers?' },
      {
        type: 'p',
        text: '[Evals](/glossary/llm-evals) are repeatable tests that score model or agent output against known good answers or a written rubric. Before launch, build a set of 50 to 200 real cases per agent, including the ugly ones: angry customers, missing data, ambiguous requests and attempts to trick the agent.',
      },
      {
        type: 'p',
        text: 'Score four numbers: task success rate, escalation rate, cost per task and time per task. Re-run the suite on every prompt, model or tool change. Then run the agent in shadow mode, where it drafts actions on live traffic while a human still does the real work, and compare the two side by side.',
      },
      { type: 'h2', text: 'What are the common failure modes of AI agents?' },
      {
        type: 'table',
        caption: 'Agent failure modes and how to prevent them',
        head: ['Failure mode', 'What it looks like', 'Fix'],
        rows: [
          ['Compounding errors', 'Small mistakes stack up across many steps', 'Shorter flows, validation between steps, fewer handoffs'],
          ['Hallucinated facts', 'Confident answers with no source', 'Answer only from approved sources, cite them, refuse when unsure'],
          ['Tool misuse', 'Wrong record updated or wrong customer emailed', 'Narrow tools, schema validation, approval gates'],
          ['Infinite loops', 'The agent retries the same failing step', 'Step limits, timeouts and budget caps'],
          ['Prompt injection', 'Instructions hidden in an email or web page hijack the agent', 'Treat retrieved content as data, limit permissions, human review'],
          ['Silent drift', 'Quality drops after a model or data change', 'Scheduled eval runs with alerts'],
        ],
      },
      {
        type: 'p',
        text: 'The math is unforgiving. If each step is 95% reliable, a 10-step task succeeds end to end only about 60% of the time. That is why good agent design shortens chains and checks work between steps. [Guardrails](/glossary/guardrails), the rules and filters that limit what an agent can say and do, catch much of the rest.',
      },
      { type: 'h2', text: 'A starter blueprint: lead gen, support and reporting' },
      {
        type: 'p',
        text: 'Here is a practical first agent team for a small or mid-sized business. It uses five agents, your existing CRM and helpdesk, and humans at the gates. Build it one agent at a time, in this order of value for most teams: support, reporting, then lead generation.',
      },
      {
        type: 'ol',
        items: [
          '**Router agent.** Watches the shared inbox, web forms and chat. Classifies each item as a sales lead, a support request or other, and hands it to the right agent with a structured record.',
          '**Lead research agent.** Enriches new leads from the company website and public sources, scores fit against your ideal customer profile, and writes a short summary to the CRM.',
          '**Outreach drafting agent.** Drafts a personalized first email for qualified leads. A human approves every send for the first several weeks.',
          '**Support agent.** Answers common questions from your help center, handles simple account lookups, and escalates billing disputes, complaints and anything below a confidence threshold.',
          '**Reporting agent.** Every Monday, pulls pipeline, ticket and response-time metrics, writes a one-page summary of trends and anomalies, and posts it to your team channel.',
        ],
      },
      {
        type: 'p',
        text: 'Model fees for a setup like this are usually modest. Depending on model choice, number of steps and context size, one agent task typically costs from a fraction of a cent to tens of cents. Small, cheap models handle high-volume routing and labeling. Larger models handle drafting and reasoning. Build time, evals and maintenance usually cost more than the model fees in year one.',
      },
      { type: 'h2', text: 'How should you roll out an AI agent team?' },
      {
        type: 'table',
        caption: 'A phased rollout for the first agent (timings assume one well-defined process and accessible systems)',
        head: ['Phase', 'Timing', 'What happens'],
        rows: [
          ['Map and measure', 'Week 1', 'Pick one process, document every step, record baseline volume, time and error rate'],
          ['Build and eval', 'Weeks 2 to 3', 'Build the agent and its tools, write 50 to 200 eval cases, iterate to target'],
          ['Shadow mode', 'Weeks 3 to 4', 'The agent drafts on live traffic, humans do the real work, results are compared'],
          ['Assisted', 'Weeks 4 to 6', 'The agent acts, with human approval on every external action'],
          ['Earned autonomy', 'After week 6', 'Remove gates where acceptance stays high, then add the next agent'],
        ],
      },
      {
        type: 'p',
        text: 'Resist the urge to automate five processes at once. One working agent with clean metrics teaches you more than five half-built ones. Not sure whether you need agents or plain workflow automation? Read [AI agents vs automation tools](/guides/ai-agents-vs-automation-tools) first.',
      },
      { type: 'h2', text: 'How {{brand}} can help' },
      {
        type: 'p',
        text: '{{brand}} designs and builds [AI agent teams for business operations](/services/ai-agent-swarms), plus the [multi-agent harnesses](/services/multi-agent-harnesses) that keep them logged, tested and safe in production. We can work inside your own cloud and deploy on infrastructure you control.',
      },
      {
        type: 'p',
        text: 'Take the [2-minute AI audit](/audit) to find the process worth automating first, or [talk to us](/#contact). {{brand}} returns a plan, a price and an honest verdict within 24 hours.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between an AI agent and a chatbot?',
        a: 'A chatbot answers messages in a conversation. An AI agent takes actions: it calls tools such as a CRM, helpdesk or database, checks the results, and keeps working toward a goal across several steps. Many modern chatbots are simple agents underneath. The practical difference is permission: an AI agent can change things in your systems, so an AI agent needs scoped tools, logging and approval gates.',
      },
      {
        q: 'How much does it cost to run AI agents for business operations?',
        a: 'Running AI agents for business operations has two costs: model fees and build effort. Model fees per task usually range from a fraction of a cent to tens of cents, depending on the model, the number of steps and the context size. Multi-agent setups cost more because agents pass context to each other. In the first year, build effort, evals and maintenance usually outweigh model fees.',
      },
      {
        q: 'Do I need a multi-agent system or is one AI agent enough?',
        a: 'One AI agent is enough for most first projects. A single agent with a clear brief and three to six tools can run a whole process such as support triage. A multi-agent system makes sense when tasks need different tools, permissions or context, or when work can run in parallel. Multi-agent systems use more tokens and fail in more ways, so add agents only when testing shows a clear gain.',
      },
      {
        q: 'What is MCP and do my AI agents need it?',
        a: 'MCP, the Model Context Protocol, is an open standard for connecting AI agents to tools and data sources through reusable servers. AI agents do not strictly need MCP, because any API can be wrapped as a tool directly. MCP helps when the same tools must work across several agents or model vendors, or when your SaaS products already ship MCP servers you can plug in.',
      },
      {
        q: 'Can AI agents work without human oversight?',
        a: 'AI agents can work without human oversight on low-risk, reversible tasks once evals and live results prove they are reliable. Examples include tagging tickets, enriching leads and drafting internal reports. Irreversible or customer-facing actions, such as sending emails, issuing refunds or changing contracts, should keep a human approval step until acceptance stays high over hundreds of cases, with ongoing sampling after the gate is removed.',
      },
      {
        q: 'How long does it take to deploy an AI agent team?',
        a: 'Deploying a first AI agent on one well-defined process usually takes two to six weeks, covering process mapping, tool building, evals, shadow testing and an assisted launch. A full AI agent team for lead generation, support and reporting is best rolled out in phases, adding one agent at a time once the previous agent meets its targets. Messy data or hard-to-reach systems extend the timeline.',
      },
    ],
    related: [
      '/services/ai-agent-swarms',
      '/services/multi-agent-harnesses',
      '/guides/ai-agents-vs-automation-tools',
      '/glossary/multi-agent-system',
      '/glossary/model-context-protocol',
    ],
    keywords: [
      'AI agents for business operations',
      'how to build an AI agent team',
      'multi-agent system for business',
      'AI agents for customer support',
      'AI agents for lead generation',
      'human in the loop AI agents',
      'model context protocol MCP',
      'AI agent evaluation',
      'AI agent rollout plan',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ */
  /* 3. How to choose a partner                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: 'how-to-choose-ai-fine-tuning-partner',
    title: 'How to choose an AI fine-tuning or AI agent development partner: a 15-point checklist',
    seoTitle: 'How to Choose an AI Fine-Tuning Partner: 15-Point Checklist',
    description:
      'A 15-point checklist for choosing an AI fine-tuning or agent development partner: questions to ask, red flags, and in-house vs freelancer vs agency compared.',
    eyebrow: 'Guide · Buying',
    answer:
      'Choose an AI fine-tuning or agent partner that asks about your data and success metric before naming a model, builds evals before building the system, shows comparable past work, assigns you ownership of weights, data and code, and quotes a scoped pilot at a fixed price. Walk away from anyone who guarantees accuracy figures before seeing your data.',
    facts: [
      'A credible AI partner agrees how success will be measured, with a written baseline and eval set, before any training or build work starts.',
      'Contracts for fine-tuning work should assign the fine-tuned weights or adapters, training datasets, eval sets and code to the client, subject to the base model’s license.',
      'Under GDPR, a vendor processing personal data on your behalf must be bound by a data processing agreement; under HIPAA, a vendor handling protected health information needs a business associate agreement.',
      'A scoped AI pilot on one process commonly runs two to eight weeks, long enough to prove value against a baseline before committing to a larger build.',
      'No honest partner can guarantee an accuracy figure before testing on your data, because quality depends on the data, the task and how it is measured.',
    ],
    body: [
      {
        type: 'p',
        text: 'Hiring an AI partner is easy. Hiring the right one is the hard part. Every vendor has a slick demo and a logo wall. This checklist cuts through both, and it works whether you are comparing studios, freelancers, consultancies or your own future hires.',
      },
      { type: 'h2', text: 'Quick verdict: what makes a good AI development partner?' },
      {
        type: 'p',
        text: 'A good AI partner sells you a measured outcome, not a model. They ask about your data, your process and your success metric before they mention Llama, GPT or agents. They propose a small paid pilot with clear pass or fail criteria. And they make you the owner of everything they build.',
      },
      {
        type: 'callout',
        title: 'The one-question test',
        text: 'Ask: “How will we know this worked?” A strong partner answers with a metric, a baseline and an eval set. A weak partner answers with a technology.',
      },
      {
        type: 'p',
        text: 'The right choice is not always an outside firm. Sometimes it is an in-house hire, sometimes a freelancer, sometimes a specialist studio or a large consultancy. The checklist below applies to all of them, and the comparison table later shows where each one fits.',
      },
      { type: 'h2', text: 'The 15-point checklist for choosing an AI partner' },
      {
        type: 'ol',
        items: [
          '**They start with the problem, not the model.** The first conversation covers your process, volume, cost of errors and current baseline.',
          '**They tell you when you do not need fine-tuning.** Many problems are solved by better prompts or retrieval. A partner who recommends [fine-tuning](/glossary/fine-tuning) for everything is selling, not advising. The [fine-tuning vs RAG vs prompting](/guides/fine-tuning-vs-rag-vs-prompting) guide explains the trade-off.',
          '**They define success in writing.** A target metric, a baseline and a pass threshold, agreed before work starts.',
          '**They build evals first.** [Evals](/glossary/llm-evals) are repeatable tests that score output against known good answers. Ask to see an example eval report from past work, with client details removed.',
          '**They show comparable work.** Not logos. A walkthrough of a similar project: the data, the approach, what failed and the measured result.',
          '**They are model-agnostic.** They can explain when they would use an open-weight model, a closed API or both, and they have no reseller incentive steering the answer.',
          '**They take data seriously.** They ask about data volume, quality, labeling and personal information early, and have a plan for cleaning and filling gaps.',
          '**They can work in your environment.** Your cloud account, your private network and your access controls, if your data requires it.',
          '**They sign the right paperwork.** An NDA, a data processing agreement, and a HIPAA business associate agreement if you handle US health data. See [fine-tuning data privacy](/guides/fine-tuning-data-privacy).',
          '**You own the outputs.** The contract assigns weights or adapters, datasets, eval sets, prompts and code to you, subject to the base model’s license.',
          '**They plan for production, not demos.** Logging, monitoring, retries, cost tracking and a rollback plan appear in the proposal.',
          '**They quote a scoped pilot.** A fixed price and timeline for a first phase with clear exit criteria, before any long retainer.',
          '**They explain running costs.** Monthly hosting or API costs at your expected volume, with the assumptions written down.',
          '**They hand over properly.** Documentation, a runbook and training, so your team can run, change or replace the system.',
          '**They communicate like adults.** Plain-English answers, regular written updates and bad news delivered early.',
        ],
      },
      { type: 'h2', text: 'What red flags should you watch for in an AI vendor?' },
      {
        type: 'ul',
        items: [
          'Guaranteed accuracy, such as “99% accurate”, before they have seen your data.',
          'No mention of evals, test sets or baselines anywhere in the proposal.',
          'Vague ownership terms, or the vendor keeps the model, the data or the code.',
          'A proprietary platform you must keep paying for just to use your own model.',
          'Every problem gets the same answer: always agents, always fine-tuning, always one vendor’s API.',
          'Pressure to sign a long retainer before a pilot has proved anything.',
          'Demos built on hand-picked examples, with no failure cases shown.',
          'Reluctance to sign a DPA or to say where your data will be stored and processed.',
          'Nobody on the call can explain the technical approach without jargon.',
        ],
      },
      { type: 'h2', text: 'What questions should you ask an AI partner before signing?' },
      {
        type: 'ul',
        items: [
          'What metric will we use to judge success, and what is our current baseline?',
          'What would make you recommend against fine-tuning or agents for this problem?',
          'Which base models would you consider, why, and what are their licenses?',
          'Where will our data be stored and processed during and after the project?',
          'Who owns the weights, datasets, eval sets and code at the end?',
          'What will this cost per month to run at our volume, and what are the assumptions?',
          'What happens when the base model is deprecated or a better one ships?',
          'Who exactly will do the work, and what have they shipped before?',
          'What does the pilot cost, how long does it take, and what are the exit criteria?',
        ],
      },
      {
        type: 'p',
        text: 'Listen for specifics. Good answers include numbers, named trade-offs and the word “depends” followed by what it depends on. Weak answers lean on buzzwords and promise everything.',
      },
      { type: 'h2', text: 'How do you compare AI proposals side by side?' },
      {
        type: 'p',
        text: 'Put every proposal into the same simple scorecard. Score each of the 15 checklist points from 0 to 2: 0 for missing, 1 for vague, 2 for specific and written down. A total under 20 out of 30 is a warning sign, whatever the price.',
      },
      {
        type: 'p',
        text: 'Then compare three numbers on the same assumptions: the pilot price, the expected monthly running cost at your volume, and the time to a go or no-go decision. If one proposal is far cheaper, find out what it leaves out. Usually it is evals, data cleaning or production monitoring, and those are exactly the parts that decide whether the system still works three months after launch.',
      },
      { type: 'h2', text: 'In-house team vs freelancer vs agency vs big consultancy: which is right?' },
      {
        type: 'p',
        text: 'Each option fits a different situation. The table compares them on the factors that usually decide the call. Costs are relative, because real numbers vary widely by region, seniority and scope.',
      },
      {
        type: 'table',
        caption: 'Comparing AI delivery options (qualitative; your situation may differ)',
        head: ['Factor', 'In-house team', 'Freelancer', 'Specialist agency or studio', 'Large consultancy'],
        rows: [
          ['Upfront cost', 'High: recruiting takes months and senior ML salaries are steep', 'Low', 'Medium, usually priced per project or phase', 'Highest'],
          ['Speed to first result', 'Slow until the team is hired', 'Fast for narrow tasks', 'Fast, often weeks', 'Slower, more process'],
          ['Breadth across data, models and agents', 'Grows over time', 'Usually one specialty', 'Broad if the team is senior', 'Broad, but staff can be generalists'],
          ['Delivery risk', 'Low once staffed, high before', 'Key-person risk', 'Medium, depends on the firm', 'Low on paper, scope can sprawl'],
          ['Knowledge retention', 'Stays with you', 'Leaves with the person', 'Needs a planned handover', 'Needs a planned handover'],
          ['Best for', 'AI as a permanent core capability', 'Small, well-defined tasks', 'Pilots and production builds with a clear goal', 'Enterprise-wide programs and change management'],
        ],
      },
      {
        type: 'p',
        text: 'Many companies combine them. A partner builds and proves the first system, then hands it to a small in-house team that runs and extends it. If AI will be core to your product for years, plan the in-house path from day one, even if a partner does the first build.',
      },
      { type: 'h2', text: 'How should you structure the first engagement?' },
      {
        type: 'p',
        text: 'Start with a paid discovery phase or pilot, not a long contract. A good first phase covers one process, one dataset and one metric, and ends with a go or no-go decision backed by eval results.',
      },
      {
        type: 'p',
        text: 'Write the exit criteria down: the target metric, the cost ceiling and the date. If the pilot misses, you should still walk away with something useful: a cleaned dataset, an eval set and a clear explanation of why it missed. Those assets carry over to the next attempt, with any partner.',
      },
      {
        type: 'p',
        text: 'Ask for running costs alongside the build price. A system that is cheap to build and expensive to run is not cheap. The [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator) gives an independent sanity check on compute numbers, and the [fine-tuning cost guide](/guides/llm-fine-tuning-cost) explains what drives them.',
      },
      { type: 'h2', text: 'How {{brand}} can help' },
      {
        type: 'p',
        text: "{{brand}} is an applied AI studio that fine-tunes models, builds niche datasets and ships [AI agent systems](/services/ai-agent-swarms), and this is the checklist we expect to be judged by. {{brand}} returns a plan, a price and an honest verdict within 24 hours. If you don't need us, we'll say so.",
      },
      {
        type: 'p',
        text: 'Take the [2-minute AI audit](/audit) to frame your use case, or [send us your brief](/#contact) and hold us to all 15 points.',
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to hire an AI fine-tuning partner?',
        a: 'The cost of hiring an AI fine-tuning partner varies widely with scope, data readiness and deployment needs. A scoped pilot on one task is usually priced as a fixed project, while larger builds and ongoing operations are priced by phase or retainer. Ask every AI fine-tuning partner for a fixed pilot price, the expected monthly running cost at your volume, and the assumptions behind both numbers.',
      },
      {
        q: 'Should I hire an in-house ML team or an AI agency?',
        a: 'Hire an in-house ML team when AI is a permanent, core part of your product and you can wait months to recruit. Hire an AI agency or studio when you need a proven result in weeks, lack in-house expertise, or want to validate the idea before building a team. Many companies do both: an AI agency builds the first system, then hands it to a small internal team.',
      },
      {
        q: 'What should an AI development contract include?',
        a: 'An AI development contract should include a defined scope and success metric, a fixed pilot price, ownership terms assigning weights, datasets, eval sets and code to the client, and confidentiality terms. Where personal data is involved, it needs a data processing agreement. It should also cover data storage location, deletion at the end, acceptance criteria and handover deliverables such as documentation. Have a lawyer review any AI development contract.',
      },
      {
        q: 'How can I tell if an AI agency is credible?',
        a: 'A credible AI agency explains its approach in plain English, proposes evals and a baseline before building, and walks you through comparable past work, including what failed. A credible AI agency discusses data quality and privacy early, offers a scoped pilot, and says when a simpler solution would work. Guaranteed accuracy numbers before seeing your data are a strong sign the agency is not credible.',
      },
      {
        q: 'What is a reasonable timeline for an AI pilot?',
        a: 'A reasonable timeline for an AI pilot on one well-defined process is a few weeks, commonly two to eight depending on data readiness and integrations. That covers discovery, data preparation, building or fine-tuning, evaluation against a baseline and a limited live test. An AI pilot that cannot show measurable results within about two months usually needs a narrower scope.',
      },
      {
        q: 'Who should own a fine-tuned model built by an agency?',
        a: 'The client should own a fine-tuned model built by an agency, including the weights or adapter files, the training and eval datasets, the prompts and the code. Ownership is always subject to the base model’s license, such as Apache 2.0 or the Llama community license. Avoid contracts where the agency keeps the fine-tuned model or where you can only use it through the agency’s paid platform.',
      },
    ],
    related: [
      '/guides/fine-tuning-vs-rag-vs-prompting',
      '/guides/llm-fine-tuning-cost',
      '/guides/fine-tuning-data-privacy',
      '/services/custom-model-fine-tuning',
      '/services/enterprise-ai-adoption',
    ],
    keywords: [
      'how to choose an AI development partner',
      'AI fine-tuning company',
      'AI agent development company',
      'hire an AI agency',
      'AI consultant vs in-house team',
      'questions to ask an AI vendor',
      'AI vendor red flags',
      'AI partner checklist',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ */
  /* 4. Fine-tuning data privacy                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: 'fine-tuning-data-privacy',
    title: 'Is your data safe when you fine-tune an AI model?',
    seoTitle: 'Fine-Tuning Data Privacy: Is Your Data Safe?',
    description:
      'Is your data safe when you fine-tune an AI model? Where data goes, provider policies, self-hosting, PII scrubbing, leakage risk, DPAs, BAAs and a checklist.',
    eyebrow: 'Guide · Privacy',
    answer:
      'Your data can be safe when you fine-tune an AI model, but safety depends on where training runs and what the contracts say. Major API providers state they do not train on business API data by default. For full control, scrub personal data, fine-tune an open-weight model inside your own cloud, and sign a DPA, plus a BAA for US health data.',
    facts: [
      'OpenAI, Anthropic and Google Cloud state that data sent through their business APIs is not used to train their general models by default; consumer chat apps can have different terms.',
      'Language models can memorize and reproduce rare strings from training data, as Carlini and colleagues showed in 2021 by extracting verbatim training text, including contact details, from GPT-2.',
      'Under GDPR Article 28, a processor handling personal data on your behalf must be bound by a written contract, usually called a data processing agreement (DPA).',
      'Under HIPAA, a business associate agreement (BAA) must be in place before a vendor creates, receives, stores or transmits protected health information for a covered entity.',
      'The EU AI Act entered into force on 1 August 2024, with obligations phasing in from 2025 onward.',
      'Fine-tuning an open-weight model inside your own cloud account keeps training data, model weights and inference traffic in infrastructure you control.',
    ],
    body: [
      {
        type: 'p',
        text: 'Your data is the most valuable thing you will feed an AI model. It is also the thing most likely to end a project in a security review. The good news: fine-tuning can be done safely, even with regulated data. You just have to know where the data travels and who is allowed to touch it.',
      },
      { type: 'h2', text: 'Quick verdict: is fine-tuning safe for sensitive data?' },
      {
        type: 'p',
        text: 'Yes, with the right setup. The safest pattern is to remove personal data you do not need, fine-tune an [open-weight model](/glossary/open-weight-models) inside your own cloud account, and deploy it there. Nothing leaves your environment. The convenient pattern, uploading data to a major provider’s fine-tuning API, is also reasonable for most business data when the contract and settings are right.',
      },
      {
        type: 'callout',
        title: 'Rule of thumb',
        text: 'If you would not email the data to a vendor, do not upload it to one. Either scrub it first, or bring the model to the data by fine-tuning inside your own environment.',
      },
      { type: 'h2', text: 'Where does your data go when you fine-tune a model?' },
      { type: 'p', text: 'Fine-tuning touches data in four places, and each one needs a decision.' },
      {
        type: 'ol',
        items: [
          '**The training files.** Your examples are uploaded to wherever training runs: a provider’s platform, a GPU cloud or your own account. Ask how long they are stored and how deletion works.',
          '**The training job.** Compute reads the data, updates the model and writes logs. Logs can contain samples, so they need the same protection as the data.',
          '**The model itself.** Fine-tuned weights encode patterns from your data, and sometimes exact snippets. Treat the model as sensitive as the data that trained it.',
          '**Inference traffic.** Every prompt and answer in production is new data. The host may log it for monitoring or abuse checks.',
        ],
      },
      {
        type: 'p',
        text: 'Map all four on one page before you start. Many security reviews stall because nobody can say where the training files live, who can read the logs, or which region serves the model. A one-page data flow diagram answers all three and makes the review far faster.',
      },
      { type: 'h2', text: 'Do AI providers train on your fine-tuning data?' },
      {
        type: 'p',
        text: 'For business APIs, the major providers say no by default. OpenAI, Anthropic and Google Cloud each state that data submitted through their commercial APIs is not used to train their general models unless you opt in. A model you fine-tune on a provider’s platform is private to your account.',
      },
      {
        type: 'p',
        text: 'There are two caveats. First, consumer chat apps often have different terms, and some use conversations for training unless the user opts out. Staff pasting client data into a personal chatbot account is a bigger risk than a well-configured API. Second, providers typically keep API logs for a limited period, often around 30 days, for abuse monitoring.',
      },
      {
        type: 'p',
        text: 'Several providers offer zero-data-retention arrangements to eligible customers, meaning prompts and outputs are not stored after the request. Check whether those terms cover fine-tuning jobs, since training files must be stored for a job to run. Policies change, so read the current terms and your signed agreement. This guide is general information, not legal advice.',
      },
      { type: 'h2', text: 'Is self-hosting an open-weight model safer?' },
      {
        type: 'p',
        text: 'Self-hosting gives you the most control. You fine-tune a model such as Qwen, Llama, Mistral or gpt-oss on GPUs in your own cloud account, inside a VPC. A VPC (virtual private cloud) is a private, isolated network inside a cloud provider. Training data, weights and inference traffic stay within boundaries your security team already audits.',
      },
      {
        type: 'p',
        text: 'Self-hosting also helps with data residency, the requirement that data stays in a specific country or region. You choose the region. Managed services such as Amazon Bedrock and Google Vertex AI offer regional processing and private networking too, which can be a sensible middle ground.',
      },
      {
        type: 'p',
        text: 'Self-hosting is not automatically secure. You now own patching, access control, encryption and monitoring. The difference is that the controls are yours to set and to verify. The guide to [open-source vs closed models](/guides/open-source-vs-closed-models-fine-tuning) covers the cost and quality side of this choice.',
      },
      { type: 'h2', text: 'Can a fine-tuned model leak your training data?' },
      {
        type: 'p',
        text: 'It can. Models can memorize rare strings, especially strings repeated in the data or seen over many training passes. Carlini and colleagues showed in 2021 that verbatim training text, including names and contact details, could be extracted from GPT-2. Larger models and duplicated examples raise the risk.',
      },
      {
        type: 'p',
        text: 'That is why PII scrubbing comes before training. PII scrubbing is the removal or masking of personally identifiable information, such as names, emails, phone numbers and ID numbers. Open-source tools like Microsoft Presidio detect common PII types, and a human should review a sample. Replace real values with consistent placeholders so the model still learns the pattern without the person.',
      },
      { type: 'p', text: 'Other proven mitigations:' },
      {
        type: 'ul',
        items: [
          '**Deduplicate** the dataset so no record appears many times.',
          '**Train for fewer epochs**, meaning fewer full passes through the data, which reduces memorization and [overfitting](/glossary/overfitting).',
          '**Test for leakage** by planting fake “canary” records and prompting the model to reveal them.',
          '**Filter outputs** in production with [guardrails](/glossary/guardrails) that block PII patterns.',
          '**Consider differential privacy** for highly sensitive data. It is a training method that mathematically limits what a model can reveal about any single record, usually at some cost to accuracy.',
        ],
      },
      {
        type: 'p',
        text: 'The right to erasure is the hard part. Under GDPR, people can ask for their personal data to be deleted, and removing one person from trained weights usually means retraining. Keeping personal data out of training sets in the first place avoids that problem entirely.',
      },
      { type: 'h2', text: 'What contracts do you need to fine-tune on private data?' },
      {
        type: 'table',
        caption: 'Common agreements for fine-tuning projects (general information, not legal advice)',
        head: ['Agreement', 'What it does', 'When you need it'],
        rows: [
          ['NDA', 'Keeps business information confidential', 'Before sharing any data or process details'],
          ['DPA (data processing agreement)', 'Sets how a processor handles personal data, as GDPR Article 28 requires', 'Whenever a vendor processes personal data for you'],
          ['BAA (business associate agreement)', 'Binds a vendor to HIPAA safeguards for protected health information', 'Any US health data from a covered entity or its business associates'],
          ['IP and ownership clause', 'Assigns weights, adapters, datasets and code to you', 'Every fine-tuning engagement'],
          ['SOC 2 Type II report', 'An independent audit of a vendor’s security controls over a period of time', 'Vendor due diligence, especially for enterprise buyers'],
        ],
      },
      {
        type: 'p',
        text: 'Model ownership deserves its own line in the contract. With an open-weight base, you should hold the fine-tuned weights or adapter files outright, subject to the base model’s license. With a closed provider, you control access to your tuned model, but it never leaves their platform. Spell out what happens to data and models when the engagement ends.',
      },
      {
        type: 'p',
        text: 'Ask every vendor for its subprocessor list: the other companies that may touch your data, such as the cloud host behind a GPU provider or a labeling service. GDPR expects you to know who they are, and a short list is easier to defend in an audit.',
      },
      {
        type: 'p',
        text: 'Regulation keeps moving. The EU AI Act entered into force in August 2024, with obligations phasing in from 2025 onward, and some dates have been under review. GDPR, HIPAA and sector rules in finance and law continue to apply in full.',
      },
      { type: 'h2', text: 'Security checklist for fine-tuning projects' },
      {
        type: 'table',
        head: ['Control', 'Question to answer', 'Good answer'],
        rows: [
          ['Data minimization', 'Do we need this field to train the model?', 'Only fields the task needs are included'],
          ['PII scrubbing', 'Is personal data removed or masked?', 'Automated detection plus human spot checks'],
          ['Location', 'Where do data, training and hosting live?', 'Named regions, in your account or a vetted provider'],
          ['Provider terms', 'Is our data used to train the provider’s models?', 'No, confirmed in writing'],
          ['Retention', 'How long are files and logs kept?', 'A defined period, with deletion on request'],
          ['Access', 'Who can see the data and the model?', 'Named people, least privilege, logged access'],
          ['Encryption', 'Is data encrypted at rest and in transit?', 'Yes, ideally with keys you manage'],
          ['Leakage testing', 'Can the model reveal training data?', 'Canary and extraction tests passed'],
          ['Contracts', 'Are NDA, DPA, BAA and ownership terms in place?', 'Signed before any data moves'],
          ['Exit plan', 'What happens at the end of the project?', 'Data deleted, weights and datasets handed over'],
        ],
      },
      { type: 'h2', text: 'How {{brand}} can help' },
      {
        type: 'p',
        text: '{{brand}} builds privacy into fine-tuning from the first call. We can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control. Our [fine-tuning datasets](/services/fine-tuning-datasets) work can include PII scrubbing and documentation your security team can review before anything is trained.',
      },
      {
        type: 'p',
        text: 'Working with regulated data in [healthcare](/industries/healthcare), [legal](/industries/legal) or [financial services](/industries/financial-services)? Take the [2-minute AI audit](/audit) or [tell us about it](/#contact). {{brand}} returns a plan, a price and an honest verdict within 24 hours.',
      },
    ],
    faqs: [
      {
        q: 'Does OpenAI use my fine-tuning data to train its models?',
        a: 'OpenAI states that data submitted through its API, including fine-tuning data, is not used to train its general models by default, and that fine-tuned models are available only to the organization that created them. Uploaded files stay stored until you delete them, and API logs may be kept for a limited period for abuse monitoring. Check OpenAI’s current terms and your agreement, since provider policies can change.',
      },
      {
        q: 'Is it safe to fine-tune a model on customer data?',
        a: 'Fine-tuning a model on customer data is safe when you minimize the data, scrub or mask personal information, train in a controlled environment, and have the right contracts in place. The main risks are vendor exposure, weak access controls and memorization, where a model reproduces rare training strings. Fine-tuning on customer data inside your own cloud, with leakage testing before launch, reduces all three risks.',
      },
      {
        q: 'Can I fine-tune an AI model on HIPAA-protected data?',
        a: 'You can fine-tune an AI model on HIPAA-protected health information if every vendor that touches the data has signed a business associate agreement and the setup meets HIPAA safeguards. Major cloud and model providers offer BAAs for eligible services, but not every feature is covered. Many teams de-identify the data first, or fine-tune an open-weight model inside a HIPAA-eligible cloud account they control.',
      },
      {
        q: 'Can a fine-tuned model leak personal data?',
        a: 'A fine-tuned model can leak personal data if that data was in the training set, especially when records are rare, duplicated or seen over many epochs. Research has shown verbatim training text can be extracted from language models. Prevent a fine-tuned model from leaking personal data by removing it before training, deduplicating, limiting epochs, testing with planted canary records and filtering outputs in production.',
      },
      {
        q: 'Who owns a fine-tuned model and its training data?',
        a: 'Ownership of a fine-tuned model depends on the base model and the contract. With an open-weight base such as Qwen or Llama, you can hold the fine-tuned weights outright, subject to the base license. With a closed provider, the tuned model stays on the vendor’s platform under your account. When a partner does the work, the contract should assign the weights, the training data and the code to you.',
      },
      {
        q: 'Does GDPR allow fine-tuning on personal data?',
        a: 'GDPR can allow fine-tuning on personal data when there is a lawful basis, a clear purpose, data minimization, transparency to the people involved and a DPA with every processor. Erasure requests are hard to honor once personal data is inside model weights, often requiring retraining. For that reason, many teams anonymize personal data before fine-tuning. A privacy lawyer should review your specific case.',
      },
    ],
    related: [
      '/guides/open-source-vs-closed-models-fine-tuning',
      '/guides/how-to-prepare-fine-tuning-dataset',
      '/services/custom-model-fine-tuning',
      '/industries/healthcare',
      '/glossary/open-weight-models',
    ],
    keywords: [
      'fine-tuning data privacy',
      'is my data safe with OpenAI fine-tuning',
      'does OpenAI train on API data',
      'fine-tune LLM on private data',
      'self-hosted LLM fine-tuning',
      'HIPAA compliant fine-tuning',
      'GDPR LLM training data',
      'remove PII before LLM training',
      'LLM training data leakage',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ */
  /* 5. AI agents vs automation tools                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: 'ai-agents-vs-automation-tools',
    title: 'AI agents vs automation tools (Zapier, Make, n8n): when to use which',
    seoTitle: 'AI Agents vs Zapier, Make and n8n: When to Use Which',
    description:
      'AI agents vs Zapier, Make and n8n: when fixed workflows win, when you need judgment, what each costs per run, and the hybrid pattern that works in production.',
    eyebrow: 'Guide · Automation',
    answer:
      'Use automation tools like Zapier, Make or n8n when the steps are fixed and the data is structured: they are cheap, fast and predictable. Use an AI agent when a step needs judgment, such as reading messy text, classifying intent or drafting a reply. The strongest systems are hybrid: an automation spine with AI steps only where judgment is needed.',
    facts: [
      'Workflow automation tools such as Zapier, Make and n8n run fixed, rule-based steps, so the same input produces the same output every time.',
      'Language model outputs can vary between runs even with identical input, so AI steps need validation, such as checking output against a JSON schema.',
      'Zapier, Make and n8n all now offer AI and agent features, so the real decision is where judgment sits in a workflow, not which platform to buy.',
      'n8n can be self-hosted under its fair-code Sustainable Use License, which keeps workflow data and credentials on servers you control.',
      'A rule-based automation step typically runs in milliseconds to a few seconds, while a language model call often takes several seconds and a multi-step agent run can take minutes.',
    ],
    body: [
      {
        type: 'p',
        text: 'Half the AI agents being built right now should have been a Zap. The other half are stuck because someone tried to write rules for work that needs judgment. Knowing which is which saves money, time and a lot of 2 a.m. alerts.',
      },
      { type: 'h2', text: 'Quick verdict: automation, AI agent or both?' },
      {
        type: 'p',
        text: 'If you can draw the process as a flowchart with no “it depends” boxes, use an automation tool. If a step needs someone to read, interpret or decide, that step needs an AI model. If both are true, and they usually are, build a hybrid.',
      },
      {
        type: 'callout',
        title: 'Rule of thumb',
        text: 'Automate the plumbing, use AI for the judgment. Every step that can be a rule should be a rule. Spend model calls only where a human would otherwise have to think.',
      },
      { type: 'h2', text: 'What is the difference between an AI agent and an automation tool?' },
      {
        type: 'p',
        text: 'A workflow automation tool is software that runs a fixed sequence of steps when a trigger fires. Zapier, Make and n8n connect thousands of apps this way. “When a form is submitted, add a row to the sheet, create a CRM contact and post a Slack alert” is a classic automation.',
      },
      {
        type: 'p',
        text: 'An [AI agent](/glossary/ai-agent) is a language model that decides its own next steps toward a goal, calling tools as it goes. Instead of following a fixed path, it reads the situation and chooses. That makes an agent good at messy inputs and bad at guaranteeing the same result twice.',
      },
      {
        type: 'p',
        text: 'The line has blurred. Zapier, Make and n8n all ship AI steps and agent features now, and agent frameworks can call automation tools. So the useful question is not which product to buy. It is which steps in your process need judgment.',
      },
      { type: 'h2', text: 'When should you use Zapier, Make or n8n?' },
      {
        type: 'p',
        text: 'Use a deterministic workflow, one that produces the same output for the same input every time, when:',
      },
      {
        type: 'ul',
        items: [
          'The steps and rules are known in advance.',
          'Inputs are structured: form fields, database rows, webhook payloads.',
          'Errors are expensive and must be traceable to a specific rule.',
          'Volume is high and each run must be cheap and fast.',
          'Compliance requires you to show exactly why something happened.',
        ],
      },
      {
        type: 'p',
        text: 'Typical examples: syncing new orders to accounting, creating CRM records from forms, sending scheduled reports, moving files between folders and routing alerts by fixed criteria. These need no intelligence. Adding a model makes them slower, costlier and less predictable.',
      },
      {
        type: 'p',
        text: 'Among the three, Zapier has the largest integration library and the gentlest learning curve. Make offers a visual builder with fine control over branching. n8n appeals to technical teams because it can be self-hosted and extended with code.',
      },
      { type: 'h2', text: 'When do you need an AI agent instead?' },
      {
        type: 'p',
        text: 'Use an AI step or agent when a person currently has to read and decide. Signals include free-text inputs, many edge cases, rules nobody can fully write down, and work that changes shape from case to case.',
      },
      {
        type: 'ul',
        items: [
          'Reading an email and working out what the customer actually wants.',
          'Extracting fields from invoices or contracts that arrive in different layouts.',
          'Researching a lead across several sources and summarizing fit.',
          'Drafting a reply in your house style from a knowledge base.',
          'Judging whether a support ticket is urgent, angry or a churn risk.',
        ],
      },
      {
        type: 'p',
        text: 'A full agent, one that plans several steps and chooses its own tools through [tool calling](/glossary/tool-calling), is warranted when the path really varies, as in research or investigations. For a single judgment call, one model call inside a workflow is usually enough and far easier to test.',
      },
      { type: 'h2', text: 'How do costs per run compare?' },
      {
        type: 'p',
        text: 'Automation platforms bill per task, operation or execution. As of late 2026, published plans work out to roughly a tenth of a cent to a few cents per step, getting cheaper at higher tiers. A self-hosted n8n instance costs only the server it runs on, plus the time to maintain it.',
      },
      {
        type: 'p',
        text: 'AI steps add model fees, priced per token (a chunk of text of roughly three quarters of a word). A single classification or extraction call on a small model often costs a fraction of a cent. A drafting step on a frontier model might cost one to five cents. A multi-step agent run can cost tens of cents or more, because each step re-reads a growing context.',
      },
      {
        type: 'table',
        caption: 'Rough cost and speed per run. Assumptions: late 2026 list prices and typical prompt sizes. Prices vary by plan and change often.',
        head: ['Step type', 'Typical cost per run', 'Typical speed', 'Output consistency'],
        rows: [
          ['Automation step (Zapier, Make, n8n)', 'About $0.001 to $0.03', 'Milliseconds to a few seconds', 'Identical every time'],
          ['Single AI call, small model', 'Under $0.001 to about $0.005', '1 to 5 seconds', 'High with a strict output schema'],
          ['Single AI call, frontier model', 'About $0.01 to $0.05', '2 to 20 seconds', 'High with a strict output schema'],
          ['Multi-step agent run', 'About $0.02 to $1 or more', '30 seconds to several minutes', 'Variable, needs evals'],
        ],
      },
      {
        type: 'p',
        text: 'Compare cost per correct outcome, not cost per run. An AI step that costs three cents and saves four minutes of staff time is cheap. An AI step that costs three cents to do what a free rule could do is waste.',
      },
      { type: 'h2', text: 'Which is more reliable: AI agents or automation?' },
      {
        type: 'p',
        text: 'Rule-based automations fail loudly and predictably: an API is down, a field is missing, a rule did not match. You fix the cause once and it stays fixed.',
      },
      {
        type: 'p',
        text: 'AI steps fail quietly. A model can misread an email, invent a detail (a [hallucination](/glossary/hallucination)), or return badly formatted output. Outputs also vary between runs. You manage this with structured outputs validated against a schema, confidence thresholds, retries, [guardrails](/glossary/guardrails) and test sets you re-run on every change.',
      },
      {
        type: 'p',
        text: 'The practical result: put AI steps where an occasional, caught mistake is acceptable, and put rules where it is not. Reliability also falls as agent runs get longer, because small errors compound across steps.',
      },
      { type: 'h2', text: 'The hybrid pattern: an automation spine with AI agent steps' },
      {
        type: 'p',
        text: 'The most reliable production systems use a workflow tool or orchestration code as the spine and call an AI model only at judgment points. The spine handles triggers, data lookups, routing, retries, logging and writes to your systems. The AI handles reading, deciding and drafting. Here is a typical support flow:',
      },
      {
        type: 'ol',
        items: [
          '**Trigger (automation).** A new email arrives in the support inbox.',
          '**Enrich (automation).** Look up the customer, plan and recent orders by email address.',
          '**Classify (AI step).** A small model labels intent, urgency and sentiment, returning strict JSON.',
          '**Validate (automation).** Check the JSON against the schema. If confidence is low, route to a human queue.',
          '**Draft (AI step).** A larger model drafts a reply grounded in the help center and the order data.',
          '**Approve (rule or human).** Auto-send for low-risk intents like order status. Queue everything else for review.',
          '**Log (automation).** Write the outcome, cost and timing to a dashboard.',
        ],
      },
      {
        type: 'p',
        text: 'Two AI steps, five rule steps. Each AI step has one narrow job, which makes it cheap, testable and easy to swap for a fine-tuned small model later if volume grows. For larger systems with several roles, see [how to build an AI agent team](/guides/ai-agents-for-business-operations).',
      },
      { type: 'h2', text: 'Decision table: which approach fits your process?' },
      {
        type: 'table',
        head: ['Situation', 'Use', 'Reason'],
        rows: [
          ['Fixed steps, structured data', 'Automation tool', 'Cheapest, fastest and fully predictable'],
          ['One judgment call inside a known process', 'Automation plus one AI step', 'Judgment where needed, rules everywhere else'],
          ['Messy documents into structured data', 'Automation plus AI extraction with schema checks', 'Models read layouts that rules cannot'],
          ['Open-ended research or investigation', 'AI agent', 'The path changes case by case'],
          ['High-stakes, irreversible actions', 'Automation with human approval', 'Traceable rules and a person on the trigger'],
          ['Data must stay on your servers', 'Self-hosted n8n or custom code with a self-hosted model', 'Nothing leaves your environment'],
          ['Very high volume of one judgment task', 'Hybrid with a fine-tuned small model', 'Lower cost per call than a frontier API'],
        ],
      },
      { type: 'h2', text: 'How {{brand}} can help' },
      {
        type: 'p',
        text: "{{brand}} builds [automation and AI adoption projects](/services/enterprise-ai-adoption) on Zapier, Make and n8n, and [AI agent systems](/services/ai-agent-swarms) where judgment is the bottleneck. We'll tell you which steps need a model and which need a rule. If plain automation is enough, we'll say so.",
      },
      {
        type: 'p',
        text: 'Take the [2-minute AI audit](/audit) to map your manual work, or [book a call](/#contact). {{brand}} returns a plan, a price and an honest verdict within 24 hours.',
      },
    ],
    faqs: [
      {
        q: 'Is n8n better than Zapier for AI agents?',
        a: 'n8n and Zapier both support AI agent steps, so the better choice depends on your team. n8n suits technical teams that want self-hosting, custom code and more control over data and cost per execution. Zapier suits non-technical teams that want the largest library of app integrations and the fastest setup. Make sits between them, with a visual builder and per-operation pricing.',
      },
      {
        q: 'Can Zapier replace an AI agent?',
        a: 'Zapier can replace an AI agent when the process is a fixed sequence of steps with clear rules, and Zapier’s own AI steps can handle single judgment calls such as classification or drafting. Zapier is less suited to open-ended tasks where the path changes case by case, such as multi-source research or investigations. Those tasks need an AI agent that plans its own steps, ideally called from the workflow.',
      },
      {
        q: 'Are AI agents more expensive than automation tools?',
        a: 'AI agents usually cost more per run than automation tools. An automation step typically costs a fraction of a cent to a few cents, while a multi-step AI agent run can cost tens of cents or more in model fees. AI agents are worth the extra cost when they replace minutes of skilled human work, and wasteful when a simple rule would do the same job.',
      },
      {
        q: 'What is a hybrid automation and AI agent workflow?',
        a: 'A hybrid automation and AI agent workflow uses a rule-based tool such as Zapier, Make, n8n or custom code for triggers, data lookups, routing and logging, and calls an AI model only at steps that need judgment, such as classifying intent or drafting a reply. The hybrid pattern keeps costs low and behavior predictable while still handling messy, unstructured inputs.',
      },
      {
        q: 'Are AI agents reliable enough for business processes?',
        a: 'AI agents are reliable enough for business processes when they are scoped narrowly, validated with structured outputs and tested against a set of real cases before launch. AI agent reliability drops as tasks get longer, because small errors compound across steps. Keep human approval on irreversible actions, monitor live results, and re-run tests whenever the model, prompt or tools change.',
      },
      {
        q: 'Should I self-host n8n for privacy?',
        a: 'Self-hosting n8n keeps workflow data and credentials on servers you control, which helps with privacy, data residency and compliance reviews. The trade-off is that your team handles updates, backups, security and uptime. If AI steps call an external model API, that data still leaves your servers, so pair self-hosted n8n with a self-hosted model or a contractually covered API for sensitive workloads.',
      },
    ],
    related: [
      '/guides/ai-agents-for-business-operations',
      '/services/enterprise-ai-adoption',
      '/services/ai-agent-swarms',
      '/glossary/ai-agent',
      '/glossary/tool-calling',
    ],
    keywords: [
      'AI agents vs automation tools',
      'AI agents vs Zapier',
      'n8n vs AI agents',
      'Zapier vs Make vs n8n for AI',
      'when to use AI agents',
      'workflow automation vs AI agent',
      'AI automation cost per run',
      'hybrid AI automation workflow',
    ],
    updated: '2026-10-27',
  },
];
