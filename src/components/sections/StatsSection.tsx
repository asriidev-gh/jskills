"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Trophy, DollarSign } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { stats } from "@/lib/data";

const iconMap = {
  calendar: Calendar,
  users: Users,
  trophy: Trophy,
  dollar: DollarSign,
};

export function StatsSection() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap] || Trophy;
        return (
          <motion.div
            key={stat.id}
            variants={fadeInUp}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-court-card/80 p-6 backdrop-blur-xl transition-all hover:border-accent-orange/30 hover:shadow-glow"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent-orange/10 blur-2xl transition-all group-hover:bg-accent-orange/20" />
            <Icon className="mb-4 h-6 w-6 text-accent-orange" />
            <p className="font-display text-3xl font-black text-white md:text-4xl">
              {stat.value}
              {stat.suffix && (
                <span className="text-accent-orange">{stat.suffix}</span>
              )}
            </p>
            <p className="mt-1 text-sm text-white/50">{stat.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
