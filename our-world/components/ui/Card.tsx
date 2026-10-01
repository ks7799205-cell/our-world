"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

export type CardVariant = "surface" | "warm" | "outlined" | "photo" | "default";

export type CardProps = Omit<HTMLMotionProps<"div">, "ref"> & {
  variant?: CardVariant;
  interactive?: boolean;
  as?: "div" | "section" | "article";
};

const variantStyles: Record<Exclude<CardVariant, "default">, string> = {
  surface: "border-border bg-surface shadow-soft",
  warm: "border-border bg-surface-warm shadow-soft",
  outlined: "border-border bg-transparent",
  photo: "border-cream bg-surface shadow-photo",
};

export function Card({
  className,
  variant = "surface",
  interactive = false,
  as = "div",
  children,
  ...props
}: CardProps) {
  const resolvedVariant = variant === "default" ? "surface" : variant;

  const MotionComponent = (
    as === "section"
      ? motion.section
      : as === "article"
      ? motion.article
      : motion.div
  ) as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <MotionComponent
      className={cn(
        "rounded-[var(--radius-sm)] border",
        variantStyles[resolvedVariant],
        interactive &&
          "transition-colors hover:border-rose focus-within:border-accent",
        className,
      )}
      whileHover={interactive ? { y: -3 } : undefined}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
