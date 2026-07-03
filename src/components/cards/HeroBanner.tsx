"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { heroText, fadeIn, staggerContainer, fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnrollLink } from "@/components/shared/EnrollLink";
import { clinic } from "@/lib/clinic-data";

const HERO_VIDEO = "/videos/edmar_hero_banner.mp4";
const HERO_POSTER = "/images/training_in_action/events/events_1.jpg";

export function HeroBanner() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          aria-hidden
          className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_20%]"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute inset-0 bg-court-dark/40" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-accent-orange/10 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-accent-red/10 blur-3xl animate-pulse-glow" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8">
        <div className="max-w-sm sm:max-w-md">
          <motion.span
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-hero-eyebrow mb-2 inline-block font-bold uppercase text-accent-orange"
          >
            [ Basketball Skills Clinic ]
          </motion.span>

          <motion.h1
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="font-display text-hero-title font-black uppercase text-white"
          >
            {clinic.name}
          </motion.h1>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
            className="mt-3 space-y-1.5"
          >
            {clinic.taglines.map((line, index) => (
              <motion.p
                key={line}
                variants={fadeInUp}
                className={
                  index === 0
                    ? "text-hero-tagline font-display font-bold text-white/95"
                    : index === 1
                      ? "text-hero-sub font-display font-semibold italic text-accent-orange/90"
                      : "text-hero-sub font-display font-medium text-white/75"
                }
              >
                &ldquo;{line}&rdquo;
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            className="mt-3 flex flex-wrap gap-1.5"
          >
            {clinic.audiences.map((audience) => (
              <motion.div key={audience} variants={fadeInUp}>
                <Badge
                  variant="secondary"
                  className="px-2 py-0.5 text-[10px] tracking-wide"
                >
                  {audience}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
            className="text-hero-body mt-3 max-w-xs text-white/70 sm:max-w-sm"
          >
            Is this for you? Yes — if you want real skill development, structured
            training, and coaching rooted in character and faith. All ages and levels
            welcome.
          </motion.p>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.65 }}
            className="mt-5 flex flex-col gap-2.5 sm:flex-row"
          >
            <Button asChild size="sm" className="text-xs sm:text-sm">
              <EnrollLink>Enroll Now</EnrollLink>
            </Button>
            <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm">
              <Link href="/#schedule">Join Next Training</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50 hover:text-accent-orange"
        aria-label="Scroll to content"
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}
