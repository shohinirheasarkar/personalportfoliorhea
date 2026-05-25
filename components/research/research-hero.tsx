"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ResearchHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 pb-4 pt-8 md:pt-12">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="fx-glass fx-glass--card relative overflow-hidden rounded-3xl px-8 py-12 sm:px-12 sm:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-gradient-to-br from-violet-200/50 to-cyan-200/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -left-12 size-48 rounded-full bg-gradient-to-tr from-rose-200/40 to-amber-100/30 blur-3xl"
        />

        <div className="relative max-w-3xl space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
            Machine Learning · Interpretability · Applied to Science
          </p>
          <h1 className="font-heading text-5xl leading-[1.02] tracking-tight text-neutral-900 dark:text-neutral-50 md:text-6xl lg:text-7xl">
            Research
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-xl">
            My research focus is dual: much of my background is in exploring how
            various AI systems can be used to support scientific discovery, from
            neural time series data to satellite anomaly detection, but my
            future interests lie more in theoretical AI, how the underlying
            algorithms operate and how they can be improved.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
