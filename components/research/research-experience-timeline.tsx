"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { ResearchSectionHeader } from "@/components/research/research-section-header";
import { researchExperience } from "@/data/research";

const viewport = { once: true, margin: "-10%" as const };

export function ResearchExperienceTimeline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="research-experience"
      className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20"
    >
      <ResearchSectionHeader
        id="research-experience"
        eyebrow="Experience"
        title="Research experience"
        description="Internships and lab-adjacent work where I have applied ML, scientific computing, and rigorous experimentation."
      />

      <div className="relative mt-12">
        <motion.div
          initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { scaleY: 1, opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-transparent via-neutral-300 to-transparent md:left-6"
          aria-hidden
        />

        <ol className="relative space-y-8">
          {researchExperience.map((entry, index) => (
            <motion.li
              key={entry.id}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="relative pl-12 md:pl-16"
            >
              <motion.span
                initial={prefersReducedMotion ? false : { scale: 0 }}
                whileInView={prefersReducedMotion ? undefined : { scale: 1 }}
                viewport={viewport}
                transition={{ duration: 0.35, delay: index * 0.08 + 0.05 }}
                className="absolute left-2.5 top-6 size-3 rounded-full border-2 border-white bg-neutral-800 shadow-[0_0_0_4px_oklch(0.99_0.004_265)] md:left-4.5"
                aria-hidden
              />

              <article className="fx-glass fx-glass--card rounded-2xl p-6 sm:p-7">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                  {entry.date}
                </p>
                <h3 className="mt-3 font-heading text-2xl tracking-tight text-neutral-900">
                  {entry.organization}
                </h3>
                <p className="mt-1 text-sm font-semibold text-neutral-700">
                  {entry.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {entry.description}
                </p>
                {entry.projectHref ? (
                  <Link
                    href={entry.projectHref}
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600"
                  >
                    View related work
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                ) : null}
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
