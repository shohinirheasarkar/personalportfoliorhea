"use client";

import { motion, useReducedMotion } from "framer-motion";

import { TimelineCard } from "@/components/home/timeline-card";
import { Reveal } from "@/components/reveal";
import { timelineEntries } from "@/data/timeline";
import { cn } from "@/lib/utils";

const viewport = { once: true, margin: "-12% 0px -8% 0px" as const };

const lineReveal = {
  hidden: { scaleY: 0, opacity: 0 },
  show: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function TimelineRow({
  entry,
  index,
  prefersReducedMotion,
}: {
  entry: (typeof timelineEntries)[number];
  index: number;
  prefersReducedMotion: boolean;
}) {
  const isRight = index % 2 === 0;

  const dotMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0 },
        whileInView: { opacity: 1, scale: 1 },
        viewport,
        transition: {
          duration: 0.35,
          delay: 0.04,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  return (
    <li className="relative">
      {/* Desktop: alternating left / right */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_2.75rem_1fr] lg:items-center lg:gap-8">
        <div
          className={cn(
            "flex justify-end",
            isRight ? "lg:col-start-3 lg:justify-start" : "lg:col-start-1",
          )}
        >
          <Reveal
            direction={isRight ? "right" : "left"}
            distance={16}
            delay={0.05}
            viewport={viewport}
            className="w-full max-w-md"
          >
            <TimelineCard entry={entry} />
          </Reveal>
        </div>

        <div className="relative flex justify-center lg:col-start-2">
          <motion.div
            {...dotMotion}
            className="relative z-10 size-3.5 shrink-0 rounded-full border-2 border-white bg-neutral-800 shadow-[0_0_0_4px_oklch(0.99_0.004_265)]"
            aria-hidden
          />
        </div>

      </div>

      {/* Mobile: stacked, centered line */}
      <div className="flex flex-col items-center gap-5 lg:hidden">
        <motion.div
          {...dotMotion}
          className="relative z-10 size-3.5 shrink-0 rounded-full border-2 border-white bg-neutral-800 shadow-[0_0_0_4px_oklch(0.99_0.004_265)]"
          aria-hidden
        />
        <Reveal
          direction="up"
          distance={12}
          delay={0.05}
          viewport={viewport}
          className="w-full max-w-lg"
        >
          <TimelineCard entry={entry} />
        </Reveal>
      </div>
    </li>
  );
}

export function TimelineSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      aria-labelledby="timeline-heading"
      className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20 md:py-28"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-14 text-center md:mb-16"
      >
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
          Experience
        </p>
        <h2
          id="timeline-heading"
          className="mt-3 font-heading text-3xl tracking-tight text-neutral-900 md:text-4xl"
        >
          Where I&apos;ve worked
        </h2>
      </motion.div>

      <div className="relative">
        <motion.div
          variants={lineReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-transparent via-neutral-300 to-transparent lg:block"
          aria-hidden
        />
        <motion.div
          variants={lineReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-transparent via-neutral-300 to-transparent lg:hidden"
          aria-hidden
        />

        <ol className="relative flex flex-col gap-12 lg:gap-20">
          {timelineEntries.map((entry, index) => (
            <TimelineRow
              key={entry.id}
              entry={entry}
              index={index}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
