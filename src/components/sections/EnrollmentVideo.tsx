"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/training_vid.mp4";
const POSTER = "/images/training_in_action/events/events_1.jpg";

export function EnrollmentVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* Autoplay blocked until user interacts — controls remain available */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-glow lg:min-h-0 lg:h-full"
    >
      <video
        ref={videoRef}
        controls
        muted
        loop
        playsInline
        preload="auto"
        poster={POSTER}
        className="h-full w-full object-contain"
        aria-label="JSkills training in action"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
