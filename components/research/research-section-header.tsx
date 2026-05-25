"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type ResearchSectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function ResearchSectionHeader({
  id,
  eyebrow,
  title,
  description,
  className,
}: ResearchSectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.header
      id={id}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn("max-w-2xl space-y-3", className)}
    >
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
          {description}
        </p>
      ) : null}
    </motion.header>
  );
}
