export type RouteArea =
  | "opening"
  | "love"
  | "care"
  | "period"
  | "birthday";

export type PlannedRoute = {
  href: "/" | `/${string}`;
  title: string;
  area: RouteArea;
  phase: "foundation" | "planned";
};
