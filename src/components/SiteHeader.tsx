"use client";

import * as React from "react";

type NavItem = { label: string; href: string };

export function SiteHeader({ name, items }: { name: string; items: NavItem[] }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>("");
  const bar = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let raf = 0;
    const paint = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      if (!raf) raf = requestAnimationFrame(paint);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  React.useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.href.slice(1)))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open
            ? "border-black/10 bg-zinc-50/80 backdrop-blur dark:border-white/10 dark:bg-black/70"
            : "border-transparent"
        }`}
      >
        <div
          ref={bar}
          aria-hidden
          className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-accent"
        />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <a
            href="#top"
            title="Back to top"
            className="relative z-10 text-sm font-semibold tracking-tight"
          >
            {name}
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {items.map((i) => (
              <a
                key={i.href}
                href={i.href}
                aria-current={active === i.href ? "true" : undefined}
                className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                  active === i.href
                    ? "text-accent"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {i.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span
              aria-hidden
              className={`absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                open ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                open ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`fixed inset-0 z-40 bg-zinc-50 transition-[opacity,visibility] duration-300 dark:bg-black md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Sections" className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24">
          {items.map((i, idx) => (
            <a
              key={i.href}
              href={i.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${idx * 60}ms` : "0ms" }}
              className={`flex items-baseline gap-4 border-b border-black/10 py-4 transition-[transform,opacity] duration-500 ease-out dark:border-white/10 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <span className="font-mono text-xs text-zinc-500">0{idx + 1}</span>
              <span className="text-[clamp(2.25rem,11vw,3.75rem)] font-semibold leading-none tracking-tight">
                {i.label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
