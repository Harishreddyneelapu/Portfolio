import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this portfolio uses analytics and what it stores.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl bg-zinc-50 px-6 py-24 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <Link href="/" className="font-mono text-xs uppercase tracking-wider text-accent hover:underline">
        ← Back home
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Privacy</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          This is a personal portfolio. It has no accounts, forms or comments,
          and I don’t collect anything you type.
        </p>
        <p>
          With your consent, I use Google Tag Manager to measure visits: which
          sections are viewed and which links (email, LinkedIn, Medium) are
          clicked. This may set cookies or similar identifiers and send
          usage data to Google. Tag Manager itself loads on every visit, but
          analytics storage stays denied, so no analytics cookies are set,
          until you click Accept. Declining has no effect on the site.
        </p>
        <p>
          Your choice is stored in your browser’s local storage under{" "}
          <code className="font-mono text-sm">analytics-consent</code>. Clear
          your site data to be asked again.
        </p>
        <p>
          Questions or requests:{" "}
          <a className="underline underline-offset-4 hover:text-accent" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
