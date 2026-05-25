import type { Project, ProjectCategory, ProjectSection } from "@/data/projects";
import {
  projectSectionLabels,
  projectSectionOrder,
  projects,
} from "@/data/projects";

export type FilterChip =
  | { kind: "all"; id: "all"; label: "All" }
  | {
      kind: "section";
      id: `section:${ProjectSection}`;
      label: string;
      value: ProjectSection;
    }
  | { kind: "category"; id: `category:${ProjectCategory}`; label: string; value: ProjectCategory }
  | { kind: "tag"; id: `tag:${string}`; label: string; value: string };

export const categoryLabels: Record<ProjectCategory, string> = {
  "machine-learning": "Machine Learning",
  research: "Research",
  "data-visualization": "Data Visualization",
  "scientific-computing": "Scientific Computing",
  "web-development": "Web Development",
};

const categoryOrder: ProjectCategory[] = [
  "machine-learning",
  "research",
  "data-visualization",
  "scientific-computing",
  "web-development",
];

export function buildFilterChips(): FilterChip[] {
  const tagSet = new Set<string>();

  for (const project of projects) {
    for (const tag of project.tags) {
      tagSet.add(tag);
    }
  }

  const tags = [...tagSet].sort((a, b) => a.localeCompare(b));

  return [
    { kind: "all", id: "all", label: "All" },
    ...projectSectionOrder.map(
      (section) =>
        ({
          kind: "section",
          id: `section:${section}`,
          label: projectSectionLabels[section],
          value: section,
        }) satisfies FilterChip,
    ),
    ...categoryOrder.map(
      (category) =>
        ({
          kind: "category",
          id: `category:${category}`,
          label: categoryLabels[category],
          value: category,
        }) satisfies FilterChip,
    ),
    ...tags.map(
      (tag) =>
        ({
          kind: "tag",
          id: `tag:${tag}`,
          label: tag,
          value: tag,
        }) satisfies FilterChip,
    ),
  ];
}

export function filterProjects(
  items: Project[],
  query: string,
  activeFilterIds: Set<string>,
): Project[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((project) => {
    const matchesSearch =
      normalizedQuery.length === 0 ||
      [
        project.title,
        project.subtitle,
        project.description,
        project.organization,
        project.period,
        project.role,
        ...project.tags,
        ...project.techStack,
        categoryLabels[project.category],
        projectSectionLabels[project.section],
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    if (!matchesSearch) return false;

    if (activeFilterIds.size === 0 || activeFilterIds.has("all")) {
      return true;
    }

    return [...activeFilterIds].some((filterId) => {
      if (filterId.startsWith("section:")) {
        return project.section === filterId.replace("section:", "");
      }
      if (filterId.startsWith("category:")) {
        return project.category === filterId.replace("category:", "");
      }
      if (filterId.startsWith("tag:")) {
        return project.tags.includes(filterId.replace("tag:", ""));
      }
      return false;
    });
  });
}
