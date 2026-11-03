# Ethara.AI · content audit

- Site: https://www.ethara.ai
- Reviewed: 2026-11-03, pages: / (home), /rlaas, /research, /ots, /contact
- Fetch notes: the site is client-rendered (WebFetch only sees the title), so it was read in a real browser. Animated counters on /rlaas rendered as 0 at capture time.

## 1. Positioning
- Hero headline: "AGI is not born. It is trained."
- Subheadline (paraphrase): Ethara works at the frontier of model training, designing RL environments, feedback systems and evaluation pipelines.
- Category they claim: "Reinforcement Learning as a Service" (they shorten it to RLaaS and use it as the product name and first nav item).
- Primary audience: frontier AI labs and model builders. No enterprise-buyer messaging on the pages reviewed.
- Entity definition (paraphrase): RLaaS is a complete training system of practice environments, expert human feedback and methods that teach models to reason and act rather than recall.

## 2. Homepage architecture
1. Hero: provocative two-line headline, one sober paragraph, two CTAs (product, research).
2. Category band: the full category name spelled out in caps.
3. "Observation": a one-sentence point of view (progress comes from the quality of training environments, not model size).
4. "Our process": five numbered steps in a loop (benchmark dataset, custom harness, custom inferencing, system and rubric evaluation, retrain model).
5. "Our Training RL ENVs": a tabbed showcase of seven named environments (MILO-Bench, Kaiju, Raiden, Zoro, Rinzler, Kang, Mephisto). Each tab has a spec paragraph, a Challenge / Cure / Goal triplet, a simulated live agent terminal and spec chips (languages, Docker, test oracles).
6. CTA band: "Is your model truly intelligent?" with "Train your model".
7. Manifesto: a long-form essay on why the field is moving from supervised learning to agentic RL, ending with the brand line.
8. Contact CTA plus a third-party recognition badge (LinkedIn Top Startups 2026, India).
9. Footer: Products / Company / Resources / Follow, plus privacy, terms and cookie policies.

## 3. Navigation and site map
Top nav: RLaaS, Research, OTS (off-the-shelf datasets), Blog, Careers, Contact. No pricing, no industries, no "solutions" menu. Footer adds Privacy Policy, Terms of Service, Cookies Policy.

## 4. Voice and tone
- Five adjectives: declarative, visionary, technical, educational, calm.
- Sentence style: very short manifesto lines on the home page ("X is not Y. It is Z." pattern), then full explanatory sentences on product pages. Section labels in small caps.
- Person: mostly "we"; "your model" in CTAs.
- Jargon: high but always explained. SFT, RLHF, rubrics, reward model, RL environments, verifiers, test oracles, long-horizon, hermetic Docker.
- Numbers: precise and specific rather than inflated: languages covered, pull requests per task, edit sites, runs per model, frontier model names. One scale claim (millions of hours of training data delivered to labs).
- Typical lines (paraphrased): a thesis stated as an observation; a method explained as "what it is, why it matters, how we do it"; contrasts like specialists vs crowd workers, demonstrations vs labels.

## 5. Trust signals
| Signal | Present? | How it is presented |
|---|---|---|
| Customer / lab logos | No | Labs referenced generically ("the labs shaping today's frontier models") |
| Named case studies with metrics | No | Replaced by a benchmark sample with results across three frontier models |
| Certifications | Not on pages reviewed | |
| Security / trust page | No | Only privacy, terms and cookie policies |
| Research, benchmarks | Yes | Own benchmark sample (MILO-Bench) with a pass-rate-by-difficulty chart, plus a curated library of ~20 third-party papers grouped by topic |
| Leadership / team | Not on pages reviewed | |
| Investors / funding | No | |
| Partners | No | |
| Workforce / scale claims | Yes, one | "Six million hours" of training data delivered (self-described) |
| Methodology explained | Yes, heavily | Process loop on home; SFT, RLHF, rubrics and RL environments each explained in three short blocks on /rlaas |
| Press / awards | Yes | LinkedIn Top Startups 2026 badge linking to LinkedIn |
| Physical presence | Yes | Full office address in Gurugram, landline, email, map link on /contact |
| Post-form expectations | Yes | Three numbered next steps: consultation within 24 hours, custom proposal, pilot project |

## 6. How they earn trust without logos
- Teaching: every method is explained plainly (what it is, why it matters, how they do it), which signals expertise.
- Showing the work: named, specified environments and a real results chart make capability concrete without a client name.
- A point of view: the "Observation" line and the manifesto make them sound like a research team, not a vendor.
- Curation: the paper library associates the brand with the field's literature (clearly third-party).
- Physical and procedural transparency: address, landline, what happens after you submit.

## 7. Vocabulary
reinforcement learning as a service, RL environments, training gyms, feedback systems, evaluation pipelines, frontier, AGI, post-training, supervised fine-tuning, RLHF, rubrics, reward model, preference data, domain experts, specialists, verifiable outcomes, execution-based scoring, long-horizon, agentic, harness, inferencing, benchmark, pass rate, hermetic, test oracles, generalise, reason and act.

## 8. Calls to action
"Explore RLaaS", "View Research", "Train Your Model", "Get in Touch", "Let's Connect", "Send Message". Contact form fields: first name, last name, email, company, query type (RLaaS / Research / OTS / Careers / Others), message.

## 9. Lab vs enterprise messaging
Lab-only. The enterprise angle appears only inside environment descriptions (retail, startup strategy, financial analyst tasks) as training domains, not as a buyer.

## 10. What Ramanujan should borrow
1. **Provocative brand line, sober paragraph.** "AGI is not born. It is trained." works because the paragraph under it is calm and specific. Ramanujan can keep "AI has a godfather." and pair it with a measured, factual subhead.
2. **A stated point of view.** One "Observation" sentence and a short principles/manifesto section make a new studio sound like a research team. This needs no clients.
3. **Explain every method in three beats** (what it is, why it matters, how we do it) for SFT, LoRA, preference tuning (DPO/RLHF), rubrics, evals, RL environments and agents.
4. **A Research page that is honest from day one**: a curated, clearly attributed paper library by topic, and later a small open benchmark or eval of our own.
5. **"What happens next" on every form**: our 24-hour plan/price/verdict promise as three numbered steps.
6. **Physical and legal presence**: company address, registration and a real contact address once they exist.

## 11. What Ramanujan should avoid
- Scale claims we cannot back (hours delivered, expert counts) and animated counters with no real numbers behind them.
- Codenamed "products" or environments that do not exist yet.
- Implying lab relationships. "Frontier-ready" methods language is fine; "trusted by frontier labs" is not.
