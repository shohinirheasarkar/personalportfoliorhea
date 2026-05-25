"use client";

import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { ResearchSectionHeader } from "@/components/research/research-section-header";
import { researchProjects } from "@/data/research";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ResearchProjects() {
  return (
    <section
      aria-labelledby="research-projects"
      className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16"
    >
      <ResearchSectionHeader
        id="research-projects"
        eyebrow="More work"
        title="Research projects"
        description="Internships and collaborations across neuroscience, satellite systems, quantum simulation, and observational astronomy."
      />

      <ul className="mt-10 space-y-6">
        {researchProjects.map((project, index) => (
          <Reveal key={project.id} as="li" delay={index * 0.05} distance={12}>
            <article className="fx-glass fx-glass--card overflow-hidden rounded-2xl">
              <div
                className={cn(
                  "gap-6 p-6 sm:p-8 lg:gap-8",
                  project.documentPdf
                    ? "grid lg:grid-cols-[1fr_minmax(0,280px)]"
                    : "block",
                )}
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                      {project.date}
                    </p>
                    <span className="text-neutral-300 dark:text-neutral-600" aria-hidden>
                      ·
                    </span>
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      {project.organization}
                    </p>
                  </div>

                  <h3 className="font-heading text-xl tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-2xl">
                    {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {project.description}
                  </p>

                  <ul className="space-y-1.5">
                    {project.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
                      >
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <Link
                      href={project.projectHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
                    >
                      View project
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </Link>
                    {project.documentPdf ? (
                      <Link
                        href={project.documentPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "gap-1.5",
                        )}
                      >
                        <FileText className="size-3.5" aria-hidden />
                        {project.documentLabel ?? "View PDF"}
                      </Link>
                    ) : null}
                  </div>
                </div>

                {project.documentPdf ? (
                  <div className="overflow-hidden rounded-xl border border-white/60 bg-neutral-100/60 dark:border-white/10 dark:bg-neutral-950/30">
                    <div className="border-b border-white/50 bg-white/35 px-3 py-2 dark:border-white/10 dark:bg-white/5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                        {project.documentLabel ?? "Document"}
                      </p>
                    </div>
                    <iframe
                      src={`${project.documentPdf}#view=FitH`}
                      title={`${project.title} preview`}
                      className="aspect-[4/5] w-full min-h-[200px] border-0 lg:max-h-[320px]"
                    />
                  </div>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
