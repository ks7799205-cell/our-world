"use client";

import React from "react";
import { cn } from "@/lib/utils";

type FloatingHeartsProps = {
  className?: string;
  tone?: "twilight" | "warm";
  count?: "minimal" | "delicate";
};

// Deterministic particle set for opening and hero atmosphere
const twilightParticles = [
  { id: "s1", top: "12%", left: "15%", size: 3, opacity: 0.5, delay: 0, duration: 6, type: "star" },
  { id: "s2", top: "20%", left: "78%", size: 4, opacity: 0.6, delay: 1.2, duration: 7, type: "star" },
  { id: "s3", top: "35%", left: "88%", size: 2, opacity: 0.4, delay: 2.5, duration: 5, type: "star" },
  { id: "s4", top: "55%", left: "8%", size: 3, opacity: 0.45, delay: 0.8, duration: 8, type: "star" },
  { id: "s5", top: "72%", left: "82%", size: 4, opacity: 0.5, delay: 3, duration: 6.5, type: "star" },
  { id: "s6", top: "85%", left: "25%", size: 2, opacity: 0.35, delay: 1.8, duration: 7.2, type: "star" },
  { id: "h1", top: "28%", left: "84%", size: 14, opacity: 0.28, delay: 1, duration: 12, type: "heart" },
  { id: "h2", top: "68%", left: "12%", size: 12, opacity: 0.22, delay: 3.2, duration: 14, type: "heart" },
  { id: "h3", top: "82%", left: "72%", size: 15, opacity: 0.25, delay: 0.5, duration: 13, type: "heart" },
];

const warmParticles = [
  { id: "w1", top: "15%", left: "10%", size: 4, opacity: 0.25, delay: 0, duration: 8, type: "star" },
  { id: "w2", top: "25%", left: "85%", size: 5, opacity: 0.2, delay: 1.5, duration: 9, type: "star" },
  { id: "w3", top: "60%", left: "6%", size: 4, opacity: 0.18, delay: 2.2, duration: 10, type: "star" },
  { id: "w4", top: "78%", left: "90%", size: 3, opacity: 0.22, delay: 0.7, duration: 7, type: "star" },
  { id: "h1", top: "32%", left: "92%", size: 13, opacity: 0.15, delay: 1.2, duration: 15, type: "heart" },
  { id: "h2", top: "72%", left: "14%", size: 11, opacity: 0.12, delay: 3, duration: 16, type: "heart" },
];

export function FloatingHearts({
  className,
  tone = "twilight",
}: FloatingHeartsProps) {
  const particles = tone === "twilight" ? twilightParticles : warmParticles;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none motion-reduce:hidden",
        className
      )}
    >
      {particles.map((p) => {
        if (p.type === "heart") {
          return (
            <span
              key={p.id}
              className={cn(
                "absolute text-accent/35 animate-float select-none pointer-events-none",
                tone === "twilight" ? "text-rose-300/30" : "text-accent/25"
              )}
              style={{
                top: p.top,
                left: p.left,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="fill-current"
                style={{ width: `${p.size}px`, height: `${p.size}px` }}
                aria-hidden="true"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
          );
        }

        return (
          <span
            key={p.id}
            className="absolute rounded-full bg-accent/40 animate-twinkle"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
