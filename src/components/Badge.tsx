import * as React from "react";

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200">
      {children}
    </span>
  );
}

