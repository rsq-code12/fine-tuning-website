import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';
import CtaBand from './CtaBand';
import JsonLd from './JsonLd';
import { absoluteUrl, brand } from '@/lib/site';
import { breadcrumbLd, graph } from '@/lib/seo';
import { plain } from '@/lib/markdown';

type Item = { href: string; title: string; blurb: string; tag?: string };

type Props = {
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: Item[];
  /** grid of compact cards (glossary) instead of the default two-up */
  dense?: boolean;
};

/** Index page for a content collection, with CollectionPage + ItemList structured data. */
export default function HubPage({ path, eyebrow, title, intro, items, dense }: Props) {
  const name = eyebrow;
  const ld = graph(
    {
      '@type': 'CollectionPage',
      name: brand(title),
      description: plain(intro),
      url: absoluteUrl(path),
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(it.href), name: plain(it.title) })),
      },
    },
    breadcrumbLd([[name, path]])
  );

  return (
    <div className="mx-auto max-w-7xl px-gutter pt-[124px] pb-24">
      <JsonLd data={ld} />
      <Breadcrumbs trail={[[name, path]]} />
      <header className="max-w-5xl">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="doc-title">{brand(title)}</h1>
        <p className="lead mt-8 max-w-3xl">{brand(intro)}</p>
      </header>
      <ul className={`mt-16 grid gap-4 ${dense ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="hub-card h-full">
              {it.tag && <span className="text-mono-xs text-bone-4">{it.tag}</span>}
              <span className="hub-card__title">{plain(it.title)}</span>
              <p>{plain(it.blurb)}</p>
              <span className="mt-auto text-mono-xs text-bone-3">Read →</span>
            </Link>
          </li>
        ))}
      </ul>
      <CtaBand />
    </div>
  );
}
