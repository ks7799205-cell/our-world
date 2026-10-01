"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Settings, X } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cardRevealVariants, softTransition } from "@/lib/motion";
import type { CycleSettings } from "@/types/period";

type TrackerSettingsModalProps = {
  isOpen: boolean;
  settings: CycleSettings;
  onClose: () => void;
  onSave: (newSettings: CycleSettings) => void;
};

type FormProps = {
  settings: CycleSettings;
  onClose: () => void;
  onSave: (newSettings: CycleSettings) => void;
};

function SettingsForm({ settings, onClose, onSave }: FormProps) {
  const [cycleLength, setCycleLength] = useState(() => settings.averageCycleLength);
  const [periodLength, setPeriodLength] = useState(() => settings.typicalPeriodLength);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clampedCycle = Math.max(21, Math.min(60, Number(cycleLength) || 28));
    const clampedPeriod = Math.max(1, Math.min(14, Number(periodLength) || 5));
    onSave({
      averageCycleLength: clampedCycle,
      typicalPeriodLength: clampedPeriod,
    });
    onClose();
  };

  return (
    <Card variant="surface" className="p-6 shadow-lifted space-y-5">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <Settings className="size-4 text-accent" />
          <h3 id="tracker-settings-title" className="font-serif text-lg font-semibold text-foreground">
            Cycle Settings
          </h3>
        </div>

        <Button
          type="button"
          variant="quiet"
          size="icon"
          onClick={onClose}
          aria-label="Close settings"
          className="size-8"
        >
          <X className="size-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Average Cycle Length */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center justify-between text-xs font-semibold">
            <label htmlFor="cycle-length-input" className="text-foreground">
              Average Cycle Length
            </label>
            <span className="text-accent">{cycleLength} days</span>
          </div>
          <input
            id="cycle-length-input"
            type="range"
            min={21}
            max={60}
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <span className="text-[10px] text-muted block">
            Typical range: 21 to 60 days (default: 28 days)
          </span>
        </div>

        {/* Typical Period Length */}
        <div className="space-y-1.5 text-left pt-2 border-t border-border/40">
          <div className="flex items-center justify-between text-xs font-semibold">
            <label htmlFor="period-length-input" className="text-foreground">
              Typical Period Duration
            </label>
            <span className="text-accent">{periodLength} days</span>
          </div>
          <input
            id="period-length-input"
            type="range"
            min={1}
            max={14}
            value={periodLength}
            onChange={(e) => setPeriodLength(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <span className="text-[10px] text-muted block">
            Typical range: 1 to 14 days (default: 5 days)
          </span>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/40">
          <Button type="button" variant="secondary" size="sm" onClick={onClose} className="text-xs">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" className="text-xs shadow-soft">
            Save Preferences
          </Button>
        </div>
      </form>
    </Card>
  );
}

export function TrackerSettingsModal({
  isOpen,
  settings,
  onClose,
  onSave,
}: TrackerSettingsModalProps) {
  const reduceMotion = useReducedMotion();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracker-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
    >
      <motion.div
        key={`${settings.averageCycleLength}-${settings.typicalPeriodLength}`}
        variants={reduceMotion ? undefined : cardRevealVariants}
        initial={reduceMotion ? undefined : "initial"}
        animate={reduceMotion ? undefined : "animate"}
        exit={reduceMotion ? undefined : "exit"}
        transition={softTransition}
        className="w-full max-w-sm"
      >
        <SettingsForm
          settings={settings}
          onClose={onClose}
          onSave={onSave}
        />
      </motion.div>
    </div>
  );
}
