"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play, Wind } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type BreathPhase = "inhale" | "hold" | "exhale";

const phaseConfig: Record<BreathPhase, { text: string; subtext: string; next: BreathPhase; duration: number }> = {
  inhale: {
    text: "Breathe in slowly...",
    subtext: "Fill your lungs with calm.",
    next: "hold",
    duration: 4000,
  },
  hold: {
    text: "Gently hold...",
    subtext: "Let the stillness settle.",
    next: "exhale",
    duration: 4000,
  },
  exhale: {
    text: "Slowly breathe out...",
    subtext: "Release the tension.",
    next: "inhale",
    duration: 4000,
  },
};

export function BreathingGuide() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const timer = setTimeout(() => {
      setPhase((current) => phaseConfig[current].next);
    }, phaseConfig[phase].duration);

    return () => clearTimeout(timer);
  }, [phase, isActive]);

  const current = phaseConfig[phase];

  return (
    <Card variant="warm" className="p-6 sm:p-8 text-center shadow-photo space-y-6 select-none">
      <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface px-3.5 py-1 text-xs font-semibold text-accent">
        <Wind className="size-3.5" />
        <span>Just Breathe</span>
      </div>

      {/* Breathing Animated Circle */}
      <div className="relative flex items-center justify-center py-6">
        {/* Ambient Ring */}
        <div
          aria-hidden="true"
          className="absolute size-44 sm:size-52 rounded-full bg-rose/15 blur-xl pointer-events-none"
        />

        {/* Outer Pulsing Circle */}
        <motion.div
          animate={
            reduceMotion || !isActive
              ? undefined
              : phase === "inhale"
              ? { scale: 1.2, opacity: 0.9 }
              : phase === "hold"
              ? { scale: 1.2, opacity: 1 }
              : { scale: 0.9, opacity: 0.6 }
          }
          transition={{ duration: 4, ease: "easeInOut" }}
          className="relative size-36 sm:size-44 rounded-full border-2 border-accent/40 bg-gradient-to-br from-rose/20 via-surface to-cream shadow-lifted flex flex-col items-center justify-center text-center p-4"
        >
          <motion.div
            key={phase}
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <p className="font-serif text-sm sm:text-base font-semibold text-foreground">
              {current.text}
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="space-y-1">
        <p className="font-serif italic text-xs sm:text-sm text-muted">
          {current.subtext}
        </p>
      </div>

      {/* Play / Pause Toggle Button */}
      <div className="pt-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setIsActive((prev) => !prev)}
          className="text-xs"
        >
          {isActive ? (
            <>
              <Pause className="size-3.5" />
              <span>Pause rhythm</span>
            </>
          ) : (
            <>
              <Play className="size-3.5" />
              <span>Resume rhythm</span>
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
