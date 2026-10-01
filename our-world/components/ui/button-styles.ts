import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "quiet";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-accent-foreground shadow-soft hover:bg-burgundy-deep",
  secondary:
    "border-border bg-surface text-foreground shadow-soft hover:border-rose hover:text-accent",
  ghost: "border-transparent bg-transparent text-foreground hover:bg-surface-warm",
  quiet: "border-transparent bg-transparent text-muted hover:text-accent",
};

export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "size-10 p-0",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full border font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    buttonVariantStyles[variant],
    buttonSizeStyles[size],
    className,
  );
}
