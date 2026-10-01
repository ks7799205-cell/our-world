"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { quickTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { PlannedRoute } from "@/types/routes";

type NavDropdownProps = {
  label: string;
  items: PlannedRoute[];
};

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState("");
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when pathname changes (during render)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Check if any sub-item is active
  const isAnyActive = items.some((item) => pathname === item.href);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-warm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          (isAnyActive || isOpen) && "bg-surface-warm/80 text-accent font-semibold"
        )}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform duration-200",
            isOpen && "rotate-180 text-accent"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            aria-label={`${label} menu`}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={quickTransition}
            className="absolute left-0 top-full z-50 mt-1.5 min-w-[200px] rounded-xl border border-border/80 bg-surface/95 p-1.5 shadow-lifted backdrop-blur-md"
          >
            <div className="grid gap-0.5">
              {items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-muted transition-colors hover:bg-surface-warm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      isActive && "bg-surface-warm text-accent font-semibold"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.title}</span>
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
