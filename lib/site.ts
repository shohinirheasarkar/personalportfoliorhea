function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview}`;

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Shohini Rhea Sarkar",
  title: "Shohini Rhea Sarkar — ML, Research & Applied AI",
  description:
    "CS undergraduate portfolio focused on machine learning, research, and applied artificial intelligence.",
  url: getSiteUrl(),
  email: "shohinirheasarkar@gmail.com",
  location: "United States",
  tagline: "Building models, studying systems, and shipping applied AI.",
} as const;

export type NavItem = {
  href: string;
  label: string;
};

export const primaryNav: NavItem[] = [
  { href: "/", label: "About Me" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
];

export const etcNav: NavItem[] = [
  { href: "/art", label: "Art" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/resume", label: "Resume" },
];

export const etcNavHrefs = etcNav.map((item) => item.href);

export const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/shohinirheasarkar",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shohini-rhea-sarkar-a080641b3/",
    external: true,
  },
  {
    label: "Gmail",
    href: `mailto:${siteConfig.email}`,
    external: false,
  },
] as const;
