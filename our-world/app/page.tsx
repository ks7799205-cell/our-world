"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Hero } from "@/components/home";
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
import { PageContainer } from "@/components/layout/PageContainer";
import { birthdayData } from "@/data/birthday";
import { cinematicTransition, pageTransitionVariants } from "@/lib/motion";
import type { BirthdayStep } from "@/types/birthday";

const BIRTHDAY_STEPS: BirthdayStep[] = [
  "reveal",
  "message",
  "gifts",
  "scratch",
  "cake",
  "surprise",
  "letter",
  "ending",
];

export default function HomePage() {
  const [view, setView] = useState<"birthday" | "our-world">("birthday");
  const [birthdayStep, setBirthdayStep] = useState<BirthdayStep>("reveal");

  const currentStepIndex = BIRTHDAY_STEPS.indexOf(birthdayStep);

  const handleEnterOurWorld = () => {
    setView("our-world");
  };

  const handleBackToBirthday = () => {
    setView("birthday");
  };

  return (
    <AnimatePresence mode="wait">
      {view === "birthday" ? (
        <motion.div
          key="birthday-experience"
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={cinematicTransition}
          className="w-full"
        >
          <PageContainer size="md" className="min-h-[80vh] py-8 sm:py-12 flex flex-col justify-center">
            {/* Subtle Step Tracker (hidden on reveal and ending) */}
            {birthdayStep !== "reveal" && birthdayStep !== "ending" && (
              <div className="w-full max-w-xs mx-auto mb-8 flex items-center justify-center gap-1.5 sm:gap-2">
                {BIRTHDAY_STEPS.map((step, idx) => {
                  const isActive = idx === currentStepIndex;
                  const isCompleted = idx < currentStepIndex;
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

            {/* Main Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={birthdayStep}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="w-full"
              >
                {birthdayStep === "reveal" && (
                  <BirthdayReveal
                    reveal={birthdayData.birthdayReveal}
                    name={birthdayData.name}
                    onNext={() => setBirthdayStep("message")}
                  />
                )}

                {birthdayStep === "message" && (
                  <BirthdayMessage
                    message={birthdayData.mainMessage}
                    onNext={() => setBirthdayStep("gifts")}
                  />
                )}

                {birthdayStep === "gifts" && (
                  <GiftSection
                    gifts={birthdayData.gifts}
                    onNext={() => setBirthdayStep("scratch")}
                  />
                )}

                {birthdayStep === "scratch" && (
                  <ScratchCard
                    scratchCard={birthdayData.scratchCard}
                    onNext={() => setBirthdayStep("cake")}
                  />
                )}

                {birthdayStep === "cake" && (
                  <BirthdayCake
                    cake={birthdayData.cake}
                    onNext={() => setBirthdayStep("surprise")}
                  />
                )}

                {birthdayStep === "surprise" && (
                  <SurpriseReveal
                    surprise={birthdayData.surprise}
                    onNext={() => setBirthdayStep("letter")}
                  />
                )}

                {birthdayStep === "letter" && (
                  <BirthdayLetter
                    letter={birthdayData.letter}
                    onNext={() => setBirthdayStep("ending")}
                  />
                )}

                {birthdayStep === "ending" && (
                  <BirthdayEnding
                    ending={birthdayData.ending}
                    onRestart={() => setBirthdayStep("reveal")}
                    onEnterWorld={handleEnterOurWorld}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </PageContainer>
        </motion.div>
      ) : (
        <motion.div
          key="our-world-hub"
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={cinematicTransition}
          className="w-full"
        >
          <PageContainer size="lg" className="py-2 sm:py-4">
            <Hero onBackToGreeting={handleBackToBirthday} />
          </PageContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
