export default function Logo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M6 8 L16 16 L26 8 M6 24 L16 16 L26 24 M6 8 L6 24 M26 8 L26 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="6" cy="8" r="2.6" fill="currentColor" />
      <circle cx="6" cy="24" r="2.6" fill="currentColor" />
      <circle cx="26" cy="8" r="2.6" fill="currentColor" />
      <circle cx="26" cy="24" r="2.6" fill="currentColor" />
      <circle cx="16" cy="16" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
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
