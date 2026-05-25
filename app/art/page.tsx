import type { Metadata } from "next";

import { ArtGallery } from "@/components/art/art-gallery";

export const metadata: Metadata = {
  title: "Art",
  description:
    "Paintings, sketches, and creative work by Shohini Rhea Sarkar—oil, acrylic, watercolor, and digital pieces.",
};

export default function ArtPage() {
  return <ArtGallery />;
}
