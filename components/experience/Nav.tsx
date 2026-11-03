'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import Magnetic from '@/components/ui/Magnetic';
import { SITE } from '@/lib/site';

const LINKS = [
  ['#story', 'Story'],
  ['#services', 'Services'],
  ['#process', 'Process'],
  ['#faq', 'FAQ'],
];

/** DESIGN.md top-nav: transparent, mono links left, tracked wordmark centred, outline pill right. */
export default function Nav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${hidden ? 'is-hidden' : ''}`}>
      <nav className="hidden items-center gap-8 lg:col-start-1 lg:flex" aria-label="Primary">
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} className="nav__link">
            {label}
          </a>
        ))}
      </nav>
      <a href="#top" className="col-start-1 flex items-center gap-3 justify-self-start lg:col-start-2 lg:justify-self-center" aria-label={`${SITE.name} home`}>
        <Logo className="h-6 w-6" />
        <span className="nav__wordmark">{SITE.name}</span>
      </a>
      <div className="col-start-3 justify-self-end">
        <Magnetic href="#contact" className="btn btn--sm">
          <span className="hidden sm:inline">Talk to our team</span>
          <span className="sm:hidden">Contact</span>
        </Magnetic>
      </div>
    </header>
  );
}
