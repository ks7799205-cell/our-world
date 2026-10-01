"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Calendar, Sparkles } from "lucide-react";
import React from "react";

import { Card } from "@/components/ui/Card";
import { formatDisplayDate } from "@/lib/cycle-calculator";
import { cardRevealVariants, softTransition } from "@/lib/motion";
import type { CyclePrediction } from "@/types/period";

type PredictionCardProps = {
  prediction: CyclePrediction | null;
  hasPeriods: boolean;
};

export function PredictionCard({ prediction, hasPeriods }: PredictionCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : cardRevealVariants}
      initial={reduceMotion ? undefined : "initial"}
      animate={reduceMotion ? undefined : "animate"}
      transition={softTransition}
      className="w-full"
    >
      <Card variant="warm" className="p-6 sm:p-8 shadow-photo space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface px-3 py-1 text-xs font-semibold text-accent">
            <Sparkles className="size-3" />
            <span>Cycle Estimate</span>
          </div>

          {prediction && (
            <span className="rounded-full bg-surface-warm border border-border/60 px-2.5 py-0.5 text-[10px] font-semibold text-muted uppercase tracking-wider">
              {prediction.confidence === "high"
                ? "High Confidence"
                : prediction.confidence === "medium"
                ? "Based on History"
                : "Initial Estimate"}
            </span>
          )}
        </div>

        {hasPeriods && prediction ? (
          <div className="space-y-3 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Estimated Next Period
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                Around {formatDisplayDate(prediction.estimatedStartDate)}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose/15 border border-rose-300/60 px-3 py-1 text-xs font-semibold text-accent">
                <Calendar className="size-3.5" />
                <span>
                  {prediction.daysUntilNext > 0
                    ? `Expected in ~${prediction.daysUntilNext} days`
                    : prediction.daysUntilNext === 0
                    ? "Expected around today"
                    : `Estimated ~${Math.abs(prediction.daysUntilNext)} days ago`}
                </span>
              </span>

              <span className="text-xs text-muted">
                Window: {formatDisplayDate(prediction.estimatedStartDate)} –{" "}
                {formatDisplayDate(prediction.estimatedEndDate)}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-center py-2">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              No cycle estimate yet
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-muted max-w-sm mx-auto">
              Log your first period date below to start receiving approximate cycle estimates.
            </p>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-surface/70 p-3.5 text-left text-[11px] text-muted leading-relaxed">
          <AlertCircle className="size-4 shrink-0 text-accent/80 mt-0.5" />
          <p>
            <strong>Disclaimer:</strong> Cycle predictions are estimates based on logged dates and may be inaccurate. They are not medical advice and should not be used as contraception or diagnosis.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
