"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl border border-accent-orange/20"
    >
      <div
        className="absolute inset-0 bg-gradient-accent opacity-90"
        style={{ backgroundSize: "200% 200%" }}
      />
      <div className="absolute inset-0 bg-[url('/images/training_in_action/events/events_3.jpg')] bg-cover bg-center mix-blend-overlay opacity-30" />
      <div className="relative px-8 py-16 text-center md:px-16 md:py-20">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
          Join the journey
        </span>
        <h2 className="mt-4 font-display text-display-md font-black uppercase text-white">
          Take your game to the next level
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-white/80">
          Become part of Chicago&apos;s premier basketball community. Train, compete,
          and grow with Hoops Elite today.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="glass" size="lg" className="bg-white text-court-dark hover:bg-white/90">
            <Link href="/contact">Become a Member</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <Link href="/schedule">View Schedule</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
