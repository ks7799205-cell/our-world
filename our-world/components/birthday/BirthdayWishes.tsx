"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles, Star, Sun } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { birthdayData } from "@/data/birthday";
import type { BirthdayWish } from "@/types/birthday";
import { cardRevealVariants, cinematicTransition, softTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type BirthdayWishesProps = {
  wishes?: BirthdayWish[];
  onNext: () => void;
};

const iconMap = {
  Sun,
  Star,
  Heart,
  Sparkles,
  Smile: Sparkles,
};

export function BirthdayWishes({ wishes: propWishes, onNext }: BirthdayWishesProps) {
  const [openedWishIds, setOpenedWishIds] = useState<string[]>([]);
  const wishes: BirthdayWish[] = propWishes || birthdayData.wishes || [];

  const toggleWish = (id: string) => {
    setOpenedWishIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section
      aria-label="Birthday wishes"
      className="relative mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-8 text-center select-none space-y-8"
    >
      <motion.div
        variants={cardRevealVariants}
        initial="initial"
        animate="animate"
        transition={cinematicTransition}
        className="space-y-3"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface px-4 py-1.5 shadow-soft">
          <Sparkles className="size-3.5 text-accent" />
          <span className="font-serif italic text-xs tracking-wider text-muted">
            Special Hopes
          </span>
          <Heart className="size-3 text-accent fill-accent/20" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground">
          Wishes For Your New Year
        </h2>

        <p className="font-serif italic text-base text-muted max-w-md mx-auto">
          Tap each envelope to open what I wish for you.
        </p>
      </motion.div>

      {/* Wishes Interactive Cards */}
      <div className="space-y-4 w-full pt-2">
        {wishes.map((wish) => {
          const isOpened = openedWishIds.includes(wish.id);
          const Icon = (wish.iconName && iconMap[wish.iconName]) || Heart;

          return (
            <motion.div
              key={wish.id}
              variants={cardRevealVariants}
              transition={softTransition}
            >
              <Card
                variant={isOpened ? "warm" : "surface"}
                interactive
                onClick={() => toggleWish(wish.id)}
                className={cn(
                  "p-6 text-left transition-all duration-300 shadow-soft cursor-pointer",
                  isOpened && "ring-1 ring-accent/30 shadow-lifted"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl border border-border bg-surface-warm text-accent">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {wish.title}
                    </h3>
                  </div>

                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {isOpened ? "Close" : "Open ✉"}
                  </span>
                </div>

                {/* Opened Wish Message */}
                {isOpened && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={softTransition}
                    className="pt-4 border-t border-border/40 mt-4"
                  >
                    <p className="font-serif italic text-base sm:text-lg text-foreground/90 leading-relaxed">
                      &ldquo;{wish.message}&rdquo;
                    </p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Next Button */}
      <div className="pt-4">
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={onNext}
          className="shadow-lifted"
        >
          <span>Make A Wish 🎂</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
