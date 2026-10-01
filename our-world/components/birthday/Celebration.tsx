"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, PartyPopper } from "lucide-react";

interface CelebrationProps {
  autoStart?: boolean;
  durationMs?: number;
}

// Color palettes for fireworks & party poppers
const FIREWORK_COLORS = [
  "#f43f5e", // Rose
  "#fbbf24", // Gold
  "#38bdf8", // Sky Blue
  "#c084fc", // Purple
  "#f472b6", // Pink
  "#34d399", // Emerald
  "#fb923c", // Orange
  "#ffffff", // White Spark
];

const POPPER_COLORS = [
  "#e11d48", // Red
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#fde047", // Yellow
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
  decay: number;
  gravity: number;
  friction: number;
  type: "spark" | "confetti" | "ribbon" | "star" | "flash";
  rotation?: number;
  rotationSpeed?: number;
  length?: number;
};

type Rocket = {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  trail: { x: number; y: number }[];
};

type PopText = {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
};

export function Celebration({ autoStart = true, durationMs = 12000 }: CelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [popTexts, setPopTexts] = useState<PopText[]>([]);
  const [poppingLeft, setPoppingLeft] = useState(false);
  const [poppingRight, setPoppingRight] = useState(false);
  const [visible] = useState(true);

  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const addPopText = useCallback((text: string, x: number, y: number, color: string = "#fbbf24") => {
    const id = Date.now() + Math.random();
    setPopTexts((prev) => [...prev.slice(-4), { id, text, x, y, color }]);
    setTimeout(() => {
      setPopTexts((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  }, []);

  // Launch Firecracker Rocket
  const launchRocket = useCallback((startX?: number, targetYRatio = 0.35) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const x = startX !== undefined ? startX : Math.random() * (canvas.width * 0.7) + canvas.width * 0.15;
    const targetY = canvas.height * (targetYRatio + Math.random() * 0.25);
    const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

    rocketsRef.current.push({
      x,
      y: canvas.height,
      targetY,
      vy: -(Math.random() * 4 + 13),
      color,
      trail: [],
    });
  }, []);

  // Explode Firecracker Burst
  const explodeBurst = useCallback((x: number, y: number, color: string) => {
    const particleCount = 70 + Math.floor(Math.random() * 30);
    const baseColor = color;

    // Flash particle at center
    particlesRef.current.push({
      x,
      y,
      vx: 0,
      vy: 0,
      color: "#ffffff",
      alpha: 1,
      size: 28,
      decay: 0.08,
      gravity: 0,
      friction: 1,
      type: "flash",
    });

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 8 + 3;
      const pColor = Math.random() > 0.3 ? baseColor : FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: pColor,
        alpha: 1,
        size: Math.random() * 3 + 2,
        decay: Math.random() * 0.015 + 0.012,
        gravity: 0.06,
        friction: 0.96,
        type: "spark",
      });
    }
  }, []);

  // Blast Party Popper Confetti & Streamers
  const blastPartyPopper = useCallback((side: "left" | "right" | "both") => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const triggerSide = (isLeft: boolean) => {
      if (isLeft) setPoppingLeft(true);
      else setPoppingRight(true);

      setTimeout(() => {
        if (isLeft) setPoppingLeft(false);
        else setPoppingRight(false);
      }, 400);

      const startX = isLeft ? canvas.width * 0.08 : canvas.width * 0.92;
      const startY = canvas.height * 0.88;
      const baseAngle = isLeft ? -Math.PI / 4 - 0.2 : (-3 * Math.PI) / 4 + 0.2;

      addPopText("POP! 🎉", isLeft ? 120 : canvas.width - 160, canvas.height - 180, "#f43f5e");

      // Spawn confetti & ribbon particles
      for (let i = 0; i < 90; i++) {
        const spread = (Math.random() - 0.5) * 0.7;
        const angle = baseAngle + spread;
        const speed = Math.random() * 16 + 10;
        const color = POPPER_COLORS[Math.floor(Math.random() * POPPER_COLORS.length)];
        const isRibbon = Math.random() > 0.6;
        const isStar = !isRibbon && Math.random() > 0.5;

        particlesRef.current.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          size: isRibbon ? Math.random() * 4 + 3 : Math.random() * 6 + 4,
          length: isRibbon ? Math.random() * 18 + 12 : undefined,
          decay: Math.random() * 0.008 + 0.005,
          gravity: 0.15,
          friction: 0.97,
          type: isRibbon ? "ribbon" : isStar ? "star" : "confetti",
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    if (side === "left" || side === "both") triggerSide(true);
    if (side === "right" || side === "both") triggerSide(false);
  }, [addPopText]);

  // Garland Firecracker Ladi Chain Blast
  const triggerFirecrackerChain = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const startX = canvas.width * 0.5;
    const startY = canvas.height * 0.15;

    addPopText("BOOM! 🎆", startX - 50, startY + 60, "#fbbf24");

    for (let step = 0; step < 8; step++) {
      setTimeout(() => {
        const x = startX + (Math.random() - 0.5) * 120;
        const y = startY + step * 25;
        const color = Math.random() > 0.5 ? "#fbbf24" : "#f43f5e";
        explodeBurst(x, y, color);
      }, step * 140);
    }
  }, [addPopText, explodeBurst]);

  // Main Canvas Render Loop
  useEffect(() => {
    if (!autoStart) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial Celebration Launch Sequence
    const timer1 = setTimeout(() => blastPartyPopper("both"), 150);
    const timer2 = setTimeout(() => launchRocket(canvas.width * 0.25, 0.3), 500);
    const timer3 = setTimeout(() => launchRocket(canvas.width * 0.75, 0.25), 900);
    const timer4 = setTimeout(() => triggerFirecrackerChain(), 1300);
    const timer5 = setTimeout(() => launchRocket(canvas.width * 0.5, 0.2), 2000);
    const timer6 = setTimeout(() => blastPartyPopper("both"), 2800);
    const timer7 = setTimeout(() => launchRocket(canvas.width * 0.35, 0.3), 3800);

    let lastTime = performance.now();

    const animate = (time: number) => {
      Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const rocket = rocketsRef.current[i];
        rocket.y += rocket.vy;
        rocket.trail.push({ x: rocket.x, y: rocket.y });
        if (rocket.trail.length > 10) rocket.trail.shift();

        // Draw trail
        ctx.beginPath();
        ctx.strokeStyle = rocket.color;
        ctx.lineWidth = 3;
        for (let j = 0; j < rocket.trail.length - 1; j++) {
          const p1 = rocket.trail[j];
          const p2 = rocket.trail[j + 1];
          ctx.globalAlpha = j / rocket.trail.length;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();

        // Draw rocket head spark
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Explosion condition
        if (rocket.y <= rocket.targetY) {
          explodeBurst(rocket.x, rocket.y, rocket.color);
          rocketsRef.current.splice(i, 1);
        }
      }

      // Render Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
          p.rotation += p.rotationSpeed;
        }

        if (p.alpha <= 0 || p.y > canvas.height + 50) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.type === "flash") {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "spark") {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "confetti") {
          ctx.translate(p.x, p.y);
          if (p.rotation) ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        } else if (p.type === "ribbon") {
          ctx.translate(p.x, p.y);
          if (p.rotation) ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          const len = p.length || 15;
          ctx.fillRect(-p.size / 2, -len / 2, p.size, len);
        } else if (p.type === "star") {
          ctx.translate(p.x, p.y);
          if (p.rotation) ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          for (let k = 0; k < 5; k++) {
            ctx.lineTo(Math.cos(((18 + k * 72) * Math.PI) / 180) * p.size, -Math.sin(((18 + k * 72) * Math.PI) / 180) * p.size);
            ctx.lineTo(Math.cos(((54 + k * 72) * Math.PI) / 180) * (p.size / 2), -Math.sin(((54 + k * 72) * Math.PI) / 180) * (p.size / 2));
          }
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const autoCleanup = setTimeout(() => {}, durationMs);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
      clearTimeout(autoCleanup);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoStart, blastPartyPopper, durationMs, explodeBurst, launchRocket, triggerFirecrackerChain]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Fullscreen Canvas overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Pop Text Banners */}
      <AnimatePresence>
        {popTexts.map((pop) => (
          <motion.div
            key={pop.id}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1.3, y: -30 }}
            exit={{ opacity: 0, scale: 1.6, y: -60 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ left: pop.x, top: pop.y, color: pop.color }}
            className="absolute font-serif font-bold text-2xl sm:text-3xl tracking-widest drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] pointer-events-none"
          >
            {pop.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Visual Party Popper Cannon - Bottom Left */}
      <motion.div
        animate={poppingLeft ? { rotate: [-45, -60, -35, -45], scale: [1, 1.3, 1] } : { rotate: -45 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-16 h-16 pointer-events-none flex items-center justify-center text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]"
      >
        <PartyPopper className="w-12 h-12" />
      </motion.div>

      {/* Visual Party Popper Cannon - Bottom Right */}
      <motion.div
        animate={poppingRight ? { rotate: [45, 60, 35, 45], scale: [1, 1.3, 1] } : { rotate: 45 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-16 h-16 pointer-events-none flex items-center justify-center text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]"
      >
        <PartyPopper className="w-12 h-12 transform scale-x-[-1]" />
      </motion.div>

      {/* Interactive Trigger Bar for Extra Fun */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-rose-500/30 shadow-2xl z-50">
        <button
          type="button"
          onClick={() => launchRocket()}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-amber-300 hover:text-amber-100 hover:bg-amber-500/20 border border-amber-500/30 transition-all active:scale-95"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Firecrackers 🎆</span>
        </button>

        <button
          type="button"
          onClick={() => blastPartyPopper("both")}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 border border-rose-500/30 transition-all active:scale-95"
        >
          <PartyPopper className="w-3.5 h-3.5 text-rose-400" />
          <span>Party Poppers 🎉</span>
        </button>
      </div>
    </div>
  );
}
