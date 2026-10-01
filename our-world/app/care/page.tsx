"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useState } from "react";

import { BadDayScreen, MoodSelector } from "@/components/care";
import { PageContainer } from "@/components/layout/PageContainer";
import { cardRevealVariants, softTransition } from "@/lib/motion";
import type { MoodState } from "@/types/care";

export default function CarePage() {
  const [selectedMood, setSelectedMood] = useState<MoodState | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <PageContainer size="md" className="py-4">
      <AnimatePresence mode="wait">
        {!selectedMood ? (
          <motion.div
            key="mood-selector"
            variants={reduceMotion ? undefined : cardRevealVariants}
            initial={reduceMotion ? undefined : "initial"}
            animate={reduceMotion ? undefined : "animate"}
            exit={reduceMotion ? undefined : "exit"}
            transition={softTransition}
          >
            <MoodSelector onSelectMood={setSelectedMood} />
          </motion.div>
        ) : (
          <motion.div
            key={`bad-day-${selectedMood.id}`}
            variants={reduceMotion ? undefined : cardRevealVariants}
            initial={reduceMotion ? undefined : "initial"}
            animate={reduceMotion ? undefined : "animate"}
            exit={reduceMotion ? undefined : "exit"}
            transition={softTransition}
          >
            <BadDayScreen
              mood={selectedMood}
              onResetMood={() => setSelectedMood(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
