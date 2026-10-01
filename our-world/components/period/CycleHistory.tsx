"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Edit2, History, Trash2 } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { diffDays, formatDisplayDate } from "@/lib/cycle-calculator";
import { cardRevealVariants, softTransition } from "@/lib/motion";
import type { PeriodEntry } from "@/types/period";

type CycleHistoryProps = {
  periods: PeriodEntry[];
  onEditPeriod: (period: PeriodEntry) => void;
  onDeletePeriod: (period: PeriodEntry) => void;
};

export function CycleHistory({
  periods,
  onEditPeriod,
  onDeletePeriod,
}: CycleHistoryProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : cardRevealVariants}
      initial={reduceMotion ? undefined : "initial"}
      animate={reduceMotion ? undefined : "animate"}
      transition={softTransition}
      className="w-full space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
          <History className="size-3.5 text-accent" />
          <span>Cycle History ({periods.length})</span>
        </div>
      </div>

      {periods.length === 0 ? (
        <Card variant="surface" className="p-8 text-center space-y-2 shadow-soft">
          <h4 className="font-serif text-lg font-semibold text-foreground">
            Your cycle history starts here
          </h4>
          <p className="font-serif italic text-xs sm:text-sm text-muted max-w-sm mx-auto">
            Log your first period to build a clearer cycle record over time.
          </p>
        </Card>
      ) : (
        <div className="space-y-2.5">
          {periods.map((period, index) => {
            const nextPeriod = periods[index + 1];
            const cycleDuration = nextPeriod
              ? diffDays(period.startDate, nextPeriod.startDate)
              : null;

            return (
              <Card
                key={period.id}
                variant="surface"
                className="p-4 sm:p-5 flex items-center justify-between gap-3 shadow-soft hover:shadow-lifted transition-shadow"
              >
                {/* Period Date Details */}
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base sm:text-lg font-semibold text-foreground">
                      {formatDisplayDate(period.startDate)}
                    </span>
                    {period.endDate && (
                      <span className="text-xs text-muted">
                        – {formatDisplayDate(period.endDate)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted">
                    {cycleDuration && (
                      <span className="rounded-full bg-surface-warm border border-border/60 px-2 py-0.5 text-[10px] font-semibold text-accent">
                        {cycleDuration}-day cycle
                      </span>
                    )}
                    {period.notes && (
                      <span className="italic truncate max-w-[200px]">
                        &ldquo;{period.notes}&rdquo;
                      </span>
                    )}
                  </div>
                </div>

                {/* Edit & Delete Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    type="button"
                    variant="quiet"
                    size="icon"
                    onClick={() => onEditPeriod(period)}
                    aria-label={`Edit period starting ${period.startDate}`}
                    className="size-8 text-muted hover:text-accent"
                  >
                    <Edit2 className="size-3.5" />
                  </Button>

                  <Button
                    type="button"
                    variant="quiet"
                    size="icon"
                    onClick={() => onDeletePeriod(period)}
                    aria-label={`Delete period starting ${period.startDate}`}
                    className="size-8 text-muted hover:text-rose-600"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
