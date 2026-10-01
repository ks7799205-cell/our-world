"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MobileNav } from "@/components/navigation/MobileNav";
import { MusicToggle } from "@/components/navigation/MusicToggle";
import { NavDropdown } from "@/components/navigation/NavDropdown";
import { plannedRoutes } from "@/data/planned-routes";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const primaryRoutes = plannedRoutes.filter((route) =>
  ["/birthday", "/counter"].includes(route.href)
);

const careRoutes = plannedRoutes.filter((route) =>
  ["/care", "/period-tracker"].includes(route.href)
);

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-surface/75 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand / Home Link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-full py-1 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`${siteConfig.name} - Home`}
        >
          <span className="grid size-8 place-items-center rounded-full border border-border/80 bg-surface shadow-soft transition-transform group-hover:scale-105">
            <Heart aria-hidden="true" className="size-4 text-accent fill-accent/15" />
          </span>
          <span className="font-serif text-lg tracking-wide text-foreground group-hover:text-accent transition-colors">
            {siteConfig.name}
          </span>
        </Link>

        {/* Minimal Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1.5 md:flex">

          {primaryRoutes.map((route) => {
            const active = pathname === route.href;

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-warm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  active && "bg-surface-warm text-accent font-semibold"
                )}
                aria-current={active ? "page" : undefined}
              >
                {route.title}
              </Link>
            );
          })}
          <NavDropdown label="Care" items={careRoutes} />
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <MusicToggle showLabel={false} />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
