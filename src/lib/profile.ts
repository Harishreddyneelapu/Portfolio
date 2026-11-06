export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
};

export type Project = {
  name: string;
  tagline: string;
  highlights: string[];
  tech: string[];
};

export type Article = {
  title: string;
  description: string;
  url: string;
  date?: string;
  readTime?: string;
};

export const profile = {
  name: "Harish Reddy Neelapu",
  title: "Software Engineer",
  location: "Bangalore, India",
  phone: "9701939346",
  email: "neelapuharishreddy1@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/nhr1/",
    medium: "https://medium.com/@neelapuharishreddy1",
  },
  summary:
    "Software Engineer specializing in modern frontend ecosystems (React, Next.js, TypeScript) and AI-assisted application development. Transitioned from an engineering background to building high-performance, accessible web applications and RAG pipelines. Proven track record of delivering scalable enterprise features, from secure healthcare platforms to AI-powered collaboration tools.",
  skills: {
    languagesAndFrameworks: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
    ],
    aiAndDataEngineering: [
      "LLM Applications",
      "RAG Pipelines",
      "LangChain",
      "OpenAI API",
    ],
    databasesAndState: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Prisma",
      "GraphQL",
      "Zustand",
    ],
    toolsAndWorkflows: [
      "Cursor",
      "MCP",
      "Git/GitHub",
      "Storybook",
      "Radix UI",
      "Vercel",
      "WCAG Accessibility",
    ],
  },
  experience: [
    {
      company: "Code and Theory",
      role: "Software Engineer",
      location: "Bangalore, KA",
      start: "Sep 2024",
      end: "Present",
    },
  ] satisfies Experience[],
  projects: [
    {
      name: "PACIFY – Healthcare App (PWA)",
      tagline:
        "Healthcare platform serving 100K+ families with 24/7 maternal and pediatric virtual care.",
      highlights: [
        "Implemented secure payment integrations and insurance renewal workflows.",
        "Delivered bilingual (English and Spanish) experiences across video and audio consultations.",
        "Integrated analytics and event tracking across onboarding, checkout, and consultation booking to surface patient engagement and platform performance insights.",
      ],
      tech: ["React", "Next.js", "PWA", "Analytics", "Accessibility"],
    },
    {
      name: "SMARTCHATAI – AI-Powered Chatbot Platform",
      tagline:
        "AI document chat with RAG-based question answering across PDF, TXT, and DOCX files.",
      highlights: [
        "Built chat, document management, collaboration, and AI-assisted content discovery on Next.js, TypeScript, Express, Prisma, and PostgreSQL.",
        "Implemented RAG pipelines with LangChain and OpenAI, returning rich responses with charts, tables, LaTeX, and interactive visualizations.",
        "Designed secure authentication, user-scoped document permissions, chat groups, and threaded conversation APIs for persistent multi-user AI interactions.",
      ],
      tech: [
        "Next.js",
        "TypeScript",
        "Express",
        "Prisma",
        "PostgreSQL",
        "LangChain",
        "OpenAI",
      ],
    },
    {
      name: "VOLTRON – The Machine",
      tagline:
        "AI-powered collaboration platform unifying project management, real-time AI chat, and multi-tenant administration.",
      highlights: [
        "Architected and deployed an enterprise platform spanning 60+ routes, with Workfront-backed project management in one centralized workspace.",
        "Consolidated portfolios, tasks, documents, and specialized AI agents to reduce context-switching across content creation and project delivery.",
        "Designed a UI library of 25 reusable React components for design-system consistency and faster feature development.",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Workfront", "AI Agents"],
    },
    {
      name: "ICF Corporate Website",
      tagline:
        "Optimizely CMS-driven corporate site with type-safe content delivery and on-page editing.",
      highlights: [
        "Delivered 65+ Optimizely CMS blocks and 20+ page types using GraphQL and codegen.",
        "Built accessible UI with Storybook and Vitest, publish webhooks for cache revalidation, and Marketo/Wistia integrations; deployed on Vercel with Lighthouse-driven performance practices.",
        "Improved accessibility compliance across 85 content components and page experiences through automated testing and WCAG-aligned implementation.",
      ],
      tech: [
        "Next.js",
        "TypeScript",
        "GraphQL",
        "Optimizely",
        "Storybook",
        "Vitest",
        "Vercel",
      ],
    },
  ] satisfies Project[],
  education: {
    school: "RK College of Engineering",
    degree: "Bachelor of Engineering (Mechanical Engineering)",
    location: "Vijayawada, Andhra Pradesh",
    timeframe: "Jun 2019 – Apr 2023",
    gpa: "7.52/10.0",
  },
  additional: [
    "Web Accessibility (Udemy)",
    "Contentful Certified Professional",
    "Web Performance (web.dev)",
    "Lighthouse performance metrics (Google Developers program)",
    "Adobe Workfront Fusion training",
    "AI for All (NVIDIA Academy)",
    "Full-stack development training; hands-on backend development",
  ],
  latestArticles: [
    {
      title: "Next.js Routing Isn’t Magic. It’s Just Conventions.",
      description:
        "Most early-career developers assume Next.js routing is “framework magic”. It isn’t—routing is built on naming conventions like [slug], [...slug], [[...slug]] and route groups (marketing).",
      url: "https://medium.com/@neelapuharishreddy1/next-js-routing-isnt-magic-it-s-just-conventions-3889363df87b",
      date: "Jan 6, 2026",
      readTime: "2 min read",
    },
    {
      title:
        "Mastering Modern Web Experiences: A Complete Guide to Chrome Lighthouse",
      description:
        "A practical guide to Lighthouse: performance, accessibility, best practices, and SEO—plus how the scoring works and what to optimize first (Core Web Vitals, TBT, CLS, LCP).",
      url: "https://medium.com/@neelapuharishreddy1/mastering-modern-web-experiences-a-complete-guide-to-chrome-lighthouse-a39467305120",
      date: "Aug 29, 2025",
      readTime: "4 min read",
    },
    {
      title: "Performance: Making Every Millisecond Count",
      description:
        "A developer-friendly performance overview: why speed matters, quick wins (images, compression, hints), and the building blocks of fast sites—plus what metrics to track.",
      url: "https://medium.com/@neelapuharishreddy1/performance-making-every-millisecond-count-b7d934c2a36c",
      date: "Aug 17, 2025",
      readTime: "4 min read",
    },
  ] satisfies Article[],
};

