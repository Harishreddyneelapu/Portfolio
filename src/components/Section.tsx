import * as React from "react";
import { Reveal } from "@/components/Motion";

export function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id?: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10 sm:py-12">
      <div className="mb-6 space-y-2">
        {eyebrow ? (
          <p className="text-sm font-medium tracking-wide text-zinc-600 dark:text-zinc-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      <Reveal>{children}</Reveal>
    </section>
  );
}

