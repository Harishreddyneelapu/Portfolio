import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center text-zinc-900 dark:bg-black dark:text-zinc-50">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600 dark:text-zinc-400">
        Error 404
      </p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Back to home
      </Link>
    </main>
  );
}
