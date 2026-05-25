import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getAllPostSlugs, getPostBySlug } from "@/data/posts";
import { cn } from "@/lib/utils";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ThoughtPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pb-24 pt-8 md:pt-12">
      <Link
        href="/thoughts"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-8 -ml-2 text-neutral-600",
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        All thoughts
      </Link>

      <header className="fx-glass fx-glass--card rounded-2xl p-8 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-white/70 bg-white/45 text-neutral-700"
          >
            {post.category}
          </Badge>
          <time
            dateTime={post.date}
            className="font-mono text-xs text-neutral-500"
          >
            {formatDate(post.date)}
          </time>
        </div>

        <h1 className="mt-5 font-heading text-3xl leading-tight tracking-tight text-neutral-900 md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-neutral-600">
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
      </header>

      <div className="mt-10 rounded-2xl border border-dashed border-neutral-300/70 bg-white/35 px-6 py-12 text-center backdrop-blur-sm sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          Full post coming soon
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
          This essay will be published here with MDX support. For now, the
          listing includes the summary above.
        </p>
      </div>
    </article>
  );
}
