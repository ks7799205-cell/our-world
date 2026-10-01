"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import React from "react";

import { FloatingHearts } from "@/components/home/FloatingHearts";
import { landingConfig } from "@/data/landing-config";
import { cinematicTransition, softTransition } from "@/lib/motion";

type IntroAnimationProps = {
  onEnter: () => void;
};

export function IntroAnimation({ onEnter }: IntroAnimationProps) {
  const { intro } = landingConfig;

  return (
    <section
      aria-label="Opening entrance"
      className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden px-4 py-12 text-center select-none"
    >
      {/* Cinematic Twilight Ambient Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Deep romantic twilight gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 90% at 50% 30%, #2b111e 0%, #170912 60%, #0d040a 100%)",
          }}
        />

        {/* Warm horizon glow in lower portion */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3 opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 85%, rgba(182, 111, 120, 0.45) 0%, rgba(118, 41, 58, 0.25) 45%, transparent 75%)",
          }}
        />

        {/* Soft amber-rose core light behind the text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 200, 200, 0.5) 0%, rgba(182, 111, 120, 0.2) 60%, transparent 80%)",
          }}
        />

        {/* Subtle romantic vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating atmospheric stars, sparks, and delicate hearts */}
      <FloatingHearts tone="twilight" />

      {/* Main Content Container with Staggered Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cinematicTransition}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-7 text-cream"
      >
        {/* Top subtle heart icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...softTransition, delay: 0.1 }}
          className="text-rose/90 animate-pulse"
        >
          <Heart className="size-6 stroke-[1.5] fill-rose/25" />
        </motion.div>

        {/* Central Headline: "Hey, you." */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...softTransition, delay: 0.22 }}
          className="font-serif text-6xl font-light tracking-tight text-cream drop-shadow-md sm:text-7xl md:text-8xl"
        >
          {intro.greeting}
        </motion.h1>

        {/* Subtitle: "I made something just for you." */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...softTransition, delay: 0.35 }}
          className="font-script text-2xl font-normal text-rose-200/95 drop-shadow sm:text-3xl md:text-4xl"
        >
          {intro.subtitle}
        </motion.p>

        {/* Middle subtle heart accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ ...softTransition, delay: 0.45 }}
          className="text-sm text-rose-300/80 select-none"
          aria-hidden="true"
        >
          ♡
        </motion.div>

        {/* Primary CTA Enter Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...softTransition, delay: 0.55 }}
          className="pt-2"
        >
          <button
            type="button"
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 rounded-full border border-rose-300/40 bg-surface/10 px-8 py-3.5 text-sm font-medium tracking-widest text-cream backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-rose-200/70 hover:bg-surface/20 hover:shadow-[0_0_28px_rgba(245,200,200,0.35)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy-deep"
            aria-label="Enter our world"
          >
            <span className="font-sans font-semibold tracking-wider">
              {intro.cta}
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 text-rose-200 transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </button>
        </motion.div>

        {/* Secondary Warning Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ ...softTransition, delay: 0.7 }}
          className="max-w-xs font-serif italic text-xs text-rose-200/70 sm:max-w-sm sm:text-sm"
        >
          {intro.warning}
        </motion.p>
      </motion.div>
    </section>
  );
}
