"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cinematicTransition, softTransition } from "@/lib/motion";

type LandingHeroProps = {
  onEnter: () => void;
};

export function LandingHero({ onEnter }: LandingHeroProps) {
  return (
    <div className="relative flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center px-4">
      {/* Decorative center halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-rose/15 blur-3xl sm:h-96 sm:w-96"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cinematicTransition}
        className="relative z-10 mx-auto max-w-2xl space-y-6"
      >
        {/* Little intimate icon greeting */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...softTransition, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-4 py-1.5 shadow-soft backdrop-blur-sm"
        >
          <Sparkles aria-hidden="true" className="size-3.5 text-accent" />
          <span className="font-serif italic text-xs tracking-wider text-muted">
            a little world for someone special
          </span>
          <Heart aria-hidden="true" className="size-3 text-accent fill-accent/20" />
        </motion.div>

        {/* Core Greeting Headings */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softTransition, delay: 0.2 }}
            className="font-serif text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            Hey, you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softTransition, delay: 0.3 }}
            className="mx-auto max-w-md font-sans text-lg font-normal text-muted sm:text-xl"
          >
            I made something for you.
          </motion.p>
        </div>

        {/* Enter CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...softTransition, delay: 0.4 }}
          className="pt-4"
        >
          <Button
            type="button"
            size="lg"
            variant="primary"
            onClick={onEnter}
            className="group relative px-8 py-4 text-base tracking-wide shadow-lifted transition-all hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Enter our world"
          >
            <span>ENTER OUR WORLD</span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Button>
        </motion.div>

        {/* Warning / Romantic Secondary Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...softTransition, delay: 0.55 }}
          className="pt-6"
        >
          <p className="font-serif italic text-xs tracking-wide text-muted/75 sm:text-sm">
            Warning: contains an unreasonable amount of love.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
