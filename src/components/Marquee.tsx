function Track({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <ul
      className={`marquee-track flex shrink-0 items-center gap-8 pr-8 ${reverse ? "marquee-reverse" : ""}`}
    >
      {items.map((t) => (
        <li
          key={t}
          className="flex items-center gap-8 font-mono text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
        >
          <span>{t}</span>
          <span className="text-accent">/</span>
        </li>
      ))}
    </ul>
  );
}

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask relative flex overflow-hidden">
      <Track items={items} reverse={reverse} />
      <Track items={items} reverse={reverse} />
    </div>
  );
}

export function Marquee({ top, bottom }: { top: string[]; bottom: string[] }) {
  return (
    <div
      aria-hidden
      className="select-none space-y-3 border-y border-black/10 py-5 dark:border-white/10"
    >
      <Row items={top} />
      <Row items={bottom} reverse />
    </div>
  );
}
