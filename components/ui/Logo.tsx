/**
 * The Ramanujan mark: nested radicals, each a smaller copy inside the last
 * (after his infinite nested radical), converging on one ember point.
 * Geometry is shared with the brand kit in /brand.
 */
export default function Logo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="5.15 5.75 54 54" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit={10}>
        <path d="M8 38.16 L16.16 54 L27.2 10 L56 10" strokeWidth={3.8} />
        <path d="M27.2 44.5 L32.1 54 L38.72 27.6 L56.4 27.6" strokeWidth={3} />
        <path d="M38.72 48.3 L41.66 54 L45.63 38.16 L56.7 38.16" strokeWidth={2.4} />
      </g>
      <circle cx="52.06" cy="49.82" r="2.7" className="fill-ember" />
    </svg>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
