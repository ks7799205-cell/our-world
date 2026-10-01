"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MusicToggle } from "@/components/navigation/MusicToggle";
import { plannedRoutes } from "@/data/planned-routes";
import { softTransition } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

// Categorized structure for mobile navigation
const mobileNavSections = [
  {
    title: "Celebrate",
    items: plannedRoutes.filter((route) =>
      ["/birthday", "/counter"].includes(route.href)
    ),
  },
  {
    title: "Care",
    items: plannedRoutes.filter((route) =>
      ["/care", "/period-tracker"].includes(route.href)
    ),
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState("");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Close when pathname changes (during render)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-foreground transition-all hover:bg-surface-warm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          open && "border-accent bg-surface-warm text-accent"
        )}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          <X aria-hidden="true" className="size-4" />
        ) : (
          <Menu aria-hidden="true" className="size-4" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex flex-col md:hidden">
            {/* Frosted Backdrop */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-neutral-strong/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduceMotion ? false : { opacity: 0, y: -16, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -16, scale: 0.98 }}
              transition={softTransition}
              className="relative mx-3 mt-3 mb-6 flex max-h-[calc(100vh-1.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface/98 p-5 shadow-lifted backdrop-blur-lg"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <Link
                  href="/"
                  className="flex items-center gap-2.5 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => setOpen(false)}
                >
                  <span className="grid size-7 place-items-center rounded-full border border-border bg-surface-warm text-accent">
                    <Heart className="size-3.5" />
                  </span>
                  <span className="font-serif text-base tracking-wide">{siteConfig.name}</span>
                </Link>

                <div className="flex items-center gap-2">
                  <MusicToggle showLabel={false} />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="grid size-8 place-items-center rounded-full border border-border text-muted hover:bg-surface-warm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="Close navigation"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {/* Categorized Navigation Sections */}
              <nav
                aria-label="Mobile primary navigation"
                className="mt-4 flex-1 overflow-y-auto pr-1 text-sm space-y-5"
              >
                {/* Home link */}
                <div>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-warm hover:text-accent",
                      pathname === "/" ? "bg-surface-warm text-accent font-semibold" : "text-muted"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="size-4 text-accent/70" />
                      <span>Home / Entrance</span>
                    </div>
                    {pathname === "/" && (
                      <span className="size-1.5 rounded-full bg-accent" />
                    )}
                  </Link>
                </div>

                {mobileNavSections.map((section) => (
                  <div key={section.title} className="space-y-1">
                    <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted/70">
                      {section.title}
                    </h3>
                    <div className="grid gap-0.5">
                      {section.items.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center justify-between rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-surface-warm hover:text-accent",
                              active
                                ? "bg-surface-warm text-accent font-semibold"
                                : "text-foreground/80"
                            )}
                            aria-current={active ? "page" : undefined}
                          >
                            <span>{item.title}</span>
                            {active && (
                              <span className="size-1.5 rounded-full bg-accent" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="mt-4 border-t border-border/60 pt-3 text-center text-xs text-muted">
                <p className="font-serif italic text-muted/80">
                  Our private digital world ♡
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
