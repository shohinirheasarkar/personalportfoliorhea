"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/reveal";
import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";

import {
  GitHubIcon,
  GmailIcon,
  LinkedInIcon,
} from "@/components/icons/social-icons";
import { contactLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconMap = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Gmail: GmailIcon,
} as const;

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }, [email]);

  return (
    <motion.button
      type="button"
      onClick={copyEmail}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      className={cn(
        "mt-8 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/45 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors dark:border-white/15 dark:bg-white/10 dark:text-neutral-200",
        "hover:bg-white/65 hover:text-neutral-900 dark:hover:bg-white/15 dark:hover:text-neutral-50",
      )}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? (
        <>
          <Check className="size-4 text-emerald-600" aria-hidden />
          Copied!
        </>
      ) : (
        <>
          <Copy className="size-4 opacity-70" aria-hidden />
          Copy email
        </>
      )}
    </motion.button>
  );
}

type ContactLinkProps = {
  label: keyof typeof iconMap;
  href: string;
  external: boolean;
  index: number;
};

function ContactLink({ label, href, external, index }: ContactLinkProps) {
  const Icon = iconMap[label];
  const prefersReducedMotion = useReducedMotion();

  return (
    <Reveal as="li" delay={index * 0.05} distance={8}>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex flex-col items-center gap-2.5"
      >
        <motion.span
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl border border-white/75 bg-white/50 text-neutral-700 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/10 dark:text-neutral-200",
            "transition-colors group-hover:border-white group-hover:bg-white/80 group-hover:text-neutral-900 dark:group-hover:bg-white/15 dark:group-hover:text-neutral-50",
          )}
          whileHover={
            prefersReducedMotion
              ? undefined
              : { y: -4, scale: 1.06, transition: { duration: 0.2 } }
          }
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
        >
          <Icon className="size-5" />
        </motion.span>
        <span className="text-sm font-medium text-neutral-600 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100">
          {label}
        </span>
      </Link>
    </Reveal>
  );
}

export function ContactFooter() {
  const year = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer className="mt-auto px-6 pb-10 pt-16 md:pt-20">
      <div className="mx-auto w-full max-w-xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          className="fx-glass fx-glass--card rounded-3xl px-8 py-12 text-center sm:px-10 sm:py-14"
        >
          <h2 className="font-heading text-4xl tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">
            Reach out!
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
            I&apos;m always happy to discuss my research, and I am open to new
            opportunities.
          </p>

          <ul className="mt-10 flex flex-wrap items-start justify-center gap-8 sm:gap-10">
            {contactLinks.map((link, index) => (
              <ContactLink
                key={link.label}
                label={link.label}
                href={link.href}
                external={link.external}
                index={index}
              />
            ))}
          </ul>

          <CopyEmailButton email={siteConfig.email} />
        </motion.div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
          ⌘K to jump · type &ldquo;rhea&rdquo; · Konami ↑↑↓↓←→→←BA
        </p>
        <p className="mt-2 text-center font-mono text-xs text-neutral-400 dark:text-neutral-500">
          © {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
