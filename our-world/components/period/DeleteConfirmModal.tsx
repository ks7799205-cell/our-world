"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDisplayDate } from "@/lib/cycle-calculator";
import { cardRevealVariants, softTransition } from "@/lib/motion";
import type { PeriodEntry } from "@/types/period";

type DeleteConfirmModalProps = {
  isOpen: boolean;
  period: PeriodEntry | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({
  isOpen,
  period,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const reduceMotion = useReducedMotion();

  if (!isOpen || !period) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-period-title"
      aria-describedby="delete-period-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
    >
      <motion.div
        variants={reduceMotion ? undefined : cardRevealVariants}
        initial={reduceMotion ? undefined : "initial"}
        animate={reduceMotion ? undefined : "animate"}
        exit={reduceMotion ? undefined : "exit"}
        transition={softTransition}
        className="w-full max-w-sm"
      >
        <Card variant="surface" className="p-6 shadow-lifted space-y-4 text-center">
          <div className="grid size-12 mx-auto place-items-center rounded-full bg-rose-50 border border-rose-200 text-rose-600">
            <AlertTriangle className="size-6" />
          </div>

          <div className="space-y-1.5">
            <h3 id="delete-period-title" className="font-serif text-lg font-semibold text-foreground">
              Delete Period Record?
            </h3>
            <p id="delete-period-desc" className="text-xs text-muted leading-relaxed">
              This will permanently remove the period record for{" "}
              <strong>{formatDisplayDate(period.startDate)}</strong>.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 border-t border-border/40">
            <Button type="button" variant="secondary" size="sm" onClick={onClose} className="text-xs">
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={onConfirm}
              className="text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-soft"
            >
              Delete Record
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
