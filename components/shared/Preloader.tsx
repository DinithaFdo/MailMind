"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const timeout = setTimeout(() => {
      setIsVisible(false);

      // Allow scrolling after finish
      document.body.style.overflow = "auto";

      // Remove from DOM after fade out animation
      setTimeout(() => {
        setShouldRender(false);
      }, 500); // 500ms match transition duration
    }, 2500); // 2.5 seconds total display time

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Ripple Effect */}
        <div className="absolute -z-10 h-32 w-32 animate-ping rounded-full bg-indigo-500/20 duration-1000 delay-150" />
        <div className="absolute -z-10 h-32 w-32 animate-ping rounded-full bg-indigo-500/40 duration-1000 delay-500" />

        {/* Main Icon */}
        <div className="relative z-10 flex h-24 w-24 animate-in fade-in zoom-in-50 duration-700 items-center justify-center rounded-xl bg-white/10 p-4 shadow-xl backdrop-blur-sm border border-indigo-100 dark:border-indigo-900/50">
          <Image
            src="/MailMind Icon.png"
            alt="MailMind Logo"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Text Branding */}
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Mail<span className="text-indigo-600">Mind</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">
            Intelligent Email Assistant
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-secondary/50">
          <div className="h-full w-full origin-left animate-[progress_2s_ease-in-out_forwards] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
        </div>
      </div>
    </div>
  );
}
