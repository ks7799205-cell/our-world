"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Disc, Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";
import type { Track } from "@/types/music";

type VinylPlayerProps = {
  track: Track;
  isPlaying: boolean;
  className?: string;
};

export function VinylPlayer({ track, isPlaying, className }: VinylPlayerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center p-4 sm:p-6 select-none",
        className
      )}
    >
      {/* Turntable Deck Base */}
      <div className="relative flex items-center justify-center rounded-3xl border border-border/80 bg-surface-warm/60 p-6 sm:p-8 shadow-photo backdrop-blur-sm ring-1 ring-accent/15">
        {/* Tone Arm */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-4 right-4 sm:top-6 sm:right-6 z-20 transition-transform duration-700 origin-top-right pointer-events-none",
            isPlaying ? "rotate-[18deg]" : "rotate-0"
          )}
        >
          {/* Tone Arm Base / Pivot */}
          <div className="size-6 rounded-full border border-accent/40 bg-burgundy-deep shadow-soft" />
          {/* Tone Arm Metallic Bar */}
          <div className="w-1.5 h-24 sm:h-32 bg-gradient-to-b from-stone-400 via-stone-300 to-stone-500 rounded-full mx-auto shadow-xs" />
          {/* Stylus Head / Cartridge */}
          <div className="w-4 h-6 -ml-1 rounded-sm bg-accent border border-rose-300 shadow-xs" />
        </div>

        {/* Ambient Glow behind vinyl */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute size-48 sm:size-64 rounded-full bg-accent/15 blur-2xl transition-opacity duration-1000 pointer-events-none",
            isPlaying ? "opacity-100 scale-105" : "opacity-30 scale-95"
          )}
        />

        {/* Vinyl Record Disc */}
        <motion.div
          animate={
            isPlaying && !reduceMotion
              ? { rotate: 360 }
              : { rotate: 0 }
          }
          transition={
            isPlaying && !reduceMotion
              ? { repeat: Infinity, duration: 8, ease: "linear" }
              : { duration: 0.8, ease: "easeOut" }
          }
          className="relative size-56 sm:size-72 md:size-80 rounded-full bg-[#120a10] border-4 border-[#22131e] shadow-lifted flex items-center justify-center overflow-hidden"
        >
          {/* Concentric Grooves */}
          <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-5 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-20 rounded-full border border-white/5 pointer-events-none" />

          {/* Light Sheen Reflection across Vinyl */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60 pointer-events-none"
          />

          {/* Center Label */}
          <div className="relative size-20 sm:size-24 rounded-full border-2 border-[#e6b8a2] bg-surface-warm shadow-inner flex flex-col items-center justify-center overflow-hidden text-center p-2">
            {track.coverImage ? (
              <Image
                src={track.coverImage}
                alt={track.coverAlt || track.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-0.5 text-accent">
                <Heart className="size-3.5 fill-accent/30" />
                <span className="font-serif text-[9px] font-semibold tracking-wider text-burgundy-deep truncate max-w-[65px]">
                  {track.category}
                </span>
                <Disc className="size-3 text-muted/60" />
              </div>
            )}

            {/* Spindle Hole */}
            <div className="absolute size-3 rounded-full border border-white/40 bg-[#120a10] shadow-inner" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
