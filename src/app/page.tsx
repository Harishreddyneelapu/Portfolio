import Link from "next/link";
import { Badge } from "@/components/Badge";
import { GreetingRotator } from "@/components/GreetingRotator";
import { LatestArticles } from "@/components/LatestArticles";
import { MobileNav } from "@/components/MobileNav";
import { MotionProvider, ScrollProgress, Stagger, StaggerItem } from "@/components/Motion";
import { SectionDock } from "@/components/SectionDock";
import { Section } from "@/components/Section";
import { profile } from "@/lib/profile";

export default function Home() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: profile.name,
        jobTitle: profile.title,
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location,
        },
        sameAs: [profile.links.linkedin, profile.links.medium].filter(Boolean),
      },
      {
        "@type": "WebSite",
        name: `${profile.name} | Portfolio`,
        url: siteUrl || undefined,
      },
    ],
  };

  return (
    <MotionProvider>
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <ScrollProgress />
      <SectionDock />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900 focus:shadow dark:focus:bg-zinc-900 dark:focus:text-zinc-50"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/40">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold tracking-tight">
              {profile.name}
            </p>
            <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">
              {profile.title} · {profile.location}
            </p>
          </div>

          <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-700 dark:text-zinc-300 sm:flex">
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#about">
              About
            </a>
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#experience">
              Experience
            </a>
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#projects">
              Projects
            </a>
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#articles">
              Articles
            </a>
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#skills">
              Skills
            </a>
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#contact">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <MobileNav
              items={[
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Projects", href: "#projects" },
                { label: "Articles", href: "#articles" },
                { label: "Skills", href: "#skills" },
                { label: "Contact", href: "#contact" },
              ]}
            />
            <Link
              className="hidden rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 dark:border-white/15 dark:bg-white/5 dark:text-zinc-50 dark:hover:bg-white/10 sm:inline-flex"
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </header>

      <main id="content" className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <section className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-zinc-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                Open to software engineering opportunities
              </div>
              <div className="space-y-5">
                <GreetingRotator />
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  I’m {profile.name}.
                </h1>
                {/* <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                  {profile.title} · {profile.location}
                </p>
                <p className="text-xl font-medium text-zinc-800 dark:text-zinc-200">
                  Building accessible, fast, and delightful web experiences.
                </p> */}
              </div>
              <p className="max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                {profile.summary}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  href={`mailto:${profile.email}`}
                >
                  Email me
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 dark:border-white/15 dark:bg-white/5 dark:text-zinc-50 dark:hover:bg-white/10"
                  href="#projects"
                >
                  View projects
                </a>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">
                    Phone:
                  </span>{" "}
                  <a className="hover:underline" href={`tel:${profile.phone}`}>
                    {profile.phone}
                  </a>
                </p>
              </div>
            </div>

            <aside className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5">
              <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Quick info
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-zinc-600 dark:text-zinc-400">Role</dt>
                  <dd className="font-medium">{profile.title}</dd>
                </div>
                <div>
                  <dt className="text-zinc-600 dark:text-zinc-400">Experience</dt>
                  <dd className="font-medium">
                    {profile.experience[0].company}
                    <span className="block text-zinc-600 dark:text-zinc-400">
                      {profile.experience[0].start} –{" "}
                      {profile.experience[0].end}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-600 dark:text-zinc-400">Location</dt>
                  <dd className="font-medium">{profile.location}</dd>
                </div>
                <div>
                  <dt className="text-zinc-600 dark:text-zinc-400">Email</dt>
                  <dd className="font-medium">
                    <a className="hover:underline" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-600 dark:text-zinc-400">LinkedIn</dt>
                  <dd className="font-medium">
                    <Link
                      className="hover:underline"
                      href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
                      {profile.links.linkedin.replace("https://", "")}
                    </Link>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <div className="h-px w-full bg-black/10 dark:bg-white/10" aria-hidden />

        <Section id="about" title="About" eyebrow="A quick intro">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                I’m a software engineer specializing in modern frontend
                ecosystems (React, Next.js, TypeScript) and{" "}
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  AI-assisted application development
                </span>
                . I moved into software from a mechanical engineering
                background, and now build high-performance, accessible web
                applications and RAG pipelines.
              </p>
              <p>
                Recently, I’ve built RAG pipelines with LangChain and OpenAI, a
                60+ route AI collaboration platform, secure healthcare payment
                flows, and a 65+ block CMS-driven corporate site—with a
                background in mechanical engineering that shaped how I approach
                systems.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-white/5">
              <h3 className="text-sm font-semibold tracking-tight">
                What I optimize for
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li>Accessible, WCAG-aligned UI backed by automated testing</li>
                <li>Performance through Lighthouse-driven practices</li>
                <li>Reusable component libraries and design-system consistency</li>
                <li>Type-safe, scalable delivery from healthcare platforms to AI tools</li>
              </ul>
            </div>
          </div>
        </Section>

        <div className="h-px w-full bg-black/10 dark:bg-white/10" aria-hidden />

        <Section id="experience" title="Experience" eyebrow="Where I've worked">
          <div className="space-y-6">
            {profile.experience.map((exp) => (
              <article
                key={`${exp.company}-${exp.role}`}
                className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5"
              >
                <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {exp.role} · {exp.company}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {exp.location}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {exp.start} — {exp.end}
                  </p>
                </header>
                <div className="mt-5 space-y-5">
                  {profile.projects.map((p) => (
                    <div key={p.name}>
                      <h4 className="text-sm font-semibold tracking-tight">
                        {p.name}
                      </h4>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                        {p.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <div className="h-px w-full bg-black/10 dark:bg-white/10" aria-hidden />

        <Section id="projects" title="Projects" eyebrow="Selected work">
          <Stagger className="grid gap-6 lg:grid-cols-2">
            {profile.projects.map((p) => (
              <StaggerItem key={p.name}>
              <article
                className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5"
              >
                <header className="space-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.name}
                  </h3>
                </header>
                <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {p.tagline}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <div className="h-px w-full bg-black/10 dark:bg-white/10" aria-hidden />

        <Section id="articles" title="Latest Articles" eyebrow="Writings">
          <LatestArticles
            mediumProfileUrl={profile.links.medium}
            articles={profile.latestArticles}
          />
        </Section>

        <div className="h-px w-full bg-black/10 dark:bg-white/10" aria-hidden />

        <Section id="skills" title="Skills" eyebrow="Tools I use">
          <Stagger className="grid gap-6 lg:grid-cols-2">
            {[
              {
                title: "Languages & frameworks",
                items: profile.skills.languagesAndFrameworks,
              },
              {
                title: "AI & data engineering",
                items: profile.skills.aiAndDataEngineering,
              },
              {
                title: "Databases & state management",
                items: profile.skills.databasesAndState,
              },
              {
                title: "Tools & developer workflows",
                items: profile.skills.toolsAndWorkflows,
              },
            ].map((group) => (
              <StaggerItem key={group.title}>
              <div className="h-full rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-white/5">
                <h3 className="text-sm font-semibold tracking-tight">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <div className="h-px w-full bg-black/10 dark:bg-white/10" aria-hidden />

        <Section id="education" title="Education" eyebrow="Academic">
          <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-white/5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {profile.education.school}
                </h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {profile.education.degree}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {profile.education.location}
                </p>
              </div>
              <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <p>{profile.education.timeframe}</p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  GPA: {profile.education.gpa}
                </p>
              </div>
            </div>
          </div>
        </Section>

        <div className="h-px w-full bg-black/10 dark:bg-white/10" aria-hidden />

        <Section id="additional" title="Certifications & Training" eyebrow="Additional">
          <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-white/5">
            <ul className="grid gap-2 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
              {profile.additional.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <div className="h-px w-full bg-black/10 dark:bg-white/10" aria-hidden />

        <Section id="contact" title="Contact" eyebrow="Let’s build something">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-white/5">
              <h3 className="text-sm font-semibold tracking-tight">Reach me</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-zinc-600 dark:text-zinc-400">Email</dt>
                  <dd className="font-medium">
                    <a className="hover:underline" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-zinc-600 dark:text-zinc-400">Phone</dt>
                  <dd className="font-medium">
                    <a className="hover:underline" href={`tel:${profile.phone}`}>
                      {profile.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-zinc-600 dark:text-zinc-400">LinkedIn</dt>
                  <dd className="font-medium">
                    <Link
                      className="hover:underline"
                      href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
                      {profile.links.linkedin.replace("https://", "")}
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-black/10 bg-zinc-900 p-6 text-white dark:border-white/15 dark:bg-white dark:text-black">
              <h3 className="text-sm font-semibold tracking-tight">
                Fastest way to connect
              </h3>
              <p className="mt-3 text-sm leading-6 opacity-90">
                Send a short note about the role/project and your timeline. I’ll
                reply ASAP.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-900"
                  href={`mailto:${profile.email}?subject=Frontend%20Opportunity`}
                >
                  Email with subject
                </a>
                <Link
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 dark:border-black/20 dark:text-black dark:hover:bg-black/5"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message on LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </Section>

        <footer className="pb-12 pt-6 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex flex-col gap-2 border-t border-black/10 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <p className="text-zinc-500 dark:text-zinc-500">
              Built with Next.js, TypeScript, and Tailwind CSS.
            </p>
        </div>
        </footer>
      </main>
    </div>
    </MotionProvider>
  );
}
