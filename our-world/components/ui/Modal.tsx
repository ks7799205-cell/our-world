"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  modalOverlayVariants,
  modalPanelVariants,
  softTransition,
} from "@/lib/motion";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [open]);

  const close = () => onOpenChange(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      close();
      return;
    }

    if (event.key !== "Tab" || !panelRef.current) {
      return;
    }

    const focusableElements = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-burgundy-deep/45 px-4 py-8 backdrop-blur-sm"
          variants={modalOverlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={softTransition}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              close();
            }
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            className={cn(
              "max-h-[min(720px,calc(100vh-4rem))] w-full max-w-xl overflow-y-auto rounded-[var(--radius-sm)] border border-border bg-surface p-6 shadow-lifted focus:outline-none",
              className,
            )}
            variants={modalPanelVariants}
            transition={softTransition}
            onKeyDown={handleKeyDown}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 id={titleId} className="font-serif text-3xl text-foreground">
                  {title}
                </h2>
                {description ? (
                  <p
                    id={descriptionId}
                    className="mt-2 text-sm leading-6 text-muted"
                  >
                    {description}
                  </p>
                ) : null}
              </div>
              <Button
                type="button"
                variant="quiet"
                size="icon"
                aria-label="Close modal"
                onClick={close}
              >
                <X aria-hidden="true" className="size-5" />
              </Button>
            </div>
            <div className="mt-6">{children}</div>
            {footer ? <div className="mt-8">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
