import { notFound } from 'next/navigation';
import DocPage from '@/components/content/DocPage';
import Rich from '@/components/content/Rich';
import { cardFor, getService, serviceDocs } from '@/data/content';
import { breadcrumbLd, faqLd, graph, pageMeta, serviceLd } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => serviceDocs.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: Props) {
  const doc = getService((await params).slug);
  if (!doc) return {};
  return pageMeta({ title: doc.seoTitle, description: doc.description, path: `/services/${doc.slug}`, eyebrow: doc.eyebrow, keywords: doc.keywords });
}

export default async function Page({ params }: Props) {
  const doc = getService((await params).slug);
  if (!doc) notFound();
  const path = `/services/${doc.slug}`;
  const card = cardFor(doc.serviceIndex);
  const trail: [string, string][] = [
    ['Services', '/services'],
    [doc.seoTitle, path],
  ];

  return (
    <DocPage doc={doc} trail={trail} jsonLd={graph(serviceLd(doc, path), breadcrumbLd(trail), faqLd(doc.faqs))}>
      <section aria-label="At a glance" className="mb-16 flex flex-col gap-8">
        {card && <div className="svc-art is-in aspect-[4/3] max-w-xl" aria-hidden="true" dangerouslySetInnerHTML={{ __html: card.art }} />}
        <dl className="spec">
          <div>
            <dt>Timeline</dt>
            <dd>{doc.timeline}</dd>
          </div>
          <div>
            <dt>Ideal for</dt>
            <dd>
              <ul className="grid gap-1">
                {doc.idealFor.map((x, i) => (
                  <li key={i}>
                    <Rich text={x} />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          {card && (
            <div>
              <dt>Typical stack</dt>
              <dd>{card.tools.join(' · ')}</dd>
            </div>
          )}
        </dl>
        <div>
          <h2 className="eyebrow mb-5">What you walk away with</h2>
          <ul className="facts">
            {doc.deliverables.map((x, i) => (
              <li key={i}>
                <Rich text={x} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </DocPage>
  );
}
