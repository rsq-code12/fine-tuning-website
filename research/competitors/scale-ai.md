# Scale AI · content audit

- Site: https://scale.com
- Reviewed: 2026-11-03, pages:
  - https://scale.com (home)
  - https://scale.com/data-engine (Data Engine)
  - https://scale.com/rlhf (Generative AI Data Engine, the post-training data page)
  - https://scale.com/evaluation/model-developers (Evaluation for Model Developers)
  - https://scale.com/enterprise
  - https://scale.com/public-sector (US Public Sector)
  - https://scale.com/about
  - https://scale.com/customers/time (TIME customer story)
  - https://scale.com/blog/mayo-clinic-scale (Mayo Clinic partnership post)
  - https://scale.com/security
  - https://scale.com/demo (contact / demo form)
  - https://labs.scale.com (Scale Labs research home)
  - https://labs.scale.com/leaderboard (leaderboards)
- Fetch notes:
  - https://trust.scale.com (Trust Center) returned only a JS shell (page title, no content). The certification list below comes from https://scale.com/security instead.
  - https://scale.com/leaderboard redirects (308) to https://labs.scale.com/leaderboard. The research brand on the live site is now "Scale Labs". "SEAL" no longer appears on the lab pages but still appears on the older evaluation page and in job postings.
  - https://scale.com/customers/large-language-models timed out once, then returned content identical to the home page (looks like a redirect to home).
  - The demo form fields did not come through in the fetched text (only the "Submit" button). The form is probably rendered client-side.
  - There is no dedicated "post-training" product page. Post-training work sits under the Data Engine / GenAI Data Engine pages, the Evaluation page and Scale Labs. Job postings describe the work as SFT, RLHF and reward modeling for frontier labs.

## 1. Positioning
- Hero headline (quote, under 15 words): "The world's most important decisions need reliable AI systems."
- Subheadline (paraphrase): Reliable AI takes no shortcuts. Scale says it works across the whole AI stack, from training data to deployed systems, and keeps humans in the loop.
- Category they claim (their words, short): "reliable AI systems". Earlier framing, still on product pages: "Data Engine" / "Generative AI Data Engine". The public sector page now uses "Super Intelligence (SI) partner".
- Primary audience(s): both, plus government. Labs are addressed through the data story (Scale claims 90% of leading generative AI model builders run on its data, says 25% of contributors hold advanced degrees, and points to leaderboards). Enterprises are addressed through outcomes: getting past the pilot stage, named executives, ROI metrics. Government is addressed through mission language, clearance levels and authorizations. The home page splits the first two into an "Applications" block (enterprise/government) and a "Data" block (labs).
- One-sentence entity definition they repeat (paraphrase): Scale develops reliable AI systems for the world's most important decisions, supplying high-quality data to leading model builders and full-stack AI to enterprises and governments. The footer tagline repeats the "reliable AI for the world's most important decisions" line on every page.

## 2. Homepage architecture
1. Hero: mission-style headline about reliable AI for critical decisions, a short "no shortcuts" line, and the "Get Started" button. Job: positioning.
2. Applications block ("AI systems that actually work."): problem framing (Scale says most enterprise and government AI deployments fail), then Scale's promise to pick the use case, build the system and own the outcome. Includes a "For Enterprise" card and a logo strip. Job: enterprise/government value proposition plus social proof.
3. Data block ("The data powering the world's best AI."): contributor quality claim (25% advanced degrees) and the 90% model-builder claim, with "Explore Data Engine". Job: lab-facing value proposition.
4. Industry tag cloud (14 sectors, from Defense to Life Science). Job: self-segmentation by vertical.
5. Use-case tile gallery linking to sector pages. Job: navigation into solutions.
6. Customer proof carousel ("Proven across every industry."): client-plus-outcome cards (CDAO, Meta, Mayo Clinic, TIME, Physical Intelligence, Center for AI Safety, BP and others). Job: social proof at breadth.
7. Credibility pillars ("We set the benchmark for what's possible with AI"): three cards covering 10-year history, leaderboards as the industry standard, and the data engine. Job: authority.
8. News/blog strip ("From the Lab to the real world."): Scale Labs launch, Mayo Clinic, an evaluations podcast episode, AI policy. Job: freshness and thought leadership.
9. Closing CTA ("Our legacy, your success."): book a demo. Job: conversion.
10. Footer: Products, Solutions, Company, Resources, Guides (SEO guides on data labeling, LLMs and similar). Job: navigation and SEO.

## 3. Navigation and site map
- Top nav: Products, Solutions, Research, Resources, plus "Log in" and "Get Started".
- Footer groups:
  - Products: Data Engine, GenAI Portfolio, Donovan (defense product)
  - Solutions: Enterprise, Insurance, Healthcare, National Security, US Public Sector, Global Public Sector
  - Company: About, Careers, Security, Terms, Privacy, Modern Slavery Statement
  - Resources: Blog, Contact Us, Events, Partnerships, Data Partnerships, Documentation, Brand Guidelines
  - Guides: Data Labeling, ML Model Training, Diffusion Models, AI for eCommerce, Computer Vision, Large Language Models
- Notable pages: a separate research subdomain (labs.scale.com) with Leaderboards, Papers, Blog and Jobs; a Security page that links to a Trust Center (trust.scale.com); a responsible-disclosure email; public docs (scale.com/docs); a Modern Slavery Statement (relevant given the contributor workforce); press links on About.

## 4. Voice and tone
- Five adjectives: assured, mission-driven, institutional, outcome-focused, terse.
- Sentence style: short declarative headlines, often in pairs or triplets ("Behind the model. Behind the mission. Behind it all."). Body copy is one or two sentences per block. Fragments are used as rhythm devices in headlines. Full sentences elsewhere.
- Person: "we" for Scale, "you/your" for the buyer on enterprise pages ("your business", "your experts"). Third person ("Scale") in the hero sub-copy and on the About page.
- Jargon level and the technical terms they lean on: moderate on marketing pages, high on Labs. Recurring terms include RLHF, red teaming, evaluation, human-in-the-loop, agentic, model agnostic, frontier and production. "Post-training" is mostly absent from marketing pages but present in Labs and job copy.
- How they use numbers: scale and dominance claims (90% of leading model builders, 15B human decisions, $1B paid to contributors, $29B valuation, 1,000+ employees, founded 2016). Enterprise outcomes come with hard metrics (Scale cites 93% faster contract reviews, 6 weeks to production, $64M+ revenue growth). Labs uses counts (20+ benchmarks, 100+ models evaluated).
- Two or three paraphrased examples of typical lines:
  - Most AI projects stall before production; Scale turns models into systems that hold up in production.
  - If the outcome has to work, start with Scale.
  - Our research is built to expose where frontier models fail, not to flatter them.

## 5. Trust signals
| Signal | Present? | How it is presented |
|---|---|---|
| Customer / lab logos | Yes | Logo strips on nearly every page (Meta, NVIDIA, Cohere, Cisco, TIME, Mayo Clinic, BP, Paramount, Rocket, DIU; White House, US Army and US Air Force on public sector). "Trusted by the world's most ambitious AI teams." appears above logos and next to the demo form. |
| Named case studies with metrics | Yes | Enterprise page carries metric callouts (Scale claims 93% faster contract review, $64M+ revenue growth, 6 weeks to production). The TIME story uses a Problem / Solution / Implementation / Result structure, claiming under two months to production, 7,000+ red-team attack vectors tested and seven languages. It is light on engagement data. The Mayo Clinic post claims doctors gained about eleven minutes per patient. |
| Certifications (SOC 2, ISO 27001, HIPAA, GDPR) | Yes | Security page lists SOC 2 Type II, ISO/IEC 27001:2022, FedRAMP High and DoD IL4 Provisional Authorization. HIPAA is mentioned only in context (Mayo data stays in Mayo's HIPAA-compliant environment). GDPR is not mentioned. |
| Security / trust page | Yes | "Security at Scale" page: commitments, then certifications, public sector, Trust Center, responsible disclosure, security careers. Trust Center is a separate JS app. Few concrete practices are described on the page itself. |
| Research, papers, benchmarks, leaderboards | Yes, heavily | Scale Labs (labs.scale.com, formerly SEAL) shows 20+ benchmarks (Humanity's Last Exam, SWE-Bench Pro, MultiChallenge, Remote Labor Index, MCP Atlas and others), papers with named authors, an open-source RL environment framework, and an "Evaluate your Model" intake. The home page calls the leaderboards the measuring stick for frontier models. |
| Leadership / team credentials | Weak | About page has no bios. Leadership appears only through press links (a CEO appointment) and the CEO's name on a blog post. |
| Investors / funding | Indirect | No investor list. The About page states a $29B valuation. Cohere appears among logos. |
| Partners (AWS, Google, NVIDIA...) | Partial | NVIDIA appears as a logo. AWS Marketplace approval for national security appears as a resource on the public sector page. No cloud-partner section on the enterprise page. Footer links to Partnerships and Data Partnerships. |
| Expert network size / workforce claims | Yes | 25% of contributors hold advanced degrees, $1B paid to contributors, 15B human decisions, "1000s of red teamers" on the evaluation page, a hand-picked global expert network on the GenAI page. |
| Methodology / quality process explained | Partial | Strongest on Labs: private held-out sets to prevent overfitting, expert-designed tasks with precise scoring criteria, LLM-assisted scaling checked against human judgment, and a rule that a model is featured only the first time its organization sees the prompts. The evaluation page lists proprietary eval sets, rater QA, targeted evals and standardized reporting. Marketing pages stay general ("humans in the loop", "Ops Center" quality control). |
| Press / awards | Yes | "Scale In The News" on About (CNBC, Axios, CNN, Bloomberg). The TIME story cites industry recognition. |

## 6. How they earn trust without (or before) proof
Scale rarely has to, but its proof-light pages show the techniques:
- Problem framing before product. The evaluation page opens by saying the current state of evaluations is holding AI back (weak datasets, poor tooling, inconsistent comparisons), then answers each point.
- Methodology as proof. Labs explains how datasets are built, why some are private, how human experts and LLMs split the work, and the integrity rules for leaderboards. This reads as credible even to someone who ignores the logos.
- Named risk taxonomy. The evaluation page lists six concrete risk categories (misinformation, unqualified advice, bias, privacy, cyberattacks, dangerous substances), which shows command of the domain.
- Independence positioning. Scale presents itself as a neutral third-party evaluator and supports that with an outside researcher's remark about incentives to game leaderboards.
- Mission and principle statements. The security page frames protecting customer data as a duty to the wider AI field, not just a feature.
- Named individuals over anonymous praise. Testimonials carry full names and titles.

## 7. Vocabulary
reliable / reliability; reliable AI systems; the world's most important decisions; data engine; Generative AI Data Engine; frontier / frontier models / model builders; RLHF; red teaming; evaluation / evaluations / evals; private evals; leaderboards; benchmarks; human-in-the-loop / humans in the loop; experts / subject matter experts / contributors; vetted; high-quality data; production; pilot; outcomes; agentic; model agnostic; mission-ready; decision advantage; Super Intelligence (SI); post-training (Labs and careers only); alignment; safety.

## 8. Calls to action
- "Get Started" (header on every page, hero; links to /demo). Also appears in sentence case as "Get started" in later sections.
- "Log in" (header).
- "Book a Demo" (Data Engine, GenAI Data Engine, Evaluation, Public Sector, TIME story).
- "Schedule a consult" and "Speak with An Expert" (Enterprise page).
- "Talk to our experts" (Mayo Clinic post).
- "Explore Data Engine" and "For Enterprise" (home page blocks).
- "Read customer story" (Data Engine), "Meet our customers" (GenAI Data Engine).
- "Build AI" and "Build SI" (closing bands).
- "Evaluate your Model", "View Full Ranking", "Start Exploring", "Subscribe to newsletter" (Labs).
- "Visit Scale's Trust Center" (Security).
- "View Open Roles" (About).
- Demo page headline: "Let's Scale Together". Its sub-copy offers a 1:1 intro call, and the form button is "Submit".

## 9. Lab vs enterprise messaging
- Labs: the language is about inputs and measurement. Key terms are data engine, RLHF, red teaming, private held-out evals, leaderboards, contributor credentials, "frontier", and long relationships with leading labs. Proof is market share (the 90% claim), lab logos (Meta, Cohere) and research output. CTAs point to the data engine or to "Evaluate your Model". The tone is technical and peer-to-peer on Labs pages.
- Enterprises: the language is about outcomes and risk. The pitch says most AI never leaves pilot and that Scale turns models into reliable systems in production. Proof is C-level testimonials and business metrics (hours saved, revenue, weeks to production). The offer is consultative: Scale's experts embed with yours ("Your experts, amplified."). CTAs are "Schedule a consult" and "Speak with An Expert".
- Government (third register): mission-ready, decision advantage, clearances (CUI, SIPR, TS), FedRAMP High and IL4, named programs, and a workforce story.
- The same brand word, "reliable", carries all three audiences. Only the proof changes.

## 10. What Ramanujan should borrow
1. One outcome word repeated everywhere. Scale uses "reliable" in the hero, About, Enterprise, Security and the footer. Ramanujan can keep "The Godfathers of Applied AI" as the brand line and pair it with one sober, repeatable definition sentence (what the studio does, for whom, to what standard) used in the hero, meta description, About and footer.
2. Separate audience paths with separate proof types. Build "For AI labs" (data, RL environments, evals, methodology) and "For enterprises" (pilot to production, diagnostics, risk). The site structure itself signals seriousness to both buyers before there are any logos.
3. Methodology-first research pages. Copy the Labs pattern (how datasets are built, what is held out, how human and model grading are combined, integrity rules) for Ramanujan's own small, honest evals or dataset audits. Methodology can be published on day one and checked by anyone.
4. A security page built on commitments, not badges. Use Scale's order (commitments, then compliance status, then data handling, then responsible disclosure contact), but state the true status, e.g. "SOC 2 not yet audited", plus concrete practices Ramanujan actually follows (no training on client data, deletion on request, access controls, NDA by default).
5. Problem-framing headlines with sourced facts. Scale's "most AI never leaves pilot" framing works without client proof if the statistic is cited from a third party.
6. Consultative CTAs. "Schedule a consult" and "Speak with an expert" suit a studio better than "Book a Demo", which implies a product. A structured case-study template (Problem / Solution / Implementation / Result) can be prepared now and used for internal or open-model experiments, clearly labelled as studio experiments.

## 11. What Ramanujan should avoid
- Market-share and scale claims: share of model builders served, contributor counts, payouts, valuation, years in business, "Proven across every industry". These cannot be matched and should not be implied.
- Logo walls, "Trusted by..." headers, and a "Don't just take our word for it" section with no named testimonials behind it.
- Legacy language ("Our legacy, your success."). "Godfather" already implies heritage. Stacking more heritage claims on a new studio would read as hollow.
- Certification badges or compliance language (SOC 2, ISO, FedRAMP, HIPAA-ready) not actually held. Also avoid vague "enterprise-grade security".
- Promises to "own the outcome" or guaranteed metrics without a contract that defines them.
- Government and defense vocabulary (mission-ready, decision advantage, clearances) and "Super Intelligence" framing. These are off-strategy and unearned.
- A "Book a Demo" CTA when there is no product to demo.
- Calling its own benchmarks "the standard" anything. Present them as Ramanujan's evals with published methods.
