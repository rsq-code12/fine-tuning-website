import SiteHeader from '@/components/content/SiteHeader';
import SiteFooter from '@/components/content/SiteFooter';

/** Every crawlable content page: no WebGL, no smooth-scroll, just fast server-rendered HTML. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="top">{children}</main>
      <SiteFooter />
    </>
  );
}
