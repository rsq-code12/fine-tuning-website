import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // until SITE_INDEXABLE=1, keep every response out of search and AI indexes (see lib/site.ts)
  async headers() {
    return process.env.SITE_INDEXABLE === '1' ? [] : [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
  async rewrites() {
    return [
      // every page has a Markdown twin for LLM agents: /guides/x.md, /services.md, /index.md
      { source: '/index.md', destination: '/md' },
      { source: '/:section.md', destination: '/md/:section' },
      { source: '/:section/:slug.md', destination: '/md/:section/:slug' },
    ];
  },
};

export default nextConfig;
