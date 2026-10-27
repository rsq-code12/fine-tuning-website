import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { SITE } from '@/lib/site';

const LINKS = [
  ['/services', 'Services'],
  ['/industries', 'Industries'],
  ['/guides', 'Guides'],
  ['/tools/fine-tuning-cost-calculator', 'Calculator'],
];

/** Content-page header: same anatomy as the home nav (DESIGN.md), on a solid canvas since there are no particles here. */
export default function SiteHeader() {
  return (
    <header className="nav border-b border-line bg-ink">
      <nav className="hidden items-center gap-8 whitespace-nowrap xl:col-start-1 xl:flex" aria-label="Primary">
        {LINKS.map(([href, label]) => (
          <Link key={href} href={href} className="nav__link">
            {label}
          </Link>
        ))}
      </nav>
      <Link href="/" className="col-start-1 flex items-center gap-3 justify-self-start xl:col-start-2 xl:justify-self-center" aria-label={`${SITE.name} home`}>
        <Logo className="h-6 w-6" />
        <span className="nav__wordmark">{SITE.name}</span>
      </Link>
      <div className="col-start-3 justify-self-end">
        <Link href="/audit" className="btn btn--sm">
          <span className="hidden sm:inline">Free AI audit</span>
          <span className="sm:hidden">AI audit</span>
        </Link>
      </div>
    </header>
  );
}
