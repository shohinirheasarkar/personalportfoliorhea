"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { ArtCard } from "@/components/art/art-card";
import { ArtLightbox } from "@/components/art/art-lightbox";
import { artworks, type Artwork } from "@/data/art";

export function ArtGallery() {
  const [selected, setSelected] = useState<Artwork | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-8 md:pt-12">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12 max-w-2xl md:mb-14"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
            Art
          </p>
          <h1 className="mt-3 font-heading text-4xl tracking-tight text-neutral-900 md:text-5xl">
            Paintings & creative work
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
            A digital diary of all of my artwork!
          </p>
        </motion.header>

        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          {artworks.map((artwork, index) => (
            <ArtCard
              key={artwork.id}
              artwork={artwork}
              index={index}
              onSelect={setSelected}
            />
          ))}
        </ul>
      </section>

      <ArtLightbox
        artwork={selected}
        artworks={artworks}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </>
  );
}
