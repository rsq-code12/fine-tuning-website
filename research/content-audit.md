# How RL and post-training leaders write, and what Ramanujan should change

Phase 1 of the tone rewrite · 2026-11-03 · Sources: ten site audits in `research/competitors/` (about 29k words of notes, 130+ pages read). All competitor claims below are self-described by those companies.

## Bottom line

1. **Every credible brand in this category allows itself one bold line and writes everything else plainly.** Turing repeats one mission line on every page. Ethara opens with "AGI is not born. It is trained." and follows it with a calm, specific paragraph. Snorkel pairs one contrast line with procedural copy. "The Godfathers of Applied AI" can be our one bold line. Today we add swagger to every paragraph, and that is what reads as un-corporate.
2. **Trust comes from method, not adjectives.** The pages that read most credible have no logos at all. They show numbered processes, quality controls, held-out test sets, rubrics, reviewer calibration and published experiments. A studio with no clients can do all of that honestly from day one.
3. **Labs and businesses get separate doors and separate vocabularies under one brand.** Labelbox has an audience toggle, micro1 has two products (Realm for labs, Cortex for enterprises), and Turing and Mercor each have a "Frontier AI" door and an "Enterprise" door. Lab copy sells deliverables (data, environments, verifiers, evals). Enterprise copy sells outcomes and ownership.
4. **Security and data handling are written as architecture, and the honest ones win.** Turing, Surge and micro1 have no security page at all. A plain page saying where data lives, who sees it, how long it's kept and what you own would put us ahead of them, with no certification needed.
5. **Their proof layer is the part we must not copy:** logo walls, "trusted by", unnamed "frontier lab" testimonials, workforce counts, market-share claims, certification badges, funding and press. Even these leaders undercut themselves with inconsistent numbers (Labelbox 2.6M vs 4M experts, Invisible 24k vs 22M, Toloka 12-37x vs 30x).

## The ten sites at a glance

| Company | How the hero reads | Category they claim | Audiences | Main CTA | Security page | Proof without clients |
|---|---|---|---|---|---|---|
| Turing | Plain nouns ("Frontier AI", "Enterprise AI"), one mission line on every page | None; uses a capability triad | Labs + enterprise, separate doors | "Request dataset samples" / "Work with us" | None (404) | Dataset cards with task counts and model scores; process promises in FAQs |
| Ethara.AI | "AGI is not born. It is trained." | Reinforcement Learning as a Service | Labs | "Explore RLaaS", "Get in touch" | None | Own benchmark with results chart; curated paper library; office address and landline |
| Scale AI | One institutional sentence about reliable AI | Reliable AI systems | Labs, enterprise, government | "Book a Demo" | Yes, plus trust center | Public leaderboards with methodology |
| Surge AI | "Smart ≠ Useful", manifesto style | Human intelligence for AGI | Labs first, enterprise page | "Talk to our team" | None | Published before/after training runs on open models; public data audits |
| Invisible | Two-beat lines ("Artificial intelligence. Real outcomes.") | Applied AI research company | Labs + enterprise | "Book a demo" | Badges only | "How we work" in four steps plus stated principles |
| Mercor | One thesis sentence, then four intent links | AI data company | Labs, enterprise, experts | "Get in touch", "Talk to research" | Trust center plus an incident write-up | Open benchmark with paper, code and a methodology card |
| Snorkel AI | "We build the data that pushes the frontier." | The Frontier AI Data Lab | Labs lead, enterprise below | "Request dataset samples" | Trust center | Six named quality controls; reviewer calibration explained |
| Labelbox | "Where AI learns to do real work" | Post-training environments, managed agents | Explicit toggle | "Try Recursion" | Written as architecture | Sample job spec; reward-signal explainer |
| micro1 | "Data lab to train frontier models & evaluate agents" | Data lab | Realm (labs), Cortex (enterprise) | "Get in touch" | None | Numbered improvement loop; candid engineering posts |
| Toloka | "Training data for AI agents and LLMs" | Training data, expert data | Labs + enterprise pages | "Talk to an expert" | Security and privacy portal | Quality Loop, written quality agreement, enterprise fine-tuning page |

## Ten patterns that make these brands read as corporate and trustworthy

1. **One bold line, plain everything else.** One signature line per site, repeated. Headlines elsewhere are plain nouns or a single exact sentence.
2. **A literal definition, repeated.** micro1 says "data lab" on every page; Scale says "reliable" in the hero, About, Security and footer. Buyers and AI answer engines both learn the category from repetition.
3. **Two doors, two vocabularies.**
   - Lab copy: post-training, RL environments, verifiers, rubrics, trajectories, evals, held-out splits.
   - Enterprise copy: pilot to production, ownership, no lock-in, your data stays with you, start with one workflow.
4. **Method as proof.** Numbered processes (micro1's loop, Invisible's four steps, Ethara's five-step cycle), named quality controls (Snorkel), quality agreements with targets (Toloka), and methods explained in three beats: what it is, why it matters, how we do it (Ethara).
5. **Research as proof.**
   - A small benchmark of their own with a methodology card (Mercor, Ethara, Turing).
   - Training experiments on open models with before/after scores on held-out tests, including the runs that didn't help (Surge).
   - A curated, clearly attributed paper library (Ethara).
6. **Security as architecture.** Scale's order works well: commitments, then compliance status, then a contact for security issues. Toloka adds privacy sections on product pages (personal-data removal, audit logs, replayable runs).
7. **Concrete service promises.**
   - Turing: samples in about 48 hours, an NDA countersigned in one business day, the client keeps the code and IP.
   - Ethara: three numbered next steps after the form.
   - Toloka: "weights you own" and "send us one workflow".
8. **Inspectable, role-named calls to action.** "Request dataset samples", "Talk to an expert", "Talk to research", "Talk to a data researcher". Nobody serious says "Book a demo" without a product to demo.
9. **Restraint signals seniority.**
   - Toloka trains only what it can justify: fine-tuning first, RL only when the evaluation shows it pays.
   - Surge asks whether the fix is prompting, data or post-training.
   - Mercor helps pick the cheapest model that clears the quality bar.
   - Saying "you may not need fine-tuning" builds more trust than any superlative.
10. **Teaching the hard problem.** Labelbox explains the reward-signal problem. Surge has plain-question guides (what an eval set is, how many examples you need). Explaining why fine-tunes regress or evals drift is itself a credential.

## What we must not copy

| Their move | Why not for us |
|---|---|
| Logo walls, "trusted by", "used by 9 of 10 labs" | No clients yet. Untrue claims destroy trust instantly. |
| Testimonials from "a frontier AI lab" or "a Top 5 telco" | Anonymous proof only works for a brand that already has a reputation. |
| Workforce and scale counts (200,000+ PhDs, 5M+ experts, hours delivered) | Nothing to count, and every leader we audited contradicts its own numbers. |
| Certification badges (SOC 2, ISO 27001) | Only once audited. State the actual status instead. |
| Funding, valuation, press and awards walls | None yet. |
| Vendor-run "we beat GPT" tables | They read as marketing. Publish neutral methodology instead. |
| Codenamed products and animated counters | Empty counters read as fake. |
| Superlatives ("largest", "most experienced", "the standard") | Unverifiable. |
| Mob-boss heritage language beyond the brand word | "Godfather" already implies heritage; more of it sounds hollow (Scale audit). |

## Where our current copy stands

The full "before" copy is in `research/current-copy.md`. The design and structure already match the leaders: a dramatic visual story, a numbered process, a services grid, an FAQ and one closing call to action. The issue is purely tone and missing trust content.

| Current line (home page) | Problem | Direction |
|---|---|---|
| "Everyone else is playing with AI. We bend it to our will..." | Hype and competitor-bashing, says nothing concrete | One plain definition sentence: what we do and for whom |
| "Taking a handful of clients. Not everyone." | A scarcity claim we can't show | Replace with a factual line, or remove |
| "We don't pray. We don't need to." / "Junk gets whacked" / "an AI that prints money" | Slang and money hype | Explain the curation method in plain steps |
| "Billions of reps. No days off." / "No sick days." / "never asks for a raise" | Labour-replacement jokes that put off enterprise buyers | State what the model or agent does and how it is checked |
| "Our clients own theirs." | **Implies existing clients** | "With us, you own yours." |
| "Ten ways we make AI pay up." / "The family business" | Mob puns on top of the brand word | Plain section headline; keep "Godfather" only where it is the brand |
| "Others need quarters. We need weeks." | Comparative claim | "From scoping to a measured pilot in two to six weeks." |
| "Let's make you untouchable." / "(You need us.)" | Hype | Calm, specific closing with what happens next |
| "Often imitated. Never duplicated." / "companies that refuse to be average" | Unverifiable | Footer carries the definition and real contact details |
| "Request a sit-down", "Consider it handled." | Mob idiom; vague | "Talk to our team"; "Thank you. We'll reply within 24 hours with a plan, a price and a verdict." |

Kept as they are: the "Godfather" tagline and hero word, the panther-eye visual story, the Rented vs Owned AI comparison (a strong, honest idea), the five-step process, the 24-hour plan/price/verdict promise and "If you don't need us, we'll say so". That last line is exactly the restraint the leaders use.

**Missing pages that every leader has in some form:**
- **Approach / Methodology:** how we scope, build data, train, evaluate and ship, with quality controls and release gates.
- **Security & Data Handling:** where data lives, NDAs and DPAs, no training on client data for anyone else, deletion on request, ownership of weights, and certification status stated honestly.
- **Research:** a curated, attributed reading list now, and our own small studio experiment or eval later.
- **For AI labs:** a lean second door in lab vocabulary (SFT and preference data, rubric design, RL environments, eval suites). It lists capabilities only, with no claim of lab clients.
- **About / Company:** what we believe (principles), how we work, and real company details once they exist.

## Recommended direction for Phase 2

**One bold line plus a literal definition.** Keep "The Godfathers of Applied AI" as the signature. Directly beneath it, everywhere, put one plain sentence. Three category options for that sentence:
- **A. Applied AI research studio:** closest to Invisible and Snorkel; spans business and lab work.
- **B. Post-training studio:** sharpest for the lab door; narrower for businesses.
- **C. Model training and evaluation partner:** the most corporate, least distinctive.

**Three message pillars**, each provable without clients:
1. **Owned, not rented.** Your data, your model weights, your infrastructure, no lock-in.
2. **Measured before it ships.** Evaluation sets built first, held-out tests, release gates, honest verdicts.
3. **Lab-grade methods for business problems.** Fine-tuning, preference tuning, rubrics, verifiers and RL environments, applied to one workflow at a time.

**Calls to action.**
- Businesses: "Talk to our team" and "Get a plan in 24 hours".
- AI labs: "Discuss a data or eval project".
- Low-commitment: "Take the 2-minute AI audit".

**Proof plan without clients.** Publish the Approach and Security pages at launch. Add sample deliverables (an evaluation report template and a dataset spec) marked "example". Later, run one studio experiment: fine-tune a small open model on public data and report before/after scores on a held-out set, including what didn't work.
