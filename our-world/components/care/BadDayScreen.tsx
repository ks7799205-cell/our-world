"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Moon,
  RotateCcw,
  Sparkles,
  Wind,
} from "lucide-react";
import React, { useState } from "react";

import { BreathingGuide } from "@/components/care/BreathingGuide";
import { ComfortMessage } from "@/components/care/ComfortMessage";
import { DistractionHub } from "@/components/care/DistractionHub";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { careNeedsList, virtualHugData } from "@/data/care";
import { cardRevealVariants, cinematicTransition, softTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { CareNeedId, MoodState } from "@/types/care";

type BadDayScreenProps = {
  mood: MoodState;
  onResetMood: () => void;
};

const needIconMap = {
  MessageCircle,
  Heart,
  Wind,
  Sparkles,
  Moon,
};

export function BadDayScreen({ mood, onResetMood }: BadDayScreenProps) {
  const [activeNeed, setActiveNeed] = useState<CareNeedId>("talk");
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-6 text-center select-none space-y-8">
      {/* Top Header & Reset Button */}
      <motion.div
        variants={reduceMotion ? undefined : cardRevealVariants}
        initial={reduceMotion ? undefined : "initial"}
        animate={reduceMotion ? undefined : "animate"}
        transition={cinematicTransition}
        className="w-full space-y-4"
      >
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="quiet"
            size="sm"
            onClick={onResetMood}
            className="text-xs text-muted hover:text-accent"
          >
            <ArrowLeft className="size-3.5" />
            <span>Change how I feel</span>
          </Button>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface-warm px-3 py-1 text-xs font-semibold text-accent">
            <span>{mood.emoji}</span>
            <span>{mood.label}</span>
          </span>
        </div>

        {/* Reassuring Title */}
        <div className="space-y-2 pt-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            {mood.promptTitle}
          </h1>
          <p className="font-serif italic text-base text-muted max-w-md mx-auto leading-relaxed">
            Take a breath. You don&apos;t have to solve everything right now.
          </p>
        </div>

        {/* Short Support Message Card */}
        {mood.supportMessage && (
          <div className="rounded-2xl border border-border/80 bg-surface/90 p-5 sm:p-6 text-left shadow-soft space-y-2">
            <p className="text-sm leading-relaxed text-foreground/90">
              {mood.supportMessage}
            </p>
          </div>
        )}
      </motion.div>

      {/* "What do you need right now?" Selection Tabs */}
      <div className="w-full space-y-4">
        <div className="text-center space-y-1">
          <h2 className="font-serif text-lg font-semibold text-foreground">
            What do you need right now?
          </h2>
          <p className="font-serif italic text-xs text-muted">
            Pick whatever feels right in this moment.
          </p>
        </div>

        <nav
          aria-label="Care needs"
          className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none px-1 select-none"
        >
          {careNeedsList.map((need) => {
            const isActive = activeNeed === need.id;
            const Icon = needIconMap[need.iconName] || Heart;

            return (
              <button
                key={need.id}
                type="button"
                onClick={() => setActiveNeed(need.id)}
                className={cn(
                  "relative shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isActive
                    ? "text-accent-foreground"
                    : "text-muted hover:text-accent hover:bg-surface-warm/80"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={reduceMotion ? undefined : "activeNeedPill"}
                    className="absolute inset-0 rounded-full bg-accent shadow-soft"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={cn("size-3.5", isActive ? "text-cream fill-cream/20" : "text-accent")} />
                  <span>{need.label}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Dynamic Content Panel Based on Active Need */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeNeed === "talk" && (
            <motion.div
              key="talk"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={softTransition}
            >
              <ComfortMessage
                title="If I were right there beside you..."
                message={mood.comfortMessage}
                signature={mood.signature}
              />
            </motion.div>
          )}

          {activeNeed === "hug" && (
            <motion.div
              key="hug"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={softTransition}
              className="w-full"
            >
              <Card variant="warm" className="p-8 sm:p-10 text-center shadow-photo space-y-6">
                <div className="relative mx-auto flex items-center justify-center">
                  <div className="absolute size-32 rounded-full bg-rose/20 blur-xl animate-pulse" />
                  <div className="grid size-16 place-items-center rounded-full border-2 border-accent bg-surface shadow-lifted text-accent">
                    <Heart className="size-8 fill-accent/30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-semibold text-foreground">
                    {virtualHugData.title}
                  </h3>
                  <p className="font-serif italic text-sm sm:text-base leading-relaxed text-foreground/90 max-w-md mx-auto">
                    {virtualHugData.message}
                  </p>
                </div>

                {virtualHugData.signature && (
                  <div className="pt-2 text-right">
                    <p className="font-script text-xl text-accent whitespace-pre-line">
                      {virtualHugData.signature}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {activeNeed === "breathe" && (
            <motion.div
              key="breathe"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={softTransition}
            >
              <BreathingGuide />
            </motion.div>
          )}

          {activeNeed === "distract" && (
            <motion.div
              key="distract"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={softTransition}
            >
              <DistractionHub />
            </motion.div>
          )}

          {activeNeed === "quiet" && (
            <motion.div
              key="quiet"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={softTransition}
              className="w-full"
            >
              <Card variant="warm" className="p-8 sm:p-12 text-center shadow-photo space-y-6">
                <div className="grid size-12 mx-auto place-items-center rounded-full border border-border bg-surface text-accent">
                  <Moon className="size-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-semibold text-foreground">
                    Just rest here.
                  </h3>
                  <p className="font-serif italic text-sm text-muted max-w-sm mx-auto leading-relaxed">
                    No words, no pressure, no expectations. I&apos;m sitting right beside you in spirit. Stay as long as you like ♡
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer Reset Action */}
      <div className="pt-4">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onResetMood}
        >
          <RotateCcw className="size-3.5" />
          <span>Choose another mood</span>
        </Button>
      </div>
    </div>
  );
}
