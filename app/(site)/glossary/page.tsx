import HubPage from '@/components/content/HubPage';
import { glossary } from '@/data/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'AI Glossary: Fine-Tuning, LoRA, RAG & Agents Explained',
  description: 'Plain-English definitions of 30 AI terms buyers hear in every sales call: fine-tuning, LoRA, QLoRA, RAG, embeddings, agents, MCP, evals, distillation and more.',
  path: '/glossary',
  eyebrow: 'Glossary',
});

export default function Page() {
  const terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <HubPage
      path="/glossary"
      eyebrow="Glossary"
      title="AI terms, defined plainly"
      intro="Every word vendors use to sound expensive, defined in one or two sentences you can repeat in a board meeting."
      items={terms.map((t) => ({ href: `/glossary/${t.slug}`, title: t.term, blurb: t.short, tag: t.aka }))}
      dense
    />
  );
}
