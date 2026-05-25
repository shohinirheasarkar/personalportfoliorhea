import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { TimelineEntry } from "@/data/timeline";
import { cn } from "@/lib/utils";

type TimelineCardProps = {
  entry: TimelineEntry;
  className?: string;
};

export function TimelineCard({ entry, className }: TimelineCardProps) {
  return (
    <article
      className={cn(
        "fx-glass fx-glass--card w-full rounded-2xl p-6 sm:p-7",
        className,
      )}
    >
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
        {entry.date}
      </p>
      <h3 className="mt-3 font-heading text-2xl tracking-tight text-neutral-900 dark:text-neutral-50">
        {entry.organization}
      </h3>
      <p className="mt-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        {entry.role}
      </p>
      {entry.description ? (
        <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {entry.description}
        </p>
      ) : null}
      {entry.highlights && entry.highlights.length > 0 ? (
        <ul
          className={cn(
            "space-y-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300",
            entry.description ? "mt-3" : "mt-4",
          )}
        >
          {entry.highlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span
                className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      {entry.projectHref ? (
        <Link
          href={entry.projectHref}
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300"
        >
          View related work
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      ) : null}
    </article>
  );
}
