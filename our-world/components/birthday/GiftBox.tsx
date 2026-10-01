"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { BirthdayGift } from "@/types/birthday";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Gift,
  Music,
  Heart,
  Sparkles,
  Camera,
  KeyRound,
  X,
  Star,
  CheckCircle2,
  Video,
  Upload,
  Maximize2,
} from "lucide-react";

type FullscreenVideoElement = HTMLVideoElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  webkitEnterFullscreen?: () => void;
};

interface GiftBoxProps {
  gift: BirthdayGift;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const colorStyles = {
  rose: {
    boxBg: "from-rose-500/20 via-pink-600/20 to-rose-700/20",
    boxBorder: "border-rose-400/40",
    ribbonBg: "bg-rose-400",
    glow: "shadow-rose-500/20",
    tagBg: "bg-rose-950/20 text-rose-950 border-rose-500/40 font-semibold",
  },
  gold: {
    boxBg: "from-amber-500/20 via-yellow-600/20 to-amber-700/20",
    boxBorder: "border-amber-400/40",
    ribbonBg: "bg-amber-400",
    glow: "shadow-amber-500/20",
    tagBg: "bg-amber-950/20 text-amber-950 border-amber-500/40 font-semibold",
  },
  burgundy: {
    boxBg: "from-red-900/30 via-rose-950/30 to-red-900/20",
    boxBorder: "border-rose-500/30",
    ribbonBg: "bg-rose-300",
    glow: "shadow-rose-950/30",
    tagBg: "bg-rose-950/20 text-rose-950 border-rose-500/40 font-semibold",
  },
  champagne: {
    boxBg: "from-amber-200/20 via-orange-100/15 to-amber-300/20",
    boxBorder: "border-amber-300/40",
    ribbonBg: "bg-amber-200",
    glow: "shadow-amber-300/20",
    tagBg: "bg-amber-950/20 text-amber-950 border-amber-400/40 font-semibold",
  },
};

export function GiftBox({ gift, isOpen, onOpen, onClose }: GiftBoxProps) {
  const theme = colorStyles[gift.boxColor || "rose"];
  const [miniGameWon, setMiniGameWon] = useState(false);
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null);
  const giftFileInputRef = useRef<HTMLInputElement>(null);
  const giftVideoRef = useRef<HTMLVideoElement>(null);

  const handleGiftFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalVideoUrl(url);
    }
  };

  const handleGiftFullscreen = () => {
    if (giftVideoRef.current) {
      const elem = giftVideoRef.current as FullscreenVideoElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.webkitEnterFullscreen) {
        elem.webkitEnterFullscreen();
      }
    }
  };

  const activeVideoUrl = localVideoUrl || gift.videoUrl;

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Wrapped Gift Box State */
          <motion.div
            key="closed-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={onOpen}
            className={`w-full cursor-pointer rounded-2xl border ${theme.boxBorder} bg-gradient-to-br ${theme.boxBg} backdrop-blur-sm p-6 text-center shadow-lg ${theme.glow} transition-all duration-300 relative overflow-hidden group`}
          >
            {/* Box Ribbon Cross Lines */}
            <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 ${theme.ribbonBg} opacity-60 pointer-events-none`} />
            <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-3 ${theme.ribbonBg} opacity-60 pointer-events-none`} />

            {/* Lid & Bow Visual */}
            <div className="relative z-10 flex flex-col items-center space-y-3 py-2">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-7 h-7 text-[#FF7D9C] group-hover:rotate-12 transition-transform duration-300" />
                </div>
                {/* Ribbon Bow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className={`w-3 h-3 rounded-full border-2 border-rose-300 bg-rose-400/80`} />
                  <div className={`w-3 h-3 rounded-full border-2 border-rose-300 bg-rose-400/80`} />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-slate-900 drop-shadow-xs">
                  {gift.title}
                </h3>
                {gift.description && (
                  <p className="text-xs text-slate-800 font-sans font-medium">
                    {gift.description}
                  </p>
                )}
              </div>

              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${theme.tagBg}`}>
                <Sparkles className="w-3 h-3" />
                Tap to Open
              </span>
            </div>
          </motion.div>
        ) : (
          /* Opened Gift Box Content Modal / Card */
          <motion.div
            key="opened-box"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full"
          >
            <Card
              variant="warm"
              className={`p-6 sm:p-8 shadow-2xl ring-1 ring-rose-400/30 space-y-5 text-left relative overflow-hidden`}
            >
              {/* Top Bar with Close Button */}
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div className="inline-flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                    {gift.type === "song" && <Music className="w-4 h-4" />}
                    {gift.type === "memory" && <Camera className="w-4 h-4" />}
                    {gift.type === "message" && <Heart className="w-4 h-4" />}
                    {gift.type === "video" && <Video className="w-4 h-4" />}
                    {gift.type === "mini_surprise" && <Sparkles className="w-4 h-4" />}
                    {gift.type === "secret" && <KeyRound className="w-4 h-4" />}
                  </div>
                  <span className="font-serif text-sm font-semibold text-foreground">
                    {gift.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-surface-warm text-muted hover:text-foreground transition-colors"
                  aria-label="Close gift"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Content by Gift Type */}

              {/* 1. Song Gift */}
              {gift.type === "song" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-rose-300 text-sm font-semibold font-serif">
                      <Music className="w-4 h-4" />
                      <span>{gift.songTitle || "Special Track"}</span>
                    </div>
                    {gift.songArtist && (
                      <p className="text-xs text-slate-400 font-sans">
                        by {gift.songArtist}
                      </p>
                    )}
                    {gift.audioUrl ? (
                      <audio
                        src={gift.audioUrl}
                        controls
                        preload="metadata"
                        className="w-full pt-2"
                      />
                    ) : (
                      <p className="text-xs text-slate-400/80 italic pt-1">
                        (Add your audio file in data/birthday.ts to play directly)
                      </p>
                    )}
                  </div>
                  {gift.message && (
                    <p className="font-serif text-sm sm:text-base text-foreground leading-relaxed italic">
                      &ldquo;{gift.message}&rdquo;
                    </p>
                  )}
                </div>
              )}

              {/* 2. Memory Gift */}
              {gift.type === "memory" && (
                <div className="space-y-4">
                  {gift.memoryImage ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950">
                      <Image
                        src={gift.memoryImage}
                        alt={gift.memoryTitle || "Birthday Memory"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 text-center space-y-1">
                      <Camera className="w-6 h-6 mx-auto text-rose-300" />
                      <p className="text-xs text-slate-400">
                        {gift.memoryTitle || "A Cherished Moment"}
                      </p>
                    </div>
                  )}
                  {gift.memoryCaption && (
                    <p className="font-serif text-sm sm:text-base text-foreground leading-relaxed">
                      {gift.memoryCaption}
                    </p>
                  )}
                  {gift.message && (
                    <p className="text-xs sm:text-sm text-rose-300/90 font-serif italic border-t border-border/30 pt-2">
                      {gift.message}
                    </p>
                  )}
                </div>
              )}

              {/* 3. Video Surprise Gift */}
              {gift.type === "video" && (
                <div className="space-y-4">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-rose-500/30 bg-black shadow-inner flex flex-col items-center justify-center">
                    {activeVideoUrl ? (
                      <video
                        ref={giftVideoRef}
                        src={activeVideoUrl}
                        controls
                        autoPlay
                        playsInline
                        preload="auto"
                        className="w-full h-full object-contain bg-black"
                      />
                    ) : (
                      <div className="p-6 text-center space-y-3">
                        <Video className="w-10 h-10 text-rose-400 mx-auto animate-pulse" />
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Place your video file in <code className="text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded">{gift.videoUrl || "/videos/gift-1.mp4"}</code> to play automatically!
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                    {gift.message && (
                      <p className="font-serif text-sm text-foreground italic leading-relaxed">
                        {gift.message}
                      </p>
                    )}
                    <div className="flex items-center gap-2 shrink-0">
                      {activeVideoUrl && (
                        <button
                          type="button"
                          onClick={handleGiftFullscreen}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span>Fullscreen</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => giftFileInputRef.current?.click()}
                        className="inline-flex items-center gap-1 text-xs text-rose-300/80 hover:text-rose-200 transition-colors"
                      >
                        <Upload className="w-3 h-3" />
                        <span>{activeVideoUrl ? "Change" : "Load"}</span>
                      </button>
                      <input
                        ref={giftFileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleGiftFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Short Personal Message Gift */}
              {gift.type === "message" && (
                <div className="space-y-3">
                  <p className="font-serif text-base sm:text-lg text-foreground leading-relaxed whitespace-pre-line">
                    {gift.message}
                  </p>
                </div>
              )}

              {/* 4. Mini Surprise Game */}
              {gift.type === "mini_surprise" && (
                <div className="space-y-4 text-center">
                  <p className="text-xs text-muted">
                    {gift.miniGamePrompt || "Tap the star to unlock your reward!"}
                  </p>
                  {!miniGameWon ? (
                    <div className="py-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.15, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMiniGameWon(true)}
                        className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-lg shadow-amber-500/20 inline-flex items-center justify-center cursor-pointer"
                        aria-label="Tap star reward"
                      >
                        <Star className="w-8 h-8 fill-amber-400 text-amber-300 animate-pulse" />
                      </motion.button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2"
                    >
                      <CheckCircle2 className="w-6 h-6 text-amber-400 mx-auto" />
                      <p className="font-serif text-sm sm:text-base text-amber-200">
                        {gift.miniGameReward}
                      </p>
                      {gift.videoUrl && (
                        <video
                          src={gift.videoUrl}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full rounded-lg mt-2 border border-amber-400/30 bg-black aspect-video object-contain"
                        />
                      )}
                    </motion.div>
                  )}
                </div>
              )}

              {/* 5. Secret Gift */}
              {gift.type === "secret" && (
                <div className="space-y-3">
                  <p className="font-serif text-base text-foreground leading-relaxed">
                    {gift.secretNote || gift.message}
                  </p>
                </div>
              )}

              {/* Bottom Action */}
              <div className="pt-2 border-t border-border/30 flex justify-end">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onClose}
                  className="rounded-full text-xs"
                >
                  Close Gift
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
