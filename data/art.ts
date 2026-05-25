export type ArtworkAspect = "square" | "portrait" | "landscape";

export type Artwork = {
  id: string;
  title: string;
  medium: string;
  year: number;
  /** Path under /public, e.g. /art/my-piece.jpg */
  image: string;
  /** Optional story or note shown in the lightbox */
  caption?: string;
  aspect: ArtworkAspect;
  /** Fallback gradient if image fails to load (Tailwind classes) */
  gradient?: string;
};

/**
 * Add a new piece:
 * 1. Export the photo as JPG, PNG, or WebP (browsers do not display HEIC).
 *    From HEIC on Mac: `sips -s format jpeg your-file.heic --out public/art/your-slug.jpg`
 * 2. Save it to `public/art/your-slug.jpg` (use a short kebab-case filename).
 * 3. Append an entry below with a unique `id`, `image: "/art/your-slug.jpg"`,
 *    and `aspect` matching the photo (portrait / landscape / square).
 * 4. Omit `caption` if you do not want a description in the lightbox.
 */
export const artworks: Artwork[] = [
  {
    id: "sunday-lillies",
    title: "Sunday Lillies",
    medium: "Oil paint on canvas",
    year: 2025,
    image: "/art/lillies.jpg",
    caption:
      "A quick little Sunday afternoon oil painting with my sister :)",
    aspect: "portrait",
    gradient: "from-amber-100 via-lime-50 to-emerald-100",
  },
  {
    id: "rani",
    title: "Rani",
    medium: "Acrylic on canvas",
    year: 2025,
    image: "/art/rani.jpg",
    aspect: "portrait",
    gradient: "from-violet-100 via-fuchsia-50 to-rose-100",
  },
];

export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find((artwork) => artwork.id === id);
}
