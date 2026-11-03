import HubPage from '@/components/content/HubPage';
import { serviceDocs } from '@/data/content';
import { pageMeta } from '@/lib/seo';

const intro =
  'Ten ways {{brand}} turns AI into revenue: custom model fine-tuning, niche datasets, agent systems that run your operations, and the automation that ties it together. Every engagement starts with a plan, a price and an honest verdict within 24 hours.';

export const metadata = pageMeta({
  title: 'AI Fine-Tuning & AI Agent Development Services',
  description: 'Custom LLM fine-tuning, training datasets, AI agent systems and automation for businesses. See what each service includes, timelines and when you need it.',
  path: '/services',
  eyebrow: 'Services',
});

export default function Page() {
  return (
    <HubPage
      path="/services"
      eyebrow="Services"
      title="Ten ways we put AI to work"
      intro={intro}
      items={serviceDocs.map((d, i) => ({ href: `/services/${d.slug}`, title: d.seoTitle, blurb: d.answer, tag: String(i + 1).padStart(2, '0') }))}
    />
  );
}
