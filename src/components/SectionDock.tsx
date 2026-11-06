"use client";

import { Briefcase, FolderGit2, Mail, PenLine, Sparkles, User } from "lucide-react";
import { TooltipNavbar } from "@/components/watermelon/tooltip-navbar";

const icon = "h-full w-full";

const items = [
  { icon: <User className={icon} />, label: "About", href: "about" },
  { icon: <Briefcase className={icon} />, label: "Experience", href: "experience" },
  { icon: <FolderGit2 className={icon} />, label: "Projects", href: "projects" },
  { icon: <PenLine className={icon} />, label: "Articles", href: "articles" },
  { icon: <Sparkles className={icon} />, label: "Skills", href: "skills" },
  { icon: <Mail className={icon} />, label: "Contact", href: "contact" },
];

export function SectionDock() {
  return (
    <nav
      aria-label="Jump to section"
      className="fixed inset-x-0 bottom-4 z-40 hidden justify-center sm:flex"
    >
      <TooltipNavbar items={items} />
    </nav>
  );
}
