"use client";

import { motion } from "framer-motion";
import { heroText, fadeIn } from "@/lib/animations";

interface PageHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-court-darker pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute -right-1/4 top-0 h-96 w-96 rounded-full bg-accent-orange/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {label && (
          <motion.span
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-accent-orange"
          >
            [ {label} ]
          </motion.span>
        )}
        <motion.h1
          variants={heroText}
          initial="hidden"
          animate="visible"
          className="font-display text-display-lg font-black uppercase text-white"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-2xl text-lg text-white/60"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
