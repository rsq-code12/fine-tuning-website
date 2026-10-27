import type { Block, Doc, Faq, GlossaryTerm } from '@/data/content/types';
import { absoluteUrl, brand } from '@/lib/site';

/*
 * The content blocks as Markdown: powers the .md twin of every page, llms-full.txt and the RSS bodies.
 * Inline syntax is already Markdown (**bold**, [label](/path)), so only relative links need absolutising.
 */

export type Inline = { kind: 'text'; text: string } | { kind: 'bold'; text: string } | { kind: 'link'; text: string; href: string };

/** Tokenise the small inline grammar: **bold** and [label](href). */
export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const m of brand(src).matchAll(re)) {
    if (m.index! > last) out.push({ kind: 'text', text: brand(src).slice(last, m.index) });
    if (m[1] !== undefined) out.push({ kind: 'bold', text: m[1] });
    else out.push({ kind: 'link', text: m[2], href: m[3] });
    last = m.index! + m[0].length;
  }
  const s = brand(src);
  if (last < s.length) out.push({ kind: 'text', text: s.slice(last) });
  return out;
}

/** Plain text with all markup removed (meta descriptions, JSON-LD, feeds). */
export const plain = (src: string) =>
  parseInline(src)
    .map((t) => t.text)
    .join('');

const abs = (href: string) => (href.startsWith('/') ? absoluteUrl(href) : href);

const inlineMd = (src: string) =>
  parseInline(src)
    .map((t) => (t.kind === 'bold' ? `**${t.text}**` : t.kind === 'link' ? `[${t.text}](${abs(t.href)})` : t.text))
    .join('');

const cell = (s: string) => inlineMd(s).replaceAll('|', '\\|');

export function blocksToMd(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'h2':
          return `## ${inlineMd(b.text)}`;
        case 'h3':
          return `### ${inlineMd(b.text)}`;
        case 'p':
          return inlineMd(b.text);
        case 'ul':
          return b.items.map((i) => `- ${inlineMd(i)}`).join('\n');
        case 'ol':
          return b.items.map((i, n) => `${n + 1}. ${inlineMd(i)}`).join('\n');
        case 'callout':
          return `> **${b.title ? inlineMd(b.title) : 'Key point'}:** ${inlineMd(b.text)}`;
        case 'table':
          return [
            b.caption ? `*${inlineMd(b.caption)}*\n` : '',
            `| ${b.head.map(cell).join(' | ')} |`,
            `| ${b.head.map(() => '---').join(' | ')} |`,
            ...b.rows.map((r) => `| ${r.map(cell).join(' | ')} |`),
          ].join('\n');
      }
    })
    .join('\n\n');
}

const faqsToMd = (faqs: Faq[]) => (faqs.length ? `## Frequently asked questions\n\n${faqs.map((f) => `### ${inlineMd(f.q)}\n\n${inlineMd(f.a)}`).join('\n\n')}` : '');

export function docToMd(doc: Doc, path: string, extra = ''): string {
  return [
    `# ${brand(doc.title)}`,
    `> ${inlineMd(doc.answer)}`,
    `Source: ${absoluteUrl(path)} · Updated ${doc.updated}`,
    doc.facts.length ? `## Key facts\n\n${doc.facts.map((f) => `- ${inlineMd(f)}`).join('\n')}` : '',
    extra,
    blocksToMd(doc.body),
    faqsToMd(doc.faqs),
  ]
    .filter(Boolean)
    .join('\n\n');
}

export function termToMd(t: GlossaryTerm, path: string): string {
  return [
    `# ${brand(t.term)}${t.aka ? ` (${brand(t.aka)})` : ''}`,
    `> ${inlineMd(t.short)}`,
    `Source: ${absoluteUrl(path)}`,
    blocksToMd(t.body),
  ].join('\n\n');
}
