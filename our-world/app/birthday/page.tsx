"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  BirthdayReveal,
  BirthdayMessage,
  GiftSection,
  ScratchCard,
  BirthdayCake,
  SurpriseReveal,
  BirthdayLetter,
  BirthdayEnding,
} from "@/components/birthday";
import { birthdayData } from "@/data/birthday";
import type { BirthdayStep } from "@/types/birthday";

const STEPS: BirthdayStep[] = [
  "reveal",
  "message",
  "gifts",
  "scratch",
  "cake",
  "surprise",
  "letter",
  "ending",
];

export default function BirthdayPage() {
  // Starts directly on "reveal" so opening the page immediately bursts with birthday animations & greeting
  const [currentStep, setCurrentStep] = useState<BirthdayStep>("reveal");

  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <PageContainer size="md" className="min-h-[80vh] py-8 sm:py-12 flex flex-col justify-center">
      {/* Subtle Step Tracker (hidden on initial reveal and ending) */}
      {currentStep !== "reveal" && currentStep !== "ending" && (
        <div className="w-full max-w-xs mx-auto mb-8 flex items-center justify-center gap-1.5 sm:gap-2">
          {STEPS.map((step, idx) => {
            const isActive = idx === currentIndex;
            const isCompleted = idx < currentIndex;
            return (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-6 bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]"
                    : isCompleted
                    ? "w-2 bg-rose-500/40"
                    : "w-2 bg-slate-700/40"
                }`}
                aria-label={`Step ${idx + 1}: ${step}`}
              />
            );
          })}
        </div>
      )}

      {/* Main Step Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="w-full"
        >
          {currentStep === "reveal" && (
            <BirthdayReveal
              reveal={birthdayData.birthdayReveal}
              name={birthdayData.name}
              onNext={() => setCurrentStep("message")}
            />
          )}

          {currentStep === "message" && (
            <BirthdayMessage
              message={birthdayData.mainMessage}
              onNext={() => setCurrentStep("gifts")}
            />
          )}

          {currentStep === "gifts" && (
            <GiftSection
              gifts={birthdayData.gifts}
              onNext={() => setCurrentStep("scratch")}
            />
          )}

          {currentStep === "scratch" && (
            <ScratchCard
              scratchCard={birthdayData.scratchCard}
              onNext={() => setCurrentStep("cake")}
            />
          )}

          {currentStep === "cake" && (
            <BirthdayCake
              cake={birthdayData.cake}
              onNext={() => setCurrentStep("surprise")}
            />
          )}

          {currentStep === "surprise" && (
            <SurpriseReveal
              surprise={birthdayData.surprise}
              onNext={() => setCurrentStep("letter")}
            />
          )}

          {currentStep === "letter" && (
            <BirthdayLetter
              letter={birthdayData.letter}
              onNext={() => setCurrentStep("ending")}
            />
          )}

          {currentStep === "ending" && (
            <BirthdayEnding
              ending={birthdayData.ending}
              onRestart={() => setCurrentStep("reveal")}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </PageContainer>
  );
}
