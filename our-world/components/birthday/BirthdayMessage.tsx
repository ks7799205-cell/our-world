"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { birthdayData } from "@/data/birthday";
import type { BirthdayData } from "@/types/birthday";
import { cardRevealVariants, cinematicTransition } from "@/lib/motion";

type BirthdayMessageProps = {
  message?: BirthdayData["mainMessage"];
  onNext: () => void;
};

export function BirthdayMessage({ message: propMessage, onNext }: BirthdayMessageProps) {
  const mainMessage = propMessage || birthdayData.mainMessage;

  return (
    <section
      aria-label="Birthday message"
      className="relative mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-8 text-center select-none space-y-8"
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
          className="p-8 sm:p-12 shadow-photo ring-1 ring-accent/20 space-y-6 text-left"
        >
          {/* Header Badge */}
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-300/60 bg-rose/15 px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles className="size-3" />
              <span>Dedicated To You</span>
            </div>

            <Heart className="size-4 text-accent fill-accent/20" />
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
              {mainMessage.title}
            </h2>
          </div>

          {/* Message Paragraphs */}
          <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed text-foreground/90 border-t border-border/40 pt-4">
            {mainMessage.paragraphs.map((p: string, idx: number) => (
              <p key={idx} className="leading-7">
                {p}
              </p>
            ))}
          </div>

          {/* Handwritten Signature */}
          <div className="pt-4 border-t border-border/40 text-right space-y-1">
            <p className="font-script text-2xl sm:text-3xl text-accent whitespace-pre-line leading-snug">
              {mainMessage.signature}
            </p>
          </div>

          {/* Next Button */}
          <div className="pt-4 border-t border-border/40 flex justify-end">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={onNext}
              className="w-full sm:w-auto shadow-lifted"
            >
              <span>Continue</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
