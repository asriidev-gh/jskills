"use client";

import { motion } from "framer-motion";
import { fadeInUp, defaultViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  label,
  title,
  subtitle,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {label && (
        <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-accent-orange">
          [ {label} ]
        </span>
      )}
      <h2 className="font-display text-display-md font-black uppercase text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-white/60 leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
