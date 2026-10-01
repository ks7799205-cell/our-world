"use client";

import React from "react";

import { GlobalBackground } from "@/components/layout/GlobalBackground";
import { Navbar } from "@/components/navigation/Navbar";
import { MusicProvider } from "@/lib/music-context";
import { siteConfig } from "@/lib/site";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <MusicProvider>
      <div className="relative flex min-h-screen flex-col selection:bg-rose/20 selection:text-burgundy">
        {/* Screen Reader Skip Link */}
        <a
          href="#main-content"
          className="sr-only fixed top-4 left-4 z-50 rounded-lg bg-surface px-4 py-2 text-sm font-semibold text-accent shadow-lifted border border-border focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Skip to main content
        </a>

        {/* Global Ambient Romantic Background */}
        <GlobalBackground />

        {/* Global Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <div className="flex flex-1 flex-col">{children}</div>

        {/* Subtle Romantic Footer */}
        <footer className="mt-auto border-t border-border/40 py-6 text-center text-xs text-muted/80">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6 lg:px-8">
            <p className="font-serif italic tracking-wide">
              {siteConfig.name} — A private world built with love
            </p>
            <p className="text-[11px] text-muted/60">
              Every story, every memory, just for you ♡
            </p>
          </div>
        </footer>
      </div>
    </MusicProvider>
  );
}
