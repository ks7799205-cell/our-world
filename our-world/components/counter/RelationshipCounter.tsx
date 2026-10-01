"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, Heart, Hourglass } from "lucide-react";
import React from "react";

import { Card } from "@/components/ui/Card";
import { relationshipCounterCopy, relationshipStartDate } from "@/data/relationship";
import { useRelationshipCounter } from "@/hooks/useRelationshipCounter";
import { cardRevealVariants, cinematicTransition, softTransition } from "@/lib/motion";

export function RelationshipCounter() {
  const duration = useRelationshipCounter(relationshipStartDate);
  const reduceMotion = useReducedMotion();

  const primaryUnits = [
    { label: "Years", value: duration.years },
    { label: "Months", value: duration.months },
    { label: "Days", value: duration.days },
    { label: "Hours", value: String(duration.hours).padStart(2, "0") },
    { label: "Minutes", value: String(duration.minutes).padStart(2, "0") },
    { label: "Seconds", value: String(duration.seconds).padStart(2, "0") },
  ];

  return (
    <div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-8 text-center select-none space-y-10">
      {/* Eyebrow & Main Title */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={cinematicTransition}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-4 py-1.5 shadow-soft backdrop-blur-sm">
          {duration.isFuture ? (
            <Hourglass aria-hidden="true" className="size-3.5 text-accent" />
          ) : (
            <Clock aria-hidden="true" className="size-3.5 text-accent" />
          )}
          <span className="font-serif italic text-xs tracking-wider text-muted">
            {relationshipCounterCopy.eyebrow}
          </span>
          <Heart aria-hidden="true" className="size-3 text-accent fill-accent/20" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
            {duration.isFuture
              ? relationshipCounterCopy.futureTitle
              : relationshipCounterCopy.title}
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-muted max-w-md mx-auto leading-relaxed">
            {duration.isFuture
              ? relationshipCounterCopy.futureSubtitle
              : relationshipCounterCopy.subtitle}
          </p>
        </div>
      </motion.div>

      {/* Main Hero Units Counter Grid */}
      <motion.div
        variants={reduceMotion ? undefined : cardRevealVariants}
        initial={reduceMotion ? undefined : "initial"}
        animate={reduceMotion ? undefined : "animate"}
        transition={softTransition}
        className="w-full"
      >
        <Card
          variant="warm"
          className="p-6 sm:p-10 shadow-photo ring-1 ring-accent/20 space-y-8"
        >
          {/* Primary 6-unit grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {primaryUnits.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-surface/90 p-3 sm:p-4 shadow-xs"
              >
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-accent tabular-nums">
                  {unit.value}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted/80 mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* "And counting..." tagline */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span className="font-script text-2xl sm:text-3xl text-accent">
              {relationshipCounterCopy.tagline}
            </span>
          </div>

          {/* Secondary Aggregate Metrics */}
          {!duration.isFuture && duration.totalDays > 0 && (
            <div className="border-t border-border/50 pt-6">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted block mb-3">
                Total Moments Shared
              </span>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
                <span className="rounded-xl border border-border/60 bg-surface px-3.5 py-1.5 font-medium text-foreground">
                  <strong className="text-accent font-semibold">{duration.totalDays.toLocaleString()}</strong> days
                </span>

                <span className="rounded-xl border border-border/60 bg-surface px-3.5 py-1.5 font-medium text-foreground">
                  <strong className="text-accent font-semibold">{duration.totalHours.toLocaleString()}</strong> hours
                </span>

                <span className="rounded-xl border border-border/60 bg-surface px-3.5 py-1.5 font-medium text-foreground">
                  <strong className="text-accent font-semibold">{duration.totalMinutes.toLocaleString()}</strong> minutes
                </span>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
