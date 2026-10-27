import HubPage from '@/components/content/HubPage';
import { guides } from '@/data/content';
import { pageMeta } from '@/lib/seo';

const intro =
  'Straight answers to the questions every buyer asks before spending a dollar on AI: what fine-tuning costs, how much data you need, whether your data is safe, which model to pick, and how to choose a partner.';

export const metadata = pageMeta({
  title: 'AI Fine-Tuning & AI Agent Guides for Business',
  description: 'Plain-English guides on LLM fine-tuning cost, training data, LoRA, RAG vs fine-tuning, data privacy, open vs closed models, and AI agents for business.',
  path: '/guides',
  eyebrow: 'Guides',
});

export default function Page() {
  return (
    <HubPage
      path="/guides"
      eyebrow="Guides"
      title="The answers vendors dance around"
      intro={intro}
      items={guides.map((d) => ({ href: `/guides/${d.slug}`, title: d.seoTitle, blurb: d.answer, tag: d.eyebrow.replace(/^Guide · /, '') }))}
    />
  );
}
