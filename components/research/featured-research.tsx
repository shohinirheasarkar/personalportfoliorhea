"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";

import { ResearchSectionHeader } from "@/components/research/research-section-header";
import { featuredResearch } from "@/data/research";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FeaturedResearch() {
  const prefersReducedMotion = useReducedMotion();
  const project = featuredResearch;

  return (
    <section
      aria-labelledby="featured-research"
      className="mx-auto w-full max-w-6xl px-6 py-4 md:py-8"
    >
      <ResearchSectionHeader
        id="featured-research"
        eyebrow="Spotlight"
        title="Featured research project"
        description="Interpretable geospatial machine learning for satellite ground-station and RF planning."
      />

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        className="group relative mt-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-[1.4rem] bg-gradient-to-br from-[#ff6bcb]/20 via-[#4cc9f0]/15 to-[#7b61ff]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <article className="fx-rainbow-border fx-rainbow-border--rounded fx-glimmer fx-glimmer--subtle relative">
          <div className="fx-glass fx-glass--panel grid gap-8 rounded-[calc(1rem-2px)] p-8 lg:grid-cols-[1.15fr_1fr] lg:p-10">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-200/80 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-emerald-800 dark:border-emerald-500/30 dark:text-emerald-300">
                  {project.statusLabel}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-snug text-neutral-600 dark:text-neutral-300 md:text-base">
                  {project.subtitle}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
                {project.longDescription}
              </p>

              <ul className="space-y-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
                      aria-hidden
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href={project.writeupHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
                >
                  <FileText className="size-3.5" aria-hidden />
                  Project write-up
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-5 rounded-2xl border border-white/60 bg-white/35 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  Role
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
                  {project.role}
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/60 bg-neutral-100/80 dark:border-white/10 dark:bg-neutral-950/40">
                <div className="flex items-center justify-between border-b border-white/50 bg-white/40 px-3 py-2 dark:border-white/10 dark:bg-white/5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                    Paper preview
                  </p>
                </div>
                <iframe
                  src={`${project.paperPdf}#view=FitH`}
                  title="Research paper preview"
                  className="aspect-[3/4] w-full min-h-[220px] max-h-[280px] border-0"
                />
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  Methods & stack
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/70 bg-white/50 px-2.5 py-0.5 text-xs text-neutral-700 dark:border-white/12 dark:bg-white/8 dark:text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  Tags
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-neutral-900/5 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-white/8 dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </motion.div>
    </section>
  );
}
