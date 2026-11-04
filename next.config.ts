import type { NextConfig } from 'next';

// STATIC_EXPORT=1 builds the GitHub Pages mirror (.github/workflows/pages.yml): plain files under
// NEXT_PUBLIC_BASE_PATH, no server. Headers and rewrites only exist on the Vercel deployment.
const staticExport = process.env.STATIC_EXPORT === '1';

// the Pages mirror posts its lead forms here, cross-origin
const PAGES_ORIGIN = 'https://rsq-code12.github.io';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport
    ? {
        output: 'export',
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        async headers() {
          return [
            // until SITE_INDEXABLE=1, keep every response out of search and AI indexes (see lib/site.ts)
            ...(process.env.SITE_INDEXABLE === '1' ? [] : [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]),
            {
              source: '/api/lead',
              headers: [
                { key: 'Access-Control-Allow-Origin', value: PAGES_ORIGIN },
                { key: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
                { key: 'Access-Control-Allow-Headers', value: 'content-type' },
                { key: 'Vary', value: 'Origin' },
              ],
            },
          ];
        },
        async rewrites() {
          return [
            // every page has a Markdown twin for LLM agents: /guides/x.md, /services.md, /index.md
            { source: '/index.md', destination: '/md' },
            { source: '/:section.md', destination: '/md/:section' },
            { source: '/:section/:slug.md', destination: '/md/:section/:slug' },
          ];
        },
      }),
};

export default nextConfig;
