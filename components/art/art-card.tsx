"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import type { Artwork } from "@/data/art";
import { cn } from "@/lib/utils";

const aspectClasses: Record<Artwork["aspect"], string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

type ArtCardProps = {
  artwork: Artwork;
  index: number;
  onSelect: (artwork: Artwork) => void;
};

export function ArtCard({ artwork, index, onSelect }: ArtCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.5,
        delay: (index % 6) * 0.05,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="break-inside-avoid"
    >
      <button
        type="button"
        onClick={() => onSelect(artwork)}
        className={cn(
          "group relative w-full overflow-hidden rounded-xl text-left",
          "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.99_0.004_265)]",
        )}
        aria-label={`View ${artwork.title}, ${artwork.medium}, ${artwork.year}`}
      >
        <motion.div
          className={cn(
            "relative w-full overflow-hidden bg-gradient-to-br",
            aspectClasses[artwork.aspect],
            artwork.gradient,
          )}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="relative z-0 object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-neutral-900/0 transition-colors duration-300 group-hover:bg-neutral-900/5"
            aria-hidden
          />

          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-neutral-900/75 via-neutral-900/25 to-transparent p-4 sm:p-5",
              "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              "group-focus-visible:opacity-100",
            )}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
              {artwork.year}
            </p>
            <h3 className="mt-1 font-heading text-lg leading-tight text-white sm:text-xl">
              {artwork.title}
            </h3>
            <p className="mt-1 text-sm text-white/85">{artwork.medium}</p>
          </div>
        </motion.div>
      </button>
    </motion.li>
  );
}
