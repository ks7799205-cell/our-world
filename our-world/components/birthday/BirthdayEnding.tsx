"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { BirthdayData } from "@/types/birthday";
import { Sparkles, RotateCcw, Home, Heart } from "lucide-react";

interface BirthdayEndingProps {
  ending: BirthdayData["ending"];
  onRestart: () => void;
  onEnterWorld?: () => void;
}

export function BirthdayEnding({ ending, onRestart, onEnterWorld }: BirthdayEndingProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-xl mx-auto py-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="space-y-6"
      >
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          Celebration Complete
        </span>

        {/* Ending Title */}
        <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 font-semibold leading-tight tracking-wide drop-shadow-sm">
          {ending.title}
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-700 max-w-md mx-auto leading-relaxed font-serif">
          {ending.subtitle}
        </p>

        {/* Romantic Note Box */}
        <div className="p-6 rounded-2xl bg-slate-900/85 backdrop-blur-sm border border-rose-500/30 max-w-md mx-auto space-y-4 shadow-xl">
          <p className="text-sm sm:text-base text-rose-100 font-serif italic">
            &ldquo;{ending.note}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-2 pt-2 border-t border-rose-500/20">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-500/40" />
            <span className="text-sm font-serif text-slate-100 font-medium whitespace-pre-line">
              {ending.signature}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 pt-4"
      >
        <Button
          size="lg"
          variant="secondary"
          onClick={onRestart}
          className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-medium hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Experience it again
        </Button>

        {onEnterWorld ? (
          <Button
            size="lg"
            variant="primary"
            onClick={onEnterWorld}
            className="w-full sm:w-auto px-7 py-3 rounded-full text-sm font-medium shadow-lg shadow-rose-500/20 hover:scale-[1.03] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Step into Our World
          </Button>
        ) : (
          <Link href="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto px-7 py-3 rounded-full text-sm font-medium shadow-lg shadow-rose-500/20 hover:scale-[1.03] transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Step into Our World
            </Button>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
