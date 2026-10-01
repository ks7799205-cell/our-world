"use client";

import React from "react";


type ProgressBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  className?: string;
};

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function ProgressBar({
  currentTime,
  duration,
  onSeek,
  className,
}: ProgressBarProps) {
  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={className}>
      <div className="flex items-center justify-between text-xs font-serif text-muted mb-1.5 select-none">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="group relative flex items-center h-4 cursor-pointer">
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.5}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 z-10 cursor-pointer focus-visible:outline-none"
          aria-label="Seek audio playback position"
        />

        {/* Track Background */}
        <div className="relative w-full h-1.5 rounded-full bg-border/80 overflow-hidden group-hover:h-2 transition-all">
          {/* Progress Fill */}
          <div
            className="h-full rounded-full bg-accent transition-all duration-100"
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
          />
        </div>

        {/* Thumb Knob */}
        <div
          className="absolute size-3 rounded-full bg-accent border-2 border-surface shadow-soft opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -translate-x-1/2"
          style={{ left: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}
