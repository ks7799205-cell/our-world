"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cake, CalendarHeart, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

import { buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { distractionItems } from "@/data/care";
import { cardRevealVariants, softTransition } from "@/lib/motion";

export function DistractionHub() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : cardRevealVariants}
      initial={reduceMotion ? undefined : "initial"}
      animate={reduceMotion ? undefined : "animate"}
      transition={softTransition}
      className="w-full space-y-6"
    >
      <Card variant="warm" className="p-6 sm:p-8 shadow-photo space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface px-3 py-1 text-xs font-semibold text-accent">
            <Sparkles className="size-3" />
            <span>Gentle Distractions</span>
          </div>

          <Heart className="size-4 text-accent fill-accent/20" />
        </div>

        {/* Gentle thoughts list */}
        <div className="space-y-3">
          {distractionItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border/60 bg-surface/80 p-4 space-y-1 text-left"
            >
              <h4 className="font-serif text-sm font-semibold text-foreground">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        {/* Exploration links */}
        <div className="pt-2 border-t border-border/40 space-y-3">
          <p className="font-serif italic text-xs text-muted text-center">
            Or visit another gentle corner of our world:
          </p>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <Link
              href="/birthday"
              className={buttonStyles({
                variant: "secondary",
                size: "sm",
                className: "w-full text-xs justify-center",
              })}
            >
              <Cake className="size-3.5" />
              <span>Birthday Celebration</span>
            </Link>

            <Link
              href="/counter"
              className={buttonStyles({
                variant: "secondary",
                size: "sm",
                className: "w-full text-xs justify-center",
              })}
            >
              <CalendarHeart className="size-3.5" />
              <span>Our Time Together</span>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
