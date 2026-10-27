'use client';

import { useEffect, useState } from 'react';
import { experience } from '@/lib/experience';

const CHAPTERS = [
  ['#top', 'Intro'],
  ['#story', 'Noise'],
  ['#data', 'Data'],
  ['#learn', 'Training'],
  ['#finetune', 'Fine-tune'],
  ['#act', 'Agents'],
  ['#services', 'Services'],
  ['#process', 'Process'],
  ['#contact', 'Contact'],
];

export default function Rail() {
  const [active, setActive] = useState(0);
  useEffect(() => experience.onChapter(setActive), []);

  return (
    <nav className="rail hidden xl:flex" aria-label="Chapters">
      {CHAPTERS.map(([href, label], i) => (
        <a key={href} href={href} className={i === active ? 'is-active' : ''} aria-current={i === active ? 'step' : undefined}>
          <span>{label}</span>
          <i />
        </a>
      ))}
    </nav>
  );
}
