import type { GlossaryTerm } from './types';

/*
 * AI glossary: one entry per slug in GLOSSARY_SLUGS, in the same order.
 * `short` is the quotable definition (max 45 words). Write {{brand}}, never the literal name.
 */

export const glossary: GlossaryTerm[] = [
  {
    slug: 'fine-tuning',
    term: 'Fine-tuning',
    aka: 'Model fine-tuning, LLM fine-tuning',
    short:
      'Fine-tuning is a training process that takes a pretrained language model and continues training it on a smaller, task-specific dataset so it reliably follows a particular format, style, or domain behavior without needing long prompts.',
    body: [
      { type: 'h2', text: 'Why does fine-tuning matter for a business?' },
      {
        type: 'p',
        text: "A general model knows a little about everything. Fine-tuning teaches it to do one job your way: classify tickets with your labels, write in your house style, or extract fields from your documents into a fixed JSON schema. The model's weights change, so the behavior is built in rather than re-explained in every prompt. That usually means shorter prompts, lower cost per call, more consistent output, and the option to run a smaller model that matches a larger one on your narrow task.",
      },
      {
        type: 'p',
        text: '**Example:** an insurance team has 4,000 past claims notes with the correct triage decision. A fine-tuned 8B open-weight model learns the pattern and routes new claims in a consistent format, running on infrastructure the team controls.',
      },
      { type: 'h3', text: 'When to use it, and when not to' },
      {
        type: 'ul',
        items: [
          '**Use it** when you need consistent format, tone, or judgment on a repeatable task, and you have a few hundred to a few thousand good examples.',
          '**Skip it** when the problem is missing facts. Fresh or changing knowledge belongs in [RAG](/glossary/rag), not in the weights.',
          '**Try prompting first.** If a well-written prompt already hits your quality bar, fine-tuning adds cost without adding value.',
        ],
      },
      {
        type: 'p',
        text: '{{brand}} builds an evaluation set before any training run, so the gain can be measured rather than assumed. See [fine-tuning vs RAG vs prompting](/guides/fine-tuning-vs-rag-vs-prompting) for the full decision, or [custom model fine-tuning](/services/custom-model-fine-tuning) for how a project runs.',
      },
    ],
    related: ['lora', 'supervised-fine-tuning', 'rag', 'base-model'],
    seeAlso: ['/services/custom-model-fine-tuning', '/guides/fine-tuning-vs-rag-vs-prompting'],
  },
  {
    slug: 'lora',
    term: 'LoRA',
    aka: 'Low-Rank Adaptation',
    short:
      "LoRA (Low-Rank Adaptation) is a parameter-efficient fine-tuning method that freezes a model's original weights and trains small low-rank matrices added to selected layers, cutting the number of trainable parameters by orders of magnitude.",
    body: [
      { type: 'h2', text: 'Why does LoRA matter for a business?' },
      {
        type: 'p',
        text: 'Full fine-tuning updates every weight in a model, which needs large GPU clusters and produces a full-size copy of the model for every variant. LoRA, introduced by Hu et al. at Microsoft in 2021, keeps the original weights frozen and learns a pair of small matrices per targeted layer whose product approximates the needed update. The trained adapter is often tens to a few hundred megabytes instead of many gigabytes.',
      },
      {
        type: 'p',
        text: 'That changes the economics. Training fits on far less hardware, runs finish faster, and one base model can serve many adapters, for example one per client or per task, swapped in at inference time.',
      },
      {
        type: 'table',
        caption: 'Full fine-tuning compared with LoRA',
        head: ['', 'Full fine-tuning', 'LoRA'],
        rows: [
          ['Weights updated', 'All of them', 'Small adapter matrices, often well under 1% of parameters'],
          ['Output', 'A full model copy', 'A small adapter file'],
          ['Hardware', 'Usually several GPUs', 'Often a single GPU'],
          ['Quality', 'Highest ceiling for large shifts', 'Comparable on most narrow tasks'],
        ],
      },
      {
        type: 'p',
        text: '**When to use it:** most business fine-tunes, such as format, tone, classification, and extraction. **When not to:** teaching a model a large body of new knowledge or a new language, where full fine-tuning or continued pretraining may do better. {{brand}} uses LoRA for most client fine-tunes because adapters are cheap to train, easy to version, and simple to roll back. More in [LoRA and QLoRA explained](/guides/lora-qlora-explained).',
      },
    ],
    related: ['qlora', 'peft', 'fine-tuning'],
    seeAlso: ['/guides/lora-qlora-explained', '/services/custom-model-fine-tuning'],
  },
  {
    slug: 'qlora',
    term: 'QLoRA',
    aka: 'Quantized Low-Rank Adaptation',
    short:
      'QLoRA is a fine-tuning method that loads a frozen base model in 4-bit precision and trains LoRA adapters on top of it, making it possible to fine-tune large models on a single GPU with little loss in quality.',
    body: [
      { type: 'h2', text: 'Why does QLoRA matter for a business?' },
      {
        type: 'p',
        text: 'QLoRA, from Dettmers et al. (2023), combined three ideas: a 4-bit data type called NormalFloat (NF4), double quantization that also compresses the quantization constants, and paged optimizers that absorb memory spikes. The paper showed a 65-billion-parameter model could be fine-tuned on a single 48 GB GPU while matching 16-bit fine-tuning results on its benchmarks.',
      },
      {
        type: 'p',
        text: 'For a business, that means a capable open-weight model can be adapted on one rented GPU rather than a cluster. Experiments get cheaper, and it becomes practical to try several data variations before committing to one.',
      },
      {
        type: 'p',
        text: '**Example:** a team wants to adapt a 70B-class model to draft contract clauses. Full fine-tuning would need several high-memory GPUs. With QLoRA, a single 80 GB card is typically enough for training, and the resulting adapter can be merged into the model or served alongside it.',
      },
      { type: 'h3', text: 'Trade-offs' },
      {
        type: 'ul',
        items: [
          'Training is slower per step than plain LoRA, because weights are dequantized on the fly.',
          'Quality is usually very close to 16-bit LoRA, but confirm it with [evals](/glossary/llm-evals) on your own task.',
          'Use plain [LoRA](/glossary/lora) when you have the GPU memory. Use QLoRA when memory is the constraint.',
        ],
      },
      {
        type: 'p',
        text: 'For a side-by-side walkthrough, read [LoRA and QLoRA explained](/guides/lora-qlora-explained).',
      },
    ],
    related: ['lora', 'quantization', 'peft'],
    seeAlso: ['/guides/lora-qlora-explained'],
  },
  {
    slug: 'peft',
    term: 'PEFT',
    aka: 'Parameter-Efficient Fine-Tuning',
    short:
      'PEFT (Parameter-Efficient Fine-Tuning) is a family of techniques that adapt a pretrained model by training only a small number of new or selected parameters while the rest stay frozen, reducing compute, memory, and storage costs.',
    body: [
      { type: 'h2', text: 'Why does PEFT matter for a business?' },
      {
        type: 'p',
        text: 'Large language models have billions of parameters. Updating all of them for every task is expensive to train, expensive to store, and risky, because broad weight changes can erode general abilities. PEFT methods change only a sliver of the model, typically from well under 1% to a few percent of parameters, and leave the original weights untouched.',
      },
      {
        type: 'p',
        text: 'The practical result: cheaper training runs, small artifacts that are easy to version, and one shared base model with many task-specific add-ons.',
      },
      {
        type: 'table',
        caption: 'Common PEFT methods',
        head: ['Method', 'What it trains'],
        rows: [
          ['[LoRA](/glossary/lora)', 'Low-rank matrices added alongside existing weight layers'],
          ['[QLoRA](/glossary/qlora)', 'LoRA adapters on top of a 4-bit quantized base model'],
          ['Adapters', 'Small bottleneck layers inserted between existing layers'],
          ['Prefix and prompt tuning', 'Learned vectors added to the input or to each layer'],
          ['IA3', 'Learned vectors that rescale internal activations'],
        ],
      },
      {
        type: 'p',
        text: '**When to use it:** almost any business fine-tune of an open-weight model should start with PEFT, usually LoRA. **When not to:** if you need deep changes, such as a new language or a large new knowledge domain, full fine-tuning may be worth the extra cost. PEFT is also the name of a widely used Hugging Face library that implements these methods. See [LoRA and QLoRA explained](/guides/lora-qlora-explained) for the details.',
      },
    ],
    related: ['lora', 'qlora', 'fine-tuning', 'catastrophic-forgetting'],
    seeAlso: ['/guides/lora-qlora-explained'],
  },
  {
    slug: 'supervised-fine-tuning',
    term: 'Supervised fine-tuning (SFT)',
    aka: 'SFT, instruction tuning',
    short:
      'Supervised fine-tuning (SFT) is a training stage in which a pretrained model learns from labeled input and output pairs, such as prompts and ideal responses, so it imitates the demonstrated behavior on similar inputs.',
    body: [
      { type: 'h2', text: 'Why does SFT matter for a business?' },
      {
        type: 'p',
        text: 'SFT is the most common kind of [fine-tuning](/glossary/fine-tuning) and usually the first one a business should try. You show the model examples of exactly what you want: this input, this output. The model is trained to predict the target output token by token, so it learns your format, terminology, and decision patterns.',
      },
      {
        type: 'p',
        text: 'It is also the first post-training step model labs use. In the InstructGPT recipe (Ouyang et al., 2022), SFT on human-written demonstrations came before preference training with [RLHF](/glossary/rlhf).',
      },
      {
        type: 'p',
        text: '**Example:** a recruiting firm collects 1,500 pairs of raw CVs and the structured candidate summaries its consultants wrote. After SFT, the model produces summaries in the same structure and tone with far less prompt text.',
      },
      { type: 'h3', text: 'What makes SFT work' },
      {
        type: 'ul',
        items: [
          '**Data quality beats volume.** A few hundred clean, consistent examples often beat thousands of noisy ones.',
          '**Cover the edge cases** you actually see in production, not only the easy ones.',
          '**Hold out a test set** before training, so improvement is measured, not assumed.',
        ],
      },
      {
        type: 'p',
        text: 'If outputs are acceptable but you want them to lean a particular way, follow SFT with a preference method such as DPO. For sizing, see [how much data you need to fine-tune](/guides/how-much-data-to-fine-tune).',
      },
    ],
    related: ['fine-tuning', 'dpo', 'rlhf', 'overfitting'],
    seeAlso: ['/guides/how-to-prepare-fine-tuning-dataset', '/services/fine-tuning-datasets'],
  },
  {
    slug: 'rlhf',
    term: 'RLHF',
    aka: 'Reinforcement Learning from Human Feedback',
    short:
      'RLHF (Reinforcement Learning from Human Feedback) is a training method that uses human rankings of model outputs to train a reward model, then optimizes the language model with reinforcement learning to produce outputs people prefer.',
    body: [
      { type: 'h2', text: 'Why does RLHF matter?' },
      {
        type: 'p',
        text: "RLHF is a large part of why modern chat assistants feel helpful rather than merely fluent. It was popularized for language models by OpenAI's InstructGPT paper (Ouyang et al., 2022), which found that people preferred outputs from a 1.3-billion-parameter InstructGPT model over those of the 175-billion-parameter GPT-3.",
      },
      { type: 'h3', text: 'How it works' },
      {
        type: 'ol',
        items: [
          '**Supervised fine-tuning:** train the model on human-written demonstrations.',
          '**Reward model:** humans compare pairs of outputs, and a separate model learns to score responses the way the raters would.',
          '**Reinforcement learning:** the language model is optimized against the reward model, typically with PPO, with a penalty that keeps it close to the original model.',
        ],
      },
      {
        type: 'p',
        text: '**For a business:** full RLHF is complex and expensive. It needs large volumes of preference labels, a reward model, and a reinforcement learning loop that is sensitive to settings. Most companies adapting a model for one workflow get further with [supervised fine-tuning](/glossary/supervised-fine-tuning) and, if they need preference shaping, [DPO](/glossary/dpo), which uses the same kind of preference data without a separate reward model.',
      },
      {
        type: 'p',
        text: '**When it makes sense:** large general-purpose assistants, or tasks where quality is easier to judge than to demonstrate. Variants that replace human raters with an AI judge are usually called RLAIF, and reinforcement learning with automatically checkable rewards is now central to training [reasoning models](/glossary/reasoning-models).',
      },
    ],
    related: ['dpo', 'supervised-fine-tuning', 'reasoning-models'],
    seeAlso: ['/services/custom-model-fine-tuning'],
  },
  {
    slug: 'dpo',
    term: 'DPO',
    aka: 'Direct Preference Optimization',
    short:
      'DPO (Direct Preference Optimization) is a fine-tuning method that trains a language model directly on pairs of preferred and rejected responses, steering it toward preferred outputs without training a separate reward model or running reinforcement learning.',
    body: [
      { type: 'h2', text: 'Why does DPO matter for a business?' },
      {
        type: 'p',
        text: 'Introduced by Rafailov et al. in 2023, DPO showed that the RLHF objective can be optimized with a simple classification-style loss on preference pairs. Each training example is a prompt, a chosen response, and a rejected response. The model is pushed to raise the likelihood of the chosen answer relative to the rejected one, while a frozen reference model keeps it from drifting too far.',
      },
      {
        type: 'p',
        text: 'That removes the two hardest parts of [RLHF](/glossary/rlhf): the reward model and the reinforcement learning loop. Training is more stable, cheaper, and runs on the same tooling as ordinary fine-tuning.',
      },
      {
        type: 'p',
        text: "**Example:** a support team's fine-tuned model gives correct answers but often over-explains. Reviewers pick the better of two drafts for 800 real tickets. A short DPO run on those pairs shifts the model toward concise replies that still follow company policy.",
      },
      { type: 'h3', text: 'When to use it' },
      {
        type: 'ul',
        items: [
          '**Use DPO after SFT**, when outputs are acceptable but you want to shape preferences: tone, length, safety, or which of two valid answers wins.',
          '**Do not use it to teach a new task from scratch.** Start with [supervised fine-tuning](/glossary/supervised-fine-tuning).',
          '**Make the pairs meaningful.** Chosen and rejected answers should differ in the quality you care about, otherwise the model learns noise.',
        ],
      },
      {
        type: 'p',
        text: 'Related methods such as IPO, KTO, and ORPO build on similar ideas with different trade-offs. Preference data is covered in [how to prepare a fine-tuning dataset](/guides/how-to-prepare-fine-tuning-dataset).',
      },
    ],
    related: ['rlhf', 'supervised-fine-tuning', 'fine-tuning'],
    seeAlso: ['/services/custom-model-fine-tuning', '/guides/how-to-prepare-fine-tuning-dataset'],
  },
  {
    slug: 'rag',
    term: 'RAG',
    aka: 'Retrieval-Augmented Generation',
    short:
      "RAG (Retrieval-Augmented Generation) is a technique that retrieves relevant passages from an external knowledge source at query time and adds them to a language model's prompt, so answers are grounded in current, specific information the model was not trained on.",
    body: [
      { type: 'h2', text: 'Why does RAG matter for a business?' },
      {
        type: 'p',
        text: 'A model only knows what was in its training data, and that knowledge has a cutoff date. RAG lets it answer from your documents, product catalog, or policies without retraining. The term comes from Lewis et al. (2020) at Facebook AI Research, and the basic pattern is now standard in enterprise AI.',
      },
      { type: 'h3', text: 'How a typical RAG pipeline works' },
      {
        type: 'ol',
        items: [
          'Split documents into chunks and convert each chunk into embeddings.',
          'Store them in a [vector database](/glossary/vector-database) or search index.',
          'At query time, retrieve the most relevant chunks, often combining semantic and keyword search.',
          'Pass those chunks to the model with instructions to answer from them and cite sources.',
        ],
      },
      {
        type: 'p',
        text: "**Example:** an HR assistant answers 'how many days of parental leave do I get in Germany?' by pulling the current policy page, rather than guessing from what it saw in training.",
      },
      { type: 'h3', text: 'RAG or fine-tuning?' },
      {
        type: 'p',
        text: 'RAG supplies **knowledge**: facts that change or must be cited. [Fine-tuning](/glossary/fine-tuning) shapes **behavior**: format, tone, and judgment. Many production systems use both. RAG reduces hallucination but does not eliminate it, and retrieval quality is usually the biggest factor in answer quality. The trade-offs are laid out in [fine-tuning vs RAG vs prompting](/guides/fine-tuning-vs-rag-vs-prompting).',
      },
    ],
    related: ['embeddings', 'vector-database', 'fine-tuning', 'hallucination'],
    seeAlso: ['/guides/fine-tuning-vs-rag-vs-prompting'],
  },
  {
    slug: 'embeddings',
    term: 'Embeddings',
    aka: 'Vector embeddings, text embeddings',
    short:
      'Embeddings are numerical vectors that represent the meaning of text, images, or other data, positioned so that similar items sit close together, which lets software search, cluster, and compare content by meaning rather than exact keywords.',
    body: [
      { type: 'h2', text: 'Why do embeddings matter for a business?' },
      {
        type: 'p',
        text: "Keyword search fails when people use different words for the same thing. An embedding model turns each piece of text into a list of numbers, often a few hundred to a few thousand dimensions long. Texts with similar meaning get similar vectors, so 'cancel my plan' and 'how do I stop my subscription' land near each other even though they share almost no words.",
      },
      {
        type: 'p',
        text: 'Similarity is usually measured with cosine similarity or a dot product. That single idea powers semantic search, recommendations, duplicate detection, clustering, classification, and the retrieval step in [RAG](/glossary/rag).',
      },
      {
        type: 'p',
        text: "**Example:** an ecommerce company embeds 200,000 product descriptions. A shopper searching 'warm jacket for hiking in rain' finds waterproof insulated shells, even when no listing uses those exact words.",
      },
      { type: 'h3', text: 'Practical notes' },
      {
        type: 'ul',
        items: [
          '**Choose the embedding model carefully.** Domain fit matters, and switching models later means re-embedding everything.',
          '**Chunking matters.** How you split documents affects retrieval quality as much as the model choice.',
          '**Store them** in a [vector database](/glossary/vector-database) or a regular database with vector support.',
          '**Embedding models can be fine-tuned** on your own query and document pairs when generic models miss domain vocabulary.',
        ],
      },
    ],
    related: ['vector-database', 'rag', 'tokens'],
    seeAlso: ['/guides/fine-tuning-vs-rag-vs-prompting'],
  },
  {
    slug: 'vector-database',
    term: 'Vector database',
    aka: 'Vector store',
    short:
      'A vector database is a database built to store embeddings and quickly find the vectors most similar to a query vector, usually with approximate nearest neighbor indexes, making it the retrieval layer for semantic search and RAG systems.',
    body: [
      { type: 'h2', text: 'Why does a vector database matter for a business?' },
      {
        type: 'p',
        text: 'Comparing a query against millions of [embeddings](/glossary/embeddings) one by one is too slow for a live product. Vector databases use approximate nearest neighbor (ANN) indexes, such as HNSW graphs or inverted file indexes, to return close matches in milliseconds, trading a small amount of accuracy for a large gain in speed.',
      },
      {
        type: 'p',
        text: 'Most also store metadata alongside each vector, so results can be filtered: only documents this user may see, only policies from 2026, only products in stock. That filtering is essential for access control in enterprise [RAG](/glossary/rag).',
      },
      {
        type: 'table',
        caption: 'Common ways to store vectors',
        head: ['Option', 'Examples', 'Good fit'],
        rows: [
          ['Dedicated vector database', 'Pinecone, Weaviate, Qdrant, Milvus', 'Large scale, vector-heavy workloads'],
          ['Database extension', 'PostgreSQL with pgvector', 'Teams already on Postgres, moderate scale'],
          ['Search engine with vectors', 'Elasticsearch, OpenSearch', 'Hybrid keyword and semantic search'],
        ],
      },
      {
        type: 'p',
        text: '**When you need one:** semantic search or retrieval over thousands of documents or more. **When you do not:** a few hundred documents can often be searched in memory or with an extension to a database you already run. For most businesses, retrieval quality depends more on chunking, metadata, and hybrid search than on which vector store is chosen.',
      },
    ],
    related: ['embeddings', 'rag', 'context-window'],
    seeAlso: ['/guides/fine-tuning-vs-rag-vs-prompting'],
  },
  {
    slug: 'ai-agent',
    term: 'AI agent',
    aka: 'LLM agent, autonomous agent',
    short:
      'An AI agent is a software system in which a language model plans and takes actions toward a goal, calling tools such as search, databases, or APIs in a loop, observing the results, and deciding the next step until the task is done.',
    body: [
      { type: 'h2', text: 'What makes something an AI agent?' },
      {
        type: 'p',
        text: 'A chatbot answers. An agent acts. The core is a loop: the model reads the goal and context, decides which tool to use, the system runs that tool, the result goes back to the model, and the cycle repeats. [Tool calling](/glossary/tool-calling) is what connects the model to real systems such as your CRM, inbox, or ticketing tool.',
      },
      { type: 'h3', text: 'Why it matters for a business' },
      {
        type: 'p',
        text: 'Agents can handle multi-step work that rigid automation struggles with: reading an unstructured email, looking up the customer, checking an order, drafting a reply, and flagging exceptions for a human. They fit work where inputs vary and judgment is needed, but the rules about what is allowed are clear.',
      },
      {
        type: 'p',
        text: '**Example:** an accounts payable agent reads incoming invoices, matches them to purchase orders, queries the ERP for discrepancies, and routes only the mismatches to a person.',
      },
      { type: 'h3', text: 'When to use one, and when not to' },
      {
        type: 'ul',
        items: [
          '**Use an agent** when the task has several steps, varied inputs, and a clear definition of done.',
          '**Use plain automation** when the steps are fixed and predictable. It is cheaper and more reliable.',
          '**Always add** [guardrails](/glossary/guardrails), logging, and human approval for high-impact actions.',
        ],
      },
      {
        type: 'p',
        text: '{{brand}} builds agents with evals and permission limits from day one, not as an afterthought. Compare the options in [AI agents vs automation tools](/guides/ai-agents-vs-automation-tools).',
      },
    ],
    related: ['tool-calling', 'multi-agent-system', 'model-context-protocol', 'guardrails'],
    seeAlso: ['/guides/ai-agents-for-business-operations', '/guides/ai-agents-vs-automation-tools'],
  },
  {
    slug: 'multi-agent-system',
    term: 'Multi-agent system',
    aka: 'Agent swarm, multi-agent architecture',
    short:
      'A multi-agent system is an AI architecture in which several specialized agents, each with its own instructions, tools, and context, work together on a task, usually coordinated by an orchestrator agent or a fixed workflow that passes work between them.',
    body: [
      { type: 'h2', text: 'Why use multiple agents instead of one?' },
      {
        type: 'p',
        text: 'A single [AI agent](/glossary/ai-agent) with dozens of tools and a long prompt tends to get confused: it picks the wrong tool, loses track of the goal, or fills its [context window](/glossary/context-window) with irrelevant detail. Splitting the work gives each agent a narrow job, a short prompt, and only the tools it needs. Sub-agents can also run in parallel, which speeds up research-style tasks.',
      },
      { type: 'h3', text: 'Common patterns' },
      {
        type: 'ul',
        items: [
          '**Orchestrator and workers:** a lead agent plans, delegates subtasks, and merges the results.',
          '**Pipeline:** agents hand work along a fixed sequence, such as research, draft, then review.',
          '**Reviewer loop:** one agent produces, another critiques, and the first revises.',
        ],
      },
      {
        type: 'p',
        text: '**Example:** a market research system has one agent gathering sources, several summarizing them in parallel, one checking claims against the sources, and a final agent writing the brief.',
      },
      { type: 'h3', text: 'Trade-offs' },
      {
        type: 'p',
        text: 'More agents means more model calls, higher cost, and more places for errors to compound. Start with one well-designed agent and split only when you can show a measured gain. {{brand}} designs multi-agent systems with shared logging and per-agent evals, so a failure can be traced to the agent that caused it. See [multi-agent harnesses](/services/multi-agent-harnesses).',
      },
    ],
    related: ['ai-agent', 'tool-calling', 'model-context-protocol', 'llm-evals'],
    seeAlso: ['/services/multi-agent-harnesses', '/services/ai-agent-swarms'],
  },
  {
    slug: 'model-context-protocol',
    term: 'Model Context Protocol (MCP)',
    aka: 'MCP',
    short:
      'The Model Context Protocol (MCP) is an open standard, introduced by Anthropic in November 2024, that defines how AI applications connect to external tools, data sources, and prompts through a common client and server interface.',
    body: [
      { type: 'h2', text: 'Why does MCP matter for a business?' },
      {
        type: 'p',
        text: 'Before MCP, every AI application needed custom integration code for every tool it used, so the same system might be wired up again and again for different assistants. MCP standardizes the connection. A system exposes its capabilities once as an MCP server, and any MCP-compatible client, such as a desktop assistant, a coding tool, or a custom [AI agent](/glossary/ai-agent), can use it.',
      },
      {
        type: 'p',
        text: 'An MCP server can offer three main kinds of capability: **tools** the model can call, **resources** such as files or records it can read, and **prompts**, which are reusable templates. Messages use JSON-RPC, sent over standard input and output for local servers or over HTTP for remote ones. Since launch, MCP has been adopted widely across AI providers and developer tools.',
      },
      {
        type: 'p',
        text: "**Example:** a company wraps its internal order system in an MCP server. Its support agent, its analysts' desktop assistant, and its coding tools can all query orders through the same interface, with the same permissions.",
      },
      { type: 'h3', text: 'What to watch' },
      {
        type: 'ul',
        items: [
          'MCP connects tools, it does not make them safe. Scope permissions tightly and require approval for actions that write or send.',
          'Treat content returned by tools as untrusted input, since it can carry prompt injection.',
          'MCP complements [tool calling](/glossary/tool-calling) rather than replacing it: it standardizes how tools are described, discovered, and invoked.',
        ],
      },
    ],
    related: ['tool-calling', 'ai-agent', 'multi-agent-system'],
    seeAlso: ['/services/multi-agent-harnesses', '/guides/ai-agents-for-business-operations'],
  },
  {
    slug: 'synthetic-data',
    term: 'Synthetic data',
    aka: 'Synthetic training data',
    short:
      'Synthetic data is artificially generated data, often produced by a language model or simulation, that mimics the structure and patterns of real data and is used to train, fine-tune, or test models when real examples are scarce, sensitive, or costly.',
    body: [
      { type: 'h2', text: 'Why does synthetic data matter for a business?' },
      {
        type: 'p',
        text: 'Fine-tuning needs examples, and most companies do not have thousands of clean, labeled, privacy-safe ones ready to go. A strong model can generate candidate examples: varied customer questions, rare edge cases, paraphrases, or full input and output pairs that follow your rules. Used well, this fills gaps quickly and avoids exposing real customer data.',
      },
      {
        type: 'p',
        text: '**Example:** a bank has only 60 real examples of a rare complaint type. A model generates 1,500 realistic variations seeded from those 60, experts review a sample, and the filtered set trains a classifier that now recognizes the category.',
      },
      { type: 'h3', text: 'Risks and how to manage them' },
      {
        type: 'ul',
        items: [
          '**Low diversity:** generated data tends to repeat the same phrasings. Vary prompts, personas, and seed examples.',
          "**Errors at scale:** a generator's mistakes become training labels. Filter automatically and review samples by hand.",
          '**Drift from reality:** always test on real held-out data, never only on synthetic data.',
          "**Licensing:** check that the generating model's terms allow using its outputs for training.",
        ],
      },
      {
        type: 'p',
        text: '{{brand}} mixes real seed data with reviewed synthetic data in most [fine-tuning datasets](/services/fine-tuning-datasets), and measures the effect with [evals](/glossary/llm-evals) rather than trusting volume alone. For the full process, see [how to prepare a fine-tuning dataset](/guides/how-to-prepare-fine-tuning-dataset).',
      },
    ],
    related: ['distillation', 'supervised-fine-tuning', 'llm-evals'],
    seeAlso: ['/services/fine-tuning-datasets', '/guides/how-to-prepare-fine-tuning-dataset'],
  },
  {
    slug: 'distillation',
    term: 'Distillation',
    aka: 'Knowledge distillation',
    short:
      "Distillation (knowledge distillation) is a technique for training a smaller student model to reproduce the outputs or behavior of a larger teacher model, keeping much of the teacher's quality on target tasks at a fraction of the size and cost.",
    body: [
      { type: 'h2', text: 'Why does distillation matter for a business?' },
      {
        type: 'p',
        text: "Large frontier models are capable but slow and expensive per call. If you need one narrow task done well, a small model trained to copy a big model's answers on that task can be much cheaper and faster, and it can run on your own infrastructure.",
      },
      {
        type: 'p',
        text: "The idea was formalized by Hinton, Vinyals, and Dean in 2015, who trained student networks on the teacher's full probability distribution, called soft targets, rather than only the correct label. With language models today, the most common form is simpler: generate high-quality responses from the teacher, then use them as [supervised fine-tuning](/glossary/supervised-fine-tuning) data for the student.",
      },
      {
        type: 'p',
        text: '**Example:** a SaaS company uses a large model to label 20,000 support tickets by intent and urgency, has staff check a sample, then fine-tunes an 8B model on the result. The small model handles live traffic at a fraction of the per-ticket cost.',
      },
      { type: 'h3', text: 'Things to check first' },
      {
        type: 'ul',
        items: [
          '**Terms of use.** Some commercial model licenses restrict using outputs to train competing models.',
          "**Inherited errors.** The student learns the teacher's mistakes too, so filter and spot-check the generated data.",
          '**Real-world quality.** Confirm with [evals](/glossary/llm-evals) on real data that the student meets your bar.',
        ],
      },
      {
        type: 'p',
        text: 'To compare the one-off training cost with ongoing savings, try the [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator).',
      },
    ],
    related: ['synthetic-data', 'supervised-fine-tuning', 'quantization', 'inference'],
    seeAlso: ['/services/custom-model-fine-tuning'],
  },
  {
    slug: 'quantization',
    term: 'Quantization',
    aka: 'Model quantization',
    short:
      "Quantization is a technique that stores a model's weights, and sometimes its activations, in lower-precision numbers, such as 8-bit or 4-bit instead of 16-bit, to cut memory use and speed up inference with a usually small loss in accuracy.",
    body: [
      { type: 'h2', text: 'Why does quantization matter for a business?' },
      {
        type: 'p',
        text: "A model's memory footprint is roughly its parameter count times the bytes used per parameter. A 70-billion-parameter model in 16-bit precision needs about 140 GB just for its weights. At 4-bit, that drops to roughly 35 GB, small enough for a single high-memory GPU. Smaller weights also move through memory faster, which often makes generation quicker.",
      },
      {
        type: 'table',
        caption: 'Approximate weight memory for a 70B model',
        head: ['Precision', 'Bytes per parameter', 'Weights only'],
        rows: [
          ['16-bit (FP16 or BF16)', '2', 'About 140 GB'],
          ['8-bit', '1', 'About 70 GB'],
          ['4-bit', '0.5', 'About 35 GB'],
        ],
      },
      {
        type: 'p',
        text: 'Common formats include GPTQ, AWQ, and GGUF for local runtimes, plus 8-bit and 4-bit floating point formats that newer GPUs support in hardware.',
      },
      {
        type: 'p',
        text: '**Example:** a legal team wants its fine-tuned model running on its own servers. Quantizing it to 4-bit lets it fit on hardware the team already owns, with accuracy checked against its own test set.',
      },
      { type: 'h3', text: 'When to be careful' },
      {
        type: 'p',
        text: 'Quality loss is usually small at 8-bit and modest at 4-bit, but it varies by model and task. Math, multi-step reasoning, and long-context work can degrade more. Always compare quantized and full-precision versions with [evals](/glossary/llm-evals). Quantizing the frozen base model during training is also what makes [QLoRA](/glossary/qlora) possible.',
      },
    ],
    related: ['qlora', 'inference', 'open-weight-models', 'distillation'],
    seeAlso: ['/guides/open-source-vs-closed-models-fine-tuning'],
  },
  {
    slug: 'context-window',
    term: 'Context window',
    aka: 'Context length',
    short:
      "A context window is the maximum amount of text, measured in tokens, that a language model can process in a single request, including the system prompt, conversation history, retrieved documents, tool results, and the model's own output.",
    body: [
      { type: 'h2', text: 'Why does the context window matter for a business?' },
      {
        type: 'p',
        text: "The context window is the model's working memory for one request. Anything outside it simply does not exist for the model. The original ChatGPT-era models handled about 4,000 [tokens](/glossary/tokens). By 2026, many frontier models accept hundreds of thousands, and some advertise a million or more.",
      },
      {
        type: 'p',
        text: 'A bigger window lets you pass whole contracts, large codebases, or long conversations. But size is not the same as skill. Models often use information buried in the middle of a very long prompt less reliably than information at the start or end, and every token you send adds cost and latency.',
      },
      {
        type: 'p',
        text: '**Example:** a 300-page policy manual might fit in a long context window, but sending it with every question is slow and expensive. Retrieving the three relevant sections with [RAG](/glossary/rag) is usually cheaper and often more accurate.',
      },
      { type: 'h3', text: 'Practical rules' },
      {
        type: 'ul',
        items: [
          '**Do not fill it because you can.** Send what the task needs.',
          '**Put key instructions first**, and restate critical ones near the end of very long inputs.',
          '**Budget for output.** Long answers and reasoning steps use the same window.',
          '**For agents,** summarize or prune old tool results so long runs do not overflow.',
        ],
      },
    ],
    related: ['tokens', 'rag', 'system-prompt', 'inference'],
    seeAlso: ['/guides/fine-tuning-vs-rag-vs-prompting'],
  },
  {
    slug: 'tokens',
    term: 'Tokens',
    aka: 'Tokenization',
    short:
      'Tokens are the units of text a language model reads and writes, typically whole words, word fragments, punctuation, or spaces. In English, one token averages roughly three quarters of a word, so 1,000 tokens is about 750 words.',
    body: [
      { type: 'h2', text: 'Why do tokens matter for a business?' },
      {
        type: 'p',
        text: 'Tokens are how AI usage is measured and billed. API providers charge per million input tokens and per million output tokens, with output usually priced several times higher. Limits such as the [context window](/glossary/context-window) and rate limits are counted in tokens too. Understanding them is the first step to forecasting cost.',
      },
      {
        type: 'p',
        text: 'A tokenizer splits text using a fixed vocabulary learned from training data, often with byte-pair encoding. Common English words are usually a single token. Rare words, code, numbers, and many non-English languages split into more tokens, so the same message can cost noticeably more in some languages.',
      },
      {
        type: 'table',
        caption: 'Rough conversions for English text',
        head: ['Text', 'Approximate tokens'],
        rows: [
          ['1 word', 'About 1.3 tokens'],
          ['750 words', 'About 1,000 tokens'],
          ['A 10-page report of about 5,000 words', 'About 6,700 tokens'],
        ],
      },
      {
        type: 'p',
        text: "**Example:** a support bot handling 50,000 conversations a month, each with about 2,000 input and 300 output tokens, uses roughly 100 million input and 15 million output tokens. Multiply each by the provider's per-million price to get the monthly bill, or estimate training costs with the [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator).",
      },
      {
        type: 'p',
        text: 'Tokenizers differ between model families, so the same text produces different token counts with different providers.',
      },
    ],
    related: ['context-window', 'inference', 'embeddings'],
    seeAlso: ['/guides/llm-fine-tuning-cost'],
  },
  {
    slug: 'hallucination',
    term: 'Hallucination',
    aka: 'Confabulation',
    short:
      'A hallucination is an output from a language model that sounds confident and plausible but is factually wrong, unsupported by its sources, or invented, such as a fake citation, a nonexistent policy, or an incorrect number.',
    body: [
      { type: 'h2', text: 'Why do hallucinations matter for a business?' },
      {
        type: 'p',
        text: 'Language models generate likely text, not verified facts. When the model lacks the information, or the prompt pushes it to answer anyway, it can produce fluent text that is simply wrong. In a business setting that means a support bot quoting a refund policy you do not have, or a legal draft citing a case that does not exist. Courts have sanctioned lawyers for filing briefs with AI-invented citations, so the risk is not theoretical.',
      },
      { type: 'h3', text: 'How to reduce them' },
      {
        type: 'ul',
        items: [
          '**Ground answers in sources** with [RAG](/glossary/rag), and instruct the model to say it does not know when the sources are silent.',
          '**Require citations** to retrieved passages, then check that each cited passage supports the claim.',
          "**Fine-tune on examples** that include correct refusals, so 'I don't have that information' becomes a learned behavior.",
          '**Constrain outputs** with structured formats and validation where possible.',
          '**Measure the rate** with [evals](/glossary/llm-evals) on realistic questions, including ones the model should decline.',
        ],
      },
      {
        type: 'p',
        text: '**Example:** suppose an FAQ assistant invents policy details on 1 in 25 test questions. Adding retrieval, a refusal instruction, and an automated citation check, then re-running the same test set, shows whether the fix worked and by how much.',
      },
      {
        type: 'p',
        text: 'No current method eliminates hallucination entirely. For high-stakes outputs, such as legal, medical, or financial content, keep a human review step.',
      },
    ],
    related: ['rag', 'llm-evals', 'guardrails', 'reasoning-models'],
    seeAlso: ['/guides/fine-tuning-vs-rag-vs-prompting'],
  },
  {
    slug: 'llm-evals',
    term: 'LLM evals',
    aka: 'LLM evaluation, model evaluation',
    short:
      'LLM evals are structured tests that measure how well a language model or AI system performs on specific tasks, using a fixed set of inputs scored by exact checks, rubrics, human reviewers, or another model acting as a judge.',
    body: [
      { type: 'h2', text: 'Why do evals matter for a business?' },
      {
        type: 'p',
        text: "Without evals, every prompt change, model upgrade, or fine-tune is judged by gut feel on a handful of examples. With evals, you can say 'the new version is correct on 94% of our 300 test cases, up from 81%', and catch regressions before customers do. Public benchmarks such as MMLU say little about your task. The evals that matter are built from your own data.",
      },
      {
        type: 'table',
        caption: 'Types of evals',
        head: ['Type', 'How it scores', 'Best for'],
        rows: [
          ['Programmatic', 'Code checks the output: valid JSON, correct label, matching number', 'Classification, extraction, structured output'],
          ['LLM as judge', 'A strong model grades against written criteria', 'Tone, completeness, summaries'],
          ['Human review', 'Experts rate or compare outputs', 'High-stakes or subjective work, and calibrating LLM judges'],
          ['End-to-end task', 'Checks whether the whole job was done correctly', 'AI agents and multi-step workflows'],
        ],
      },
      {
        type: 'p',
        text: '**Example:** before fine-tuning a contract-review model, a team writes 200 test clauses with the expected flags. They score the base model, the prompted model, and the fine-tuned model on the same set, and ship the fine-tune only if it wins.',
      },
      {
        type: 'p',
        text: '{{brand}} builds the eval set before any training starts, because a fine-tune without a baseline cannot prove it helped. Evals also track [hallucination](/glossary/hallucination) rates and catch [overfitting](/glossary/overfitting). If you are unsure what to measure, start with an [AI audit](/audit).',
      },
    ],
    related: ['hallucination', 'overfitting', 'fine-tuning', 'guardrails'],
    seeAlso: ['/services/custom-model-fine-tuning', '/guides/how-to-choose-ai-fine-tuning-partner'],
  },
  {
    slug: 'prompt-engineering',
    term: 'Prompt engineering',
    aka: 'Prompt design',
    short:
      "Prompt engineering is the practice of designing and refining the instructions, examples, and context given to a language model so it produces accurate, consistent, well-formatted outputs for a task, without changing the model's weights.",
    body: [
      { type: 'h2', text: 'Why does prompt engineering matter for a business?' },
      {
        type: 'p',
        text: 'It is the fastest and cheapest way to improve an AI system. A clear prompt can turn vague, inconsistent output into something usable in an afternoon, with no training data and no new infrastructure. It should almost always be tried before [fine-tuning](/glossary/fine-tuning).',
      },
      { type: 'h3', text: 'Techniques that reliably help' },
      {
        type: 'ul',
        items: [
          '**Be specific** about the task, audience, format, and length.',
          '**Give examples** of good outputs, a technique called few-shot prompting.',
          '**Provide context** the model cannot know, such as definitions, policies, or retrieved documents.',
          '**Ask for structure,** for example JSON with named fields, so outputs can be validated.',
          '**Allow reasoning** on complex tasks, either by asking for step-by-step work or by using a [reasoning model](/glossary/reasoning-models).',
        ],
      },
      {
        type: 'p',
        text: "**Example:** a marketing agency's product descriptions vary wildly in length and tone. Adding a brand voice guide, three approved examples, and a word limit to the prompt makes them consistent enough to publish after a light edit.",
      },
      { type: 'h3', text: 'Where prompting runs out' },
      {
        type: 'p',
        text: 'Prompts get long, costly, and fragile as rules pile up. If you are pasting thousands of tokens of instructions into every call, or quality plateaus despite careful iteration, the behavior may belong in the model itself. Compare the options in [fine-tuning vs RAG vs prompting](/guides/fine-tuning-vs-rag-vs-prompting).',
      },
    ],
    related: ['system-prompt', 'fine-tuning', 'context-window', 'llm-evals'],
    seeAlso: ['/guides/fine-tuning-vs-rag-vs-prompting'],
  },
  {
    slug: 'system-prompt',
    term: 'System prompt',
    aka: 'System message, system instructions',
    short:
      "A system prompt is a set of instructions given to a language model separately from the user's messages, defining its role, rules, tone, and constraints for an entire conversation or application, and typically treated as higher priority than user input.",
    body: [
      { type: 'h2', text: 'Why does the system prompt matter for a business?' },
      {
        type: 'p',
        text: 'The system prompt is where a product team encodes how the assistant should behave: who it is, what it can and cannot discuss, which tools to use, how to format answers, and when to hand off to a human. Users usually never see it, but it shapes every response.',
      },
      {
        type: 'p',
        text: "**Example:** a bank's assistant has a system prompt stating that it answers questions about accounts and products, never gives personalized investment advice, replies in plain English under 150 words, and offers a human agent whenever a customer mentions fraud.",
      },
      { type: 'h3', text: 'Writing a good one' },
      {
        type: 'ul',
        items: [
          'State the role and goal first, then the rules, then the output format.',
          'Explain the reason behind important rules. Models apply rules more sensibly when they know why.',
          'Include short examples for tricky cases.',
          'Version it and test it with [evals](/glossary/llm-evals), like code.',
        ],
      },
      { type: 'h3', text: 'Limits' },
      {
        type: 'p',
        text: 'A system prompt is guidance, not a security boundary. Determined users can sometimes extract or override it through prompt injection, so never put secrets in it, and enforce critical rules with [guardrails](/glossary/guardrails) and permissions in code. When a system prompt grows to thousands of tokens, consider moving stable behavior into the model with [fine-tuning](/glossary/fine-tuning).',
      },
    ],
    related: ['prompt-engineering', 'guardrails', 'context-window'],
    seeAlso: ['/services/domain-skills-system-files'],
  },
  {
    slug: 'inference',
    term: 'Inference',
    aka: 'Model serving',
    short:
      "Inference is the process of running a trained model to produce outputs from new inputs, such as generating a reply to a prompt, as distinct from training, which changes the model's weights.",
    body: [
      { type: 'h2', text: 'Why does inference matter for a business?' },
      {
        type: 'p',
        text: 'Training is usually a one-off or occasional cost. Inference is the ongoing cost: every user request, every agent step, every document processed. For a system in steady use, inference usually outweighs training over its lifetime, so the choices that affect it matter.',
      },
      { type: 'h3', text: 'What drives inference cost and speed' },
      {
        type: 'ul',
        items: [
          '**Model size:** bigger models cost more per token and respond more slowly.',
          '**Input and output length:** more [tokens](/glossary/tokens) means more cost, and output tokens are usually priced higher than input.',
          '**Latency targets:** time to first token and tokens per second shape the user experience.',
          '**Hosting choice:** pay-per-token APIs, dedicated endpoints, or self-hosted GPUs.',
          '**Optimizations:** [quantization](/glossary/quantization), batching, caching repeated prompt prefixes, and speculative decoding.',
        ],
      },
      {
        type: 'p',
        text: '**Example:** a company calls a large frontier model 2 million times a month for one classification task. A fine-tuned small model that matches it on that task can cut inference cost substantially and lower latency, because each call runs fewer parameters on a shorter prompt.',
      },
      {
        type: 'p',
        text: 'Popular open-source serving engines include vLLM and SGLang for GPU servers, and llama.cpp for local and CPU deployment. Weigh training spend against serving savings with the [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator).',
      },
    ],
    related: ['tokens', 'quantization', 'distillation', 'open-weight-models'],
    seeAlso: ['/guides/llm-fine-tuning-cost'],
  },
  {
    slug: 'open-weight-models',
    term: 'Open-weight models',
    aka: 'Open models, open-source LLMs',
    short:
      'Open-weight models are language models whose trained weights are publicly released for download, so anyone can run, inspect, and fine-tune them on their own hardware, subject to the license, even if the training data and code are not published.',
    body: [
      { type: 'h2', text: 'Why do open-weight models matter for a business?' },
      {
        type: 'p',
        text: 'With a closed model, you rent access through an API, and the provider controls the model, the pricing, and when versions are retired. With an open-weight model, you hold a copy. You can run it in your own cloud or on premises, keep sensitive data inside your environment, fine-tune it fully, and keep the exact version for as long as you like.',
      },
      {
        type: 'p',
        text: "Well-known families include Meta's Llama, Mistral, Alibaba's Qwen, DeepSeek, and Google's Gemma, plus OpenAI's gpt-oss models released in 2025. The best open-weight models trail the leading closed models by a modest margin on many benchmarks, and on narrow tasks a fine-tuned open model often matches them.",
      },
      { type: 'h3', text: 'Open weights are not always open source' },
      {
        type: 'p',
        text: 'Licenses vary. Some, such as Apache 2.0 or MIT, allow broad commercial use. Others add conditions, such as acceptable-use rules or limits for very large companies. Read the license before building on a model. Open-weight is the more precise term when training data and code are not released.',
      },
      {
        type: 'p',
        text: '**When to choose one:** strict data privacy requirements, high request volume, deep customization, or a wish to avoid vendor lock-in. **When not to:** low volume and no capacity to run infrastructure, where a managed API is simpler. {{brand}} fine-tunes open-weight models for most clients who need to own the result. See [open source vs closed models for fine-tuning](/guides/open-source-vs-closed-models-fine-tuning) and [fine-tuning data privacy](/guides/fine-tuning-data-privacy).',
      },
    ],
    related: ['base-model', 'fine-tuning', 'quantization', 'inference'],
    seeAlso: ['/guides/open-source-vs-closed-models-fine-tuning', '/guides/fine-tuning-data-privacy'],
  },
  {
    slug: 'base-model',
    term: 'Base model',
    aka: 'Pretrained model',
    short:
      'A base model is a language model after pretraining on large text corpora but before instruction tuning or preference training, so it predicts plausible continuations of text rather than following instructions or holding a conversation.',
    body: [
      { type: 'h2', text: 'What is the difference between a base model and an instruct model?' },
      {
        type: 'p',
        text: 'Pretraining teaches a model language and broad knowledge by predicting the next token across trillions of tokens of text. The result, the base model, is knowledgeable but not helpful by default. Ask it a question and it may continue with more questions, because that is what similar text often looks like. Post-training with [supervised fine-tuning](/glossary/supervised-fine-tuning) and preference methods such as [RLHF](/glossary/rlhf) turns it into an instruct or chat model that follows directions. Many open model families publish both versions at each size.',
      },
      { type: 'h3', text: 'Why it matters for a business' },
      {
        type: 'p',
        text: 'In fine-tuning, base model has two meanings: the raw pretrained checkpoint, and more loosely, whatever model you start from. The choice affects cost and results.',
      },
      {
        type: 'ul',
        items: [
          '**Start from an instruct model** for most business tasks. It already follows instructions, so fewer examples are needed.',
          '**Start from a raw base model** when you want full control over style and behavior, or are doing continued pretraining on a domain corpus.',
          '**Pick the smallest size** that passes your evals, because it will be cheaper at [inference](/glossary/inference).',
        ],
      },
      {
        type: 'p',
        text: '**Example:** a team building a contract classifier picks an 8B instruct model rather than a 70B one, because the fine-tuned 8B already meets their accuracy bar at a fraction of the serving cost.',
      },
    ],
    related: ['open-weight-models', 'fine-tuning', 'supervised-fine-tuning', 'rlhf'],
    seeAlso: ['/guides/open-source-vs-closed-models-fine-tuning'],
  },
  {
    slug: 'catastrophic-forgetting',
    term: 'Catastrophic forgetting',
    aka: 'Catastrophic interference',
    short:
      'Catastrophic forgetting is the tendency of a neural network to lose previously learned knowledge or skills when it is trained on new data, for example a fine-tuned language model getting worse at general reasoning or instruction following after narrow training.',
    body: [
      { type: 'h2', text: 'Why does catastrophic forgetting matter for a business?' },
      {
        type: 'p',
        text: 'When you fine-tune, the weight updates that teach the new task can overwrite what made the model generally useful. The symptom is a model that nails your format but now gives odd answers outside it, ignores instructions it used to follow, or loses safety behavior. The effect has been studied in neural networks since the late 1980s, and it still applies to large language models.',
      },
      { type: 'h3', text: 'How to limit it' },
      {
        type: 'ul',
        items: [
          '**Use parameter-efficient methods.** [PEFT](/glossary/peft) approaches such as LoRA leave the original weights frozen. Research has found LoRA forgets less than full fine-tuning, though it also learns less.',
          '**Mix in general data.** Adding a share of general instruction examples to your training set helps preserve broad skills.',
          '**Keep training gentle.** A high learning rate or many epochs on a small dataset speeds up both forgetting and [overfitting](/glossary/overfitting).',
          '**Test what you did not train.** Include general capability checks in your evals, not only the target task.',
        ],
      },
      {
        type: 'p',
        text: "**Example:** a model fine-tuned only on terse medical coding outputs starts answering every request with a code, even 'summarize this email'. Mixing a modest share of general instruction data into training restores normal behavior while keeping the coding gains.",
      },
      {
        type: 'p',
        text: '{{brand}} runs a general regression suite alongside task-specific evals on every fine-tune for exactly this reason.',
      },
    ],
    related: ['peft', 'overfitting', 'fine-tuning', 'lora'],
    seeAlso: ['/services/custom-model-fine-tuning'],
  },
  {
    slug: 'overfitting',
    term: 'Overfitting',
    short:
      'Overfitting is a training failure in which a model learns its training examples too closely, including their noise and quirks, so it scores well on that data but performs worse on new, unseen inputs.',
    body: [
      { type: 'h2', text: 'Why does overfitting matter for a business?' },
      {
        type: 'p',
        text: "The point of fine-tuning is to handle tomorrow's inputs, not to memorize yesterday's. An overfit model looks excellent in training metrics and disappoints in production. It may repeat phrases from training examples word for word, break on slightly different wording, or force a template onto inputs it does not fit.",
      },
      {
        type: 'p',
        text: 'The usual cause is a small dataset combined with too many training epochs or too high a learning rate. With language models, overfitting can appear after only a few passes over a small set.',
      },
      { type: 'h3', text: 'Warning signs' },
      {
        type: 'ul',
        items: [
          'Training loss keeps falling while validation loss starts rising.',
          'Outputs reuse exact sentences from the training data.',
          'Results are strong on examples like the training set and weak on real traffic.',
        ],
      },
      { type: 'h3', text: 'How to prevent it' },
      {
        type: 'ul',
        items: [
          'Hold out validation and test sets before training, and never train on them.',
          'Add varied data rather than more copies of the same pattern. See [how much data you need to fine-tune](/guides/how-much-data-to-fine-tune).',
          'Train for fewer epochs and keep the checkpoint with the best validation score.',
          'Evaluate on real, production-style inputs with [evals](/glossary/llm-evals).',
        ],
      },
      {
        type: 'p',
        text: '**Example:** a model trained for 10 epochs on 200 sales emails starts every reply with the same opening line. Cutting to 2 epochs and adding 300 more varied examples fixes it.',
      },
    ],
    related: ['catastrophic-forgetting', 'llm-evals', 'supervised-fine-tuning'],
    seeAlso: ['/guides/how-much-data-to-fine-tune'],
  },
  {
    slug: 'guardrails',
    term: 'Guardrails',
    aka: 'AI guardrails',
    short:
      'Guardrails are controls placed around a language model or AI agent that check inputs, outputs, and actions against rules, blocking or correcting content that is unsafe, off-topic, noncompliant, or incorrectly formatted before it reaches users or systems.',
    body: [
      { type: 'h2', text: 'Why do guardrails matter for a business?' },
      {
        type: 'p',
        text: "A model's instructions are suggestions. Guardrails are enforcement. They make sure a support bot does not leak another customer's data, an agent cannot issue a refund above its limit, and a reply that breaks a compliance rule never gets sent. They also give you an audit trail.",
      },
      {
        type: 'table',
        caption: 'Where guardrails sit',
        head: ['Layer', 'What it checks', 'Example'],
        rows: [
          ['Input', 'Prompt injection, abuse, off-topic requests, personal data', 'Redact a card number a customer pastes into chat'],
          ['Output', 'Format, policy, toxicity, unsupported claims', 'Reject a reply that promises a refund the policy does not allow'],
          ['Action', 'Tool permissions, spending limits, approvals', 'Require human sign-off before an agent emails a client'],
        ],
      },
      {
        type: 'p',
        text: 'Guardrails can be simple code such as regular expressions, schema validation, and allow lists, dedicated classifier models, or an LLM acting as a checker. Cloud platforms and open-source libraries offer ready-made versions.',
      },
      {
        type: 'p',
        text: '**When you need them:** any AI that faces customers, touches personal data, or can take actions. **The trade-off:** every check adds latency and can block legitimate requests, so tune them with [evals](/glossary/llm-evals) on real traffic. Guardrails complement a well-written [system prompt](/glossary/system-prompt) rather than replace it, and an [AI agent](/glossary/ai-agent) should get only the permissions its job requires.',
      },
    ],
    related: ['system-prompt', 'ai-agent', 'hallucination', 'tool-calling'],
    seeAlso: ['/services/enterprise-ai-adoption', '/guides/fine-tuning-data-privacy'],
  },
  {
    slug: 'tool-calling',
    term: 'Tool calling',
    aka: 'Function calling',
    short:
      'Tool calling is a capability that lets a language model request the use of external functions, such as an API, database query, or calculator, by outputting a structured call with arguments that the application executes before returning the result to the model.',
    body: [
      { type: 'h2', text: 'Why does tool calling matter for a business?' },
      {
        type: 'p',
        text: "On its own, a language model can only produce text from what it already knows. Tool calling connects it to live systems: it can check an order status, look up today's exchange rate, create a calendar event, or run a calculation exactly instead of estimating. It is the mechanism that turns a chatbot into an [AI agent](/glossary/ai-agent).",
      },
      { type: 'h3', text: 'How it works' },
      {
        type: 'ol',
        items: [
          'The developer describes each tool to the model: a name, a description, and a JSON schema for its parameters.',
          'Given a request, the model decides whether a tool is needed and outputs a structured call, such as a request to look up order 4821.',
          'The application, not the model, runs the function and sends the result back.',
          'The model uses the result to answer, or to make its next call.',
        ],
      },
      {
        type: 'p',
        text: "**Example:** a customer asks 'where is my order?'. The model calls the order lookup tool with the customer's ID, receives 'shipped, arriving Thursday', and writes a reply with the real delivery status.",
      },
      { type: 'h3', text: 'Practical notes' },
      {
        type: 'ul',
        items: [
          'Clear tool names and descriptions matter more than most teams expect.',
          'Validate every argument the model produces before executing anything.',
          'Give read-only tools freely, and put tools that write, spend, or send behind [guardrails](/glossary/guardrails).',
          'The [Model Context Protocol](/glossary/model-context-protocol) standardizes how tools are exposed, so one integration works across many AI clients.',
        ],
      },
    ],
    related: ['ai-agent', 'model-context-protocol', 'guardrails', 'multi-agent-system'],
    seeAlso: ['/guides/ai-agents-for-business-operations', '/services/ai-agent-swarms'],
  },
  {
    slug: 'reasoning-models',
    term: 'Reasoning models',
    aka: 'Thinking models, large reasoning models',
    short:
      'Reasoning models are language models trained to work through a problem in an extended chain of thought before giving a final answer, spending extra computation at inference time to improve accuracy on math, coding, planning, and multi-step analysis.',
    body: [
      { type: 'h2', text: 'Why do reasoning models matter for a business?' },
      {
        type: 'p',
        text: "Standard models answer in one pass. Reasoning models first generate intermediate reasoning, checking steps, trying alternatives, and correcting mistakes, and only then answer. OpenAI's o1, previewed in September 2024, made the approach mainstream, and DeepSeek-R1 in January 2025 showed that reinforcement learning on verifiable problems could produce strong reasoning in an open-weight model. Most major model families now offer a reasoning or extended-thinking mode.",
      },
      {
        type: 'p',
        text: 'The key idea is test-time compute: letting a model think longer on hard problems improves results, at the cost of more [tokens](/glossary/tokens) and higher latency.',
      },
      {
        type: 'table',
        caption: 'Standard and reasoning models compared',
        head: ['', 'Standard model', 'Reasoning model'],
        rows: [
          ['Best for', 'Drafting, extraction, simple answers, chat', 'Math, code, planning, complex analysis, agent decisions'],
          ['Speed', 'Fast', 'Slower, sometimes much slower'],
          ['Cost per task', 'Lower', 'Higher, because reasoning tokens are billed'],
        ],
      },
      {
        type: 'p',
        text: '**Example:** an analyst agent that reconciles figures across three financial reports benefits from a reasoning model, while the step that reformats the final table does not.',
      },
      {
        type: 'p',
        text: '**When not to use one:** simple, high-volume tasks where a fast model or a fine-tuned small model is accurate enough. Many systems route only the hard steps to a reasoning model. Visible reasoning can look convincing while still being wrong, so verify results with [evals](/glossary/llm-evals).',
      },
    ],
    related: ['inference', 'ai-agent', 'rlhf', 'hallucination'],
    seeAlso: ['/guides/ai-agents-for-business-operations'],
  },
];
