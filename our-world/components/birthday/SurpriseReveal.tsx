"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { BirthdaySurprise } from "@/types/birthday";
import { Sparkles, ArrowRight, Video, Play, Upload, Film, Clapperboard, Maximize2 } from "lucide-react";

type FullscreenVideoElement = HTMLVideoElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  webkitEnterFullscreen?: () => void;
  msRequestFullscreen?: () => Promise<void> | void;
};

interface SurpriseRevealProps {
  surprise: BirthdaySurprise;
  onNext: () => void;
}

export function SurpriseReveal({ surprise, onNext }: SurpriseRevealProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalVideoUrl(url);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      const elem = videoRef.current as FullscreenVideoElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.webkitEnterFullscreen) {
        // iOS Safari Native Video Fullscreen
        elem.webkitEnterFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  };

  const activeVideoUrl = localVideoUrl || surprise.videoUrl;

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto py-4">

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="unopened"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-6 w-full"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-rose-500/10 text-rose-300 border border-rose-500/20">
              <Film className="w-3.5 h-3.5" />
              Sabse Special Surprise
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-semibold drop-shadow-sm">
              {surprise.title || "A Special Surprise"}
            </h2>

            <p className="text-sm sm:text-base text-slate-700 max-w-md mx-auto leading-relaxed font-serif">
              Ek special video jo maine bohot mehnat se banaya hai....
            </p>

            {/* Video Gift Box Graphic */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, -1.5, 1.5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="relative p-8 rounded-3xl bg-gradient-to-b from-rose-950/40 to-slate-900/60 border border-rose-500/30 shadow-2xl shadow-rose-950/50 cursor-pointer group"
              onClick={handleOpen}
            >
              <div className="absolute inset-0 bg-rose-500/10 rounded-3xl blur-xl group-hover:bg-rose-500/20 transition-all pointer-events-none" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Clapperboard className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-md" />
              </div>
            </motion.div>

            <Button
              size="lg"
              variant="primary"
              onClick={handleOpen}
              className="group px-7 py-3 rounded-full text-base font-medium shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30 hover:scale-[1.02] transition-all"
            >
              <Play className="w-4 h-4 mr-2 fill-current group-hover:scale-110 transition-transform" />
              Play Video Surprise 🎬
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 w-full"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Video Theater Unlocked
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-semibold drop-shadow-sm">
              {surprise.title || "Your Birthday Video Message 🎬"}
            </h2>

            {/* Video Theater Card Container */}
            <div className="w-full bg-slate-900/80 backdrop-blur-md border border-rose-500/30 rounded-3xl p-5 sm:p-7 text-left space-y-5 shadow-2xl shadow-rose-950/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/5 rounded-bl-full pointer-events-none" />

              {/* Video Player Display */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-rose-500/30 bg-black shadow-inner flex flex-col items-center justify-center group">
                {activeVideoUrl ? (
                  <video
                    ref={videoRef}
                    src={activeVideoUrl}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    poster={surprise.videoPoster || surprise.image}
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <div className="p-6 text-center space-y-4 max-w-md">
                    <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-300">
                      <Video className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-serif font-medium text-slate-100">
                        Select or Add Your Surprise Video
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Add an MP4/WebM video file in <code className="text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded">public/videos/birthday-surprise.mp4</code> or choose a video file below to watch it right now!
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500 text-white shadow-md hover:bg-rose-400 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Choose Video File
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Video Caption & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-white/10">
                <p className="text-xs sm:text-sm text-slate-300/90 font-serif italic">
                  {surprise.videoCaption || surprise.message || "A video recorded with love ♡"}
                </p>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  {activeVideoUrl && (
                    <button
                      type="button"
                      onClick={handleFullscreen}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Fullscreen ⛶</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 text-xs text-rose-300/80 hover:text-rose-200 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{activeVideoUrl ? "Change Video" : "Load Video"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Next Step Button */}
            <div className="pt-2">
              <Button
                size="lg"
                variant="primary"
                onClick={onNext}
                className="group px-7 py-3 rounded-full text-base font-medium shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-all"
              >
                Next: Birthday Letter
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

