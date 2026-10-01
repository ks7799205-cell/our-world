"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GiftBox } from "@/components/birthday/GiftBox";
import type { BirthdayGift } from "@/types/birthday";
import { cardRevealVariants, cinematicTransition, staggerContainerVariants } from "@/lib/motion";

interface GiftSectionProps {
  gifts: BirthdayGift[];
  onNext: () => void;
}

export function GiftSection({ gifts, onNext }: GiftSectionProps) {
  const [openedGiftId, setOpenedGiftId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenedGiftId((current) => (current === id ? null : id));
  };

  return (
    <section
      aria-label="Birthday gifts section"
      className="relative mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-8 text-center select-none space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={cardRevealVariants}
        initial="initial"
        animate="animate"
        transition={cinematicTransition}
        className="space-y-3 max-w-lg mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-300">
          <Sparkles className="size-3.5" />
          <span>Surprises Andar Hai</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
          Tumhare Liye Kuch Cheezein Laaya Hoon...
        </h2>

        <p className="font-sans text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
          Jab mann kare ek-ek gift box kholo. Har gift mein mere pyaar ka ek chhota sa hissa hai.
        </p>
      </motion.div>

      {/* Gifts Grid */}
      <motion.div
        variants={staggerContainerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full pt-2"
      >
        {gifts.map((gift) => (
          <GiftBox
            key={gift.id}
            gift={gift}
            isOpen={openedGiftId === gift.id}
            onOpen={() => handleToggle(gift.id)}
            onClose={() => setOpenedGiftId(null)}
          />
        ))}
      </motion.div>

      {/* Next Step Button */}
      <motion.div
        variants={cardRevealVariants}
        initial="initial"
        animate="animate"
        transition={cinematicTransition}
        className="pt-6"
      >
        <Button
          size="lg"
          variant="primary"
          onClick={onNext}
          className="group px-7 py-3 rounded-full text-base font-medium shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-all"
        >
          <Gift className="w-4 h-4 mr-2" />
          Next: Gift
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </section>
  );
}
