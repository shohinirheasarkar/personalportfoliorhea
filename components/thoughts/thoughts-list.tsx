"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PostCard } from "@/components/thoughts/post-card";
import { posts } from "@/data/posts";

export function ThoughtsList() {
  const prefersReducedMotion = useReducedMotion();

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-8 md:pt-12">
      <motion.header
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-12 max-w-2xl md:mb-14"
      >
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
          Thoughts
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl">
          Notes on life, learning, and research!
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
          Quick jots &amp; longer reflections on my various areas of interest
        </p>
      </motion.header>

      {sortedPosts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-neutral-300/80 bg-white/30 px-6 py-12 text-center text-sm text-neutral-500 backdrop-blur-sm dark:border-white/15 dark:bg-white/5 dark:text-neutral-400">
          Posts coming soon — check back later.
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">
          {sortedPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </ul>
      )}
    </section>
  );
}
