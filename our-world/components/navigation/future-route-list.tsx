import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { plannedRoutes } from "@/data/planned-routes";

export function FutureRouteList() {
  return (
    <nav aria-label="Planned routes" className="grid gap-3 sm:grid-cols-2">
      {plannedRoutes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className="group flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          <span>{route.title}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </Link>
      ))}
    </nav>
  );
}
