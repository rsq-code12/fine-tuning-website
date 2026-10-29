// Builds the Ramanujan brand kit: SVG masters into <repo>/brand, HTML render jobs into ./jobs.
import { mkdirSync, writeFileSync } from 'node:fs';
import opentype from 'opentype.js';
import { markGeometry, STEEL, EMBER } from './mark.mjs';

const REPO = '/Users/ranjeetratan/Desktop/fine-tuning-website';
const OUT = `${REPO}/brand`;
const JOBS = new URL('./jobs/', import.meta.url).pathname;
mkdirSync(`${OUT}/linkedin`, { recursive: true });
mkdirSync(JOBS, { recursive: true });

const archivo = opentype.loadSync(new URL('./fonts/archivo-88-600.ttf', import.meta.url).pathname);
const plex = opentype.loadSync(new URL('./fonts/plex-500.ttf', import.meta.url).pathname);
const f = (n) => +n.toFixed(2);
const stops = (arr) => arr.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');

/* ── mark ───────────────────────────────────────────── */
export const MARK = { L: 8, R: 56, T: 10, B: 54, s: 0.6, levels: 3, sw: [3.8, 3.0, 2.4], dot: { r: 2.7, at: 'center' } };
const geo = markGeometry(MARK);

/** Mark body in its 64-unit space. tone: 'steel' (gradient) | 'flat' (white) | 'ink' (black on light) */
function markBody(id, tone = 'steel') {
  const defs = [];
  const strokes = geo.paths.map((p, k) => {
    const sk = Math.pow(MARK.s, k);
    const y0 = MARK.B - (MARK.B - MARK.T) * sk;
    if (tone === 'steel') {
      defs.push(`<linearGradient id="${id}s${k}" x1="0" y1="${f(y0 - p.sw / 2)}" x2="0" y2="${f(MARK.B + p.sw)}" gradientUnits="userSpaceOnUse">${stops(STEEL)}</linearGradient>`);
      return `<path d="${p.d}" stroke="url(#${id}s${k})" stroke-width="${p.sw}"/>`;
    }
    return `<path d="${p.d}" stroke="${tone === 'ink' ? '#000000' : '#ffffff'}" stroke-width="${p.sw}"/>`;
  });
  const { cx, cy, r } = geo.dot;
  let dot = '#ff4d24';
  if (tone === 'steel') {
    defs.push(`<radialGradient id="${id}e" cx="${f(cx - r * 0.35)}" cy="${f(cy - r * 0.4)}" r="${f(r * 1.45)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff9a73"/><stop offset="0.45" stop-color="${EMBER[1][1]}"/><stop offset="1" stop-color="${EMBER[2][1]}"/></radialGradient>`);
    dot = `url(#${id}e)`;
  }
  return {
    defs: defs.join(''),
    body: `<g fill="none" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10">${strokes.join('')}</g><circle cx="${f(cx)}" cy="${f(cy)}" r="${r}" fill="${dot}"/>`,
  };
}
// Visual bounds of the mark in its 64 space (square caps + miter spikes included).
const MB = { x1: 6.4, y1: 8.1, x2: 57.9, y2: 57.4 };
const MW = MB.x2 - MB.x1, MH = MB.y2 - MB.y1;

/** Place the mark so its visual box is `h` tall at (x, y) top-left. */
function placeMark(id, x, y, h, tone) {
  const k = h / MH;
  const m = markBody(id, tone);
  return { defs: m.defs, body: `<g transform="translate(${f(x - MB.x1 * k)} ${f(y - MB.y1 * k)}) scale(${f(k * 1000) / 1000})">${m.body}</g>`, w: MW * k };
}

/* ── type ───────────────────────────────────────────── */
/** Outline `text` with tracking (em). Returns path d (baseline at y), width and cap height. */
function word(font, text, size, tracking, x = 0, y = 0) {
  const scale = size / font.unitsPerEm;
  let cx = x;
  const parts = [];
  const glyphs = font.stringToGlyphs(text);
  glyphs.forEach((g, i) => {
    parts.push(g.getPath(cx, y, size).toPathData(2));
    cx += g.advanceWidth * scale + (i < glyphs.length - 1 ? tracking * size : 0);
    if (i < glyphs.length - 1) cx += (font.getKerningValue(g, glyphs[i + 1]) || 0) * scale;
  });
  // trim side bearings so the box hugs the ink
  const bb = new opentype.Path();
  parts.forEach(() => {});
  const first = glyphs[0], last = glyphs[glyphs.length - 1];
  const lsb = (first.leftSideBearing || 0) * scale;
  const rsb = (last.advanceWidth - (last.xMax || last.advanceWidth)) * scale;
  return { d: parts.join(''), w: cx - x - lsb - rsb, lsb, cap: (font.tables.os2.sCapHeight || 700) * scale };
}

const steelText = (id, y1, y2) => `<linearGradient id="${id}" x1="0" y1="${f(y1)}" x2="0" y2="${f(y2)}" gradientUnits="userSpaceOnUse">${stops(STEEL)}</linearGradient>`;

function svg(w, h, defs, body, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${defs ? `<defs>${defs}</defs>` : ''}${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''}${body}</svg>`;
}

const files = {};
const jobs = [];
const emit = (name, markup, png) => {
  writeFileSync(`${OUT}/${name}.svg`, markup);
  files[name] = markup;
  for (const p of png || []) jobs.push({ src: name, ...p });
};

/* 1. Mark, square, on black: the LinkedIn company logo. Mark at 56% of the canvas, optically centred. */
{
  const S = 1200, h = S * 0.5;
  const m = placeMark('a', (S - MW * (h / MH)) / 2 - S * 0.006, (S - h) / 2 - S * 0.008, h, 'steel');
  emit('linkedin/ramanujan-logo-square', svg(S, S, m.defs, m.body, '#000000'), [
    { out: 'linkedin/ramanujan-logo-square-400.png', w: 400, h: 400 },
    { out: 'linkedin/ramanujan-logo-square-1200.png', w: 1200, h: 1200 },
  ]);
}

/* 2. Stacked square: mark over the wordmark, on black. */
{
  const S = 1200;
  const size = 104, tr = 0.3;
  const t = word(archivo, 'RAMANUJAN', size, tr);
  const mh = 330, gap = 112;
  const total = mh + gap + t.cap;
  const top = (S - total) / 2;
  const m = placeMark('b', (S - MW * (mh / MH)) / 2, top, mh, 'steel');
  const base = top + mh + gap + t.cap;
  const tx = (S - t.w) / 2 - t.lsb;
  const w = word(archivo, 'RAMANUJAN', size, tr, tx, base);
  emit(
    'linkedin/ramanujan-logo-stacked',
    svg(S, S, m.defs + steelText('bt', base - t.cap, base), `${m.body}<path d="${w.d}" fill="url(#bt)"/>`, '#000000'),
    [{ out: 'linkedin/ramanujan-logo-stacked-1200.png', w: 1200, h: 1200 }],
  );
}

/* 3. Horizontal lockup, transparent + on black. */
function lockup(id, tone, textFill) {
  const size = 100, tr = 0.32;
  const t = word(archivo, 'RAMANUJAN', size, tr);
  const mh = t.cap * 2.3, gap = t.cap * 0.95, pad = t.cap * 0.9;
  const H = Math.ceil(mh + pad * 2);
  const m = placeMark(id, pad, pad, mh, tone);
  const base = pad + (mh + t.cap) / 2;
  const w = word(archivo, 'RAMANUJAN', size, tr, pad + m.w + gap - t.lsb, base);
  const W = Math.ceil(pad + m.w + gap + t.w + pad);
  const fill = textFill === 'steel' ? `url(#${id}t)` : textFill;
  return { W, H, defs: m.defs + (textFill === 'steel' ? steelText(`${id}t`, base - t.cap, base) : ''), body: `${m.body}<path d="${w.d}" fill="${fill}"/>` };
}
{
  const l = lockup('c', 'steel', 'steel');
  emit('ramanujan-logo-horizontal', svg(l.W, l.H, l.defs, l.body), [{ out: 'ramanujan-logo-horizontal.png', w: l.W * 2, h: l.H * 2, transparent: true }]);
  emit('ramanujan-logo-horizontal-black', svg(l.W, l.H, l.defs, l.body, '#000000'), [{ out: 'ramanujan-logo-horizontal-black.png', w: l.W * 2, h: l.H * 2 }]);
  const d = lockup('d', 'ink', '#000000');
  emit('ramanujan-logo-horizontal-light', svg(d.W, d.H, d.defs, d.body, '#ffffff'), [{ out: 'ramanujan-logo-horizontal-light.png', w: d.W * 2, h: d.H * 2 }]);
}

/* 4. Mark alone, transparent (for decks, docs, stickers). */
{
  const m = markBody('e', 'steel');
  emit('ramanujan-mark', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MB.x1 - 2} ${MB.y1 - 2} ${f(MW + 4)} ${f(MH + 4)}" width="512" height="${Math.round((512 * (MH + 4)) / (MW + 4))}"><defs>${m.defs}</defs>${m.body}</svg>`, [
    { out: 'ramanujan-mark.png', w: 1024, h: Math.round((1024 * (MH + 4)) / (MW + 4)), transparent: true },
  ]);
}

/* 5. LinkedIn company cover, 1128 x 191 (exported @2x). Content kept centre-right: the logo overlaps bottom-left. */
{
  const W = 1128, H = 191;
  const size = 34, tr = 0.06;
  const words = ['THE ', 'GODFATHERS', ' OF APPLIED AI'];
  const full = word(archivo, words.join(''), size, tr);
  const SUB = 'MODEL TRAINING  ·  FINE-TUNING  ·  DATASETS  ·  AGENT SYSTEMS';
  const sub = word(plex, SUB, 10.5, 0.22);
  const cx = W * 0.58;
  const base = H / 2 + full.cap / 2 - 9;
  let x = cx - full.w / 2 - full.lsb;
  const pieces = words.map((t) => {
    const piece = word(archivo, t, size, tr, x, base);
    const adv = word(archivo, t + 'X', size, tr).w - word(archivo, 'X', size, tr).w; // advance incl. tracking
    const out = { d: piece.d, x0: x, x1: x + adv };
    x += adv;
    return out;
  });
  const st = word(plex, SUB, 10.5, 0.22, cx - sub.w / 2 - sub.lsb, base + 30);
  const g = pieces[1];
  const ember = `<linearGradient id="ce" x1="${f(g.x0)}" y1="${f(base - full.cap)}" x2="${f(g.x1)}" y2="${f(base)}" gradientUnits="userSpaceOnUse">${stops(EMBER)}</linearGradient>`;
  // ghost radicals: architectural lines bleeding off the right edge, no dot
  const gm = markBody('g', 'steel');
  const gk = 5.2;
  const ghostBody = gm.body.replace(/<circle[^>]*\/>/, '');
  const ghost = `<g opacity="0.13" transform="translate(${f(W - 50 * gk)} ${f(H - 54 * gk + 6)}) scale(${gk})">${ghostBody}</g>`;
  const hair = `<rect x="0" y="${H - 1}" width="${W}" height="1" fill="#262626"/>`;
  emit(
    'linkedin/ramanujan-cover',
    svg(
      W,
      H,
      gm.defs + steelText('ct', base - full.cap, base) + ember,
      `${ghost}<path d="${pieces[0].d}${pieces[2].d}" fill="url(#ct)"/><path d="${g.d}" fill="url(#ce)"/><path d="${st.d}" fill="#999999"/>${hair}`,
      '#000000',
    ),
    [{ out: 'linkedin/ramanujan-cover-1128x191.png', w: W, h: H }, { out: 'linkedin/ramanujan-cover-2256x382.png', w: W * 2, h: H * 2 }],
  );
}

/* 6. Favicon (flat colours read better at 16-32px). */
{
  const m = markBody('i', 'flat');
  const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs>${m.defs}</defs><rect width="64" height="64" rx="14" fill="#000000"/><g transform="translate(32 32.3) scale(0.86) translate(-32.15 -32.75)">${m.body}</g></svg>`;
  writeFileSync(`${OUT}/favicon.svg`, fav);
  writeFileSync(`${REPO}/app/icon.svg`, fav);
  jobs.push({ src: 'favicon', out: 'favicon-512.png', w: 512, h: 512, transparent: true });
  files.favicon = fav;
}

for (const j of jobs) {
  const html = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:${j.transparent ? 'transparent' : '#000'}}svg{display:block;width:${j.w}px;height:${j.h}px}</style>${files[j.src].replace(/^(<svg[^>]*?) width="[\d.]+" height="[\d.]+"/, '$1')}`;
  const name = j.out.replace(/[/.]/g, '_');
  writeFileSync(`${JOBS}${name}.html`, html);
  j.html = `${JOBS}${name}.html`;
}
writeFileSync(`${JOBS}jobs.json`, JSON.stringify(jobs.map(({ out, w, h, transparent, html }) => ({ out: `${OUT}/${out}`, w, h, transparent: !!transparent, html }))));
console.log(jobs.length, 'render jobs');
