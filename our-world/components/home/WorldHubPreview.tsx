"use client";

import { motion } from "framer-motion";
import {
  BookHeart,
  Cake,
  CalendarHeart,
  Heart,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { plannedRoutes } from "@/data/planned-routes";
import { cardRevealVariants, staggerContainerVariants } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

const routeIcons: Record<string, React.ReactNode> = {
  "/counter": <CalendarHeart className="size-5 text-accent" />,
  "/care": <HeartHandshake className="size-5 text-accent" />,
  "/birthday": <Cake className="size-5 text-accent" />,
  "/period-tracker": <BookHeart className="size-5 text-accent" />,
};

type WorldHubPreviewProps = {
  onBackToGreeting: () => void;
};

export function WorldHubPreview({ onBackToGreeting }: WorldHubPreviewProps) {
  return (
    <div className="space-y-12 py-4">
      {/* Header section */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <SectionHeading
          title={siteConfig.name}
          eyebrow="Welcome Inside"
          level="h1"
          accent={<Sparkles className="size-5 text-accent" />}
        >
          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            This is our private digital world. Choose a chapter whenever you need
            a moment of celebration, closeness, or care.
          </p>
        </SectionHeading>

        <button
          type="button"
          onClick={onBackToGreeting}
          className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-warm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>← Back to Birthday Celebration 🎂</span>
        </button>
      </div>

      {/* Grid of Planned World Sections */}
      <motion.div
        variants={staggerContainerVariants}
        initial="initial"
        animate="animate"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {plannedRoutes.map((route) => {
          const icon = routeIcons[route.href] || <Heart className="size-5 text-accent" />;

          return (
            <motion.div
              key={route.href}
              variants={cardRevealVariants}
            >
              <Link
                href={route.href}
                className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
              >
                <Card
                  variant="surface"
                  className="h-full p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-lifted"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid size-10 place-items-center rounded-xl border border-border bg-surface-warm shadow-soft group-hover:scale-105 transition-transform">
                      {icon}
                    </div>
                    <span className="rounded-full border border-border/60 bg-surface-warm/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                      {route.area}
                    </span>
                  </div>

                  <h2 className="mt-4 font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {route.title}
                  </h2>

                  <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-2">
                    Explore the reserved space for {route.title.toLowerCase()}.
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-accent opacity-80 group-hover:opacity-100">
                    <span>Visit chapter</span>
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
