import { Badge } from "@/components/Badge";
import { Hero } from "@/components/Hero";
import { LatestArticles } from "@/components/LatestArticles";
import { Marquee } from "@/components/Marquee";
import { ProjectCover } from "@/components/ProjectCover";
import { Stagger, StaggerItem } from "@/components/Motion";
import { Section } from "@/components/Section";
import { SocialLinks } from "@/components/SocialLinks";
import { SiteHeader } from "@/components/SiteHeader";
import { Stats } from "@/components/Stats";
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
        sameAs: [profile.links.github, profile.links.linkedin, profile.links.medium].filter(Boolean),
      },
      {
        "@type": "WebSite",
        name: `${profile.name} | Portfolio`,
        url: siteUrl || undefined,
      },
    ],
  };

  const nav = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Writing", href: "#articles" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];
  const skillGroups = [
    { title: "Languages & frameworks", items: profile.skills.languagesAndFrameworks },
    { title: "AI & data engineering", items: profile.skills.aiAndDataEngineering },
    { title: "Databases & state management", items: profile.skills.databasesAndState },
    { title: "Tools & developer workflows", items: profile.skills.toolsAndWorkflows },
  ];
  const card =
    "rounded-2xl border border-black/10 bg-white p-6 transition-colors dark:border-white/15 dark:bg-white/5";
  const exp = profile.experience[0];

  return (
    <div
      id="top"
      className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900 focus:shadow dark:focus:bg-zinc-900 dark:focus:text-zinc-50"
      >
        Skip to content
      </a>

      <SiteHeader name={profile.name} items={nav} />

      <main id="content">
        <Hero />
        <Stats stats={profile.stats} />
        <Marquee
          top={[...profile.skills.languagesAndFrameworks, ...profile.skills.aiAndDataEngineering]}
          bottom={[...profile.skills.databasesAndState, ...profile.skills.toolsAndWorkflows]}
        />

        <Section id="about" index={1} title="About">
          <div className="max-w-2xl space-y-6">
            <p className="text-2xl font-medium leading-snug text-zinc-800 dark:text-zinc-200 sm:text-3xl sm:leading-snug">
              I’m a software engineer specializing in modern frontend
              ecosystems (React, Next.js, TypeScript) and{" "}
              <span className="text-accent">AI-assisted application development</span>.
              I moved into software from a mechanical engineering background,
              and now build high-performance, accessible web applications and
              RAG pipelines.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              Recently, I’ve built RAG pipelines with LangChain and OpenAI, a
              60+ route AI collaboration platform, secure healthcare payment
              flows, and a 65+ block CMS-driven corporate site.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
            {[
              "Accessible, WCAG-aligned UI backed by automated testing",
              "Performance through Lighthouse-driven practices",
              "Reusable component libraries and design-system consistency",
              "Type-safe, scalable delivery from healthcare to AI tools",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" index={2} title="Experience">
          <ol className="relative ml-1.5 border-l border-black/10 dark:border-white/15">
            <li className="relative pl-8">
              <span
                aria-hidden
                className="absolute left-0 top-1.5 flex h-2.5 w-2.5 -translate-x-1/2 items-center justify-center"
              >
                <span className="absolute inset-0 rounded-full bg-accent/50 motion-safe:animate-ping" />
                <span className="relative block h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-zinc-50 dark:ring-black" />
              </span>
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                {exp.start} — {exp.end}
              </p>
              <h3 className="mt-1.5 text-base font-medium">
                {exp.role}
                <span className="text-zinc-500 dark:text-zinc-400"> · </span>
                {exp.company}
                <span className="text-zinc-500 dark:text-zinc-400"> · {exp.location}</span>
              </h3>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {exp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </li>
          </ol>
        </Section>

        <Section id="projects" index={3} title="Projects">
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {profile.projects.map((p, i) => (
              <StaggerItem key={p.name} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-[border-color,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_0_40px_-12px_var(--accent)] dark:border-white/15 dark:bg-white/5">
                  <ProjectCover seed={p.name} index={i} />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {p.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {p.tagline}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Section id="articles" index={4} title="Writing">
          <LatestArticles
            mediumProfileUrl={profile.links.medium}
            articles={profile.latestArticles}
          />
        </Section>

        <Section id="skills" index={5} title="Skills">
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <StaggerItem key={g.title} className="h-full">
                <div className={`${card} h-full`}>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    {g.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Section id="education" index={6} title="Education">
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
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              <p>{profile.education.timeframe}</p>
              <p>GPA {profile.education.gpa}</p>
            </div>
          </div>
        </Section>

        <Section id="additional" index={7} title="Training">
          <ul className="grid gap-3 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
            {profile.additional.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" title="Contact" hideTitle compact>
          <div
            aria-hidden
            className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600 dark:text-zinc-400"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            Get in touch
          </div>
          <p className="mt-6 text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.03em] md:text-[72px]">
            Let’s build something<span className="text-accent">.</span>
          </p>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-3 text-2xl transition-colors duration-300 hover:text-accent"
          >
            <span className="bg-linear-to-r from-current to-current bg-size-[0%_1.5px] bg-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-size-[100%_1.5px]">
              Connect on LinkedIn
            </span>
            <span
              aria-hidden
              className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </a>
          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-5 text-sm">
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Email</dt>
              <dd className="mt-1.5">
                <a
                  className="wrap-anywhere hover:text-accent"
                  href={`mailto:${profile.email}?subject=Opportunity`}
                >
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Phone</dt>
              <dd className="mt-1.5">
                <a className="hover:text-accent" href={`tel:${profile.phone}`}>
                  {profile.phone}
                </a>
              </dd>
            </div>
          </dl>
        </Section>

        <footer className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6 font-mono text-xs text-zinc-600 dark:text-zinc-400 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-4 border-t border-black/10 pt-8 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <SocialLinks />
          </div>
          <p className="mt-6 text-zinc-500 dark:text-zinc-400">
            Built with Next.js, TypeScript &amp; Tailwind CSS.
          </p>
        </footer>
      </main>
    </div>
  );
}
