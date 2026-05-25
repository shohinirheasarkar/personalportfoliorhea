"use client";

import { useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/reveal";
import {
  BrainCircuit,
  Microscope,
  ScanSearch,
  type LucideIcon,
} from "lucide-react";

import { ResearchSectionHeader } from "@/components/research/research-section-header";
import { researchInterests } from "@/data/research";
import { cn } from "@/lib/utils";

const interestIcons: Record<string, LucideIcon> = {
  "ml-scientific-discovery": Microscope,
  nlp: BrainCircuit,
  "interpretable-ml": ScanSearch,
};

export function ResearchInterests() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="research-interests"
      className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20"
    >
      <ResearchSectionHeader
        id="research-interests"
        eyebrow="Focus areas"
        title="Research interests"
        description="Current areas of interest"
      />

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {researchInterests.map((interest, index) => {
          const Icon = interestIcons[interest.id] ?? Microscope;

          return (
            <Reveal
              key={interest.id}
              as="li"
              delay={index * 0.04}
              distance={10}
              whileHover={
                prefersReducedMotion ? undefined : { y: -4, transition: { duration: 0.2 } }
              }
            >
              <article
                className={cn(
                  "fx-glass fx-glass--card group h-full rounded-2xl p-6",
                  "transition-shadow duration-300 hover:shadow-[0_12px_40px_rgb(120_140_255/12%)]",
                )}
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/70 bg-white/50 text-neutral-700 backdrop-blur-sm transition-colors group-hover:bg-white/75">
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-4 font-heading text-lg leading-snug tracking-tight text-neutral-900 dark:text-neutral-50">
                  {interest.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {interest.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
