"use client";

import Image from "next/image";
import { SITE_LOGO, SITE_LOGO_ALT } from "@/lib/site";

interface PageLoaderProps {
  progress: number;
}

export function PageLoader({ progress }: PageLoaderProps) {
  const display = Math.min(100, Math.max(0, progress));

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-court-dark px-6"
      role="progressbar"
      aria-valuenow={display}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading page"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent-orange/15 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-xs flex-col items-center">
        <Image
          src={SITE_LOGO}
          alt={SITE_LOGO_ALT}
          width={200}
          height={64}
          className="h-14 w-auto object-contain"
          priority
        />
        <p className="mt-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50">
          Loading
        </p>
        <p className="mt-2 font-display text-5xl font-black tabular-nums text-accent-orange">
          {display}%
        </p>
        <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-orange to-accent-glow transition-[width] duration-300 ease-out"
            style={{ width: `${display}%` }}
          />
        </div>
        <p className="mt-4 text-center text-xs text-white/40">
          Preparing your training experience…
        </p>
      </div>
    </div>
  );
}
