import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Doc } from '@/data/content/types';
import { titleFor } from '@/data/content';
import { brand } from '@/lib/site';
import Blocks, { slugify } from './Blocks';
import Breadcrumbs from './Breadcrumbs';
import CtaBand from './CtaBand';
import FaqList from './FaqList';
import JsonLd from './JsonLd';
import Rich from './Rich';

const words = (doc: Doc) =>
  JSON.stringify([doc.answer, doc.body, doc.faqs])
    .split(/\s+/)
    .filter(Boolean).length;

const fmtDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

const labelFor = (href: string) => {
  const [, section, slug] = href.split('/');
  if (!slug) return href;
  const name = slug.replace(/-/g, ' ');
  return `${section === 'glossary' ? 'What is' : section === 'industries' ? 'AI for' : ''} ${name}`.trim();
};

type Props = {
  doc: Doc;
  trail: [string, string][];
  jsonLd: object;
  /** rendered between the key facts and the body (spec cells, use cases...) */
  children?: ReactNode;
};

/**
 * The template behind every service, industry and guide page. The order is deliberate for answer engines:
 * a direct answer first, then citable facts, then depth, then FAQs, all in server-rendered HTML.
 */
export default function DocPage({ doc, trail, jsonLd, children }: Props) {
  const toc = doc.body.filter((b) => b.type === 'h2') as { type: 'h2'; text: string }[];
  const minutes = Math.max(2, Math.round(words(doc) / 230));

  return (
    <article className="mx-auto max-w-7xl px-gutter pt-[124px] pb-24">
      <JsonLd data={jsonLd} />
      <Breadcrumbs trail={trail} />

      <header className="max-w-5xl">
        <p className="eyebrow mb-6">{brand(doc.eyebrow)}</p>
        <h1 className="doc-title">{brand(doc.title)}</h1>
        <p className="mt-6 text-mono-xs text-bone-4">
          Updated <time dateTime={doc.updated}>{fmtDate(doc.updated)}</time> · {minutes} min read
        </p>
      </header>

      <section aria-label="Short answer" className="answer mt-12 max-w-4xl">
        <p className="answer__label">Short answer</p>
        <p className="answer__text">
          <Rich text={doc.answer} />
        </p>
      </section>

      <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 max-w-3xl">
          {doc.facts.length > 0 && (
            <section aria-labelledby="key-facts" className="mb-16">
              <h2 id="key-facts" className="eyebrow mb-5">
                Key facts
              </h2>
              <ul className="facts">
                {doc.facts.map((f, i) => (
                  <li key={i}>
                    <Rich text={f} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {children}

          <Blocks blocks={doc.body} />
          <FaqList faqs={doc.faqs} />

          {doc.related.length > 0 && (
            <nav aria-labelledby="related" className="mt-20">
              <h2 id="related" className="eyebrow mb-5">
                Keep reading
              </h2>
              <ul className="related">
                {doc.related.map((href) => (
                  <li key={href}>
                    <Link href={href}>
                      <span>{titleFor(href) ?? labelFor(href)}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-10">
            {toc.length > 2 && (
              <nav aria-label="On this page">
                <p className="eyebrow mb-4">On this page</p>
                <ol className="toc">
                  {toc.map((h) => (
                    <li key={h.text}>
                      <a href={`#${slugify(h.text)}`}>{brand(h.text).replace(/\*\*|\[|\]\([^)]*\)/g, '')}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="panel flex flex-col gap-4 p-6">
              <p className="eyebrow">2 minutes</p>
              <p className="font-display text-xl font-semibold uppercase leading-tight">Find out what you should build first.</p>
              <Link href="/audit" className="btn btn--sm self-start">
                Free AI audit
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <CtaBand />
    </article>
  );
}
