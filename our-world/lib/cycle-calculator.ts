import type { CyclePrediction, CycleSettings, PeriodEntry } from "@/types/period";

/**
 * Parses YYYY-MM-DD calendar date string safely without timezone conversion.
 */
export function parseISODate(dateStr: string): { year: number; month: number; day: number } {
  const parts = dateStr.split("-").map((p) => parseInt(p, 10));
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
  }
  return { year: parts[0], month: parts[1], day: parts[2] };
}

/**
 * Formats year, month, day into YYYY-MM-DD.
 */
export function formatISODate(year: number, month: number, day: number): string {
  const y = String(year).padStart(4, "0");
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Returns today's date in local calendar YYYY-MM-DD format.
 */
export function getTodayISODate(): string {
  const d = new Date();
  return formatISODate(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

/**
 * Checks if a given year is a leap year.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns the exact number of days in a given month (1-indexed).
 */
export function getDaysInMonth(year: number, month: number): number {
  switch (month) {
    case 1: // January
    case 3: // March
    case 5: // May
    case 7: // July
    case 8: // August
    case 10: // October
    case 12: // December
      return 31;
    case 4: // April
    case 6: // June
    case 9: // September
    case 11: // November
      return 30;
    case 2: // February
      return isLeapYear(year) ? 29 : 28;
    default:
      return 30;
  }
}

/**
 * Adds (or subtracts) a specific number of days to a YYYY-MM-DD calendar date string.
 */
export function addDays(dateStr: string, days: number): string {
  const { year, month, day } = parseISODate(dateStr);
  const dateObj = new Date(year, month - 1, day);
  dateObj.setDate(dateObj.getDate() + days);
  return formatISODate(dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate());
}

/**
 * Calculates the difference in days between dateStrA and dateStrB (A - B).
 */
export function diffDays(dateStrA: string, dateStrB: string): number {
  const a = parseISODate(dateStrA);
  const b = parseISODate(dateStrB);
  const utcA = Date.UTC(a.year, a.month - 1, a.day);
  const utcB = Date.UTC(b.year, b.month - 1, b.day);
  return Math.round((utcA - utcB) / (1000 * 60 * 60 * 24));
}

/**
 * Checks if targetDate is between startDate and endDate inclusive.
 */
export function isDateInRange(targetDate: string, startDate: string, endDate: string): boolean {
  return targetDate >= startDate && targetDate <= endDate;
}

/**
 * Calculates the average cycle length from recorded period logs.
 */
export function calculateAverageCycle(
  entries: PeriodEntry[],
  fallbackLength: number = 28
): number {
  if (entries.length < 2) {
    return fallbackLength;
  }

  // Sort ascending by start date
  const sorted = [...entries].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const intervals: number[] = [];

  for (let i = 1; i < sorted.length; i++) {
    const diff = diffDays(sorted[i].startDate, sorted[i - 1].startDate);
    // Reasonable technical boundaries: 21 to 60 days
    if (diff >= 21 && diff <= 60) {
      intervals.push(diff);
    }
  }

  if (intervals.length === 0) {
    return fallbackLength;
  }

  const sum = intervals.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum / intervals.length);
}

/**
 * Calculates current cycle day (Day 1 = period start date).
 */
export function calculateCurrentCycleDay(
  lastPeriodStartDate: string,
  todayStr: string = getTodayISODate()
): number {
  const diff = diffDays(todayStr, lastPeriodStartDate);
  return diff >= 0 ? diff + 1 : 1;
}

/**
 * Generates cycle prediction for the next period window based on history & settings.
 */
export function calculatePrediction(
  entries: PeriodEntry[],
  settings: CycleSettings,
  todayStr: string = getTodayISODate()
): CyclePrediction | null {
  if (entries.length === 0) {
    return null;
  }

  // Sort descending to find most recent period
  const sorted = [...entries].sort((a, b) => b.startDate.localeCompare(a.startDate));
  const latestPeriod = sorted[0];

  const avgCycleDays = calculateAverageCycle(entries, settings.averageCycleLength);

  let confidence: "low" | "medium" | "high" = "low";
  if (entries.length >= 4) {
    confidence = "high";
  } else if (entries.length >= 2) {
    confidence = "medium";
  }

  let nextStart = addDays(latestPeriod.startDate, avgCycleDays);

  // If nextStart is in the past, project forward to upcoming cycle
  while (nextStart < todayStr) {
    nextStart = addDays(nextStart, avgCycleDays);
  }

  const nextEnd = addDays(nextStart, settings.typicalPeriodLength - 1);
  const daysUntilNext = diffDays(nextStart, todayStr);

  return {
    estimatedStartDate: nextStart,
    estimatedEndDate: nextEnd,
    confidence,
    averageCycleDays: avgCycleDays,
    daysUntilNext,
  };
}

/**
 * Checks if a specific date falls on any logged period day.
 */
export function isPeriodDay(
  dateStr: string,
  entries: PeriodEntry[],
  typicalLength: number = 5
): boolean {
  for (const entry of entries) {
    const start = entry.startDate;
    const end = entry.endDate || addDays(start, typicalLength - 1);
    if (isDateInRange(dateStr, start, end)) {
      return true;
    }
  }
  return false;
}

/**
 * Formats a calendar date for friendly display (e.g. "Sep 28, 2026").
 */
export function formatDisplayDate(dateStr: string): string {
  const { year, month, day } = parseISODate(dateStr);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return `${monthNames[month - 1]} ${day}, ${year}`;
}
