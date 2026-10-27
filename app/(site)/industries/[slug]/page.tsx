import Link from 'next/link';
import { notFound } from 'next/navigation';
import DocPage from '@/components/content/DocPage';
import Rich from '@/components/content/Rich';
import { getIndustry, getService, industryDocs } from '@/data/content';
import { breadcrumbLd, faqLd, graph, industryLd, pageMeta } from '@/lib/seo';
import { brand } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => industryDocs.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: Props) {
  const doc = getIndustry((await params).slug);
  if (!doc) return {};
  return pageMeta({ title: doc.seoTitle, description: doc.description, path: `/industries/${doc.slug}`, eyebrow: doc.eyebrow, keywords: doc.keywords });
}

export default async function Page({ params }: Props) {
  const doc = getIndustry((await params).slug);
  if (!doc) notFound();
  const path = `/industries/${doc.slug}`;
  const trail: [string, string][] = [
    ['Industries', '/industries'],
    [doc.name, path],
  ];

  return (
    <DocPage doc={doc} trail={trail} jsonLd={graph(industryLd(doc, path), breadcrumbLd(trail), faqLd(doc.faqs))}>
      <section aria-labelledby="use-cases" className="mb-16">
        <h2 id="use-cases" className="eyebrow mb-5">
          Where it pays off
        </h2>
        <dl className="spec">
          {doc.useCases.map((u, i) => (
            <div key={i}>
              <dt>{u.title}</dt>
              <dd>
                <Rich text={u.detail} />
              </dd>
            </div>
          ))}
        </dl>
        {doc.services.length > 0 && (
          <p className="mt-6 text-mono-xs text-bone-4">
            Relevant services:{' '}
            {doc.services.map((s, i) => {
              const svc = getService(s);
              return svc ? (
                <span key={s}>
                  {i > 0 && ' · '}
                  <Link href={`/services/${s}`} className="link text-bone-2">
                    {brand(svc.seoTitle)}
                  </Link>
                </span>
              ) : null;
            })}
          </p>
        )}
      </section>
    </DocPage>
  );
}
