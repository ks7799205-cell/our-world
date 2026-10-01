"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  formatDisplayDate,
  formatISODate,
  getDaysInMonth,
  getTodayISODate,
  isDateInRange,
  isPeriodDay,
  parseISODate,
} from "@/lib/cycle-calculator";
import { cn } from "@/lib/utils";
import type { CyclePrediction, CycleSettings, PeriodEntry, SymptomEntry } from "@/types/period";

type PeriodCalendarProps = {
  periods: PeriodEntry[];
  symptomsMap: Record<string, SymptomEntry>;
  settings: CycleSettings;
  prediction: CyclePrediction | null;
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function PeriodCalendar({
  periods,
  symptomsMap,
  settings,
  prediction,
  selectedDate,
  onSelectDate,
}: PeriodCalendarProps) {
  const todayISO = getTodayISODate();
  const parsedToday = parseISODate(todayISO);

  const [currentYear, setCurrentYear] = useState(parsedToday.year);
  const [currentMonth, setCurrentMonth] = useState(parsedToday.month);


  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleJumpToday = () => {
    setCurrentYear(parsedToday.year);
    setCurrentMonth(parsedToday.month);
    onSelectDate(todayISO);
  };

  // Calendar math
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <Card variant="surface" className="p-5 sm:p-6 shadow-soft space-y-5 select-none">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
            {monthNames[currentMonth - 1]} {currentYear}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="quiet"
            size="sm"
            onClick={handleJumpToday}
            className="text-xs px-2.5"
          >
            Today
          </Button>

          <Button
            type="button"
            variant="quiet"
            size="icon"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="size-8"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            type="button"
            variant="quiet"
            size="icon"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="size-8"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-muted/70">
        {weekDays.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-10 sm:h-12" />;
          }

          const dayISO = formatISODate(currentYear, currentMonth, day);
          const isSelected = selectedDate === dayISO;
          const isToday = todayISO === dayISO;
          const isPeriod = isPeriodDay(dayISO, periods, settings.typicalPeriodLength);
          const isPredicted =
            prediction &&
            isDateInRange(dayISO, prediction.estimatedStartDate, prediction.estimatedEndDate);
          const hasSymptoms = symptomsMap[dayISO] && symptomsMap[dayISO].symptoms.length > 0;

          // Accessible screen reader label
          const statusLabels: string[] = [];
          if (isToday) statusLabels.push("Today");
          if (isPeriod) statusLabels.push("Logged period");
          if (isPredicted) statusLabels.push("Predicted period");
          if (hasSymptoms) statusLabels.push("Logged symptoms");
          const accessibleLabel = `${formatDisplayDate(dayISO)}${
            statusLabels.length > 0 ? `, ${statusLabels.join(", ")}` : ""
          }`;

          return (
            <button
              key={dayISO}
              type="button"
              onClick={() => onSelectDate(dayISO)}
              aria-label={accessibleLabel}
              aria-pressed={isSelected}
              className={cn(
                "relative flex h-10 sm:h-12 flex-col items-center justify-center rounded-xl border text-xs sm:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer",
                isPeriod
                  ? "border-rose-400 bg-rose-500/20 text-rose-950 font-semibold ring-1 ring-rose-400/50"
                  : isPredicted
                  ? "border-dashed border-rose-300 bg-rose-50/50 text-rose-900"
                  : "border-transparent bg-surface hover:bg-surface-warm text-foreground",
                isSelected && "ring-2 ring-accent border-accent font-bold",
                isToday && !isPeriod && "border-accent/40 bg-accent/5 font-semibold"
              )}
            >
              <span>{day}</span>

              {/* Badges / Dots container */}
              <div className="absolute bottom-1 flex items-center justify-center gap-0.5">
                {isToday && !isPeriod && (
                  <span className="size-1 rounded-full bg-accent" />
                )}
                {hasSymptoms && (
                  <span className="size-1 rounded-full bg-amber-500" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Calendar Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-border/50 text-[11px] text-muted">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-md bg-rose-500/25 border border-rose-400" />
          <span>Logged Period</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-md bg-rose-50 border border-dashed border-rose-300" />
          <span>Estimated Window</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-accent" />
          <span>Today</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-amber-500" />
          <span>Symptoms</span>
        </div>
      </div>
    </Card>
  );
}
