import type { Transition, Variants } from "framer-motion";

export const motionDurations = {
  quick: 0.2,
  gentle: 0.35,
  cinematic: 0.6,
  slow: 0.9,
} as const;

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const softTransition: Transition = {
  duration: motionDurations.gentle,
  ease: motionEase,
};

export const quickTransition: Transition = {
  duration: motionDurations.quick,
  ease: motionEase,
};

export const cinematicTransition: Transition = {
  duration: motionDurations.cinematic,
  ease: motionEase,
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const cardRevealVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export const modalOverlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalPanelVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.98 },
};

export const imageRevealVariants: Variants = {
  initial: { opacity: 0, scale: 1.02 },
  animate: { opacity: 1, scale: 1 },
};

export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
