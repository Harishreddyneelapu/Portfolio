import Link from "next/link";

type Article = {
  title: string;
  description: string;
  url: string;
  date?: string;
  readTime?: string;
};

export function LatestArticles({
  mediumProfileUrl,
  articles,
}: {
  mediumProfileUrl: string;
  articles: Article[];
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Latest writing from Medium.
        </p>
        <Link
          className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-50"
          href={mediumProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read all on Medium
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-zinc-700 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300">
          No articles added yet. You can read everything on{" "}
          <Link
            className="font-semibold hover:underline"
            href={mediumProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Medium
          </Link>
          .
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {articles.map((a) => (
              <article
                key={a.url}
                className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 transition-colors hover:border-accent dark:border-white/15 dark:bg-white/5"
              >
                <h3 className="text-base font-semibold leading-6 tracking-tight transition-colors group-hover:text-accent">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {a.description}
                </p>
                <div className="mt-5 flex-1" />
                <div className="mt-4 flex items-center justify-end">
                  <Link
                    className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-50"
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read on Medium
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <Link
            href={mediumProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-6 rounded-2xl border border-black/10 bg-white p-6 transition-colors hover:border-accent dark:border-white/15 dark:bg-white/5"
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide text-zinc-600 dark:text-zinc-400">
                Medium
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Read all articles on Medium
              </h3>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                Explore more writing on performance, accessibility, and modern
                frontend engineering.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-zinc-50 text-zinc-900 dark:border-white/15 dark:bg-white/10 dark:text-zinc-50">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 7.5c0-1.38 1.12-2.5 2.5-2.5h5c1.38 0 2.5 1.12 2.5 2.5v9c0 1.38-1.12 2.5-2.5 2.5h-5C8.12 19 7 17.88 7 16.5v-9Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M10 16V8.3l2 2.6 2-2.6V16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-sm font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
                Read all
              </span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

