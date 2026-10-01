"use client";

import { useEffect, useState } from "react";

export type RelationshipDuration = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  isFuture: boolean;
  isValid: boolean;
};

function calculateDuration(startDateStr: string): RelationshipDuration {
  const start = new Date(startDateStr);
  const now = new Date();

  if (isNaN(start.getTime())) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      isFuture: false,
      isValid: false,
    };
  }

  const isFuture = now.getTime() < start.getTime();
  const from = isFuture ? now : start;
  const to = isFuture ? start : now;

  // Accurate calendar step calculation
  let temp = new Date(from.getTime());
  let years = 0;
  let months = 0;
  let days = 0;

  // 1. Advance years
  while (true) {
    const nextYear = new Date(temp.getTime());
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    if (nextYear.getTime() <= to.getTime()) {
      temp = nextYear;
      years++;
    } else {
      break;
    }
  }

  // 2. Advance months
  while (true) {
    const nextMonth = new Date(temp.getTime());
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    if (nextMonth.getTime() <= to.getTime()) {
      temp = nextMonth;
      months++;
    } else {
      break;
    }
  }

  // 3. Advance days
  while (true) {
    const nextDay = new Date(temp.getTime());
    nextDay.setDate(nextDay.getDate() + 1);
    if (nextDay.getTime() <= to.getTime()) {
      temp = nextDay;
      days++;
    } else {
      break;
    }
  }

  // Remaining milliseconds for hours, minutes, seconds
  const remainingMs = to.getTime() - temp.getTime();
  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

  // Total aggregate metrics
  const totalMs = to.getTime() - from.getTime();
  const totalSeconds = Math.floor(totalMs / 1000);
  const totalMinutes = Math.floor(totalMs / (1000 * 60));
  const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    isFuture,
    isValid: true,
  };
}

export function useRelationshipCounter(startDateStr: string): RelationshipDuration {
  const [duration, setDuration] = useState<RelationshipDuration>(() =>
    calculateDuration(startDateStr)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(calculateDuration(startDateStr));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateStr]);

  return duration;
}
