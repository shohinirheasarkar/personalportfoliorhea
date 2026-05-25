"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { DropdownMenu } from "@/components/layout/DropdownMenu";
import { ThemeToggle } from "@/components/theme-toggle";
import { showSiteToast } from "@/lib/easter-eggs";
import { etcNav, etcNavHrefs, primaryNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function isPrimaryActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isEtcActive(pathname: string) {
  return etcNavHrefs.some(
    (href) => pathname === href || pathname.startsWith(`${href}/`),
  );
}

function NavLink({
  href,
  label,
  isActive,
  onNavigate,
  className,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "relative rounded-full px-3.5 py-1.5 text-sm transition-all duration-200",
        isActive
          ? "fx-nav-link-active font-semibold text-neutral-900 dark:text-neutral-50"
          : "font-medium text-neutral-600 hover:bg-white/40 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/8 dark:hover:text-neutral-50",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nameClickRef = useRef(0);
  const nameClickTimer = useRef<number | undefined>(undefined);
  const etcActive = isEtcActive(pathname);

  const onNameClick = () => {
    if (nameClickTimer.current !== undefined) {
      window.clearTimeout(nameClickTimer.current);
    }
    nameClickRef.current += 1;
    if (nameClickRef.current >= 3) {
      nameClickRef.current = 0;
      showSiteToast("You found the secret handshake. Explore with ⌘K!");
      return;
    }
    nameClickTimer.current = window.setTimeout(() => {
      nameClickRef.current = 0;
    }, 700);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center gap-3 px-4 pt-4 sm:gap-3.5 sm:pt-5">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto text-center"
      >
        <Link
          href="/"
          onClick={onNameClick}
          className="font-heading text-xl tracking-tight text-neutral-900 transition-opacity hover:opacity-75 dark:text-neutral-50 sm:text-2xl"
        >
          {siteConfig.name}
        </Link>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
        className="pointer-events-auto mb-2 flex w-full max-w-3xl flex-col items-center sm:mb-3"
      >
        <div className="fx-rainbow-border fx-rainbow-border--pill fx-rainbow-border--thin fx-rainbow-border--nav fx-glimmer fx-glimmer--subtle mx-auto w-fit">
          <div className="fx-glass fx-glass--pill fx-glass--nav flex items-center justify-center gap-0.5 px-2 py-1 sm:px-2.5 sm:py-1.5">
            <ul className="hidden items-center justify-center gap-0.5 md:flex">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    isActive={isPrimaryActive(pathname, item.href)}
                  />
                </li>
              ))}
              <li>
                <DropdownMenu
                  items={etcNav}
                  isGroupActive={etcActive}
                  align="center"
                />
              </li>
              <li className="hidden md:block">
                <ThemeToggle />
              </li>
            </ul>

            <div className="flex items-center gap-0.5 md:hidden">
              <ThemeToggle />
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-white/50 dark:text-neutral-200 dark:hover:bg-white/10 md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 w-full overflow-hidden md:hidden"
            >
              <div className="fx-rainbow-border fx-rainbow-border--rounded fx-rainbow-border--thin fx-glimmer fx-glimmer--subtle mx-auto w-full max-w-sm">
                <div className="fx-glass fx-glass--panel flex flex-col gap-1 p-2">
                  {primaryNav.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <NavLink
                        href={item.href}
                        label={item.label}
                        isActive={isPrimaryActive(pathname, item.href)}
                        onNavigate={() => setMobileOpen(false)}
                        className="block w-full px-3 py-2.5 text-center"
                      />
                    </motion.div>
                  ))}

                  <div className="my-1 h-px bg-neutral-300/70 dark:bg-white/10" aria-hidden />

                  <ThemeToggle variant="menu" className="mx-1" />

                  <p className="px-3 pt-1 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Etc.
                  </p>
                  {etcNav.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: (primaryNav.length + index) * 0.05,
                        duration: 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <NavLink
                        href={item.href}
                        label={item.label}
                        isActive={pathname === item.href}
                        onNavigate={() => setMobileOpen(false)}
                        className="block w-full px-3 py-2.5 text-center"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
