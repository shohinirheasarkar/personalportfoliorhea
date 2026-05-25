import { timelineEntries } from "@/data/timeline";

export type ExperienceHighlight = {
  id: string;
  date: string;
  organization: string;
  role: string;
  highlights: string[];
};

export const resumePdfPath = "/resume.pdf";

export const resumeSummary =
  "Undergraduate at the University of Maryland, majoring in Computer Science with a concentration in Machine Learning and a minor in Statistics. Research experience across several national labs and industry experience at Amazon. Always looking to expand my technical knowledge!";

export const relevantCoursework: string[] = [
  "Natural Language Processing",
  "Intro to Artificial Intelligence",
  "Intro to Data Science",
  "Computer Systems",
  "Object Oriented Programming",
  "Algorithms",
  "Discrete Math",
  "Multivariable Calculus",
  "Linear Algebra",
];

/** Three roles highlighted on the resume page (from homepage timeline). */
const highlightedExperienceIds = [
  "umd-app-dev-leo",
  "arl-2024-2025",
  "amazon-2026",
] as const;

function timelineToHighlight(
  entry: (typeof timelineEntries)[number],
): ExperienceHighlight {
  return {
    id: entry.id,
    date: entry.date,
    organization: entry.organization,
    role: entry.role,
    highlights: [
      ...(entry.description.trim() ? [entry.description.trim()] : []),
      ...(entry.highlights ?? []),
    ],
  };
}

export const experienceHighlights: ExperienceHighlight[] =
  highlightedExperienceIds
    .map((id) => timelineEntries.find((entry) => entry.id === id))
    .filter((entry): entry is (typeof timelineEntries)[number] => !!entry)
    .map(timelineToHighlight);
