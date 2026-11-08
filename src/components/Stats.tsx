"use client";

import * as React from "react";
import { StaggerItem, Stagger } from "@/components/Motion";

type Stat = { value: number; suffix: string; label: string };

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [n, setN] = React.useState(value);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1600);
          setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        setN(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="By the numbers" className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="text-5xl font-semibold tracking-tight text-accent tabular-nums sm:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
