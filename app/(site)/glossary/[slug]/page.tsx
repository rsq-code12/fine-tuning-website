import Link from 'next/link';
import { notFound } from 'next/navigation';
import Blocks from '@/components/content/Blocks';
import Breadcrumbs from '@/components/content/Breadcrumbs';
import CtaBand from '@/components/content/CtaBand';
import JsonLd from '@/components/content/JsonLd';
import Rich from '@/components/content/Rich';
import { getTerm, glossary, titleFor } from '@/data/content';
import { breadcrumbLd, graph, pageMeta, termLd } from '@/lib/seo';
import { brand } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => glossary.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: Props) {
  const t = getTerm((await params).slug);
  if (!t) return {};
  return pageMeta({
    title: `What is ${t.term}?${t.aka ? ` (${t.aka})` : ''}`.slice(0, 70),
    description: t.short,
    path: `/glossary/${t.slug}`,
    eyebrow: 'AI glossary',
    keywords: [t.term, ...(t.aka ? [t.aka] : []), `what is ${t.term.toLowerCase()}`, `${t.term.toLowerCase()} meaning`],
  });
}

export default async function Page({ params }: Props) {
  const t = getTerm((await params).slug);
  if (!t) notFound();
  const path = `/glossary/${t.slug}`;
  const trail: [string, string][] = [
    ['Glossary', '/glossary'],
    [t.term, path],
  ];

  return (
    <article className="mx-auto max-w-4xl px-gutter pt-[124px] pb-24">
      <JsonLd data={graph(termLd(t, path), breadcrumbLd(trail))} />
      <Breadcrumbs trail={trail} />
      <p className="eyebrow mb-6">AI glossary{t.aka ? ` · ${brand(t.aka)}` : ''}</p>
      <h1 className="doc-title">What is {brand(t.term)}?</h1>
      <section aria-label="Definition" className="answer mt-12">
        <p className="answer__label">Definition</p>
        <p className="answer__text">
          <Rich text={t.short} />
        </p>
      </section>
      <div className="mt-12">
        <Blocks blocks={t.body} />
      </div>
      <nav aria-label="Related terms" className="mt-16 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Related terms</p>
          <ul className="related">
            {t.related.map((s) => {
              const r = getTerm(s);
              return r ? (
                <li key={s}>
                  <Link href={`/glossary/${s}`}>
                    <span>{brand(r.term)}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Go deeper</p>
          <ul className="related">
            {t.seeAlso.map((href) => (
              <li key={href}>
                <Link href={href}>
                  <span>{titleFor(href) ?? href}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <CtaBand heading="Now you speak the language. Let's build." />
    </article>
  );
}
