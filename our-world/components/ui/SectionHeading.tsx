import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingLevel = "h1" | "h2" | "h3";
type SectionHeadingAlign = "left" | "center";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
  accent?: ReactNode;
  level?: SectionHeadingLevel;
  align?: SectionHeadingAlign;
  className?: string;
};

const titleStyles: Record<SectionHeadingLevel, string> = {
  h1: "text-5xl leading-tight sm:text-6xl",
  h2: "text-4xl leading-tight sm:text-5xl",
  h3: "text-3xl leading-tight",
};

export function SectionHeading({
  title,
  eyebrow,
  children,
  accent,
  level = "h2",
  align = "left",
  className,
}: SectionHeadingProps) {
  const HeadingTag = level;

  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-medium uppercase text-muted">{eyebrow}</p>
      ) : null}
      <div
        className={cn(
          "mt-3 flex gap-3",
          align === "center"
            ? "items-center justify-center"
            : "items-start justify-start",
        )}
      >
        <HeadingTag
          className={cn("font-serif text-foreground", titleStyles[level])}
        >
          {title}
        </HeadingTag>
        {accent ? (
          <span className="mt-2 shrink-0 text-accent" aria-hidden="true">
            {accent}
          </span>
        ) : null}
      </div>
      {children ? (
        <div className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {children}
        </div>
      ) : null}
    </header>
  );
}
