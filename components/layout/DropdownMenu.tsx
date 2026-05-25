"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

type DropdownMenuProps = {
  label?: string;
  items: NavItem[];
  isGroupActive?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
};

export function DropdownMenu({
  label = "Etc.",
  items,
  isGroupActive = false,
  align = "end",
  className,
}: DropdownMenuProps) {
  const pathname = usePathname();
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [open, setOpen] = useState(false);
  const [isTouchMode, setIsTouchMode] = useState(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  }, [clearCloseTimer]);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateMode = () => setIsTouchMode(mq.matches);
    updateMode();
    mq.addEventListener("change", updateMode);
    return () => mq.removeEventListener("change", updateMode);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const handleTriggerClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onMouseEnter={() => {
        if (!isTouchMode) openMenu();
      }}
      onMouseLeave={() => {
        if (!isTouchMode) scheduleClose();
      }}
    >
      <button
        type="button"
        id={`${menuId}-trigger`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${menuId}-menu`}
        onClick={handleTriggerClick}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-all duration-200",
          isGroupActive
            ? "fx-nav-link-active font-semibold text-neutral-900 dark:text-neutral-50"
            : "font-medium text-neutral-600 hover:bg-white/40 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/8 dark:hover:text-neutral-50",
        )}
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          <ChevronDown className="size-3.5 opacity-70" aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={`${menuId}-menu`}
            role="menu"
            aria-labelledby={`${menuId}-trigger`}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute top-[calc(100%+0.55rem)] z-50 min-w-[11rem]",
              align === "end" && "right-0",
              align === "start" && "left-0",
              align === "center" &&
                "left-1/2 -translate-x-1/2",
            )}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <div className="fx-glass fx-glass--panel fx-glimmer fx-glimmer--subtle overflow-hidden p-1.5">
              <ul className="flex flex-col gap-0.5">
                {items.map((item, index) => {
                  const isActive = pathname === item.href;

                  return (
                    <motion.li
                      key={item.href}
                      role="none"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.04,
                        duration: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        role="menuitem"
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-xl px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "font-bold text-neutral-900"
                            : "font-medium text-neutral-700 hover:bg-white/55 hover:text-neutral-900",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
