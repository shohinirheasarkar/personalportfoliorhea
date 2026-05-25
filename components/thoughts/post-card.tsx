"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Post } from "@/data/posts";
import { cn } from "@/lib/utils";

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type PostCardProps = {
  post: Post;
  index: number;
};

export function PostCard({ post, index }: PostCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      <Link
        href={`/thoughts/${post.slug}`}
        className={cn(
          "group fx-glass fx-glass--card flex h-full flex-col rounded-2xl p-6 sm:p-7",
          "transition-shadow duration-300 hover:shadow-[0_14px_40px_rgb(100_120_200/10%)]",
          "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-white/70 bg-white/45 text-neutral-700"
          >
            {post.category}
          </Badge>
          <time
            dateTime={post.date}
            className="ml-auto font-mono text-xs text-neutral-500"
          >
            {formatDate(post.date)}
          </time>
        </div>

        <h2 className="mt-4 font-heading text-xl leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-700 sm:text-2xl">
          {post.title}
        </h2>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/60 bg-white/40 px-2.5 py-0.5 text-xs text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neutral-800">
          Read post
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </motion.li>
  );
}
