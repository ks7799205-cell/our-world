"use client";

import { useCallback, useMemo, useState } from "react";

import {
  calculateAverageCycle,
  calculateCurrentCycleDay,
  calculatePrediction,
  getTodayISODate,
} from "@/lib/cycle-calculator";
import type {
  CyclePrediction,
  CycleSettings,
  PeriodEntry,
  SymptomEntry,
  SymptomType,
} from "@/types/period";

const DEFAULT_SETTINGS: CycleSettings = {
  averageCycleLength: 28,
  typicalPeriodLength: 5,
};

export function usePeriodTracker() {
  const [periods, setPeriods] = useState<PeriodEntry[]>([]);
  const [symptomsMap, setSymptomsMap] = useState<Record<string, SymptomEntry>>({});
  const [settings, setSettings] = useState<CycleSettings>(DEFAULT_SETTINGS);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayISODate());

  // Sort periods by start date descending
  const sortedPeriods = useMemo(() => {
    return [...periods].sort((a, b) => b.startDate.localeCompare(a.startDate));
  }, [periods]);

  const latestPeriod = sortedPeriods[0] || null;

  // Compute prediction
  const prediction: CyclePrediction | null = useMemo(() => {
    return calculatePrediction(sortedPeriods, settings);
  }, [sortedPeriods, settings]);

  // Compute current cycle day
  const currentCycleDay = useMemo(() => {
    if (!latestPeriod) return null;
    return calculateCurrentCycleDay(latestPeriod.startDate);
  }, [latestPeriod]);

  // Compute average cycle length
  const calculatedAverageCycle = useMemo(() => {
    return calculateAverageCycle(sortedPeriods, settings.averageCycleLength);
  }, [sortedPeriods, settings.averageCycleLength]);

  // Log new period
  const logPeriod = useCallback((startDate: string, endDate?: string, notes?: string) => {
    const newEntry: PeriodEntry = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}`,
      startDate,
      endDate: endDate || undefined,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
    };

    setPeriods((prev) => [...prev, newEntry]);
  }, []);

  // Update existing period
  const updatePeriod = useCallback(
    (id: string, startDate: string, endDate?: string, notes?: string) => {
      setPeriods((prev) =>
        prev.map((entry) =>
          entry.id === id
            ? { ...entry, startDate, endDate: endDate || undefined, notes: notes || undefined }
            : entry
        )
      );
    },
    []
  );

  // Delete period
  const deletePeriod = useCallback((id: string) => {
    setPeriods((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  // Log/Update symptoms for a specific date
  const logSymptoms = useCallback((date: string, symptoms: SymptomType[], notes?: string) => {
    setSymptomsMap((prev) => {
      if (symptoms.length === 0 && !notes) {
        const next = { ...prev };
        delete next[date];
        return next;
      }
      return {
        ...prev,
        [date]: {
          id: prev[date]?.id || `s-${Date.now()}`,
          date,
          symptoms,
          notes: notes || undefined,
        },
      };
    });
  }, []);

  // Update cycle settings
  const updateSettings = useCallback((newSettings: Partial<CycleSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  }, []);

  const activeDateSymptoms = symptomsMap[selectedDate];

  return {
    periods: sortedPeriods,
    symptomsMap,
    settings,
    selectedDate,
    latestPeriod,
    prediction,
    currentCycleDay,
    calculatedAverageCycle,
    activeDateSymptoms,
    setSelectedDate,
    logPeriod,
    updatePeriod,
    deletePeriod,
    logSymptoms,
    updateSettings,
  };
}
