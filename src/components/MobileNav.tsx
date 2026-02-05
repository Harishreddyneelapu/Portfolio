"use client";

import * as React from "react";

type NavItem = { label: string; href: string };

export function MobileNav({
  items,
}: {
  items: NavItem[];
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 p-2 text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-zinc-50 dark:hover:bg-white/10"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="absolute right-3 top-3 w-[min(92vw,360px)] rounded-2xl border border-black/10 bg-white p-3 shadow-xl dark:border-white/15 dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between px-2 py-2">
              <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Menu
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/10"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="px-1 pb-2">
              <ul className="space-y-1">
                {items.map((it) => (
                  <li key={it.href}>
                    <a
                      href={it.href}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-white/10"
                      onClick={() => setOpen(false)}
                    >
                      <span>{it.label}</span>
                      <span className="text-zinc-500" aria-hidden>
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}

