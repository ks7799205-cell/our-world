import { plannedRoutes } from "@/data/planned-routes";
import type { PlannedRoute } from "@/types/routes";

export function getPlannedRoute(href: PlannedRoute["href"]): PlannedRoute {
  const route = plannedRoutes.find((item) => item.href === href);

  if (!route) {
    throw new Error(`Missing planned route metadata for ${href}`);
  }

  return route;
}
