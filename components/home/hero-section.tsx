"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";
import { HEADSHOT_CAPTIONS, showSiteToast } from "@/lib/easter-eggs";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function HeroSection() {
  const [captionIndex, setCaptionIndex] = useState(0);

  const onHeadshotClick = useCallback(() => {
    const next = (captionIndex + 1) % HEADSHOT_CAPTIONS.length;
    setCaptionIndex(next);
    showSiteToast(HEADSHOT_CAPTIONS[next]!);
  }, [captionIndex]);

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-4 md:pt-8 lg:pb-32">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.75fr)] lg:gap-16 xl:gap-20">
        <div className="space-y-8 lg:space-y-10">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="fx-glass fx-glass--card fx-hero-card rounded-3xl px-6 py-8 sm:px-8 sm:py-10"
          >
            <motion.h1
              custom={0.08}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="font-heading text-[clamp(2.75rem,7vw,4.5rem)] leading-[1.02] tracking-tight text-neutral-900 dark:text-neutral-50"
            >
              {profile.headline}
            </motion.h1>

            <motion.p
              custom={0.16}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-xl"
            >
              {profile.subtitle}
            </motion.p>
          </motion.div>

          <motion.p
            custom={0.24}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-xl text-base font-medium leading-relaxed text-neutral-700 dark:text-neutral-200 md:text-lg"
          >
            {profile.positioning}
          </motion.p>

          <div className="flex flex-wrap gap-2.5">
            {profile.chips.map((chip, index) => (
              <Reveal
                key={chip}
                as="span"
                delay={0.04 * index}
                distance={8}
                className="fx-chip-float rounded-full border border-white/80 bg-white/50 px-3.5 py-1.5 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/10 dark:text-neutral-200 md:text-sm"
                style={{ animationDelay: `${index * 0.18}s` }}
              >
                {chip}
              </Reveal>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            {...float}
            className="fx-rainbow-border fx-rainbow-border--rounded fx-glimmer w-full max-w-sm"
          >
            <button
              type="button"
              onClick={onHeadshotClick}
              className={cn(
                "fx-glass fx-glass--card relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[calc(1.25rem-2px)]",
                "transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              )}
              aria-label="Portrait — click for a surprise"
            >
              <Image
                src="/headshot.png"
                alt="Portrait of Rhea Sarkar"
                fill
                priority
                sizes="(max-width: 1024px) 85vw, 380px"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/10"
                aria-hidden
              />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
