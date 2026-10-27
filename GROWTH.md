# Growth engine

Everything that brings clients to the site without anyone posting, cold-emailing or babysitting it.
Code lives in this repo; switches live in environment variables (see `.env.example`).

## What runs on its own

| System | What it does | Where |
|---|---|---|
| **60 search pages** | 10 service pages, 10 industry pages, 10 long-form guides, 30 glossary terms. Each one targets real buyer searches ("LLM fine-tuning services", "AI for law firms", "cost to fine-tune Llama") | `data/content/*`, `app/(site)/*` |
| **Answer-engine layer (GEO)** | Every page opens with a 40-70 word "short answer", citable key facts, question-shaped headings and self-contained FAQs: the format ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews quote | `components/content/DocPage.tsx` |
| **llms.txt** | `/llms.txt` (curated index), `/llms-full.txt` (whole site in one file) and a Markdown twin of every page (`/guides/llm-fine-tuning-cost.md`) | `lib/llms.ts` |
| **Structured data** | Organization, WebSite, Service, Article, FAQPage, DefinedTerm, BreadcrumbList, WebApplication JSON-LD on every page | `lib/seo.ts` |
| **AI crawlers welcome** | robots.txt explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended and more | `app/robots.ts` |
| **Instant indexing** | IndexNow pings Bing (which feeds ChatGPT search and Copilot), Yandex, Seznam and Naver daily for changed pages | `app/api/cron/indexnow` |
| **Sitemap, RSS, OG cards** | `/sitemap.xml`, `/feed.xml`, auto-generated social card per page at `/og` | `app/sitemap.ts`, `app/feed.xml`, `app/og` |
| **Lead magnets** | Free AI audit (`/audit`) with an instant verdict and readiness score, and a fine-tuning cost calculator. Both rank on their own and end in a lead form | `components/tools/*` |
| **Hot-lead scoring** | Every lead is scored 0-100 on budget, timeline, authority, company size, data and email domain, then tagged HOT / WARM / COLD | `lib/leads/score.ts` |
| **AI lead brief** | With `ANTHROPIC_API_KEY`, each lead arrives with a 2-line brief, fit rating, discovery questions and a ready-to-send reply | `app/api/lead/route.ts` |
| **Lead radar** | Daily scan of Hacker News (plus Reddit and Bluesky when keys are set) for people asking to hire AI help. Ranks by buying intent, drafts a helpful reply for each, suggests guide topics from what people ask | `lib/radar/*`, `app/api/cron/radar` |

## One-time setup (about 20 minutes)

1. **Confirm the brand and domain.** "Weightcraft", the domain and `hello@weightcraft.ai` are placeholders. Change them once in `lib/site.ts`; every page, schema and file follows (content uses a `{{brand}}` token).
2. **Deploy to Vercel** and set `NEXT_PUBLIC_SITE_URL` to the real domain. **Search is off by default** (robots.txt blocks all crawlers, every response is `noindex`). Set `SITE_INDEXABLE=1` and redeploy once the real brand is in: nothing in this file works until you do.
3. **Pick where leads land.** Set `LEAD_WEBHOOK_URL` (Slack, Discord, or a Zapier/Make/n8n hook into your CRM) and/or `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL`. Without either, leads only reach the server log.
4. **Set `CRON_SECRET`** (any long random string). Vercel passes it to the two cron jobs in `vercel.json`.
5. **Set `ANTHROPIC_API_KEY`** for lead briefs, drafted replies and intent ranking. Uses `claude-opus-5-5` with low effort; the radar makes one call per day and each lead makes one call.
6. **Verify the site** in Google Search Console and Bing Webmaster Tools (paste the codes into `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`), then submit `/sitemap.xml` in both.
7. **First IndexNow push:** after the first production deploy, open `/api/cron/indexnow?all=1` with the header `Authorization: Bearer <CRON_SECRET>`.
8. **Optional radar sources:** Reddit (`REDDIT_CLIENT_ID/SECRET`, free script app) and Bluesky (`BSKY_HANDLE` + an app password).
9. **Optional social autopilot:** point Buffer, Zapier or dlvr.it at `/feed.xml` to auto-post every new page to LinkedIn and X.

Test the radar any time: `/api/cron/radar?dry=1&hours=72` (with the bearer header in production) returns the digest as JSON.

## What stays human, on purpose

- **Replies to radar posts.** The radar drafts them; a person sends them. Auto-posting or auto-DMing gets accounts banned on every platform and reads as spam to the exact buyers you want.
- **New content.** The radar's "content ideas" list tells you which guide to write next. Add it as one more object in `data/content/guides-*.ts` and it gets a page, schema, sitemap entry, llms.txt line, RSS item and IndexNow ping automatically.
- **Claims.** The content makes no client, results or pricing claims. Add real case studies and testimonials when you have them: they are the single biggest trust signal for both buyers and answer engines.

## Measuring it

- Search Console: impressions and clicks for `/guides/*`, `/services/*`, `/industries/*`.
- Bing Webmaster Tools: the AI Performance report shows citations in Copilot and Bing AI answers.
- Ask the engines directly every month: "best company to fine-tune an LLM for a law firm", "how much does it cost to fine-tune Llama 70B", and check who gets cited.
- Leads: every notification carries `source`, `page`, `referrer` and UTM tags, so you can see which page produced which deal.
