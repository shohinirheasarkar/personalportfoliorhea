import type { Metadata } from "next";

import { ResearchPage } from "@/components/research/research-page";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research interests, featured projects, experience, and scholarly output by Shohini Rhea Sarkar—machine learning for scientific discovery.",
};

export default function ResearchPageRoute() {
  return <ResearchPage />;
}
