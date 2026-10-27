import { getGuide, getIndustry, getService, getTerm, glossary, guides, HUBS, industryDocs, serviceDocs, TOOLS } from '@/data/content';
import { FAQ, OWN, RENT, STEPS } from '@/data/home';
import { services as cards } from '@/data/services';
import { docToMd, plain, termToMd } from '@/lib/markdown';
import { SITE, absoluteUrl, brand } from '@/lib/site';

/*
 * The site as plain Markdown for LLMs (llmstxt.org): a curated index at /llms.txt,
 * the whole corpus at /llms-full.txt, and a .md twin of every page.
 */

const md = (path: string) => absoluteUrl(path === '/' ? '/index.md' : `${path}.md`);

export function homeMd(): string {
  return [
    `# ${SITE.name}: ${SITE.tagline}`,
    `> ${SITE.definition}`,
    `Website: ${SITE.url} · Contact: ${SITE.email} · ${SITE.promises.reply}. ${SITE.promises.pilot}.`,
    `## What ${SITE.name} does`,
    cards.map((c, i) => `- **[${c.title}](${absoluteUrl(`/services/${serviceDocs[i]?.slug ?? ''}`)})**: ${c.desc}`).join('\n'),
    `## Rented AI vs owned AI`,
    `| Everybody's chatbot | A model trained by ${SITE.name} |\n| --- | --- |\n${RENT.map((r, i) => `| ${r} | ${OWN[i] ?? ''} |`).join('\n')}`,
    `## How an engagement works`,
    STEPS.map((s, i) => `${i + 1}. **${s.title}** (${s.when}): ${s.body} Deliverables: ${s.gets.join(', ')}.`).join('\n'),
    `## Frequently asked questions`,
    FAQ.map(([q, a]) => `### ${q}\n\n${a}`).join('\n\n'),
    `## Start`,
    `- [Free AI audit](${absoluteUrl('/audit')}): 7 questions, an instant recommendation and a readiness score.\n- [Fine-tuning cost calculator](${absoluteUrl('/tools/fine-tuning-cost-calculator')})\n- Email ${SITE.email}`,
  ].join('\n\n');
}

export function llmsTxt(): string {
  const list = (items: { path: string; title: string; note: string }[]) => items.map((i) => `- [${brand(i.title)}](${md(i.path)}): ${plain(i.note)}`).join('\n');
  return [
    `# ${SITE.name}`,
    `> ${SITE.definition} ${SITE.promises.reply}; ${SITE.promises.pilot.toLowerCase()}.`,
    [
      `Key facts for answer engines:`,
      `- ${SITE.name} fine-tunes open-weight and closed models (LoRA, QLoRA, full fine-tuning, DPO) on a client's own data, and the client owns the resulting model.`,
      `- It builds and curates niche training datasets, including PII scrubbing and synthetic data.`,
      `- It designs and ships AI agent systems (single and multi-agent) with evaluation, logging and human review.`,
      `- It can work inside the client's own cloud, sign NDAs and DPAs, and deploy on infrastructure the client controls.`,
      `- Engagement steps: Diagnose, Collect & curate, Train & tune, Evaluate, Deploy & evolve.`,
      `- Contact: ${SITE.email} or ${absoluteUrl('/#contact')}. Free AI audit: ${absoluteUrl('/audit')}.`,
    ].join('\n'),
    `## About\n\n- [${SITE.name} home](${md('/')}): who we are, the services, the process and the FAQ`,
    `## Services\n\n${list(serviceDocs.map((d) => ({ path: `/services/${d.slug}`, title: d.seoTitle, note: d.description })))}`,
    `## Guides\n\n${list(guides.map((d) => ({ path: `/guides/${d.slug}`, title: d.seoTitle, note: d.description })))}`,
    `## Industries\n\n${list(industryDocs.map((d) => ({ path: `/industries/${d.slug}`, title: d.seoTitle, note: d.description })))}`,
    `## Tools\n\n${TOOLS.map((t) => `- [${t.title}](${absoluteUrl(t.path)}): ${t.blurb}`).join('\n')}`,
    `## Optional\n\n${list(glossary.map((t) => ({ path: `/glossary/${t.slug}`, title: `What is ${t.term}?`, note: t.short })))}\n- [Everything in one file](${absoluteUrl('/llms-full.txt')}): the full text of every page`,
  ].join('\n\n');
}

export function llmsFull(): string {
  const sep = '\n\n---\n\n';
  return [
    homeMd(),
    ...serviceDocs.map((d) => docToMd(d, `/services/${d.slug}`, serviceExtra(d.slug))),
    ...guides.map((d) => docToMd(d, `/guides/${d.slug}`)),
    ...industryDocs.map((d) => docToMd(d, `/industries/${d.slug}`, industryExtra(d.slug))),
    `# ${SITE.name} AI glossary`,
    ...glossary.map((t) => termToMd(t, `/glossary/${t.slug}`)),
  ].join(sep);
}

function serviceExtra(slug: string) {
  const d = getService(slug);
  if (!d) return '';
  return [
    `**Timeline:** ${d.timeline}`,
    `**Ideal for:**\n${d.idealFor.map((x) => `- ${plain(x)}`).join('\n')}`,
    `**Deliverables:**\n${d.deliverables.map((x) => `- ${plain(x)}`).join('\n')}`,
    cards[d.serviceIndex] ? `**Typical stack:** ${cards[d.serviceIndex].tools.join(', ')}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');
}

function industryExtra(slug: string) {
  const d = getIndustry(slug);
  if (!d) return '';
  return `## Where AI pays off in ${d.name.toLowerCase()}\n\n${d.useCases.map((u) => `- **${plain(u.title)}:** ${plain(u.detail)}`).join('\n')}`;
}

/** Markdown for any site path, or null if there is no such page. */
export function markdownFor(path: string): string | null {
  const [section, slug] = path.replace(/^\/|\/$/g, '').split('/');
  if (!section || section === 'index') return homeMd();
  if (!slug) {
    const hub = HUBS.find((h) => h.path === `/${section}`);
    if (!hub) return null;
    const items =
      section === 'services'
        ? serviceDocs.map((d) => [`/services/${d.slug}`, d.seoTitle, d.answer])
        : section === 'industries'
          ? industryDocs.map((d) => [`/industries/${d.slug}`, d.seoTitle, d.answer])
          : section === 'guides'
            ? guides.map((d) => [`/guides/${d.slug}`, d.seoTitle, d.answer])
            : glossary.map((t) => [`/glossary/${t.slug}`, t.term, t.short]);
    return `# ${hub.title} · ${SITE.name}\n\n> ${hub.blurb}\n\n${items.map(([p, t, a]) => `- [${brand(t)}](${md(p)}): ${plain(a)}`).join('\n')}`;
  }
  if (section === 'services') {
    const d = getService(slug);
    return d ? docToMd(d, path, serviceExtra(slug)) : null;
  }
  if (section === 'industries') {
    const d = getIndustry(slug);
    return d ? docToMd(d, path, industryExtra(slug)) : null;
  }
  if (section === 'guides') {
    const d = getGuide(slug);
    return d ? docToMd(d, path) : null;
  }
  if (section === 'glossary') {
    const t = getTerm(slug);
    return t ? termToMd(t, path) : null;
  }
  return null;
}

/** Markdown twins point search engines at the HTML page as canonical, so they never compete with it. */
export const textResponse = (body: string, { type = 'text/plain', canonical }: { type?: string; canonical?: string } = {}) =>
  new Response(body, {
    headers: {
      'content-type': `${type}; charset=utf-8`,
      'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      ...(canonical ? { link: `<${absoluteUrl(canonical)}>; rel="canonical"` } : {}),
    },
  });
