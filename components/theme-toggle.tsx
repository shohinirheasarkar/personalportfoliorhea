"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  /** Compact icon-only control for the navbar pill */
  variant?: "icon" | "menu";
};

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full transition-colors",
        "text-neutral-700 hover:bg-white/50 hover:text-neutral-900",
        "dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-neutral-50",
        variant === "icon" && "size-8",
        variant === "menu" &&
          "w-full gap-2 px-3 py-2.5 text-sm font-medium hover:bg-white/55 dark:hover:bg-white/10",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {!mounted ? (
        <span className="size-4" aria-hidden />
      ) : isDark ? (
        <Sun className="size-4" aria-hidden />
      ) : (
        <Moon className="size-4" aria-hidden />
      )}
      {variant === "menu" ? (
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
      ) : null}
    </button>
  );
}
