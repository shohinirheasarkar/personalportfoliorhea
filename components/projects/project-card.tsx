"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Atom,
  Brain,
  ExternalLink,
  FileText,
  Globe,
  Play,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import { GitHubIcon } from "@/components/icons/social-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type {
  Project,
  ProjectLink,
  ProjectLinkType,
  ProjectSection,
} from "@/data/projects";
import { cn } from "@/lib/utils";

const statusStyles = {
  completed:
    "bg-emerald-500/10 text-emerald-800 border-emerald-200/80 dark:border-emerald-500/30 dark:text-emerald-300",
  "in-progress":
    "bg-sky-500/10 text-sky-800 border-sky-200/80 dark:border-sky-500/30 dark:text-sky-300",
  archived:
    "bg-neutral-500/10 text-neutral-600 border-neutral-200/80 dark:border-neutral-500/30 dark:text-neutral-400",
} as const;

const statusLabels = {
  completed: "Completed",
  "in-progress": "In progress",
  archived: "Archived",
} as const;

const sectionVisual: Record<
  ProjectSection,
  { Icon: LucideIcon; stripe: string; iconBg: string; iconColor: string }
> = {
  satellite: {
    Icon: Rocket,
    stripe: "bg-gradient-to-b from-cyan-400 via-sky-400 to-violet-400",
    iconBg: "bg-cyan-500/15 border-cyan-400/30",
    iconColor: "text-cyan-600 dark:text-cyan-300",
  },
  neuroscience: {
    Icon: Brain,
    stripe: "bg-gradient-to-b from-violet-400 via-fuchsia-400 to-rose-400",
    iconBg: "bg-violet-500/15 border-violet-400/30",
    iconColor: "text-violet-600 dark:text-violet-300",
  },
  science: {
    Icon: Atom,
    stripe: "bg-gradient-to-b from-amber-400 via-orange-400 to-rose-400",
    iconBg: "bg-amber-500/15 border-amber-400/30",
    iconColor: "text-amber-700 dark:text-amber-300",
  },
  personal: {
    Icon: Globe,
    stripe: "bg-gradient-to-b from-neutral-400 via-slate-300 to-cyan-400",
    iconBg: "bg-neutral-500/15 border-neutral-400/30",
    iconColor: "text-neutral-600 dark:text-neutral-300",
  },
};

function linkIcon(type: ProjectLinkType) {
  switch (type) {
    case "repo":
      return <GitHubIcon className="size-3.5" />;
    case "demo":
      return <Play className="size-3.5" aria-hidden />;
    default:
      return <FileText className="size-3.5" aria-hidden />;
  }
}

function ProjectLinkButtons({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <Link
          key={`${link.type}-${link.href}`}
          href={link.href}
          target={link.href.startsWith("/") ? undefined : "_blank"}
          rel={
            link.href.startsWith("/") ? undefined : "noopener noreferrer"
          }
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "border-white/70 bg-white/50 text-neutral-800 hover:bg-white/80 dark:border-white/15 dark:bg-white/8 dark:text-neutral-200 dark:hover:bg-white/12",
          )}
        >
          {linkIcon(link.type)}
          {link.label}
          {link.href.startsWith("http") ? (
            <ExternalLink className="size-3 opacity-50" aria-hidden />
          ) : null}
        </Link>
      ))}
    </div>
  );
}

export type ProjectCardProps = {
  project: Project;
  featured?: boolean;
  /** Deck shuffle: compact stacked look */
  deckMode?: boolean;
  deckIndex?: number;
  className?: string;
  /** Skip entrance animation when parent handles it */
  disableReveal?: boolean;
};

export function ProjectCard({
  project,
  featured = false,
  deckMode = false,
  deckIndex = 0,
  className,
  disableReveal = false,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const visual = sectionVisual[project.section];
  const { Icon } = visual;

  const cardInner = (
    <div
      className={cn(
        "fx-glass fx-glass--card relative flex h-full overflow-hidden rounded-2xl",
        featured && "ring-1 ring-white/80 dark:ring-white/15",
        deckMode && "shadow-lg",
      )}
    >
      <div
        className={cn("w-1 shrink-0", visual.stripe)}
        aria-hidden
      />

      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <div className="flex gap-4">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-xl border sm:size-14",
              visual.iconBg,
            )}
          >
            <Icon
              className={cn("size-6 sm:size-7", visual.iconColor)}
              strokeWidth={1.5}
              aria-hidden
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                  statusStyles[project.status],
                )}
              >
                {statusLabels[project.status]}
              </span>
              <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
                {project.period}
              </span>
            </div>
            <p className="mt-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {project.organization}
            </p>
            <h3
              className={cn(
                "mt-2 font-heading leading-snug tracking-tight text-neutral-900 dark:text-neutral-50",
                featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                deckMode && "line-clamp-2",
              )}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {!deckMode ? (
          <>
            <p className="mt-3 text-sm font-medium leading-snug text-neutral-600 dark:text-neutral-300">
              {project.subtitle}
            </p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {project.description}
            </p>

            <ul className="mt-4 space-y-1.5">
              {project.highlights
                .slice(0, featured ? 3 : 2)
                .map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400"
                  >
                    <span
                      className="mt-1.5 size-1 shrink-0 rounded-full bg-neutral-400"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.slice(0, featured ? 5 : 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/70 bg-white/45 px-2 py-0.5 text-[11px] text-neutral-700 backdrop-blur-sm dark:border-white/12 dark:bg-white/8 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 5).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-white/50 text-neutral-700 dark:bg-white/8 dark:text-neutral-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-5 border-t border-white/50 pt-4 dark:border-white/10">
              <ProjectLinkButtons links={project.links} />
            </div>
          </>
        ) : (
          <p className="mt-3 line-clamp-2 text-xs text-neutral-500 dark:text-neutral-400">
            {project.subtitle}
          </p>
        )}
      </div>
    </div>
  );

  const wrapperClass = cn("group relative h-full", className);

  if (disableReveal || prefersReducedMotion) {
    return (
      <motion.article
        className={wrapperClass}
        style={
          deckMode
            ? {
                zIndex: 40 - deckIndex,
                rotate: (deckIndex - 2) * 4,
              }
            : undefined
        }
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-[1.35rem] opacity-0 blur-xl transition-opacity duration-500 bg-gradient-to-br from-[#ff6bcb]/25 via-[#4cc9f0]/20 to-[#7b61ff]/25 group-hover:opacity-100"
        />
        {cardInner}
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      initial={false}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={wrapperClass}
      style={
        deckMode
          ? {
              zIndex: 40 - deckIndex,
              rotate: (deckIndex - 2) * 4,
            }
          : undefined
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-[1.35rem] opacity-0 blur-xl transition-opacity duration-500 bg-gradient-to-br from-[#ff6bcb]/25 via-[#4cc9f0]/20 to-[#7b61ff]/25 group-hover:opacity-100"
      />
      {cardInner}
    </motion.article>
  );
}
