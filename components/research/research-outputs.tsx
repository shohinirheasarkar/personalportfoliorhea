"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText, Layout, Presentation } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ResearchSectionHeader } from "@/components/research/research-section-header";
import { researchOutputCategories } from "@/data/research";

const outputIcons: Record<string, LucideIcon> = {
  publications: FileText,
  posters: Layout,
  presentations: Presentation,
};

const viewport = { once: true, margin: "-10%" as const };

export function ResearchOutputs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="research-outputs"
      className="mx-auto w-full max-w-6xl px-6 pb-24 pt-4 md:pb-28"
    >
      <ResearchSectionHeader
        id="research-outputs"
        eyebrow="Scholarly output"
        title="Publications, posters & presentations"
        description="An archive of my work!"
      />

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {researchOutputCategories.map((category, index) => {
          const Icon = outputIcons[category.id] ?? FileText;

          return (
            <motion.li
              key={category.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <article className="fx-glass fx-glass--card flex h-full flex-col rounded-2xl p-6 sm:p-7">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/70 bg-white/45 text-neutral-600 dark:border-white/12 dark:bg-white/8 dark:text-neutral-300">
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                </span>

                <h3 className="mt-5 font-heading text-xl tracking-tight text-neutral-900 dark:text-neutral-50">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {category.description}
                </p>

                <ul className="mt-6 space-y-2 border-t border-white/50 pt-5 dark:border-white/10">
                  {category.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-2 rounded-lg border border-white/50 bg-white/30 px-3 py-2.5 transition-colors hover:border-white/80 hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
                      >
                        <span className="text-sm leading-snug text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-50">
                          {item.title}
                        </span>
                        <ArrowUpRight
                          className="mt-0.5 size-3.5 shrink-0 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-600 dark:group-hover:text-neutral-200"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
