"use client";

import { useEffect, useState } from "react";
import { PageLoader } from "@/components/shared/PageLoader";
import { preloadHomeAssets } from "@/lib/preload-home-assets";
import { scrollToHashIfPresent } from "@/lib/scroll-navigation";

interface HomePageGateProps {
  children: React.ReactNode;
}

export function HomePageGate({ children }: HomePageGateProps) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    document.body.style.overflow = "hidden";

    void preloadHomeAssets((pct) => {
      if (!cancelled) setProgress(pct);
    }).then(() => {
      if (cancelled) return;
      setFadeOut(true);
      window.setTimeout(() => {
        if (!cancelled) {
          setReady(true);
          document.body.style.overflow = "";
          window.setTimeout(() => {
            if (!cancelled) scrollToHashIfPresent();
          }, 50);
        }
      }, 400);
    });

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {!ready && (
        <div
          className={`transition-opacity duration-500 ${
            fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <PageLoader progress={progress} />
        </div>
      )}
      <div
        className={`transition-opacity duration-500 ${
          ready ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!ready}
      >
        {children}
      </div>
    </>
  );
}
