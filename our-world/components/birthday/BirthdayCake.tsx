"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Celebration } from "@/components/birthday/Celebration";
import { CandleBlow } from "@/components/birthday/CandleBlow";
import type { BirthdayData } from "@/types/birthday";
import { Sparkles, ArrowRight } from "lucide-react";

interface BirthdayCakeProps {
  cake: BirthdayData["cake"];
  onNext: () => void;
}

export function BirthdayCake({ cake, onNext }: BirthdayCakeProps) {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlow = () => {
    if (!isBlown) {
      setIsBlown(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-xl mx-auto py-4">
      {isBlown && <Celebration />}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          {cake.makeAWishPrompt}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-semibold drop-shadow-sm">
          {isBlown ? "Wish Granted ✨" : cake.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-700 max-w-md mx-auto leading-relaxed font-serif">
          {isBlown ? cake.wishedMessage : cake.subtitle}
        </p>
      </motion.div>

      {/* Interactive Cake Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative flex flex-col items-center justify-center p-8 w-full max-w-xs"
      >
        {/* Candle Glow */}
        {!isBlown && (
          <div
            className="absolute -top-4 w-28 h-28 rounded-full bg-amber-400/20 blur-xl pointer-events-none animate-pulse"
            aria-hidden="true"
          />
        )}

        {/* Cake Container */}
        <div className="relative flex flex-col items-center">
          {/* Flame & Candle */}
          <div className="relative flex flex-col items-center z-10">
            {!isBlown ? (
              <motion.div
                animate={{
                  scale: [1, 1.15, 0.95, 1.1, 1],
                  rotate: [-2, 2, -1, 3, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="w-4 h-7 rounded-full bg-gradient-to-t from-amber-500 via-yellow-400 to-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.9)] cursor-pointer"
                onClick={handleBlow}
                title="Click to blow out the candle"
              />
            ) : (
              /* Smoke drift after blowing */
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: [0.8, 0.4, 0], y: -25, scale: [0.8, 1.5, 2] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-3 h-3 rounded-full bg-slate-400/40 blur-sm"
              />
            )}

            {/* Wick */}
            <div className="w-0.5 h-2 bg-neutral-700" />

            {/* Candle Stick */}
            <div className="w-3.5 h-9 rounded-t-sm bg-gradient-to-b from-rose-300 via-rose-400 to-rose-500 shadow-sm border border-rose-200/40 relative overflow-hidden">
              {/* Candle stripes */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.4)_3px,rgba(255,255,255,0.4)_6px)]" />
            </div>
          </div>

          {/* Top Tier */}
          <div className="relative -mt-1 w-32 h-14 bg-gradient-to-b from-rose-100 to-rose-200 rounded-t-lg shadow-md border-t-2 border-rose-50 flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 h-3 bg-white/70 rounded-b-md flex justify-around">
              <div className="w-3 h-3 bg-white/70 rounded-full" />
              <div className="w-3 h-4 bg-white/70 rounded-full" />
              <div className="w-3 h-2.5 bg-white/70 rounded-full" />
              <div className="w-3 h-3.5 bg-white/70 rounded-full" />
            </div>
            <div className="w-full h-1 bg-rose-300/40 absolute bottom-0" />
            <span className="text-xs font-serif text-rose-700/60 select-none tracking-widest">♡ ♡</span>
          </div>

          {/* Bottom Tier */}
          <div className="relative -mt-1 w-48 h-18 bg-gradient-to-b from-rose-200 to-rose-300 rounded-t-xl shadow-lg border-t-2 border-rose-100 flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 h-4 bg-white/70 rounded-b-lg flex justify-around">
              <div className="w-4 h-3.5 bg-white/70 rounded-full" />
              <div className="w-4 h-5 bg-white/70 rounded-full" />
              <div className="w-4 h-3 bg-white/70 rounded-full" />
              <div className="w-4 h-4.5 bg-white/70 rounded-full" />
              <div className="w-4 h-3 bg-white/70 rounded-full" />
            </div>
            <div className="w-full h-1.5 bg-rose-400/30 absolute bottom-0" />
            <span className="text-xs font-serif text-rose-800/60 select-none tracking-widest mt-2">
              HAPPY BIRTHDAY
            </span>
          </div>

          {/* Cake Plate / Stand */}
          <div className="w-56 h-3.5 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 rounded-full shadow-lg border border-amber-300/60" />
          <div className="w-24 h-2 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 rounded-b-md shadow-sm" />
        </div>
      </motion.div>

      {/* Candle Blow Interaction Area */}
      <div className="w-full max-w-sm mx-auto">
        <CandleBlow isBlown={isBlown} onBlow={handleBlow} />

        {isBlown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-4"
          >
            <p className="text-xs text-rose-700 font-medium italic font-serif">
              {cake.wishedSubtext}
            </p>
            <div>
              <Button
                size="lg"
                variant="primary"
                onClick={onNext}
                className="group px-7 py-3 rounded-full text-base font-medium shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-all"
              >
                Next: A Special Surprise
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
