"use client";

import * as React from "react";

type Greeting = {
  text: string;
  lang?: string;
};

const DEFAULT_GREETINGS: Greeting[] = [
  { text: "Hi", lang: "en" },
  { text: "Namaste", lang: "hi" },
  { text: "नमस्ते", lang: "hi" }, // Hindi (Devanagari)
  { text: "నమస్తే", lang: "te" }, // Telugu
  { text: "ನಮಸ್ಕಾರ", lang: "kn" }, // Kannada
  { text: "Hola", lang: "es" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function GreetingRotator({
  greetings = DEFAULT_GREETINGS,
  intervalMs = 1800,
}: {
  greetings?: Greeting[];
  intervalMs?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (reduced) return;
    if (greetings.length <= 1) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % greetings.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [greetings.length, intervalMs, reduced]);

  const active = greetings[idx] ?? greetings[0] ?? { text: "Hi", lang: "en" };

  return (
    <div className="inline-flex items-center gap-2">
      {/* <span className="inline-flex h-6 items-center rounded-full border border-black/10 bg-white px-2 text-xs font-semibold tracking-wide text-zinc-700 shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-zinc-200">
        Greeting
      </span> */}
      <span
        className={[
          "text-7xl font-extralight text-zinc-700 dark:text-zinc-300 sm:text-6xl lg:text-8xl",
          reduced ? "" : "transition-all duration-500 ease-out",
        ].join(" ")}
      >
        <span className={reduced ? "" : "animate-[fadeUp_1.8s_ease-in-out_infinite]"}>
          <span lang={active.lang}>{active.text}</span>
        </span>
      </span>
    </div>
  );
}

