"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import {
  projectSectionLabels,
  type Project,
  type ProjectSection,
} from "@/data/projects";
import { cn } from "@/lib/utils";

export type DeckPhase = "entering" | "stacked" | "fan" | "settling" | "organized";

const ease = [0.22, 1, 0.36, 1] as const;
const COLS = 3;
const CARD_W = 300;
const CARD_H = 210;
const GAP_X = 22;
const GAP_Y = 22;

type Slot = { x: number; y: number };

function buildSlotMap(
  featured: Project[],
  bySection: { section: ProjectSection; projects: Project[] }[],
  showFeatured: boolean,
): { slots: Record<string, Slot>; height: number } {
  const slots: Record<string, Slot> = {};
  const centerOffset = ((COLS - 1) * (CARD_W + GAP_X)) / 2;
  let y = 48;

  const placeRow = (items: Project[], startY: number) => {
    items.forEach((project, index) => {
      const col = index % COLS;
      const row = Math.floor(index / COLS);
      slots[project.slug] = {
        x: col * (CARD_W + GAP_X) - centerOffset,
        y: startY + row * (CARD_H + GAP_Y),
      };
    });
    const rows = Math.ceil(items.length / COLS) || 0;
    return startY + rows * (CARD_H + GAP_Y);
  };

  if (showFeatured && featured.length > 0) {
    y = placeRow(featured, y) + 64;
  }

  for (const { projects: sectionProjects } of bySection) {
    if (sectionProjects.length === 0) continue;
    y += 40;
    y = placeRow(sectionProjects, y) + 48;
  }

  return { slots, height: y + 80 };
}

function stackPose(index: number, total: number): Slot & { rotate: number; scale: number } {
  const center = (total - 1) / 2;
  return {
    x: (index - center) * 7,
    y: -index * 5,
    rotate: (index - center) * 3.5,
    scale: 1 - index * 0.016,
  };
}

function fanPose(index: number, total: number): Slot & { rotate: number; scale: number } {
  const center = (total - 1) / 2;
  return {
    x: (index - center) * 48,
    y: -index * 7 + (index % 2 === 0 ? -6 : 6),
    rotate: (index - center) * 11,
    scale: 0.9,
  };
}

function enteringPose(index: number): Slot & { rotate: number; scale: number; opacity: number } {
  return {
    x: -520 - index * 12,
    y: index * 4,
    rotate: -6 + index * 0.5,
    scale: 0.94,
    opacity: 0.85,
  };
}

const phaseLabels: Record<DeckPhase, string> = {
  entering: "Gathering projects…",
  stacked: "Stacking the deck…",
  fan: "Spreading cards…",
  settling: "Placing into sections…",
  organized: "",
};

export function useProjectDeck(enabled: boolean) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = enabled && !prefersReducedMotion;

  const [phase, setPhase] = useState<DeckPhase>(
    shouldAnimate ? "entering" : "organized",
  );

  useEffect(() => {
    if (!shouldAnimate) {
      setPhase("organized");
      return;
    }

    setPhase("entering");
    const t1 = window.setTimeout(() => setPhase("stacked"), 1000);
    const t2 = window.setTimeout(() => setPhase("fan"), 1600);
    const t3 = window.setTimeout(() => setPhase("settling"), 2400);
    const t4 = window.setTimeout(() => setPhase("organized"), 5200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [shouldAnimate]);

  const skipDeck = useCallback(() => setPhase("organized"), []);

  return {
    phase,
    skipDeck,
    deckActive: phase !== "organized",
    shouldAnimate,
  };
}

type ProjectDeckStageProps = {
  featured: Project[];
  bySection: { section: ProjectSection; projects: Project[] }[];
  showFeatured: boolean;
  allProjects: Project[];
  phase: DeckPhase;
  onSkip: () => void;
};

export function ProjectDeckStage({
  featured,
  bySection,
  showFeatured,
  allProjects,
  phase,
  onSkip,
}: ProjectDeckStageProps) {
  const { slots, height } = useMemo(
    () => buildSlotMap(featured, bySection, showFeatured),
    [featured, bySection, showFeatured],
  );

  const total = allProjects.length;
  const isSettling = phase === "settling";
  const arenaHeight = isSettling ? height : 320;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Arranging project cards"
      className="relative w-full overflow-visible"
    >
      <motion.p
        key={phase}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400"
      >
        {phaseLabels[phase]}
      </motion.p>

      <motion.div
        animate={{ height: arenaHeight }}
        transition={{ duration: isSettling ? 1.4 : 0.5, ease }}
        className="relative mx-auto w-full max-w-6xl overflow-visible"
      >
        <div
          className={cn(
            "relative w-full",
            isSettling ? "min-h-0" : "flex min-h-[280px] items-center justify-center",
          )}
          style={{ height: isSettling ? arenaHeight : undefined }}
        >
          {allProjects.map((project, index) => {
            const stack = stackPose(index, total);
            const fan = fanPose(index, total);
            const enter = enteringPose(index);
            const slot = slots[project.slug] ?? stack;

            let pose: Slot & { rotate?: number; scale?: number; opacity?: number };

            switch (phase) {
              case "entering":
              case "stacked":
                pose = stack;
                break;
              case "fan":
                pose = fan;
                break;
              case "settling":
                pose = { ...slot, rotate: 0, scale: 1, opacity: 1 };
                break;
              default:
                pose = stack;
            }

            const transition =
              phase === "settling"
                ? {
                    duration: 1.85,
                    ease,
                    delay: index * 0.07,
                  }
                : phase === "entering"
                  ? {
                      type: "spring" as const,
                      stiffness: 120,
                      damping: 16,
                      delay: index * 0.07,
                    }
                  : {
                      type: "spring" as const,
                      stiffness: 260,
                      damping: 22,
                      delay: index * 0.03,
                    };

            return (
              <motion.div
                key={project.slug}
                className="absolute left-1/2 top-0 w-[min(100%,300px)] -translate-x-1/2"
                initial={{
                  x: enter.x,
                  y: enter.y,
                  rotate: enter.rotate,
                  scale: enter.scale,
                  opacity: 0,
                }}
                animate={{
                  x: pose.x,
                  y: pose.y,
                  rotate: pose.rotate ?? 0,
                  scale: pose.scale ?? 1,
                  opacity: pose.opacity ?? 1,
                }}
                transition={transition}
                style={{
                  zIndex: total - index + (phase === "fan" ? index : 0),
                }}
              >
                <ProjectCard
                  project={project}
                  deckMode={!isSettling}
                  deckIndex={index}
                  disableReveal
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {isSettling ? (
        <div className="pointer-events-none mt-8 space-y-10 opacity-40">
          {showFeatured && featured.length > 0 ? (
            <p className="font-heading text-lg text-neutral-400">Featured projects</p>
          ) : null}
          {bySection.map(
            ({ section, projects: sectionProjects }) =>
              sectionProjects.length > 0 ? (
                <p
                  key={section}
                  className="font-heading text-lg text-neutral-400"
                >
                  {projectSectionLabels[section]}
                </p>
              ) : null,
          )}
        </div>
      ) : null}

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onSkip}
        className="mx-auto mt-8 block text-xs text-neutral-500 underline-offset-2 hover:text-neutral-800 hover:underline dark:text-neutral-400 dark:hover:text-neutral-200"
      >
        Skip animation
      </motion.button>
    </motion.div>
  );
}

type OrganizedProjectGridsProps = {
  featured: Project[];
  bySection: { section: ProjectSection; projects: Project[] }[];
  showFeatured: boolean;
  showGrouped: boolean;
  filteredNonFeatured: Project[];
  filteredAll: Project[];
  showFeaturedSection: boolean;
  hasFilters: boolean;
  query: string;
  emptyMessage: string;
  animateEntrance?: boolean;
};

export function OrganizedProjectGrids({
  featured,
  bySection,
  showFeatured,
  showGrouped,
  filteredNonFeatured,
  filteredAll,
  showFeaturedSection,
  hasFilters,
  query,
  emptyMessage,
  animateEntrance = false,
}: OrganizedProjectGridsProps) {
  const prefersReducedMotion = useReducedMotion();

  const gridClass = (isFeatured: boolean) =>
    cn(
      "grid gap-6",
      isFeatured ? "md:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-3",
    );

  const motionProps = (index: number) => {
    if (!animateEntrance || prefersReducedMotion) return {};
    return {
      initial: { opacity: 0, y: 12 } as const,
      animate: { opacity: 1, y: 0 } as const,
      transition: { duration: 0.35, delay: index * 0.03, ease },
    };
  };

  if (!showGrouped) {
    const items = query || hasFilters ? filteredAll : filteredNonFeatured;

    if (items.length === 0) {
      return (
        <p className="rounded-2xl border border-dashed border-neutral-300/80 bg-white/30 px-6 py-12 text-center text-sm text-neutral-500 dark:border-white/15 dark:bg-white/5 dark:text-neutral-400">
          {emptyMessage}
        </p>
      );
    }

    return (
      <div className={gridClass(false)}>
        {items.map((project, index) => (
          <motion.div key={project.slug} {...motionProps(index)}>
            <ProjectCard
              project={project}
              featured={project.featured}
              disableReveal
            />
          </motion.div>
        ))}
      </div>
    );
  }

  let cardIndex = 0;

  return (
    <>
      {showFeatured && showFeaturedSection ? (
        <div className={gridClass(true)}>
          {featured.map((project) => {
            const idx = cardIndex++;
            return (
              <motion.div key={project.slug} {...motionProps(idx)}>
                <ProjectCard project={project} featured disableReveal />
              </motion.div>
            );
          })}
        </div>
      ) : null}

      <div
        className={cn(
          showFeatured && showFeaturedSection ? "mt-14 space-y-14" : "space-y-14",
        )}
      >
        {bySection.map(({ section, projects: sectionProjects }) => {
          if (sectionProjects.length === 0) return null;

          return (
            <div
              key={section}
              id={`projects-section-${section}`}
              className="scroll-mt-28"
            >
              <motion.h3
                {...motionProps(cardIndex)}
                className="mb-6 font-heading text-xl tracking-tight text-neutral-800 dark:text-neutral-100 md:text-2xl"
              >
                {projectSectionLabels[section]}
              </motion.h3>
              <div className={gridClass(false)}>
                {sectionProjects.map((project) => {
                  const idx = cardIndex++;
                  return (
                    <motion.div key={project.slug} {...motionProps(idx)}>
                      <ProjectCard project={project} disableReveal />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function ProjectsDeckLayout({
  deckActive,
  deckPhase,
  featured,
  bySection,
  showFeatured,
  deckProjects,
  onSkipDeck,
  organized,
}: {
  deckActive: boolean;
  deckPhase: DeckPhase;
  featured: Project[];
  bySection: { section: ProjectSection; projects: Project[] }[];
  showFeatured: boolean;
  deckProjects: Project[];
  onSkipDeck: () => void;
  organized: React.ReactNode;
}) {
  const orderedDeckProjects = useMemo(() => {
    const list: Project[] = [];
    if (showFeatured) list.push(...featured);
    for (const group of bySection) {
      list.push(...group.projects);
    }
    return list.length > 0 ? list : deckProjects;
  }, [featured, bySection, showFeatured, deckProjects]);

  return (
    <div className="relative">
      {/* Grid stays mounted so cards never unmount between deck end and layout */}
      <div className={cn(deckActive && "hidden")} aria-hidden={deckActive}>
        {organized}
      </div>

      <AnimatePresence>
        {deckActive ? (
          <motion.div
            key="deck-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            className="relative z-10 w-full"
          >
            <ProjectDeckStage
              featured={featured}
              bySection={bySection}
              showFeatured={showFeatured}
              allProjects={orderedDeckProjects}
              phase={deckPhase}
              onSkip={onSkipDeck}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
