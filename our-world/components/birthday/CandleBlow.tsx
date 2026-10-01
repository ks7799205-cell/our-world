"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Wind, Mic, MicOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CandleBlowProps {
  isBlown: boolean;
  onBlow: () => void;
}

export function CandleBlow({ isBlown, onBlow }: CandleBlowProps) {
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const cleanupStream = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }, []);

  const stopMic = useCallback(() => {
    cleanupStream();
    setMicActive(false);
  }, [cleanupStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupStream();
    };
  }, [cleanupStream]);

  const handleStartMic = async () => {
    if (micActive) {
      stopMic();
      return;
    }

    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      setMicActive(true);

      const checkVolume = () => {
        if (!streamRef.current) return;
        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;

        // Blow detection threshold
        if (average > 55) {
          onBlow();
          stopMic();
          return;
        }

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      animFrameRef.current = requestAnimationFrame(checkVolume);
    } catch {
      setMicError("Microphone permission denied or unavailable. Use the button below!");
      stopMic();
    }
  };

  if (isBlown) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center gap-2 text-rose-300 font-serif text-sm sm:text-base pt-2"
      >
        <CheckCircle2 className="w-5 h-5 text-rose-400" />
        <span>Candle blown out! Your wish is on its way ✨</span>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4 pt-2">
      {/* Primary Click to Blow Button */}
      <Button
        size="lg"
        variant="primary"
        onClick={onBlow}
        className="group px-7 py-3 rounded-full text-base font-medium shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30 hover:scale-[1.02] transition-all"
      >
        <Wind className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
        Blow out the candle 🌬️
      </Button>

      {/* Optional Microphone Toggle */}
      <div className="flex flex-col items-center space-y-1">
        <button
          type="button"
          onClick={handleStartMic}
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-rose-300 transition-colors py-1 px-3 rounded-full border border-border/40 hover:border-rose-400/40 bg-surface/50"
        >
          {micActive ? (
            <>
              <MicOff className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Listening for your blow... (click to cancel)</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5" />
              <span>Or blow into microphone 🎤</span>
            </>
          )}
        </button>

        {micError && (
          <p className="text-[11px] text-amber-300/90 font-sans max-w-xs text-center">
            {micError}
          </p>
        )}
      </div>
    </div>
  );
}
