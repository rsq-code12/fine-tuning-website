# Turing · content audit

- Site: https://www.turing.com
- Reviewed: 2026-11-03, pages:
  - Front doors: `/` (expert/talent home), `/frontier-ai` (AI-lab home), `/enterprise-ai` (enterprise home)
  - AGI / lab arm: `/advance` (older "AGI Advancement" landing, still live), `/advance/rl-gyms` (redirects, see notes), `/frontier-ai/rl-environments`, `/frontier-ai/software-engineering`, `/frontier-ai/enterprise-knowledge-work`, `/frontier-ai/stem`, `/frontier-ai/datasets`, `/frontier-ai/experts`, `/research`
  - Enterprise arm: `/intelligence` (older "Turing Intelligence" landing, still live), `/intelligence/build`, `/intelligence/advise`, `/services/llm-fine-tuning`, `/anthropic-partnership`
  - Company and trust: `/company`, `/news` (newsroom, `/press` redirects here), `/press/turing-announces-turing-frontier`, `/contact-us`, `/dpa-terms`, `/blog/agi-advance-newsletter-77`, `/sitemap.xml`
  - Case studies: `/case-study` (index), `/case-study/building-production-ready-rl-gyms-for-commercial-agent-workflows` (main one read), `/case-study/evaluating-olympiad-grade-math-reasoning-for-salesforce`, `/case-study/building-model-breaking-coding-evaluation-tasks-with-reference-free-rubrics`, `/case-study/lending-automation-transformation`
- Fetch notes:
  - The root `turing.com` now serves the **expert recruiting** home (title "Turing Talents"). Buyers reach their pages through a small "For Clients" link to `/frontier-ai`. So in practice the lab home is `/frontier-ai` and the enterprise home is `/enterprise-ai`.
  - `/advance/rl-gyms` redirects three times (to `/advance/rl-environments`, then to `/frontier-ai/rl-environments`). The older RL Gyms copy that search snippets describe (1,000+ environments, prompts plus verifiers plus seed data, trajectory generation) is no longer live. I did not use archive or proxy services to recover it.
  - The new pages are thin: a hero, three feature cards, an FAQ and a contact block. WebFetch showed only the first FAQ answer. The other answers sit in the page's embedded JSON, so I read them from raw HTML pulled directly from turing.com with curl. They count as on-page copy.
  - The older `/advance` and `/intelligence` landings are still live and in the sitemap but no longer in the main nav. Their copy is much richer and reads like the previous version of the site. I documented both versions.
  - `research.turing.com` returned only a title (a JS shell). `www.turing.com/research` rendered fine.
  - No security or trust page exists: `/security` and `/trust` return 404, `trust.` and `security.` subdomains do not resolve, and the sitemap lists none.
  - The logo bands are images. Names come from alt text and the rendered page.
  - Site inconsistencies I noticed: the About page spells the CTO "Ece Kumar" while the press release says "Ece Kamar", the breadcrumb on the RL environments page reads "ENVIROMENTS", and the About page renders the leadership block twice.

## 1. Positioning
- Hero headlines (one per front door):
  - Expert home: "Your expertise builds AI."
  - Lab home: "Frontier AI" (page title: "Datasets, RL Environments & Experts for AI Labs")
  - Enterprise home: "Enterprise AI" (page title: "Forward-Deployed Engineers & Agent Platform")
  - Older lab landing: "Improve Real-World Model Reasoning"
  - Older enterprise landing: "Realize the Full Value of AI"
  - Company line, on every page above the footer: "Accelerate superintelligence to drive real economic progress"
- Subheadlines (paraphrase):
  - Lab home: helps labs train models and improve performance in software engineering, enterprise knowledge work and STEM.
  - Enterprise home: Turing provides forward-deployed engineers who build the agents a company needs, plus a control plane that deploys, manages and scales them.
  - Older lab landing: improve frontier model performance with proprietary data, structured RL environments, coding benchmarks and multimodal tests.
  - Older enterprise landing: help enterprises move from AI pilots to production systems with real results.
- Category they claim (their words, short): Turing never claims one category name. It uses a capability triad instead.
  - Labs: "Datasets, RL Environments & Experts". The older version called itself a "research accelerator focused on post-training improvement".
  - Enterprise: "Forward-Deployed Engineers & Agent Platform". The older version used Advise / Augment / Build.
- Primary audiences: three, each with its own front door.
  - **Frontier AI labs** get artifacts (datasets, RL environments, expert supply, benchmarks). The tone is near-academic.
  - **Enterprises** get people plus a platform (forward-deployed engineers, or FDEs, and the "Turing Intelligence Platform"). The tone is about outcomes and ownership.
  - **Experts / contractors** are the supply side. The root domain and the one persistent header button, "Join expert network", are aimed at them, not at buyers.
- One-sentence entity definition they repeat (paraphrase): Turing describes itself as a San Francisco company that gives frontier labs data, evaluations and RL environments in software engineering, enterprise knowledge work and STEM, and builds agent systems for Fortune 500 enterprises. It claims that working on both sides closes the loop between frontier research and real-world deployment. Versions of this appear on the About page, in the press boilerplate, in the enterprise FAQ and on the Anthropic partnership page.

## 2. Homepage architecture

### A. Root `/`: expert recruiting home (supply side)
1. Minimal nav: logo, "For Clients", "Log In", "Join our network". This is the only way buyers get off this page.
2. Scrolling task cards: about 20 paid expert tasks (for example a chemistry reviewer or a cardiology clinical reviewer), each with a one-line task and a price of $200 to $300. Job: show that the work is real and paid.
3. Hero: "Your expertise builds AI." with role-category chips (software engineer, math expert, voice expert...). Job: let experts pick a path.
4. Stats: "$300M+" raised from top VCs and 4.3 on Trustpilot. Job: show the company is solvent and legitimate to workers.
5. "Work With" logo strip (Anthropic, Gemini, Nvidia). Job: borrowed prestige.
6. "Be at the forefront of AI": quote cards attributed to well-known AI leaders (Sam Altman, Jeff Dean, Adam D'Angelo). Job: aspiration. I did not check whether the quotes are about Turing.
7. "Why Experts Choose Turing": three cards (pay, flexibility, an "Elite Network" across 140+ countries). Job: the value proposition.
8. Video testimonials from named experts by discipline. Job: peer proof.
9. Newest roles, a newsletter sign-up ("Notify me") and a closing CTA ("Join our network", "Explore roles").
10. Footer: Company / Resources / Legal / social.

### B. `/frontier-ai`: AI-lab home (current)
1. Hero: H1 "Frontier AI", one sentence naming the three domains, one CTA ("Request dataset samples"). Job: say what Turing does, in nouns.
2. Logo band: "WE PARTNER WITH ALL THE TOP FRONTIER AI LABS" (Anthropic, Gemini, Nvidia, Snowflake, Augment, Character.ai, in a scrolling carousel). Job: the main social proof.
3. FAQ with about 20 questions. **This is where nearly all the persuasion happens.** It covers which labs Turing works with (it names OpenAI, Anthropic, Google DeepMind, Meta, NVIDIA), core capabilities, sample turnaround (it says samples typically arrive within 48 hours), formats (image folders, CSV/JSON, WAV), licensing (samples are research-only, commercial terms on request), what happens after a sample (outreach from the research team), the size of the expert network (5M+ in 250+ domains), what a dataset contains (RL environments, tasks, verifiers and traces bundled in), who builds the datasets (domain experts, research first), where they are published (Turing Data Hub and Hugging Face), what each catalog entry shows (environment type, volume, model scores), and domain questions on software engineering, reasoning and STEM rigor. Job: objection handling and the technical spec.
4. Contact block: "GET STARTED" / "Contact us", with the sample request and the weekly newsletter. Job: conversion.
5. Footer with the superintelligence mission line.
- Not present: stats, case study cards, testimonials, a research feed. The page relies on the logo band plus the FAQ.

### C. `/enterprise-ai`: enterprise home (current)
1. Hero: H1 "Enterprise AI", one sentence (FDEs build the agents, the control plane runs them), CTA "Work with us".
2. Logo band: "Trusted by Fortune 500 enterprises" (Disney, Pepsi, Reddit, Volvo, Dell).
3. FAQ with 8 questions:
   - **What Turing offers:** embedded engineers plus a platform.
   - **How it differs:** a "strategic partner" working in your codebase and sprints; you own the code, IP and direction; it brings knowledge from both labs and enterprise.
   - **Models:** model-agnostic (frontier, open-source or your own fine-tune).
   - **Security and compliance:** agents run on your infrastructure, so data does not leave your environment; you choose the models and cloud; governance controls give visibility; it aligns to your compliance frameworks, including financial services and insurance.
   - **Reliability:** FDEs "come from frontier AI labs" and combine post-training with context and harness engineering.
   - **FDE background:** same lab-lineage claim.
   - **Integration:** no vendor lock-in.
   - **After launch:** Turing keeps operating the agents rather than handing them off.
4. "GET STARTED" banner, then a contact block. It promises that a forward-deployed engineering lead will follow up with a scoping conversation.
5. Footer.

### D. `/advance`: older "Turing AGI Advancement" lab landing (still live, richer)
1. Hero: "Improve Real-World Model Reasoning" with two CTAs ("Talk to Our Research Team", "Request Sample Data").
2. "Core Capabilities": three blocks, each with its own CTA. **Data Packs** ("Request Sample Data"), **RL Environments** (browser-use, function calling, enterprise simulations; "Request RL Environments") and **Benchmarks** (SWE-bench++, VLM-bench, private suites; "Request Benchmark Access").
3. "Structured Workflows for Post-Training": three steps, Evaluate ("Run Benchmarks"), Generate ("Build Data"), Optimize ("Deploy Improvements"). Job: show the engagement as a loop.
4. "Why Labs Choose Turing": five reasons:
   - On-demand frontier talent (PhDs, Olympiad-level experts trained in rubric QA)
   - The **ALAN** human-AI platform (evaluators, AI reviewers and synthetic data in one traceable loop)
   - In-house research
   - A repeatable **Five-Step Framework**
   - **Migration and vendor replacement** (keeping evaluator continuity when a lab switches vendors)
5. "From Research to Results": six cards mixing named case studies (Salesforce AI Research, NVIDIA CVDP), a research report (VLM-bench 1.0) and a benchmark (SWE-bench++). Job: proof through named work.
6. FAQ (8 questions). It defines AGI Advancement and spells out the Five-Step Framework: align goals, calibrate rubrics and evaluators, generate tasks and trajectories, fine-tune with verified data, verify through evaluator and validator QA. It also defines ALAN, describes the talent network, claims SWE-bench++ has 7,000+ tasks, names the labs it supports and covers vendor migration.
7. Closing CTA: "Ready to train smarter models?" with "Talk to a Researcher".
8. Newsletter block (the weekly "AGI Advance" newsletter).

### E. `/intelligence`: older "Turing Intelligence" enterprise landing (still live, richer)
1. Hero: "Realize the Full Value of AI" with "Talk to a Turing Strategist".
2. "From Strategy to Systems": the **Advise / Augment / Build** triad. Augment claims "top 1-3% AI-native talent" embedded in your workflows.
3. "How Mature Are Your AI Capabilities?": a hook stat ("Over 80% of AI projects fail"), then a self-assessment ("Take the AI Maturity Assessment"). Job: generate leads with a diagnostic.
4. "From AI Potential to Performance": four tabs.
   - **The AI Enterprise Gap:** three failure modes.
   - **How We Close the Gap:** outcome-led design, agentic systems, embedded experts, post-training precision.
   - **Results You Can Measure:** 45% shorter underwriting timelines, a 30x gain in decision efficiency, up to 20% lower operating costs. All unattributed.
   - **Execution That Scales.**
   - Each tab has an "Enterprise Insight" survey stat (for example 43% of leaders say past AI initiatives fell short) and a link to an article.
5. "Insights in Intelligence": six thought-leadership articles (why AI projects fail, scoping around KPIs, the ROI of post-training alignment...).
6. "Explore AI Outcomes in BFSI": an industry vertical page.
7. Closing CTA: "Let's Realize Your AI Potential", with a "we don't just advise, we build" line.

### F. Product / domain page template (current lab pages)
Breadcrumb, then an H1 that is just the noun ("RL environments", "Software engineering", "Experts"), then one sentence and one CTA. Next comes a "FEATURES AND BENEFITS" eyebrow with an H2 claim ("Built for frontier standards", "Real engineering work, not just coding puzzles") and three H3 cards. Then a "CAPABILITIES" catalog of dataset cards. Each card shows a name and a "new" flag, tags, the frontier models tested (with reasoning-effort settings), one headline score (pass rate, pass@k or reward rate), a task count and a one-line description. The page ends with "GET STARTED" / "Contact us". The RL environments page has three cards: UI clones of apps like Jira, Salesforce and Zendesk; backend/MCP environments with SME-built policies and seed data; and observability harnesses that capture trajectory traces.

### G. Research page `/research`
H1 "Research", subhead (original benchmarks and "hillclimbing" datasets from the **Turing Frontier Research Lab**), CTA "Get in touch". Then "From Turing Frontier Research Lab": two dated entries (Turing Terminal-Bench Data, 300 tasks; Turing Frontier Agentic STEM, 201 tasks). Each has "Blog" and "Fact sheet" links and a top-3 leaderboard of named frontier models with ± confidence intervals. After that comes an FAQ:
- **Why the lab exists:** Turing says public benchmarks are saturating, so leaderboards stop separating models.
- **What it produces:** frontier-calibrated benchmarks, datasets for SFT, distillation and RL with verifiable rewards, and failure analysis down to root causes.
- **What "frontier-calibrated" means:** difficulty is tuned so a meaningful share of tasks stays unsolved by today's best models.
- **Quality:** tasks are SME-written, graded by deterministic verifiers and independently reviewed three times.
- **Why verifiers matter:** false positives and negatives poison every downstream use.
- **How the data can be used:** evaluation, RL rewards, distillation and curricula.
- No papers and no named researchers.

### H. Case study template (lab-side example: RL gym case study)
1. H1 that leads with a number ("Building Production-Ready RL Gyms ... Across 4 Platforms").
2. A one-paragraph summary.
3. A **metric trio** (100+ workflows; 4 platforms named; Pass@3 difficulty framework).
4. A **tag row** (Method, Domain, Dataset scale, Capability).
5. The Challenge (a bullet list of requirements).
6. The Approach, in numbered layers: sandboxed UI replicas with seed data; workflow blueprints (goal, prompt, steps, verifiers); a verifier API (state inspection, assertion rollup, a shared run id across gyms); Pass@3 difficulty calibration aimed at the Hard band; Docker packaging with docs.
7. Key Results and The Outcome.
8. An in-line CTA ("Want to train agents on real commercial workflows?" / "Request Sample").
9. An FAQ. It says environments are sandboxed with synthetic seed data and no live credentials, the gym is non-exclusive, samples come **within three business days after NDA**, and Turing returns a countersigned mutual NDA **within one business day**.
10. Related case studies, a second CTA and the newsletter.
- Clients are mostly anonymized ("the client"). A minority are named: Salesforce AI Research, NVIDIA CVDP, ServiceNow's EnterpriseOps-Gym and Apriel 1.5.
- Enterprise case studies (for example lending automation) swap the tag row for Industry / Company type / Country, and lead with business percentages (45% faster loan processing, 30% lower cloud cost).

## 3. Navigation and site map
- Top nav (all current client pages):
  - **Frontier AI** (dropdown). Domain: Software Engineering, Enterprise Knowledge Work, Frontier STEM. Capability: Off-The-Shelf Datasets, RL Environments, Experts, Research.
  - **Enterprise AI**
  - **Research** (a direct link)
  - **Resources** (Blog, Case Studies, Articles)
  - **Experts**
  - A search icon, and a single button: "Join expert network".
- Root home nav (expert side): "For Clients", "Log In", "Join our network".
- Footer:
  - Tagline line: "Accelerate superintelligence to drive real economic progress"
  - Groups: Frontier AI (Domain / Capability) · Enterprise AI · Resources · For Experts (How to get hired, Developer reviews, Knowledge base, Tech interview questions) · Company (About, Careers, News) · Contact (Contact Us, Help Center)
  - Legal row: Terms of Service, Privacy Policy, Cookie Settings, Do Not Sell or Share My Personal Info
  - Social icons, then the copyright line with the full legal entity name and a San Francisco mailing address.
- Notable pages:
  - **Research** (Turing Frontier Research Lab, leaderboards, fact sheets)
  - **Case studies** (the index paginates about 97, with search)
  - **Newsroom** with a downloadable media kit, executive-hire releases and "Featured in the news" interviews
  - The **"AGI Advance"** weekly newsletter (77 issues, regular segments)
  - A **Turing x Anthropic** partnership page
  - **DPA terms** with a subprocessor list (Google Cloud Platform, US, SCCs)
  - A **Contact** page with separate addresses for support, partnerships, press and a **bug bounty** inbox
  - Careers subdomain, Help Center
  - Industry vertical pages (BFSI, retail) under `/intelligence`
  - About 25 older `/services/*` SEO pages (LLM fine-tuning, RLHF, evaluation, agentic workflows...)
- Missing:
  - No Security page or Trust Center
  - No pricing
  - No standalone methodology or docs page (method lives inside FAQs and case studies)
  - No named research team page

## 4. Voice and tone
- Five adjectives: confident, spare, technical, operational, institutional.
- Sentence style:
  - **Current pages:** extremely short. The H1 is a bare category noun. There is one subhead sentence, and card copy is a fragment heading plus one sentence. Eyebrows are in caps ("FEATURES AND BENEFITS", "GET STARTED"). Full explanatory sentences appear only in FAQs, which read like plain technical documentation.
  - **Older pages:** Title Case headlines and marketing triads (Advise / Augment / Build; Evaluate / Generate / Optimize), plus contrast lines like "We don't hand off decks. We build alongside you."
  - **Case studies:** report style (Challenge / Approach / Results), with numbered method steps.
- Person:
  - Lab pages are mostly impersonal or third person ("Turing offers...") with imperative CTAs.
  - Enterprise pages lean on "we" and "your" (your codebase, your sprints, your infrastructure).
  - The expert page speaks to "you" ("Your expertise builds AI.").
  - The About page uses "we" for the values ("We are client first").
- Jargon level:
  - **Lab side: high, rarely explained.** Terms include RL environments, verifiers (deterministic, prompt-aligned), trajectories and traces, long-horizon, MCP, SME-built, seed data, UI clones, Harbor / Terminal-Bench format, pass@k, hillclimb, frontier-calibrated, contamination-free, saturation, RLVR, SFT, distillation, reward modeling, rubric QA, model-breaking.
  - **Enterprise side: low.** Terms include FDEs, control plane, production, KPIs, ROI, governance, lock-in, POCs to production.
- How they use numbers (four distinct registers):
  1. **Scale claims** on About and Experts: "5M+" domain experts, "1M+" curated tasks, "9/9" frontier labs, 250+ domains, plus "$300M+" raised and 140+ countries on the expert home.
  2. **Scientific precision** on research and catalog cards: exact task counts (201, 300, 1,441, 6,781), pass rates per named model and version, ± confidence intervals, pass@3 or pass@8.
  3. **Service promises:** samples typically within 48 hours, mutual NDA countersigned within one business day, case-study samples within three business days of NDA.
  4. **Enterprise outcome and survey stats:** 45% / 30x / 20% results, and "Enterprise Insight" survey percentages (43%, 84%, 89%, "over 80% of AI projects fail"), shown without sources on the page.
- Typical lines (paraphrased, not verbatim):
  - Public leaderboards have saturated, so once top models bunch together the benchmark is a coin flip. Turing builds harder, uncontaminated tasks to restore the signal.
  - Bad grading poisons everything downstream, so verifiers must be deterministic and match exactly what the prompt asks.
  - Turing's engineers come from frontier labs and work inside your codebase and sprints rather than as outside consultants, and you keep the code and IP.
  - Turing works on both sides, so lessons from enterprise deployment flow back into better training data for labs.

## 5. Trust signals
| Signal | Present? | How it is presented |
|---|---|---|
| Customer / lab logos | Yes, heavily | Lab band: "WE PARTNER WITH ALL THE TOP FRONTIER AI LABS" (Anthropic, Gemini, Nvidia, Snowflake, Augment, Character.ai). The lab FAQ also names OpenAI, Anthropic, Google DeepMind, Meta and NVIDIA. Enterprise band: "Trusted by Fortune 500 enterprises" (Disney, Pepsi, Reddit, Volvo, Dell). The expert home has a smaller "Work With" strip. |
| Named case studies with metrics | Yes, mostly anonymized | About 97 case studies. Most say "the client". Named ones include Salesforce AI Research (step-level math grading, 200+ solutions, 500+ expert hours), NVIDIA CVDP (1,500+ Verilog tasks), ServiceNow EnterpriseOps-Gym and Apriel 1.5. Lab case studies lead with **output volume** (1,000+ tasks, 100+ workflows). Enterprise ones lead with **business deltas** (45% faster loan processing). Only one testimonial appears on the pages I read: an anonymized quote from an "Operations Lead, Leading AI lab" on the fine-tuning page. |
| Certifications (SOC 2, ISO 27001, HIPAA, GDPR) | Not shown | No certification is named on any page I read. Turing job ads mention running SOC 2 and ISO 27001 audits, and a third-party aggregator lists certifications, but the site itself makes no claim. |
| Security / trust page | No | There is no dedicated page (404s). Security is covered piecemeal: the enterprise FAQ answer (agents run on your infrastructure, data stays in your environment, governance visibility, alignment with your compliance frameworks, regulated industries), the DPA with its subprocessor list, a bug bounty inbox, sandboxed environments with no live credentials, research-only sample licences, NDA turnaround times and a press release on hiring a CISO (Sep 2026). |
| Research, papers, benchmarks, leaderboards | Yes, strong | "Turing Frontier Research Lab". Dated datasets carry leaderboards with confidence intervals and fact sheets. A benchmark catalog (SWE-bench++, VLM-bench, HLE++, SciCode++, CEO Bench, CompanyBench, EKWBench, CyberStrike, KernelQuest, Terminal-Bench data) shows named-model scores on every card. Datasets are published on Hugging Face and a "Data Hub". A weekly newsletter carries benchmark findings. No papers or named researchers on the research page. |
| Leadership / team credentials | Partial | The About page lists six executives by name and title only, with no bios or photos of note (CEO and co-founder, co-founder and Head of Growth, President and CRO, CTO, CFO, CLO). Credentials appear only in press releases (for example the CTO came from Microsoft's frontier AI lab). Enterprise FAQs give the FDE team a collective credential ("come from frontier AI labs"). |
| Investors / funding | Barely | Only "$300M+ raised from top VCs" on the expert home. No investors are named and there are no funding announcements on client pages. |
| Partners (AWS, Google, NVIDIA...) | One major | The **Turing x Anthropic** page claims launch-partner status for Claude Enterprise, Claude for Financial Services and Claude for Life Sciences, plus a startup program with API credits. The press list mentions a Humain partnership. There are no cloud partner badges. GCP appears only as a subprocessor. |
| Expert network size / workforce claims | Yes, central | 5M+ experts, 250+ domains, credentials by field (PhDs, MDs/DOs/PharmDs, attorneys, bankers), 140+ countries on the expert side. The "Turing Frontier" release adds US-based professionals verified by identity, background and work-history checks. |
| Methodology / quality process explained | Yes, but scattered | Turing never puts its method on a page of its own. It lives in FAQs and case-study Approach sections. Older `/advance` names a Five-Step Framework and the ALAN human-AI QA platform. The research FAQ covers SME-written tasks, deterministic verifiers, triple independent review and frontier calibration. The expert FAQ gives a three-stage vetting process (screening and matching; automated tests including coding in 18+ languages, RLHF/SFT-style tasks and an AI interviewer; human expert review for high-stakes roles). Case studies add rubric design, Pass@3 calibration, model-breaking validation, 10+ binary QA checks per task and screening for LLM-generated content. |
| Press / awards | Press yes, awards no | Newsroom with a media kit, executive-hire releases (CTO, CISO, President) and CEO interviews under "Featured in the news". No awards on client pages. The expert home shows a Trustpilot rating. |

## 6. How they earn trust without (or before) proof
On the pages with no logos and no case studies (RL environments, the domain pages, research, experts), Turing earns trust with these moves:
- **It describes the deliverable.** It says exactly what a buyer receives: environments plus tasks plus verifiers plus traces, formats (CSV/JSON, WAV, image folders), Docker containers with docs, and the Harbor/Terminal-Bench format. Being concrete reads as competence.
- **It publishes measurements, not adjectives.** Every catalog card shows how named frontier models score on it, with a task count. Research entries add ± confidence intervals. Difficulty is defined against current top models ("frontier-calibrated"), so the claim can be checked.
- **It names the industry problem it solves.** Benchmark saturation, contaminated tests and noisy verifiers (false positives and negatives). Showing it understands the problem stands in for a client list.
- **It answers process questions in FAQs.** How experts are vetted, whether vetting can be customized, who picks the experts, how verifier quality is kept, what "frontier-calibrated" means. Tough questions are asked and answered plainly.
- **It makes concrete service promises.** Samples in about 48 hours. A mutual NDA countersigned in one business day. A sample within three business days of NDA. Research-only licence on samples. A named next step (the research team reaches out about access, volume and pricing). These are promises a buyer can test immediately.
- **The CTA lets buyers check the work themselves.** "Request dataset samples" is the main CTA on every lab page, so the buyer judges quality on their own data.
- **It makes ownership and control promises (enterprise).** You own the code, IP and direction. It is model-agnostic. Data stays in your infrastructure. No lock-in. Turing keeps operating the agents after launch instead of handing them off.
- **It borrows credentials from the team's background.** "Engineers from frontier labs" replaces individual bios.
- **It offers a diagnostic as a first step (older enterprise pages).** The AI Maturity Assessment gives value before any sale.
- **It publishes on a steady schedule.** The weekly newsletter's headlines are findings about where models fail (for example that most agent failures end in a confident false claim of completion). Analysis of failures is used as authority.
- **It states its limits.** For example, the Salesforce FAQ says the work was for evaluation only, not training. The RL gym write-up says cross-platform state does not sync in real time. Stating limits makes the rest more believable.

## 7. Vocabulary
1. frontier / frontier AI labs / frontier models
2. superintelligence (mission line only)
3. post-training
4. RL environments (formerly "RL gyms"; "gym" survives in case studies)
5. verifiers / verifier-graded / deterministic verifiers / step-level verifiers
6. rubrics / rubric-aligned / reference-free rubrics / rubric QA
7. trajectories / traces / trajectory traces
8. long-horizon (workflows, tasks)
9. agents / agentic systems / agentic workflows
10. expert-authored / SME-built / PhD-level / domain experts
11. hillclimb / hillclimbing datasets
12. frontier-calibrated
13. model-breaking
14. contamination-free / benchmark saturation / signal
15. seed data / UI clones / sandboxed replicas
16. MCP environments / tool calls / computer-use / browser-use / terminal
17. pass@k (Pass@3, pass@8) / pass rate / reward rate
18. SFT, RLHF, DPO, distillation, RL with verifiable rewards, reward modeling
19. off-the-shelf datasets / data packs / catalog
20. benchmarks / leaderboards / fact sheet
21. human-in-the-loop / evaluator continuity
22. forward-deployed engineers (FDEs)
23. control plane / Turing Intelligence Platform
24. production-ready / production-grade / from POC to production
25. proprietary intelligence / no lock-in / you own the IP / KPIs

## 8. Calls to action
- **Lab side (current):**
  - "Request dataset samples": hero and contact block on every Frontier AI page
  - "Subscribe to newsletter": contact block
  - "Hire experts": hero and contact on the Experts page
  - "Get in touch": research hero and contact
  - "Blog" and "Fact sheet": research entries
  - "Request Sample": two or three times per lab case study, under a question heading ("Want to train agents on real commercial workflows?")
  - "Subscribe Now": newsletter block
- **Lab side (older `/advance`):** "Talk to Our Research Team", "Request Sample Data", "Request RL Environments", "Request Benchmark Access", "Run Benchmarks", "Build Data", "Deploy Improvements", "Read Case Study", "Download Report", "Explore Benchmark", and the closing pair "Ready to train smarter models?" / "Talk to a Researcher".
- **Enterprise side (current):** "Work with us" in the hero and contact block. The contact copy promises a scoping conversation with an FDE lead.
- **Enterprise side (older `/intelligence`):** "Talk to a Turing Strategist" (hero and close), "Take the AI Maturity Assessment", "Define your AI strategy", "Discover AI-native talent", "Develop proprietary AI systems", "Explore Intelligence for BFSI", "Read" on articles.
- **Other enterprise and service pages:** "Get Started" and "Start Your Evaluation" (fine-tuning page), "Define your proprietary intelligence" (Anthropic page), "Get Started" (enterprise case studies, under "Want to accelerate your business with AI?").
- **Global:** "Join expert network" (header button on every client page), "Contact Us" and "Help Center" (footer).
- **Expert home:** "Join our network", "Explore roles", "Notify me", "Watch video", "For Clients", "Log In".
- Pattern: there is no "Book a demo" and no pricing anywhere. Labs are asked for a **sample request**. Enterprises are asked for a **scoping conversation**. Closing CTAs are phrased as a question about the reader's goal.

## 9. Lab vs enterprise messaging
| Dimension | Frontier AI labs | Enterprises |
|---|---|---|
| Hero | Category noun plus the domains covered | Category noun plus the delivery model (people and platform) |
| What is sold | Artifacts: datasets, RL environments, verifiers, traces, benchmarks, expert hours | Outcomes: embedded engineers who build agents, plus a platform that runs them |
| Proof | Model scores, task counts, confidence intervals, verifier quality, named lab logos | Fortune 500 logos, business percentages, unsourced survey stats |
| Risk addressed | Weak signal: saturated benchmarks, contamination, noisy grading, losing quality when switching vendors | Execution risk: stuck in pilots, data leaving the building, vendor lock-in, consultants who hand over slides and leave |
| Vocabulary | verifiers, trajectories, hillclimb, pass@k, frontier-calibrated, RLVR | KPIs, ROI, production, governance, compliance, ownership |
| Relationship | Research supplier. After a sample, the "research team" talks volume and pricing. | Embedded partner "in your codebase and your sprints", who keeps operating after launch |
| CTA | "Request dataset samples": the buyer evaluates it | "Work with us" / "Talk to a Turing Strategist": a scoping call |
| Tone | Sober, near-academic, impersonal | Consultative and reassuring. Older pages are more salesy, with stats and triads. |
| Bridge between the two | Lab work is the credential sold to enterprises: the both-sides loop, FDEs "from frontier AI labs", the Anthropic launch-partner page, and the line that labs trust Turing to refine models and enterprises trust it to apply them | Enterprise deployment is pitched back to labs as a source of real-world data (enterprise knowledge-work datasets built from a real company's operational data) |

Takeaway: the same company runs two vocabularies under one mission line. The lab language never mentions ROI. The enterprise language uses post-training only as a reason the agents are reliable ("post-training precision", "context and harness engineering").

## 10. What Ramanujan should borrow
Each idea is honest for a studio with no clients yet.

1. **Plain category nouns, with one brand line above them.** Turing gets corporate weight from restraint. H1s are nouns ("RL environments", "Research"), subheads are one exact sentence, and the single big claim lives in a repeated tagline. Ramanujan can do the same: let "The Godfathers of Applied AI" be the one bold line (hero eyebrow or footer tagline, every page), and keep everything around it in plain nouns and verbs. For example: Fine-tuning, Training data, RL environments, Agent systems, Research. The godfather line then reads as confidence, not hype.
2. **"What's in the box" specs on every service page.** List what a client actually receives, the way Turing lists environments plus tasks plus verifiers plus traces plus Docker plus docs. For example: dataset with schema and data card, rubric, verifier code, eval report with held-out results, trained weights or adapter, deployment notes, handover session. These describe future deliverables, not past results, so they need no proof.
3. **Put the method in FAQs and name the steps.** Write the questions a lab or enterprise buyer would ask, and answer them in plain, specific language:
   - Who does the work (truthfully, the founders)
   - How tasks and rubrics are written and reviewed
   - How verifiers are tested for false positives and negatives
   - How difficulty is calibrated (pass@k against named open models)
   - What is out of scope

   A short named sequence, in the spirit of Turing's Five-Step Framework but in Ramanujan's own words (for example Scope, Baseline, Build data, Train, Verify), makes a new studio look procedural rather than improvised.
4. **Concrete service promises Ramanujan can actually keep.** Turing's 48-hour samples, one-day NDA countersign and research-only sample licence build trust with no logos at all. Ramanujan equivalents:
   - A reply within one business day
   - Mutual NDA on request
   - A paid or free pilot scoped in writing within a set number of days
   - The client owns data, code, weights and IP
   - The client's data stays in their environment or is deleted on a stated schedule
   - Model-agnostic (open or closed models)

   Publish only what can be met every time.
5. **Small, rigorous original research before clients arrive.** Turing's research page is just two dated datasets with leaderboards, error bars and a fact sheet. Ramanujan can publish one small eval or benchmark, or a failure analysis on open models, with task counts, named model versions, pass@k and confidence intervals, plus a short "why this matters" FAQ. Add a "Research" nav item now. This is the single most lab-ready credibility asset, and it is honest because the reader can check the method.
6. **Offer a sample or diagnostic first, not "book a call", and keep two doors.** Copy Turing's split: a business door (outcome language: ownership, KPIs, production, scoping call) and a lab door (artifact language: verifiers, trajectories, calibration, sample request). Both sit under one mission line. For the first step, offer something the visitor can evaluate themselves, as Turing does with samples and the AI Maturity Assessment. Ramanujan's existing free tools (the Dataset Doctor and X-ray pages in the repo), or a free baseline eval of the prospect's data or model, can fill that role honestly. Prepare a case-study template now (metric trio, tag row, Challenge / Approach / Results / Outcome / FAQ) and fill it first with clearly labelled internal or open-source builds.

## 11. What Ramanujan should avoid
- **Scale numbers it cannot back up.** Anything like 5M+ experts, 1M+ tasks or "9/9 frontier labs" depends on Turing's installed base. For Ramanujan, any network-size or task-count claim, or an animated counter showing 0 or 3, reads as fake. Count only what exists (for example the number of tasks in its own published benchmark).
- **Logo bands and "we partner with all the top labs" language.** Do not use logos of labs, model providers or former employers of team members. That includes "Work With" strips built from tools Ramanujan merely uses. Founders' past employers belong in bios, phrased as personal background, never as client proof.
- **Anonymized case studies.** Turing gets away with "the client" because it has about 97 entries plus several named ones. A new studio publishing "a leading AI lab" or "a Fortune 500 lender" with no name will look invented. Label internal or demo work as such.
- **Unsourced survey stats.** Turing's "Enterprise Insight" figures (over 80% of AI projects fail, 43%, 84%, 89%) appear without sources. Borrowing that style is risky. Cite a real source or leave the stat out.
- **Proprietary-sounding platform names with no product behind them.** "ALAN", "control plane", "proprietary intelligence framework" and "Five-Step Framework" work for Turing because there is an organization behind them. Ramanujan should name a method only if it is documented on the page, and should not invent a "platform".
- **Superlatives next to "Godfather".** Turing's own fine-tuning page says "The most experienced foundation LLM fine-tuning company", and the About page claims to be "largest and longest-running". Pairing the godfather line with any "most", "largest", "leading" or "top 1%" claim tips it into overreach. Keep the brand word as the only bold claim.
- **Lineage claims that aren't literally true.** "Our engineers come from frontier labs", "launch partner", "vendor replacement / migrate from your legacy vendor" (which presumes incumbency), "Turing x Anthropic"-style partnership pages. Using an API is not a partnership.
- **Mission scale talk like "superintelligence".** It works for a company with labs as clients. For a new studio it sounds grandiose next to the godfather line.
- **Quote cards from famous AI figures** on your own pages. Even when the quotes are general, as on Turing's expert home, they imply an endorsement.
- **Thin pages and visible sloppiness.** Turing's current pages are a hero, three cards and an FAQ, and they lean on brand recognition. It also has typos ("ENVIROMENTS"), a misspelled CTO name and duplicated blocks. A new studio gets no benefit of the doubt, so it needs depth on each page and careful proofreading.
- **Certification badges or "SOC 2 in progress" logos.** Turing itself shows none, so their absence is not disqualifying. A plain, accurate data-handling page (where data lives, who can access it, deletion, NDA, subprocessors) would already beat Turing, which has no security page at all.
