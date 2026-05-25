"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";

import type { Artwork } from "@/data/art";
import { cn } from "@/lib/utils";

type ArtLightboxProps = {
  artwork: Artwork | null;
  artworks: Artwork[];
  onClose: () => void;
  onNavigate: (artwork: Artwork) => void;
};

export function ArtLightbox({
  artwork,
  artworks,
  onClose,
  onNavigate,
}: ArtLightboxProps) {
  const prefersReducedMotion = useReducedMotion();
  const currentIndex = artwork
    ? artworks.findIndex((item) => item.id === artwork.id)
    : -1;

  const goPrev = useCallback(() => {
    if (currentIndex < 0) return;
    const nextIndex =
      (currentIndex - 1 + artworks.length) % artworks.length;
    onNavigate(artworks[nextIndex]);
  }, [artworks, currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + 1) % artworks.length;
    onNavigate(artworks[nextIndex]);
  }, [artworks, currentIndex, onNavigate]);

  useEffect(() => {
    if (!artwork) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [artwork, goNext, goPrev, onClose]);

  return (
    <AnimatePresence>
      {artwork ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={artwork.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close lightbox"
          />

          <motion.div
            initial={
              prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={
              prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }
            }
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-white/90 shadow-2xl backdrop-blur-xl dark:bg-neutral-900/95"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/60 bg-white/80 text-neutral-700 transition-colors hover:bg-white"
              aria-label="Close"
            >
              <X className="size-4" aria-hidden />
            </button>

            {artworks.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute top-1/2 left-3 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-neutral-700 transition-colors hover:bg-white"
                  aria-label="Previous artwork"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute top-1/2 right-3 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-neutral-700 transition-colors hover:bg-white"
                  aria-label="Next artwork"
                >
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </>
            ) : null}

            <div
              className={cn(
                "relative aspect-[3/4] w-full max-h-[70vh] bg-gradient-to-br sm:max-h-[75vh]",
                artwork.gradient,
              )}
            >
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                unoptimized
                className="object-contain"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>

            <div className="border-t border-neutral-200/80 px-6 py-5 sm:px-8 sm:py-6 dark:border-white/10">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                {artwork.year} · {artwork.medium}
              </p>
              <h2 className="mt-2 font-heading text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
                {artwork.title}
              </h2>
              {artwork.caption ? (
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {artwork.caption}
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
