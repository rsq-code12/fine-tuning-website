# Surge AI · content audit

- Site: https://www.surgehq.ai
- Reviewed: 2026-11-03, pages:
  - https://www.surgehq.ai (home)
  - https://www.surgehq.ai/sitemap.xml (to map the site)
  - https://www.surgehq.ai/products (RL environments, rubrics and verifiers, RLHF, SFT, human eval)
  - https://www.surgehq.ai/post-training (Post-training Runs)
  - https://www.surgehq.ai/ots (Off-the-Shelf frontier data)
  - https://www.surgehq.ai/workforce (Expert Workforce)
  - https://www.surgehq.ai/enterprise
  - https://www.surgehq.ai/research
  - https://www.surgehq.ai/benchmarks
  - https://www.surgehq.ai/learn/fundamentals (enterprise guide on evaluation)
  - https://www.surgehq.ai/contact
  - https://www.surgehq.ai/careers
  - https://www.surgehq.ai/about (resolves, but serves the home-page manifesto; there is no About content)
  - Blog: https://www.surgehq.ai/blog/anthropic-surge-ai-rlhf-platform-train-llm-assistant-human-feedback (Anthropic customer story), https://www.surgehq.ai/blog/lmarena-is-a-plague-on-ai (opinion), https://www.surgehq.ai/blog/hellaswag-or-hellabad-36-of-this-popular-llm-benchmark-contains-errors (data-quality audit)
- Fetch notes:
  - No dedicated About or Security page exists. The sitemap has no /about, /security or /trust, and https://www.surgehq.ai/security returns 404.
  - The 2022 blog post announcing SOC 2 (surgehq.ai/blog/surge-ai-achieves-soc-2-compliance) now returns 404. Only a search-engine snippet confirms it (SOC 2 Type I, February 2022). That is unverified on the live site.
  - /benchmarks is very long (about 123k characters). Only the first 100k were read.
  - /workforce rendered with job-listing content mixed into the page. The About paragraph and stats block were read in a second pass.
  - The live /research page shows leftover placeholder text from the site builder under each entry.
  - Founder names, founding year and team size do not appear on any page read. Company facts come only from the workforce page's short About blurb.

## 1. Positioning
- Hero headline (quote, under 15 words): "Smart ≠ Useful"
- Subheadline (paraphrase): Surge wants to raise AGI on the full richness of human intelligence, not just raw capability. Its tagline is "Raise AGI with the richness of human intelligence."
- Category they claim (their words, short): "Human Intelligence for AGI". Product pages use "Frontier Data" and "Post-training Runs".
- Primary audience(s): both, but labs come first. The home page is an unbranded manifesto aimed at researchers and mission-minded talent. Product, post-training, off-the-shelf and research pages speak to frontier and open-model labs, citing pass@1 gains on named models. A separate Enterprise page ("Frontier Data for Enterprise") translates the offer into enterprise workflows. A large share of the site also recruits experts.
- One-sentence entity definition they repeat (paraphrase): Surge supplies expert-built human data (RL environments, rubrics, preference data, evaluations) that teaches frontier models judgment and usefulness, not just raw intelligence. The two taglines appear in the footer of every page.

## 2. Homepage architecture
1. Announcement banner: links to the newest benchmark (DAYJOB: Tax). Job: freshness and research credibility.
2. Header and nav. Job: wayfinding. The nav carries Benchmarks, Research and Experts, so research is front and centre.
3. Opening manifesto (no heading): a literary passage comparing how great people were shaped by their lives with how models are shaped by their data, ending with an invitation to join. Job: brand worldview.
4. Hero statement ("Smart ≠ Useful") and tagline. Job: positioning in one line.
5. Footer: Platform, Company, Work with us, a long Benchmarks list (14 named benchmarks), and legal. Job: navigation and research proof by volume.

There are no logos, stats, feature grid, testimonials or "Book a demo" button on the home page. Proof is pushed to inner pages.

## 3. Navigation and site map
- Top nav: Blog, Benchmarks, Off-the-Shelf, Training, Experts, Products, Enterprise, Research, Careers, Contact, Login.
- Footer groups: Platform (Products, Off-the-Shelf, Post-Training Runs, Expert Workforce, Enterprise, Enterprise Guides, Login); Company (Research, Blog, Contact); Work with us (Careers, SWE, Consultant Network); Benchmarks (Tuesday Work Index, DAYJOB: Tax/Healthcare/Finance, sudo L7, GDP.xlsx, GDP.pdf, Chartography, HANDBOOK.md, ComplexConstraints, Riemann-bench, EnterpriseBench: CoreCraft, Antidote, Hemingway-bench); legal and social.
- Notable pages: /benchmarks (live leaderboards with a compare-models tool); /research (arXiv-linked papers, many co-authored with labs); /learn/* (six enterprise guides: fundamentals, choosing, deploying, evaluations, improving, models); /post-training (training-run case studies); /ots (dataset catalog); /fellowship and /consultant-network (talent); benchmark and enterprise-pilot terms of sale (legal pages for commercial offers).
- Missing: About, Security, Trust Center, Press, leadership page.

## 4. Voice and tone
- Five adjectives: literary, contrarian, evidence-led, exacting, idealistic.
- Sentence style: very short headlines (often two to five words), equations and wordplay ("Smart ≠ Useful"), and declarative case-study headlines that pair an action with a result ("We trained a model on X."). Body copy is either lyrical (manifesto, products) or plain and instructional (enterprise guides). Lowercase rhetorical questions are used as section prompts.
- Person: "we" throughout, with first-person-plural research voice ("We trained...", "Our research studies why."). "You/your" on Enterprise and the learn guides.
- Jargon level and the technical terms they lean on: high on lab pages. Recurring terms are RL environments, verifiers, rubrics, preference data, SFT, RLHF, held-out, pass@1, transfer, long-horizon, agentic, trajectory analysis and Elo with confidence intervals. Enterprise pages lower the jargon to workflows, failure modes, quality bar and feedback loops.
- How they use numbers: before/after benchmark scores on named open models (Surge claims, e.g., Terminal-Bench 2.0 rising from 67.4% to 82.0% for Kimi K2.7). Task counts per dataset (1,700 or 2,400 coding tasks). Workforce counts (200,000+ PhDs, 80+ languages, 500+ disciplines). Audit numbers in blog posts (36% of sampled HellaSwag rows flagged; 52% disagreement with crowd votes). Benchmark scores reported honestly low (top model at about 10.8% on DAYJOB: Tax).
- Two or three paraphrased examples of typical lines:
  - Pre-trained models mirror the internet; Surge's job is to shape them toward the best of human judgment.
  - Popular leaderboards reward answers that look impressive, not answers that are right.
  - Train on our data first and pay only if your metrics move.

## 5. Trust signals
| Signal | Present? | How it is presented |
|---|---|---|
| Customer / lab logos | Minimal | No logo wall. Labs are named in text (the workforce page names OpenAI, Anthropic, Meta and Google as partners). Open-model logos (Kimi, GLM, Qwen) appear on the off-the-shelf page because Surge trained those models itself. |
| Named case studies with metrics | Yes, of a specific kind | /post-training is a grid of Surge's own training runs on open-weight models, each with a headline result and benchmark gains in percentage points, linking to a study or paper. The older Anthropic customer story (Problem / Solution / Results, a quote from a named cofounder) has no metrics. |
| Certifications (SOC 2, ISO 27001, HIPAA, GDPR) | Not on live site | No certification appears on any page read. The 2022 SOC 2 Type I announcement post is now a 404. |
| Security / trust page | No | There is no security page (404). Privacy Policy and Terms appear in the footer only. The Enterprise page makes no security claims. |
| Research, papers, benchmarks, leaderboards | Yes, central | 14 named benchmarks with live leaderboards, a composite "Tuesday Work Index", and a research feed of arXiv papers, many with lab partners (Anthropic, OpenAI, Google, Meta, NYU, Stanford). Benchmark pages describe grading (expert rubric thresholds, human judgment scores across twelve dimensions, Elo with confidence intervals). |
| Leadership / team credentials | No | No founder or leadership bios anywhere. The research page describes the team's mix (computer scientists, statisticians, linguists, philosophers, domain experts) instead of individuals. |
| Investors / funding | Inverse signal | Surge says it has been profitable from early on and has never raised venture capital. |
| Partners (AWS, Google, NVIDIA...) | Minor | A partner landing page (/fireworks) and a blog post on a joint index exist. No cloud-partner badges. |
| Expert network size / workforce claims | Yes, heavily | 200,000+ PhDs, 80+ languages, 500+ disciplines, 30,000+ publications. Expert archetypes (IMO medalists, NASA engineers, Supreme Court litigators, NIH advisors). A named expert spotlight interview. Listed pay rates for expert roles. |
| Methodology / quality process explained | Partial, by example | Quality is shown through artefacts rather than a process page: rubrics, hidden verifiers, held-out splits, verified answers, expert graders who check every citation and run every line of code. Also published audits of others' data (HellaSwag sample audit) and critiques of crowd evaluation. No QA workflow (review stages, agreement metrics) is described. |
| Press / awards | No | No press page or awards on the pages read. |

## 6. How they earn trust without (or before) proof
Surge's live site works almost entirely without logos, so this is its core technique:
- Publishing its own experiments. Surge trains open-weight models on its own datasets and reports before/after scores on public benchmarks with held-out splits. Anyone can verify this without a client relationship.
- Building benchmarks that make models look bad. Low top scores (around 10% on a tax benchmark) signal honesty and difficulty rather than marketing.
- Auditing other people's data in public. The HellaSwag post sampled 300 validation rows, had reviewers flag two specific error types, and reported the share. The method is simple and repeatable, and it shows taste in quality.
- Taking positions. Opinion posts argue against crowd-vote leaderboards with their own vote audit plus cited third-party data. This signals a point of view about quality.
- Education. The /learn guides answer plain questions in FAQ form (what an eval set, a rubric and a grader are, how many examples are needed, how to know an evaluation is reliable) and end with a soft pitch.
- Risk reversal. "Train first. Pay if it works." lowers the cost of trying an unknown vendor.
- Expert identity. Credentials and archetypes of the people doing the work stand in for client logos.

## 7. Vocabulary
human intelligence; raise AGI; richness; Smart ≠ Useful; frontier data; post-training runs; RL environments; verifiers / hidden verifiers; rubrics / rubric points; preference data; RLHF; SFT; human evaluation (the "gold standard"); expert-built / expert-authored; held-out; transfer / generalized; long-horizon; agentic / enterprise agents; benchmarks; pass@1; judgment; failure modes; quality bar; workflows; institutional knowledge; pilot.

## 8. Calls to action
- "Login" (header and footer, every page). This is the only persistent header CTA. There is no "Book a demo".
- "Talk to our team" (Enterprise, three times; also /learn guides), "Start a pilot", "Meet our experts" and "Explore our research" (Enterprise).
- "Explore Training Data", "Read Surge Research" and "Talk to Us" (Post-training Runs).
- "Request the Full Catalog", "Request Dataset" and "talk to our research team" (Off-the-Shelf).
- "READ PAPER" (Research), plus "Leaderboard", "Compare Models" and "Add Model" (Benchmarks).
- "Apply now" and "Read the Interview" (Workforce).
- Contact page: the headline is "Contact" and the opening line is "Tell us what you're building." The form asks for name, company, title and work email, an interest dropdown (custom training data, off-the-shelf datasets, license your data, RL environments, benchmarks and evals, enterprise, something else) and project details. The button is "Send Request".
- Soft CTA in the manifesto: "Join us, and let's get this right."

## 9. Lab vs enterprise messaging
- Labs: framed in terms of training science. Surge offers RL environments, verifiers, rubrics, preference data and expert demonstrations, and reports results as pass@1 gains, transfer across domains and behaviour changes. Proof is its own training runs on open models, published papers and benchmarks. The commercial offer is datasets plus a pay-if-it-works trial. The tone is peer researcher.
- Enterprises: framed in terms of the customer's business. The pitch is that frontier models are commodities but your workflows, standards and institutional knowledge are not. The offer is a ladder: Evaluate (pick the model, validate before launch, monitor), then Improve (diagnose limits, prioritise fixes, measure gains), then Train (SFT, RL, preference optimisation with your experts). Surge promises pilot results in about a week and frames the first question as whether the fix is prompting, data or post-training. Proof is lab experience and published research. There are no enterprise logos.
- The manifesto voice ("raise AGI") stays in the footer on both, but enterprise body copy is plain and practical.

## 10. What Ramanujan should borrow
1. Its own experiments as case studies. Fine-tune small open-weight models on Ramanujan-built datasets and publish before/after results on public benchmarks with held-out splits, including runs that did not help. Label them "Studio experiments". This is honest proof that needs no client.
2. Quality shown through artefacts. Publish sample rubrics, a verifier spec, a dataset card, and a short note on how reviewers are checked. Showing the work beats calling it "high quality".
3. Small, repeatable data audits. Copy the HellaSwag method (sample N rows of a public dataset, define the error types, report the share with examples). It is cheap, credible and on-brand for a data studio, and it fits the site's existing dataset-checking tools.
4. The enterprise ladder and the diagnostic question. Evaluate, then improve, then train, with an explicit "is it prompting, data or post-training?" step. It is buyer-centric, honest (sometimes the answer is "you don't need fine-tuning") and fits a studio.
5. FAQ-style education pages. Question-headed guides (what an eval set, a rubric and a grader are, how many examples you need) earn trust and suit the site's SEO/GEO goals.
6. A contact form with intent routing, and a bounded risk-reversal offer. Use a dropdown by need (fine-tuning, datasets, RL environments, evals, agents). Offer something like a fixed-fee diagnostic or a free baseline eval with defined deliverables, and only make a pay-on-results promise if it can be written into terms.

## 11. What Ramanujan should avoid
- Workforce-scale claims (expert counts, PhDs, languages, publications) and prestige archetypes it cannot name. Describe only the people actually involved.
- Naming frontier labs as partners, or implying lab work the way Surge's catalog does when it says the data comes from the experts behind its frontier-lab programs.
- A mystical manifesto as the home page. Surge can afford the literary mood because of its reputation. Ramanujan already spends its one bold move on "Godfather", so the surrounding copy must be plain, specific and verifiable. Pairing "Godfather" with grand AGI language would read as overreach.
- Combative headlines about other platforms. A critique from an unknown studio reads as attention-seeking. Keep critiques evidence-led and civil.
- Leaving out a security page. Surge can skip it; a new studio selling to enterprises cannot. Publish real practices and honest compliance status.
- Benchmark sprawl and branded indices. Launching many named benchmarks or a composite "index" without the capacity to maintain them looks hollow. One well-maintained eval is better.
- Profitability or bootstrapped claims used as a trust signal before there is revenue.
- Placeholder or duplicated content on live pages (Surge's research page shows builder placeholder text). Credibility pages must be clean.
