"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { soundtrackData } from "@/data/playlist";
import type { Track } from "@/types/music";

export type MusicContextValue = {
  isPlaying: boolean;
  isMuted: boolean;
  hasInteracted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  currentTrack: Track;
  playlist: Track[];
  audioError: string | null;
  togglePlay: () => void;
  playMusic: () => void;
  pauseMusic: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  seek: (seconds: number) => void;
  selectTrack: (track: Track) => void;
  playTrack: (track: Track) => void;
  nextTrack: () => void;
  prevTrack: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [playlist] = useState<Track[]>(soundtrackData);
  const [currentTrack, setCurrentTrack] = useState<Track>(() => {
    return soundtrackData.find((t) => t.featured) || soundtrackData[0];
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTrack.durationSeconds || 0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Derived audio error
  const audioError = useMemo(() => {
    if (!currentTrack.audioSrc) {
      return "Audio not added yet";
    }
    return runtimeError;
  }, [currentTrack.audioSrc, runtimeError]);

  // Initialize Audio Element once
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audio.muted = isMuted;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      // Auto-advance to next track on natural finish
      setHasInteracted(true);
      setCurrentTrack((prevTrack) => {
        const currentIndex = soundtrackData.findIndex((t) => t.id === prevTrack.id);
        const nextIndex = (currentIndex + 1) % soundtrackData.length;
        return soundtrackData[nextIndex];
      });
    };

    const handleError = () => {
      if (audio.src && audio.src !== window.location.href) {
        setRuntimeError("Audio file not available");
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadedmetadata", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, [isMuted, volume]);

  // Synchronize audio source when currentTrack changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack.audioSrc) {
      audio.src = currentTrack.audioSrc;
      audio.load();
      if (isPlaying) {
        audio.play().catch(() => {
          setRuntimeError("Audio file not available");
        });
      }
    } else {
      audio.removeAttribute("src");
      audio.load();
    }
  }, [currentTrack, isPlaying]);

  const playMusic = useCallback(() => {
    setHasInteracted(true);
    setIsPlaying(true);
    setRuntimeError(null);
    const audio = audioRef.current;
    if (audio && currentTrack.audioSrc) {
      audio.play().catch(() => {
        setRuntimeError("Audio file not available");
      });
    }
  }, [currentTrack.audioSrc]);

  const pauseMusic = useCallback(() => {
    setIsPlaying(false);
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    setHasInteracted(true);
    setIsPlaying((prev) => {
      const next = !prev;
      const audio = audioRef.current;
      if (next) {
        setRuntimeError(null);
        if (audio && currentTrack.audioSrc) {
          audio.play().catch(() => {
            setRuntimeError("Audio file not available");
          });
        }
      } else {
        audio?.pause();
      }
      return next;
    });
  }, [currentTrack.audioSrc]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
  }, [isMuted]);

  const seek = useCallback((seconds: number) => {
    setCurrentTime(seconds);
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
    }
  }, []);

  const selectTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setRuntimeError(null);
  }, []);

  const playTrack = useCallback((track: Track) => {
    setHasInteracted(true);
    setCurrentTrack(track);
    setIsPlaying(true);
    setRuntimeError(null);
  }, []);

  const nextTrack = useCallback(() => {
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentTrack(playlist[nextIndex]);
    setRuntimeError(null);
  }, [playlist, currentTrack.id]);

  const prevTrack = useCallback(() => {
    if (currentTime > 3) {
      seek(0);
      return;
    }
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrack(playlist[prevIndex]);
    setRuntimeError(null);
  }, [currentTime, playlist, currentTrack.id, seek]);

  const value = useMemo(
    () => ({
      isPlaying,
      isMuted,
      hasInteracted,
      volume,
      currentTime,
      duration,
      currentTrack,
      playlist,
      audioError,
      togglePlay,
      playMusic,
      pauseMusic,
      toggleMute,
      setVolume,
      seek,
      selectTrack,
      playTrack,
      nextTrack,
      prevTrack,
    }),
    [
      isPlaying,
      isMuted,
      hasInteracted,
      volume,
      currentTime,
      duration,
      currentTrack,
      playlist,
      audioError,
      togglePlay,
      playMusic,
      pauseMusic,
      toggleMute,
      setVolume,
      seek,
      selectTrack,
      playTrack,
      nextTrack,
      prevTrack,
    ]
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic(): MusicContextValue {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
