import { notFound } from 'next/navigation';
import DocPage from '@/components/content/DocPage';
import { getGuide, guides } from '@/data/content';
import { articleLd, breadcrumbLd, faqLd, graph, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => guides.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: Props) {
  const doc = getGuide((await params).slug);
  if (!doc) return {};
  return pageMeta({
    title: doc.seoTitle,
    description: doc.description,
    path: `/guides/${doc.slug}`,
    eyebrow: doc.eyebrow,
    keywords: doc.keywords,
    type: 'article',
    modified: doc.updated,
  });
}

export default async function Page({ params }: Props) {
  const doc = getGuide((await params).slug);
  if (!doc) notFound();
  const path = `/guides/${doc.slug}`;
  const trail: [string, string][] = [
    ['Guides', '/guides'],
    [doc.seoTitle, path],
  ];
  return <DocPage doc={doc} trail={trail} jsonLd={graph(articleLd(doc, path), breadcrumbLd(trail), faqLd(doc.faqs))} />;
}
