"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Cake, PartyPopper } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { birthdayData } from "@/data/birthday";
import type { BirthdayData } from "@/types/birthday";
import { cardRevealVariants, cinematicTransition, softTransition } from "@/lib/motion";

type BirthdayRevealProps = {
  reveal?: BirthdayData["birthdayReveal"];
  name?: string;
  onNext: () => void;
};

export function BirthdayReveal({ reveal: propReveal, name: propName, onNext }: BirthdayRevealProps) {
  const birthdayReveal = propReveal || birthdayData.birthdayReveal;
  const name = propName || birthdayData.name;

  return (
    <section
      aria-label="Birthday reveal celebration"
      className="relative mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-6 sm:py-10 text-center select-none space-y-8"
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
          className="relative overflow-hidden p-8 sm:p-14 shadow-2xl ring-2 ring-rose-400/40 space-y-8 bg-gradient-to-b from-surface via-surface-warm to-surface"
        >
          {/* Glowing Ambient Background Rings */}
          <div
            aria-hidden="true"
            className="absolute -top-12 left-1/2 -translate-x-1/2 size-72 rounded-full bg-rose-500/20 blur-3xl pointer-events-none animate-pulse"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-10 right-10 size-48 rounded-full bg-amber-500/15 blur-2xl pointer-events-none"
          />

          {/* Top Festive Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={softTransition}
            className="relative z-10 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1.5 shadow-soft text-[#D94F70]"
          >
            <PartyPopper className="size-4 text-rose-400 animate-bounce" />
            <span className="font-serif italic text-xs tracking-wider">
              Today Is Your Special Day
            </span>
            <Sparkles className="size-3.5 text-amber-300" />
          </motion.div>

          {/* Grand Birthday Announcement Typography */}
          <div className="relative z-10 space-y-4">
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="flex items-center justify-center gap-2"
            >
              <Cake className="size-6 text-rose-400" />
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-widest text-[#8B263D] uppercase">
                {birthdayReveal.greeting}
              </span>
              <Star className="size-5 text-amber-300 fill-amber-300" />
            </motion.div>

            {/* Glowing Name */}
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-r from-[#FF4F81] via-[#E97BB5] to-[#F5B942] bg-clip-text text-transparent tracking-tight drop-shadow-md py-1"
            >
              {name}
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="font-serif italic text-lg sm:text-2xl text-[#8A6875] max-w-lg mx-auto pt-2 leading-relaxed"
            >
              &ldquo;{birthdayReveal.subtitle}&rdquo;
            </motion.p>
          </div>

          {/* Tagline / Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative z-10 pt-4 border-t border-border/50"
          >
            <p className="font-script text-2xl sm:text-4xl text-[#FF7D9C]">
              {birthdayReveal.tagline}
            </p>
          </motion.div>

          {/* Continue / Enter Celebration Button */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="relative z-10 pt-4"
          >
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={onNext}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-medium shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.03] transition-all"
            >
              <span>Begin Your Celebration</span>
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </section>
  );
}
