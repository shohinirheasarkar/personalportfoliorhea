import type { Metadata } from "next";

import { ProjectsView } from "@/components/projects/projects-view";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Satellite ML, neuroscience pipelines, quantum simulation, and research software by Shohini Rhea Sarkar—with papers, slides, and project links.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
