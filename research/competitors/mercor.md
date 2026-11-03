# Mercor · content audit

- Site: https://mercor.com (serves from www.mercor.com)
- Reviewed: 2026-11-03, pages: / (home), /research/, /enterprise/, /enterprise-evals/, /data/, /apex/, /apex/methodology/, /experts/, /mission/, /partner/, /blog/expert-data-drives-model-performance/, /blog/organizing-human-intelligence-to-power-the-ai-economy/, /blog/update-on-mercor-security-incident/, /sitemap.xml
- Fetch notes:
  - trust.mercor.com (the footer "Security" link) returned only its title, so it is client-rendered and its certifications could not be read. A web search found no public SOC 2 report. The only on-site certification claim found was SOC 2 Type II on /data.
  - team.mercor.com (the hiring platform) also returned only a title. work.mercor.com/about-us returned 404.
  - Animated stat counters on /research came back as 0. Home stats had rendering glitches (roles created shown as "707kk", payouts duplicated).
  - FAQ answers on /enterprise did not render; only the questions did.

## 1. Positioning
- Hero headline (quote, under 15 words): "Mercor is organizing human intelligence to power the AI economy." The track pages use "Frontier data for frontier AI" (/research), "Enterprise AI meets human intelligence" (/enterprise) and "Your agent is only as good as your evals" (/enterprise-evals).
- Subheadline (paraphrase): the home page has none. Four intent links sit under the H1 instead: "Find work", "Evaluate AI", "Build evals", "Sell data".
- Category they claim (their words, short): "AI data company" (/mission). It also describes itself as the layer between human expertise and frontier models. The research side is framed as "frontier data", the enterprise side as "Enterprise AI".
- Primary audience(s): both, plus two more.
  - Labs: through /research and the APEX benchmarks. The language is research-peer, with the claim that it is used by the "top 5 AI labs and 6 of the Mag 7".
  - Enterprises: through /enterprise and /enterprise-evals (agents, evals, forward-deployed engineers).
  - Experts: the supply side, placed first on the home page.
  - Businesses selling workflow data: through /data.
  - Each audience gets its own hero link and its own page.
- One-sentence entity definition they repeat (paraphrase): Mercor says it finds and vets experts to train frontier models, measures whether models can do real professional work with APEX, and helps enterprises deploy agents that carry their own know-how.

## 2. Homepage architecture
1. Header: Research, Enterprise, Experts, Company, plus "Log in" and "Get in touch".
2. Hero: the mission sentence as the H1 and four intent links. Job: route each audience in one click.
3. Experts: live marketplace stats (Mercor claims a $91/hr average contracted rate, $4M+ in daily payouts and 5M+ experts) and a "Latest roles" list with "View all roles". Job: proof that the marketplace is busy.
4. Research, "Industry partner benchmarks": four co-branded leaderboard cards (Harvey LAB for legal, APEX-Accounting for accounting, APEX-SWE for software, τ³-Banking for banking), each with "Leaderboard", "Paper", "Code" and "Blog" links. Job: proof through research, with partner logos.
5. Enterprise, "Frontier AI, built on your expertise": three cards. Human data & evals goes to "Talk to research", Data monetization to "Estimate payout", Enterprise AI to "Book demo". Job: the offer.
6. Insights and press: one company post, three enterprise posts and four press items (CNBC, Forbes, TIME, Bloomberg), including the funding and valuation headline. Job: authority and momentum.
7. Footer.

## 3. Navigation and site map
- Top nav: Research, Enterprise, Experts, Company. On the right, "Log in" and "Get in touch".
- Footer groups:
  - Experts: find work, listings, help center, resources, stories.
  - Research: APEX benchmarks and the individual leaderboards, off-the-shelf data, a US benchmark map.
  - Enterprise: enterprise AI, human data, data monetization, robotics, contact sales.
  - Company: mission, careers, security, newsroom, blog.
  - Legal.
- Notable pages:
  - /apex: a large hub of leaderboards. It covers Mercor's own benchmarks, partner benchmarks, "Mercor-extended" versions of public benchmarks with extra tasks, and about 25 public benchmarks Mercor re-runs itself. Each has a public sample-task page.
  - /apex/methodology and an APEX newsletter.
  - /research.
  - /docs: short explainers on why humans are needed, types of data, designing a data pipeline, incentive structure and writing instructions.
  - /resources: glossary and SEO pages (what RLHF is, DPO vs RLHF, the best AI models for lawyers and more).
  - /stories: expert profiles.
  - /mission, /newsroom, /careers, /robotics, and /partner (the contact form).
- Missing: no pricing for buyers. Only expert pay rates are public.

## 4. Voice and tone
- Five adjectives: ambitious, confident, data-driven, plainspoken, mission-led.
- Sentence style: headlines are often one complete thesis sentence rather than a fragment ("Your agent is only as good as your evals"). There are a few imperative fragments ("Think fast. Deploy faster."). Research posts use medium-length technical prose. Founder essays use short declarative lines, rhetorical questions and large forecasts.
- Person: the H1 is third person ("Mercor is..."). The mission page and founders' note use "we". Product pages use "you" and "your".
- Jargon level and the technical terms they lean on: it depends on the track.
  - Research pages are high-jargon: Pass@1, RL, mixture-of-experts, verifiers, rubrics, harness, LLM judge, held-out sets, contamination, long-horizon.
  - Enterprise pages use business terms: run-rate, ROI, time to mitigation, value creation, and production monitoring.
  - Expert pages are plain.
- How they use numbers:
  - Marketplace scale: 5M+ experts, $4M+ per day in payouts, $91/hr, 300+ fields, 200k+ trained eval authors.
  - Research results are precise: task counts, runs per model, Pass@1, base-model scores before and after training, and confidence intervals on some leaderboards.
  - Enterprise case studies: Mercor claims a 50%+ cut in median time to mitigation, $7 to 9M in savings, about 12,000 support requests a week and 132 expert-graded agent runs.
  - Delivery speed: an eval suite in 4 to 6 weeks.
  - Funding comes through press headlines.
- Two or three paraphrased examples of typical lines (not verbatim copy):
  - Human expertise becomes more valuable as AI gets stronger, not less.
  - Evals are the spec for an agent: they tell you which model to use, what context helps, and whether it works at all.
  - Pick the cheapest model that clears your quality bar, and prove it with evidence instead of intuition.

## 5. Trust signals
| Signal | Present? | How it is presented |
|---|---|---|
| Customer / lab logos | Yes, selective | Labs are never named. /research claims use by the "top 5 AI labs and 6 of the Mag 7". The named logos are application-layer partners: Harvey, Ramp, Cognition and Sierra on home, with NVIDIA and Reflection added on /partner. A Harvey research-team testimonial about post-training data sits beside the contact form. |
| Named case studies with metrics | Yes | /enterprise-evals shows Ramp (finance) and Cognition (code) with task counts and claimed 2x to 3x faster model iteration. /enterprise lists five "Selected engagements", several anonymized, with outcome metrics. A research post shows an open model before and after training on Mercor data, on a named public benchmark. |
| Certifications (SOC 2, ISO 27001, HIPAA, GDPR) | Partial | /data claims SOC 2 Type II and AWS KMS key management. The trust center could not be read. No public ISO 27001 claim was found. |
| Security / trust page | Yes, not readable | The footer "Security" link goes to trust.mercor.com (client-rendered). /enterprise has a Security section: deployment in customer-controlled infrastructure, scoped access, enterprise identity controls and monitoring. /data lists encryption, per-session credential isolation, access logging and automated de-identification. There is also a public incident write-up from June 2026 (see section 6). |
| Research, papers, benchmarks, leaderboards | Yes, flagship | The APEX family has arXiv papers, GitHub code and Hugging Face sample data. Full task sets stay private to avoid training contamination. There are partner benchmarks and re-runs of public benchmarks, and /apex/methodology gives each benchmark a card with the harness, run count, judge model, limits and deviations. |
| Leadership / team credentials | Yes | /mission names the co-founders and co-CEOs and includes a founders' note and a TIME100 AI mention. The blog has "Why I joined Mercor" posts and research posts with named authors. |
| Investors / funding | Yes | A "Backed by" logo row (Benchmark, General Catalyst, Felicis, Robinhood Ventures, Menlo Ventures). A cited press headline reports a $350M Series C at a $10B valuation. |
| Partners (AWS, Google, NVIDIA...) | Yes | Benchmark partners (Harvey, Ramp, Cognition, Sierra), an NVIDIA Nemotron post, AWS KMS named in the security architecture, and a training partner (Applied Compute) credited in a research post. |
| Expert network size / workforce claims | Yes, central | 5M+ experts (home), 4M+ vetted experts (a March 2026 founder essay), nearly five million (the incident post), 300+ professional fields, 200k+ trained eval authors, $4M+ daily payouts and a $91/hr average rate. |
| Methodology / quality process explained | Yes, for evals | /apex/methodology has per-benchmark cards. /docs explains how human data is designed. /enterprise-evals names three ways of working together (embedded experts, production rubrics, APEX benchmarks) and a timeline. Experts are vetted through assessments and AI interviews. Internal QA figures (such as agreement rates) are not published. |
| Press / awards | Yes | Press logos on home. /mission lists awards (TIME100 AI, Forbes AI 50, Forbes Cloud 100, LinkedIn Top Startups and others) and coverage from major outlets. |
| Physical presence | Yes | Offices in San Francisco (HQ), New York and London on /mission. |
| Post-form expectations | Partial | "Talk to the Mercor team" asks only for a work email first and promises the right person will reply. The CTA a visitor clicked pre-selects the topic of the enquiry. |

## 6. How they earn trust without (or before) proof
- **Verifiable research instead of testimonials.** Mercor publishes benchmarks with a paper, code and sample tasks, so anyone can check the work. Because it ranks other companies' models, it reads like a referee rather than a vendor.
- **Methodology with its limits stated.** Benchmark cards list the harness, runs per model, judge model and caps, and they disclose deviations and dropped tasks. That candor builds more trust than polish would.
- **A single thesis repeated everywhere.** Human expertise is the bottleneck for useful AI. It appears in the H1, the mission page, the founder essays and the research posts.
- **Teaching material.** /docs on designing human data and /resources glossary pages show expertise without needing a client.
- **Named people.** Named authors on technical posts, a founders' note, and "why I joined" stories.
- **Candor under pressure.** The security-incident post (a compromised open-source dependency) has plain headed sections: what happened, what the investigation found, what was done, and what comes next. It names outside responders and lists concrete fixes such as dependency audits, credential rotation, tighter cloud policy, independent pen testing and 24/7 detection.
- **Neutral-advisor framing.** The evals page offers a price-performance view (pick the cheapest model that meets your quality bar). That positions Mercor on the buyer's side.
- **Security architecture on a page with no logos.** /data has no logos or case studies, so it leans on specific controls plus an FAQ on fees, payment timing and who can see the data.

## 7. Vocabulary
human intelligence, AI economy, frontier AI, frontier labs, frontier data, experts, vetted domain experts, expert-built, human data, evals, eval suite, rubrics, pass/fail criteria, verifiers, RL environments, worlds, tasks, trajectories, benchmarks, leaderboard, sample task, held-out, economically valuable work, professional work, long-horizon, agents, post-training, fine-tuning, LLM judge, price-performance frontier, forward deployed engineers, production, monetize, de-identified, APEX.

## 8. Calls to action
- Header: "Log in", "Get in touch".
- Home hero: "Find work", "Evaluate AI", "Build evals", "Sell data".
- Enterprise cards on home: "Talk to research" (labs and model builders), "Estimate payout" (data sellers), "Book demo" (enterprise AI).
- /enterprise: "Book a demo", "See our offerings".
- /enterprise-evals: "Talk to our team" (header, hero and closing section).
- /data: "Get a quote", "Refer a business", "Check if you qualify".
- APEX and research pages: "Leaderboard", "Paper", "Code", "Data", "Blog", "See the methodology", "Work with us", "View benchmarks", "Subscribe".
- Experts: "Start working", "Search roles", "Apply", "Sign up", "View all roles".
- Footer: "Contact sales", "Explore listings", "Help center".
- Research posts end by inviting readers to run the eval themselves on the published dataset.
- Contact page: the headline is "Talk to the Mercor team" and the button is "Continue".

## 9. Lab vs enterprise messaging
- **To labs: a research peer.** "Frontier data for frontier AI". The CTA is "Talk to research" rather than "Book a demo". Proof is papers, leaderboards and training results on open models. The vocabulary is worlds, tasks, verifiers, Pass@1 and held-out sets. Labs are referred to but never named, which also reads as confidentiality. Expert supply is shown as capacity.
- **To enterprises: outcomes and risk.** Does the agent work, and what does it cost to run. A four-stage lifecycle (discover, deploy, improve, monetize), forward-deployed engineers, a security section for IT, ROI-style metrics and "Book a demo". Lab work is used as the credential: the page says the same eval methodology the frontier labs use is now offered to enterprises.
- **To data sellers: income and privacy.** New revenue, automated de-identification, the seller controls what is shared, and "Get a quote".
- **The bridge is evals.** The same APEX machinery is a research artifact for labs and a product spec for enterprises.

## 10. What Ramanujan should borrow
1. **A thesis sentence as the H1, plus an intent router.** Keep "The Godfathers of Applied AI" as the brand line. Add one plain thesis sentence and three or four intent links (for example: fine-tune a model, build training data, evaluate a model, deploy an agent). This needs no proof and makes the page feel organized and corporate.
2. **A separate CTA for research buyers.** Mercor uses "Talk to research" for model builders and "Book a demo" for enterprises. Ramanujan could use something like "Talk to an engineer" for post-training and lab work, and keep its plan or quote CTA for businesses.
3. **Publish one small, reproducible eval of our own.** Even 50 to 100 expert-written tasks would be enough. Ship it with a methodology card (harness, runs per model, judge model, limits, deviations), sample tasks and code. That gives Ramanujan a referee's credibility without claiming any clients. Start with one benchmark it can keep current, not a wall of leaderboards.
4. **Lead enterprise work with evals.** Make the first engagement an eval suite the client owns, and use the price-performance framing (the cheapest model that clears your bar). A new studio can take a neutral-advisor stance honestly.
5. **Teaching docs on how training data is designed.** Types of data, writing annotation guidelines, incentive and QA design, and pipeline design. This shows real expertise and works for labs later.
6. **Plain security controls and a written incident-response commitment.** List only the controls actually in place (encryption, access scoping, deletion on request, no training on client data) and say how Ramanujan would notify clients. Mercor's incident post shows that structure and candor build trust.
7. **Named authors on every technical post.** People, not "the team", so the godfather voice has real faces behind it.

## 11. What Ramanujan should avoid
- **Marketplace-scale claims** (expert counts, payouts, roles) and unnamed-lab claims like "used by the top labs". Ramanujan has neither, and these are the easiest claims to disprove.
- **Investor, press and award sections** until they are real. Empty prestige blocks read as fake.
- **Co-branded benchmarks or partner logos on research cards** that imply partnerships Ramanujan does not have. Benchmark someone else's public model, but do not suggest they took part.
- **Unmaintained leaderboards.** A stale leaderboard with last season's models damages credibility faster than having none.
- **Animated counters that fail to render** (Mercor's showed 0 and "707kk"). Use static, true numbers or none at all.
- **Grand economic forecasts in founder voice** (Mercor's essays talk about hundreds of billions in spend). "Godfather" plus grandiosity tips into overreach. Keep the bold line and make everything around it measured.
- **Four audiences on one home page.** Mercor can do it because it is a two-sided marketplace. Ramanujan should keep two: business buyers now and labs later.
- **Unaudited security claims** such as "SOC 2" or "enterprise-grade security". State practices and a dated plan instead.
