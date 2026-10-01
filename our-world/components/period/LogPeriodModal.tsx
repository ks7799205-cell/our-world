"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, CalendarPlus, X } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getTodayISODate } from "@/lib/cycle-calculator";
import { cardRevealVariants, softTransition } from "@/lib/motion";
import type { PeriodEntry } from "@/types/period";

type LogPeriodModalProps = {
  isOpen: boolean;
  editingPeriod?: PeriodEntry | null;
  onClose: () => void;
  onSave: (startDate: string, endDate?: string, notes?: string) => void;
};

type FormProps = {
  editingPeriod?: PeriodEntry | null;
  onClose: () => void;
  onSave: (startDate: string, endDate?: string, notes?: string) => void;
};

function LogPeriodForm({ editingPeriod, onClose, onSave }: FormProps) {
  const [startDate, setStartDate] = useState(() => editingPeriod?.startDate || getTodayISODate());
  const [endDate, setEndDate] = useState(() => editingPeriod?.endDate || "");
  const [notes, setNotes] = useState(() => editingPeriod?.notes || "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) {
      setError("Please select a period start date.");
      return;
    }

    if (endDate && endDate < startDate) {
      setError("End date cannot be earlier than the start date.");
      return;
    }

    onSave(startDate, endDate.trim() || undefined, notes.trim() || undefined);
    onClose();
  };

  return (
    <Card variant="surface" className="p-6 shadow-lifted space-y-5">
      {/* Modal Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <CalendarPlus className="size-4 text-accent" />
          <h3 id="log-period-title" className="font-serif text-lg font-semibold text-foreground">
            {editingPeriod ? "Edit Period Record" : "Log Period"}
          </h3>
        </div>

        <Button
          type="button"
          variant="quiet"
          size="icon"
          onClick={onClose}
          aria-label="Close modal"
          className="size-8"
        >
          <X className="size-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-300 p-3 text-xs text-rose-900">
            <AlertCircle className="size-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Start Date */}
        <div className="space-y-1 text-left">
          <label htmlFor="period-start-date" className="text-xs font-semibold text-foreground">
            Period Start Date *
          </label>
          <input
            id="period-start-date"
            type="date"
            required
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setError(null);
            }}
            className="w-full rounded-xl border border-border/80 bg-surface p-2.5 text-xs text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* End Date (Optional) */}
        <div className="space-y-1 text-left">
          <label htmlFor="period-end-date" className="text-xs font-semibold text-foreground">
            Period End Date (Optional)
          </label>
          <input
            id="period-end-date"
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setError(null);
            }}
            className="w-full rounded-xl border border-border/80 bg-surface p-2.5 text-xs text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <span className="text-[10px] text-muted block">
            Leave empty if the period is currently ongoing.
          </span>
        </div>

        {/* Notes */}
        <div className="space-y-1 text-left">
          <label htmlFor="period-notes" className="text-xs font-semibold text-foreground">
            Notes (Optional)
          </label>
          <textarea
            id="period-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any details to remember..."
            rows={2}
            className="w-full rounded-xl border border-border/80 bg-surface p-2.5 text-xs text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
          <Button type="button" variant="secondary" size="sm" onClick={onClose} className="text-xs">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" className="text-xs shadow-soft">
            {editingPeriod ? "Save Changes" : "Record Period"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export function LogPeriodModal({
  isOpen,
  editingPeriod,
  onClose,
  onSave,
}: LogPeriodModalProps) {
  const reduceMotion = useReducedMotion();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="log-period-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
    >
      <motion.div
        key={editingPeriod ? editingPeriod.id : "new"}
        variants={reduceMotion ? undefined : cardRevealVariants}
        initial={reduceMotion ? undefined : "initial"}
        animate={reduceMotion ? undefined : "animate"}
        exit={reduceMotion ? undefined : "exit"}
        transition={softTransition}
        className="w-full max-w-md"
      >
        <LogPeriodForm
          editingPeriod={editingPeriod}
          onClose={onClose}
          onSave={onSave}
        />
      </motion.div>
    </div>
  );
}
