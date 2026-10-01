"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cake, Heart, Sparkles } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { birthdayData } from "@/data/birthday";
import type { BirthdayData } from "@/types/birthday";
import { cardRevealVariants, cinematicTransition } from "@/lib/motion";

type BirthdayIntroProps = {
  opening?: BirthdayData["opening"];
  onStart: () => void;
};

export function BirthdayIntro({ opening: propOpening, onStart }: BirthdayIntroProps) {
  const opening = propOpening || birthdayData.opening;

  return (
    <section
      aria-label="Birthday opening"
      className="relative mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-12 text-center select-none"
    >
      <motion.div
        variants={cardRevealVariants}
        initial="initial"
        animate="animate"
        transition={cinematicTransition}
        className="w-full"
      >
        <Card
          variant="warm"
          className="p-8 sm:p-12 shadow-photo ring-1 ring-accent/20 space-y-8"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-4 py-1.5 shadow-soft backdrop-blur-sm">
            <Sparkles aria-hidden="true" className="size-3.5 text-accent" />
            <span className="font-serif italic text-xs tracking-wider text-muted">
              {opening.eyebrow}
            </span>
            <Heart aria-hidden="true" className="size-3 text-accent fill-accent/20" />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight leading-tight">
              {opening.headline}
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-foreground/90 max-w-md mx-auto leading-relaxed">
              &ldquo;{opening.subheadline}&rdquo;
            </p>
          </div>

          {/* Ambient Candle Prompt */}
          <div className="rounded-2xl border border-border/70 bg-surface/80 p-5 space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-accent">
              <Cake className="size-5" />
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {opening.prompt}
            </p>
          </div>

          {/* Start Button */}
          <div className="pt-2">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={onStart}
              className="w-full sm:w-auto shadow-lifted"
            >
              <span>{opening.buttonText}</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
