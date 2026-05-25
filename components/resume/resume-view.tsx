"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, FileText, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  experienceHighlights,
  relevantCoursework,
  resumePdfPath,
  resumeSummary,
} from "@/data/resume";
import { contactLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const viewport = { once: true, margin: "-8%" as const };

function SectionBlock({
  title,
  description,
  children,
  delay = 0,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      <div className="mb-5">
        <h2 className="font-heading text-2xl tracking-tight text-neutral-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        ) : null}
      </div>
      {children}
    </motion.section>
  );
}

export function ResumeView() {
  const prefersReducedMotion = useReducedMotion();
  const [pdfAvailable, setPdfAvailable] = useState(false);

  useEffect(() => {
    fetch(resumePdfPath, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        setPdfAvailable(res.ok && type.includes("pdf"));
      })
      .catch(() => setPdfAvailable(false));
  }, []);

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className="mx-auto w-full max-w-6xl px-6 pb-24 pt-8 md:pt-12"
    >
      <header className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
          Resume
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight text-neutral-900 md:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
          {resumeSummary}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={resumePdfPath}
            download
            className={cn(buttonVariants({ size: "lg" }), "gap-2")}
          >
            <Download className="size-4" aria-hidden />
            Download resume
          </a>
          <a
            href={resumePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
          >
            <FileText className="size-4" aria-hidden />
            Open PDF
          </a>
        </div>
      </header>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] as const }}
        className="mt-10 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/40 shadow-sm backdrop-blur-sm dark:border-white/15 dark:bg-white/5"
      >
        <div className="flex justify-center bg-neutral-100/80 p-4 sm:p-6 dark:bg-neutral-950/40">
          <div
            className="relative w-full bg-white shadow-md dark:bg-neutral-900"
            style={{
              maxWidth: "8.5in",
              aspectRatio: "8.5 / 11",
            }}
          >
          {pdfAvailable ? (
            <iframe
              src={`${resumePdfPath}#view=FitV&toolbar=0&navpanes=0`}
              title="Resume PDF"
              className="absolute inset-0 size-full border-0"
            />
          ) : null}
          {!pdfAvailable ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-neutral-50 to-neutral-100/90 p-8 text-center">
              <FileText className="size-10 text-neutral-300" strokeWidth={1.25} aria-hidden />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                Placeholder preview
              </p>
              <p className="max-w-xs text-sm text-neutral-600">
                Add{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs shadow-sm">
                  public/resume.pdf
                </code>{" "}
                to enable the embedded preview and download.
              </p>
            </div>
          ) : null}
          </div>
        </div>
      </motion.div>

      <div className="mt-16 space-y-16">
        <SectionBlock
          title="Experience highlights"
          description="Three selected roles—see the homepage timeline for full experience."
          delay={0.05}
        >
          <ol className="space-y-4">
            {experienceHighlights.map((entry) => (
              <li
                key={entry.id}
                className="fx-glass fx-glass--card rounded-2xl p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-lg text-neutral-900">
                      {entry.organization}
                    </h3>
                    <p className="text-sm font-medium text-neutral-600">
                      {entry.role}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-neutral-500">{entry.date}</p>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {entry.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-neutral-600"
                    >
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </SectionBlock>

        <SectionBlock
          title="Relevant coursework"
          description="Selected classes at the University of Maryland."
          delay={0.06}
        >
          <div className="fx-glass fx-glass--card rounded-2xl p-5 sm:p-6">
            <ul className="flex flex-wrap gap-2">
              {relevantCoursework.map((course) => (
                <li
                  key={course}
                  className="rounded-full border border-white/70 bg-white/45 px-3 py-1 text-sm text-neutral-700 dark:border-white/12 dark:bg-white/8 dark:text-neutral-300"
                >
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock title="Get in touch" delay={0.08}>
          <div className="fx-glass fx-glass--card rounded-2xl p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <div className="max-w-md">
              <p className="font-heading text-xl text-neutral-900">
                Let&apos;s connect
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Open to research collaborations, internships, and roles in ML,
                scientific computing, and thoughtful software engineering.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:mt-0 sm:items-end">
              <a
                href={`mailto:${siteConfig.email}`}
                className={cn(buttonVariants(), "gap-2")}
              >
                <Mail className="size-4" aria-hidden />
                {siteConfig.email}
              </a>
              <div className="flex flex-wrap gap-2">
                {contactLinks
                  .filter((link) => link.label !== "Gmail")
                  .map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                    >
                      {link.label}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </SectionBlock>
      </div>
    </motion.div>
  );
}
