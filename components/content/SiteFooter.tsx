import Link from 'next/link';
import { serviceDocs, industryDocs, guides, TOOLS } from '@/data/content';
import { SITE, brand } from '@/lib/site';

/** Dense, crawlable footer: every hub links to every page, so no page is ever more than two clicks from any other. */
export default function SiteFooter() {
  const cols: [string, [string, string][]][] = [
    ['Services', serviceDocs.map((d) => [`/services/${d.slug}`, brand(d.seoTitle)])],
    ['Industries', industryDocs.map((d) => [`/industries/${d.slug}`, `AI for ${d.name.toLowerCase()}`])],
    ['Guides', guides.map((d) => [`/guides/${d.slug}`, brand(d.seoTitle)])],
    [
      'Tools',
      [
        ...TOOLS.map((t) => [t.path, t.title] as [string, string]),
        ['/glossary', 'AI glossary'],
        ['/', 'The story'],
        ['/#contact', 'Talk to our team'],
      ],
    ],
  ];

  return (
    <footer className="relative border-t border-line px-gutter pt-20 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {cols.map(([title, links]) => (
            <nav key={title} aria-label={title} className="flex flex-col items-start gap-2.5">
              <p className="eyebrow mb-3">{title}</p>
              {links.map(([href, label]) => (
                <Link key={href} href={href} className="link text-[0.98rem] leading-snug text-bone-3 hover:text-bone">
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <p className="mt-16 max-w-2xl text-bone-4">{SITE.definition}</p>
        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-mono-xs text-bone-5">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>Often imitated. Never duplicated.</span>
          <a href="/llms.txt" className="link">
            llms.txt
          </a>
        </div>
      </div>
    </footer>
  );
}
