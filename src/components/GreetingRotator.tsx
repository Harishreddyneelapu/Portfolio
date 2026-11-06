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

function usePageVisibility() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return visible;
}

export function GreetingRotator({
  greetings = DEFAULT_GREETINGS,
  intervalMs = 1800,
}: {
  greetings?: Greeting[];
  intervalMs?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const pageVisible = usePageVisibility();
  const [idx, setIdx] = React.useState(0);
  const [subLen, setSubLen] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const normalizedGreetings = React.useMemo(() => {
    return (greetings.length ? greetings : DEFAULT_GREETINGS).map((g) => ({
      ...g,
      text: g.text.endsWith("!") ? g.text : `${g.text}!`,
    }));
  }, [greetings]);

  const longestGreeting = React.useMemo(() => {
    return normalizedGreetings.reduce((longest, g) => {
      return g.text.length > longest.length ? g.text : longest;
    }, "Hello!");
  }, [normalizedGreetings]);

  React.useEffect(() => {
    if (reduced) return;
    if (!pageVisible) return;
    if (normalizedGreetings.length <= 0) return;

    const fullText = normalizedGreetings[idx]?.text ?? "";
    const doneTyping = subLen >= fullText.length;
    const doneDeleting = subLen <= 0;

    const TYPE_SPEED = 85;
    const DELETE_SPEED = 35;
    const PAUSE_AT_END = Math.max(350, Math.min(2500, intervalMs));
    const PAUSE_AT_START = 150;

    const delay = isDeleting
      ? DELETE_SPEED
      : doneTyping
        ? PAUSE_AT_END
        : TYPE_SPEED;

    const id = window.setTimeout(() => {
      if (!isDeleting && doneTyping) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        if (doneDeleting) {
          setIsDeleting(false);
          setIdx((i) => (i + 1) % normalizedGreetings.length);
          setSubLen(0);
          return;
        }
        setSubLen((n) => Math.max(0, n - 1));
        return;
      }

      setSubLen((n) => Math.min(fullText.length, n + 1));
    }, delay + (subLen === 0 && !isDeleting ? PAUSE_AT_START : 0));

    return () => window.clearTimeout(id);
  }, [
    idx,
    isDeleting,
    normalizedGreetings,
    reduced,
    subLen,
    intervalMs,
    pageVisible,
  ]);

  const active =
    normalizedGreetings[idx] ??
    normalizedGreetings[0] ?? { text: "Hi!", lang: "en" };
  const visibleText = reduced
    ? active.text
    : active.text.slice(0, subLen) || "\u00A0";

  return (
    <div className="inline-flex select-none items-center gap-2">
      {/* <span className="inline-flex h-6 items-center rounded-full border border-black/10 bg-white px-2 text-xs font-semibold tracking-wide text-zinc-700 shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-zinc-200">
        Greeting
      </span> */}
      <span
        className={[
          "font-mono text-5xl font-light text-zinc-600 dark:text-zinc-400 sm:text-6xl",
          reduced ? "" : "transition-all duration-200 ease-out",
        ].join(" ")}
      >
        <span className="inline-grid">
          <span
            className="invisible col-start-1 row-start-1 select-none"
            aria-hidden="true"
          >
            {longestGreeting}
          </span>
          <span className="col-start-1 row-start-1" lang={active.lang}>
            {visibleText}
          </span>
        </span>
      </span>
    </div>
  );
}

