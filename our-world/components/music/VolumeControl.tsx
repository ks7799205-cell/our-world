"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import React from "react";

type VolumeControlProps = {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  className?: string;
};

export function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  className,
}: VolumeControlProps) {
  const currentLevel = isMuted ? 0 : volume;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={onToggleMute}
        className="grid size-8 place-items-center rounded-full border border-border/80 bg-surface/90 text-muted hover:bg-surface hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted || currentLevel === 0 ? (
          <VolumeX className="size-4" />
        ) : currentLevel < 0.5 ? (
          <Volume1 className="size-4" />
        ) : (
          <Volume2 className="size-4" />
        )}
      </button>

      <div className="relative flex items-center w-20 sm:w-24 h-4">
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={currentLevel}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full bg-border accent-accent cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          aria-label="Adjust volume"
        />
      </div>
    </div>
  );
}
