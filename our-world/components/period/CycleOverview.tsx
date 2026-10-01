"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarPlus, Settings, Sparkles } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDisplayDate } from "@/lib/cycle-calculator";
import { cardRevealVariants, softTransition } from "@/lib/motion";
import type { CycleSettings, PeriodEntry } from "@/types/period";

type CycleOverviewProps = {
  currentCycleDay: number | null;
  latestPeriod: PeriodEntry | null;
  settings: CycleSettings;
  averageCycleLength: number;
  onOpenLogPeriod: () => void;
  onOpenSettings: () => void;
};

export function CycleOverview({
  currentCycleDay,
  latestPeriod,
  settings,
  averageCycleLength,
  onOpenLogPeriod,
  onOpenSettings,
}: CycleOverviewProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : cardRevealVariants}
      initial={reduceMotion ? undefined : "initial"}
      animate={reduceMotion ? undefined : "animate"}
      transition={softTransition}
      className="w-full space-y-4"
    >
      {/* Top Header with Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
            <Sparkles className="size-3 text-accent" />
            <span>Overview & Metrics</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onOpenSettings}
            className="text-xs"
          >
            <Settings className="size-3.5" />
            <span>Settings</span>
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onOpenLogPeriod}
            className="text-xs shadow-soft"
          >
            <CalendarPlus className="size-3.5" />
            <span>Log Period</span>
          </Button>
        </div>
      </div>

      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Metric 1: Current Cycle Day */}
        <Card variant="surface" className="p-4 text-center space-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            Current Cycle
          </span>
          <div className="font-serif text-2xl font-bold text-accent">
            {currentCycleDay ? `Day ${currentCycleDay}` : "—"}
          </div>
          <span className="text-[10px] text-muted block truncate">
            {currentCycleDay ? "Since last start" : "No active cycle"}
          </span>
        </Card>

        {/* Metric 2: Last Period */}
        <Card variant="surface" className="p-4 text-center space-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            Last Period
          </span>
          <div className="font-serif text-lg font-bold text-foreground truncate">
            {latestPeriod ? formatDisplayDate(latestPeriod.startDate).split(",")[0] : "None"}
          </div>
          <span className="text-[10px] text-muted block truncate">
            {latestPeriod ? latestPeriod.startDate : "Not logged yet"}
          </span>
        </Card>

        {/* Metric 3: Typical Cycle Length */}
        <Card variant="surface" className="p-4 text-center space-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            Avg Cycle
          </span>
          <div className="font-serif text-2xl font-bold text-foreground">
            {averageCycleLength}d
          </div>
          <span className="text-[10px] text-muted block truncate">
            Length estimate
          </span>
        </Card>

        {/* Metric 4: Typical Period Length */}
        <Card variant="surface" className="p-4 text-center space-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            Period Duration
          </span>
          <div className="font-serif text-2xl font-bold text-foreground">
            {settings.typicalPeriodLength}d
          </div>
          <span className="text-[10px] text-muted block truncate">
            Flow days
          </span>
        </Card>
      </div>
    </motion.div>
  );
}
