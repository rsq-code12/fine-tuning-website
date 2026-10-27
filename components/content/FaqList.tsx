import type { Faq } from '@/data/content/types';
import Rich from './Rich';

/** Native <details>: answers stay in the HTML for crawlers, and it works without JavaScript. */
export default function FaqList({ faqs, title = 'Frequently asked questions' }: { faqs: Faq[]; title?: string }) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby="faq" className="mt-20">
      <h2 id="faq" className="doc-h2 mb-6">
        {title}
      </h2>
      <div>
        {faqs.map((f, i) => (
          <details key={i} className="faq-item" open={i === 0}>
            <summary>
              <span>
                <Rich text={f.q} />
              </span>
              <span className="faq-item__icon" aria-hidden="true">
                +
              </span>
            </summary>
            <p>
              <Rich text={f.a} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
