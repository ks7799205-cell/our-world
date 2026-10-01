"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export { buttonStyles };
export type { ButtonSize, ButtonVariant };

export type ButtonProps = Omit<HTMLMotionProps<"button">, "ref"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={buttonStyles({ variant, size, className })}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.18 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
