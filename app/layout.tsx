import type { Metadata, Viewport } from 'next';
import { Archivo, EB_Garamond, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/content/JsonLd';
import { graph, ogImageUrl, orgLd, websiteLd } from '@/lib/seo';
import { INDEXABLE, SITE } from '@/lib/site';

// Type trinity from DESIGN.md: filled semi-bold display, serif body, machined mono
const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});
const serif = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-plex',
  display: 'swap',
});

const verification = {
  google: process.env.GOOGLE_SITE_VERIFICATION,
  ...(process.env.BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } } : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ['LLM fine-tuning services', 'custom AI model training', 'AI agent development', 'fine-tuning datasets', 'AI automation agency', 'enterprise AI adoption'],
  alternates: { canonical: '/', types: { 'text/plain': '/llms.txt', 'application/rss+xml': '/feed.xml' } },
  openGraph: {
    title: `${SITE.name} · AI has a godfather.`,
    description: 'Fine-tuned models, training data and AI agents you own. The godfathers of applied AI.',
    type: 'website',
    url: '/',
    siteName: SITE.name,
    locale: SITE.locale,
    images: [{ url: ogImageUrl('AI has a godfather.', 'Model training · Fine-tuning · Agents'), width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: [ogImageUrl('AI has a godfather.', 'Model training · Fine-tuning · Agents')] },
  verification,
  category: 'technology',
  ...(INDEXABLE ? {} : { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={graph(orgLd(), websiteLd())} />
        {children}
      </body>
    </html>
  );
}
