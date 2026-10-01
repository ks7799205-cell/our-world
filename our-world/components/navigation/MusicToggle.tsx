"use client";

import { Music, Volume2, VolumeX } from "lucide-react";

import { useMusic } from "@/lib/music-context";
import { cn } from "@/lib/utils";

type MusicToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export function MusicToggle({ className, showLabel = false }: MusicToggleProps) {
  const { isPlaying, togglePlay, currentTrack } = useMusic();

  return (
    <button
      type="button"
      onClick={togglePlay}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-surface-warm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isPlaying && "border-accent/30 bg-rose/10 text-accent font-semibold",
        className
      )}
      aria-label={
        isPlaying
          ? `Pause background soundtrack (${currentTrack.title})`
          : `Play background soundtrack (${currentTrack.title})`
      }
      aria-pressed={isPlaying}
      title={isPlaying ? "Soundtrack playing (click to pause)" : "Click to play soundtrack"}
    >
      <div className="relative flex size-4 items-center justify-center">
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
            <span className="w-[2px] rounded-full bg-accent animate-[bounce_0.8s_ease-in-out_infinite]" style={{ animationDelay: "0ms", height: "60%" }} />
            <span className="w-[2px] rounded-full bg-accent animate-[bounce_0.8s_ease-in-out_infinite]" style={{ animationDelay: "200ms", height: "100%" }} />
            <span className="w-[2px] rounded-full bg-accent animate-[bounce_0.8s_ease-in-out_infinite]" style={{ animationDelay: "400ms", height: "40%" }} />
            <span className="w-[2px] rounded-full bg-accent animate-[bounce_0.8s_ease-in-out_infinite]" style={{ animationDelay: "150ms", height: "80%" }} />
          </div>
        ) : (
          <Music aria-hidden="true" className="size-3.5 transition-transform group-hover:scale-110" />
        )}
      </div>

      {showLabel ? (
        <span className="truncate max-w-[120px]">{isPlaying ? "Soundtrack On" : "Music"}</span>
      ) : (
        <span className="sr-only">{isPlaying ? "Music playing" : "Music paused"}</span>
      )}

      {/* Mini volume indicator */}
      <span className="text-muted/60 group-hover:text-accent/80" aria-hidden="true">
        {isPlaying ? (
          <Volume2 className="size-3" />
        ) : (
          <VolumeX className="size-3 opacity-60" />
        )}
      </span>
    </button>
  );
}
