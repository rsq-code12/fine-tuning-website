import Link from 'next/link';
import { Arrow } from '@/components/ui/Logo';
import { SITE } from '@/lib/site';

/** The closer on every content page: two doors in, both ending in a qualified lead. */
export default function CtaBand({ heading = 'Stop reading. Start winning.' }: { heading?: string }) {
  return (
    <section className="panel mt-24 flex flex-col items-start gap-8 p-6 md:p-14">
      <p className="eyebrow">Your move</p>
      <h2 className="doc-title max-w-4xl">{heading}</h2>
      <p className="lead">
        {SITE.promises.reply}. If you don&rsquo;t need us, we&rsquo;ll say so. Not sure where to start? The audit takes two minutes and tells you
        exactly what to build first.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Link href="/audit" className="btn btn--lg">
          <span>Free AI audit</span>
          <Arrow />
        </Link>
        <Link href="/#contact" className="link text-mono-xs text-bone-3">
          Or request a sit-down
        </Link>
      </div>
    </section>
  );
}
