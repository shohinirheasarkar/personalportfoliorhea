import { FeaturedResearch } from "@/components/research/featured-research";
import { ResearchHero } from "@/components/research/research-hero";
import { ResearchInterests } from "@/components/research/research-interests";
import { ResearchOutputs } from "@/components/research/research-outputs";
import { ResearchProjects } from "@/components/research/research-projects";

export function ResearchPage() {
  return (
    <>
      <ResearchHero />
      <ResearchInterests />
      <FeaturedResearch />
      <ResearchProjects />
      <ResearchOutputs />
    </>
  );
}
