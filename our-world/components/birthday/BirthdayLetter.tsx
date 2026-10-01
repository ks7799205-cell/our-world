"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { BirthdayData } from "@/types/birthday";
import { Heart, ArrowRight, BookOpen, Mail } from "lucide-react";

interface BirthdayLetterProps {
  letter: BirthdayData["letter"];
  onNext: () => void;
}

export function BirthdayLetter({ letter, onNext }: BirthdayLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto py-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Sealed / Unopened Letter Prompt */
          <motion.div
            key="sealed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 w-full max-w-md mx-auto"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              Ek Aakhri Chiz
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-semibold drop-shadow-sm">
              Kuch aisa jo mai dil se kehna chahta hun.
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-serif italic">
              Isse pehle ki ye din khatam ho, maine kuch shabdon ko likha hai jo mere dil se seedha tumhare liye aaye hain.
            </p>

            <div className="pt-2">
              <Button
                size="lg"
                variant="primary"
                onClick={() => setIsOpen(true)}
                className="group px-8 py-3.5 rounded-full text-base font-medium shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-all"
              >
                <Mail className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                Read it 📜
              </Button>
            </div>
          </motion.div>
        ) : (
          /* Unfolded Letter Parchment */
          <motion.div
            key="unfolded"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 w-full"
          >
            {/* Header */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <BookOpen className="w-3.5 h-3.5" />
                A Birthday Letter
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-semibold drop-shadow-sm">
                From My Heart
              </h2>
            </div>

            {/* Parchment / Letter Container */}
            <div className="relative w-full bg-slate-900/90 backdrop-blur-md border border-rose-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-left shadow-2xl shadow-rose-950/40 overflow-hidden">
              {/* Subtle Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/5 rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-tr-full pointer-events-none" />

              <div className="relative space-y-6">
                {/* Letter Meta & Greeting */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-rose-500/20 pb-4 gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif text-rose-300 font-medium">
                    {letter.greeting}
                  </h3>
                  {letter.date && (
                    <span className="text-xs text-rose-200/80 font-sans tracking-wide">
                      {letter.date}
                    </span>
                  )}
                </div>

                {/* Letter Paragraphs */}
                <div className="space-y-4 text-slate-100 font-serif text-base sm:text-lg leading-relaxed sm:leading-loose">
                  {letter.paragraphs.map((para, idx) => (
                    <p key={idx} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Closing & Signature */}
                <div className="pt-6 border-t border-rose-500/20 flex flex-col items-end text-right space-y-1">
                  <p className="text-sm text-rose-200/90 font-serif italic">
                    {letter.closing}
                  </p>
                  <p className="text-lg sm:text-xl font-serif text-rose-300 font-medium tracking-wide">
                    {letter.signature}
                  </p>
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-500/40 mt-1" />
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="pt-2">
              <Button
                size="lg"
                variant="primary"
                onClick={onNext}
                className="group px-7 py-3 rounded-full text-base font-medium shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-all"
              >
                Next: Final Celebration
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
