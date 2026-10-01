"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

type HeroImageProps = {
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
};

export function HeroImage({
  src,
  alt = "A couple enjoying the sunset together",
  caption,
  className,
}: HeroImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border/80 bg-surface-warm shadow-photo transition-transform duration-500",
        className
      )}
    >
      {/* Aspect Ratio Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          /* High-quality cinematic sunset couple illustration placeholder */
          <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#2e1320] via-[#5c2438] to-[#9b4956]">
            {/* Ambient Sun & Sky Glow */}
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(254, 215, 170, 0.8) 0%, rgba(244, 114, 182, 0.4) 50%, transparent 80%)",
              }}
            />

            {/* Distant mountains / city hills silhouette */}
            <svg
              className="absolute bottom-0 w-full text-[#240c18] opacity-80"
              viewBox="0 0 1000 320"
              fill="currentColor"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 320 L0 220 Q180 160 360 210 T720 180 T1000 230 L1000 320 Z" />
              <path
                d="M0 320 L0 260 Q240 210 480 250 T880 220 T1000 270 L1000 320 Z"
                className="text-[#190710]"
              />
            </svg>

            {/* Silhouette of couple together watching the view */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-none select-none">
              <svg
                viewBox="0 0 240 180"
                className="w-44 sm:w-52 text-[#13050c] drop-shadow-xl"
                fill="currentColor"
                aria-hidden="true"
              >
                {/* Couple silhouette */}
                {/* Left person */}
                <ellipse cx="98" cy="48" rx="14" ry="16" />
                <path d="M78 85 C78 62, 118 62, 118 85 L124 180 L72 180 Z" />
                {/* Right person leaning head in */}
                <ellipse cx="128" cy="44" rx="15" ry="17" />
                <path d="M108 82 C108 58, 148 58, 148 82 L158 180 L100 180 Z" />
                {/* Subtle embrace curve */}
                <path d="M84 95 Q113 110 144 95 Q144 140 84 140 Z" opacity="0.6" />
              </svg>
            </div>

            {/* Subtle floating dusk sparks */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute top-1/4 left-1/4 size-1 rounded-full bg-amber-200/60 animate-pulse" />
              <span className="absolute top-1/3 right-1/4 size-1.5 rounded-full bg-rose-200/50 animate-pulse" style={{ animationDelay: "1s" }} />
              <span className="absolute top-1/2 right-1/3 size-1 rounded-full bg-amber-100/70 animate-pulse" style={{ animationDelay: "2s" }} />
            </div>
          </div>
        )}

        {/* Soft gradient bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Caption badge */}
        {caption && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-cream backdrop-blur-md border border-white/10">
            {caption}
          </div>
        )}
      </div>
    </motion.div>
  );
}
