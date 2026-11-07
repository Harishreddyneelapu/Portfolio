import * as React from "react";

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:border-white/15 dark:text-zinc-400">
      {children}
    </span>
  );
}
