"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variant,
  type ViewportOptions,
} from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const defaultViewport: ViewportOptions = {
  once: true,
  margin: "-8% 0px -6% 0px",
};

export type RevealDirection = "up" | "down" | "left" | "right";

type RevealElement = keyof Pick<
  typeof motion,
  "div" | "span" | "article" | "li" | "section" | "header" | "p" | "ul"
>;

function hiddenOffset(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: -distance };
    case "right":
      return { x: distance };
    default:
      return { y: distance };
  }
}

export type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: RevealElement;
  delay?: number;
  direction?: RevealDirection;
  /** Slide distance in pixels — keep low for subtle motion */
  distance?: number;
  duration?: number;
  viewport?: ViewportOptions;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "initial" | "animate" | "whileInView" | "viewport"
>;

export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  direction = "up",
  distance = 10,
  duration = 0.36,
  viewport = defaultViewport,
  ...rest
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { transition: transitionOverride, ...motionProps } = rest;
  const Component = motion[as] as typeof motion.div;

  const visible: Variant = { opacity: 1, x: 0, y: 0 };

  return (
    <Component
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, ...hiddenOffset(direction, distance) }
      }
      whileInView={prefersReducedMotion ? undefined : visible}
      viewport={viewport}
      className={cn(className)}
      transition={{ duration, delay, ease, ...transitionOverride }}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
