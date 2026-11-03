import type { ServiceDoc } from './types';

/*
 * Service pages: one doc per slug in SERVICE_SLUGS, in the same order.
 * serviceIndex points at the matching card in data/services.ts (0-9).
 * Write {{brand}}, never the literal name. No invented clients, results or prices.
 */

export const serviceDocs: ServiceDoc[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: 'custom-model-fine-tuning',
    serviceIndex: 0,
    title: 'LLM fine-tuning services that make a model think like your best expert',
    seoTitle: 'Custom LLM Fine-Tuning Services for Business',
    description:
      'Custom LLM fine-tuning services: we train open or hosted models on your data for accurate answers, strict formats and lower cost per call. Pilot in weeks.',
    eyebrow: 'Service · 01',
    answer:
      'An LLM fine-tuning service trains an existing language model further on your own examples, so it answers in your formats, terminology and judgment without long prompts. Most business projects use LoRA adapters on an open-weight model and a few hundred to a few thousand high-quality examples. Expect a scoped pilot, an evaluation against your current baseline and a model you own in two to six weeks.',
    facts: [
      "Fine-tuning is further training of a pre-trained model on task-specific examples, which changes the model's weights rather than its instructions.",
      'The LoRA paper (Hu et al., 2021) reported cutting trainable parameters by up to 10,000 times and GPU memory by about 3 times compared with full fine-tuning of GPT-3 175B.',
      'QLoRA (Dettmers et al., 2023) showed that a 65-billion-parameter model can be fine-tuned on a single 48 GB GPU by using 4-bit quantization.',
      'The LIMA study (Zhou et al., 2023) found that 1,000 carefully curated examples produced strong instruction-following in a 65B model, which is why data quality usually beats data volume.',
      'A LoRA adapter for a 7-8B model is typically tens to a few hundred megabytes, versus roughly 14-16 GB for the full model weights in 16-bit precision.',
      'Compute for a LoRA run on a 7-8B open-weight model with a few thousand examples often costs tens to low hundreds of dollars, assuming rented H100-class GPUs at roughly $2-8 per hour. Prices vary by provider and change often.',
    ],
    body: [
      { type: 'h2', text: 'What is LLM fine-tuning?' },
      {
        type: 'p',
        text: "[Fine-tuning](/glossary/fine-tuning) is additional training that adjusts a pre-trained language model's weights on your own examples, so it behaves the way your business needs. A prompt tells a model what to do. Fine-tuning changes what the model is.",
      },
      {
        type: 'p',
        text: 'Most projects today use [LoRA](/glossary/lora), short for Low-Rank Adaptation: a method that trains a small set of extra weights on top of a frozen base model. The LoRA paper (Hu et al., 2021) cut trainable parameters by up to 10,000 times versus full fine-tuning. That is why a custom model no longer needs a research lab budget.',
      },
      { type: 'h2', text: 'What problems does fine-tuning solve?' },
      {
        type: 'p',
        text: 'Fine-tuning earns its keep when a general model knows the world but not your work. It fixes behavior: tone, format, judgment calls and domain vocabulary that prompts cannot hold steady across thousands of calls. Signs you are ready for it:',
      },
      {
        type: 'ul',
        items: [
          'Your prompts run to pages of rules and the model still drifts from your format.',
          'Outputs must match a strict structure, such as a JSON schema, a claims summary or a clinical note template.',
          'You pay frontier-model prices for a narrow, repetitive task at high volume.',
          'You need the model to run privately, on infrastructure you control.',
          'Your experts keep correcting the same kinds of mistakes.',
        ],
      },
      { type: 'h2', text: 'How does a fine-tuning engagement work?' },
      {
        type: 'p',
        text: 'At {{brand}}, every fine-tuning project follows the same six steps, and each one ends with something you can inspect. Nothing moves forward on faith.',
      },
      {
        type: 'ol',
        items: [
          "**Scope and baseline.** We define the task, collect 50-100 real examples and measure how today's best prompt performs. That score is the bar to beat.",
          '**Data build.** We clean, label and, where gaps exist, synthesize training pairs, then hold out a test set the model never sees. This is where most of the work lives, so it often runs as a [fine-tuning dataset](/services/fine-tuning-datasets) project.',
          '**Model selection.** We pick an open-weight or hosted base model sized for your accuracy, speed and privacy needs, such as a Llama, Qwen, Mistral, Gemma or gpt-oss variant.',
          '**Training.** We run LoRA or QLoRA experiments, compare checkpoints and keep the best one.',
          '**Evaluation.** We score the model against the baseline with automated [evals](/glossary/llm-evals) plus expert review, and check that general skills did not regress.',
          '**Deployment and handover.** We deploy to your cloud or an inference provider you choose, then hand over weights, data, code and a retraining playbook.',
        ],
      },
      { type: 'h2', text: 'Fine-tuning vs prompting vs RAG: which one do you need?' },
      {
        type: 'p',
        text: 'Most teams should try the cheaper options first. The table shows where each approach wins and where it runs out of road.',
      },
      {
        type: 'table',
        caption: 'Fine-tuning compared with prompt engineering and retrieval',
        head: ['', 'Prompt engineering', 'RAG', 'Fine-tuning'],
        rows: [
          ['What it changes', 'The instructions', 'The facts the model can see', "The model's behavior and skills"],
          ['Best for', 'Quick wins, low volume', 'Fresh or private knowledge', 'Consistent format, tone and judgment'],
          ['Upfront effort', 'Hours to days', 'Days to weeks', 'Weeks, mostly data work'],
          ['Cost per call at volume', 'Highest, long prompts every call', 'Medium, retrieved text adds tokens', 'Lowest, short prompts and often a smaller model'],
          ['Keeps up with new facts', 'Yes, edit the prompt', 'Yes, update the index', 'No, retrain or pair with RAG'],
          ['Runs fully private', 'Only on a private model', 'Only on a private model', 'Yes, on open-weight models'],
        ],
      },
      {
        type: 'p',
        text: 'The strongest systems often combine them: a fine-tuned model for behavior plus [RAG](/glossary/rag) for current facts. Our [fine-tuning vs RAG vs prompting guide](/guides/fine-tuning-vs-rag-vs-prompting) walks through the decision step by step.',
      },
      { type: 'h2', text: 'What does fine-tuning an LLM cost?' },
      {
        type: 'p',
        text: 'Compute is usually the smallest line item. A LoRA run on a 7-8 billion parameter model with a few thousand examples often costs tens to low hundreds of dollars in rented GPU time, assuming H100-class cards at roughly $2-8 per hour. Prices vary by provider and change often.',
      },
      {
        type: 'p',
        text: 'The real cost is data preparation and evaluation, which is expert time. Running the model afterwards matters too: a smaller fine-tuned model can be far cheaper per call than a frontier model with a long prompt. Use the [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator) for a ballpark before you talk to anyone.',
      },
      { type: 'h2', text: 'When should you not fine-tune a model?' },
      {
        type: 'p',
        text: 'Do not fine-tune to teach a model facts that change every week. Retrieval handles that better and cheaper. Do not fine-tune if you cannot produce a few hundred good examples or describe what a correct answer looks like.',
      },
      {
        type: 'p',
        text: 'And do not fine-tune because it sounds impressive. If a well-written prompt on a current frontier model already hits your quality bar at an acceptable cost, keep the prompt. If you do not need us, we will say so.',
      },
      { type: 'h2', text: 'Ready to find out if your use case qualifies?' },
      {
        type: 'p',
        text: 'Take the 2-minute [AI audit](/audit) and {{brand}} returns a plan, a price and an honest verdict within 24 hours. Bring your messiest, most repetitive task. That is exactly where a custom model pays for itself.',
      },
    ],
    faqs: [
      {
        q: 'How much data do I need to fine-tune an LLM?',
        a: "Most business fine-tuning projects need a few hundred to a few thousand high-quality examples, not millions. OpenAI's fine-tuning documentation notes clear improvements from as few as 50 to 100 well-crafted examples, and the LIMA study reached strong results with 1,000. Quality, consistency and coverage of edge cases matter far more than volume. Where real examples are thin, synthetic data generated from real cases and reviewed by experts can fill the gaps.",
      },
      {
        q: 'Is fine-tuning better than RAG?',
        a: 'Fine-tuning and retrieval-augmented generation (RAG) solve different problems, so neither is better in general. Fine-tuning changes how a model behaves: its format, tone, reasoning style and domain vocabulary. RAG changes what a model knows at answer time by fetching relevant documents. Use RAG for facts that change, fine-tuning for consistent behavior, and both together when you need a model that sounds like your expert and cites current sources.',
      },
      {
        q: 'How long does an LLM fine-tuning project take?',
        a: 'A focused LLM fine-tuning pilot usually ships in two to six weeks. The first one to two weeks go to scoping, baseline measurement and data preparation, which is where most of the effort sits. Training runs themselves take hours, not weeks. The rest is evaluation, iteration and deployment. Projects with messy or unlabeled source data take longer, because the dataset has to be built before any training starts.',
      },
      {
        q: 'Can a fine-tuned model run privately on our own servers?',
        a: 'Yes. A fine-tuned open-weight model, such as a Llama, Qwen, Mistral, Gemma or gpt-oss variant, can run entirely in your own cloud account or on your own hardware, so prompts and outputs never leave infrastructure you control. A 7-8B model quantized to 4 bits fits on a single modern GPU. {{brand}} can work inside your cloud and sign NDAs and DPAs before touching any data.',
      },
      {
        q: 'Will fine-tuning make the model forget its general skills?',
        a: 'Fine-tuning can degrade a model\'s general abilities, an effect called catastrophic forgetting, especially with full fine-tuning on narrow data. LoRA fine-tuning reduces the risk because the base weights stay frozen and the change lives in a small adapter. Good practice is to mix in general examples, keep learning rates modest and run regression evals on general tasks alongside the target task before any fine-tuned model ships.',
      },
    ],
    idealFor: [
      'Teams running a narrow, high-volume task where prompts drift or cost too much',
      'Regulated companies that need a private model on infrastructure they control',
      'Product teams that need strict output formats at low latency',
      'Founders whose edge is proprietary data or expert judgment',
    ],
    deliverables: [
      'A fine-tuned model checkpoint or LoRA adapter you own',
      'A versioned training dataset and a held-out test set',
      'An evaluation report against your current prompt baseline',
      'A deployed inference endpoint in your cloud or with a provider you choose',
      'Training and evaluation code with a retraining playbook',
      'A cost-per-call estimate at your expected volume',
    ],
    timeline: 'Pilot in 2-6 weeks',
    keywords: [
      'llm fine-tuning services',
      'custom llm fine-tuning',
      'fine-tune llm on company data',
      'llm fine-tuning company',
      'fine-tuning consulting',
      'custom ai model development',
      'lora fine-tuning service',
      'private llm fine-tuning',
    ],
    related: [
      '/services/fine-tuning-datasets',
      '/guides/fine-tuning-vs-rag-vs-prompting',
      '/guides/llm-fine-tuning-cost',
      '/guides/lora-qlora-explained',
      '/tools/fine-tuning-cost-calculator',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: 'ai-agent-swarms',
    serviceIndex: 1,
    title: 'AI agent teams that run your lead gen, outreach and support around the clock',
    seoTitle: 'AI Agent Development Services for Business Operations',
    description:
      'AI agent development for business operations: coordinated agents for lead gen, outreach and support, with human checkpoints and full logs. Pilot in weeks.',
    eyebrow: 'Service · 02',
    answer:
      'An AI agent swarm is a team of specialized AI agents that splits a business workflow, such as lead research, outreach or support triage, into roles and passes work between them. Each agent has one job, its own tools and clear limits, and humans approve anything risky. A first swarm usually covers one workflow with three to six agents and ships as a pilot in two to six weeks.',
    facts: [
      'An AI agent is software that uses a language model to decide which steps to take and which tools to call to reach a goal, rather than following a fixed script.',
      'Reliability compounds: if each step in a 10-step workflow succeeds 95% of the time, the whole chain succeeds only about 60% of the time, which is why agent systems need checkpoints and retries.',
      'Anthropic reported in 2025 that its multi-agent research system used roughly 15 times more tokens than a standard chat, so multi-agent designs have to earn their running cost.',
      'Gartner predicted in June 2025 that over 40% of agentic AI projects will be canceled by the end of 2027 because of rising costs, unclear business value or weak risk controls.',
      'In Moffatt v. Air Canada (2024), a Canadian tribunal held the airline liable for wrong information its website chatbot gave a customer.',
    ],
    body: [
      { type: 'h2', text: 'What is an AI agent swarm?' },
      {
        type: 'p',
        text: 'An [AI agent](/glossary/ai-agent) is software that uses a language model to plan steps and call tools, such as your CRM, inbox or help desk, to reach a goal. A swarm is a [multi-agent system](/glossary/multi-agent-system): several agents with narrow roles that hand work to each other.',
      },
      {
        type: 'p',
        text: 'Think of it as a small operations team that works around the clock. A researcher agent finds and qualifies leads. A writer agent drafts outreach. A triage agent sorts support tickets and drafts replies. A supervisor agent checks the work and routes exceptions to a human.',
      },
      { type: 'h2', text: 'What business problems do agent swarms solve?' },
      {
        type: 'p',
        text: 'Swarms fit work that is repetitive, rules-heavy and spread across several tools. That describes most of lead generation, first-line support and back-office admin. Signs you need one:',
      },
      {
        type: 'ul',
        items: [
          'Your team copies data between the CRM, spreadsheets and email for hours every week.',
          'Leads go cold because nobody researched them or replied within a day.',
          'Support queues spike after hours and on weekends.',
          'You tried Zapier-style automations, but they break whenever an input is messy.',
          'You want output to grow faster than headcount.',
        ],
      },
      { type: 'h2', text: 'How is an agent swarm built and deployed?' },
      {
        type: 'p',
        text: 'At {{brand}}, we build swarms in five steps and keep a human in the loop until the numbers say otherwise. Autonomy is earned, one step at a time.',
      },
      {
        type: 'ol',
        items: [
          '**Map the workflow.** We shadow the process, list every decision and tool, and mark which steps are safe to automate.',
          '**Design the roles.** Each agent gets one job, the minimum tools it needs and written rules for when to stop and ask.',
          '**Connect your tools.** We wire agents to your CRM, inbox, help desk and data through APIs, [tool calling](/glossary/tool-calling) and, where useful, MCP servers.',
          '**Add guardrails.** Approval steps, sending and spending limits, full logging and [guardrails](/glossary/guardrails) on every outbound action.',
          "**Pilot, measure, expand.** The swarm runs in shadow mode next to your team, we compare its output with theirs, then switch on autonomy step by step.",
        ],
      },
      {
        type: 'p',
        text: 'Under the hood, every swarm runs on the same orchestration, logging and evaluation foundations as our [multi-agent harnesses](/services/multi-agent-harnesses). That is the difference between a demo and a system you can depend on.',
      },
      { type: 'h2', text: 'Agent swarm vs hiring vs Zapier: what is the difference?' },
      {
        type: 'table',
        caption: 'An AI agent swarm compared with hiring and with workflow automation tools',
        head: ['', 'AI agent swarm', 'Hiring more staff', 'Zapier, Make or n8n workflows'],
        rows: [
          ['Handles messy inputs', 'Yes, reads and reasons over text', 'Yes', 'Poorly, needs clean, predictable data'],
          ['Hours of coverage', '24/7', 'Shift-based', '24/7'],
          ['Time to start', '2-6 weeks for a pilot', '1-3 months to hire and train', 'Days'],
          ['Judgment calls', 'Within written rules, escalates the rest', 'Strong', 'None, follows fixed rules'],
          ['Running cost', 'Model usage plus hosting, scales with volume', 'Salary and overhead, scales with headcount', 'Per-task or per-execution fees'],
          ['Best for', 'Multi-step work across several tools', 'Relationships, negotiation, novel problems', 'Simple, stable if-this-then-that tasks'],
        ],
      },
      {
        type: 'p',
        text: 'These options combine well. Many swarms use n8n or Make for plumbing and save agents for the steps that need reading and judgment. Our guide on [AI agents vs automation tools](/guides/ai-agents-vs-automation-tools) goes deeper on where the line sits.',
      },
      { type: 'h2', text: 'What does an AI agent swarm cost to run?' },
      {
        type: 'p',
        text: "Running cost is mostly model usage. Agent workflows burn more tokens than a single chat because agents read context, call tools and check each other's work. Anthropic reported in 2025 that its multi-agent research system used about 15 times the tokens of a chat.",
      },
      {
        type: 'p',
        text: 'The fix is design, not hope. Small or [fine-tuned models](/services/custom-model-fine-tuning) handle routine steps, frontier models handle the hard ones, and every agent runs on a budget with a hard stop.',
      },
      { type: 'h2', text: 'When should you not build an agent swarm?' },
      {
        type: 'p',
        text: 'Skip it if the process changes every week or nobody can explain how it works today. Agents automate a process. They do not invent one.',
      },
      {
        type: 'p',
        text: 'Skip it for a single, simple trigger-and-action task, where a Zapier workflow is cheaper and easier to own. And keep humans on anything where one wrong message is costly, such as pricing promises or legal statements. In Moffatt v. Air Canada (2024), a tribunal held the airline liable for its chatbot\'s wrong advice.',
      },
      { type: 'h2', text: 'Want a night shift that never clocks out?' },
      {
        type: 'p',
        text: 'Start with the 2-minute [AI audit](/audit). {{brand}} returns a plan, a price and an honest verdict within 24 hours, including which workflow to automate first and which to leave alone.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between an AI agent and a chatbot?',
        a: 'A chatbot answers messages in a conversation. An AI agent takes actions: it plans steps, calls tools such as a CRM, inbox or database, and works toward a goal with limited supervision. Many support chatbots are now agent-powered behind the scenes. The practical difference for a business is risk, because an AI agent can change records and send messages, so it needs permissions, limits and logs.',
      },
      {
        q: 'Can AI agents replace my sales or support team?',
        a: 'AI agents can take over the repetitive parts of sales and support, such as lead research, data entry, first drafts and ticket triage, but replacing a whole team is rarely the right goal. Customers still expect a human for complaints, negotiations and edge cases. Klarna said in 2024 that its AI assistant handled two-thirds of its customer service chats, then said in 2025 that customers should always be able to reach a human.',
      },
      {
        q: 'How do you stop AI agents from making costly mistakes?',
        a: 'AI agent mistakes are controlled by design, not trust. Each agent gets the minimum tool permissions it needs, hard limits on spending and sending, and written rules for when to escalate to a human. Every action is logged so errors can be traced and replayed. Before launch, agents run in shadow mode next to the team, and autonomy is switched on only for steps that meet an agreed accuracy bar.',
      },
      {
        q: 'Which tools can an AI agent swarm connect to?',
        a: 'An AI agent swarm can connect to most business software that has an API, including CRMs such as HubSpot and Salesforce, Gmail and Outlook, help desks such as Zendesk and Intercom, Slack, spreadsheets and databases. Connections use direct API calls, automation platforms such as n8n or Make, or Model Context Protocol (MCP) servers, an open standard for linking AI models to tools. Legacy systems without APIs need extra work.',
      },
      {
        q: 'How long does it take to deploy an AI agent swarm?',
        a: 'A focused AI agent swarm pilot covering one workflow usually ships in two to six weeks at {{brand}}. That includes mapping the process, building and connecting the agents, and a shadow-mode period where the swarm works alongside your team without acting alone. Broader rollouts happen in phases, one workflow at a time, so each stage proves its value before the next one begins.',
      },
    ],
    idealFor: [
      'Founders and operators buried in repetitive admin across several tools',
      'Sales teams that need faster lead research and follow-up',
      'Support leads facing after-hours and weekend ticket spikes',
      'SMB and mid-market companies that want output to grow faster than headcount',
    ],
    deliverables: [
      'A workflow map showing which steps are automated, assisted or left to humans',
      'A deployed agent swarm connected to your CRM, inbox or help desk',
      'Role definitions, permissions and escalation rules for every agent',
      'Logging and a review dashboard covering every agent action',
      "A shadow-mode report comparing the swarm's output with your team's",
      'A runbook for pausing, editing and extending the swarm',
    ],
    timeline: 'Pilot in 2-6 weeks, one workflow at a time',
    keywords: [
      'ai agent development services',
      'ai agents for business operations',
      'ai agent swarm',
      'multi-agent automation for business',
      'ai sales agent development',
      'ai customer support agents',
      'ai lead generation agents',
      'hire ai agent developer',
    ],
    related: [
      '/services/multi-agent-harnesses',
      '/guides/ai-agents-for-business-operations',
      '/guides/ai-agents-vs-automation-tools',
      '/services/enterprise-ai-adoption',
      '/glossary/ai-agent',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: 'domain-skills-system-files',
    serviceIndex: 2,
    title: "Turn your best people's expertise into skill files any AI agent can load in a second",
    seoTitle: 'Agent Skills and System Prompt Engineering Services',
    description:
      'We turn expert know-how into agent skill files, system prompts and playbooks that Claude, ChatGPT and in-house agents load on demand. Tested and versioned.',
    eyebrow: 'Service · 03',
    answer:
      "Domain skills and system files are structured documents, such as SKILL.md files, system prompts and playbooks, that package an expert's know-how so an AI agent can load and follow it on demand. They are the fastest way to make AI work like your team: no model training, usable within days and editable by non-engineers. A typical first library covers 5 to 15 of your most repeated tasks.",
    facts: [
      'A system prompt is the standing set of instructions a model receives before any user message, and it shapes every answer in a session.',
      'Anthropic introduced Agent Skills in October 2025: folders containing a SKILL.md file plus optional scripts and reference files that an agent loads only when a task needs them.',
      "With progressive disclosure, an agent keeps only each skill's name and short description in context, about 100 tokens per skill, and loads the full instructions on demand.",
      'The Model Context Protocol (MCP), an open standard introduced by Anthropic in November 2024, lets agents connect to tools and data through a common interface and is supported by OpenAI, Google and Microsoft products.',
      'The Lost in the Middle study (Liu et al., 2023) found that language models use information at the start and end of a long prompt more reliably than information buried in the middle.',
    ],
    body: [
      { type: 'h2', text: 'What are domain skills and system files?' },
      {
        type: 'p',
        text: 'A domain skill is a written, structured package of expert know-how that an AI agent loads when a task calls for it. It holds the steps, rules, examples and edge cases your best person carries in their head.',
      },
      {
        type: 'p',
        text: "System files is our umbrella term for the documents that steer AI at work: [system prompts](/glossary/system-prompt), skill files in Anthropic's SKILL.md format, AGENTS.md files for coding agents, style guides and decision playbooks. They are plain Markdown. Your team can read them, edit them and track every change in version control.",
      },
      { type: 'h2', text: 'What problem do skill files solve?' },
      {
        type: 'p',
        text: 'Most companies already use AI. The problem is that every employee prompts it differently, so quality depends on who typed the request. Meanwhile your real expertise stays locked in a few heads and a few chat histories.',
      },
      {
        type: 'p',
        text: 'One giant prompt is not the answer either. Research such as Lost in the Middle (Liu et al., 2023) found models use the start and end of a long prompt more reliably than the middle. Signs you need a skill library:',
      },
      {
        type: 'ul',
        items: [
          'Team members keep private prompt collections and results vary widely.',
          'New hires take months to learn judgment calls that could be written down.',
          'Your agents produce generic output because they lack your rules and examples.',
          'One expert is a bottleneck because every tricky case goes to them.',
          'You want AI behavior you can review, approve and audit like any other policy.',
        ],
      },
      { type: 'h2', text: 'How do you turn expertise into a skill file?' },
      {
        type: 'p',
        text: 'At {{brand}}, we run a structured extraction and testing process. Your experts give us hours, not weeks, and get their time back many times over.',
      },
      {
        type: 'ol',
        items: [
          '**Pick the tasks.** We rank recurring tasks by volume and value, then choose the first 5 to 15 to encode.',
          '**Interview and observe.** We record how your experts handle real cases, including the exceptions they rarely mention.',
          '**Write the skill.** Each skill gets a trigger description, step-by-step instructions, examples of good and bad output, and links to reference files or scripts.',
          '**Wire up tools.** Where a skill needs live data, we connect it through [Model Context Protocol](/glossary/model-context-protocol) servers or APIs.',
          '**Test it.** We run each skill against real cases, score the output with [evals](/glossary/llm-evals) and your experts, and close the gaps.',
          '**Version and govern.** Skills live in a Git repository with named owners, change history and a review rule for edits.',
        ],
      },
      { type: 'h2', text: 'Skill files vs long prompts vs fine-tuning: which should you use?' },
      {
        type: 'table',
        caption: 'Skill files compared with single long prompts and with fine-tuning',
        head: ['', 'Skill files', 'One long prompt', 'Fine-tuning'],
        rows: [
          ['What it is', 'Modular instructions loaded on demand', 'One block of instructions pasted every time', "Training that changes the model's weights"],
          ['Time to first result', 'Days', 'Hours', 'Weeks'],
          ['Who can edit it', 'Anyone who can write Markdown', 'Anyone, but changes are hard to track', 'Engineers, with a retraining run'],
          ['Context cost', 'Low, loads only what the task needs', 'High, the whole prompt on every call', 'Lowest, behavior lives in the weights'],
          ['Works across models', 'Yes, plain text any capable model can read', 'Mostly', 'No, tied to one base model'],
          ['Best for', 'Processes, judgment rules, house style', 'One-off or simple tasks', 'High-volume, narrow tasks at scale'],
        ],
      },
      {
        type: 'p',
        text: 'Skill files are often the smart first step before [custom model fine-tuning](/services/custom-model-fine-tuning). A tested skill library doubles as a specification, and its examples can seed a training dataset later.',
      },
      { type: 'h2', text: 'Where do skill files run?' },
      {
        type: 'p',
        text: 'The same Markdown instructions can be loaded into Claude, ChatGPT projects and custom GPTs, coding agents such as Claude Code, Codex and Cursor, and custom agents your team builds. Native skill support varies by tool and changes quickly, but plain text travels. You are not locked to one vendor.',
      },
      {
        type: 'p',
        text: 'Skill files also make [AI agent swarms](/services/ai-agent-swarms) sharper, because each agent loads exactly the playbook its role needs and nothing else.',
      },
      { type: 'h2', text: 'When are skill files not enough?' },
      {
        type: 'p',
        text: 'Skill files steer a model. They do not change what it can fundamentally do. If a model lacks the reasoning or vocabulary for your domain even with perfect instructions, you need fine-tuning or a stronger model.',
      },
      {
        type: 'p',
        text: 'They also do not replace retrieval. A skill file should say how to review a contract, not contain your whole contract archive, so pair skills with [RAG](/glossary/rag) for large or changing knowledge. And if your team only uses AI for the odd email draft, a shared prompt document is enough. We will tell you that up front.',
      },
      { type: 'h2', text: 'Ready to bottle what your best people know?' },
      {
        type: 'p',
        text: 'Take the 2-minute [AI audit](/audit). {{brand}} returns a plan, a price and an honest verdict within 24 hours, including which skills to write first. Your tribal knowledge, finally written down and put to work.',
      },
    ],
    faqs: [
      {
        q: 'What is a SKILL.md file?',
        a: 'A SKILL.md file is a Markdown document that defines an Agent Skill, a format Anthropic introduced in October 2025. It starts with a short name and description that tell the agent when to use it, followed by detailed instructions, examples and links to optional scripts or reference files. The agent reads the full SKILL.md file only when a task matches, which keeps context small and behavior consistent.',
      },
      {
        q: 'Are skill files the same as prompts?',
        a: 'Skill files are prompts that are built and managed like software. A typical prompt is written once and pasted into a chat. A skill file is modular, loaded only when relevant, tested against real cases, owned by a named person and tracked in version control. The difference shows up at scale, when dozens of people and agents need to follow the same rules in the same way.',
      },
      {
        q: 'Do skill files work with ChatGPT and Gemini, or only with Claude?',
        a: 'Skill files are plain Markdown, so the instructions work with any capable language model, including ChatGPT, Gemini, Claude and open-weight models. Native support for loading skills automatically varies by product and changes quickly. Where a tool lacks native support, the same content can go into a system prompt, a custom GPT, a project knowledge file or a custom agent, so the investment is not locked to one vendor.',
      },
      {
        q: 'How long does it take to build a library of AI skill files?',
        a: 'A first library of 5 to 15 AI skill files usually takes two to four weeks with {{brand}}, depending on how many experts need interviewing and how complex the tasks are. A single skill for a well-documented process can be drafted and tested in a day or two. Maintenance is light: owners update a skill when a policy or process changes, the same way they would update a handbook.',
      },
      {
        q: 'Is it safe to put company know-how into skill files?',
        a: "Skill files are as safe as the place they are stored and the tools they are loaded into. Keep skill files in a private repository with access controls, and never write secrets such as passwords or API keys into them. When skills run on third-party AI products, check that the vendor's business or enterprise terms exclude your data from model training, or run skills on models you host yourself.",
      },
    ],
    idealFor: [
      'Companies where a few experts are the bottleneck for every hard case',
      'Teams already using Claude, ChatGPT or coding agents with inconsistent results',
      'Operations and support leads standardizing how AI handles their processes',
      'Consultancies and agencies packaging their methods for repeatable delivery',
    ],
    deliverables: [
      'A library of tested skill files in your own Git repository',
      'Production system prompts for each assistant or agent role',
      'An AGENTS.md or equivalent project file for coding agents',
      'MCP server or API connections for skills that need live data',
      'An evaluation set of real cases with expected outputs for each skill',
      'A governance guide covering ownership, review and updates',
    ],
    timeline: 'First skills in 1-2 weeks, full library in 2-4 weeks',
    keywords: [
      'agent skills development',
      'claude skills consulting',
      'system prompt engineering services',
      'prompt engineering consulting',
      'ai knowledge management for business',
      'skill.md files',
      'custom gpt development',
      'ai playbook development',
    ],
    related: [
      '/services/ai-agent-swarms',
      '/services/custom-model-fine-tuning',
      '/glossary/system-prompt',
      '/glossary/model-context-protocol',
      '/services/micro-agency-ai-systems',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: 'enterprise-ai-adoption',
    serviceIndex: 3,
    title: 'Enterprise AI adoption consulting that turns manual grind into pipelines that run themselves',
    seoTitle: 'Enterprise AI Adoption Consulting Services',
    description:
      'AI adoption consulting for SMB and mid-market firms: we audit manual work, pick the processes worth automating and ship pipelines your team actually uses.',
    eyebrow: 'Service · 04',
    answer:
      'Enterprise AI adoption consulting moves a company from scattered AI experiments to automated processes that save measurable time. It starts with an audit of manual work, ranks processes by value and risk, then ships one or two automations as a pilot in two to six weeks, with policy and training so staff keep using them. The bottleneck is rarely the AI. It is process, data and ownership.',
    facts: [
      "Microsoft and LinkedIn's 2024 Work Trend Index found that 75% of knowledge workers already used generative AI at work, and 78% of those users brought their own AI tools rather than company-provided ones.",
      "McKinsey's 2025 State of AI survey found that most organizations use AI in at least one business function, but only about a third report scaling it across the enterprise.",
      'Gartner predicted in 2024 that at least 30% of generative AI projects would be abandoned after proof of concept by the end of 2025, citing poor data quality, weak risk controls, rising costs or unclear value.',
      'The NIST AI Risk Management Framework (2023) and the ISO/IEC 42001 standard (2023) are the most widely referenced frameworks for governing AI use inside organizations.',
      'The EU AI Act entered into force in August 2024 and phases in obligations over several years, and it can apply to companies outside the EU whose AI systems or outputs are used in the EU.',
    ],
    body: [
      { type: 'h2', text: 'What is enterprise AI adoption?' },
      {
        type: 'p',
        text: 'Enterprise AI adoption is the work of making AI part of how a company operates, not a tool a few enthusiasts open in a browser tab. It covers process redesign, automation, data access, governance and training.',
      },
      {
        type: 'p',
        text: 'The models are already good enough for most back-office work. What holds companies back is the org chart: unclear ownership, messy data, slow approval chains and staff who were never shown what good looks like.',
      },
      {
        type: 'p',
        text: 'The numbers back this up. Gartner predicted in 2024 that at least 30% of generative AI projects would be abandoned after proof of concept by the end of 2025, citing poor data quality, weak risk controls, rising costs or unclear value. None of those are model problems.',
      },
      { type: 'h2', text: 'What are the signs your company needs AI adoption help?' },
      {
        type: 'ul',
        items: [
          'Staff use personal ChatGPT or Claude accounts because there is no approved option.',
          'You ran AI pilots that impressed in a demo and then quietly died.',
          'Skilled people spend hours a week copying data between systems, reformatting documents or writing the same emails.',
          'Leadership wants an AI plan, but nobody owns it.',
          'Legal or IT has blocked AI use because there is no policy.',
        ],
      },
      {
        type: 'p',
        text: "If two or more sound familiar, you have an adoption problem, not a technology problem. You are also not alone: Microsoft and LinkedIn's 2024 Work Trend Index found 78% of AI users at work brought their own tools.",
      },
      { type: 'h2', text: 'How does an AI adoption engagement work?' },
      {
        type: 'p',
        text: 'At {{brand}}, adoption work follows five steps. Each step ends with a decision you make, not a slide deck you file away.',
      },
      {
        type: 'ol',
        items: [
          '**Audit the grind.** We interview teams and map where the hours go. Every candidate process gets a score for volume, value, risk and data readiness.',
          '**Pick the first two.** We choose one quick win and one high-value process, and agree on the metric that proves success, such as hours saved or turnaround time.',
          '**Build the pipelines.** We use Zapier, Make or n8n for plumbing, and [AI agents](/glossary/ai-agent) or [custom models](/services/custom-model-fine-tuning) where a step needs reading or judgment.',
          '**Set the rules.** We write an AI use policy, data handling rules and approval steps, aligned with frameworks such as the NIST AI RMF.',
          '**Train and hand over.** Teams learn the new workflow on their own data. Every pipeline gets a named owner and a runbook.',
        ],
      },
      { type: 'h2', text: 'Should you hire a partner, build an in-house team or buy AI tools?' },
      {
        type: 'table',
        caption: 'Three ways to adopt AI, compared',
        head: ['', 'Applied AI partner', 'Build an in-house AI team', 'Buy off-the-shelf AI tools'],
        rows: [
          ['Time to first result', '2-6 weeks', '6-12 months to hire and ramp up', 'Days, if the tool fits'],
          ['Fits your exact process', 'Yes, built around it', 'Yes, eventually', 'Partly, you adapt to the tool'],
          ['Upfront cost', 'Project fee', 'Salaries, recruiting and tooling', 'Per-seat subscriptions'],
          ['Long-term maintenance', 'Your team, after handover', 'Your team', 'The vendor'],
          ['Best for', 'Moving fast on specific processes', 'AI as a core, ongoing product capability', 'Common tasks such as meeting notes or writing help'],
        ],
      },
      {
        type: 'p',
        text: 'Most companies end up with all three: off-the-shelf tools for generic work, a partner to build the first custom systems, and a small internal team that owns them afterwards. Our guide on [how to choose an AI partner](/guides/how-to-choose-ai-fine-tuning-partner) lists the questions worth asking.',
      },
      { type: 'h2', text: 'Which processes should you automate first?' },
      {
        type: 'p',
        text: 'Start where volume is high, rules are clear and mistakes are cheap to catch. Good first targets include document intake and data extraction, report drafting, ticket triage, invoice matching and CRM clean-up.',
      },
      {
        type: 'p',
        text: 'Leave customer-facing promises, pricing decisions and anything regulated until the team trusts the system. For sector-specific examples, see how this works in [insurance](/industries/insurance), [financial services](/industries/financial-services) and [SaaS](/industries/saas).',
      },
      { type: 'h2', text: 'When should you not hire an AI adoption consultant?' },
      {
        type: 'p',
        text: 'Do not hire anyone if your team just needs licenses for a mainstream AI assistant and an hour of training. Do that first. It is cheap, and it surfaces the real use cases.',
      },
      {
        type: 'p',
        text: 'Do not start if no leader will own the outcome. Adoption fails without an owner, no matter who builds it. And if your core processes are about to change because of a merger or a new system rollout, wait until they settle.',
      },
      { type: 'h2', text: 'Ready to find where AI saves your team the most time?' },
      {
        type: 'p',
        text: 'Take the 2-minute [AI audit](/audit). {{brand}} returns a plan, a price and an honest verdict within 24 hours. If you do not need us, we will say so. It starts with one honest look at how the work gets done today.',
      },
    ],
    faqs: [
      {
        q: 'What does an AI adoption consultant actually do?',
        a: 'An AI adoption consultant finds the business processes where AI saves real time or money, builds the automations, and sets up the policy and training so staff keep using them. A good AI adoption engagement ends with working pipelines, named owners and measured results, not a strategy deck. The consultant should also say which processes are not worth automating yet, and why.',
      },
      {
        q: 'How do we measure the ROI of AI adoption?',
        a: 'The ROI of AI adoption is measured against a baseline taken before anything changes: hours spent per task, turnaround time, error rate and cost per transaction. After launch, the same metrics are tracked on the automated process, minus the running cost of models, tools and maintenance. Projects without a baseline cannot prove value, which is one reason many AI pilots stall after the demo.',
      },
      {
        q: 'Do we need an AI policy before we start?',
        a: 'An AI use policy should be in place before employees put company data into AI tools, and ideally before any pilot goes live. A practical AI policy covers approved tools, what data may and may not be shared, human review requirements and who owns each AI system. The NIST AI Risk Management Framework and ISO/IEC 42001 are useful starting points. This is general information, not legal advice.',
      },
      {
        q: 'Is our data safe in an AI adoption project?',
        a: "Data safety in an AI adoption project depends on where data is processed and who can access it. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control. Business tiers of major AI providers generally exclude customer data from model training by default, but terms differ, so each vendor's agreement should be checked before sensitive data is used.",
      },
      {
        q: 'Are Zapier, Make or n8n enough for AI automation?',
        a: 'Zapier, Make and n8n are enough for many AI automations, especially simple trigger-and-action flows with one model call in the middle. These platforms struggle when a process needs multi-step reasoning, messy inputs, long documents or careful error handling. Many production systems use an automation platform for plumbing and custom AI agents for the steps that need judgment, which keeps both cost and complexity down.',
      },
    ],
    idealFor: [
      'SMB and mid-market companies with heavy manual admin across teams',
      'COOs and heads of operations asked to deliver an AI plan',
      'Companies whose AI pilots stalled after the demo',
      'Regulated firms that need AI governance before scaling use',
    ],
    deliverables: [
      'A process audit ranking automation candidates by value, risk and readiness',
      'One or two production pipelines with measured before-and-after metrics',
      'An AI use policy and data handling rules for staff',
      'Runbooks and named owners for every automation',
      'Hands-on training sessions for the teams affected',
      'A 6-12 month adoption roadmap',
    ],
    timeline: 'Audit in 1-2 weeks, first pipelines in 2-6 weeks',
    keywords: [
      'enterprise ai adoption consulting',
      'ai consulting for small business',
      'ai transformation consulting',
      'ai automation agency',
      'business process automation with ai',
      'ai implementation services',
      'ai strategy consulting',
      'ai readiness assessment',
    ],
    related: [
      '/audit',
      '/services/ai-agent-swarms',
      '/guides/ai-agents-for-business-operations',
      '/guides/how-to-choose-ai-fine-tuning-partner',
      '/guides/fine-tuning-data-privacy',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ 05 */
  {
    slug: 'micro-agency-ai-systems',
    serviceIndex: 4,
    title: 'AI systems that let a two-person agency out-ship a team of twenty',
    seoTitle: 'AI Automation Services for Small Agencies and Solopreneurs',
    description:
      'We build the AI stack a solo founder or small agency runs on: coding agents, skill files and automated client workflows. Same headcount, far more output.',
    eyebrow: 'Service · 05',
    answer:
      'A micro-agency AI system is the set of AI assistants, coding agents, skill files and automations that lets a team of one to five people deliver like a much larger agency. It typically combines tools such as Claude, Codex and Cursor with custom workflows for sales, delivery and reporting. Core subscriptions list at roughly $20 to $200 per seat per month, and setup takes two to six weeks.',
    facts: [
      'Pro tiers of leading AI assistants and coding tools, such as Claude, ChatGPT and Cursor, list at roughly $20 to $200 per seat per month at the time of writing. Pricing changes often.',
      'Coding agents such as Claude Code, OpenAI Codex and Cursor can read a codebase, edit several files and run commands, which turns one developer into the reviewer of several parallel tasks.',
      "Plain-Markdown project files such as AGENTS.md and CLAUDE.md let coding agents load a team's conventions automatically at the start of each session.",
      'Agent workflows use far more model tokens than single chats, so heavy users can outgrow flat subscription limits and move part of their work to usage-based API billing.',
    ],
    body: [
      { type: 'h2', text: 'What is a micro-agency AI system?' },
      {
        type: 'p',
        text: 'A micro-agency AI system is an operating stack for a very small team: AI assistants, coding agents, reusable skill files and automations wired into one way of working. It takes over the work a traditional agency hires juniors for, such as research, first drafts, reporting and routine builds.',
      },
      {
        type: 'p',
        text: 'The point is not more tools. It is fewer, better-connected tools, with your methods written down so every [AI agent](/glossary/ai-agent) follows them the same way.',
      },
      {
        type: 'p',
        text: 'A typical stack has four layers: a general assistant for thinking and writing, a coding agent for building, an automation platform for handoffs between tools, and a shared library of instructions that tells every agent how your shop works.',
      },
      { type: 'h2', text: 'Who needs a micro-agency AI stack?' },
      {
        type: 'p',
        text: 'Solo founders, freelancers and agencies of one to ten people who sell expertise and have hit a capacity ceiling. Revenue is capped by hours, and hiring adds overhead faster than margin. Signs you are ready:',
      },
      {
        type: 'ul',
        items: [
          'You turn down work or stretch deadlines because you are at capacity.',
          'You pay for five AI subscriptions but still do most of the work by hand.',
          'Every client project starts from a blank page instead of a proven template.',
          'Reporting, proposals and admin eat a full day every week.',
          'You want to grow revenue without becoming a full-time manager.',
        ],
      },
      { type: 'h2', text: 'What goes into a micro-agency AI stack?' },
      {
        type: 'p',
        text: 'At {{brand}}, we build the stack around how you sell and deliver, not around whichever tool is trending. It comes in five parts.',
      },
      {
        type: 'ol',
        items: [
          '**Delivery audit.** We map one full client engagement, from lead to invoice, and time every step.',
          '**Core tools.** We choose and configure the assistants and coding agents that fit your work, such as Claude, Codex or Cursor, and cut the subscriptions you do not need.',
          '**Skill files.** We write your methods into [skill files and system prompts](/services/domain-skills-system-files) so every agent follows your process and your voice.',
          '**Automations.** We connect lead intake, proposals, onboarding, reporting and invoicing with agents and workflows that hand off to each other.',
          '**Templates and training.** You get reusable project templates and a working session on running the stack day to day.',
        ],
      },
      { type: 'h2', text: 'How does an AI stack compare with hiring or DIY tools?' },
      {
        type: 'table',
        caption: 'A micro-agency AI stack compared with hiring and with unstructured AI tool use',
        head: ['', 'Micro-agency AI stack', 'Hiring junior staff', 'DIY with off-the-shelf AI tools'],
        rows: [
          ['Monthly cost', 'Subscriptions and API usage, often hundreds of dollars', 'Salary and overhead, often thousands per person', 'Subscriptions only'],
          ['Time to productive', '2-6 weeks of setup', '2-3 months per hire', 'Immediate, but shallow'],
          ['Follows your methods', 'Yes, written into skill files', 'After training and review', 'Only if you prompt carefully every time'],
          ['Scales with demand', 'Mostly usage-based', 'In whole salaries', 'Limited by your own time'],
          ['Main risk', 'Quality drifts without review', 'Management load and turnover', 'Tool sprawl and inconsistent results'],
        ],
      },
      {
        type: 'p',
        text: 'None of this removes the need for your judgment. The stack does the volume. You do the taste, the client relationship and the final call.',
      },
      {
        type: 'p',
        text: 'Running costs stay modest. Pro tiers of tools such as Claude, ChatGPT and Cursor list at roughly $20 to $200 per seat per month at the time of writing, and heavy agent use can add usage-based API costs. We size the stack so you pay for what you use, not for five overlapping subscriptions.',
      },
      { type: 'h2', text: 'What can a small team realistically automate?' },
      {
        type: 'p',
        text: 'Good targets are research and briefs, first drafts of copy and code, QA checklists, client reporting, proposal assembly, meeting summaries and follow-ups. For content-heavy shops, an [AI content engine](/services/ai-content-engine) adds production pipelines for scripts, graphics and voice.',
      },
      {
        type: 'p',
        text: 'Coding agents deserve a warning label. They write plausible code fast, including plausible bugs, so review and tests stay non-negotiable. Agencies serving one market get the most from the stack when skills encode that niche, as in [marketing agencies](/industries/marketing-agencies) and [ecommerce](/industries/ecommerce).',
      },
      { type: 'h2', text: 'When is a micro-agency AI system the wrong move?' },
      {
        type: 'p',
        text: 'If you do not yet have a repeatable offer, automate nothing. Systems scale a process. They cannot find product-market fit for you.',
      },
      {
        type: 'p',
        text: 'If your clients pay for bespoke, high-touch judgment and you have more time than work, a stack will not fix your pipeline. Sales will. And if you only need help with one tool, a good tutorial is cheaper than us, and we will say so.',
      },
      { type: 'h2', text: 'Ready to see what a small team can do?' },
      {
        type: 'p',
        text: 'Take the 2-minute [AI audit](/audit) or [get in touch](/#contact). {{brand}} returns a plan, a price and an honest verdict within 24 hours. Same headcount, far more output.',
      },
    ],
    faqs: [
      {
        q: 'What AI tools does a small agency actually need?',
        a: 'Most small agencies need one strong general assistant such as Claude or ChatGPT, one coding agent such as Claude Code, Codex or Cursor if they build software, an automation platform such as n8n, Make or Zapier, and a shared place for skill files and templates. Extra subscriptions rarely add output. Consistent methods written into reusable instructions add far more to a small agency than another tool.',
      },
      {
        q: 'Can one person really run an agency with AI?',
        a: 'One person can run a profitable agency with AI when the offer is narrow and repeatable, because AI agents take over research, drafting, reporting and routine builds. The owner still handles sales, client relationships, quality review and final decisions. AI raises how much one person can deliver, but judgment still takes hours, so a one-person agency still has a capacity ceiling, just a much higher one.',
      },
      {
        q: 'How much does an AI stack cost for a solo founder?',
        a: 'An AI stack for a solo founder usually costs from under $100 to a few hundred dollars per month in subscriptions, with pro tiers of tools such as Claude, ChatGPT and Cursor listing at roughly $20 to $200 per seat. Heavy agent use can add usage-based API costs on top. Prices vary by provider and change often, so it pays to review AI spend quarterly and cancel overlapping tools.',
      },
      {
        q: 'Do agency clients care whether the work uses AI?',
        a: 'Many agency clients care more about results, confidentiality and accountability than about whether AI was used. Agencies should check client contracts for AI clauses, avoid putting confidential client data into tools whose terms allow training on it, and disclose AI use where a contract, platform rule or law requires it. A clear stance on AI review and data handling is becoming a selling point for agencies.',
      },
      {
        q: 'How long does it take to set up a micro-agency AI system?',
        a: 'Setting up a micro-agency AI system usually takes two to six weeks with {{brand}}. The first week maps one full client engagement and picks the tools. The following weeks build skill files, templates and automations, then test them on a live project. The stack keeps improving after launch, because every method that gets written down becomes something an agent can repeat.',
      },
    ],
    idealFor: [
      'Solo founders and freelancers who sell expertise and have hit a capacity ceiling',
      'Agencies of two to ten people in marketing, design, development or consulting',
      'Operators who want to grow revenue without adding management layers',
      'Technical founders who want coding agents set up properly',
    ],
    deliverables: [
      'A configured toolset of assistants, coding agents and automations, with redundant subscriptions cut',
      'A skill file library covering your core delivery methods',
      'Automated workflows for lead intake, proposals, onboarding and reporting',
      'Reusable client project templates',
      'AGENTS.md or CLAUDE.md project files for your code repositories',
      'A recorded training session and a one-page operating guide',
    ],
    timeline: 'Set up in 2-6 weeks',
    keywords: [
      'ai automation for small agencies',
      'ai tools for solopreneurs',
      'one person agency ai',
      'ai systems for freelancers',
      'ai agency automation setup',
      'claude code setup for agencies',
      'ai workflow automation for small business',
      'how to scale an agency with ai',
    ],
    related: [
      '/services/domain-skills-system-files',
      '/services/ai-content-engine',
      '/industries/marketing-agencies',
      '/guides/ai-agents-vs-automation-tools',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ 06 */
  {
    slug: 'ai-digital-products',
    serviceIndex: 5,
    title: 'Turn what you know into AI-built digital products that sell while you sleep',
    seoTitle: 'AI Digital Product Creation Services for Experts',
    description:
      'We turn expert know-how into sellable digital products: playbooks, templates, AI skill packs and setup guides, built and tested with AI, ready to launch.',
    eyebrow: 'Service · 06',
    answer:
      'AI digital product development turns your expertise into packaged, sellable assets, such as playbooks, templates, prompt and skill packs, Notion systems and setup guides, researched, drafted and tested with AI. A focused product usually takes two to six weeks from first interview to launch-ready files. Creator platforms such as Gumroad and Substack typically keep around 10% of revenue plus payment fees, so margins stay high once the product exists.',
    facts: [
      'A digital product is a downloadable or online asset, such as a template, guide, course or software tool, that can be sold repeatedly with no new production cost per sale.',
      'Creator platforms such as Gumroad and Substack typically keep around 10% of revenue, plus payment processing fees, at the time of writing. Terms change, so check current pricing.',
      'In the US, the FTC treats unsupported earnings claims as deceptive, so income promises in product marketing carry real legal risk.',
      'US Copyright Office guidance (2023) and its 2025 report on copyrightability say material generated by AI without sufficient human authorship is not protected by copyright.',
      'Products built around AI tools need regular updates, because model behavior and tool interfaces change several times a year.',
    ],
    body: [
      { type: 'h2', text: 'What is an AI digital product?' },
      {
        type: 'p',
        text: 'An AI digital product is a packaged piece of your expertise, such as a playbook, template set, skill pack or setup guide, that is researched, drafted and tested with AI and sold online. AI handles the heavy production. You supply the know-how that makes it worth buying.',
      },
      {
        type: 'p',
        text: "Popular formats include Notion operating systems, [prompt](/glossary/prompt-engineering) and [skill file](/services/domain-skills-system-files) packs for AI tools, step-by-step setup guides, swipe files, calculators and short courses. Many sell through Gumroad, Notion's template marketplace or a paid Substack tier.",
      },
      { type: 'h2', text: 'Who should build digital products with AI?' },
      {
        type: 'p',
        text: 'Consultants, operators, creators and agencies who answer the same questions over and over. If clients keep paying you to explain the same framework, that framework is a product. Signs you are ready:',
      },
      {
        type: 'ul',
        items: [
          'You have a method that works, but it lives in your head and in old client files.',
          'You want income that does not depend on billable hours.',
          'You have an audience, newsletter or client list, but nothing to sell them between projects.',
          'You have started the same guide three times and never finished it.',
        ],
      },
      {
        type: 'p',
        text: 'The best candidates already have proof: clients who got results, questions you answer every week, or a free resource people keep sharing. Those are demand signals, and they make the sales page far easier to write.',
      },
      { type: 'h2', text: 'How is an AI digital product built?' },
      {
        type: 'p',
        text: 'At {{brand}}, we run product builds in five stages, and you are in the room for the parts only you can do. The rest runs without you.',
      },
      {
        type: 'ol',
        items: [
          '**Extract.** We interview you and mine your existing material: decks, documents, recordings and past client deliverables.',
          '**Validate.** We check demand against what your audience asks for and what already sells in your niche, then pick one format and a price range to test.',
          '**Build.** AI drafts the structure, copy, templates and examples. Humans edit for accuracy and voice, and every claim gets checked, because AI models can [hallucinate](/glossary/hallucination): state false things with total confidence.',
          '**Test.** We run the product with real users or real data, for example by having an agent follow your setup guide end to end, and fix wherever it breaks.',
          '**Package.** You get launch-ready files, a sales page draft, product listings and a simple update plan.',
        ],
      },
      { type: 'h2', text: 'Should you build with an AI studio, write it yourself or hire a ghostwriter?' },
      {
        type: 'table',
        caption: 'Three ways to turn expertise into a digital product',
        head: ['', 'Built with an AI studio', 'Write it yourself', 'Hire a ghostwriter or course producer'],
        rows: [
          ['Time to launch', '2-6 weeks', 'Months, often never', '1-3 months'],
          ['Your time required', 'A few interviews and reviews', 'All of it', 'Interviews and reviews'],
          ['Tested for accuracy', 'Yes, by running it end to end', 'Depends on you', 'Varies'],
          ['Includes AI assets', 'Yes: skill files, prompts and agent setups', 'Only if you build them', 'Rarely'],
          ['Easy to update', 'Yes, source files and prompts included', 'Yes', 'Often means re-hiring'],
        ],
      },
      { type: 'h2', text: 'Does AI-made content hurt a digital product?' },
      {
        type: 'p',
        text: 'Buyers do not pay for words. They pay for a result. Generic AI filler is easy to spot and gets refunded. Products sell when they contain specific steps, real examples and judgment that only an expert could supply.',
      },
      {
        type: 'p',
        text: 'There is a legal angle too. US Copyright Office guidance says material generated by AI without meaningful human authorship is not protected by copyright. Substantial human selection, arrangement and editing strengthen your position, which is one more reason we keep you in the loop. This is general information, not legal advice.',
      },
      {
        type: 'p',
        text: 'Course-style products also have to teach, not just inform. If you are building for learners, the patterns we describe for [education](/industries/education) apply.',
      },
      { type: 'h2', text: 'When should you not build a digital product?' },
      {
        type: 'p',
        text: 'Skip it if you have no audience and no plan to build one. A great product with no traffic sells nothing, so pair it with an [AI content engine](/services/ai-content-engine) or wait until you have a list.',
      },
      {
        type: 'p',
        text: 'Skip it if your expertise changes faster than you can update it, or if the product would only repackage free information. And never sell on income promises. In the US, the FTC treats unsupported earnings claims as deceptive.',
      },
      { type: 'h2', text: 'Ready to make your expertise earn while you sleep?' },
      {
        type: 'p',
        text: 'Take the 2-minute [AI audit](/audit) or [tell us what you know](/#contact). {{brand}} returns a plan, a price and an honest verdict within 24 hours, including whether your idea is worth building at all.',
      },
    ],
    faqs: [
      {
        q: 'What kinds of digital products can AI help create?',
        a: 'AI can help create most knowledge-based digital products, including playbooks, templates, Notion systems, checklists, swipe files, short courses, setup guides, calculators, and prompt or skill packs for tools such as Claude and ChatGPT. AI speeds up research, drafting, formatting and testing. A digital product still needs real expertise, specific examples and human editing, because buyers pay for results they cannot get from a free chatbot answer.',
      },
      {
        q: 'Can I legally sell a digital product made with AI?',
        a: 'Selling a digital product made with AI is legal in most places, and marketplaces set their own rules, with some, such as Etsy, asking sellers to disclose AI use. The main risks are copyright, since purely AI-generated material is generally not protected in the US, and misleading claims, such as unsupported income promises. Adding substantial human authorship and honest marketing reduces both risks. This is general information, not legal advice.',
      },
      {
        q: 'How long does it take to build a digital product with AI?',
        a: 'Building a focused digital product with AI, such as a playbook, template set or skill pack, usually takes two to six weeks with {{brand}}. Most of that time goes into extracting the expert\'s method, validating demand and testing the product end to end. The AI drafting itself is fast. Larger products, such as full video courses, take longer because recording and editing add production time.',
      },
      {
        q: 'How should I price an AI-built digital product?',
        a: 'An AI-built digital product should be priced on the value of the result it delivers, not on the hours it took to make. Simple templates and checklists often sell for tens of dollars, while in-depth playbooks, toolkits and courses for professionals can sell for hundreds. Test a price with a small launch, compare similar products in your niche, and raise the price as reviews arrive.',
      },
      {
        q: 'Do I need an audience before launching a digital product?',
        a: 'An audience is not strictly required to launch a digital product, but it makes the first sales far easier. Products sold to an existing newsletter, client list or social following convert better than cold launches because trust already exists. Without an audience, plan a content or partnership strategy alongside the product, or start with a small, low-priced product that builds a list of buyers.',
      },
    ],
    idealFor: [
      'Consultants and operators with a proven method clients keep paying for',
      'Creators and newsletter writers with an audience but nothing to sell',
      'Agencies packaging their process into templates and toolkits',
      'Experts who want income that is not tied to billable hours',
    ],
    deliverables: [
      'Launch-ready product files: guides, templates, workbooks or skill packs',
      'Editable source files and the prompts used to build them',
      'A setup guide or walkthrough verified end to end',
      'A sales page draft and platform listings',
      'A pricing and launch test plan',
      'An update plan for keeping the product current',
    ],
    timeline: 'Launch-ready in 2-6 weeks',
    keywords: [
      'ai digital product creation',
      'create digital products with ai',
      'ai playbook development',
      'sell prompt packs',
      'notion template development service',
      'digital product agency',
      'turn expertise into digital product',
      'ai course creation service',
    ],
    related: [
      '/services/ai-content-engine',
      '/services/domain-skills-system-files',
      '/services/micro-agency-ai-systems',
      '/industries/education',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ 07 */
  {
    slug: 'multi-agent-harnesses',
    serviceIndex: 6,
    title: 'Multi-agent harnesses that keep AI agents reliable in production, not just in demos',
    seoTitle: 'Multi-Agent System Development and Orchestration Services',
    description:
      'We build multi-agent harnesses with orchestration, logging, retries, evals and human approvals, so AI agent systems behave in production, not just in demos.',
    eyebrow: 'Service · 07',
    answer:
      'A multi-agent harness is the orchestration layer that runs AI agents in production: it routes tasks, manages state, retries failures, logs every step, enforces permissions and scores output with automated evals. Without one, small errors compound. If each of 10 steps succeeds 95% of the time, the full run succeeds only about 60% of the time. A harness makes those failures visible, recoverable and testable.',
    facts: [
      'A multi-agent system is a design in which several AI agents with separate roles, tools or context cooperate on one task under some form of coordination.',
      'Errors compound across steps: at 95% reliability per step, a 10-step agent workflow completes correctly about 60% of the time, and at 99% per step about 90% of the time.',
      'Anthropic reported in 2025 that its multi-agent research system outperformed a single-agent setup by 90.2% on an internal research evaluation, while using roughly 15 times more tokens than a chat.',
      'The 2025 study Why Do Multi-Agent LLM Systems Fail? (Cemri et al.) catalogued 14 distinct failure modes, grouped into system design issues, inter-agent misalignment and weak task verification.',
      'OpenTelemetry, the open observability standard, defines semantic conventions for generative AI, so model calls, tool calls and token usage can be traced like any other service.',
    ],
    body: [
      { type: 'h2', text: 'What is a multi-agent harness?' },
      {
        type: 'p',
        text: 'A harness is the software around [AI agents](/glossary/ai-agent) that makes them dependable. It decides which agent runs next, passes state between them, retries what fails, records what happened and checks the result before anything reaches a customer.',
      },
      {
        type: 'p',
        text: 'In a [multi-agent system](/glossary/multi-agent-system), several agents split one job. The models get the attention, but the harness decides whether the system still works on day 100. Frameworks such as LangGraph provide the building blocks. The engineering is in how you use them.',
      },
      { type: 'h2', text: 'Why do multi-agent systems fail in production?' },
      {
        type: 'p',
        text: 'Demos run on happy paths. Production runs on everything else: malformed inputs, timeouts, rate limits, tools that return errors and models that occasionally ignore instructions.',
      },
      {
        type: 'p',
        text: "Errors also compound. At 95% reliability per step, a 10-step workflow succeeds about 60% of the time. A 2025 study by Cemri et al. catalogued 14 distinct ways multi-agent systems fail, from agents ignoring each other's output to stopping before the task is verified. Signs you need a harness:",
      },
      {
        type: 'ul',
        items: [
          'Your agent prototype shines in demos but fails unpredictably on real data.',
          'When something goes wrong, nobody can say which agent did what.',
          'Model or prompt changes break things you only hear about from customers.',
          'Token costs are rising and you cannot see where they go.',
          'Compliance or security asks for an audit trail you cannot produce.',
        ],
      },
      { type: 'h2', text: 'What goes into a production-grade agent harness?' },
      {
        type: 'p',
        text: 'At {{brand}}, every harness we ship has six layers. Skip any one of them and you are back to running a demo in production.',
      },
      {
        type: 'ol',
        items: [
          '**Orchestration.** A defined graph of agents and handoffs, built with LangGraph or a lean custom framework, with explicit state and checkpoints so runs can pause and resume.',
          '**Tool layer.** Typed [tool calling](/glossary/tool-calling) with permission scopes, plus MCP servers where a standard connection helps.',
          '**Reliability.** Retries with backoff, timeouts, fallbacks to alternate models, and idempotent actions so a retry never sends the same email twice.',
          '**Observability.** Traces for every model and tool call using OpenTelemetry, with token cost per run and per agent.',
          '**Evals.** A test suite of real cases scored automatically on every change, so [LLM evals](/glossary/llm-evals) catch regressions before release, not after.',
          '**Guardrails and approvals.** Input and output checks, [guardrails](/glossary/guardrails) on risky actions and human approval steps where the stakes require them.',
        ],
      },
      { type: 'h2', text: 'Should you build a custom harness, use a framework alone or use a no-code builder?' },
      {
        type: 'table',
        caption: 'Ways to run multi-agent systems, compared',
        head: ['', 'Custom harness', 'Framework alone (LangGraph, CrewAI and similar)', 'No-code agent builders'],
        rows: [
          ['Setup time', '2-6 weeks to a first production system', 'Days to a prototype, longer to production', 'Hours to a prototype'],
          ['Logging and tracing', 'Built in, exported to your monitoring', 'Available, but you wire it up', 'Basic, in the vendor dashboard'],
          ['Evals and regression tests', 'Included and run on every change', 'You build them', 'Limited or none'],
          ['Control over failure handling', 'Full', 'Full, if you write it', 'Limited to vendor options'],
          ['Runs on your infrastructure', 'Yes', 'Yes', 'Usually not'],
          ['Best for', 'Business-critical agent systems', 'Teams with strong in-house engineers', 'Simple internal assistants'],
        ],
      },
      {
        type: 'p',
        text: 'If your team already built on a framework, we can harden what exists rather than start over. Good code stays.',
      },
      { type: 'h2', text: 'Do you always need multiple agents?' },
      {
        type: 'p',
        text: 'No. A single well-equipped agent with good tools beats a crowd of agents for many tasks. Multi-agent designs help when work can run in parallel, when roles need separate context, or when one agent should check another.',
      },
      {
        type: 'p',
        text: 'They also cost more. Anthropic reported in 2025 that its multi-agent research system used about 15 times more tokens than a chat. We design the smallest system that hits your quality bar. Our [AI agent swarms](/services/ai-agent-swarms) for business operations run on this same harness.',
      },
      { type: 'h2', text: 'When should you not invest in a harness?' },
      {
        type: 'p',
        text: 'Skip it while you are still exploring whether agents can do the task at all. Prototype first, cheaply. A harness is for systems you have decided to depend on.',
      },
      {
        type: 'p',
        text: 'Skip it for a single model call inside an existing app, where standard application logging is enough. And if your team already runs mature LLM tracing and evals, you may only need a review, not a build.',
      },
      { type: 'h2', text: 'Want agents you can trust in production?' },
      {
        type: 'p',
        text: 'Take the 2-minute [AI audit](/audit) or [book a technical call](/#contact). {{brand}} returns a plan, a price and an honest verdict within 24 hours.',
      },
    ],
    faqs: [
      {
        q: 'What is an AI agent harness?',
        a: 'An AI agent harness is the code and infrastructure that runs AI agents reliably. It orchestrates which agent acts next, manages shared state, retries failed steps, enforces tool permissions, logs every model and tool call, and runs automated tests on the output. The model provides the intelligence. The harness provides control, so the agent system can be debugged, audited and improved instead of treated as a black box.',
      },
      {
        q: 'Is LangGraph enough to run AI agents in production?',
        a: 'LangGraph is a solid framework for building stateful agent workflows, with graphs, checkpoints and human-in-the-loop support. On its own, LangGraph is a toolkit rather than a finished production system. Teams still need evaluation suites, tracing and cost monitoring, permission controls, failure handling for every external tool, and deployment infrastructure. Whether to build that in-house or with a partner depends on engineering capacity.',
      },
      {
        q: 'How do you test AI agents before release?',
        a: 'AI agents are tested with an evaluation suite: a set of real or realistic cases with expected outcomes, scored automatically on every change to prompts, models or tools. Scoring combines exact checks, such as valid JSON or the correct tool choice, with model-graded rubrics and periodic human review. Agents also run in shadow mode on live traffic before acting alone, so failures surface without customer impact.',
      },
      {
        q: 'How do you control the cost of a multi-agent system?',
        a: 'The cost of a multi-agent system is controlled by measuring token use per agent and per run, then routing each step to the cheapest model that passes the evals. Routine steps can use small or fine-tuned models while hard reasoning goes to frontier models. Caching repeated context, capping steps per run and stopping loops early also matter. Without per-agent tracing, cost control is guesswork.',
      },
      {
        q: 'Can an existing agent system be fixed instead of rebuilt?',
        a: 'An existing agent system can usually be hardened rather than rebuilt. {{brand}} starts by tracing real runs to find where failures and costs come from, then adds evals and observability, tightens tool permissions, and adds retries and approval steps where they are missing. If the original design is sound, most of the code stays, and the in-house team keeps full ownership of the agent system.',
      },
    ],
    idealFor: [
      'CTOs and engineering leads moving agent prototypes into production',
      'Product teams whose agent features fail unpredictably with real users',
      'Regulated companies that need audit trails for AI actions',
      'Teams with rising, unexplained LLM costs',
    ],
    deliverables: [
      'An orchestration layer in your repository, with a documented agent graph and state model',
      'Tracing and cost dashboards built on OpenTelemetry',
      'An evaluation suite wired into your CI pipeline',
      'Retry, fallback and approval logic for every external action',
      'A permissions map for every agent and tool',
      'A runbook for incidents, model upgrades and adding new agents',
    ],
    timeline: 'Production harness in 2-6 weeks',
    keywords: [
      'multi-agent system development',
      'ai agent orchestration services',
      'langgraph development services',
      'llm observability',
      'ai agent evaluation',
      'production ai agents',
      'agent harness',
      'llmops consulting',
    ],
    related: [
      '/services/ai-agent-swarms',
      '/glossary/multi-agent-system',
      '/glossary/llm-evals',
      '/guides/ai-agents-for-business-operations',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ 08 */
  {
    slug: 'fine-tuning-datasets',
    serviceIndex: 7,
    title: 'Custom fine-tuning datasets built from your domain, because data is the whole game',
    seoTitle: 'Fine-Tuning Dataset Creation Services for LLMs',
    description:
      'We collect, clean, label and synthesize domain datasets for LLM fine-tuning and evals, with licensed sources, quality checks and full documentation.',
    eyebrow: 'Service · 08',
    answer:
      'A fine-tuning dataset is a curated set of example inputs and ideal outputs that teaches a language model a specific task, format or domain. For most business projects, a few hundred to a few thousand high-quality examples beat tens of thousands of noisy ones. Building one means sourcing, cleaning, labeling, deduplicating, synthesizing gaps and holding out a test set the model never sees.',
    facts: [
      'The LIMA study (Zhou et al., 2023) fine-tuned a 65B model on just 1,000 carefully curated examples and reported results competitive with models trained on far larger instruction datasets.',
      "OpenAI's fine-tuning documentation requires at least 10 examples and notes that clear improvements typically appear with 50 to 100 well-crafted examples.",
      'The phi-1 paper, Textbooks Are All You Need (Gunasekar et al., 2023), showed a 1.3B-parameter model trained on high-quality, partly synthetic data could rival much larger models on coding benchmarks.',
      'A study in Nature (Shumailov et al., 2024) showed that models trained repeatedly on their own generated data degrade over generations, an effect called model collapse, so synthetic data needs real-data anchors.',
      'Chat fine-tuning data is usually stored as JSONL, one training example per line, each holding a list of system, user and assistant messages.',
    ],
    body: [
      { type: 'h2', text: 'What is a fine-tuning dataset?' },
      {
        type: 'p',
        text: 'A fine-tuning dataset is a collection of training examples, each pairing an input with the output you want, used to teach a model a task through [supervised fine-tuning](/glossary/supervised-fine-tuning). For a support model, one example might be a customer message paired with your best agent\'s reply.',
      },
      {
        type: 'p',
        text: 'Preference datasets are a second type. They pair a better and a worse answer to the same prompt, and train models with methods such as [DPO](/glossary/dpo), Direct Preference Optimization (Rafailov et al., 2023).',
      },
      { type: 'h2', text: 'Why does data quality matter more than model choice?' },
      {
        type: 'p',
        text: 'A model learns exactly what the data shows it, mistakes included. Inconsistent labels teach inconsistent behavior. Duplicates teach the model to memorize. Gaps teach it to guess.',
      },
      {
        type: 'p',
        text: 'That is why small, clean datasets win. The LIMA study reached strong results with 1,000 curated examples. When a fine-tuned model disappoints, the cause is usually the data, not the training settings. Signs you need dataset help:',
      },
      {
        type: 'ul',
        items: [
          'Your source data is scattered across tickets, documents, emails and spreadsheets.',
          'You have plenty of raw data but no labeled examples of good output.',
          'Your first fine-tuning attempt underperformed and nobody is sure why.',
          'You need to train on sensitive data that must be de-identified first.',
          'You are an AI company that needs niche domain data you cannot buy off the shelf.',
        ],
      },
      { type: 'h2', text: 'How is a fine-tuning dataset built?' },
      {
        type: 'p',
        text: 'At {{brand}}, dataset work follows six steps, and every step is documented so the dataset can be audited and rebuilt. Data is the whole game, so we play it carefully.',
      },
      {
        type: 'ol',
        items: [
          '**Define the target.** We write labeling guidelines that describe a perfect output, with examples of good, acceptable and wrong answers.',
          '**Source.** We collect from your systems and from properly licensed public data, and log where every example came from.',
          '**Clean and protect.** We deduplicate, fix formatting and remove or mask personal data where needed.',
          '**Label.** Domain experts label or rewrite outputs in tools such as Label Studio, with overlap checks to measure agreement between labelers.',
          '**Synthesize gaps.** Where real examples are thin, we generate [synthetic data](/glossary/synthetic-data) from real seeds, then filter and review it.',
          '**Split and package.** We hold out a test set, export to JSONL or Hugging Face format, and write a dataset card covering sources, licenses and known limits.',
        ],
      },
      { type: 'h2', text: 'Should you build a custom dataset or use public data?' },
      {
        type: 'table',
        caption: 'A custom curated dataset compared with public datasets and raw company data',
        head: ['', 'Custom curated dataset', 'Public datasets (Hugging Face, Kaggle)', 'Raw company data, unprocessed'],
        rows: [
          ['Matches your task', 'Exactly, built for it', "Rarely, built for someone else's task", 'Partly, buried in noise'],
          ['Quality control', 'Labeling guidelines and agreement checks', 'Varies widely', 'None'],
          ['License and privacy', 'Documented and cleared', 'Check each license, some forbid commercial use', 'May contain personal data'],
          ['Effort', 'Weeks of expert work', 'Hours to download, more to adapt', 'None upfront, paid later in bad results'],
          ['Best use', 'Production fine-tuning and evals', 'Benchmarks, prototypes and general skills', 'Source material for a curated set'],
        ],
      },
      {
        type: 'p',
        text: 'The usual answer is a blend: your own data as the core, public data where licenses allow, and synthetic examples to fill the gaps.',
      },
      { type: 'h2', text: 'How much data do you need to fine-tune a model?' },
      {
        type: 'p',
        text: 'Less than most people think. Many business tasks improve with a few hundred to a few thousand examples. Narrow formatting tasks need fewer. Complex reasoning or a new language needs more.',
      },
      {
        type: 'p',
        text: 'Our guide on [how much data you need to fine-tune](/guides/how-much-data-to-fine-tune) goes deeper, and [how to prepare a fine-tuning dataset](/guides/how-to-prepare-fine-tuning-dataset) covers formats, splits and common mistakes.',
      },
      { type: 'h2', text: 'When should you not pay for a custom dataset?' },
      {
        type: 'p',
        text: 'Skip it if a public dataset already matches your task and its license allows your use. Skip it if retrieval would solve the problem, because a RAG index needs documents, not labeled examples.',
      },
      {
        type: 'p',
        text: 'And skip it if you have not tested a strong prompt yet. The examples you collect for a prompt baseline are often the first 100 rows of a future dataset. If that is all you need, we will say so.',
      },
      { type: 'h2', text: 'Need data that models actually learn from?' },
      {
        type: 'p',
        text: 'Take the 2-minute [AI audit](/audit). {{brand}} returns a plan, a price and an honest verdict within 24 hours. When the dataset is ready, [custom model fine-tuning](/services/custom-model-fine-tuning) is the natural next move.',
      },
    ],
    faqs: [
      {
        q: 'What format should fine-tuning data be in?',
        a: 'Fine-tuning data for chat models is usually stored as JSONL, a text file with one JSON object per line. Each object holds one training example as a list of messages with roles such as system, user and assistant. Preference data for methods such as DPO stores a prompt with a chosen and a rejected answer. Exact field names vary by provider and framework, so fine-tuning data should be validated against the target format.',
      },
      {
        q: 'Can I fine-tune a model on synthetic data?',
        a: 'Synthetic data can make up a large share of a fine-tuning dataset when it is generated from real examples, filtered for quality and reviewed by people who know the domain. Synthetic data is useful for covering rare cases and balancing categories. Training only on model-generated text is risky: a 2024 Nature study by Shumailov et al. showed repeated training on generated data degrades models over generations.',
      },
      {
        q: 'How do you keep personal data out of a training dataset?',
        a: 'Personal data is kept out of a training dataset by detecting and removing or masking it before training, using automated detection tools plus manual review for high-risk fields. Names, contact details, account numbers and health information are common targets. The safest approach is to process data inside your own cloud and log what was removed. The [fine-tuning data privacy guide](/guides/fine-tuning-data-privacy) covers more. This is general information, not legal advice.',
      },
      {
        q: 'Can public Hugging Face datasets be used for commercial fine-tuning?',
        a: 'Many public datasets on Hugging Face and Kaggle can be used for commercial fine-tuning, but not all of them. Licenses range from permissive terms, such as Apache 2.0 and CC BY, to non-commercial or research-only terms, and some datasets include content their creators had no right to share. Each public dataset\'s license and sources should be checked and recorded before it goes into a commercial model.',
      },
      {
        q: 'How long does it take to build a fine-tuning dataset?',
        a: 'Building a fine-tuning dataset usually takes two to six weeks at {{brand}}, depending on how scattered the source data is, how much expert labeling is needed and whether personal data must be removed. A first batch of a few hundred examples is often ready within two weeks, which allows an early training run to test the approach before the full fine-tuning dataset is finished.',
      },
    ],
    idealFor: [
      'Companies preparing to fine-tune a model on their own data',
      'AI and software companies that need niche domain data they cannot buy',
      'Teams whose first fine-tuning attempt underperformed',
      'Regulated businesses that need training data de-identified and documented',
    ],
    deliverables: [
      'A training dataset in JSONL or Hugging Face format',
      'A held-out evaluation set the model never trains on',
      'Labeling guidelines with worked examples',
      'A dataset card documenting sources, licenses, cleaning steps and known limits',
      'A data quality report with label agreement scores and coverage by category',
      'Reusable scripts for cleaning, de-identification and synthesis',
    ],
    timeline: 'First batch in 1-2 weeks, full dataset in 2-6 weeks',
    keywords: [
      'fine-tuning dataset creation',
      'custom ai training data',
      'llm training data services',
      'data labeling for llm fine-tuning',
      'synthetic data generation services',
      'domain specific datasets',
      'instruction tuning dataset',
      'ai training data company',
    ],
    related: [
      '/services/custom-model-fine-tuning',
      '/guides/how-much-data-to-fine-tune',
      '/guides/how-to-prepare-fine-tuning-dataset',
      '/glossary/synthetic-data',
      '/guides/fine-tuning-data-privacy',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ 09 */
  {
    slug: 'trading-financial-ai-pipelines',
    serviceIndex: 8,
    title: 'AI research pipelines for trading and financial analysis that read every filing and headline as it lands',
    seoTitle: 'AI Trading and Financial Analysis Development Services',
    description:
      'We build AI pipelines that read filings, news and market data, run technical, sentiment and risk analysis, and deliver cited research. You make the calls.',
    eyebrow: 'Service · 09',
    answer:
      'An AI financial analysis pipeline is an always-on system that collects market data, filings and news, uses language and reasoning models to extract signals such as sentiment, risk changes and technical patterns, and delivers cited summaries or alerts to analysts. It supports research rather than trading on its own. A focused pilot covering one asset class or data source usually ships in two to six weeks.',
    facts: [
      'US public companies must generally file a Form 8-K within four business days of a material event, which makes SEC EDGAR filings a high-value, machine-readable source for automated monitoring.',
      'FinBERT (Araci, 2019) is a language model fine-tuned for financial sentiment and remains a common baseline for classifying the tone of financial news and filings.',
      'BloombergGPT (Wu et al., 2023) was a 50-billion-parameter model trained partly on a 363-billion-token financial dataset, an early demonstration of the value of domain data in finance.',
      'Backtests that ignore look-ahead bias, survivorship bias or transaction costs overstate strategy returns, and language models add a new risk: knowledge of later events leaking in from their training data.',
      'Language models can hallucinate numbers, so financial pipelines should pull figures directly from source data and use models for reading and reasoning, not for recalling figures.',
    ],
    body: [
      { type: 'h2', text: 'What is an AI trading and financial analysis pipeline?' },
      {
        type: 'p',
        text: 'An AI financial analysis pipeline is a set of connected jobs that ingest financial data, analyze it with models and deliver results to people. Typical sources are price feeds, SEC filings, earnings call transcripts, news and social sentiment.',
      },
      {
        type: 'p',
        text: '[Reasoning models](/glossary/reasoning-models), language models trained to work through multi-step problems before answering, read and compare documents. Classic quantitative code handles the numbers. The output is a cited brief, an alert or a structured signal your team or existing systems can use.',
      },
      {
        type: 'p',
        text: 'Specialized models have a long track record here. FinBERT (Araci, 2019), a model fine-tuned for financial sentiment, is still a common baseline for scoring the tone of news and filings, and a useful yardstick for judging newer general-purpose models.',
      },
      { type: 'h2', text: 'What problems does a financial AI pipeline solve?' },
      {
        type: 'p',
        text: 'No analyst can read every filing, headline and transcript across a coverage universe of hundreds of tickers. Important changes hide in footnotes, quiet edits to risk factors and tone shifts on earnings calls. Signs you need a pipeline:',
      },
      {
        type: 'ul',
        items: [
          'Analysts spend more time collecting and summarizing than thinking.',
          'You learn about material filings after the market has already moved.',
          "Sentiment and news signals live in someone's browser tabs, not in a dataset.",
          'Your research process cannot be audited or reproduced.',
          'You want to test an idea across years of data, not a handful of examples.',
        ],
      },
      { type: 'h2', text: 'How is a financial AI pipeline built?' },
      {
        type: 'p',
        text: 'At {{brand}}, we build these pipelines in five steps, with a human analyst at the end of every chain. The machine reads. People decide.',
      },
      {
        type: 'ol',
        items: [
          '**Define the edge.** We agree on the decisions the pipeline supports, the assets it covers and the metrics that will judge it.',
          '**Wire the data.** We connect licensed price, fundamentals and news feeds, SEC EDGAR filings and transcripts, with timestamps preserved so nothing leaks from the future.',
          '**Build the analysis.** Technical indicators run in standard Python. Models handle reading: sentiment, risk factor changes, guidance shifts and entity extraction, with every claim linked to its source. [Fine-tuned models](/services/custom-model-fine-tuning) help where domain jargon trips up general ones.',
          '**Backtest honestly.** We test on point-in-time data, include costs and check for look-ahead bias, including the risk that a model already knows what happened next because it appeared in its training data.',
          '**Deliver and monitor.** Results arrive as dashboards, alerts or API outputs, with logging and drift checks so you know when a signal stops working.',
        ],
      },
      { type: 'h2', text: 'How does an AI pipeline compare with analysts or terminal AI features?' },
      {
        type: 'table',
        caption: 'A custom AI research pipeline compared with analyst-only research and vendor AI features',
        head: ['', 'Custom AI pipeline', 'Analysts only', 'Terminal or data vendor AI features'],
        rows: [
          ['Coverage', 'Hundreds to thousands of tickers, around the clock', 'Limited by headcount', 'Broad, but generic'],
          ['Speed on new filings', 'Minutes after publication', 'Hours to days', 'Varies by vendor'],
          ['Fits your strategy', 'Built for it', 'Yes', 'Rarely, every subscriber gets the same output'],
          ['Auditability', 'Every output linked to sources and logged', 'Depends on notes', 'Limited'],
          ['Judgment and accountability', 'None, it supports decisions', 'Full', 'None'],
        ],
      },
      {
        type: 'p',
        text: 'The best setup pairs them. The pipeline reads everything. Analysts decide what matters. See how this applies across [financial services](/industries/financial-services).',
      },
      { type: 'h2', text: 'How do you stop AI from making up numbers?' },
      {
        type: 'p',
        text: 'Language models can [hallucinate](/glossary/hallucination), producing confident but false statements, numbers included. A financial pipeline has to treat that as a design constraint, not an edge case.',
      },
      {
        type: 'p',
        text: 'The rule is simple: figures come from source data and code, never from model memory. Models read, classify and explain, grounded in retrieved documents through [RAG](/glossary/rag). Every number in an output links back to the filing, feed or calculation it came from.',
      },
      { type: 'h2', text: 'When should you not build a financial AI pipeline?' },
      {
        type: 'p',
        text: 'Do not build one expecting an automated money machine. Markets adapt, signals decay and no model removes risk. We build research and analysis tools. We do not provide investment advice or promise returns.',
      },
      {
        type: 'p',
        text: 'Do not build one without the data rights you need, because many market data and news licenses restrict storage, redistribution or automated use. And if your firm is regulated, check how AI-assisted research fits your compliance obligations before outputs reach clients. This is general information, not legal or investment advice.',
      },
      { type: 'h2', text: 'Want always-on research you can audit?' },
      {
        type: 'p',
        text: 'Take the 2-minute [AI audit](/audit) or [talk to us directly](/#contact). {{brand}} returns a plan, a price and an honest verdict within 24 hours.',
      },
    ],
    faqs: [
      {
        q: 'Can AI predict stock prices?',
        a: 'AI cannot reliably predict stock prices, and any vendor promising consistent market-beating returns from AI deserves suspicion. What AI does well in finance is process far more information than people can: reading filings, transcripts and news, classifying sentiment and flagging changes. That can improve research speed and coverage, but markets adapt, signals decay and every strategy still carries risk. This is general information, not investment advice.',
      },
      {
        q: 'Which data sources can a financial AI pipeline use?',
        a: 'A financial AI pipeline can use market price and volume feeds, company fundamentals, SEC EDGAR filings such as 10-K, 10-Q and 8-K reports, earnings call transcripts, news wires, economic releases and social media sentiment. Each source has license terms that may restrict storage, redistribution or automated use, so data rights should be confirmed before building. Timestamps must be preserved to avoid look-ahead bias in backtests.',
      },
      {
        q: 'How do you backtest an AI trading signal without bias?',
        a: "Backtesting an AI trading signal without bias requires point-in-time data, meaning only information available at each historical moment, plus realistic transaction costs, slippage and a universe that includes delisted companies to avoid survivorship bias. Language models add one more risk: they may already know how events turned out from their training data. Testing on periods after the model's training cutoff is the cleanest check.",
      },
      {
        q: 'Is an AI financial analysis pipeline the same as investment advice?',
        a: 'An AI financial analysis pipeline is research software, not investment advice. It reads filings, scores sentiment and flags risk changes, and people decide what to do with the output. {{brand}} builds these tools and does not manage money, provide investment advice or promise returns. Firms that use AI outputs when advising clients should review those tools against their own regulatory obligations.',
      },
      {
        q: 'Can a financial AI pipeline run on our own infrastructure?',
        a: 'A financial AI pipeline can run entirely on infrastructure a firm controls, including its own cloud account, with open-weight models hosted privately so proprietary positions and research never reach a third-party API. Hosted model APIs remain an option where data sensitivity allows. The choice usually depends on compliance requirements, data licenses, and the latency and cost targets for the pipeline.',
      },
    ],
    idealFor: [
      'Hedge funds, family offices and proprietary trading teams',
      'Equity research and investment teams covering large universes',
      'Fintech companies adding AI analysis features to their products',
      'Serious independent traders who want a systematic research process',
    ],
    deliverables: [
      'A data ingestion layer for market data, filings, transcripts and news, with point-in-time storage',
      'Analysis modules for sentiment, risk factor changes and technical indicators',
      'A backtest report with bias checks and stated assumptions',
      'Dashboards, alerts or an API delivering cited outputs',
      'Monitoring for data quality and signal drift',
      'Full source code and documentation in your repository',
    ],
    timeline: 'Pilot in 2-6 weeks',
    keywords: [
      'ai financial analysis tools',
      'ai trading research pipeline',
      'ai for equity research',
      'llm sentiment analysis finance',
      'sec filing analysis ai',
      'ai for hedge funds',
      'financial data pipeline development',
      'ai stock analysis software development',
    ],
    related: [
      '/industries/financial-services',
      '/services/custom-model-fine-tuning',
      '/glossary/reasoning-models',
      '/glossary/hallucination',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------ 10 */
  {
    slug: 'ai-content-engine',
    serviceIndex: 9,
    title: 'An AI content engine that ships on-brand scripts, graphics, voiceovers and posts on schedule',
    seoTitle: 'AI Content Automation Services for Brands and Creators',
    description:
      'We build AI content pipelines for scripts, hooks, graphics, voiceovers and posts in your niche: on brand, human-reviewed and on schedule, built to grow.',
    eyebrow: 'Service · 10',
    answer:
      'An AI content engine is an automated pipeline that researches topics, writes scripts and posts, generates graphics and voiceovers, and schedules them across channels, all following your brand voice. Humans approve before anything publishes. A well-built engine can turn one long-form idea into a week of platform-specific posts, and a first pipeline covering one or two channels usually ships in two to six weeks.',
    facts: [
      "Google's spam policies, updated in March 2024, target scaled content abuse: mass-producing pages mainly to manipulate rankings, whether by AI or by people. Helpful AI-assisted content is allowed.",
      'YouTube requires creators to disclose realistic altered or synthetic content, and since July 2025 its Partner Program policy on inauthentic content targets mass-produced, repetitive videos.',
      "The FTC's Endorsement Guides require clear disclosure of paid sponsorships and affiliate links, and its 2024 rule on reviews bans fake reviews, including AI-generated ones.",
      "Voice cloning of a real person needs that person's consent, and Tennessee's ELVIS Act (2024) was one of the first US state laws to protect voices from unauthorized AI imitation.",
      'C2PA Content Credentials are an open standard for attaching provenance information to images, video and audio, including whether AI was used to make them.',
    ],
    body: [
      { type: 'h2', text: 'What is an AI content engine?' },
      {
        type: 'p',
        text: 'An AI content engine is a production pipeline that turns ideas into finished, scheduled content, with AI doing most of the making. It chains research, scriptwriting, hooks, graphics, voiceover and video editing, then queues posts for each channel.',
      },
      {
        type: 'p',
        text: 'It runs on your rules: a brand voice guide, banned claims, visual templates and approval steps written into [system prompts](/glossary/system-prompt) and skill files. Tools such as ElevenLabs for voice, Runway for video and Canva AI for graphics plug in where they fit.',
      },
      { type: 'h2', text: 'Who needs an AI content engine?' },
      {
        type: 'p',
        text: '[Ecommerce](/industries/ecommerce) brands, creators and [marketing agencies](/industries/marketing-agencies) that know content drives revenue but cannot staff a studio. The bottleneck is rarely ideas. It is the hours between an idea and a published, on-brand post. Signs you need one:',
      },
      {
        type: 'ul',
        items: [
          'You post in bursts, then go quiet for weeks.',
          'Each piece takes your team days, and you need several a week.',
          'Your best long-form content never gets cut into shorts, threads or carousels.',
          'Freelancers deliver inconsistent quality and voice.',
          'You want an audience you can monetize with sponsors, affiliates or your own [digital products](/services/ai-digital-products).',
        ],
      },
      { type: 'h2', text: 'How is an AI content engine built?' },
      {
        type: 'p',
        text: 'At {{brand}}, we build the engine in five stages, and the first one is the one most people skip: deciding what on-brand actually means.',
      },
      {
        type: 'ol',
        items: [
          '**Voice and rules.** We turn your best past content into a brand voice guide and [skill files](/services/domain-skills-system-files), including the claims you must never make.',
          '**Research loop.** Agents track your niche, competitors and audience questions, and propose topics with sources.',
          '**Production chain.** Scripts, hooks, captions, graphics, voiceovers and edits are generated from templates, with a [fine-tuned model](/services/custom-model-fine-tuning) where the brand voice must be exact.',
          '**Review and publish.** A human approval step, then scheduling to each platform in its native format.',
          '**Measure and adjust.** Performance data feeds back into topic selection and hooks every week.',
        ],
      },
      { type: 'h2', text: 'How does an AI content engine compare with an agency or an in-house team?' },
      {
        type: 'table',
        caption: 'An AI content engine compared with a content agency and an in-house team',
        head: ['', 'AI content engine', 'Content agency', 'In-house content team'],
        rows: [
          ['Output volume', 'High, limited mainly by review time', 'Set by the retainer', 'Set by headcount'],
          ['Consistency of voice', 'High, rules are written into the system', 'Varies by writer', 'High, once trained'],
          ['Idea to first draft', 'Hours', 'Days to weeks', 'Days'],
          ['Cost structure', 'Build cost plus tool and model usage', 'Monthly retainer', 'Salaries and tools'],
          ['Original ideas and taste', 'Needs human input', 'Yes', 'Yes'],
        ],
      },
      {
        type: 'p',
        text: 'The strongest setup is a small team plus an engine. People supply taste, original ideas and on-camera presence. The engine handles the repetitive production.',
      },
      { type: 'h2', text: 'Will AI content hurt my SEO or get my account penalized?' },
      {
        type: 'p',
        text: "Not if it is useful. Google's guidance is that AI-assisted content is fine when it helps people. Its March 2024 spam update targets scaled content abuse: mass-producing pages to manipulate rankings, by any method.",
      },
      {
        type: 'p',
        text: 'Platforms have similar rules. YouTube requires disclosure of realistic synthetic media and, since July 2025, its monetization policy targets mass-produced, repetitive videos. The FTC also requires clear disclosure of sponsorships and affiliate links. That is why every engine we build has human review, original input and disclosure settings built in.',
      },
      {
        type: 'p',
        text: 'Provenance is getting easier to prove. C2PA Content Credentials, an open standard, can attach a record of how an image, video or audio file was made, including whether AI was involved, and several major platforms read it to apply labels.',
      },
      { type: 'h2', text: 'What does an AI content engine cost to run?' },
      {
        type: 'p',
        text: 'Running costs are tool subscriptions plus model usage. Voice, video and design tools such as ElevenLabs, Runway and Canva price by plan tier or usage credits, and those prices change often. Video generation is usually the most expensive step per piece, so a good engine saves it for formats where motion earns its keep.',
      },
      { type: 'h2', text: 'When should you not build an AI content engine?' },
      {
        type: 'p',
        text: 'Skip it if you do not know who your audience is or what you want them to do. Automating unclear content just produces more unclear content, faster.',
      },
      {
        type: 'p',
        text: "Skip it if your brand depends on one person's live personality and that person will not stay in the loop. And skip it if the plan is to flood platforms with low-effort posts. Search engines and platforms actively demote that, and it burns audience trust.",
      },
      { type: 'h2', text: 'Ready to build a content engine?' },
      {
        type: 'p',
        text: 'Take the 2-minute [AI audit](/audit) or [pitch us your niche](/#contact). {{brand}} returns a plan, a price and an honest verdict within 24 hours. On brand, on schedule and reviewed before it ships.',
      },
    ],
    faqs: [
      {
        q: 'Does Google penalize AI-generated content?',
        a: "Google does not penalize content just because AI helped create it. Google's guidance says it rewards helpful, reliable, people-first content however it is produced. What Google's spam policies target is scaled content abuse: publishing large volumes of low-value pages mainly to manipulate search rankings, whether made by AI or by people. AI-generated content with original insight, accuracy checks and human editing is within the rules.",
      },
      {
        q: 'Do I have to disclose AI-generated content on social media?',
        a: 'Disclosure rules for AI-generated content depend on the platform and the content. YouTube requires creators to label realistic altered or synthetic media, and TikTok and Meta apply labels to realistic AI content. Separately, the FTC requires clear disclosure of paid sponsorships and affiliate links however content is made, and the EU AI Act adds transparency rules for some AI-generated content. This is general information, not legal advice.',
      },
      {
        q: 'Can AI clone my voice for voiceovers?',
        a: "AI voice tools such as ElevenLabs can create a synthetic version of a person's voice from recorded samples, which lets a content engine produce voiceovers without a studio session for every video. Voice cloning should only be used with the speaker's explicit consent, and some laws, such as Tennessee's 2024 ELVIS Act, protect people's voices from unauthorized AI imitation. Many teams mix cloned voiceovers with real recordings.",
      },
      {
        q: 'How much content can an AI content engine produce?',
        a: 'An AI content engine can produce as much content as the review process can approve, and review is the real limit. Generation takes minutes per piece. Most brands get more value from repurposing one strong long-form idea into many platform-specific posts than from maximizing raw volume, because platforms and search engines reward usefulness and engagement and actively demote mass-produced, repetitive content.',
      },
      {
        q: 'How long does it take to set up an AI content engine?',
        a: 'A first AI content engine covering one or two channels usually takes two to six weeks to set up with {{brand}}. The early weeks go to capturing the brand voice, building templates and connecting tools. Later weeks run the engine on real topics with human review, tuning hooks and formats from performance data. More channels and formats are added in phases once the first pipeline proves itself.',
      },
    ],
    idealFor: [
      'Ecommerce and consumer brands that need steady social and video content',
      'Creators and experts building an audience to monetize',
      'Marketing agencies scaling content delivery across clients',
      'Founders who want a content channel without hiring a studio',
    ],
    deliverables: [
      'A brand voice guide and content skill files',
      'A working pipeline for research, scripts, graphics, voiceovers and scheduling',
      'Templates for each platform and format you publish',
      'A human review and approval workflow',
      'A weekly performance report that feeds topic selection',
      'Documentation and a training session for your team',
    ],
    timeline: 'First pipeline in 2-6 weeks',
    keywords: [
      'ai content creation services',
      'ai content automation',
      'ai content engine',
      'automated social media content',
      'ai video content production',
      'ai content agency',
      'ai voiceover and video automation',
      'ai content marketing services',
    ],
    related: [
      '/services/ai-digital-products',
      '/services/micro-agency-ai-systems',
      '/industries/marketing-agencies',
      '/industries/ecommerce',
      '/services/domain-skills-system-files',
    ],
    updated: '2026-10-27',
  },
];
