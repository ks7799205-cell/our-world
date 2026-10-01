"use client";

import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { imageRevealVariants, cinematicTransition } from "@/lib/motion";

type ImageCardVariant = "cinematic" | "polaroid" | "rounded" | "editorial";

type ImageCardProps = {
  src: string | StaticImageData;
  alt: string;
  caption?: ReactNode;
  variant?: ImageCardVariant;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  aspectRatio?: string;
};

const variantStyles: Record<ImageCardVariant, string> = {
  cinematic:
    "overflow-hidden rounded-none border-0 bg-burgundy-deep shadow-lifted",
  polaroid: "bg-surface p-3 shadow-photo rotate-[-1deg]",
  rounded: "overflow-hidden rounded-[var(--radius-sm)] bg-surface shadow-photo",
  editorial:
    "overflow-hidden rounded-[var(--radius-xs)] border border-border bg-surface shadow-soft",
};

export function ImageCard({
  src,
  alt,
  caption,
  variant = "rounded",
  priority = false,
  className,
  imageClassName,
  aspectRatio = "4 / 5",
}: ImageCardProps) {
  const shouldPadImage = variant === "polaroid";

  return (
    <motion.figure
      className={cn("relative", variantStyles[variant], className)}
      variants={imageRevealVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.35 }}
      transition={cinematicTransition}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          shouldPadImage ? "rounded-[var(--radius-xs)]" : "h-full w-full",
        )}
        style={{ aspectRatio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className={cn("object-cover", imageClassName)}
        />
      </div>
      {caption ? (
        <figcaption className="px-1 pt-3 text-sm leading-6 text-muted">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
