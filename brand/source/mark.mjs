// Ramanujan mark geometry: nested radicals (√ inside √ inside √ ...) anchored bottom-right,
// each a scaled copy of the last, converging on an ember point.
export const STEEL = [
  [0, '#ffffff'],
  [0.38, '#e2e2e2'],
  [0.6, '#9c9c9c'],
  [0.76, '#f2f2f2'],
  [1, '#b5b5b5'],
];
export const EMBER = [
  [0, '#ffb59a'],
  [0.26, '#ff6a3d'],
  [0.5, '#c4250c'],
  [0.7, '#ff8a5c'],
  [1, '#d63a18'],
];

const f = (n) => +n.toFixed(3);

/**
 * opts: box {L,R,T,B}, s (scale per level), levels, sw (number | array per level),
 * shape (normalized radical points), dot {r, at: 'center'|'limit'}
 */
export function markGeometry(o = {}) {
  const { L = 8, R = 56, T = 10, B = 54, s = 0.6, levels = 3, sw = 3.2, shape, dot = { r: 2.6, at: 'center' } } = o;
  const W = R - L, H = B - T;
  const pts = shape || [
    [0, 0.64],
    [0.17, 1],
    [1 - s, 0],
    [1, 0],
  ];
  const paths = [];
  for (let k = 0; k < levels; k++) {
    const sk = Math.pow(s, k);
    const x0 = R - W * sk, y0 = B - H * sk, w = W * sk, h = H * sk;
    const swk = Array.isArray(sw) ? sw[k] : sw;
    const sw0 = Array.isArray(sw) ? sw[0] : sw;
    // square caps poke out by sw/2: pull each bar in so every bar ends flush with the outer one
    const d = pts
      .map(([u, v], i) => {
        const x = i === pts.length - 1 ? R + sw0 / 2 - swk / 2 : x0 + u * w;
        return `${i ? 'L' : 'M'}${f(x)} ${f(y0 + v * h)}`;
      })
      .join(' ');
    paths.push({ d, sw: swk });
  }
  const sn = Math.pow(s, levels);
  const box = { x0: R - W * sn, y0: B - H * sn, w: W * sn, h: H * sn };
  const c = dot.at === 'limit' ? { cx: R, cy: B } : { cx: box.x0 + box.w * (dot.u ?? 0.62), cy: box.y0 + box.h * (dot.v ?? 0.56) };
  return { paths, dot: { ...c, r: dot.r } };
}

const stops = (arr) => arr.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');

/** SVG markup for the mark. fill: 'steel' | '#hex'; dotFill: 'ember' | '#hex' */
export function markSVG(o = {}) {
  const { size = 64, view = '0 0 64 64', fill = 'steel', dotFill = 'ember', bg = null, rx = 0, id = 'r', join = 'miter', cap = 'square', geo } = o;
  const g = geo || markGeometry(o);
  const [vx, vy, vw, vh] = view.split(' ').map(Number);
  const defs = [];
  let stroke = fill, dfill = dotFill;
  if (fill === 'steel') {
    defs.push(`<linearGradient id="${id}s" x1="0" y1="${g.paths[0].d.match(/[\d.]+ ([\d.]+)/)[1] * 0 + 10}" x2="0" y2="56" gradientUnits="userSpaceOnUse">${stops(STEEL)}</linearGradient>`);
    stroke = `url(#${id}s)`;
  }
  if (dotFill === 'ember') {
    const { cx, cy, r } = g.dot;
    defs.push(`<linearGradient id="${id}e" x1="${f(cx - r)}" y1="${f(cy - r)}" x2="${f(cx + r)}" y2="${f(cy + r)}" gradientUnits="userSpaceOnUse">${stops(EMBER)}</linearGradient>`);
    dfill = `url(#${id}e)`;
  }
  const body = [
    bg ? `<rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" rx="${rx}" fill="${bg}"/>` : '',
    `<g fill="none" stroke="${stroke}" stroke-linecap="${cap}" stroke-linejoin="${join}" stroke-miterlimit="10">`,
    ...g.paths.map((p) => `<path d="${p.d}" stroke-width="${p.sw}"/>`),
    `</g>`,
    `<circle cx="${f(g.dot.cx)}" cy="${f(g.dot.cy)}" r="${g.dot.r}" fill="${dfill}"/>`,
  ].join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}" width="${size}" height="${size}">${defs.length ? `<defs>${defs.join('')}</defs>` : ''}${body}</svg>`;
}
