/** Leaf logo mark — shared between header, footer, hero. */
export function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={className}>
      <path
        d="M95 18C55 20 26 45 22 82c24 8 60-2 73-64Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M26 86C44 58 60 42 92 22"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M49 62c7 0 18 2 28 10M61 48c5 0 14 1 22 7"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
    </svg>
  );
}
