"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { birthdayData } from "@/data/birthday";
import { cardRevealVariants, cinematicTransition, softTransition } from "@/lib/motion";

type ReasonsSectionProps = {
  reasons?: string[];
  footerNote?: string;
  onNext: () => void;
};

export function ReasonsSection({
  reasons: propReasons,
  footerNote: propFooterNote,
  onNext,
}: ReasonsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);

  const reasons = propReasons || birthdayData.reasons;
  const footerNote = propFooterNote || birthdayData.reasonsFooterNote;
  const currentReason = reasons[currentIndex];
  const formattedIndex = String(currentIndex + 1).padStart(2, "0");
  const formattedTotal = String(reasons.length).padStart(2, "0");

  const handleNextReason = () => {
    if (currentIndex + 1 < reasons.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setHasFinished(true);
    }
  };

  return (
    <section
      aria-label="Things I love about you"
      className="relative mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-8 text-center select-none space-y-8"
    >
      <motion.div
        variants={cardRevealVariants}
        initial="initial"
        animate="animate"
        transition={cinematicTransition}
        className="w-full space-y-6"
      >
        <Card
          variant="warm"
          className="p-8 sm:p-12 shadow-photo ring-1 ring-accent/20 space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles className="size-3" />
              <span>Things I Adore About You</span>
            </div>

            <span className="font-serif text-xs font-semibold text-accent">
              {formattedIndex} / {formattedTotal}
            </span>
          </div>

          {/* Reason Card with Transition */}
          <div className="min-h-[160px] flex flex-col items-center justify-center py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={softTransition}
                className="space-y-4"
              >
                <span className="font-serif text-xs uppercase tracking-widest text-muted block">
                  Reason #{formattedIndex}
                </span>

                <p className="font-serif text-2xl sm:text-3xl font-semibold text-foreground leading-snug max-w-lg mx-auto">
                  &ldquo;{currentReason}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* When finished, show footer note */}
          {hasFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={softTransition}
              className="pt-2 border-t border-border/40"
            >
              <p className="font-script text-2xl sm:text-3xl text-accent">
                {footerNote}
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-border/40">
            {!hasFinished ? (
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={handleNextReason}
                className="w-full sm:w-auto shadow-lifted"
              >
                <Heart className="size-4 fill-cream" />
                <span>Give me another reason</span>
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={onNext}
                className="w-full sm:w-auto shadow-lifted"
              >
                <span>Continue the Celebration</span>
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
