"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDisplayDate } from "@/lib/cycle-calculator";
import { cardRevealVariants, softTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { SymptomEntry, SymptomType } from "@/types/period";

type SymptomLoggerProps = {
  selectedDate: string;
  loggedSymptoms?: SymptomEntry;
  onSaveSymptoms: (date: string, symptoms: SymptomType[], notes?: string) => void;
};

const SYMPTOMS_LIST: { id: SymptomType; label: string; emoji: string }[] = [
  { id: "cramps", label: "Cramps", emoji: "⚡" },
  { id: "headache", label: "Headache", emoji: "🤕" },
  { id: "bloating", label: "Bloating", emoji: "🎈" },
  { id: "fatigue", label: "Fatigue", emoji: "😴" },
  { id: "mood", label: "Mood changes", emoji: "💭" },
  { id: "back_pain", label: "Back pain", emoji: "🩹" },
  { id: "tenderness", label: "Tenderness", emoji: "🌸" },
  { id: "other", label: "Other", emoji: "✨" },
];

type FormProps = {
  selectedDate: string;
  loggedSymptoms?: SymptomEntry;
  onSaveSymptoms: (date: string, symptoms: SymptomType[], notes?: string) => void;
};

function SymptomForm({ selectedDate, loggedSymptoms, onSaveSymptoms }: FormProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomType[]>(
    () => loggedSymptoms?.symptoms || []
  );
  const [notes, setNotes] = useState<string>(() => loggedSymptoms?.notes || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleSymptom = (symptomId: SymptomType) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((s) => s !== symptomId)
        : [...prev, symptomId]
    );
    setSavedSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSymptoms(selectedDate, selectedSymptoms, notes.trim() || undefined);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <Card variant="surface" className="p-5 sm:p-6 shadow-soft space-y-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="space-y-0.5 text-left">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Daily Symptoms & Notes
          </h3>
          <p className="text-xs text-muted">
            For {formatDisplayDate(selectedDate)}
          </p>
        </div>

        {loggedSymptoms && loggedSymptoms.symptoms.length > 0 && (
          <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
            {loggedSymptoms.symptoms.length} Logged
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Symptoms Pill Grid */}
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS_LIST.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom.id);

            return (
              <button
                key={symptom.id}
                type="button"
                onClick={() => toggleSymptom(symptom.id)}
                aria-pressed={isSelected}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer",
                  isSelected
                    ? "border-accent bg-accent text-cream shadow-xs font-semibold"
                    : "border-border/80 bg-surface-warm/80 text-foreground/80 hover:bg-surface-warm hover:border-accent/40"
                )}
              >
                <span>{symptom.emoji}</span>
                <span>{symptom.label}</span>
              </button>
            );
          })}
        </div>

        {/* Daily Note Input */}
        <div className="space-y-1">
          <label
            htmlFor="symptom-notes"
            className="text-xs font-medium text-muted block text-left"
          >
            Optional private note
          </label>
          <textarea
            id="symptom-notes"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setSavedSuccess(false);
            }}
            placeholder="How are you feeling today?"
            rows={2}
            className="w-full rounded-xl border border-border/80 bg-surface p-3 text-xs text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-2 pt-1">
          {savedSuccess && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
              <Check className="size-3.5" />
              <span>Saved</span>
            </span>
          )}

          <Button type="submit" variant="secondary" size="sm" className="text-xs">
            Save for {formatDisplayDate(selectedDate).split(",")[0]}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export function SymptomLogger({
  selectedDate,
  loggedSymptoms,
  onSaveSymptoms,
}: SymptomLoggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : cardRevealVariants}
      initial={reduceMotion ? undefined : "initial"}
      animate={reduceMotion ? undefined : "animate"}
      transition={softTransition}
      className="w-full"
    >
      <SymptomForm
        key={selectedDate}
        selectedDate={selectedDate}
        loggedSymptoms={loggedSymptoms}
        onSaveSymptoms={onSaveSymptoms}
      />
    </motion.div>
  );
}
