import Experience from '@/components/experience/Experience';
import Nav from '@/components/experience/Nav';
import Hero from '@/components/sections/Hero';
import Noise from '@/components/sections/Noise';
import DataChapter from '@/components/sections/DataChapter';
import Training from '@/components/sections/Training';
import FineTune from '@/components/sections/FineTune';
import Agents from '@/components/sections/Agents';
import Statement from '@/components/sections/Statement';
import Versus from '@/components/sections/Versus';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Stack from '@/components/sections/Stack';
import Faq from '@/components/sections/Faq';
import Cta from '@/components/sections/Cta';
import Footer from '@/components/sections/Footer';
import WordWarp from '@/components/sections/WordWarp';
import JsonLd from '@/components/content/JsonLd';
import { serviceDocs } from '@/data/content';
import { FAQ } from '@/data/home';
import { faqLd, graph } from '@/lib/seo';
import { SITE, absoluteUrl } from '@/lib/site';

const homeLd = graph(
  {
    '@type': 'WebPage',
    '@id': `${SITE.url}/#home`,
    url: SITE.url,
    name: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.description,
    about: { '@id': `${SITE.url}/#org` },
    isPartOf: { '@id': `${SITE.url}/#website` },
  },
  {
    '@type': 'ItemList',
    name: `${SITE.name} services`,
    itemListElement: serviceDocs.map((d, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/services/${d.slug}`), name: d.seoTitle })),
  },
  faqLd(FAQ.map(([q, a]) => ({ q, a })))
);

/*
 * Story order matters: every section marked `data-morph` advances the particle
 * formation by one step (orb → chaos → data → network → brain → swarm → galaxy).
 * The WordWarp moments carry the morphs for Learn and Act.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={homeLd} />
      <Experience />
      <Nav />
      <main className="relative overflow-x-clip">
        <Hero />
        <Noise />
        <DataChapter />
        <WordWarp id="learn" word="Learn" variant="scatter" chapter={3} morph caption={['№ 03 · Training', 'Billions of corrections. Zero mercy.']} />
        <Training />
        <FineTune />
        <WordWarp id="act" word="Act." variant="split" chapter={5} morph caption={['№ 05 · Agents', 'Brains are nice. Hands are better.']} />
        <Agents />
        <Statement />
        <Versus />
        <Services />
        <Process />
        <Stack />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
