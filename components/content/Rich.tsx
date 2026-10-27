import Link from 'next/link';
import { parseInline } from '@/lib/markdown';

/** Renders the inline content grammar (**bold**, [label](href), {{brand}}) as React. */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((t, i) =>
        t.kind === 'bold' ? (
          <strong key={i}>{t.text}</strong>
        ) : t.kind === 'link' ? (
          t.href.startsWith('/') ? (
            <Link key={i} href={t.href} className="ilink">
              {t.text}
            </Link>
          ) : (
            <a key={i} href={t.href} className="ilink" rel="noopener" target="_blank">
              {t.text}
            </a>
          )
        ) : (
          <span key={i}>{t.text}</span>
        )
      )}
    </>
  );
}
