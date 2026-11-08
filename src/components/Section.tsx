import * as React from "react";
import { Reveal } from "@/components/Motion";

export function Section({
  id,
  index,
  title,
  children,
}: {
  id?: string;
  index?: number;
  title: string;
  children: React.ReactNode;
}) {
  const num = index === undefined ? null : String(index).padStart(2, "0");
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="relative scroll-mt-20 overflow-hidden border-t border-black/10 py-16 dark:border-white/10 sm:py-24"
    >
      <span
        aria-hidden
        data-label={title}
        className="pointer-events-none absolute -top-4 right-0 select-none text-[15vw] font-bold uppercase leading-none tracking-tighter text-black/[0.035] before:content-[attr(data-label)] dark:text-white/[0.04] lg:text-[11rem]"
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2
              id={id ? `${id}-heading` : undefined}
              className="flex items-baseline gap-3 lg:flex-col lg:items-start lg:gap-3"
            >
              {num && (
                <span
                  aria-hidden
                  data-num={num}
                  className="text-4xl font-semibold leading-none text-black/15 before:content-[attr(data-num)] dark:text-white/15 lg:text-6xl"
                />
              )}
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600 dark:text-zinc-400">
                {title}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="min-w-0">
            {children}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
