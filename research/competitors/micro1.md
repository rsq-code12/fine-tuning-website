# micro1 · content audit

- Site: https://www.micro1.ai
- Reviewed: 2026-11-03, pages:
  - https://www.micro1.ai/ (home)
  - https://www.micro1.ai/realm (AI-lab offering: RL environments and evaluations)
  - https://www.micro1.ai/human-data (served the same content as /realm)
  - https://www.micro1.ai/cortex (agent evaluation product)
  - https://www.micro1.ai/cortex/enterprises (enterprise variant)
  - https://www.micro1.ai/government
  - https://www.micro1.ai/research (research hub)
  - https://www.micro1.ai/research/the-benchmark-ceiling (one research paper page)
  - https://www.micro1.ai/blog/flow-qc (quality-control methodology post)
  - https://www.micro1.ai/case-studies and https://www.micro1.ai/case-study/box
  - https://www.micro1.ai/careers (closest thing to an About page)
  - https://www.micro1.ai/series-a (funding announcement and mission)
  - https://www.micro1.ai/newsroom
  - https://www.micro1.ai/legal (Legal Center)
  - https://www.micro1.ai/sitemap.xml (used to find pages)
- Fetch notes:
  - Every page came back as readable text. No page was a bare JS shell.
  - The site has no /about, /company, /security or trust-center page. The sitemap has none, and the Legal Center holds only privacy, cookie, candidate and referral terms. The careers page and the Series A page do the job of an About page.
  - The extracts showed no logo names on home or product pages. A logo strip made only of images would not show up in text extraction, so I can't rule one out. No "trusted by" label appears in the text, though.
  - A search-result snippet said a micro1 footer claims SOC 2 Type 2 compliance. The newsroom, legal and product pages I fetched showed no such claim. A third-party vendor directory (RL List) also reports that it found no public trust center or SOC 2 claim. I have marked certification status as unverified.
  - The contact flow is a hidden multi-step form overlay (contact details, then project description, then "Where did you find us?"). It shows up on every page.

## 1. Positioning
- Hero headline (quote, under 15 words): "Data lab to train frontier models & evaluate agents" (eyebrow: "micro1 Intelligence")
- Subheadline (paraphrase): micro1 says it is building the infrastructure to advance intelligence through three things: expert human data, real-world training environments and contextual evaluations.
- Category they claim (their words, short): "data lab"; "The frontier data lab for AI"; on the home page, "The data research company to accelerate AI in the real world"; on the government page, "human data engine".
- Primary audience(s): both, plus two supply-side audiences.
  - AI labs get the product **Realm**, headlined "Frontier evaluations and RL environments for AI Labs". Robotics labs get **Robotics**, which offers expert-demonstrated data.
  - Enterprises get **Cortex**, framed as "The reliability layer for agentic AI". Cortex has sub-pages for enterprises and for AI startups.
  - Government gets its own page, "Powering the Next Generation of AI in America".
  - Experts looking for work ("Join as an expert") and companies selling their operational data ("Monetize your data") are addressed throughout the nav and footer.
- One-sentence entity definition they repeat (paraphrase): micro1 says it is a research lab building the data infrastructure behind frontier AI, using expert human judgment to train and evaluate models and agents.

## 2. Homepage architecture
1. Top nav with a persistent "Get in touch" button. Job: route visitors to the three products and the single conversion path.
2. Hero (eyebrow, H1, one-line subhead, image). Job: claim the category ("data lab") and the two jobs it does (train models, evaluate agents).
3. Three product cards: Realm (labs), Cortex (production agents), Robotics (robotics labs). Job: let each buyer self-select in one click.
4. Tagline band, "The data research company to accelerate AI in the real world". Job: restate the identity as research-led, not labour-led.
5. Research block: a short note on the lab's aims, three benchmark cards (Dual-Arm Sim, MissionReport, Medical Index) and "View all research". Job: show intellectual output where logos would normally sit.
6. Closing banner, "Human brilliance is needed more than ever". Job: state the belief that human experts stay essential, with no body copy.
7. Footer with multi-audience routing (products, data partnerships, talent, government, company, legal) and support/press emails. Job: serve the supply side without cluttering the hero.
8. Overlay contact form that forks into "Continue as company" or "Apply for roles", then asks about the project. Job: qualify leads and keep job seekers out of the sales queue.

The home page has no customer logos, no stats and no testimonials in its text.

## 3. Navigation and site map
- Top nav: Intelligence (Realm, Cortex, Robotics), Research, Expert opportunities, Data partnerships, then a "Get in touch" button.
- Footer groups:
  - Intelligence: Realm, Cortex, Robotics.
  - Company data partnerships: Monetize your data, Referral program, Creators program.
  - For talent: Join as an expert, Opportunities, Refer & earn, Interview Prep.
  - Contact: support and press email addresses.
  - Partnerships: Government.
  - Company: Research, Careers, Community, Blog, Newsroom.
  - Legal: Sitemap, Legal Center, Privacy Policy, Cookie policy.
- Notable pages:
  - Research hub (/research), with a leaderboard, about 12 dated papers from 2025 to 2026, and open roles.
  - Individual benchmark pages (/benchmark/...). The sitemap also lists pharma, legal-reasoning, finance and retrieval benchmarks, plus a /leaderboard page.
  - Case studies (/case-studies): four entries.
  - A dense Newsroom: 30+ press headlines.
  - Government page.
  - A "Forum" section of executive dinners and events.
  - "Why I joined" essays from team members.
  - A founder page (/ali-ansari) and a Series A page.
- Missing pages: no About, no Security or Trust Center, no Docs, no standalone Methodology page. Methodology lives in blog posts such as /blog/flow-qc, /blog/introducing-flow and /blog/the-secret-to-high-quality-training-data.

## 4. Voice and tone
- Five adjectives: ambitious, confident, terse, mission-driven, frontier-forward.
- Sentence style:
  - Headlines and card titles are short noun phrases or fragments.
  - Body copy is one or two sentences of about 15 to 20 words.
  - Enterprise pages use capability headings that each state one benefit plainly (for example "Visibility into where and why agents fail").
  - The technical blog runs much longer, precise and self-critical.
- Person: "we / our" for the company, "you / your" in CTAs and enterprise copy. The research and benchmark pages use a third-person, institutional voice.
- Jargon level and the technical terms they lean on: high. Common terms are frontier models, RL environments, contextual evaluations, human-in-the-loop, expert-demonstrated data, agentic AI, LLM-as-judge, rubrics, failure modes and embodied systems. The quality-control post goes deeper: mutation testing, held-out sets, rollout review, regression tests and a reflective prompt optimizer.
- How they use numbers:
  - Product pages hold almost no numbers. Realm gives only "100+ fields".
  - The scale claims sit on the government page: micro1 claims 130,000+ vetted candidates, 100+ domains, 60+ languages, and 3,000+ US jobs created in 30 days.
  - Careers frames human data as a future market of $1 trillion a year.
  - Funding, ARR and valuation appear only through press headlines in the newsroom.
  - Exact operational numbers appear only in the quality-control post. Examples: the share of failed tasks revised by experts, the median time to a fix, the needs-review rate and review latency.
- Two or three paraphrased examples of typical lines (not verbatim copy):
  - Agents are moving from pilots into production, reliability is now the bottleneck, and most teams still lack the basics to measure it.
  - Domain experts review agent output where automated evals and model-graded checks run out of road.
  - Human data will be a trillion-dollar annual market, and micro1 presents this as a long-term conviction rather than a forecast.

## 5. Trust signals
| Signal | Present? | How it is presented |
|---|---|---|
| Customer / lab logos | No (in text) | Home and product pages name no customers. The case-study index says frontier AI labs and Fortune 10 companies work with micro1 but names only one client. |
| Named case studies with metrics | Partial | Four case studies: one named (Box) and three anonymous. None contains a quantified result. The Box story follows challenge, solution, process, outcome and "Why This Worked", with no numbers and no named quotes. |
| Certifications (SOC 2, ISO 27001, HIPAA, GDPR) | Unverified | None appear on the pages I fetched. One search snippet mentions SOC 2 Type 2, but no fetched page shows it. |
| Security / trust page | No | No security page, no trust center, no subprocessor list. The government page calls its agents secure and compliant without giving detail. |
| Research, papers, benchmarks, leaderboards | Yes, strong | Research hub with a leaderboard of branded benchmarks, each framed as "the standard for evaluating frontier models" in a domain. Dated papers, one linked to arXiv, co-written by micro1's Chief Economist, whose bio lists academic affiliations. |
| Leadership / team credentials | Partial | Founder Ali Ansari is named and has his own page. Careers lists a VP of Engineering, a CFO and project leads by title only. Research authors carry full bios. |
| Investors / funding | Yes, via press | The Series A page announces $35M at about a $500M valuation (Sept 2025) but names no investors. Newsroom headlines report later ARR milestones and a raise at a much higher valuation. |
| Partners (AWS, Google, NVIDIA...) | Minimal | No cloud or chip partners shown. The government page cites "Awardable" status on the US CDAO Tradewinds marketplace. |
| Expert network size / workforce claims | Yes | The government page gives 130,000+ vetted candidates, 100+ domains and 60+ languages. Realm says 100+ fields. Zara, an AI recruiter agent, is said to source and vet experts. |
| Methodology / quality process explained | Partial on product pages, strong in blog | Product pages name tools (Flow for production, Merit for quality dashboards, Zara for vetting) and show a four-step loop. The flow-qc post gives a detailed, candid account of the review system. |
| Press / awards | Yes, heavy | Newsroom of 30+ headlines from TechCrunch, Forbes, WSJ, CNN, Reuters, Inc., Business Insider and others. Mentions a Forbes AI 50 "Brink" list. |

## 6. How they earn trust without (or before) proof
micro1's product pages carry almost no customer proof. They fill the gap with:
- **Product architecture as credibility.** Named offers (Realm, Cortex, Robotics) and named internal systems (Flow, Merit, Zara) make a services business read like infrastructure.
- **Process loops instead of results.** Cortex sets out a four-step loop: define success criteria and rubrics, have experts diagnose failures, produce targeted training data, then re-evaluate as the system changes. The Impact block lists outcomes (faster time to production, visibility, customer trust) without figures.
- **Measurable-quality vocabulary.** Realm says it tracks velocity, error rates, cost per task, quality and pipeline health, and promises a live view of model and pipeline status ("Intelligence live").
- **Research and benchmarks as the logo wall.** On the home page, the benchmark cards sit exactly where a logo strip would usually go.
- **Engineering candour.** The quality-control post admits what went wrong first (the reviewer model raised false alarms). It explains how findings are structured, how planted-defect pairs measure both kinds of error, how expert overrides become regression tests, and how changes ship only if they hold up on held-out tasks. It also gives real operational numbers.
- **Stated principles.** The Box case study ends with three principles: "Expert-Designed, Not Synthetic", "Workload-First Evaluation" and "Model-Agnostic by Design".
- **A big thesis and a founder story.** Essays on the human-data market ("No Last Mile") and the founder's media profile carry the brand where client stories are thin.

## 7. Vocabulary
frontier models; data lab; human data; expert human data; human-in-the-loop; domain experts; RL environments; frontier evaluations; contextual evaluations; agentic AI; reliability layer; visibility and improvement layer; LLM-as-judge; automated evals; rubrics and scoring; success criteria; failure modes; failure diagnosis; targeted training data; real workflows; company knowledge; expert-demonstrated data; data engine; pipeline health; velocity and cost per task; benchmark / leaderboard; model-agnostic; mission-ready; "human brilliance".

## 8. Calls to action
- "Get in touch": the single primary CTA sitewide, in the nav, inside product sections and in every closing block.
- "View all research" / "View research": home page and the bottom of product pages.
- "View case studies": Cortex pages. "Full case study": each case-study card.
- "Read the Full Paper": research paper pages (links to arXiv).
- "Continue as company" / "Apply for roles": the fork inside the contact form.
- "Join as an expert", "Monetize your data", "Refer & earn", "Interview Prep": footer, for supply-side audiences.
- "Apply now" / "View open roles": careers.
- Closing headlines that act as CTAs: "Evaluate and improve your agents", "Build trust in your AI agents today".

## 9. Lab vs enterprise messaging
- **To labs (Realm, Robotics, research):**
  - Capability-frontier language: "frontier", "AI Labs", the world's most ambitious AI.
  - Offers are RL environments, evaluations and net-new expert data across 100+ research domains.
  - Benchmarks are branded as the standard for a domain.
  - The pitch is breadth, depth of expertise and throughput. The buyer is assumed to know the jargon.
- **To enterprises (Cortex, Cortex for Enterprises):**
  - Pain-led and operational. Agents are stuck between pilot and production, reliability is the blocker, and teams can't see where or why agents fail.
  - Headings are outcome statements: measurement, failure visibility, monitoring after launch, turning company knowledge into agent behaviour, review beyond LLM-as-judge.
  - Benefits are business terms: time to production, customer trust, continuous improvement.
  - Compliance, risk controls and ROI figures are absent.
- **To government:** patriotic and mission framing (win the AI race, national priorities), with "secure, compliant" claims and the largest workforce numbers.
- **Shared across all three:** expert human judgment is the differentiator, and the same "Get in touch" CTA closes every page.

## 10. What Ramanujan should borrow
1. **One literal category line, repeated everywhere.** micro1 says "data lab" on every page. Ramanujan should keep "The Godfathers of Applied AI" as the brand line but always pair it with a plain descriptor and a repeatable entity sentence. Example: "Ramanujan is an applied AI studio for fine-tuning, training data, RL post-training and agent systems."
2. **Split the offer by buyer with named service lines.** Use home-page cards that route labs and businesses to separate pages, with different language on each: capability and rigour for labs, reliability and cost for businesses. Naming the service lines is honest as long as each describes real work Ramanujan does.
3. **A numbered process loop on every service page.** For example: define success criteria and a held-out eval, find failure modes, build targeted data, train, re-evaluate. Describing how you work needs no client history.
4. **Benefit-first capability headings.** Write short headings that each state one outcome plainly, in the style of "Visibility into where and why agents fail". This reads as corporate and credible without any proof.
5. **Candid technical write-ups as the main trust asset.** Publish dated posts on Ramanujan's own experiments, such as fine-tuning open models on public datasets or eval design. Include what failed, how it was measured and the real numbers. The flow-qc post shows that admitted failure modes and held-out testing read as more trustworthy than claims.
6. **A qualifying contact form.** Ask for the visitor type, then a short project description. This signals seriousness and gives sales useful context.

## 11. What Ramanujan should avoid
- Calling any benchmark or method "the standard" for a field, or the site "a complete data engine". These are claims of category leadership a new studio cannot back.
- Unnamed proof framing, such as claiming that frontier labs and Fortune 10 companies work with you, and a case-studies page with no real cases on it.
- Workforce or scale numbers (vetted-candidate counts, 100+ domains, languages) and press walls. Ramanujan has none, and invented or vague versions would be obvious.
- Funding, valuation or trillion-dollar market theses. Next to "Godfather", a grand thesis with no track record reads as bravado.
- "Secure, compliant" wording with no evidence. Ramanujan should state its actual data practices instead (see the Toloka audit) and never imply certifications it does not hold.
- Promising live dashboards ("Intelligence live") or named internal platforms unless they exist and can be demoed.
- micro1's own gap, which is no security or trust page. An enterprise buyer will look for one, so Ramanujan can beat micro1 here cheaply with a plain data-handling page.
- Mixing hiring and marketplace CTAs into the buyer journey. micro1's talent and data-seller paths make the footer and form noisy. Ramanujan should keep the buyer path clean.
