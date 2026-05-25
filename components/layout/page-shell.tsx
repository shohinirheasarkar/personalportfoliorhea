import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { PageEntrance } from "./page-entrance";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}: PageShellProps) {
  return (
    <PageEntrance className={cn("mx-auto w-full max-w-6xl px-6 py-16 md:py-24", className)}>
      <header className="max-w-3xl space-y-4">
        {eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-heading text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>
      {children ? (
        <div className={cn("mt-12", contentClassName)}>{children}</div>
      ) : null}
    </PageEntrance>
  );
}
