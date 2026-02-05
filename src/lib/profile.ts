export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
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
  title: "Front-End Developer",
  location: "Bangalore, India",
  phone: "9701939346",
  email: "neelapuharishreddy1@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/nhr1/",
    medium: "https://medium.com/@neelapuharishreddy1",
  },
  summary:
    "Front-End Developer with experience in React, Next.js, TypeScript, and Tailwind CSS. Focused on building responsive, accessible, and performant web applications. Skilled in secure authentication, real-time AI features, Zustand for state management, and modern UI libraries. Passionate about clean, maintainable code and user-centric design.",
  skills: {
    frontend: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Web Accessibility (WCAG)",
    ],
    uiAndDX: ["Storybook", "Radix UI", "Zustand", "Vercel"],
    performanceAndAnalytics: [
      "Web Performance (Lighthouse)",
      "Google Analytics",
    ],
    backend: ["Node.js", "GraphQL", "PostgreSQL"],
  },
  experience: [
    {
      company: "Code and Theory",
      role: "Frontend Developer",
      location: "Bangalore",
      start: "Sep 2024",
      end: "Present",
      highlights: [
        "Building accessible, responsive interfaces with React and Next.js, aligned with WCAG guidelines.",
        "Integrating APIs and implementing analytics to track user events and interactions.",
        "Optimizing web performance and UX using Lighthouse metrics and modern best practices.",
      ],
    },
  ] satisfies Experience[],
  projects: [
    {
      name: "CollabFlow – Project Collaboration Dashboard",
      tagline:
        "A personal web app to manage projects, tasks, and real-time updates with an accessible, high-performance UI.",
      highlights: [
        "Built accessible, high-performance UI components using React, Next.js, TypeScript, and Tailwind CSS.",
        "Implemented real-time updates, notifications, and activity timelines with a clean, scalable component architecture.",
      ],
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "SMARTCHATAI – AI-Powered Chatbot Platform",
      tagline:
        "Real-time AI chat with RAG-based file interaction (PDF/CSV/JSON) and rich outputs.",
      highlights: [
        "Built real-time conversation UX with file interaction (PDF, CSV, JSON) and rich outputs like charts, tables, graphs, and LaTeX.",
        "Implemented secure auth with NextAuth + Google Sign-In and features like CRUD, document uploads, and group chats.",
      ],
      tech: [
        "Next.js",
        "React",
        "NextAuth",
        "TypeScript",
        "Tailwind CSS",
      ],
    },
    {
      name: "CareBridge – Telehealth PWA",
      tagline:
        "A personal PWA concept for on-demand consultations with a mobile-first UX and strong accessibility.",
      highlights: [
        "Designed and implemented mobile-first flows with accessibility in mind (keyboard support, semantics, contrast).",
        "Built reusable UI patterns and performance-focused layouts for a smooth, app-like experience.",
      ],
      tech: ["React", "Next.js", "PWA", "Accessibility"],
    },
  ] satisfies Project[],
  education: {
    school: "RK College of Engineering",
    degree: "Bachelor of Engineering (Mechanical Engineering)",
    location: "Vijayawada, Andhra Pradesh",
    timeframe: "Jul 2019 – Apr 2023",
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

