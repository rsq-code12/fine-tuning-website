import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

/*
 * Social cards for every page: /og?t=<title>&e=<eyebrow>. Steel Monochrome, Archivo display type.
 * The font is fetched from Google Fonts as TTF; if that fails the card still renders in the default face.
 */

async function archivo(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@87.5,700&text=${encodeURIComponent(text)}`, { signal: AbortSignal.timeout(4000) })
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url, { signal: AbortSignal.timeout(4000) })).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const title = (q.get('t') || SITE.tagline).slice(0, 110).toUpperCase();
  const eyebrow = (q.get('e') || SITE.name).slice(0, 60).toUpperCase();
  const brand = SITE.name.toUpperCase();
  const font = await archivo(`${title}${eyebrow}${brand}→·`);
  const size = title.length > 70 ? 58 : title.length > 40 ? 72 : 92;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#000', color: '#fff', padding: '64px 72px', fontFamily: font ? 'Archivo' : 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: '#999', fontSize: 22, letterSpacing: 5 }}>
          <div style={{ width: 40, height: 1, background: '#3a3a3a' }} />
          {eyebrow}
        </div>
        <div style={{ display: 'flex', fontSize: size, lineHeight: 1, letterSpacing: 0.5, maxWidth: 1040, color: '#f2f2f2' }}>{title}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #262626', paddingTop: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, letterSpacing: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ff4d24' }} />
            {brand}
          </div>
          <div style={{ fontSize: 22, color: '#999', letterSpacing: 4 }}>{new URL(SITE.url).host.toUpperCase()}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: font ? [{ name: 'Archivo', data: font, weight: 700, style: 'normal' }] : undefined,
      headers: { 'cache-control': 'public, max-age=86400, s-maxage=31536000, immutable' },
    }
  );
}
