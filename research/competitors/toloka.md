# Toloka · content audit

- Site: https://toloka.ai
- Reviewed: 2026-11-03, pages:
  - https://toloka.ai/ (home, fetched twice for structure and link targets)
  - https://toloka.ai/virtual-environments-rl-gyms (RL environments and agent data)
  - https://toloka.ai/agent-data (served the same RL-gyms content)
  - https://toloka.ai/large-language-models (post-training data, AI-lab facing)
  - https://toloka.ai/evaluation (AI evaluation)
  - https://toloka.ai/enterprise-agent-fine-tuning (enterprise offering)
  - https://toloka.ai/about
  - https://toloka.ai/experts (expert network)
  - https://toloka.ai/security (security and privacy portal)
  - https://toloka.ai/responsible-ai
  - https://toloka.ai/research
  - https://toloka.ai/arena (leaderboard)
  - https://toloka.ai/success-stories
  - https://toloka.ai/blog/how-toloka-helped-poolside-define-and-measure-ai-quality-for-developers/ (case study)
  - https://toloka.ai/blog/quality-loop/ (quality methodology)
- Fetch notes:
  - All pages came back as readable text. None was a bare JS shell.
  - The "Trusted by Leading AI Teams" logo strip appears on most pages, but no company names come through in text extraction. The logos are probably images, so I could not confirm which companies are shown.
  - The Arena leaderboard's chart and table loaded empty in the fetch ("0 of 0 models"). The ranking data is probably loaded by JavaScript after the page renders. The methodology text did render.
  - The ISO certificate PDFs and the security-principles and privacy-principles subpages are linked from /security, but I did not fetch them.
  - The homepage extraction repeated the testimonial block and the product cards several times. This is probably carousel markup duplicated in the extraction, not a real layout choice.
  - The poolside case study's page metadata date (Nov 2026) does not match its byline (Oct 2025).

## 1. Positioning
- Hero headline (quote, under 15 words): "Training data for AI agents and LLMs"
- Subheadline (paraphrase): Toloka says it supplies data for agentic skills, coding and AI safety. It says it produces that data by pairing human experts with its own technology.
- Category they claim (their words, short): "Training data" and "expert data", plus "Your Trusted Data Partner for AI Development" on the About page. It also calls itself a European provider of expertly curated data.
- Primary audience(s): both, with separate entry points.
  - **AI labs:** post-training data, evaluation, RL gyms and red-teaming pages. A homepage testimonial is attributed to "Frontier AI Lab". The research hub and Arena leaderboard also serve this group.
  - **Enterprises:** a dedicated "Enterprise agent fine-tuning" page, a "Toloka for AI engineers" page, and a self-service platform reached through the "Log in" / "Get a demo" nav.
  - **Supply side:** experts (through its Mindrift platform) and data partners.
- One-sentence entity definition they repeat (paraphrase): Toloka says it is a European provider of expert-curated data that improves the skills and safety of frontier and specialised AI models and agents. It adds that it has more than a decade of data work behind it.

## 2. Homepage architecture
1. Announcement bar promoting the Toloka Arena leaderboard. Job: show freshness and research authority before anything else.
2. Hero with headline, one-line subhead and "Talk to an expert". Job: name the category and open one conversation path.
3. Logo strip, "Trusted by Leading AI Teams". Job: immediate social proof.
4. Testimonials, "What our clients say": three quotes attributed only by client type (Frontier AI Lab, Public Tech Company, Big Tech Company). Job: proof that respects confidentiality.
5. "Data for AI agents development": three offers (environment generation, training datasets, evaluation and red-teaming). Job: map the service to the agent lifecycle.
6. Agent-type cards (Conversational, Corporate Assistants, Deep Research, Computer Use, Coding Copilots, OS Agents). Job: let buyers find their own use case.
7. "Expert data for agents and models": four product cards (agent training and evaluation, creative data, LLM/VLM datasets, coding data). Job: route visitors to product pages.
8. Expert network stats (90+ domains, 70%+ with advanced degrees, 6000+ active contributors). Job: show supply quality and scale.
9. "Why choose Toloka", in three columns: "Technologies", "Diverse and scalable supply", "Robust infrastructure". These carry the counts of QC and anti-fraud methods, the compliance badges and the hosting details. Job: answer the "can I trust you with my data and my model" question.
10. "Learn more about Toloka": three blog teasers. Job: show expertise through content.
11. Closing CTA, "Get started with expert training data", with the logo label repeated. Job: convert.
12. Footer: dense site map. Job: findability and enterprise-grade completeness (legal, security, responsible AI).

## 3. Navigation and site map
- Top nav (as extracted): product menus, "Log in", "Get a demo".
- Footer groups:
  - Legal: Privacy Notice, Terms, Self-Service Agreement, Data Processing Addendum, Platform Terms, Eligibility, Code of Conduct.
  - Datasets: All datasets, Egocentric video, Arena data.
  - Solutions: Post-training data, RL environments & agent data, AI evaluation, Arena leaderboard, Enterprise agent fine-tuning, Physical AI, Red Teaming & safety, Robotics training data, Egocentric video data.
  - Products: Platform overview, Toloka for AI engineers, Tendem AI, MCP for AI builders, Ad creative evaluation.
  - Resources: Case studies, Research, Our expert network, Blog, Events, Partner with us, Become a data partner, Become an expert.
  - Company: About Us, Newsroom, Security & privacy, Responsible AI, Contact, Careers, Brand Guidelines.
- Notable pages:
  - **Security & privacy portal:** compliance list, resilience section, a security contact, and principles subpages.
  - **Responsible AI.**
  - **Research:** publications at major ML and IR venues, own benchmarks, events.
  - **Arena:** a leaderboard with a published method.
  - **Success Stories:** blog posts with named clients.
  - **Expert network page.**
  - **Datasets catalogue:** off-the-shelf data you can buy.
  - **Quality Loop:** a methodology post.
  - **Events:** "Toloka Talks" city events.
- Missing: no dedicated Methodology page in the main nav (quality is explained in a blog post and in sections of each page) and no public trust-center portal of the Vanta or Drata type.

## 4. Voice and tone
- Five adjectives: professional, engineering-led, reassuring, precise, benefit-driven.
- Sentence style:
  - Short headlines and feature fragments.
  - Medium-length explanatory sentences.
  - Longer FAQ answers.
  - The enterprise page uses punchy two-beat lines with a mildly contrarian stance (for example "Your model works. The bill is the problem.").
- Person: "we / our" for Toloka and "you / your model" for the reader. The RL page says outright that it is "Built by engineers, for engineers".
- Jargon level and the technical terms they lean on: high and specific. They lean on:
  - Training and data: SFT, RLAIF, RL gyms, trajectories, state-action sequences, verifiable rewards, auto-verifiable tasks, rubrics, preference labels, chain-of-thought data.
  - Environments: MCP tool replicas, computer-use mockups, invariants, deterministic replay, seeds.
  - Evaluation: held-out evaluation, pass^5, red-teaming, CBRN risk, golden sets, dynamic overlaps, inter-annotator agreement.
  - Public benchmarks, named to show fluency: WebArena, Mind2Web, tau-bench, SWE-Bench.
- How they use numbers:
  - Network scale: 90+ domains, 70%+ with advanced degrees, 6000+ active contributors, 100+ countries, 40+ languages, 10+ years.
  - Process counts: 50+ automated QC methods, 60+ anti-fraud methods.
  - Anonymised mini-cases sized by datapoints: 2,500 per language, 3,500, 400, 500.
  - Quality targets: an 85% inter-annotator agreement threshold, and a sample Quality SLA (word range, completeness above 95%, off-topic below 5%, reviewer rating of at least 4/5).
  - ROI claims: 65% higher first-pass acceptance, 3x faster ramp-up, and roughly 1 day to a fine-tuned model.
  - Cost comparison: F1 0.94 for the tuned model vs 0.93 for the frontier API, at about $0.80 vs $10 to $30 per 1,000 documents.
  - Consistency slips: the enterprise page gives both 12 to 37x and "up to 30x".
- Two or three paraphrased examples of typical lines (not verbatim copy):
  - The training run itself is a commodity. What protects you is the data, the environment and an evaluation you can trust.
  - Every run is logged, versioned and replayable exactly, so a result can be reproduced and audited.
  - Before any build, send one workflow and they will define in numbers what matching your current API should cost.

## 5. Trust signals
| Signal | Present? | How it is presented |
|---|---|---|
| Customer / lab logos | Yes (images, names not visible in text) | A "Trusted by Leading AI Teams" strip on home and most product pages, often shown twice. Named clients and partners in content include Shopify, poolside and Lovi.Care. |
| Named case studies with metrics | Partial | "Success Stories" is a list of blog posts, several with named clients (Shopify twice, poolside, Lovi.Care) and some that are thought-leadership pieces. Product pages carry anonymised mini-cases ("Big tech", "Leading AI Company") sized by datapoint counts. The poolside study gives method and an agreement threshold but no outcome numbers. The enterprise page cites a roughly 1-day turnaround and about six production deployments. |
| Certifications (SOC 2, ISO 27001, HIPAA, GDPR) | Yes | SOC 2 Type II, ISO 27001, ISO 27701 and GDPR on the security page, with ISO certificates linked as PDFs. CCPA and HIPAA are added in homepage and enterprise-page badges. |
| Security / trust page | Yes | A "Security & privacy" portal with these sections: "Your data is our priority", "Industry compliance", "Resilience you can rely on" (backup, continuity, geo-redundancy). It has a security contact address, links to a bug bounty and responsible-AI posts, and separate security-principles and privacy-principles pages. Product pages add their own privacy sections. |
| Research, papers, benchmarks, leaderboards | Yes, strong | Publications listed at NeurIPS, ICML, SIGIR, EACL, KDD, WSDM, HCOMP and ECIR. Participation in BigCode/StarCoder. Own benchmarks (U-MATH, Beemo, JEEM). The Arena leaderboard describes its method (pass^5 over five trials, tau-bench-style tasks, fixed run configuration). NeurIPS presence and "Toloka Talks" events. |
| Leadership / team credentials | Partial | Founder and CEO Olga Megorskaya is named on About, with the 2014 founding and the company's journey from a crowdsourcing platform to expert data. Blog posts carry author bylines. Little detail on credentials. |
| Investors / funding | Indirect | No funding section. The About page's "Featured on" press block links a Reuters story about a Bezos-led investment (May 2025). |
| Partners (AWS, Google, NVIDIA...) | Yes | Microsoft Azure as the infrastructure base and Nebius for fine-tuning compute. A Shopify partnership appears in case content. Mindrift is presented as Toloka's own expert platform. |
| Expert network size / workforce claims | Yes | 90+ domains, 70%+ with advanced degrees, 6000+ active contributors, 100+ countries, 40+ languages. Evaluation experts are said to hold master's or PhD degrees. There are testimonials from experts as well as from clients. |
| Methodology / quality process explained | Yes, the strongest element | The Quality Loop in five stages: Calibrate, Scope, Onboard, Fine-tune control, Evaluate and improve, governed by a "Quality SLA" with control points. Hybrid QA: an AI QA agent checks rubric adherence and consistency, and senior human reviewers audit flagged cases plus a statistically sound sample of the rest. Also golden sets, overlaps, cross-validation and post-verification, plus calibration with seed tasks before scaling. |
| Press / awards | Partial | A newsroom, and a "Featured on" block on About. No awards seen. |

## 6. How they earn trust without (or before) proof
Many Toloka product pages, including the RL-gyms page, have no named client and no testimonial. Trust is carried by:
- **Process detail.** A six-stage managed pipeline: scope, environment design, calibration with seed tasks, data collection, hybrid QA, delivery.
- **Instrumentation and reproducibility promises.** Full logging, versioned environments, controlled seeds for exact replay, and structured outputs with per-step labels and failure categories. These are engineering commitments a buyer can check.
- **Measurable quality defined up front.** Vague requests become numeric acceptance targets in a written SLA, and an agreement threshold triggers recalibration.
- **FAQs that answer buyer-risk questions directly.** How realistic the environments are, whether you can bring your own tools, reproducibility, QA, pilot timeline (under a month), privacy, and pricing model.
- **Fluency signals.** Naming public benchmarks and aligning their environments with them.
- **Opinionated framing on the enterprise page.** A clear thesis, staged training ("Only the training you can justify"), and an eval held out from training ("The eval you can defend"). Ownership ("Full service, weights you own") and a data boundary with no raw-data egress lower perceived risk.
- **Low-commitment entry.** A scoping offer that sets the success definition in numbers before any work starts.
- **Responsible AI and worker-welfare commitments,** plus open research and datasets.

## 7. Vocabulary
training data; expert data; post-training; RL gyms / RL environments; agentic; AI agents; trajectories; demonstrations; preference labels; verifiable rewards / auto-verifiable tasks; rubrics; held-out evaluation; red-teaming; AI safety; hybrid QA; calibration; seed tasks; invariants; deterministic replay; reproducibility; golden sets; inter-annotator agreement; Quality SLA; first-pass acceptance; domain experts; data boundary; weights you own; pass^5; human-in-the-loop; "trusted data".

## 8. Calls to action
- "Talk to an expert": the primary CTA, in the hero and closing block of nearly every page.
- "Talk to an evaluation expert": a topic-specific variant on the evaluation page.
- "Get a demo" and "Log in": top nav, serving the self-service platform.
- "Learn more" (cards, Arena banner), "Explore", "See all" (blog), "Read now" (deep-dive post).
- "View case details": the anonymised mini-case cards on product pages.
- "Get the data" / "Purchase now": Arena datasets. "Reach out": security contact. "Talk to us": security and research.
- Supply side: "Partner with us", "Become a data partner", "Become an expert".
- Closing headlines that act as CTAs: "Get started with expert training data", "Evaluate your AI models with trusted data", "Fuel your AI agents with expert-crafted data". The enterprise page closes with "Send us one workflow. We'll tell you what it should cost."
- Quality slip: the post-training page shows a "Talk to an experts" button typo twice.

## 9. Lab vs enterprise messaging
- **To labs (post-training data, evaluation, RL gyms, research, Arena):**
  - Capability language: reasoning skills, text understanding, frontier models.
  - Data specs: demonstrations, preference labels, verifiable RL tasks, chain-of-thought data, red-teaming including CBRN.
  - Evidence: datapoint volumes, domain and language coverage, expert degrees, benchmark names, publication history.
  - Proof is anonymised by client type to respect lab confidentiality.
- **To enterprises (enterprise agent fine-tuning, AI engineers, platform):**
  - Economics and control: "Frontier quality, at a fraction of the cost."
  - The problem is the token bill on narrow, repetitive workloads. The answer is a small open model, tuned on the customer's own tasks, matching the API they use today.
  - Risk is handled by a drop-in endpoint compatible with the existing API, gradual traffic rollout starting at 1%, a data boundary with no egress, on-prem options, owned weights, compliance badges, and one cost-versus-quality number.
  - It is the most persuasive page on the site and has a clear point of view.
- **Shared across both:** expert humans plus technology, hybrid QA, and "Talk to an expert".

## 10. What Ramanujan should borrow
1. **Use the enterprise fine-tuning page as a blueprint for Ramanujan's business offer.** The sequence is:
   - the problem, in the buyer's terms (cost, reliability);
   - a one-line thesis;
   - four pillars: expert data, realistic environments, staged training, an eval you can defend;
   - deployment and data boundary;
   - ownership;
   - a closing scoping offer.

   All of this describes an approach, not past results, so it is honest from day one. Ramanujan's existing cost calculator fits this page naturally.
2. **Staged, justified training.** Say plainly that Ramanujan starts with supervised fine-tuning and adds RL only when the eval shows it pays. This sober restraint reads as more senior than any superlative. It suits the "Godfather" role as the experienced counsel who stops you overspending.
3. **Define quality in numbers before work starts.** Publish how Ramanujan sets acceptance criteria: a held-out test set that never touches training, agreement thresholds for human labels, and a written success definition per engagement. Present these as commitments, not as track record.
4. **A reproducibility and deliverables section.** List versioned datasets, fixed seeds, run logs, eval reports and owned weights as standard outputs. Any engagement can honour these, and lab buyers look for them.
5. **A plain security and data-handling page without badges.** List concrete practices: NDA first, work in the client's cloud where possible, no reuse of client data, PII scrubbing, audit logs, deletion on completion, and a security contact address. State certification status honestly (for example, not yet audited and what is planned) rather than show badges.
6. **FAQs that answer risk questions directly.** Cover pilot length, pricing model, bring-your-own data, who owns outputs, and how quality is checked. This is the cheapest credibility there is.

## 11. What Ramanujan should avoid
- A "Trusted by" logo strip or testimonials attributed to "Frontier AI Lab" or "Big Tech Company". With zero clients, even anonymised attribution would be false.
- Network and tenure numbers (thousands of contributors, share with advanced degrees, 100+ countries, "10+ years") and counts of QC or anti-fraud methods. These depend on scale Ramanujan does not have.
- Compliance badges (SOC 2, ISO 27001/27701, HIPAA) or "enterprise-grade infrastructure" claims before an audit exists.
- ROI and outcome stats (65% first-pass gain, up to 30x cheaper, "Proven in production", about 1 day to deploy) unless they come from Ramanujan's own published, reproducible experiment and are labelled as such.
- An "independent" leaderboard or benchmark positioned as neutral while it sells services. Toloka's Arena is a commercial asset with a published method. A new studio claiming independence would invite scrutiny.
- Named internal "agents" and platform branding for back-office steps. Toloka has a quality agent, a delivery agent and a production copilot. Ramanujan should not mirror this unless the systems are real and demonstrable.
- A "Success Stories" section filled with blog posts, and "Get a demo" / "Log in" when there is no product to log into.
- Inconsistent figures and button typos. Toloka's mismatched multipliers and its "Talk to an experts" button undercut an otherwise precise brand. Ramanujan should keep every number consistent across pages.
