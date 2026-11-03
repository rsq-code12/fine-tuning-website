# Labelbox · content audit

- Site: https://labelbox.com
- Reviewed: 2026-11-03, pages:
  - https://labelbox.com/ (home)
  - https://labelbox.com/sitemap.xml (to map the site)
  - https://labelbox.com/products/horizon/ (frontier-lab RL environments and evals)
  - https://labelbox.com/products/alignerr/ (expert / human data network)
  - https://labelbox.com/rl-data/rubrics/ (rubrics for frontier RL)
  - https://labelbox.com/products/terra/ (robotics data)
  - https://labelbox.com/products/recursion/ (enterprise agent platform)
  - https://labelbox.com/company/about/ (about)
  - https://labelbox.com/company/press/ and https://labelbox.com/blog/labelbox-series-e/ (funding announcement and founder note)
  - https://labelbox.com/blog/ (research posts)
  - https://labelbox.com/customers/ (case study index)
  - https://labelbox.com/customers/meta-gim-customer-story/ (one customer story)
  - https://labelbox.com/company/security/ (privacy and security)
  - https://trust.labelbox.com/ (trust center)
  - https://labelbox.com/leaderboards/ (leaderboards)
  - https://labelbox.com/sales/ (contact)
- Fetch notes:
  - Nav dropdown contents and any footer link groups did not render as text. Only the top-level labels (Products, Resources, Company), social icons, tagline and legal links came through. The product list (Recursion, Horizon, Terra, Alignerr) is inferred from the homepage and sitemap.
  - https://labelbox.com/research/ and https://labelbox.com/evals/ both return 404. "Labelbox Research" exists only as a homepage section and as the "Applied research" filter on the blog.
  - https://labelbox.com/sales/ rendered only its post-submit "Thank You" state, so form fields and segmentation could not be read.
  - trust.labelbox.com rendered the document list but not which documents are public and which are gated.
  - Numbers below are as reported by the fetch tool; spot-check any figure before reusing it in public material.

## 1. Positioning
- Hero headline (quote, under 15 words): "Where AI learns to do real work"
- Subheadline (paraphrase): Labelbox says it builds the training environments frontier labs use, and the agents that engineering and research teams hand their backlogs to.
- Category they claim (their words, short): "Environments for post-training, at scale" (Horizon); "Managed AI agents for every team" (Recursion); "The RL data engine for AI teams" (contact page). The About page reframes the company as "We build where AI learns to work".
- Primary audience(s): both, split explicitly. The hero has an audience toggle (For enterprises: Recursion / For frontier AI: Horizon), and the closing CTA block has two halves with different buttons. Enterprise gets the product demo and most of the homepage. Frontier labs get one product-card section plus the 90%+ claim and the research block.
- One-sentence entity definition they repeat (paraphrase): Labelbox builds the environments, graders and expert signal that models learn from, then uses the same loop to run enterprise agents that improve with every graded run.

## 2. Homepage architecture
1. Top nav plus primary CTA "Try Recursion": the enterprise product is the default action.
2. Announcement banner: Series E ($100M+) with "Read the announcement" (momentum and financial durability).
3. Hero with audience toggle: one-line claim, enterprise vs frontier-AI switch, a three-step "Work, Fleet, Learn" flow.
4. Product demo panel, "A model regression, traced to its cause.": a mock agent session (coordinator plus specialists, connected tools, outcome score) that shows the product working.
5. Activity metric and loop, "Every run makes the next one better.": a weekly session count plus the learning-loop idea. Link "Explore Recursion".
6. Job catalog, "Agents for the work that keeps coming back": filterable templates by function (engineering, reliability, security, ML research, evals, finance, sales, procurement). Helps the buyer picture a first use case.
7. How it works, "Give it a job. Get back finished work.": a sample job configuration (job, apps, triggers, rubric, results). Labelbox claims 5-10x lower cost per task once a specialist model takes over.
8. Frontier AI product cards, "The data and environments frontier models learn from": Horizon (RL environments and evals), Terra (robotics data), Alignerr (expert network). Labelbox claims 90%+ of leading US AI labs post-train and evaluate on Labelbox.
9. Customer logo wall: Shutterstock, Ideogram, Stryker, Intuitive, Warner Bros., Peloton, Dialpad, Pinterest, Ancestry, Walmart, Speak, Runway, JPL, Etsy and others (enterprise and AI-native brands; no frontier lab logos).
10. Case study cards: Meta GIM benchmark, Google Cloud human-preference eval in Vertex AI, an ecommerce shopping model, Intuitive surgical video. Each with "Read story".
11. "Latest work from Labelbox Research": three research posts (EchoChain audio benchmark, Implicit Intelligence agent eval, a safety-dataset critique). Thought leadership.
12. Security, "Real access to your code. Never the keys.": an architecture promise plus badges (SOC 2 Type II, GDPR, CCPA, NIST 800-171, PCI DSS). Link "Security at Labelbox".
13. Split closing CTA, "Get started with Labelbox":
    - Enterprise half: "Stop prompting. Start delegating." with "Bring us a job" and "Get started".
    - Frontier half: "Build what your models learn next." with "Talk to our team".
14. Footer: tagline "We enable breakthroughs", social, legal only.

## 3. Navigation and site map
- Top nav: Products (Recursion, Horizon, Terra, Alignerr), Resources, Company; button "Try Recursion". A Series E banner appears above the nav on every page read.
- Footer: very thin. Tagline, LinkedIn and X, Terms of Service, Privacy Notice, Copyright Dispute Policy. No visible link groups.
- Notable pages from the sitemap and links:
  - Company: About, Careers, Jobs, Press, Security, plus a separate SafeBase trust center (trust.labelbox.com).
  - Proof: Customers (37 stories with an industry filter), Leaderboards (10 boards with "View full report").
  - Data offer pages: supervised fine-tuning datasets, RL environments, RL rubrics.
  - Content: Blog with "Applied research" filter, Guides, AI glossary, Education.
  - Conversion: Generate, Recorded demo, Sales.
  - A competitor comparison page exists (a Snorkel "alternative" page, found via search).
  - No dedicated research hub or methodology page; research lives in blog posts and leaderboard reports.

## 4. Voice and tone
- Five adjectives: punchy, product-led, ambitious, technical, assertive.
- Sentence style: very short headline couplets and imperatives ("Stop prompting. Start delegating."; "Give it a job. Get back finished work."). Body copy is brief and concrete, often a list of tools, triggers or metrics. Contrast lines are frequent ("Assistants wait for an engineer. The backlog doesn't."). Horizon briefly turns philosophical ("Teaching models taste.").
- Person: heavy second person ("your backlog", "your models") on enterprise pages, "we" on About and research. Imperative CTAs.
- Jargon level and the technical terms they lean on: high on Horizon and rubrics (reward signal, verification, difficulty progression, credit assignment, pass@k, trajectories, preference labels, RLHF, IRT calibration). Operational on Recursion (coordinator, specialist, grader, sandbox, vaulted credentials, MCP, allowlists, transcripts). "Signal" is the unifying noun: nearly every customer story is retitled around "training signal", "preference signal" or "evaluation signal".
- How they use numbers:
  - Market share: Labelbox claims 90%+ of leading US AI labs and 400+ customers.
  - Network size: Labelbox claims 2.6M+ contributors, 50K+ PhDs and 85K+ licensed professionals across 200+ domains, 40+ countries and 75+ languages. The Series E post instead says more than 4 million.
  - Money: Labelbox claims profitability and 5x year-over-year growth, $100M+ Series E at a $1.25B pre-money valuation, and $189M raised (About page).
  - Demo telemetry: sessions per week, minutes to mitigation, reward rising from 0.61 to 0.88.
  - Head-to-head claims: Recursion shows a fine-tuned support specialist beating named frontier models on resolution rate, hallucination, cost and latency.
  - Case study effort figures: the Meta GIM story gives person-hours per prompt and item counts.
- Typical lines (paraphrased):
  - Hand an agent a recurring job and get completed, graded work back instead of a chat reply.
  - Verifiable rewards tell you whether an answer is right, not whether the reasoning is sound; that needs expert judgment.
  - A badly built environment teaches a model shortcuts instead of skills.

## 5. Trust signals
| Signal | Present? | How it is presented |
|---|---|---|
| Customer / lab logos | Yes | Enterprise and AI-native logo wall ("Hundreds of AI teams build with Labelbox.") on home, Horizon and Security pages. No frontier-lab logos; lab trust is carried by the 90%+ claim and the Meta story instead. |
| Named case studies with metrics | Yes | 37 stories, many named (Meta, Google Cloud, Walmart, P&G, Genentech, NASA JPL, Speak, Dialpad), some anonymized by sector. Most cards have no outcome metric. The Meta GIM story uses problem / solution / result plus narrative, has no quote, and reports process and scale figures (820 expert-authored problems, rubric criteria per prompt, public vs private split, 22 models benchmarked). It presents Labelbox as the data partner behind Meta's research. |
| Certifications (SOC 2, ISO 27001, HIPAA, GDPR) | Yes, inconsistent | Home and Recursion: SOC 2 Type II, GDPR, CCPA, NIST 800-171, PCI DSS. Security page: SOC 2 Type II, HIPAA, GDPR, CCPA, with ISO 27001 cited only as an informing standard. Trust center: GDPR, HIPAA, ISO/IEC 27001:2022, PCI DSS, SOC 2 Type 2. |
| Security / trust page | Yes | Security page: encryption at rest and in transit, least-privilege access, customer-hosted assets via signed URLs, a list of 30 policy names, privacy FAQ. SafeBase trust center: architecture and data-flow diagrams, pentest letter, insurance certificate, compliance reports. CTA "Start your security review". Homepage security line is an architecture promise rather than a badge row. |
| Research, papers, benchmarks, leaderboards | Yes | Homepage "Labelbox Research" block; blog "Applied research" posts (monitorability, branchpoints, EchoChain, a safety-dataset critique); LinkedIn says an Implicit Intelligence paper was accepted at ICML 2026. Ten leaderboards with reports and "Want us to evaluate your model?" No research hub page. |
| Leadership / team credentials | Thin | Only the co-founder and CEO (Manu Sharma) is named, via a founder note on About and the Series E post. No team page or researcher bios. |
| Investors / funding | Yes, prominent | Series E banner sitewide; About lists Kleiner Perkins, a16z, B Capital, First Round, Gradient, Databricks, SoftBank Vision Fund, Snowpoint. The Series E post names Infinitum Partners as lead plus Wipro Ventures and others. |
| Partners (AWS, Google, NVIDIA...) | Integrations | Integration and connector lists (GitHub, Jira, Slack, BigQuery, Databricks, Linear, Vercel, Salesforce, Zendesk, NetSuite; 100+ connectors, custom MCP). Google Cloud appears as a customer-partner story. |
| Expert network size / workforce claims | Yes, very large | Alignerr numbers (see section 4), with a domain list and a country list. |
| Methodology / quality process explained | Yes, per product | Horizon: right tasks, verification, difficulty progression, credit assignment; partial-credit rubrics; programmatic verification. Alignerr: skills tests before work, ongoing calibration against ground truth, graded and validated output, filtering by credential and history. Rubrics: SMEs define quality, Labelbox operationalizes it, live scorecards, re-run and compare. Meta story: rubric criteria designed to be atomic, self-contained, mutually exclusive, collectively exhaustive and easy to verify. |
| Press / awards | Limited | Press page shows the Series E item; a podcast-host lab visit is featured on Terra. No awards seen. |

## 6. How they earn trust without (or before) proof
- **Explain the hard problem.** Horizon's "The reward signal problem, solved at scale." section teaches why environments fail (wrong tasks, weak verification, no difficulty curve, poor credit assignment, shortcut learning). Teaching the reader is itself the credential.
- **Show a worked example.** The homepage and Recursion use a mock incident session and a sample job configuration (job, apps, triggers, rubric, results). The buyer sees exactly what a deliverable looks like before any testimonial.
- **Describe security as architecture, not badges.** "Real access to your code. Never the keys." is followed by specifics: sandboxes, vaulted credentials attached only to approved calls, host allowlists, audit transcripts, per-tool permission levels.
- **Make quality steps visible.** The rubrics page has no customers and no numbers. It relies entirely on a four-step loop (score, find weak dimensions, refine, re-run and compare) and a domain list. The Alignerr page lists vetting stages.
- **Principles and a founder voice.** About has "What we believe" (customers win, seek to understand, craftsmanship), a three-chapter company story ("One conviction, three chapters") and a signed founder note.
- **A point of view.** The "Teaching models taste." section and the safety-dataset critique show opinions, not just services.

## 7. Vocabulary
frontier AI; frontier labs; environments; RL environments; post-train / post-training; evals; reward signal; verification / programmatic verification; rubrics; partial credit; graders / grading; expert judgment; grounding signal; training signal; preference labels; trajectories; taste; pass@k; credit assignment; difficulty progression; calibration; domain matching; specialist model; agents / fleet / coordinator / specialist; sessions; sandboxes; vaulted credentials; real work / finished work; recursive self-improvement; data factory.

## 8. Calls to action
| Label | Where |
|---|---|
| "Try Recursion" | Header button on every page (primary) |
| "Read the announcement" | Series E banner on every page |
| "Explore Recursion" | Home, loop section |
| "Bring us a job" / "Get started" | Home closing block, enterprise half |
| "Talk to our team" | Home closing block, frontier half |
| "Talk to us" | Alignerr, Rubrics, Terra closing |
| "Contact us" | Horizon closing, Recursion hero, Security, Customers, Blog |
| "Read story" | Case study cards (home, Horizon, Security, Customers) |
| "Security at Labelbox" / "Read about privacy & security" | Home and Recursion security sections |
| "Put your first agent to work", "Explore RL environments" | Recursion |
| "Learn more" | Rubrics (links to environments) |
| "View full report" / "Want us to evaluate your model?" | Leaderboards |
| "Start your security review", "Get access" | Trust center |
| "View open roles", "View all roles", "Available positions" | About |

## 9. Lab vs enterprise messaging
- **To labs (Horizon, Alignerr, Terra, Rubrics):**
  - Topics: what the model learns from. Environments, reward signal quality, verification, difficulty, credit assignment, preference over trajectories, contamination-aware held-out sets, domain-matched experts, output formats that plug into RL, RLHF and eval pipelines.
  - Proof: the 90%+ lab claim, expert-network scale, the Meta GIM story told as research support.
  - CTA: a conversation ("Talk to our team", "Talk to us").
  - Tone: research-adjacent, sometimes reflective ("taste").
- **To enterprises (Recursion):**
  - Topics: what the buyer gets done. Delegation, backlog, finished work, 24/7 coverage, cost per task, governance and audit, integrations with the tools already in use.
  - Proof: a live-looking product demo, telemetry numbers, a head-to-head cost and quality table, compliance badges.
  - CTA: product-trial ("Try Recursion", "Bring us a job").
  - Tone: second person and imperative.
- **Bridge:** one idea links both, that graded runs become training data. Enterprise agent runs are scored, the best runs train specialist models, and the same environment and grader stack serves labs. The homepage literally toggles between the two audiences rather than blending them.

## 10. What Ramanujan should borrow
1. **Split the audience at the hero and in the closing CTA.** Use "For businesses" now and add "For AI labs" when ready, each with its own one-line promise and its own button. The lab side can honestly list capabilities offered (rubric design, eval sets, RL environment design, preference data) without claiming lab clients.
2. **Show a worked example, clearly labeled.** Build an illustrative engagement spec (goal, data, rubric, eval, acceptance threshold, deliverables) or a sample eval report, marked "example". It shows what working with Ramanujan produces, with no client needed.
3. **Teach the hard problem.** Write a short section like Horizon's reward-signal explainer for Ramanujan's own focus areas: why fine-tunes regress, why evals drift from the real task, why rubrics need atomic criteria. Expertise shown is more credible than expertise claimed.
4. **Write security as concrete practice.** Copy the "Real access... never the keys" structure with practices Ramanujan actually follows: work inside the client's cloud account, scoped credentials, no client data used to train anything else, deletion on close, signed NDA. No badges needed.
5. **Adopt and publish rubric-quality rules.** Use the GIM story's criteria standard (atomic, self-contained, mutually exclusive, collectively exhaustive, easy to verify), plus public vs private held-out splits for contamination checks. Ramanujan can state these as house rules for every dataset it builds.
6. **Pair principles with a founder note.** A short "What we believe" with three principles, a signed founder note, and a "one conviction" story fit the Godfather voice: authority through conviction and craft, not through scale.

## 11. What Ramanujan should avoid
- **Vendor-run head-to-head tables against named frontier models.** Precise resolution, hallucination and cost wins over named models read as invented coming from a studio with no deployments.
- **Mock dashboards with live-looking activity counts.** Avoid things like "144 sessions this week". Any demo must be labeled illustrative and must not imply real traffic.
- **Market-share and network-size claims.** "90%+ of leading labs", "hundreds of AI teams", multi-million expert networks, funding banners: none are available to Ramanujan, and smaller versions ("trusted by teams") would still be unverifiable.
- **Inconsistent numbers across pages.** Labelbox's expert count (2.6M+ vs 4M+), funding total and compliance lists differ between pages. A new studio has even less room for this; keep one source of truth for every claim.
- **Product-name sprawl.** Recursion, Horizon, Terra, Alignerr and WorldSim make sense at Labelbox's size. A zero-client studio with multiple sub-brands looks inflated; use plain service names.
- **Borrowed authority through a big-name story.** The Meta story works because Meta is real. Ramanujan should not write "in the style of" stories, hypothetical client narratives, or competitor "alternative" pages before it has a track record.
- **Over-promising autonomy.** Avoid lines like "nobody has to press go" or "stop prompting" for agent systems until Ramanujan has shipped one; enterprise buyers will test the claim.
