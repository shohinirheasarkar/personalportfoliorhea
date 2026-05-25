import { contactLinks, etcNav, primaryNav, siteConfig } from "@/lib/site";

export type CommandPaletteItem = {
  id: string;
  label: string;
  href: string;
  group: "pages" | "connect";
  external?: boolean;
  keywords?: string[];
};

const pageItems: CommandPaletteItem[] = [...primaryNav, ...etcNav].map(
  (item) => ({
    id: item.href,
    label: item.label,
    href: item.href,
    group: "pages" as const,
    keywords: [item.label, item.href.replace(/^\//, "")],
  }),
);

const connectItems: CommandPaletteItem[] = contactLinks.map((link) => ({
  id: link.label.toLowerCase(),
  label: link.label === "Gmail" ? "Email" : link.label,
  href:
    link.label === "Gmail" ? `mailto:${siteConfig.email}` : link.href,
  group: "connect" as const,
  external: link.label !== "Gmail",
  keywords:
    link.label === "Gmail"
      ? ["email", "mail", siteConfig.email]
      : [link.label.toLowerCase()],
}));

export const commandPaletteItems: CommandPaletteItem[] = [
  ...pageItems,
  ...connectItems,
];

export const commandPalettePages = pageItems;
export const commandPaletteConnect = connectItems;
