import type { IndustryDoc } from './types';

/*
 * Industry landing pages (/industries/[slug]). One doc per INDUSTRY_SLUGS entry, same order.
 * Write {{brand}} instead of the company name. Regulatory notes are general information, not legal advice.
 */

export const industryDocs: IndustryDoc[] = [
  /* ------------------------------------------------------------------ LEGAL */
  {
    slug: 'legal',
    name: 'Legal',
    title: 'Custom AI for law firms: fine-tuned models and agents that work like your best associate',
    seoTitle: 'AI for Law Firms: Custom Models & AI Agents',
    description:
      'How law firms use custom AI for contract review, intake and drafting, which ABA confidentiality rules apply, and what a two to six week pilot looks like.',
    eyebrow: 'Industry · Legal',
    answer:
      'Law firms use custom AI to review contracts against their own playbooks, triage client intake, draft first-pass documents and search past work product. The safest setups keep client data private and cite sources a lawyer can verify. ABA Formal Opinion 512 (2024) says lawyers using generative AI must protect client confidentiality, understand the tool and check its output before relying on it.',
    facts: [
      "ABA Formal Opinion 512, issued in July 2024, is the American Bar Association's first formal ethics opinion on generative AI. It covers competence, confidentiality, client communication, supervision and fees.",
      'ABA Model Rule 1.6(c) requires lawyers to make reasonable efforts to prevent unauthorized access to or disclosure of client information, which includes information sent to AI vendors.',
      'In Mata v. Avianca (S.D.N.Y. 2023), lawyers were sanctioned for filing a brief that cited court cases invented by ChatGPT.',
      'A 2024 Stanford RegLab and HAI study found that leading AI legal research tools still hallucinated on roughly 17% to 33% of test queries.',
      'A focused legal AI pilot, such as a contract review assistant for one agreement type, usually ships in two to six weeks.',
    ],
    useCases: [
      {
        title: 'Contract review against your playbook',
        detail:
          "The model flags clauses that deviate from your firm's or your client's fallback positions and suggests redlines in your house style. A lawyer approves every change.",
      },
      {
        title: 'Client intake triage',
        detail:
          'An agent collects matter details, checks them against your intake criteria and routes qualified matters to the right practice group with a clean summary. The formal conflict check still runs in your conflicts system.',
      },
      {
        title: 'First-draft documents',
        detail:
          'A model trained on your precedents drafts engagement letters, NDAs, demand letters and routine motions in your format, ready for attorney review.',
      },
      {
        title: 'Search across past work product',
        detail:
          "Retrieval over your document management system answers questions like 'have we negotiated this indemnity cap before?' with links to the source files.",
      },
      {
        title: 'Document review triage',
        detail:
          'Classifiers sort large productions by relevance, privilege risk and issue tags, so reviewers start with the documents most likely to matter.',
      },
      {
        title: 'Billing narrative cleanup',
        detail:
          'An automation rewrites time entries to match outside counsel guidelines before invoices go out, so fewer entries bounce back from client billing review.',
      },
    ],
    services: ['custom-model-fine-tuning', 'domain-skills-system-files', 'fine-tuning-datasets', 'enterprise-ai-adoption'],
    body: [
      { type: 'h2', text: 'Where does AI actually pay off for a law firm?' },
      {
        type: 'p',
        text: 'Legal work is mostly reading and writing under rules. That is exactly what large language models do well. The payoff comes from high-volume, pattern-heavy tasks where your firm already has the right answer written down somewhere: a clause playbook, a precedent bank, an intake checklist.',
      },
      {
        type: 'p',
        text: "Custom AI earns its keep when it learns your positions, not the internet's. [Fine-tuning](/glossary/fine-tuning) is training that adjusts a general model on your own examples so it writes and reasons in your format. [RAG](/glossary/rag), short for retrieval-augmented generation, is a setup that fetches relevant documents at question time so every answer can cite them.",
      },
      {
        type: 'p',
        text: 'Where AI does not pay off yet: unsupervised legal research, and anything filed with a court without human verification. Models still invent citations. Treat every AI output as a draft from a fast, confident junior who needs checking.',
      },
      { type: 'h2', text: 'Which legal tasks suit fine-tuning, RAG or an AI agent?' },
      {
        type: 'p',
        text: 'An [AI agent](/glossary/ai-agent) is a model that takes actions across your tools, such as reading an intake email, querying a system and filing a summary. Here is how the common legal use cases map to the right approach.',
      },
      {
        type: 'table',
        caption: 'Legal AI use cases by approach',
        head: ['Use case', 'Best approach', 'Data you need', 'Metric to track'],
        rows: [
          [
            'Contract review against a playbook',
            'Fine-tune plus RAG',
            '200-1,000 marked-up contracts for one agreement type, plus your clause playbook',
            'Deviations caught versus a senior reviewer; minutes per contract',
          ],
          [
            'First-draft documents',
            'Fine-tune',
            'Several hundred approved final documents with the instructions that produced them',
            'Edits between draft and final; partner review time',
          ],
          [
            'Precedent and knowledge search',
            'RAG',
            'Access to your document management system with matter-level permissions intact',
            'Answer accuracy on a test set; share of answers with a valid source link',
          ],
          [
            'Client intake triage',
            'Agent',
            'Intake forms, routing rules, practice group criteria',
            'Time from inquiry to first response; routing accuracy',
          ],
          [
            'Billing narrative cleanup',
            'Automation',
            'Time entries and outside counsel guidelines',
            'Invoice rejections and write-downs per month',
          ],
        ],
      },
      {
        type: 'p',
        text: 'The assumption behind the data column: one well-defined task, one jurisdiction, and examples a partner would sign off on. Messier scope means more data. Our guide to [fine-tuning vs RAG vs prompting](/guides/fine-tuning-vs-rag-vs-prompting) explains the trade-offs in more depth.',
      },
      { type: 'h2', text: 'How do confidentiality and ethics rules apply to AI in a law firm?' },
      {
        type: 'p',
        text: 'ABA Model Rule 1.6 requires reasonable efforts to prevent unauthorized disclosure of client information. Pasting privileged documents into a consumer chatbot that may train on its inputs is hard to square with that duty.',
      },
      {
        type: 'p',
        text: "ABA Formal Opinion 512 (July 2024) adds specifics. Lawyers must understand the tools they use, get informed client consent before putting confidential information into tools that could expose it, supervise AI output the way they would a junior's work, and bill fairly for AI-assisted time. Many state bars have published their own guidance as well.",
      },
      { type: 'p', text: 'In practice, that points to a short list of controls:' },
      {
        type: 'ul',
        items: [
          'Deploy inside your own cloud or a private tenant, with no third-party training on your data.',
          'Keep matter-level access controls, so the model only retrieves what the user could already open.',
          'Log every prompt and output for supervision and audit.',
          'Require citations to source documents and a lawyer sign-off before anything leaves the firm.',
        ],
      },
      {
        type: 'callout',
        title: 'General information, not legal advice',
        text: 'Ethics rules vary by jurisdiction, and your general counsel or ethics partner should approve the final setup. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control.',
      },
      { type: 'h2', text: 'What does a first legal AI pilot look like?' },
      {
        type: 'p',
        text: 'A focused pilot usually ships in two to six weeks. A typical four-week contract review pilot runs like this:',
      },
      {
        type: 'ol',
        items: [
          '**Week 1:** pick one agreement type, collect 200 to 500 historical contracts with final markups, and agree on what a correct review looks like.',
          "**Week 2:** clean and label the data, turn the playbook into the model's standing instructions, and set aside 50 contracts as a test set.",
          '**Week 3:** fine-tune or configure retrieval, then score the model against senior reviewers on the test set.',
          '**Week 4:** run it beside two or three lawyers on live matters, measure time saved and misses, and decide whether to scale.',
        ],
      },
      { type: 'h2', text: 'Should a law firm build, buy or partner for AI?' },
      {
        type: 'p',
        text: 'Buy when the task is generic. Off-the-shelf legal AI tools handle general research and summarization well enough for many firms, as long as lawyers verify the output.',
      },
      {
        type: 'p',
        text: 'Build when you have an in-house engineering team and the patience to maintain models, tests and security reviews. Few firms do, and those that do rarely want their lawyers waiting on an engineering backlog.',
      },
      {
        type: 'p',
        text: "Partner when the edge is your own know-how: your playbooks, your precedents, your clients' fallback positions. That is where a [custom fine-tuned model](/services/custom-model-fine-tuning) beats a generic tool, and where a specialist moves faster than a hiring plan. {{brand}} returns a plan, a price and an honest verdict within 24 hours. If you don't need us, we'll say so.",
      },
      { type: 'h2', text: 'Where should your firm start?' },
      {
        type: 'p',
        text: 'The firms that win with AI will not be the ones with the most tools. They will be the ones that taught a model how they practice. Take the 2-minute [AI audit](/audit) to see which of your workflows is ready, or [talk to us](/#contact) about a pilot.',
      },
    ],
    faqs: [
      {
        q: 'Can AI review contracts accurately enough for a law firm?',
        a: "AI contract review is accurate enough for first-pass review when it is trained or configured on one agreement type and your own playbook, then tested against senior reviewers before use. It is not accurate enough to replace a lawyer's sign-off. The practical target is a model that catches deviations reliably and explains why, so lawyers spend their time on judgment calls instead of reading boilerplate line by line.",
      },
      {
        q: 'Is it ethical for lawyers to use generative AI with client data?',
        a: "Lawyers can use generative AI with client data if they meet their existing duties. ABA Formal Opinion 512 (2024) says that means understanding the tool, protecting confidentiality under Model Rule 1.6, getting informed consent where client information could be exposed, reviewing output and billing fairly. A private deployment that never trains third-party models on your data makes the confidentiality analysis much simpler. Check your state bar's guidance too.",
      },
      {
        q: 'How much data does a law firm need to fine-tune a model?',
        a: 'A law firm usually needs a few hundred to a few thousand high-quality examples to fine-tune a model for one task, such as reviewing NDAs or drafting demand letters. Quality beats volume: 300 contracts with consistent, partner-approved markups teach more than 5,000 inconsistent ones. Where examples are thin, synthetic examples generated from your playbook can fill gaps, as long as lawyers review a sample.',
      },
      {
        q: 'Will AI hallucinate case law?',
        a: 'General-purpose AI models can and do hallucinate case law, meaning they produce citations that look real but are not. The lawyers in Mata v. Avianca (2023) were sanctioned for exactly this. The fix is design, not hope: retrieve from verified sources, require a citation for every legal claim, refuse to answer when no source is found, and keep a lawyer reviewing anything that reaches a court or client.',
      },
      {
        q: 'How long does it take to deploy AI in a law firm?',
        a: 'A focused legal AI pilot usually ships in two to six weeks and covers one workflow, such as NDA review or intake triage. Firm-wide rollout takes longer because of security review, document management integration and training. {{brand}} returns a plan, a price and an honest verdict within 24 hours, so a firm knows quickly whether a pilot is worth running at all.',
      },
    ],
    related: [
      '/services/custom-model-fine-tuning',
      '/services/domain-skills-system-files',
      '/guides/fine-tuning-data-privacy',
      '/guides/fine-tuning-vs-rag-vs-prompting',
      '/glossary/hallucination',
    ],
    keywords: [
      'AI for law firms',
      'legal AI',
      'AI contract review',
      'custom AI model for law firms',
      'generative AI for lawyers',
      'AI legal document drafting',
      'law firm AI agents',
      'ABA Formal Opinion 512',
      'private AI for law firms',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------- HEALTHCARE */
  {
    slug: 'healthcare',
    name: 'Healthcare',
    title: 'Custom AI for healthcare: private models and agents that cut the paperwork, not corners',
    seoTitle: 'AI for Healthcare: Custom Models, Agents & HIPAA',
    description:
      'How healthcare organizations use custom AI for clinical notes, prior authorization and patient messages, with HIPAA and BAA basics and a 2-6 week pilot plan.',
    eyebrow: 'Industry · Healthcare',
    answer:
      'Healthcare organizations use custom AI mostly for administrative work: drafting clinical notes from visit transcripts, assembling prior authorization packets, supporting coding, and drafting replies to patient messages for staff review. A 2016 Annals of Internal Medicine study found physicians spent nearly two hours on EHR and desk work for every hour of direct patient care. Any vendor handling PHI needs a HIPAA business associate agreement.',
    facts: [
      'Under HIPAA, a vendor that creates, receives, maintains or transmits protected health information (PHI) for a covered entity is a business associate and must sign a business associate agreement (BAA).',
      "HIPAA's Safe Harbor de-identification method requires removing 18 types of identifiers, such as names, most dates and medical record numbers.",
      'A 2016 time-and-motion study in Annals of Internal Medicine found physicians spent nearly two hours on EHR and desk work for every hour of direct patient care.',
      'Software intended to diagnose or treat disease can be regulated by the FDA as a medical device, while administrative support software, such as scheduling or billing tools, is generally excluded under the 21st Century Cures Act.',
      'A focused healthcare AI pilot, such as a note-drafting assistant for one specialty, usually ships in two to six weeks once data access is approved.',
    ],
    useCases: [
      {
        title: 'Clinical note drafting',
        detail:
          "A model fine-tuned on your specialty's notes turns visit transcripts into draft notes in your template. The clinician edits and signs.",
      },
      {
        title: 'Prior authorization packets',
        detail:
          'An agent pulls the relevant history, results and payer criteria into a draft request, so staff assemble a packet without digging through the whole chart.',
      },
      {
        title: 'Patient message triage',
        detail:
          'Portal messages are sorted by urgency and topic, with draft replies for routine questions. Anything clinical goes to a nurse or physician.',
      },
      {
        title: 'Coding support',
        detail:
          'The model suggests ICD-10 and CPT codes alongside the note text that supports them, so coders review evidence instead of hunting for it.',
      },
      {
        title: 'Referral and intake processing',
        detail:
          'Faxes and PDFs are read, key fields are extracted and queued into the right workflow, and low-confidence fields are flagged for a human.',
      },
      {
        title: 'Policy and protocol Q&A',
        detail:
          'Staff ask questions in plain English and get answers from your own policies and protocols, with a link to the source document.',
      },
    ],
    services: ['custom-model-fine-tuning', 'fine-tuning-datasets', 'enterprise-ai-adoption', 'multi-agent-harnesses'],
    body: [
      { type: 'h2', text: 'Where does AI actually pay off in healthcare?' },
      {
        type: 'p',
        text: 'Healthcare runs on documentation. Clinicians write notes, staff chase authorizations, coders translate charts into billing codes. That is mostly language work, and it is where custom AI pays off first.',
      },
      {
        type: 'p',
        text: 'The fact that sets the stakes: a 2016 Annals of Internal Medicine study found physicians spent nearly two hours on EHR and desk work for every hour with patients. Shrinking that ratio is the most defensible AI business case in the sector, and the easiest one to measure.',
      },
      {
        type: 'p',
        text: 'Where AI does not pay off yet: autonomous diagnosis or treatment decisions. Those carry clinical risk, may fall under FDA medical device rules, and need validation far beyond a pilot. Start with work a qualified human already reviews.',
      },
      { type: 'h2', text: 'Which healthcare AI use cases need fine-tuning, RAG or an agent?' },
      {
        type: 'p',
        text: "[Fine-tuning](/glossary/fine-tuning) is training that adapts a general model to your own examples, such as your specialty's note style. [RAG](/glossary/rag) is a setup that retrieves your documents at question time so answers can cite their source. An agent is a model that carries out multi-step tasks across your systems.",
      },
      {
        type: 'table',
        caption: 'Healthcare AI use cases by approach',
        head: ['Use case', 'Best approach', 'Data you need', 'Metric to track'],
        rows: [
          [
            'Clinical note drafting',
            'Fine-tune',
            '500-2,000 de-identified transcript and final-note pairs per specialty',
            'Clinician edit time per note; after-hours documentation time',
          ],
          [
            'Prior authorization packets',
            'Agent plus RAG',
            'Payer criteria documents, sample approved and denied requests',
            'Staff hours per packet; first-pass approval rate',
          ],
          [
            'Patient message triage',
            'Fine-tune plus rules',
            'Several thousand labeled historical messages',
            'Urgent messages correctly escalated; response time',
          ],
          [
            'Coding support',
            'Fine-tune plus RAG',
            'Coded charts with auditor-confirmed codes',
            'Coder agreement rate; denials tied to coding errors',
          ],
          [
            'Policy and protocol Q&A',
            'RAG',
            'Current policies, protocols and formularies',
            'Answer accuracy on a test set; share of answers with a source link',
          ],
        ],
      },
      {
        type: 'p',
        text: 'The data column assumes one specialty or one workflow at a time. Ranges widen as scope grows. Our guide on [how much data you need to fine-tune](/guides/how-much-data-to-fine-tune) explains the reasoning behind those numbers.',
      },
      { type: 'h2', text: 'How do HIPAA and patient privacy rules apply to AI?' },
      {
        type: 'p',
        text: 'HIPAA treats any vendor that handles protected health information (PHI) on your behalf as a business associate. That includes AI vendors, model hosts and the team building your system. No signed BAA, no PHI.',
      },
      {
        type: 'p',
        text: 'Training data needs special care. HIPAA allows two de-identification routes: Safe Harbor, which removes 18 identifier types, and Expert Determination, where a qualified expert certifies that re-identification risk is very small. De-identified data is far easier to use for fine-tuning.',
      },
      { type: 'p', text: 'The controls that matter most:' },
      {
        type: 'ul',
        items: [
          'Host models in your own cloud account or a HIPAA-eligible environment covered by a BAA.',
          'Apply the minimum necessary standard: the model sees only the fields the task needs.',
          'Keep audit logs of every prompt, output and user.',
          'Add [guardrails](/glossary/guardrails), meaning automated checks that block unsafe or out-of-scope output, and route clinical content to a licensed human.',
        ],
      },
      {
        type: 'callout',
        title: 'General information, not legal advice',
        text: 'State privacy laws and payer contracts can add obligations on top of HIPAA, so have your privacy officer approve the design. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control.',
      },
      { type: 'h2', text: 'What does a first healthcare AI pilot look like?' },
      {
        type: 'p',
        text: 'A focused pilot usually ships in two to six weeks once data access is approved. A five-week note-drafting pilot for one specialty might run like this:',
      },
      {
        type: 'ol',
        items: [
          '**Week 1:** confirm the BAA chain, pick one specialty and note type, and define what a good note looks like with two or three clinicians.',
          '**Week 2:** pull and de-identify 500 to 2,000 transcript and note pairs, and hold back 100 for testing.',
          '**Week 3:** fine-tune a model and run [evals](/glossary/llm-evals), meaning repeatable tests that score output against clinician-approved notes.',
          '**Week 4:** shadow mode. Clinicians see drafts beside their normal workflow and rate them.',
          '**Week 5:** measure edit time and error types, then decide to scale, fix or stop.',
        ],
      },
      { type: 'h2', text: 'Should a healthcare organization build, buy or partner?' },
      {
        type: 'p',
        text: 'Buy for commodity workflows. Ambient scribe products and EHR-native AI features are improving quickly and may be enough for general documentation, provided the vendor signs a BAA.',
      },
      {
        type: 'p',
        text: 'Build or partner when your workflow is specific: a specialty template, a payer mix, a patient population, or a privacy requirement that rules out shared software. A [custom fine-tuned model](/services/custom-model-fine-tuning) running in your own environment gives you control over data, cost per note and behavior.',
      },
      {
        type: 'p',
        text: "{{brand}} returns a plan, a price and an honest verdict within 24 hours. If an off-the-shelf tool fits your workflow better, we'll say so.",
      },
      { type: 'h2', text: 'Where should you start?' },
      {
        type: 'p',
        text: 'Start where clinicians already review the output and the paperwork is heaviest. Take the 2-minute [AI audit](/audit) to rank your workflows, or [book a conversation](/#contact) about a pilot that keeps PHI where it belongs.',
      },
    ],
    faqs: [
      {
        q: 'Is it HIPAA compliant to use AI with patient data?',
        a: 'Using AI with patient data can be HIPAA compliant when every vendor that touches protected health information signs a business associate agreement, access follows the minimum necessary standard, and data is encrypted and logged. HIPAA does not ban AI. It regulates how PHI is handled. Consumer chatbots without a BAA should never receive patient data, and de-identifying training data under Safe Harbor or Expert Determination reduces risk further.',
      },
      {
        q: 'Can AI write clinical notes accurately?',
        a: "AI can draft clinical notes accurately enough to save clinicians time when the model is trained on one specialty's notes and tested against clinician-approved examples. It still makes errors, such as omitting a pertinent negative or misattributing a symptom, so a clinician must review and sign every note. The metric that matters is edit time per note, not whether the first draft is perfect.",
      },
      {
        q: 'Does healthcare AI need FDA approval?',
        a: 'Healthcare AI needs FDA oversight only if it meets the definition of a medical device, typically software intended to diagnose, treat or prevent disease. Administrative software, such as scheduling, billing or prior authorization support, generally falls outside that definition under the 21st Century Cures Act. Clinical decision support sits in between, so get regulatory advice before building anything that recommends a diagnosis or treatment.',
      },
      {
        q: 'Should we fine-tune a model or buy an off-the-shelf healthcare AI tool?',
        a: 'Buy an off-the-shelf healthcare AI tool when your workflow is common and the vendor will sign a BAA. Fine-tune a custom model when your specialty, templates or patient population differ enough that generic output needs heavy editing, or when AI must run inside your own environment. Many organizations do both: buy for general documentation and build for the workflow that defines them.',
      },
      {
        q: 'How long does a healthcare AI pilot take?',
        a: 'A focused healthcare AI pilot usually ships in two to six weeks once data access and the BAA chain are approved. Approvals can take longer than the build, so start the privacy review early. {{brand}} scopes pilots to one workflow, such as note drafting for one specialty, and measures edit time and error types before anyone decides to scale.',
      },
    ],
    related: [
      '/services/custom-model-fine-tuning',
      '/services/fine-tuning-datasets',
      '/guides/fine-tuning-data-privacy',
      '/guides/how-much-data-to-fine-tune',
      '/glossary/guardrails',
    ],
    keywords: [
      'AI for healthcare',
      'healthcare AI solutions',
      'HIPAA compliant AI',
      'AI clinical documentation',
      'AI prior authorization',
      'custom AI model for healthcare',
      'AI for medical practices',
      'AI patient message triage',
    ],
    updated: '2026-10-27',
  },

  /* ----------------------------------------------------- FINANCIAL SERVICES */
  {
    slug: 'financial-services',
    name: 'Financial services',
    title: 'Custom AI for financial services: compliant models and research agents that never blink',
    seoTitle: 'AI for Financial Services: Custom Models & Agents',
    description:
      'How banks, wealth managers and fintechs use custom AI for research, KYC and client communications, plus SEC, FINRA, GLBA and SR 11-7 basics and a pilot plan.',
    eyebrow: 'Industry · Financial services',
    answer:
      "Financial services firms use custom AI to summarize filings and research, extract data from KYC and loan documents, draft client communications for compliance review, and answer internal policy questions. Existing rules still apply: FINRA's Regulatory Notice 24-09 (2024) reminded member firms that supervision and recordkeeping obligations cover generative AI, and bank models fall under model risk management guidance such as SR 11-7.",
    facts: [
      'FINRA Regulatory Notice 24-09 (June 2024) reminds member firms that existing obligations, including supervision, communications and recordkeeping rules, apply when they use generative AI.',
      'SR 11-7, the 2011 Federal Reserve and OCC guidance on model risk management, expects banks to validate models, document them and subject them to effective challenge.',
      'SEC Rule 17a-4 and FINRA rules require broker-dealers to preserve business communications, which can include AI-drafted messages sent to clients.',
      'The Gramm-Leach-Bliley Act (GLBA) Safeguards Rule requires financial institutions to protect customer information, including oversight of service providers that handle it.',
      'CFPB circulars from 2022 and 2023 say lenders using complex algorithms must still give specific and accurate reasons when they deny credit.',
    ],
    useCases: [
      {
        title: 'Research and filing summaries',
        detail:
          "Agents read 10-Ks, 10-Qs, earnings call transcripts and news as they land, then produce summaries in your analysts' format with links to the source passage.",
      },
      {
        title: 'KYC and onboarding document extraction',
        detail:
          'Models pull names, addresses, ownership structures and dates from IDs, corporate documents and statements, and flag mismatches for an analyst.',
      },
      {
        title: 'Client communication drafting',
        detail:
          'Advisors get first drafts of emails and review letters in your approved language, routed through compliance review and archived like any other communication.',
      },
      {
        title: 'Policy and procedure Q&A',
        detail:
          'Staff ask how a procedure works and get an answer grounded in your current manuals, with the source cited.',
      },
      {
        title: 'Advisor meeting notes to CRM',
        detail:
          'Meeting notes become structured CRM updates, follow-up tasks and a draft summary for the client file.',
      },
      {
        title: 'AML alert triage',
        detail:
          'AI assembles the context behind a transaction monitoring alert so investigators start with a narrative, not a spreadsheet. The decision to escalate or file stays with a human.',
      },
    ],
    services: ['trading-financial-ai-pipelines', 'custom-model-fine-tuning', 'multi-agent-harnesses', 'enterprise-ai-adoption'],
    body: [
      { type: 'h2', text: 'Where does AI actually pay off in financial services?' },
      {
        type: 'p',
        text: 'Finance runs on documents and disclosures. Filings, statements, onboarding packs, policy manuals and client letters all follow strict formats. Language models handle that kind of work well once they learn your formats and your approved wording.',
      },
      {
        type: 'p',
        text: 'The biggest wins come where skilled people spend hours reading before they spend minutes deciding: research, KYC review, alert investigation. AI does the reading. People keep the decision.',
      },
      {
        type: 'p',
        text: 'Where AI does not pay off yet: unsupervised investment advice, autonomous credit decisions and anything that sends client-facing text without review. Regulators have been clear that the firm owns the output, whoever or whatever wrote it.',
      },
      { type: 'h2', text: 'Which financial services use cases need fine-tuning, RAG or an agent?' },
      {
        type: 'p',
        text: '[RAG](/glossary/rag) is a setup that retrieves your own documents at question time so answers can cite them. An [AI agent](/glossary/ai-agent) is a model that takes multi-step actions across tools, such as pulling a filing, extracting figures and posting a summary to your research system.',
      },
      {
        type: 'table',
        caption: 'Financial services AI use cases by approach',
        head: ['Use case', 'Best approach', 'Data you need', 'Metric to track'],
        rows: [
          [
            'Filing and earnings summaries',
            'Agent plus RAG',
            'Feeds of filings and transcripts, 50-100 example summaries in your format',
            'Analyst hours per company per quarter; factual error rate',
          ],
          [
            'KYC document extraction',
            'Fine-tune',
            '1,000-5,000 labeled documents across your common document types',
            'Field-level accuracy; cases needing manual rework',
          ],
          [
            'Client communication drafts',
            'Fine-tune plus guardrails',
            'Several hundred approved communications and your compliance rules',
            'Compliance rejection rate; drafting time',
          ],
          [
            'Policy Q&A',
            'RAG',
            'Current policies and procedures',
            'Answer accuracy on a test set; escalations to compliance',
          ],
          [
            'AML alert triage',
            'Agent',
            'Historical alerts with investigator dispositions',
            'Time per alert; reviewer agreement',
          ],
        ],
      },
      {
        type: 'p',
        text: 'The data ranges assume one document family or one workflow at a time. For market-facing work, our [trading and financial AI pipelines](/services/trading-financial-ai-pipelines) service builds always-on research loops around reasoning models, with every claim linked to its source.',
      },
      { type: 'h2', text: 'How do SEC, FINRA and banking rules apply to AI?' },
      {
        type: 'p',
        text: "Regulators have mostly said the same thing: existing rules apply. FINRA Regulatory Notice 24-09 (2024) reminded firms that supervision, communications and recordkeeping obligations cover generative AI. AI-drafted client messages may need to be preserved under SEC Rule 17a-4 and reviewed under FINRA's communications rules.",
      },
      {
        type: 'p',
        text: 'Banks also face model risk management expectations. SR 11-7 (2011) asks for validation, documentation, ongoing monitoring and effective challenge for models used in decisions. A fine-tuned model is a model, so plan the validation file from day one.',
      },
      {
        type: 'p',
        text: 'Privacy and fairness matter too. The GLBA Safeguards Rule requires protecting customer information, including when service providers handle it. Lenders using algorithms must still give specific reasons for adverse credit decisions, according to CFPB guidance.',
      },
      {
        type: 'ul',
        items: [
          'Run models in your own cloud or a private tenant, with no third-party training on your data.',
          'Archive prompts and outputs alongside your other books and records.',
          'Keep [evals](/glossary/llm-evals), meaning repeatable scored tests, as validation evidence.',
          'Keep a human approver on every client-facing or decision-making output.',
        ],
      },
      {
        type: 'callout',
        title: 'General information, not legal advice',
        text: 'Your compliance and model risk teams should sign off on the design. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control, which keeps vendor due diligence simple.',
      },
      { type: 'h2', text: 'What does a first financial services AI pilot look like?' },
      {
        type: 'p',
        text: 'A focused pilot usually ships in two to six weeks. A four-week research summary pilot looks like this:',
      },
      {
        type: 'ol',
        items: [
          '**Week 1:** pick one coverage universe, such as 30 companies, agree on the summary format with two analysts, and confirm data sources and licensing.',
          '**Week 2:** build the ingestion agent for filings and transcripts, and assemble 50 to 100 gold-standard summaries.',
          '**Week 3:** tune prompts or [fine-tune](/glossary/fine-tuning) a model, then run evals on factual accuracy and source linking.',
          '**Week 4:** analysts use it on live earnings, log every error, and compliance reviews the audit trail before any scale-up.',
        ],
      },
      { type: 'h2', text: 'Should a financial firm build, buy or partner?' },
      {
        type: 'p',
        text: 'Buy where vendors already pass your due diligence: general productivity assistants, transcription, standard document capture. There is no prize for rebuilding commodity tools.',
      },
      {
        type: 'p',
        text: 'Build or partner where your process, data or risk appetite is the edge: proprietary research formats, unusual document types, private deployment requirements. A good partner hands over documentation strong enough for model validation, not just a demo. {{brand}} returns a plan, a price and an honest verdict within 24 hours.',
      },
      { type: 'h2', text: 'Where should your firm start?' },
      {
        type: 'p',
        text: 'Pick the workflow where your best people read the most and decide the least. Take the 2-minute [AI audit](/audit) to rank candidates, or [talk to us](/#contact) about a pilot your compliance team can live with.',
      },
    ],
    faqs: [
      {
        q: 'Can banks and broker-dealers use generative AI under current rules?',
        a: 'Banks and broker-dealers can use generative AI under current rules, provided they meet existing obligations. FINRA Regulatory Notice 24-09 (2024) confirms that supervision, communications and recordkeeping rules apply to AI tools, and banks should bring material AI models under model risk management guidance such as SR 11-7. In practice that means documented testing, archived outputs, human review of client-facing content and clear vendor oversight.',
      },
      {
        q: 'Do AI-generated client emails need to be archived?',
        a: 'AI-generated client emails generally need to be archived the same way as human-written ones. For broker-dealers, SEC Rule 17a-4 and FINRA rules require preserving business communications, and they do not exempt text because a model drafted it. The safest pattern is drafting inside a system that routes messages through normal review and archiving, rather than letting staff paste from a separate chatbot.',
      },
      {
        q: 'Is a fine-tuned model subject to SR 11-7 model risk management?',
        a: 'A fine-tuned model used to inform business decisions at a bank is likely within the scope of SR 11-7, because the guidance defines models broadly. That means documenting purpose, data and limits, validating performance with independent testing, and monitoring after launch. Building evals and a validation file during the pilot costs far less than reconstructing them later. Confirm scope with your model risk team.',
      },
      {
        q: 'How do financial firms keep client data private when using AI?',
        a: 'Financial firms keep client data private with AI by deploying models in their own cloud or a private tenant, contractually blocking vendors from training on their data, encrypting data in transit and at rest, and restricting what each user can retrieve. The GLBA Safeguards Rule expects oversight of service providers that handle customer information, so vendor due diligence and DPAs belong in the plan from the start.',
      },
      {
        q: 'What is the best first AI project for a wealth or asset management firm?',
        a: 'The best first AI project for a wealth or asset management firm is usually research summarization or meeting notes to CRM. Both are high volume, low risk, easy to measure in hours saved and already reviewed by a professional. Avoid starting with anything that generates personalized advice or places trades automatically. {{brand}} scopes these as focused pilots that usually ship in two to six weeks.',
      },
    ],
    related: [
      '/services/trading-financial-ai-pipelines',
      '/services/custom-model-fine-tuning',
      '/services/multi-agent-harnesses',
      '/guides/fine-tuning-data-privacy',
      '/guides/open-source-vs-closed-models-fine-tuning',
    ],
    keywords: [
      'AI for financial services',
      'AI for banks',
      'generative AI FINRA compliance',
      'AI for wealth management',
      'AI KYC document extraction',
      'AI financial research agent',
      'custom AI model for finance',
      'SR 11-7 AI model risk',
    ],
    updated: '2026-10-27',
  },

  /* -------------------------------------------------------------- ECOMMERCE */
  {
    slug: 'ecommerce',
    name: 'Ecommerce',
    title: 'Custom AI for ecommerce: agents that sell, support and write like your best merchandiser',
    seoTitle: 'AI for Ecommerce: Custom AI Agents & Models',
    description:
      'How ecommerce brands use custom AI for product content, support, returns and merchandising, plus the FTC fake review rule, privacy basics and a pilot plan.',
    eyebrow: 'Industry · Ecommerce',
    answer:
      "Ecommerce brands use custom AI to write product descriptions in their brand voice, answer order and sizing questions around the clock, process returns, enrich catalog data and draft marketing variants. The rules have teeth: the FTC's 2024 rule on fake reviews bans AI-generated reviews that pose as real customers, and civil penalties can apply. Start with support and catalog content, where results are easy to measure.",
    facts: [
      "The FTC's final rule on fake reviews and testimonials, announced in August 2024, bans fake reviews, including AI-generated reviews attributed to people who do not exist or never used the product.",
      "Baymard Institute's benchmark puts the average documented online cart abandonment rate at roughly 70%.",
      'The EU AI Act requires that people be informed when they are interacting with an AI system such as a chatbot, unless that is obvious from the context.',
      'Under GDPR and the California CCPA/CPRA, shoppers have rights over personal data used for personalization, including access, deletion and opting out of certain uses.',
      'A focused ecommerce AI pilot, such as a support agent for order status and returns, usually ships in two to six weeks.',
    ],
    useCases: [
      {
        title: 'Product descriptions at catalog scale',
        detail:
          'A model trained on your best-performing copy writes titles, descriptions and bullet points in your voice for every new SKU, with specs pulled from your product data.',
      },
      {
        title: 'Order and returns support agent',
        detail:
          "An agent answers 'where is my order', processes eligible returns and exchanges, and hands anything unusual to a human with full context.",
      },
      {
        title: 'Catalog enrichment and tagging',
        detail:
          'Models fill missing attributes, normalize sizes and colors, and tag products for search and filters across thousands of SKUs.',
      },
      {
        title: 'Sizing and product Q&A',
        detail:
          'A shopping assistant answers fit, compatibility and material questions from your size charts, specs, policies and genuine reviews.',
      },
      {
        title: 'Review moderation',
        detail:
          'AI flags reviews that look incentivized, off-topic or abusive for a human moderator, which helps keep your review program on the right side of FTC rules.',
      },
      {
        title: 'Marketing content pipeline',
        detail:
          'Email, ad and social variants are generated from one brief and checked against brand rules before a marketer approves them.',
      },
    ],
    services: ['ai-agent-swarms', 'ai-content-engine', 'custom-model-fine-tuning', 'enterprise-ai-adoption'],
    body: [
      { type: 'h2', text: 'Where does AI actually pay off in ecommerce?' },
      {
        type: 'p',
        text: 'Ecommerce produces two things at scale: product content and customer questions. Both are language problems with clear right answers, which makes them the best place for custom AI to start.',
      },
      {
        type: 'p',
        text: 'Support is usually the fastest win. A large share of tickets ask the same few questions: order status, returns, sizing, shipping times. An agent connected to your store and shipping data can answer many of them instantly and correctly, at 3 a.m. on a holiday weekend.',
      },
      {
        type: 'p',
        text: 'Product content is the second win. Every new SKU needs a title, description, attributes and tags. A model that writes like your best merchandiser turns a weekly bottleneck into a review task.',
      },
      {
        type: 'p',
        text: 'Where AI does not pay off yet: fully autonomous pricing and inventory decisions without guardrails, and fake social proof of any kind. The first burns margin. The second is now illegal in the US.',
      },
      { type: 'h2', text: 'Which ecommerce use cases need fine-tuning, RAG or an agent?' },
      {
        type: 'p',
        text: 'An [AI agent](/glossary/ai-agent) is a model that takes actions through tools, such as looking up an order and issuing a return label. [Fine-tuning](/glossary/fine-tuning) is training that teaches a general model your voice and formats from your own examples.',
      },
      {
        type: 'table',
        caption: 'Ecommerce AI use cases by approach',
        head: ['Use case', 'Best approach', 'Data you need', 'Metric to track'],
        rows: [
          [
            'Product descriptions',
            'Fine-tune',
            '300-1,000 of your best product pages plus structured product data',
            'Time to publish new SKUs; conversion on AI-written pages versus a control',
          ],
          [
            'Order and returns support',
            'Agent',
            'Store, shipping and returns APIs; 1,000+ resolved tickets',
            'Tickets resolved without a human; customer satisfaction',
          ],
          [
            'Catalog enrichment',
            'Fine-tune or automation',
            'Labeled product records and your attribute taxonomy',
            'Attribute completeness; zero-result search rate',
          ],
          [
            'Sizing and product Q&A',
            'RAG',
            'Size charts, specs, reviews, policies',
            'Answer accuracy; size-related return rate',
          ],
          [
            'Marketing variants',
            'Automation plus guardrails',
            'Brand guide and past approved campaigns',
            'Production time per campaign; approval rate',
          ],
        ],
      },
      {
        type: 'p',
        text: '[RAG](/glossary/rag), short for retrieval-augmented generation, means fetching your documents at answer time so the response quotes current policy instead of guessing. The data figures above assume one brand voice and one storefront. Multiple brands or languages need separate examples for each.',
      },
      { type: 'h2', text: 'What rules apply to AI in ecommerce?' },
      {
        type: 'p',
        text: "The FTC's 2024 rule on fake reviews and testimonials bans fake reviews, including AI-generated ones attributed to people who do not exist or never used the product. It also covers buying positive reviews and suppressing negative ones, and civil penalties can apply.",
      },
      {
        type: 'p',
        text: 'Personalization runs on personal data, so privacy law applies. GDPR in Europe and the CCPA/CPRA in California give shoppers rights to access and delete their data and to opt out of certain uses. Build recommendations on data you are allowed to use, and honor opt-outs everywhere.',
      },
      {
        type: 'p',
        text: 'If you sell into the EU, the AI Act requires telling people when they are talking to an AI system. A clear label on your chat widget covers it.',
      },
      {
        type: 'ul',
        items: [
          'Never generate reviews, ratings or testimonials. Use AI only to moderate or summarize real ones.',
          'Ground support answers in your actual policies, so the agent cannot promise refunds you do not offer.',
          'Add [guardrails](/glossary/guardrails): automated checks that block off-brand, unsafe or off-policy output.',
          'Keep customer data in systems you control. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control.',
        ],
      },
      {
        type: 'callout',
        title: 'General information, not legal advice',
        text: 'Rules differ by country and state. Have counsel review anything that touches reviews, endorsements or personal data before launch.',
      },
      { type: 'h2', text: 'What does a first ecommerce AI pilot look like?' },
      { type: 'p', text: 'A focused pilot usually ships in two to six weeks. A four-week support agent pilot:' },
      {
        type: 'ol',
        items: [
          '**Week 1:** export 90 days of tickets, find the top five intents by volume, and connect read-only access to orders and shipping.',
          '**Week 2:** build the agent for the top two intents, ground it in your policies, and write test cases from real tickets.',
          '**Week 3:** run it in draft mode, where your support team sees suggested replies and approves or edits them.',
          '**Week 4:** switch on auto-resolve for the intents that pass, measure resolution rate and satisfaction, and plan the next intents.',
        ],
      },
      { type: 'h2', text: 'Should an ecommerce brand build, buy or partner?' },
      {
        type: 'p',
        text: "Buy if your support volume is modest and your platform's built-in AI is good enough. Many helpdesk tools now ship decent assistants for simple questions.",
      },
      {
        type: 'p',
        text: 'Partner when your voice, catalog or operations are the differentiator: thousands of SKUs, multiple storefronts, custom returns logic, or a brand that refuses to sound generic. That is where [AI agent systems](/services/ai-agent-swarms) and a [content engine](/services/ai-content-engine) trained on your best work earn their place. {{brand}} returns a plan, a price and an honest verdict within 24 hours.',
      },
      { type: 'h2', text: 'Where should your store start?' },
      {
        type: 'p',
        text: 'Start with the questions your team answers fifty times a day. Take the 2-minute [AI audit](/audit) or [tell us about your store](/#contact), and let your team get back to the work only humans can do.',
      },
    ],
    faqs: [
      {
        q: 'Can AI write product descriptions that actually sound like our brand?',
        a: 'AI can write product descriptions that sound like your brand when the model is fine-tuned on a few hundred of your best existing pages, rather than prompted with a style guide alone. Fine-tuning teaches tone, structure and vocabulary by example. Pair it with structured product data so specs are accurate, and have a merchandiser spot-check a sample of each batch before it goes live.',
      },
      {
        q: 'Is it legal to use AI-generated reviews?',
        a: "Using AI-generated reviews that pose as real customers is illegal in the US. The FTC's 2024 rule on fake reviews and testimonials bans reviews attributed to people who do not exist or who never used the product, and civil penalties can apply. AI can legitimately summarize genuine reviews, moderate them or help real customers write their own, as long as the reviews reflect real experiences.",
      },
      {
        q: 'Will an AI support agent frustrate our customers?',
        a: 'An AI support agent frustrates customers when it guesses, loops or blocks access to a human. It works when it is connected to real order data, grounded in your actual policies, limited to intents it handles well and quick to hand off with full context. Launching in draft mode first, where human agents approve replies, catches weak spots before customers ever see them.',
      },
      {
        q: 'What metrics should an ecommerce AI pilot track?',
        a: 'An ecommerce AI pilot should track metrics tied to the workflow it changes. For support: resolution rate without a human, customer satisfaction and handle time. For product content: time to publish new SKUs and conversion against a control group. For sizing assistants: size-related return rate. Record a baseline before launch so the comparison is honest, and watch for quality drops, not just speed gains.',
      },
      {
        q: 'Should a small ecommerce brand fine-tune its own model?',
        a: "A small ecommerce brand rarely needs to fine-tune its own model on day one. Built-in helpdesk AI and good prompting often cover early support needs. Fine-tuning starts to make sense with a large catalog, a distinctive voice, high ticket volume or a need to cut cost per message. {{brand}} will tell you which side of that line you are on, and if you don't need us, we'll say so.",
      },
    ],
    related: [
      '/services/ai-agent-swarms',
      '/services/ai-content-engine',
      '/guides/ai-agents-vs-automation-tools',
      '/guides/ai-agents-for-business-operations',
      '/tools/fine-tuning-cost-calculator',
    ],
    keywords: [
      'AI for ecommerce',
      'AI customer service for ecommerce',
      'AI product description generator',
      'ecommerce AI agents',
      'AI for Shopify stores',
      'FTC fake reviews rule AI',
      'custom AI for online retail',
      'AI catalog enrichment',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------ REAL ESTATE */
  {
    slug: 'real-estate',
    name: 'Real estate',
    title: 'Custom AI for real estate: agents that answer every lead and respect fair housing rules',
    seoTitle: 'AI for Real Estate: AI Agents for Brokerages & Teams',
    description:
      'How brokerages, teams and property managers use AI agents for lead follow-up, listings and transactions, plus Fair Housing and TCPA rules and a pilot plan.',
    eyebrow: 'Industry · Real estate',
    answer:
      'Real estate businesses use custom AI to answer and qualify leads within minutes, draft listing descriptions, track transaction deadlines and documents, and handle tenant requests for property managers. The Fair Housing Act applies to AI-written ads and screening just as it does to people, and since 2024 the FCC treats AI-generated voices in calls as artificial voices under the TCPA, which requires prior consent.',
    facts: [
      'The Fair Housing Act prohibits housing discrimination based on race, color, religion, sex, national origin, familial status and disability, including in advertising.',
      'In 2022 the US Department of Justice settled a Fair Housing Act case with Meta over its housing ad delivery algorithm, showing that algorithmic ad targeting can create liability.',
      'In February 2024 the FCC ruled that calls using AI-generated voices count as artificial voice calls under the TCPA, so they need prior express consent.',
      'Since August 17, 2024, under practice changes from the NAR settlement, MLS participants working with buyers must have a written agreement in place before touring a home.',
      'A focused real estate AI pilot, such as a lead response and qualification agent, usually ships in two to six weeks.',
    ],
    useCases: [
      {
        title: 'Instant lead response and qualification',
        detail:
          'An agent replies to portal and website leads within minutes, asks about budget, timing and financing, and books showings on the right calendar.',
      },
      {
        title: 'Listing descriptions and marketing',
        detail:
          'A model trained on your best listings drafts descriptions, social posts and email blasts from property data, with a fair housing language check built in.',
      },
      {
        title: 'Transaction coordination',
        detail:
          'An agent tracks contract deadlines, chases missing documents and sends status updates to buyers, sellers and lenders.',
      },
      {
        title: 'Tenant and maintenance requests',
        detail:
          'For property managers, an agent logs maintenance requests, asks for photos, triages urgency and dispatches vendors under your rules.',
      },
      {
        title: 'Market reports and CMA drafts',
        detail:
          'Automations turn MLS exports into neighborhood reports and first-draft comparative market analyses for an agent to review and adjust.',
      },
      {
        title: 'Database reactivation',
        detail:
          'Agents work through old leads and past clients with personalized check-ins, then hand warm replies to a human, with consent tracked for every channel.',
      },
    ],
    services: ['ai-agent-swarms', 'micro-agency-ai-systems', 'ai-content-engine', 'enterprise-ai-adoption'],
    body: [
      { type: 'h2', text: 'Where does AI actually pay off in real estate?' },
      {
        type: 'p',
        text: 'Real estate is a speed and follow-up business. Leads arrive at all hours, most go cold, and the agent who answers first often gets the conversation. AI agents work around the clock and never forget a follow-up. That is the payoff.',
      },
      {
        type: 'p',
        text: 'The second payoff is paperwork. Listings, disclosures, transaction checklists and tenant communications follow repeatable patterns. Models handle the drafting and the chasing, so licensed agents spend their time on showings and negotiations.',
      },
      {
        type: 'p',
        text: 'Where AI does not pay off yet: pricing a home without an agent applying judgment, giving legal or lending advice, and anything that screens or targets people by protected characteristics, directly or through a proxy such as zip code.',
      },
      { type: 'h2', text: 'Which real estate use cases need fine-tuning, RAG or an agent?' },
      {
        type: 'p',
        text: 'An [AI agent](/glossary/ai-agent) is a model that takes actions in your tools: reading a lead, updating your CRM and booking a showing. Most real estate wins are agent and automation work rather than model training.',
      },
      {
        type: 'table',
        caption: 'Real estate AI use cases by approach',
        head: ['Use case', 'Best approach', 'Data you need', 'Metric to track'],
        rows: [
          [
            'Lead response and qualification',
            'Agent',
            'CRM access, calendars, qualification questions, 200+ past lead conversations',
            'Speed to first response; appointments booked per 100 leads',
          ],
          [
            'Listing descriptions',
            'Fine-tune plus guardrails',
            '100-500 of your best listings and property data fields',
            'Time per listing; compliance flags caught before publishing',
          ],
          [
            'Transaction coordination',
            'Agent plus automation',
            'Contract templates, deadline rules, document checklist',
            'Missed deadlines; coordinator hours per file',
          ],
          [
            'Tenant maintenance triage',
            'Agent',
            'Work order history, vendor list, urgency rules',
            'Time to dispatch; repeat visits',
          ],
          [
            'Market reports',
            'Automation',
            'MLS or data provider exports',
            'Reports produced per week; agent edit time',
          ],
        ],
      },
      {
        type: 'p',
        text: '[Fine-tuning](/glossary/fine-tuning) is training a general model on your own examples so it writes in your voice. For listings, a few hundred strong examples usually beat a long style prompt. Our guide to [AI agents vs automation tools](/guides/ai-agents-vs-automation-tools) explains where each one fits.',
      },
      { type: 'h2', text: 'What fair housing and contact rules apply to real estate AI?' },
      {
        type: 'p',
        text: "The Fair Housing Act covers advertising and tenant or buyer screening, whoever or whatever does the work. A listing that says 'perfect for a young couple' can signal a preference based on familial status. A model trained on old listings can repeat old habits, so screen every output for protected-class language.",
      },
      {
        type: 'p',
        text: 'Ad targeting matters too. In 2022 the Department of Justice settled a Fair Housing Act case with Meta over how its algorithm delivered housing ads. If AI decides who sees a listing, document how it chooses.',
      },
      {
        type: 'p',
        text: 'Outbound contact has its own rules. The TCPA restricts automated calls and texts, and in 2024 the FCC confirmed that AI-generated voices count as artificial voices that need prior express consent. Every agent must honor do-not-call lists and opt-outs.',
      },
      {
        type: 'ul',
        items: [
          'Run a fair housing [guardrail](/glossary/guardrails) check on every listing, ad and outbound message.',
          'Keep screening criteria written, consistent and reviewed by a human.',
          'Log consent for every contact channel the agent uses.',
          'Keep client and tenant data in systems you control. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control.',
        ],
      },
      {
        type: 'callout',
        title: 'General information, not legal advice',
        text: 'State license law, MLS rules and local fair housing ordinances add requirements of their own. Check with your broker of record or counsel before launching anything client-facing.',
      },
      { type: 'h2', text: 'What does a first real estate AI pilot look like?' },
      { type: 'p', text: 'A focused pilot usually ships in two to six weeks. A three-week lead response pilot:' },
      {
        type: 'ol',
        items: [
          '**Week 1:** map lead sources, write the qualification script with your top agent, and connect CRM and calendars.',
          '**Week 2:** build the agent, test it on 100 past leads, and tune hand-off rules so hot leads reach a human fast.',
          '**Week 3:** go live on one lead source, then compare speed to first response and booked appointments against the previous month.',
        ],
      },
      {
        type: 'p',
        text: 'Property managers can run the same three-week shape on maintenance requests, measuring time to dispatch instead of appointments.',
      },
      { type: 'h2', text: 'Should a brokerage build, buy or partner?' },
      {
        type: 'p',
        text: "Buy if your CRM's built-in AI follow-up covers your needs. Many do for simple drip campaigns and basic lead routing.",
      },
      {
        type: 'p',
        text: 'Partner when you want agents that work across your actual stack, speak like your team and enforce your compliance rules. A small team can run like a large one with a [micro-agency AI stack](/services/micro-agency-ai-systems). {{brand}} returns a plan, a price and an honest verdict within 24 hours.',
      },
      { type: 'h2', text: 'Where should your team start?' },
      {
        type: 'p',
        text: 'Start with the leads you already pay for and do not answer fast enough. Take the 2-minute [AI audit](/audit) or [talk to us](/#contact) about an agent that works every lead like it is the only one.',
      },
    ],
    faqs: [
      {
        q: 'Can AI agents follow up with real estate leads automatically?',
        a: "AI agents can follow up with real estate leads automatically by replying within minutes, asking qualification questions, answering listing questions from your data and booking showings on an agent's calendar. They work best with clear hand-off rules, so a motivated buyer reaches a licensed human quickly. Keep consent records for every channel, because the TCPA restricts automated calls and texts, including calls with AI-generated voices.",
      },
      {
        q: 'Can AI-written listings violate fair housing rules?',
        a: 'AI-written listings can violate fair housing rules if they include language that signals a preference based on a protected class, such as familial status, religion or disability. The Fair Housing Act applies to the ad, not to who or what wrote it. Reduce risk by training on clean examples, running an automated check for risky phrases on every draft and having a licensed agent approve each listing.',
      },
      {
        q: 'Is AI useful for property management companies?',
        a: 'AI is useful for property management companies because so much of the work is repetitive communication: maintenance requests, rent reminders, lease questions and vendor coordination. An AI agent can log a request, ask for photos, triage urgency and dispatch a vendor under your rules while staff handle exceptions. Tenant screening is different. Keep screening criteria consistent, documented and human-reviewed to stay within fair housing law.',
      },
      {
        q: 'How much does an AI lead agent cost for a real estate team?',
        a: 'The cost of an AI lead agent for a real estate team depends on lead volume, the number of systems it connects to and how much custom behavior it needs. Running costs are mostly model usage and messaging fees, which scale with conversations. Build cost depends on scope. {{brand}} returns a plan, a price and an honest verdict within 24 hours, so you can compare it with your CRM features first.',
      },
      {
        q: 'What should a real estate team measure in an AI pilot?',
        a: 'A real estate team should measure speed to first response, appointments booked per 100 leads and the share of hot leads that reach a human at the right moment. For listings, track time per listing and compliance flags caught. For transactions, track missed deadlines and coordinator hours per file. Record a baseline month first so the before-and-after comparison is fair.',
      },
    ],
    related: [
      '/services/ai-agent-swarms',
      '/services/micro-agency-ai-systems',
      '/services/ai-content-engine',
      '/guides/ai-agents-vs-automation-tools',
      '/glossary/ai-agent',
    ],
    keywords: [
      'AI for real estate',
      'AI agents for real estate',
      'real estate AI lead follow-up',
      'AI for property management',
      'AI listing description generator',
      'AI for real estate brokerages',
      'fair housing AI compliance',
      'AI transaction coordinator',
    ],
    updated: '2026-10-27',
  },

  /* -------------------------------------------------------------- INSURANCE */
  {
    slug: 'insurance',
    name: 'Insurance',
    title: 'Custom AI for insurance: claims, underwriting and service models built to satisfy regulators',
    seoTitle: 'AI for Insurance: Custom Models for Claims & Underwriting',
    description:
      'How insurers, MGAs and agencies use custom AI for claims intake, underwriting submissions and service, plus the NAIC AI bulletin and a 2-6 week pilot plan.',
    eyebrow: 'Industry · Insurance',
    answer:
      "Insurers use custom AI to capture first notice of loss reports, extract data from underwriting submissions, summarize claim files, flag possible fraud for investigators and draft policyholder letters. Regulators expect governance: the NAIC's 2023 model bulletin on AI asks insurers to maintain a written AI program covering risk management, internal controls and oversight of third-party vendors. Qualified humans should own adverse decisions.",
    facts: [
      'The NAIC adopted its Model Bulletin on the Use of Artificial Intelligence Systems by Insurers in December 2023, and many states have since adopted it.',
      'The NAIC bulletin expects insurers to maintain a written AI systems program covering governance, risk management, internal controls and oversight of third-party AI vendors.',
      "Colorado's SB21-169 (2021) prohibits insurers from using external consumer data and algorithms in ways that unfairly discriminate based on protected characteristics.",
      'The Coalition Against Insurance Fraud estimates that insurance fraud costs US consumers about $308.6 billion a year (2022 estimate).',
      'A focused insurance AI pilot, such as submission intake for one line of business, usually ships in two to six weeks.',
    ],
    useCases: [
      {
        title: 'FNOL intake and triage',
        detail:
          'An agent captures first notice of loss (FNOL) details from calls, emails or forms, asks for missing information and routes the claim by severity and line.',
      },
      {
        title: 'Underwriting submission extraction',
        detail:
          'Models read broker submissions, loss runs, applications and schedules, then populate your underwriting workbench with the fields and flags underwriters need.',
      },
      {
        title: 'Claim file summaries',
        detail:
          'Adjusters get a dated summary of the file, open questions and coverage-relevant facts, with links back to each source document.',
      },
      {
        title: 'Fraud and subrogation flags',
        detail:
          'Models surface claims with patterns worth a closer look, or with recovery potential, for an investigator to review. The model never denies a claim.',
      },
      {
        title: 'Policyholder correspondence',
        detail:
          'Draft status letters, document requests and coverage explanations in plain English, using your approved language and state-specific wording.',
      },
      {
        title: 'Agency and broker service',
        detail:
          'For agencies, an agent handles certificate requests, policy questions and endorsement changes using data from your agency management system.',
      },
    ],
    services: ['custom-model-fine-tuning', 'fine-tuning-datasets', 'multi-agent-harnesses', 'enterprise-ai-adoption'],
    body: [
      { type: 'h2', text: 'Where does AI actually pay off in insurance?' },
      {
        type: 'p',
        text: 'Insurance is a document business with a balance sheet attached. Submissions, loss runs, medical records, repair estimates and policy forms all have to be read before anyone can decide anything. AI reads fast, and it can be taught to read like your best adjuster or underwriter.',
      },
      {
        type: 'p',
        text: 'The clearest returns sit in intake and summarization: getting the right facts out of messy documents and into your systems, then giving professionals a clean starting point. Both are measurable in hours per file and cycle time.',
      },
      {
        type: 'p',
        text: 'Where AI does not pay off yet: automated adverse decisions. Lawsuits filed in 2023 alleged that large health insurers used algorithms to deny claims at scale. Whatever the outcomes, the design lesson is plain. Keep a qualified human on every denial, rescission or adverse underwriting decision.',
      },
      { type: 'h2', text: 'Which insurance use cases need fine-tuning, RAG or an agent?' },
      {
        type: 'p',
        text: '[Fine-tuning](/glossary/fine-tuning) is training that adapts a general model to your forms, terminology and decisions using your own examples. [RAG](/glossary/rag) is a setup that retrieves your documents at question time, so every answer can cite the policy wording or the claim file. An agent is a model that completes multi-step tasks across your systems.',
      },
      {
        type: 'table',
        caption: 'Insurance AI use cases by approach',
        head: ['Use case', 'Best approach', 'Data you need', 'Metric to track'],
        rows: [
          [
            'FNOL intake and triage',
            'Agent',
            'Intake scripts, routing rules, 1,000+ historical FNOL records',
            'Time to assignment; reassignment rate',
          ],
          [
            'Submission extraction',
            'Fine-tune',
            '500-2,000 labeled submissions for one line of business',
            'Field accuracy; underwriter hours per submission',
          ],
          [
            'Claim file summaries',
            'RAG plus fine-tune',
            'Closed claim files with adjuster notes',
            'Adjuster time to first decision; summary error rate',
          ],
          [
            'Fraud and subrogation flags',
            'Fine-tune or classifier',
            'Labeled outcomes from investigation and recovery teams',
            'Referral hit rate; recoveries per referral',
          ],
          [
            'Policyholder letters',
            'Fine-tune plus guardrails',
            'Approved letters by state and situation',
            'Compliance rejections; drafting time',
          ],
        ],
      },
      {
        type: 'p',
        text: 'Assumption: one line of business and one jurisdiction at a time. Insurance data is often scattered across claim, policy and document systems, which is why building the [niche training dataset](/services/fine-tuning-datasets) usually takes longer than training the model.',
      },
      { type: 'h2', text: 'What do insurance regulators expect from AI?' },
      {
        type: 'p',
        text: "The NAIC's 2023 model bulletin on AI is the main reference point for US insurers, and many states have adopted it. It expects a written AI systems program: governance, risk management, testing for unfair discrimination, documentation and oversight of third-party vendors. Regulators can ask to see it during examinations.",
      },
      {
        type: 'p',
        text: "Some states go further. Colorado's SB21-169 restricts using external consumer data and algorithms in ways that unfairly discriminate. Unfair claims settlement practices laws still apply, whatever tool produced the decision, and medical data in claims files may bring HIPAA into scope.",
      },
      {
        type: 'ul',
        items: [
          "Record each model's purpose, data, testing and limits in an AI inventory.",
          'Test outputs for unfair discrimination before and after launch.',
          'Keep [evals](/glossary/llm-evals), meaning repeatable scored tests, as audit evidence.',
          'Keep humans on adverse decisions and log who approved what.',
        ],
      },
      {
        type: 'callout',
        title: 'General information, not legal advice',
        text: 'Requirements vary by state and line of business. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control, which makes third-party oversight under your AI program simpler.',
      },
      { type: 'h2', text: 'What does a first insurance AI pilot look like?' },
      { type: 'p', text: 'A focused pilot usually ships in two to six weeks. A five-week submission intake pilot:' },
      {
        type: 'ol',
        items: [
          '**Week 1:** pick one line of business, list the 30 to 60 fields underwriters need, and pull 500 or more past submissions.',
          '**Week 2:** label fields and edge cases with an underwriter, and hold back a test set.',
          '**Week 3:** fine-tune an extraction model and score it field by field.',
          '**Week 4:** run it beside underwriters on live submissions, sending low-confidence fields to a human.',
          '**Week 5:** measure accuracy and hours saved, document the model for your AI program, and decide whether to scale.',
        ],
      },
      { type: 'h2', text: 'Should an insurer build, buy or partner?' },
      {
        type: 'p',
        text: 'Buy for generic capability, such as standard document capture or call transcription, where vendors already pass your due diligence.',
      },
      {
        type: 'p',
        text: 'Partner when your edge lives in your data: your underwriting appetite, your claims practices, your letters. A [custom fine-tuned model](/services/custom-model-fine-tuning) built on that data, delivered with its governance documents, fits the NAIC framework far better than a black box. {{brand}} returns a plan, a price and an honest verdict within 24 hours.',
      },
      { type: 'h2', text: 'Where should you start?' },
      {
        type: 'p',
        text: 'Start where adjusters or underwriters re-key the most data. Take the 2-minute [AI audit](/audit) or [talk to us](/#contact) about a pilot your regulators would be happy to read about.',
      },
    ],
    faqs: [
      {
        q: 'Can AI make claims decisions for an insurer?',
        a: 'AI should support insurance claims decisions, not make adverse ones on its own. Models can capture FNOL data, summarize files, check coverage wording and flag fraud indicators, which speeds up adjusters. Denials and reductions should stay with a qualified human, because unfair claims practices laws still apply and the NAIC model bulletin expects governance proportionate to the risk. Fast-tracking simple approvals is a lower-risk place to automate.',
      },
      {
        q: 'What is the NAIC model bulletin on AI?',
        a: 'The NAIC Model Bulletin on the Use of Artificial Intelligence Systems by Insurers is guidance adopted by the National Association of Insurance Commissioners in December 2023. It tells insurers that decisions made with AI must comply with existing insurance laws, and it expects a written AI systems program covering governance, risk management, internal controls and third-party vendor oversight. Many states have adopted it, so check your own state.',
      },
      {
        q: 'How do insurers test AI for unfair discrimination?',
        a: 'Insurers test AI for unfair discrimination by comparing model outcomes across groups, checking whether input variables act as proxies for protected characteristics, and documenting the business justification for each factor. Because insurers often lack direct demographic data, some use statistical estimation methods for testing. Colorado rules and the NAIC model bulletin both push in this direction. Test before launch and again on a regular schedule.',
      },
      {
        q: 'How much data does an insurer need to fine-tune a model?',
        a: 'An insurer usually needs a few hundred to a few thousand labeled examples to fine-tune a model for one task, such as extracting fields from commercial property submissions. The harder part is often assembling the data, because files are spread across claim, policy and document systems. Starting with one line of business keeps the dataset manageable and the results easy to measure.',
      },
      {
        q: 'Can MGAs and independent agencies use custom AI too?',
        a: "MGAs and independent agencies can use custom AI, and they can often move faster than large carriers because they have fewer legacy systems. Common starting points are submission intake, certificate requests, renewal preparation and policy questions answered from the agency management system. {{brand}} scopes these as focused pilots that usually ship in two to six weeks, and if an off-the-shelf tool fits better, we'll say so.",
      },
    ],
    related: [
      '/services/custom-model-fine-tuning',
      '/services/fine-tuning-datasets',
      '/services/multi-agent-harnesses',
      '/guides/how-to-prepare-fine-tuning-dataset',
      '/glossary/llm-evals',
    ],
    keywords: [
      'AI for insurance',
      'AI in insurance claims',
      'custom AI model for insurance claims',
      'AI underwriting submission intake',
      'NAIC AI model bulletin',
      'insurance AI agents',
      'AI for insurance agencies',
      'AI claims automation',
    ],
    updated: '2026-10-27',
  },

  /* ------------------------------------------------------------------- SAAS */
  {
    slug: 'saas',
    name: 'SaaS',
    title: 'Custom AI for SaaS companies: ship AI features, support and docs that customers trust',
    seoTitle: 'AI for SaaS Companies: Custom Models, Agents & Features',
    description:
      'How SaaS companies use custom AI for support, in-product features, onboarding and security reviews, plus tenant data, SOC 2 and cost basics and a pilot plan.',
    eyebrow: 'Industry · SaaS',
    answer:
      'SaaS companies use custom AI in two places: inside the product, as features customers pay for, and inside the business, for support, onboarding, documentation and security questionnaires. Fine-tuned smaller models can often handle narrow product tasks at a lower cost per request than frontier models. Customer data needs strict tenant isolation, and enterprise buyers will ask how your AI vendors handle it.',
    facts: [
      'SOC 2 is an AICPA attestation framework built on five Trust Services Criteria: security, availability, processing integrity, confidentiality and privacy.',
      "Under GDPR, an AI vendor that processes customer personal data on a SaaS company's behalf is typically a processor or sub-processor and must be covered by a data processing agreement.",
      'The EU AI Act requires that users be told when they are interacting with an AI system, which applies to chatbots and assistants inside SaaS products.',
      'Fine-tuned small models, often in the 7 to 14 billion parameter range, can match or come close to much larger general models on narrow, well-defined tasks while costing less per request.',
      'A focused SaaS AI pilot, such as a support answer assistant or one in-product feature, usually ships in two to six weeks.',
    ],
    useCases: [
      {
        title: 'Support answers grounded in your docs',
        detail:
          'An assistant drafts or sends replies from your help center, changelog and past tickets, citing the article it used.',
      },
      {
        title: 'In-product AI features',
        detail:
          "Features such as natural-language search, report generation or smart defaults, powered by a model tuned to your product's data and schema.",
      },
      {
        title: 'Onboarding and activation agents',
        detail:
          'An agent guides new accounts through setup, answers configuration questions and nudges users toward the actions that predict retention.',
      },
      {
        title: 'Security questionnaires and RFPs',
        detail:
          'A model drafts answers from your approved security documentation and past responses, so sales engineers review instead of write.',
      },
      {
        title: 'Docs and release notes',
        detail:
          'Automations turn merged pull requests and tickets into draft release notes and documentation updates in your style.',
      },
      {
        title: 'Churn and expansion signals',
        detail:
          'Models read support tickets, call notes and usage summaries to flag accounts at risk or ready to expand, for a customer success manager to act on.',
      },
    ],
    services: ['custom-model-fine-tuning', 'multi-agent-harnesses', 'ai-agent-swarms', 'domain-skills-system-files'],
    body: [
      { type: 'h2', text: 'Where does AI actually pay off for a SaaS company?' },
      {
        type: 'p',
        text: 'SaaS companies have two AI opportunities. One is the product: features customers will pay for. The other is the business: support, onboarding, docs and sales work that grows in step with your customer count unless something changes.',
      },
      {
        type: 'p',
        text: 'Internal use cases pay off fastest because you control the data and the feedback loop. Product features take longer but can change your pricing power. Both need the same discipline: tests, cost tracking and a plan for when the model is wrong.',
      },
      {
        type: 'p',
        text: 'Where AI does not pay off yet: bolting a generic chatbot onto the product because a competitor did. If the feature does not save users a real step, it adds cost and support load without adding value.',
      },
      { type: 'h2', text: 'Which SaaS use cases need fine-tuning, RAG or an agent?' },
      {
        type: 'p',
        text: '[RAG](/glossary/rag) is a setup that retrieves your docs or data at question time, so answers stay current. [Fine-tuning](/glossary/fine-tuning) is training a model on your own examples so it follows your formats and schema reliably, often on a smaller, cheaper model. An agent is a model that completes multi-step tasks through your APIs.',
      },
      {
        type: 'table',
        caption: 'SaaS AI use cases by approach',
        head: ['Use case', 'Best approach', 'Data you need', 'Metric to track'],
        rows: [
          [
            'Support answers',
            'RAG',
            'Help center, changelog, 2,000+ resolved tickets',
            'Deflection rate; reopen rate; satisfaction on AI-assisted tickets',
          ],
          [
            'In-product natural-language features',
            'Fine-tune',
            '1,000-10,000 input and correct-output pairs from your schema',
            'Task success rate; cost per request; latency',
          ],
          [
            'Onboarding agent',
            'Agent',
            'Product APIs, setup steps, activation events',
            'Time to first value; activation rate',
          ],
          [
            'Security questionnaires',
            'RAG plus fine-tune',
            'Approved security docs and past questionnaires',
            'Hours per questionnaire; answers changed by reviewers',
          ],
          [
            'Release notes and docs',
            'Automation',
            'Pull requests, tickets, style guide',
            'Time from release to published notes',
          ],
        ],
      },
      {
        type: 'p',
        text: 'The wide data range for in-product features reflects how much variety real users throw at a feature. Start narrow and widen as usage teaches you. To model training and running costs, try the [fine-tuning cost calculator](/tools/fine-tuning-cost-calculator).',
      },
      { type: 'h2', text: 'How should SaaS companies handle customer data in AI features?' },
      {
        type: 'p',
        text: "Your customers' data is not yours to train on by default. Check your terms and DPAs before using tenant data for fine-tuning, and never let one customer's data surface in another customer's output. Per-tenant retrieval with strict access filters is the safe default.",
      },
      {
        type: 'p',
        text: 'Expect enterprise buyers to ask about AI in security reviews. They will want your sub-processor list, data retention terms, whether vendors train on their data and how you test output. Your SOC 2 controls should cover the AI pipeline like any other production system.',
      },
      {
        type: 'p',
        text: 'If you have EU users, GDPR applies to personal data in prompts and logs, and the EU AI Act requires telling users when they are interacting with an AI system.',
      },
      {
        type: 'ul',
        items: [
          'Isolate tenants in retrieval indexes, caches and logs.',
          'Add [guardrails](/glossary/guardrails): automated checks that block unsafe, off-topic or cross-tenant output.',
          'Track cost per request and per customer from day one.',
          'Run [evals](/glossary/llm-evals), meaning scored regression tests, on every model or prompt change.',
        ],
      },
      {
        type: 'callout',
        title: 'General information, not legal advice',
        text: 'Your contracts decide what you may do with customer data. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control, which keeps your sub-processor list short.',
      },
      { type: 'h2', text: 'What does a first SaaS AI pilot look like?' },
      { type: 'p', text: 'A focused pilot usually ships in two to six weeks. A four-week in-product feature pilot:' },
      {
        type: 'ol',
        items: [
          '**Week 1:** pick one feature with a clear success test, such as turning a plain-English question into a filtered report, and collect real user requests.',
          '**Week 2:** build 1,000 or more input and output pairs, plus a held-out eval set of edge cases.',
          '**Week 3:** fine-tune a small model and compare it with a frontier model on accuracy, latency and cost per request.',
          '**Week 4:** ship behind a feature flag to a few customers, watch evals and usage, then decide on general release.',
        ],
      },
      { type: 'h2', text: 'Should a SaaS company build, buy or partner?' },
      {
        type: 'p',
        text: 'Build if you have machine learning engineers with time to spare. Most SaaS teams have product engineers, which is a different skill set. Fine-tuning, evals and [multi-agent harnesses](/services/multi-agent-harnesses) with real logging and retries are their own discipline.',
      },
      {
        type: 'p',
        text: "Partner to get the first feature shipped and the pipeline in place, then own it. {{brand}} returns a plan, a price and an honest verdict within 24 hours. If a prompt and an API key are enough, we'll say so.",
      },
      { type: 'h2', text: 'Where should you start?' },
      {
        type: 'p',
        text: 'Start with the AI feature your customers keep asking for, or the support queue your team keeps drowning in. Take the 2-minute [AI audit](/audit) or [talk to us](/#contact) about shipping it properly the first time.',
      },
    ],
    faqs: [
      {
        q: 'Should a SaaS company fine-tune a model or just use an API?',
        a: 'A SaaS company should usually start with a frontier model API and good prompts, then fine-tune when the feature is proven and one of three problems appears: inconsistent output formats, cost per request that hurts margins at scale, or latency users notice. Fine-tuning a smaller model on a few thousand real examples often fixes all three for a narrow task. Keep the API version as a benchmark.',
      },
      {
        q: "Can we fine-tune a model on our customers' data?",
        a: "Whether a SaaS company can fine-tune on customers' data depends on its terms of service, data processing agreements and privacy notices, not on the technology. Many contracts forbid it or require consent. Safer options include training on synthetic data, on your own product metadata, or on opt-in data from customers who agree. Never let a shared model reproduce one tenant's information for another tenant.",
      },
      {
        q: 'How do SaaS teams keep AI feature costs under control?',
        a: 'SaaS teams keep AI feature costs under control by measuring cost per request and per customer from launch, caching repeated work, routing simple requests to smaller models and fine-tuning a small model for high-volume narrow tasks. Usage limits by plan tier also help. Tracking cost next to task success rate prevents the common mistake of cutting cost by quietly lowering quality.',
      },
      {
        q: 'What will enterprise customers ask about our AI features?',
        a: 'Enterprise customers will ask which AI vendors process their data, whether those vendors train on it, where data is stored and for how long, how tenant data is isolated and how output is tested. Expect these questions in security questionnaires and DPA negotiations. A short AI section in your trust documentation, backed by SOC 2 controls, answers most of them before they slow a deal down.',
      },
      {
        q: 'How long does it take to ship an AI feature in a SaaS product?',
        a: 'A focused AI feature in a SaaS product usually takes two to six weeks to reach a controlled beta, assuming one well-defined task and access to real user examples. General release takes longer because of edge cases, pricing and support readiness. {{brand}} scopes the pilot so you see accuracy, latency and cost per request before you commit to a full rollout.',
      },
    ],
    related: [
      '/services/custom-model-fine-tuning',
      '/services/multi-agent-harnesses',
      '/guides/fine-tuning-vs-rag-vs-prompting',
      '/guides/open-source-vs-closed-models-fine-tuning',
      '/tools/fine-tuning-cost-calculator',
    ],
    keywords: [
      'AI for SaaS companies',
      'add AI features to SaaS product',
      'SaaS AI support automation',
      'fine-tuning for SaaS',
      'AI onboarding agent',
      'AI security questionnaire automation',
      'custom LLM for SaaS',
      'reduce LLM inference cost',
    ],
    updated: '2026-10-27',
  },

  /* ----------------------------------------------------- MARKETING AGENCIES */
  {
    slug: 'marketing-agencies',
    name: 'Marketing agencies',
    title: 'Custom AI for marketing agencies: a client-ready AI stack that multiplies output, not headcount',
    seoTitle: 'AI for Marketing Agencies: Custom AI Stacks & Agents',
    description:
      'How marketing agencies use custom AI for client brand voice, content production, reporting and proposals, plus FTC, copyright and client data rules to know.',
    eyebrow: 'Industry · Marketing agencies',
    answer:
      "Marketing agencies use custom AI to capture each client's brand voice, produce first drafts of content and ad variants, automate client reporting, write briefs and proposals, and repurpose one asset into many. The guardrails are real: the FTC's 2024 rule bans fake reviews and testimonials, including AI-generated ones, and the US Copyright Office says purely AI-generated material is not protected by copyright.",
    facts: [
      'The US Copyright Office, in its January 2025 report on copyrightability, reaffirmed that purely AI-generated material is not copyrightable and that protection depends on sufficient human creative contribution.',
      "The FTC's 2024 rule on fake reviews and testimonials bans creating, buying or selling fake reviews, including AI-generated ones that misrepresent real customer experiences.",
      "The FTC's Endorsement Guides, revised in 2023, require clear disclosure of material connections between brands and endorsers, including influencers.",
      'A skill file is a structured document of voice rules, examples and banned phrases that any AI agent can load, which makes client brand voice reusable across tools.',
      'A focused agency AI pilot, such as a brand voice and content pipeline for one retainer client, usually ships in two to six weeks.',
    ],
    useCases: [
      {
        title: 'Client brand voice models',
        detail:
          'One skill file or fine-tuned model per client captures tone, vocabulary and banned phrases, so every draft starts on brand.',
      },
      {
        title: 'Content repurposing pipeline',
        detail:
          "One webinar or long-form article becomes posts, emails, short video scripts and ad variants, each checked against the client's brand rules.",
      },
      {
        title: 'Automated client reporting',
        detail:
          'Agents pull data from ad platforms and analytics, write the commentary and draft next steps, so account managers edit instead of compile.',
      },
      {
        title: 'Research and creative briefs',
        detail:
          'Agents gather competitor messaging, search intent and audience language into a creative or SEO brief in your template.',
      },
      {
        title: 'Proposals and pitch drafts',
        detail:
          'A model trained on your winning proposals drafts scopes and approach sections for a strategist to sharpen and price.',
      },
      {
        title: 'Ad variants with compliance checks',
        detail:
          'Headline and copy variants are generated at volume, with automated checks for unsupported claims, missing disclosures and platform policies.',
      },
    ],
    services: ['micro-agency-ai-systems', 'ai-content-engine', 'domain-skills-system-files', 'ai-agent-swarms'],
    body: [
      { type: 'h2', text: 'Where does AI actually pay off for a marketing agency?' },
      {
        type: 'p',
        text: 'Agencies sell output and judgment. AI multiplies the output. The agencies pulling ahead use it for first drafts, repurposing, research and reporting, then spend human hours on strategy, taste and client relationships.',
      },
      {
        type: 'p',
        text: "The real advantage is not a chatbot subscription. Every agency has one. It is a system: each client's voice captured once, reusable pipelines for each deliverable, and checks that catch off-brand or risky copy before a client sees it.",
      },
      {
        type: 'p',
        text: 'Where AI does not pay off yet: publishing without a human edit, and fake social proof. Unedited AI content tends to read as generic, which clients notice, and fake reviews or testimonials are now an FTC enforcement target.',
      },
      { type: 'h2', text: 'Which agency use cases need fine-tuning, skill files or an agent?' },
      {
        type: 'p',
        text: 'Not every client needs a custom model. A skill file is a structured document of voice rules, examples and banned phrases that any AI agent can load. [Fine-tuning](/glossary/fine-tuning) is training that bakes the voice into the model itself, which is worth it for high-volume clients. An [AI agent](/glossary/ai-agent) is a model that runs multi-step tasks across tools.',
      },
      {
        type: 'table',
        caption: 'Agency AI use cases by approach',
        head: ['Use case', 'Best approach', 'Data you need', 'Metric to track'],
        rows: [
          [
            'Client brand voice',
            'Skill file or fine-tune',
            '30-50 approved pieces for a skill file; 300+ for fine-tuning',
            'Edit time per draft; client revision rounds',
          ],
          [
            'Content repurposing',
            'Automation plus agent',
            'Source assets, channel templates, brand rules',
            'Assets produced per source piece; time to publish',
          ],
          [
            'Client reporting',
            'Agent',
            'Read access to ad, analytics and CRM platforms',
            'Hours per monthly report; delivery date hit rate',
          ],
          [
            'Research and briefs',
            'Agent',
            'Brief templates and past winning briefs',
            'Brief turnaround time; strategist edits',
          ],
          [
            'Ad variants with checks',
            'Fine-tune plus [guardrails](/glossary/guardrails)',
            'Past approved and rejected ads, platform policies',
            'Variants tested per week; policy rejections',
          ],
        ],
      },
      {
        type: 'p',
        text: "The ranges assume one client and one channel family per pipeline. Our [domain skills and system files](/services/domain-skills-system-files) service turns your best strategists' know-how into files every agent can load in a second.",
      },
      { type: 'h2', text: 'What legal and client data rules apply to agency AI?' },
      {
        type: 'p',
        text: "Reviews and endorsements first. The FTC's 2024 rule bans creating, buying or selling fake reviews, including AI-generated ones. The Endorsement Guides require clear disclosure of material connections with influencers and other endorsers. Agencies are exposed when they write the copy.",
      },
      {
        type: 'p',
        text: 'Copyright next. The US Copyright Office says purely AI-generated material is not copyrightable without sufficient human authorship. If a client expects to own the work, make sure people make meaningful creative contributions, and spell out how you use AI in your contracts.',
      },
      {
        type: 'p',
        text: "Then client data. Separate each client's data, prompts and models, respect NDAs, and follow GDPR or CCPA when campaign data includes personal information.",
      },
      {
        type: 'ul',
        items: [
          'One workspace, index and skill file per client, with no cross-client training.',
          'Disclose AI use in your master services agreement.',
          'Run a claims and disclosure check on every ad and endorsement draft.',
          'Keep a human editor on every piece that ships.',
        ],
      },
      {
        type: 'callout',
        title: 'General information, not legal advice',
        text: "Ask counsel about specific deliverables and contracts. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control, so each client's data stays fenced off.",
      },
      { type: 'h2', text: 'What does a first agency AI pilot look like?' },
      { type: 'p', text: 'A focused pilot usually ships in two to six weeks. A three-week pilot for one retainer client:' },
      {
        type: 'ol',
        items: [
          "**Week 1:** gather 30 to 50 approved pieces, write the client's skill file, and map the deliverables that eat the most hours.",
          '**Week 2:** build the repurposing and reporting pipelines, with brand and compliance checks before human review.',
          "**Week 3:** run a full month's deliverables through the system, track edit time and revision rounds, then plan the rollout to the next client.",
        ],
      },
      { type: 'h2', text: 'Should an agency build, buy or partner?' },
      {
        type: 'p',
        text: 'Buy the tools: every agency has access to the same models. Build or partner for the system around them, because that is what clients cannot get elsewhere. A [micro-agency AI stack](/services/micro-agency-ai-systems) lets a small team deliver like a large one without the payroll.',
      },
      {
        type: 'p',
        text: "{{brand}} returns a plan, a price and an honest verdict within 24 hours, and if your current setup is enough, we'll say so.",
      },
      { type: 'h2', text: 'Where should your agency start?' },
      {
        type: 'p',
        text: 'Start with the deliverable your team groans about every month. Take the 2-minute [AI audit](/audit) or [talk to us](/#contact), and turn that chore into the thing your agency is known for.',
      },
    ],
    faqs: [
      {
        q: 'Who owns the copyright in AI-generated content an agency makes for a client?',
        a: 'Copyright in AI-generated content depends on human authorship. The US Copyright Office says material generated purely by AI is not copyrightable, while human selection, arrangement and creative edits can be protected. Agencies should make sure people contribute meaningful creative work, document that process and set ownership and AI-use terms clearly in client contracts. This is general information, so ask counsel about specific deliverables.',
      },
      {
        q: 'Can an agency use one AI model for all its clients?',
        a: "An agency can use one base AI model for all its clients, but each client should get a separate voice layer, such as a skill file or a small fine-tuned add-on, plus separate data storage and retrieval. Mixing client data in one training run risks leaking one client's information or style into another's work and may breach NDAs. Separation also makes offboarding a client clean.",
      },
      {
        q: 'Will clients pay less if the agency uses AI?',
        a: 'Clients may push for lower fees if an agency uses AI to do the same work faster, which is one reason some agencies are moving from hourly billing to deliverable or retainer pricing. The value of AI for an agency is producing more and better work per person, not just cheaper hours. Being open about AI use in contracts means pricing conversations start from trust.',
      },
      {
        q: 'Is it legal to use AI to write reviews or testimonials for clients?',
        a: "Using AI to write fake reviews or testimonials for clients is illegal in the US. The FTC's 2024 rule bans creating, buying or selling reviews that misrepresent real customer experiences, including AI-generated ones, and civil penalties can apply. AI can legally help collect, summarize or respond to genuine reviews. Endorsements also need clear disclosure of material connections under the FTC's Endorsement Guides.",
      },
      {
        q: 'How small can an agency be and still benefit from a custom AI stack?',
        a: 'An agency of one or two people can benefit from a custom AI stack, often more than a large agency, because every hour saved is a bigger share of total capacity. The stack handles research, first drafts, repurposing and reporting while the founders handle strategy and clients. {{brand}} builds micro-agency systems sized to the team, and a focused pilot usually ships in two to six weeks.',
      },
    ],
    related: [
      '/services/micro-agency-ai-systems',
      '/services/ai-content-engine',
      '/services/domain-skills-system-files',
      '/guides/ai-agents-for-business-operations',
      '/glossary/system-prompt',
    ],
    keywords: [
      'AI for marketing agencies',
      'AI tools for agencies',
      'agency AI automation',
      'AI brand voice model',
      'AI content repurposing for agencies',
      'AI client reporting automation',
      'custom AI for digital agencies',
      'AI for small agencies',
    ],
    updated: '2026-10-27',
  },

  /* -------------------------------------------------------------- RECRUITING */
  {
    slug: 'recruiting',
    name: 'Recruiting',
    title: 'Custom AI for recruiting: agents that source, schedule and summarize, with bias controls built in',
    seoTitle: 'AI for Recruiting: AI Agents for Staffing & Hiring Teams',
    description:
      'How recruiters and talent teams use AI agents for sourcing, scheduling and candidate summaries, plus NYC Local Law 144, EU AI Act rules and a pilot plan.',
    eyebrow: 'Industry · Recruiting',
    answer:
      "Recruiting teams use custom AI to draft outreach, parse resumes into structured profiles, schedule interviews, summarize interview notes and surface matching candidates for a recruiter to review. Hiring AI is tightly regulated: New York City's Local Law 144 requires an independent bias audit within the past year and candidate notice for automated employment decision tools, and the EU AI Act classes recruitment AI as high-risk.",
    facts: [
      'New York City Local Law 144, enforced since July 2023, requires employers and employment agencies using automated employment decision tools to obtain an independent bias audit within the prior year, publish a summary and notify candidates.',
      'The EU AI Act lists AI used for recruitment, filtering applications and evaluating candidates as high-risk, with obligations for risk management, data governance, human oversight and logging.',
      'US federal anti-discrimination laws, including Title VII, the ADA and the ADEA, apply to hiring decisions whether a person or an algorithm makes them.',
      "The four-fifths rule from the 1978 Uniform Guidelines on Employee Selection Procedures is a common rule of thumb: a group's selection rate below 80% of the highest group's rate may indicate adverse impact.",
      "Illinois' Artificial Intelligence Video Interview Act requires notice, an explanation and consent before an employer uses AI to analyze video interviews.",
    ],
    useCases: [
      {
        title: 'Personalized outreach at volume',
        detail:
          "Agents research a candidate's public professional profile and draft outreach in your recruiters' voice, for a human to approve and send.",
      },
      {
        title: 'Resume parsing and structured profiles',
        detail:
          'Models turn resumes in any format into clean, structured profiles in your ATS, so search and reporting finally work.',
      },
      {
        title: 'Interview scheduling',
        detail:
          'An agent coordinates calendars across candidates, interviewers and time zones, sends reminders and handles reschedules.',
      },
      {
        title: 'Interview note summaries',
        detail:
          'Interview transcripts or notes become structured scorecards against your competency framework, for the hiring team to review and edit.',
      },
      {
        title: 'Candidate rediscovery for recruiter review',
        detail:
          'Models surface people already in your database who may fit a new role, with the reasons shown, for a recruiter to evaluate.',
      },
      {
        title: 'Job description drafting',
        detail:
          "A model drafts accurate job descriptions from the hiring manager's intake notes, with checks for exclusionary or biased language.",
      },
    ],
    services: ['ai-agent-swarms', 'custom-model-fine-tuning', 'enterprise-ai-adoption', 'micro-agency-ai-systems'],
    body: [
      { type: 'h2', text: 'Where does AI actually pay off in recruiting?' },
      {
        type: 'p',
        text: 'Recruiting is half judgment, half admin. The admin half is huge: sourcing lists, outreach, resume parsing, scheduling, note-taking, ATS hygiene. That is where AI pays off with the least risk.',
      },
      {
        type: 'p',
        text: 'Staffing firms feel it most. Speed to submit wins placements, and a recruiter who spends less time on calendars and data entry spends more time on calls with candidates and clients.',
      },
      {
        type: 'p',
        text: 'Where AI does not pay off yet, or pays off with serious strings attached: automated ranking and rejection. Tools that substantially assist hiring decisions can trigger bias audit and notice rules in New York City, high-risk duties under the EU AI Act, and liability under federal discrimination law.',
      },
      { type: 'h2', text: 'Which recruiting use cases need fine-tuning, RAG or an agent?' },
      {
        type: 'p',
        text: 'An [AI agent](/glossary/ai-agent) is a model that completes multi-step tasks across tools, like reading a calendar, sending an invite and updating your ATS. [Fine-tuning](/glossary/fine-tuning) is training a model on your own examples, such as your best outreach messages or scorecards.',
      },
      {
        type: 'table',
        caption: 'Recruiting AI use cases by approach',
        head: ['Use case', 'Best approach', 'Data you need', 'Metric to track'],
        rows: [
          [
            'Candidate outreach',
            'Fine-tune plus agent',
            '300-1,000 sent messages with reply outcomes',
            'Reply rate; recruiter time per shortlist',
          ],
          [
            'Resume parsing',
            'Fine-tune',
            '500-2,000 resumes with correctly structured fields',
            'Field accuracy; duplicate and incomplete records',
          ],
          [
            'Interview scheduling',
            'Agent',
            'Calendar and ATS access, scheduling rules',
            'Time to schedule; reschedule rate',
          ],
          [
            'Interview summaries',
            'Fine-tune plus RAG',
            'Competency framework and past scorecards',
            'Hiring team edit rate; time to decision',
          ],
          [
            'Candidate rediscovery',
            'RAG with human review',
            'Your candidate database and role requirements',
            'Recruiter acceptance rate; selection rates by group',
          ],
        ],
      },
      {
        type: 'p',
        text: 'Notice the last metric. Any tool that ranks or filters people should be monitored for adverse impact from day one, and the four-fifths rule is a common first check, not a safe harbor. [RAG](/glossary/rag) here means retrieving candidates and documents at search time, rather than training personal data into a model.',
      },
      { type: 'h2', text: 'What hiring laws apply to recruiting AI?' },
      {
        type: 'p',
        text: "New York City's Local Law 144 covers automated employment decision tools used for candidates or employees in the city. Employers and employment agencies need an independent bias audit within the past year, a published summary of the results and advance notice to candidates.",
      },
      {
        type: 'p',
        text: 'The EU AI Act treats AI used to recruit, filter or evaluate candidates as high-risk, with duties covering risk management, data quality, human oversight, logging and transparency. Its obligations phase in over several years, so check the current deadlines.',
      },
      {
        type: 'p',
        text: 'In the US, Title VII, the ADA and the ADEA apply whatever tool you use. In Mobley v. Workday, a federal court in 2024 let claims proceed on the theory that an AI screening vendor could be liable as an agent of employers. States are adding rules too, including Illinois on AI analysis of video interviews.',
      },
      {
        type: 'ul',
        items: [
          'Keep humans making every advance or reject decision, and record who decided.',
          'Test selection rates by group before launch and on a schedule after.',
          'Tell candidates when AI is used, and offer an alternative process where the law requires it.',
          'Log inputs and outputs so you can explain any outcome.',
        ],
      },
      {
        type: 'callout',
        title: 'General information, not legal advice',
        text: 'Employment AI law is changing quickly, so have employment counsel review any tool that touches selection. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control.',
      },
      { type: 'h2', text: 'What does a first recruiting AI pilot look like?' },
      {
        type: 'p',
        text: 'A focused pilot usually ships in two to six weeks. Start with admin, not selection. A three-week scheduling and outreach pilot:',
      },
      {
        type: 'ol',
        items: [
          '**Week 1:** map your scheduling rules and ATS stages, gather 300 or more past outreach messages with outcomes, and connect calendars.',
          '**Week 2:** build the scheduling agent and an outreach drafter in your voice, with recruiter approval before anything sends.',
          '**Week 3:** run on live requisitions, measure time to schedule, reply rate and recruiter hours, then decide whether to scale.',
        ],
      },
      { type: 'h2', text: 'Should a recruiting firm build, buy or partner?' },
      {
        type: 'p',
        text: 'Buy if your ATS already includes scheduling and parsing that work well. Many now do, and there is no point rebuilding them.',
      },
      {
        type: 'p',
        text: "Partner when you want an [AI agent system](/services/ai-agent-swarms) that runs across your ATS, inbox and calendars in your recruiters' voice, with compliance built in rather than bolted on. {{brand}} returns a plan, a price and an honest verdict within 24 hours.",
      },
      { type: 'h2', text: 'Where should your team start?' },
      {
        type: 'p',
        text: 'Start with the admin your recruiters hate most. Take the 2-minute [AI audit](/audit) or [talk to us](/#contact) about agents that free your recruiters to recruit.',
      },
    ],
    faqs: [
      {
        q: 'Is it legal to use AI to screen job candidates?',
        a: 'Using AI to screen job candidates is legal in most places, but it carries obligations. In New York City, Local Law 144 requires an independent bias audit and candidate notice for automated employment decision tools. The EU AI Act treats recruitment AI as high-risk. US anti-discrimination laws apply regardless of the tool. Many teams use AI for admin and summaries while recruiters keep selection decisions.',
      },
      {
        q: 'What is a bias audit under NYC Local Law 144?',
        a: 'A bias audit under NYC Local Law 144 is an independent evaluation of an automated employment decision tool that calculates selection or scoring rates by sex and by race or ethnicity categories, and the impact ratios between them. The audit must be done within one year before use, a summary must be posted publicly and candidates must be notified. It applies to employers and employment agencies hiring for New York City roles.',
      },
      {
        q: 'Can AI reduce bias in hiring?',
        a: 'AI can reduce some bias in hiring, such as inconsistent screening or biased job description language, but it can also scale bias if it learns from skewed historical decisions. The difference is testing. Measure selection rates by group, remove features that act as proxies for protected traits, keep humans on decisions and monitor after launch. Treat any vendor claim of bias-free AI with caution.',
      },
      {
        q: 'Which recruiting tasks are safest to automate with AI?',
        a: 'The safest recruiting tasks to automate with AI are administrative: interview scheduling, resume parsing into structured fields, drafting outreach for recruiter approval, summarizing interview notes and cleaning ATS data. These save recruiter hours without making selection decisions. Ranking, scoring and rejecting candidates carry far more legal risk and need bias testing, notice and human review before any part of them is automated.',
      },
      {
        q: 'How can staffing agencies use AI agents?',
        a: 'Staffing agencies use AI agents to re-engage past candidates in their database, draft personalized outreach, coordinate interviews with client hiring managers, keep the ATS clean and send status updates to candidates. The goal is more recruiter time on calls and relationships. {{brand}} builds these as agent systems that run across your ATS, inbox and calendars, with a focused pilot that usually ships in two to six weeks.',
      },
    ],
    related: [
      '/services/ai-agent-swarms',
      '/services/enterprise-ai-adoption',
      '/guides/ai-agents-for-business-operations',
      '/guides/fine-tuning-data-privacy',
      '/glossary/guardrails',
    ],
    keywords: [
      'AI for recruiting',
      'AI recruiting tools',
      'AI for staffing agencies',
      'AI candidate screening compliance',
      'NYC Local Law 144 bias audit',
      'AI interview scheduling',
      'AI recruiter outreach',
      'EU AI Act recruitment high-risk',
    ],
    updated: '2026-10-27',
  },

  /* -------------------------------------------------------------- EDUCATION */
  {
    slug: 'education',
    name: 'Education',
    title: 'Custom AI for education: tutors, feedback and course tools built on your curriculum',
    seoTitle: 'AI for Education: Custom AI Tutors, Models & Agents',
    description:
      'How schools, universities, edtech and training companies use custom AI for tutoring, feedback and course content, plus FERPA, COPPA and EU AI Act basics.',
    eyebrow: 'Industry · Education',
    answer:
      'Schools, universities, edtech companies and training providers use custom AI to tutor students on their own curriculum, give rubric-based feedback on writing, draft course materials and quizzes, and answer student and admissions questions. Student data rules apply: FERPA protects education records, COPPA covers children under 13, and the EU AI Act treats AI used to assess students or decide admissions as high-risk.',
    facts: [
      "FERPA protects student education records at schools that receive US Department of Education funding, and a vendor can receive records as a school official only while under the school's direct control.",
      'COPPA requires operators of websites and online services directed to children under 13 to get verifiable parental consent before collecting their personal information.',
      'The EU AI Act classifies AI used for admissions, evaluating learning outcomes and proctoring as high-risk, and bans emotion recognition in educational institutions except for medical or safety reasons.',
      'OpenAI withdrew its own AI text classifier in July 2023, citing its low rate of accuracy, which is one reason AI-writing detectors should not be used as sole evidence of misconduct.',
      'A focused education AI pilot, such as a curriculum-aligned tutor for one course, usually ships in two to six weeks.',
    ],
    useCases: [
      {
        title: 'Curriculum-aligned tutoring',
        detail:
          'A tutor answers from your course materials, asks guiding questions instead of handing over answers, and knows where each unit sits in the sequence.',
      },
      {
        title: 'Rubric-based writing feedback',
        detail:
          'A model trained on instructor-graded samples gives students specific feedback against your rubric before they submit. Instructors keep grading authority.',
      },
      {
        title: 'Course and assessment content',
        detail:
          'Draft lesson plans, quiz banks, worked examples and differentiated readings from your learning objectives, for teachers to review and adapt.',
      },
      {
        title: 'Student and admissions support',
        detail:
          'An agent answers questions about deadlines, financial aid steps and registration from your official policies, and routes complex cases to staff.',
      },
      {
        title: 'Corporate training content',
        detail:
          'Training providers turn subject matter expert interviews into modules, assessments and job aids in their house format.',
      },
      {
        title: 'Accessibility support',
        detail:
          'Automations draft captions, transcripts, alt text and plain-language summaries so materials work for more learners, with staff checking accuracy.',
      },
    ],
    services: ['custom-model-fine-tuning', 'fine-tuning-datasets', 'ai-digital-products', 'ai-content-engine'],
    body: [
      { type: 'h2', text: 'Where does AI actually pay off in education?' },
      {
        type: 'p',
        text: "Education has a capacity problem. More students need feedback, help and attention than there are teacher hours to give. Custom AI helps most where it extends a teacher's reach without replacing their judgment: practice, feedback, materials and routine questions.",
      },
      {
        type: 'p',
        text: "The word that matters is custom. A general chatbot will happily do a student's homework. A tutor built on your curriculum can ask the next guiding question, cite the right textbook section and stop short of giving the answer away.",
      },
      {
        type: 'p',
        text: 'Where AI does not pay off yet: automated grading with no human review, and AI-writing detectors as proof of cheating. OpenAI withdrew its own AI text classifier in 2023 over low accuracy. Redesigning assessments works better than policing them.',
      },
      { type: 'h2', text: 'Which education use cases need fine-tuning, RAG or an agent?' },
      {
        type: 'p',
        text: '[RAG](/glossary/rag) is a setup that retrieves your course materials when a student asks a question, so answers stay tied to your curriculum. [Fine-tuning](/glossary/fine-tuning) is training a model on examples, such as instructor feedback, so it responds the way your best teachers do. An agent is a model that completes multi-step tasks across systems.',
      },
      {
        type: 'table',
        caption: 'Education AI use cases by approach',
        head: ['Use case', 'Best approach', 'Data you need', 'Metric to track'],
        rows: [
          [
            'Curriculum-aligned tutor',
            'RAG plus fine-tune',
            'Course materials plus 300-1,000 example tutoring exchanges',
            'Practice completion; assessment results versus prior cohorts',
          ],
          [
            'Rubric-based feedback',
            'Fine-tune',
            '500-2,000 instructor-graded submissions with comments',
            'Agreement with instructor scores; quality of revisions',
          ],
          [
            'Course and quiz content',
            'Fine-tune or prompting',
            'Learning objectives, past materials, item bank',
            'Teacher prep hours; share of items passing review',
          ],
          [
            'Student and admissions questions',
            'Agent plus RAG',
            'Official policies, deadlines, past inquiries',
            'Response time; escalations to staff',
          ],
          [
            'Accessibility outputs',
            'Automation',
            'Course videos and documents',
            'Share of materials with captions and alt text',
          ],
        ],
      },
      {
        type: 'p',
        text: 'Assume one course or program per pilot. Feedback models need consistent grading across instructors, so calibration sessions often matter more than volume. Our guide to [preparing a fine-tuning dataset](/guides/how-to-prepare-fine-tuning-dataset) covers the details.',
      },
      { type: 'h2', text: 'How do FERPA, COPPA and student privacy rules apply to AI?' },
      {
        type: 'p',
        text: "FERPA protects student education records at schools that receive US Department of Education funding. A vendor can access records as a school official only if it performs a school function and stays under the school's direct control over how the data is used. Contracts should forbid using student data for anything else, including training general models.",
      },
      {
        type: 'p',
        text: 'COPPA applies to online services directed to children under 13, or that knowingly collect their data, and requires verifiable parental consent before collecting personal information, with limited exceptions. Many US states add their own student privacy laws, such as California\'s SOPIPA.',
      },
      {
        type: 'p',
        text: 'In Europe, the EU AI Act classes AI for admissions, grading, placement and proctoring as high-risk, and bans emotion recognition in schools except for medical or safety reasons.',
      },
      {
        type: 'ul',
        items: [
          'Minimize the student data a model sees. Many tutoring use cases need none at all.',
          'Keep data in systems the institution controls, with no vendor training on it.',
          'Add [guardrails](/glossary/guardrails): automated checks that block age-inappropriate content and answer-dumping.',
          'Keep teachers in charge of grades and placement.',
        ],
      },
      {
        type: 'callout',
        title: 'General information, not legal advice',
        text: 'Check state law and your district or university policies before launch. {{brand}} can work inside your own cloud, sign NDAs and DPAs, and deploy on infrastructure you control, so student data can stay inside your environment.',
      },
      { type: 'h2', text: 'What does a first education AI pilot look like?' },
      { type: 'p', text: 'A focused pilot usually ships in two to six weeks. A four-week tutor pilot for one course:' },
      {
        type: 'ol',
        items: [
          '**Week 1:** pick one course and unit, gather materials, and write tutoring rules with two instructors: when to hint, when to explain, when to escalate.',
          '**Week 2:** build retrieval over the materials, collect example exchanges and create a test set of tricky student questions.',
          '**Week 3:** tune the tutor and run it with a small group of instructors posing as students.',
          '**Week 4:** open it to one section, review transcripts weekly, and compare practice completion and unit results with prior sections.',
        ],
      },
      { type: 'h2', text: 'Should a school or edtech company build, buy or partner?' },
      {
        type: 'p',
        text: 'Schools and universities should buy for general productivity and partner for anything tied to their own curriculum, assessment or data. Most do not have machine learning teams, and they should not need one to run a good tutor.',
      },
      {
        type: 'p',
        text: 'Edtech and training companies should treat AI as product. Their curriculum is the moat, and a [custom fine-tuned model](/services/custom-model-fine-tuning) protects it better than a thin wrapper anyone can copy.',
      },
      {
        type: 'p',
        text: "{{brand}} returns a plan, a price and an honest verdict within 24 hours, and if a general tool already does the job, we'll say so.",
      },
      { type: 'h2', text: 'Where should you start?' },
      {
        type: 'p',
        text: 'Start with the course where students most need extra practice and teachers have the least time. Take the 2-minute [AI audit](/audit) or [talk to us](/#contact) about a tutor that teaches your way.',
      },
    ],
    faqs: [
      {
        q: 'Can AI tutors help students without doing their homework for them?',
        a: 'AI tutors can help students without doing their homework when they are built on the course curriculum and instructed to guide rather than answer. A well-designed tutor asks what the student has tried, gives a hint, points to the relevant section and explains fully only after real effort. Teachers should review transcripts during the pilot to tune that balance for their subject and age group.',
      },
      {
        q: 'Is using AI with student data FERPA compliant?',
        a: "Using AI with student data can be FERPA compliant when the vendor qualifies as a school official: it performs a function the school would otherwise do, has a legitimate educational interest and stays under the school's direct control over how records are used. Contracts should forbid secondary uses such as training general models. Many tutoring use cases need no student records at all, which is simplest.",
      },
      {
        q: 'Should schools use AI detectors to catch cheating?',
        a: 'Schools should not rely on AI writing detectors as sole evidence of cheating. Their accuracy is limited, and OpenAI withdrew its own AI text classifier in 2023 because of low accuracy. False accusations harm students and trust. Better options include in-class writing, oral check-ins, drafts with revision history and assignments that ask students to apply course material to their own experience.',
      },
      {
        q: 'How can edtech companies use fine-tuning?',
        a: "Edtech companies use fine-tuning to make AI behave like their pedagogy: giving feedback in their rubric's language, generating practice items at the right difficulty and tutoring with their preferred hint sequence. A fine-tuned smaller model can also lower cost per student at scale. The training data usually comes from expert-graded work and curated example exchanges, not from raw student records.",
      },
      {
        q: 'How long does it take to launch an AI tutor or feedback tool?',
        a: 'An AI tutor or feedback tool for one course usually takes two to six weeks to reach a pilot with real students, assuming materials and a few hundred example exchanges or graded submissions are available. Wider rollout depends on teacher training, privacy review and pilot results. {{brand}} scopes pilots to one course so the evidence is clear before anyone scales.',
      },
    ],
    related: [
      '/services/custom-model-fine-tuning',
      '/services/fine-tuning-datasets',
      '/services/ai-digital-products',
      '/guides/fine-tuning-data-privacy',
      '/glossary/rag',
    ],
    keywords: [
      'AI for education',
      'AI tutor for schools',
      'custom AI tutor',
      'AI in higher education',
      'AI for edtech companies',
      'FERPA compliant AI',
      'AI feedback on student writing',
      'AI for corporate training',
    ],
    updated: '2026-10-27',
  },
];
