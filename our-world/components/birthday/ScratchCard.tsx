"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Eye, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { BirthdayData } from "@/types/birthday";
import { cardRevealVariants, cinematicTransition } from "@/lib/motion";

interface ScratchCardProps {
  scratchCard: BirthdayData["scratchCard"];
  onNext: () => void;
}

export function ScratchCard({ scratchCard, onNext }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratchedEnough, setIsScratchedEnough] = useState(false);

  // Initialize Canvas Overlay
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    if (width === 0 || height === 0) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Create elegant metallic silver/champagne gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#d8d3cd");
    gradient.addColorStop(0.3, "#e8e3dc");
    gradient.addColorStop(0.5, "#cfc8be");
    gradient.addColorStop(0.8, "#eae5dd");
    gradient.addColorStop(1, "#c5beaf");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle decorative shimmer pattern
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Text on scratch coating
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#6b6256";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ SCRATCH HERE TO REVEAL ✨", width / 2, height / 2);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  // Scratch action
  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed || isScratchedEnough) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.scale(1 / dpr, 1 / dpr);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x * dpr, y * dpr, 28 * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    checkScratchedPercentage();
  };

  // Check progress
  const checkScratchedPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sample pixels across canvas
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const totalSampled = data.length / 16; // sample every 4th pixel

      for (let i = 3; i < data.length; i += 16) {
        if (data[i] < 128) {
          transparentPixels++;
        }
      }

      const ratio = transparentPixels / totalSampled;
      if (ratio > 0.35 && !isScratchedEnough) {
        setIsScratchedEnough(true);
        setIsRevealed(true);
      }
    } catch {
      // If getImageData fails (e.g. security sandbox), ignore
    }
  };

  const handleRevealAll = () => {
    setIsRevealed(true);
    setIsScratchedEnough(true);
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      isDrawingRef.current = true;
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  return (
    <section
      aria-label="Interactive scratch card"
      className="relative mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-8 text-center select-none space-y-8"
    >

      {/* Header */}
      <motion.div
        variants={cardRevealVariants}
        initial="initial"
        animate="animate"
        transition={cinematicTransition}
        className="space-y-3 max-w-md mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
          <Sparkles className="size-3.5" />
          <span>Interactive Surprise</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
          {scratchCard.title}
        </h2>

        <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
          {scratchCard.subtitle}
        </p>
      </motion.div>

      {/* Scratch Card Outer Wrapper */}
      <motion.div
        variants={cardRevealVariants}
        initial="initial"
        animate="animate"
        transition={cinematicTransition}
        className="w-full"
      >
        <Card
          variant="warm"
          className="p-6 sm:p-8 shadow-2xl ring-1 ring-amber-400/30 space-y-6 text-center relative overflow-hidden"
        >
          {/* Card Container & Hidden Content */}
          <div
            ref={containerRef}
            className="relative w-full min-h-[220px] rounded-2xl bg-gradient-to-br from-slate-900/90 via-rose-950/40 to-slate-900/90 border border-amber-500/20 flex flex-col items-center justify-center p-6 overflow-hidden shadow-inner touch-none"
          >
            {/* Hidden Content (Revealed underneath) */}
            <div className="space-y-3 z-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                <span>{scratchCard.rewardTitle}</span>
              </div>

              <p className="font-serif text-lg sm:text-xl text-slate-100 font-semibold max-w-md leading-relaxed">
                {scratchCard.rewardMessage}
              </p>

              {scratchCard.rewardSubtext && (
                <p className="font-serif text-xs sm:text-sm text-rose-300/80 italic">
                  {scratchCard.rewardSubtext}
                </p>
              )}
            </div>

            {/* Canvas Scratch Overlay */}
            {!isRevealed && (
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                className="absolute inset-0 w-full h-full cursor-pointer z-10 rounded-2xl transition-opacity duration-500 touch-none"
                style={{
                  opacity: isScratchedEnough ? 0 : 1,
                  pointerEvents: isScratchedEnough ? "none" : "auto",
                }}
              />
            )}
          </div>

          {/* Accessible Fallback Button */}
          {!isRevealed && (
            <div className="pt-1">
              <button
                type="button"
                onClick={handleRevealAll}
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-rose-300 underline underline-offset-4 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                {scratchCard.revealLabel}
              </button>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Next Step Button */}
      <motion.div
        variants={cardRevealVariants}
        initial="initial"
        animate="animate"
        transition={cinematicTransition}
        className="pt-2"
      >
        <Button
          size="lg"
          variant="primary"
          onClick={onNext}
          className="group px-7 py-3 rounded-full text-base font-medium shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-all"
        >
          Next: Birthday Memories
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </section>
  );
}
