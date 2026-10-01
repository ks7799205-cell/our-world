import type { PlannedRoute } from "@/types/routes";

export const plannedRoutes = [
  {
    href: "/birthday",
    title: "Birthday Celebration",
    area: "birthday",
    phase: "planned",
  },
  {
    href: "/counter",
    title: "Relationship Counter",
    area: "love",
    phase: "planned",
  },
  {
    href: "/care",
    title: "For Bad Days",
    area: "care",
    phase: "planned",
  },
  {
    href: "/period-tracker",
    title: "Period Tracker",
    area: "period",
    phase: "planned",
  },
] satisfies PlannedRoute[];
