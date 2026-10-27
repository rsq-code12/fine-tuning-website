import Link from 'next/link';
import { brand } from '@/lib/site';

export default function Breadcrumbs({ trail }: { trail: [string, string][] }) {
  const all: [string, string][] = [['Home', '/'], ...trail];
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-mono-xs text-bone-4">
        {all.map(([name, path], i) => (
          <li key={path} className="flex items-center gap-3">
            {i > 0 && <span className="text-bone-5">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-bone-3">
                {brand(name)}
              </span>
            ) : (
              <Link href={path} className="link hover:text-bone">
                {brand(name)}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
