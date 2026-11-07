"use client";

import * as React from "react";
// import { GreetingRotator } from "@/components/GreetingRotator";
import { HeroBackground } from "@/components/HeroBackground";
import { profile } from "@/lib/profile";

function useLocalTime(timeZone: string) {
  const [time, setTime] = React.useState("--:--");
  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}

const Social = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${label} (opens in a new tab)`}
    title={label}
    className="block text-zinc-500 transition-colors duration-200 hover:text-accent dark:text-zinc-400 [&_svg]:h-5 [&_svg]:w-5"
  >
    {children}
  </a>
);

export function Hero() {
  const nameRef = React.useRef<HTMLDivElement>(null);
  const time = useLocalTime("Asia/Kolkata");

  const onMove = (e: React.PointerEvent) => {
    const el = nameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    nameRef.current?.style.setProperty("--sx", "-999px");
  };

  const info = [
    { k: "Based in", v: profile.location },
    { k: "Local time", v: `${time} IST` },
    { k: "Currently", v: profile.experience[0].company },
    { k: "Focus", v: profile.focus },
  ];

  return (
    <section
      aria-label="Introduction"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      <HeroBackground />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        <div          className="hero-in flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400 sm:tracking-[0.25em]"
          style={{ "--i": 0 } as React.CSSProperties}>
          <span className="flex items-center gap-2.5 whitespace-nowrap">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.title}
          </span>
          <span
            aria-hidden
            className="hidden h-3.5 w-px shrink-0 bg-zinc-400 dark:bg-zinc-500 sm:block"
          />
          <span className="whitespace-nowrap">Open to opportunities</span>
        </div>

        {/* <div className="hero-in mt-6" style={{ "--i": 1 } as React.CSSProperties}>
          <GreetingRotator />
        </div>

        <p
          className="hero-in mt-3 font-mono text-4xl font-normal text-zinc-900 dark:text-zinc-100 sm:text-5xl"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          I’m
        </p> */}

        <div
          ref={nameRef}
          className="relative mt-7"
        >
          <h1 className="text-balance text-[clamp(2.75rem,9vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            {profile.name}
          </h1>
          <span
            aria-hidden
            className="spotlight-overlay absolute inset-0 text-balance text-[clamp(2.75rem,9vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
          >
            {profile.name}
          </span>
        </div>

        <p
          className="hero-in mt-7 whitespace-nowrap text-[clamp(0.875rem,4.4vw,1.125rem)] text-zinc-600 dark:text-zinc-400 md:text-xl"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <span className="md:hidden">{profile.taglineShort}</span>
          <span className="hidden md:inline">{profile.tagline}</span>
        </p>

        <dl          className="hero-in mt-12 flex flex-wrap items-start justify-center gap-x-10 gap-y-5 border-t border-black/10 pt-8 dark:border-white/10"
          style={{ "--i": 4 } as React.CSSProperties}>
          {info.map((i) => (
            <div key={i.k} className="text-center">
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                {i.k}
              </dt>
              <dd className="mt-1.5 text-sm">{i.v}</dd>
            </div>
          ))}
        </dl>

        <ul className="hero-in mt-10 flex items-center gap-5" aria-label="Social media" style={{ "--i": 5 } as React.CSSProperties}>
          <li>
            <Social href={profile.links.github} label="GitHub">
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </Social>
          </li>
          <li>
            <Social href={profile.links.linkedin} label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </Social>
          </li>
          <li>
            <Social href={profile.links.medium} label="Medium">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.54 12a6.77 6.77 0 1 1-13.54 0 6.77 6.77 0 0 1 13.54 0zM20.96 12c0 3.54-1.51 6.42-3.38 6.42s-3.39-2.88-3.39-6.42 1.52-6.42 3.39-6.42S20.96 8.46 20.96 12zM24 12c0 3.17-.53 5.75-1.19 5.75S21.62 15.17 21.62 12s.53-5.75 1.19-5.75S24 8.83 24 12z" />
              </svg>
            </Social>
          </li>
          <li>
            <Social href={`mailto:${profile.email}`} label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </Social>
          </li>
        </ul>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden justify-center sm:flex">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-zinc-500/70">
          Scroll&nbsp;↓
        </span>
      </div>
    </section>
  );
}
