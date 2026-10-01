"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import React from "react";

import { Card } from "@/components/ui/Card";
import { cardRevealVariants, softTransition } from "@/lib/motion";

type ComfortMessageProps = {
  title: string;
  message: string;
  signature?: string;
  className?: string;
};

export function ComfortMessage({
  title,
  message,
  signature,
  className,
}: ComfortMessageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : cardRevealVariants}
      initial={reduceMotion ? undefined : "initial"}
      animate={reduceMotion ? undefined : "animate"}
      transition={softTransition}
      className={`w-full ${className}`}
    >
      <Card variant="warm" className="p-6 sm:p-8 shadow-photo ring-1 ring-accent/20 space-y-6">
        {/* Header Badge */}
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-300/60 bg-rose/15 px-3 py-1 text-xs font-semibold text-accent">
            <Sparkles className="size-3" />
            <span>Right Here With You</span>
          </div>

          <Heart className="size-4 text-accent fill-accent/20" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground leading-snug">
            {title}
          </h3>
        </div>

        {/* Message Body */}
        <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed text-foreground/90 border-t border-border/40 pt-4">
          {message.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="leading-7">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Signature */}
        {signature && (
          <div className="pt-4 border-t border-border/40 text-right space-y-1">
            <p className="font-script text-xl sm:text-2xl text-accent whitespace-pre-line leading-snug">
              {signature}
            </p>
            <div className="flex items-center justify-end text-accent">
              <Heart className="size-3.5 fill-accent/25" />
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
