export type SymptomType =
  | "cramps"
  | "headache"
  | "bloating"
  | "fatigue"
  | "mood"
  | "back_pain"
  | "tenderness"
  | "other";

export type PeriodEntry = {
  id: string;
  startDate: string; // ISO date format: YYYY-MM-DD
  endDate?: string; // ISO date format: YYYY-MM-DD
  notes?: string;
  createdAt?: string;
};

export type SymptomEntry = {
  id: string;
  date: string; // ISO date format: YYYY-MM-DD
  symptoms: SymptomType[];
  notes?: string;
};

export type CycleSettings = {
  averageCycleLength: number; // 21 to 60 days, default 28
  typicalPeriodLength: number; // 1 to 14 days, default 5
};

export type CyclePrediction = {
  estimatedStartDate: string; // YYYY-MM-DD
  estimatedEndDate: string; // YYYY-MM-DD
  confidence: "low" | "medium" | "high";
  averageCycleDays: number;
  daysUntilNext: number;
};
