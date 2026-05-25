"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  FileText,
  FlaskConical,
  Home,
  Mail,
  Moon,
  Palette,
  PenLine,
  Rocket,
  Sparkles,
  Sun,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social-icons";
import { useTheme } from "@/components/theme-provider";
import {
  commandPaletteConnect,
  commandPalettePages,
  type CommandPaletteItem,
} from "@/lib/command-palette";
import { showSiteToast, triggerPartyMode } from "@/lib/easter-eggs";
import { cn } from "@/lib/utils";

const pageIcons: Record<string, React.ReactNode> = {
  "/": <Home className="size-4 opacity-70" aria-hidden />,
  "/research": <FlaskConical className="size-4 opacity-70" aria-hidden />,
  "/projects": <Briefcase className="size-4 opacity-70" aria-hidden />,
  "/art": <Palette className="size-4 opacity-70" aria-hidden />,
  "/thoughts": <PenLine className="size-4 opacity-70" aria-hidden />,
  "/resume": <FileText className="size-4 opacity-70" aria-hidden />,
};

function connectIcon(label: string) {
  switch (label) {
    case "GitHub":
      return <GitHubIcon className="size-4 opacity-80" />;
    case "LinkedIn":
      return <LinkedInIcon className="size-4 opacity-80" />;
    case "Email":
      return <Mail className="size-4 opacity-70" aria-hidden />;
    default:
      return null;
  }
}

function itemValue(item: CommandPaletteItem) {
  return [item.label, item.href, ...(item.keywords ?? [])].join(" ");
}

export function CommandPalette() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [shortcutLabel, setShortcutLabel] = useState("⌘K");

  useEffect(() => {
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    setShortcutLabel(isMac ? "⌘K" : "Ctrl+K");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const handleSelect = useCallback(
    (item: CommandPaletteItem) => {
      if (item.href.startsWith("mailto:")) {
        runCommand(() => {
          window.location.href = item.href;
        });
        return;
      }

      if (item.external) {
        runCommand(() => {
          window.open(item.href, "_blank", "noopener,noreferrer");
        });
        return;
      }

      runCommand(() => router.push(item.href));
    },
    [router, runCommand],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Search pages and contact links"
      showCloseButton={false}
      className={cn(
        "top-[16%] overflow-visible border-0 bg-transparent p-0 shadow-none ring-0",
        "sm:max-w-md",
      )}
    >
      <div className="fx-rainbow-border fx-rainbow-border--rounded fx-glimmer fx-glimmer--subtle overflow-hidden">
        <Command
          className={cn(
            "fx-glass fx-glass--panel rounded-[calc(1rem-2px)] border-0 bg-transparent p-0",
            "text-neutral-900 shadow-none dark:text-neutral-50",
          )}
        >
          <CommandInput placeholder="Search pages and links…" />
          <CommandList className="max-h-80">
            <CommandEmpty className="text-neutral-500 dark:text-neutral-400">
              No results found.
            </CommandEmpty>
            <CommandGroup heading="Theme">
              <CommandItem
                value="dark mode theme appearance"
                onSelect={() => {
                  setTheme("dark");
                  setOpen(false);
                }}
              >
                <Moon className="size-4 opacity-70" aria-hidden />
                <span>Dark mode</span>
                {theme === "dark" ? (
                  <span className="ml-auto text-xs text-muted-foreground">Active</span>
                ) : null}
              </CommandItem>
              <CommandItem
                value="light mode theme appearance"
                onSelect={() => {
                  setTheme("light");
                  setOpen(false);
                }}
              >
                <Sun className="size-4 opacity-70" aria-hidden />
                <span>Light mode</span>
                {theme === "light" ? (
                  <span className="ml-auto text-xs text-muted-foreground">Active</span>
                ) : null}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator className="bg-neutral-200/70 dark:bg-white/10" />
            <CommandGroup heading="Pages">
              {commandPalettePages.map((item) => (
                <CommandItem
                  key={item.id}
                  value={itemValue(item)}
                  onSelect={() => handleSelect(item)}
                >
                  {pageIcons[item.href]}
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator className="bg-neutral-200/70 dark:bg-white/10" />
            <CommandGroup heading="Discover">
              <CommandItem
                value="sunday lillies art painting gallery"
                onSelect={() => {
                  runCommand(() => router.push("/art"));
                  showSiteToast("Sunday Lillies — on the Art page");
                }}
              >
                <Palette className="size-4 opacity-70" aria-hidden />
                <span>Sunday Lillies</span>
              </CommandItem>
              <CommandItem
                value="satellite leo orbit projects space"
                onSelect={() => {
                  runCommand(() => router.push("/projects"));
                }}
              >
                <Rocket className="size-4 opacity-70" aria-hidden />
                <span>Satellite projects</span>
              </CommandItem>
              <CommandItem
                value="party mode konami fun sparkle"
                onSelect={() => {
                  runCommand(() => triggerPartyMode());
                }}
              >
                <Sparkles className="size-4 opacity-70" aria-hidden />
                <span>Party mode</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator className="bg-neutral-200/70 dark:bg-white/10" />
            <CommandGroup heading="Connect">
              {commandPaletteConnect.map((item) => (
                <CommandItem
                  key={item.id}
                  value={itemValue(item)}
                  onSelect={() => handleSelect(item)}
                >
                  {connectIcon(item.label)}
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-between border-t border-white/60 bg-white/25 px-3 py-2 text-[11px] text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400">
            <span className="hidden sm:inline">
              Tip: type “rhea” or try the Konami code
            </span>
            <span className="sm:hidden">Navigate anywhere</span>
            <CommandShortcut className="rounded-md border border-white/70 bg-white/50 px-1.5 py-0.5 font-mono text-[10px] tracking-normal dark:border-white/15 dark:bg-white/10">
              {shortcutLabel}
            </CommandShortcut>
          </div>
        </Command>
      </div>
    </CommandDialog>
  );
}
