"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { sponsors } from "@/lib/data";

export function SponsorsSection() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
    >
      {sponsors.map((sponsor) => (
        <motion.div
          key={sponsor.id}
          variants={fadeInUp}
          className="group relative h-12 w-28 opacity-40 grayscale transition-all hover:opacity-80 hover:grayscale-0 md:h-14 md:w-36"
        >
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            fill
            className="object-contain"
            sizes="150px"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
