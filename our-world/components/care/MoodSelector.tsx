"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import React from "react";

import { careIntro, moodStatesData } from "@/data/care";
import { cardRevealVariants, cinematicTransition, softTransition, staggerContainerVariants } from "@/lib/motion";
import type { MoodState } from "@/types/care";

type MoodSelectorProps = {
  onSelectMood: (mood: MoodState) => void;
};

export function MoodSelector({ onSelectMood }: MoodSelectorProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="How are you feeling today?"
      className="relative mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-6 text-center select-none space-y-8"
    >
      {/* Intro Header */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={cinematicTransition}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-4 py-1.5 shadow-soft backdrop-blur-sm">
          <Sparkles aria-hidden="true" className="size-3.5 text-accent" />
          <span className="font-serif italic text-xs tracking-wider text-muted">
            {careIntro.eyebrow}
          </span>
          <Heart aria-hidden="true" className="size-3 text-accent fill-accent/20" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
            {careIntro.greeting} {careIntro.question}
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-foreground/90 max-w-md mx-auto leading-relaxed">
            {careIntro.subtitle}
          </p>
          <p className="font-sans text-xs sm:text-sm text-muted max-w-sm mx-auto">
            {careIntro.prompt}
          </p>
        </div>
      </motion.div>

      {/* Mood Options Grid */}
      <motion.div
        variants={reduceMotion ? undefined : staggerContainerVariants}
        initial={reduceMotion ? undefined : "initial"}
        animate={reduceMotion ? undefined : "animate"}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full pt-2"
      >
        {moodStatesData.map((mood) => {
          return (
            <motion.div
              key={mood.id}
              variants={reduceMotion ? undefined : cardRevealVariants}
              transition={softTransition}
            >
              <button
                type="button"
                onClick={() => onSelectMood(mood)}
                className="group relative flex w-full items-center gap-3.5 rounded-2xl border border-border/80 bg-surface/90 p-4 text-left shadow-soft transition-all duration-300 hover:border-accent/50 hover:bg-surface-warm hover:shadow-lifted hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                {/* Emoji Container */}
                <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-border/70 bg-surface-warm shadow-xs text-accent transition-transform duration-300 group-hover:scale-110">
                  <span className="text-xl">{mood.emoji}</span>
                </div>

                {/* Mood Details */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <h3 className="font-serif text-base font-semibold text-foreground transition-colors group-hover:text-accent truncate">
                    {mood.label}
                  </h3>
                  <p className="text-xs text-muted leading-tight truncate">
                    {mood.shortDescription}
                  </p>
                </div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
