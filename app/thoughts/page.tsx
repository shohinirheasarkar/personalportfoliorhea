import type { Metadata } from "next";

import { ThoughtsList } from "@/components/thoughts/thoughts-list";

export const metadata: Metadata = {
  title: "Thoughts",
  description:
    "Notes on life, learning, and research by Shohini Rhea Sarkar.",
};

export default function ThoughtsPage() {
  return <ThoughtsList />;
}
