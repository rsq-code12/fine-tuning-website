/**
 * Size a single-line word so it fills, but never exceeds, the space it is given.
 * Measures at 100px and scales linearly, so it works for any font, word and screen.
 * The element must size to its content (inline-block or a flex item).
 */
export function fitText(el: HTMLElement, box: { width: number; height?: number; max?: number; min?: number }) {
  el.style.fontSize = '100px';
  const w = el.offsetWidth || 1;
  const h = el.offsetHeight || 1;
  let size = (box.width / w) * 100;
  if (box.height) size = Math.min(size, (box.height / h) * 100);
  if (box.max) size = Math.min(size, box.max);
  if (box.min) size = Math.max(size, box.min);
  el.style.fontSize = `${size.toFixed(2)}px`;
  return size;
}

/**
 * Explicit-lines headline: one font size for all lines, so the widest line fills the box.
 * Lines are separated with <br />; the element must be block-level.
 */
export function fitLines(el: HTMLElement, opts: { max: number; min?: number; fill?: number }) {
  const prevWs = el.style.whiteSpace;
  el.style.whiteSpace = 'nowrap';
  el.style.fontSize = '100px';
  const range = document.createRange();
  range.selectNodeContents(el);
  const natural = range.getBoundingClientRect().width || 1;
  el.style.whiteSpace = prevWs;
  const size = Math.max(opts.min ?? 0, Math.min(opts.max, ((el.clientWidth * (opts.fill ?? 0.98)) / natural) * 100));
  el.style.fontSize = `${size.toFixed(2)}px`;
  return size;
}

/**
 * Word guard: keep the CSS size unless the longest word is wider than the box,
 * then shrink just enough. Prevents words from ever breaking mid-word.
 */
export function fitLongestWord(el: HTMLElement, words: Element[]) {
  el.style.fontSize = '';
  const box = el.clientWidth;
  if (!box || !words.length) return;
  let longest = 0;
  for (const w of words) longest = Math.max(longest, (w as HTMLElement).offsetWidth);
  if (longest > box) {
    const current = parseFloat(getComputedStyle(el).fontSize);
    el.style.fontSize = `${((current * box) / longest) * 0.97}px`;
  }
}
