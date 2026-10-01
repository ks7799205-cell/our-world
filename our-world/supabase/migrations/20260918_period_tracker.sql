-- ==============================================================================
-- Migration: 20260918_period_tracker.sql
-- Description: Schema and Row-Level Security (RLS) policies for Private Period Tracker
-- ==============================================================================

-- 1. Table: cycle_settings
-- Stores user-specific preferences for cycle calculations
CREATE TABLE IF NOT EXISTS cycle_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  average_cycle_length INTEGER NOT NULL DEFAULT 28 CHECK (average_cycle_length BETWEEN 21 AND 60),
  typical_period_length INTEGER NOT NULL DEFAULT 5 CHECK (typical_period_length BETWEEN 1 AND 14),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: period_logs
-- Stores logged period start and end dates for the authenticated user
CREATE TABLE IF NOT EXISTS period_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE CHECK (end_date IS NULL OR end_date >= start_date),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_period_logs_user_date ON period_logs(user_id, start_date DESC);

-- 3. Table: symptom_logs
-- Stores optional daily symptom tags and private notes
CREATE TABLE IF NOT EXISTS symptom_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  symptoms TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_user_symptom_date UNIQUE (user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_symptom_logs_user_date ON symptom_logs(user_id, date DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict isolation: Users can only access and manipulate their own records.
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE cycle_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE period_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_logs ENABLE ROW LEVEL SECURITY;

-- Policies for cycle_settings
CREATE POLICY "Users can view own cycle settings"
  ON cycle_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cycle settings"
  ON cycle_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cycle settings"
  ON cycle_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- Policies for period_logs
CREATE POLICY "Users can view own period logs"
  ON period_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own period logs"
  ON period_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own period logs"
  ON period_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own period logs"
  ON period_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for symptom_logs
CREATE POLICY "Users can view own symptom logs"
  ON symptom_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own symptom logs"
  ON symptom_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own symptom logs"
  ON symptom_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own symptom logs"
  ON symptom_logs FOR DELETE
  USING (auth.uid() = user_id);
