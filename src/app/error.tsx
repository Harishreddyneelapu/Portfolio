"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center text-zinc-900 dark:bg-black dark:text-zinc-50">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600 dark:text-zinc-400">
        Something went wrong
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        This page hit a snag
      </h1>
      <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
        Please try again. If it keeps happening, email me and I’ll fix it.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Try again
      </button>
    </main>
  );
}
