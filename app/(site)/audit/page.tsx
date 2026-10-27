import Link from 'next/link';
import Breadcrumbs from '@/components/content/Breadcrumbs';
import FaqList from '@/components/content/FaqList';
import JsonLd from '@/components/content/JsonLd';
import Audit from '@/components/tools/Audit';
import type { Faq } from '@/data/content/types';
import { appLd, breadcrumbLd, faqLd, graph, pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/site';

const path = '/audit';

export const metadata = pageMeta({
  title: 'Free AI Audit: Fine-Tuning, RAG or AI Agents?',
  description: 'Answer 8 quick questions and get an instant verdict: prompting, RAG, fine-tuning, AI agents or automation, plus an AI readiness score and a build plan.',
  path,
  eyebrow: 'Free AI audit · 2 minutes',
  keywords: ['AI readiness assessment', 'free AI audit', 'do I need fine-tuning', 'fine-tuning or RAG', 'AI agents for my business'],
});

const faqs: Faq[] = [
  {
    q: 'What does the free AI audit tell me?',
    a: `The ${SITE.name} AI audit recommends the right first build for your goal (prompting, retrieval-augmented generation, fine-tuning, AI agents or plain automation), gives an AI readiness score out of 100 based on your data, volume, sensitivity and timeline, and lists the first four steps to take.`,
  },
  {
    q: 'Is the AI audit really free?',
    a: `Yes. The recommendation and readiness score appear instantly with no email required. If you want a one-page build plan and a fixed price, you can leave your email and ${SITE.name} replies within 24 hours.`,
  },
  {
    q: 'How is the AI readiness score calculated?',
    a: 'The AI readiness score weighs the data you already have (35 points), how often the system will run (20), how sensitive the data is (15), how soon you need it (15) and whether the goal is clearly defined (15). Above 70 means ready to build now.',
  },
];

export default function Page() {
  const trail: [string, string][] = [['Free AI audit', path]];
  return (
    <div className="mx-auto max-w-6xl px-gutter pt-[124px] pb-24">
      <JsonLd data={graph(appLd('Free AI audit', 'An 8-question assessment that recommends prompting, RAG, fine-tuning, agents or automation and scores AI readiness.', path), breadcrumbLd(trail), faqLd(faqs))} />
      <Breadcrumbs trail={trail} />
      <header className="mb-14 max-w-4xl">
        <p className="eyebrow mb-6">Free AI audit · 2 minutes</p>
        <h1 className="doc-title">Find out exactly what AI you should build first.</h1>
        <p className="lead mt-6">Eight questions. An instant verdict: prompting, RAG, fine-tuning, agents or plain automation. No email needed to see your result.</p>
      </header>
      <Audit />
      <div className="mt-24 max-w-3xl">
        <FaqList faqs={faqs} title="About the audit" />
        <p className="mt-12 text-bone-3">
          Prefer to do the maths yourself? Try the{' '}
          <Link href="/tools/fine-tuning-cost-calculator" className="ilink">
            fine-tuning cost calculator
          </Link>{' '}
          or browse the{' '}
          <Link href="/guides" className="ilink">
            guides
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
