"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Heart, Pause, Play, SkipBack, SkipForward, Sparkles } from "lucide-react";
import React from "react";

import { ProgressBar } from "@/components/music/ProgressBar";
import { VinylPlayer } from "@/components/music/VinylPlayer";
import { VolumeControl } from "@/components/music/VolumeControl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cardRevealVariants, softTransition } from "@/lib/motion";
import { useMusic } from "@/lib/music-context";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    audioError,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
  } = useMusic();

  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : cardRevealVariants}
      initial={reduceMotion ? undefined : "initial"}
      animate={reduceMotion ? undefined : "animate"}
      transition={softTransition}
      className="mx-auto w-full max-w-xl px-2"
    >
      <Card
        variant="surface"
        className="p-6 sm:p-8 shadow-photo ring-1 ring-accent/20 space-y-6"
      >
        {/* Top Vinyl Turntable Display */}
        <VinylPlayer track={currentTrack} isPlaying={isPlaying} />

        {/* Track Title & Artist Info */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="rounded-full border border-border/60 bg-surface-warm px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
              {currentTrack.category}
            </span>
            {currentTrack.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-300/60 bg-rose/15 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                <Sparkles className="size-2.5" />
                <span>Our Song</span>
              </span>
            )}
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            {currentTrack.title}
          </h2>

          {currentTrack.artist && (
            <p className="font-sans text-sm text-muted">
              {currentTrack.artist}
            </p>
          )}

          {/* Audio Missing Notice or Status */}
          {audioError ? (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs text-amber-700">
              <AlertCircle className="size-3.5 shrink-0" />
              <span>{audioError} (add audio to public/audio/ to play)</span>
            </div>
          ) : (
            <p className="text-xs text-muted/70 font-serif italic">
              {isPlaying ? "♪ Playing on record..." : "Paused"}
            </p>
          )}
        </div>

        {/* Progress Bar & Seek Slider */}
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={seek}
          className="pt-2"
        />

        {/* Playback Controls Toolbar */}
        <div className="flex items-center justify-between pt-2">
          {/* Heart / Favorite Indicator */}
          <div className="grid size-9 place-items-center rounded-full border border-border/80 bg-surface-warm text-accent">
            <Heart className={cn("size-4", currentTrack.featured && "fill-accent")} />
          </div>

          {/* Center Playback Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              type="button"
              variant="quiet"
              size="icon"
              onClick={prevTrack}
              aria-label="Previous track"
              className="size-10 rounded-full border border-border/60 hover:bg-surface-warm"
            >
              <SkipBack className="size-4" />
            </Button>

            <Button
              type="button"
              variant="primary"
              size="icon"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="size-14 rounded-full shadow-lifted bg-accent hover:bg-burgundy-deep text-cream transition-transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="size-6 fill-cream" />
              ) : (
                <Play className="size-6 fill-cream ml-0.5" />
              )}
            </Button>

            <Button
              type="button"
              variant="quiet"
              size="icon"
              onClick={nextTrack}
              aria-label="Next track"
              className="size-10 rounded-full border border-border/60 hover:bg-surface-warm"
            >
              <SkipForward className="size-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={setVolume}
            onToggleMute={toggleMute}
          />
        </div>

        {/* Memory Connection Box */}
        {currentTrack.reason && (
          <div className="rounded-xl border border-border/60 bg-surface-warm/80 p-4 font-serif italic text-xs sm:text-sm text-foreground/85 text-center leading-relaxed">
            &ldquo;{currentTrack.reason}&rdquo;
          </div>
        )}
      </Card>
    </motion.div>
  );
}
