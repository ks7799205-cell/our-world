"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Lock } from "lucide-react";
import React, { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import {
  CycleHistory,
  CycleOverview,
  DeleteConfirmModal,
  LogPeriodModal,
  PeriodCalendar,
  PredictionCard,
  SymptomLogger,
  TrackerSettingsModal,
} from "@/components/period";
import { cinematicTransition } from "@/lib/motion";
import { usePeriodTracker } from "@/lib/use-period-tracker";
import type { PeriodEntry } from "@/types/period";

export default function PeriodTrackerPage() {
  const {
    periods,
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
  } = usePeriodTracker();

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<PeriodEntry | null>(null);
  const [deletingPeriod, setDeletingPeriod] = useState<PeriodEntry | null>(null);

  const reduceMotion = useReducedMotion();

  const handleOpenNewPeriod = () => {
    setEditingPeriod(null);
    setIsLogModalOpen(true);
  };

  const handleOpenEditPeriod = (period: PeriodEntry) => {
    setEditingPeriod(period);
    setIsLogModalOpen(true);
  };

  const handleSavePeriod = (startDate: string, endDate?: string, notes?: string) => {
    if (editingPeriod) {
      updatePeriod(editingPeriod.id, startDate, endDate, notes);
    } else {
      logPeriod(startDate, endDate, notes);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingPeriod) {
      deletePeriod(deletingPeriod.id);
      setDeletingPeriod(null);
    }
  };

  return (
    <PageContainer size="md" className="py-6 space-y-8 select-none">
      {/* Page Header */}
      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={cinematicTransition}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-4 py-1.5 shadow-soft backdrop-blur-sm">
          <Lock aria-hidden="true" className="size-3.5 text-accent" />
          <span className="font-serif italic text-xs tracking-wider text-muted">
            Private & Personal Space
          </span>
          <Heart aria-hidden="true" className="size-3 text-accent fill-accent/20" />
        </div>

        <div className="space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
            CYCLE & WELLNESS
          </h1>
          <p className="font-serif italic text-sm sm:text-base text-muted max-w-md mx-auto leading-relaxed">
            A quiet, respectful place to log cycles, check predictions, and track your daily wellness.
          </p>
        </div>
      </motion.header>

      {/* Cycle Overview Metrics */}
      <section aria-label="Cycle overview metrics">
        <CycleOverview
          currentCycleDay={currentCycleDay}
          latestPeriod={latestPeriod}
          settings={settings}
          averageCycleLength={calculatedAverageCycle}
          onOpenLogPeriod={handleOpenNewPeriod}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
        />
      </section>

      {/* Estimated Next Period Card */}
      <section aria-label="Next period prediction">
        <PredictionCard
          prediction={prediction}
          hasPeriods={periods.length > 0}
        />
      </section>

      {/* Monthly Interactive Calendar */}
      <section aria-label="Monthly cycle calendar">
        <PeriodCalendar
          periods={periods}
          symptomsMap={symptomsMap}
          settings={settings}
          prediction={prediction}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </section>

      {/* Daily Symptoms & Notes Logger */}
      <section aria-label="Daily symptoms tracker">
        <SymptomLogger
          selectedDate={selectedDate}
          loggedSymptoms={activeDateSymptoms}
          onSaveSymptoms={logSymptoms}
        />
      </section>

      {/* Previous Logged Cycles History */}
      <section aria-label="Past cycle history">
        <CycleHistory
          periods={periods}
          onEditPeriod={handleOpenEditPeriod}
          onDeletePeriod={(period) => setDeletingPeriod(period)}
        />
      </section>

      {/* Modals */}
      <LogPeriodModal
        isOpen={isLogModalOpen}
        editingPeriod={editingPeriod}
        onClose={() => {
          setIsLogModalOpen(false);
          setEditingPeriod(null);
        }}
        onSave={handleSavePeriod}
      />

      <TrackerSettingsModal
        isOpen={isSettingsModalOpen}
        settings={settings}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={updateSettings}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingPeriod)}
        period={deletingPeriod}
        onClose={() => setDeletingPeriod(null)}
        onConfirm={handleConfirmDelete}
      />
    </PageContainer>
  );
}
