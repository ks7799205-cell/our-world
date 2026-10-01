"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { pageTransitionVariants, softTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PageTransitionProps = HTMLMotionProps<"div">;

export function PageTransition({
  className,
  children,
  ...props
}: PageTransitionProps) {
  return (
    <motion.div
      className={cn("w-full", className)}
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={softTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
}
