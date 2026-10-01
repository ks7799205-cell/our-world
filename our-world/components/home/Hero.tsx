"use client";

import { motion } from "framer-motion";
import { ChevronDown, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

import { FloatingHearts } from "@/components/home/FloatingHearts";
import { HeroImage } from "@/components/home/HeroImage";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingConfig } from "@/data/landing-config";
import { plannedRoutes } from "@/data/planned-routes";
import {
  cardRevealVariants,
  cinematicTransition,
  softTransition,
  staggerContainerVariants,
} from "@/lib/motion";

type HeroProps = {
  onBackToGreeting?: () => void;
};

export function Hero({ onBackToGreeting }: HeroProps) {
  const { hero } = landingConfig;

  return (
    <div className="relative w-full space-y-16 py-6 sm:py-10">
      {/* Subtle warm ambient floating particles */}
      <FloatingHearts tone="warm" />

      {/* Main Hero Section (Page 2 Mockup) */}
      <section
        aria-label="Welcome hero"
        className="relative mx-auto flex min-h-[calc(100vh-10rem)] max-w-4xl flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cinematicTransition}
          className="w-full space-y-8"
        >
          {/* Eyebrow & Main Headline */}
          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...softTransition, delay: 0.1 }}
              className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-muted tracking-wide"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...softTransition, delay: 0.2 }}
              className="font-script text-4xl sm:text-5xl md:text-6xl text-foreground font-normal tracking-wide"
            >
              {hero.headline}
            </motion.h1>
          </div>

          {/* Centered Heart Accent */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...softTransition, delay: 0.3 }}
            className="flex justify-center text-accent"
          >
            <Heart className="size-4 fill-accent/20 stroke-accent" />
          </motion.div>

          {/* Hero Cinematic Image Frame */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softTransition, delay: 0.4 }}
            className="pt-2"
          >
            <HeroImage
              src={hero.image.src}
              alt={hero.image.alt}
              caption={hero.image.caption}
            />
          </motion.div>

          {/* Romantic passage / quote */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softTransition, delay: 0.55 }}
            className="mx-auto max-w-lg font-serif italic text-base sm:text-lg text-muted leading-relaxed"
          >
            {hero.quote}
          </motion.p>

          {/* Gentle Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ ...softTransition, delay: 0.7 }}
            className="pt-6 flex flex-col items-center gap-1.5 text-xs text-muted/75 select-none"
          >
            <span className="font-serif italic tracking-wider">{hero.scrollCue}</span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 animate-bounce motion-reduce:animate-none"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Chapters & World Overview Section */}
      <section
        id="explore-chapters"
        aria-label="Explore our world chapters"
        className="mx-auto max-w-6xl space-y-8 px-4 pt-12 border-t border-border/40"
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <SectionHeading
            title={hero.overviewTitle}
            eyebrow="Our Journey"
            level="h2"
            accent={<Sparkles className="size-5 text-accent" />}
          >
            <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {hero.overviewSubtitle}
            </p>
          </SectionHeading>

          {onBackToGreeting && (
            <button
              type="button"
              onClick={onBackToGreeting}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-warm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>← Back to greeting</span>
            </button>
          )}
        </div>

        {/* Chapter Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {plannedRoutes.map((route) => (
            <motion.div
              key={route.href}
              variants={cardRevealVariants}
            >
              <Link
                href={route.href}
                className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
              >
                <Card
                  variant="surface"
                  className="h-full p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-lifted"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full border border-border/60 bg-surface-warm/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                      {route.area}
                    </span>
                    <Heart className="size-3.5 text-accent/40 group-hover:text-accent transition-colors" />
                  </div>

                  <h3 className="mt-4 font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {route.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-2">
                    Enter the chapter dedicated to {route.title.toLowerCase()}.
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-accent opacity-80 group-hover:opacity-100">
                    <span>Visit space</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
