import HubPage from '@/components/content/HubPage';
import { industryDocs } from '@/data/content';
import { pageMeta } from '@/lib/seo';

const intro =
  'Generic AI gives generic answers. Here is where custom models and agents pay off in your industry, which data you need, the compliance lines you cannot cross, and what a first pilot looks like.';

export const metadata = pageMeta({
  title: 'Custom AI by Industry: Fine-Tuned Models & Agents',
  description: 'How law firms, healthcare, finance, insurance, ecommerce, real estate, SaaS, agencies, recruiting and education use fine-tuned models and AI agents.',
  path: '/industries',
  eyebrow: 'Industries',
});

export default function Page() {
  return (
    <HubPage
      path="/industries"
      eyebrow="Industries"
      title="Custom AI for your industry"
      intro={intro}
      items={industryDocs.map((d) => ({ href: `/industries/${d.slug}`, title: d.seoTitle, blurb: d.answer, tag: d.name }))}
    />
  );
}
