"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import {
  OrganizedProjectGrids,
  ProjectsDeckLayout,
  useProjectDeck,
} from "@/components/projects/project-deck-reveal";
import { Input } from "@/components/ui/input";
import {
  projectSectionLabels,
  projectSectionOrder,
  projects,
  type ProjectSection,
} from "@/data/projects";
import {
  buildFilterChips,
  filterProjects,
  type FilterChip,
} from "@/lib/project-filters";
import { cn } from "@/lib/utils";

const filterChips = buildFilterChips();

function FilterChipButton({
  chip,
  isActive,
  onToggle,
}: {
  chip: FilterChip;
  isActive: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={() => onToggle(chip.id)}
      className={cn(
        "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
        isActive
          ? "border-white/90 bg-white/75 text-neutral-900 shadow-sm dark:border-white/25 dark:bg-white/15 dark:text-neutral-50"
          : "border-white/50 bg-white/30 text-neutral-600 hover:bg-white/50 hover:text-neutral-900 dark:border-white/12 dark:bg-white/5 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-100",
      )}
      whileTap={{ scale: 0.97 }}
    >
      {chip.label}
    </motion.button>
  );
}

function SectionJumpNav({
  sections,
  onJump,
}: {
  sections: ProjectSection[];
  onJump: (section: ProjectSection) => void;
}) {
  return (
    <nav
      aria-label="Jump to project section"
      className="flex flex-wrap gap-2"
    >
      {sections.map((section) => (
        <button
          key={section}
          type="button"
          onClick={() => onJump(section)}
          className="rounded-full border border-white/60 bg-white/40 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-white/70 dark:border-white/12 dark:bg-white/8 dark:text-neutral-300 dark:hover:bg-white/12"
        >
          {projectSectionLabels[section]}
        </button>
      ))}
    </nav>
  );
}

export function ProjectsView() {
  const [query, setQuery] = useState("");
  const [activeFilterIds, setActiveFilterIds] = useState<Set<string>>(
    () => new Set(),
  );
  const prefersReducedMotion = useReducedMotion();

  const hasFilters = activeFilterIds.size > 0;
  const deckEnabled = !query && !hasFilters;

  const { phase, skipDeck, deckActive } = useProjectDeck(deckEnabled);

  const filtered = useMemo(
    () => filterProjects(projects, query, activeFilterIds),
    [query, activeFilterIds],
  );

  const featuredFiltered = useMemo(
    () =>
      filtered
        .filter((project) => project.featured)
        .sort((a, b) => b.year - a.year),
    [filtered],
  );

  const nonFeaturedFiltered = useMemo(
    () =>
      filtered
        .filter((project) => !project.featured)
        .sort((a, b) => b.year - a.year),
    [filtered],
  );

  const bySection = useMemo(
    () =>
      projectSectionOrder.map((section) => ({
        section,
        projects: nonFeaturedFiltered.filter((p) => p.section === section),
      })),
    [nonFeaturedFiltered],
  );

  const deckProjects = useMemo(() => [...filtered], [filtered]);

  const sectionsWithResults = useMemo(() => {
    return bySection
      .filter((group) => group.projects.length > 0)
      .map((group) => group.section);
  }, [bySection]);

  const toggleFilter = (id: string) => {
    if (id === "all") {
      setActiveFilterIds(new Set());
      return;
    }

    setActiveFilterIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const jumpToSection = (section: ProjectSection) => {
    skipDeck();
    requestAnimationFrame(() => {
      document
        .getElementById(`projects-section-${section}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const isAllActive = activeFilterIds.size === 0;
  const showFeatured = featuredFiltered.length > 0;
  const showGrouped =
    nonFeaturedFiltered.length > 0 && !hasFilters && !query;

  const showDeck = deckActive && deckEnabled && filtered.length > 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-8 md:pt-12">
      <motion.header
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        className="fx-glass fx-glass--card relative overflow-hidden rounded-3xl px-8 py-10 sm:px-12 sm:py-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-gradient-to-br from-violet-200/50 to-cyan-200/40 blur-3xl dark:from-violet-500/20 dark:to-cyan-500/15"
        />
        <div className="relative max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
            Research . Fun Builds . Side Projects
          </p>
          <h1 className="font-heading text-4xl leading-tight tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-6xl">
            Projects
          </h1>
          <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            My work across a variety of domains, each with slides, papers, or
            demos you can open directly.
          </p>
        </div>
      </motion.header>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className="fx-glass fx-glass--card mt-8 space-y-5 rounded-2xl p-5 sm:p-6"
      >
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Search by title, org, stack, or tag…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 border-white/60 bg-white/50 pl-9 text-neutral-900 placeholder:text-neutral-400 focus-visible:bg-white/70 dark:border-white/15 dark:bg-white/8 dark:text-neutral-100 dark:placeholder:text-neutral-500"
            aria-label="Search projects"
          />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            Filter by domain, category, or tag
          </p>
          <motion.div
            layout
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filterChips.map((chip) => (
              <FilterChipButton
                key={chip.id}
                chip={chip}
                isActive={
                  chip.kind === "all"
                    ? isAllActive
                    : activeFilterIds.has(chip.id)
                }
                onToggle={toggleFilter}
              />
            ))}
          </motion.div>
        </div>

        {showGrouped && sectionsWithResults.length > 1 && !showDeck ? (
          <SectionJumpNav sections={sectionsWithResults} onJump={jumpToSection} />
        ) : null}

        <motion.p
          layout
          className="font-mono text-xs text-neutral-500 dark:text-neutral-400"
        >
          {filtered.length} project{filtered.length === 1 ? "" : "s"} shown
          {showDeck ? " · shuffling into view" : ""}
        </motion.p>
      </motion.div>

      <section className="mt-14 md:mt-16" aria-label="Project listings">
        {showDeck ? (
          <h2 className="sr-only">Shuffling project cards</h2>
        ) : null}

        <ProjectsDeckLayout
          deckActive={showDeck}
          deckPhase={phase}
          featured={featuredFiltered}
          bySection={bySection}
          showFeatured={showFeatured}
          deckProjects={deckProjects}
          onSkipDeck={skipDeck}
          organized={
            <>
              {!showDeck && showFeatured && showGrouped ? (
                <div className="mb-8">
                  <h2
                    id="featured-projects"
                    className="font-heading text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl"
                  >
                    Featured projects
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Selected work across research and engineering
                  </p>
                </div>
              ) : null}

              {!showDeck && showGrouped ? (
                <div
                  className={cn(
                    "mb-8",
                    showFeatured && "mt-2",
                  )}
                >
                  <h2
                    id="all-projects"
                    className="font-heading text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl"
                  >
                    {showFeatured ? "More projects" : "All projects"}
                  </h2>
                  {showFeatured ? (
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      Grouped by topic area
                    </p>
                  ) : null}
                </div>
              ) : !showDeck && !showGrouped ? (
                <div className="mb-8">
                  <h2
                    id="all-projects"
                    className="font-heading text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl"
                  >
                    {showFeatured ? "Featured & more" : "All projects"}
                  </h2>
                </div>
              ) : null}

              <OrganizedProjectGrids
                featured={featuredFiltered}
                bySection={bySection}
                showFeatured={showFeatured}
                showGrouped={showGrouped}
                filteredNonFeatured={nonFeaturedFiltered}
                filteredAll={filtered}
                showFeaturedSection={showGrouped}
                hasFilters={hasFilters}
                query={query}
                emptyMessage="No projects match your search or filters. Try clearing a filter or different keywords."
                animateEntrance={false}
              />
            </>
          }
        />
      </section>
    </div>
  );
}
