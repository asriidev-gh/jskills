"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Coach } from "@/types/clinic";
import { scaleIn } from "@/lib/animations";

interface CoachCardProps {
  coach: Coach;
}

export function CoachCard({ coach }: CoachCardProps) {
  return (
    <motion.div variants={scaleIn} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <Card className="group h-full overflow-hidden transition-all hover:border-accent-orange/30 hover:shadow-glow">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={coach.image}
            alt={coach.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-court-dark via-court-dark/30 to-transparent" />
        </div>
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-black uppercase text-white">
            {coach.name}
          </h3>
          <p className="text-sm font-medium text-accent-orange">{coach.role}</p>
          <p className="mt-3 text-sm text-white/60">{coach.experience}</p>
          {coach.certifications && coach.certifications.length > 0 && (
            <p className="mt-2 text-xs text-white/40">
              {coach.certifications.join(" · ")}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {coach.specialty.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
          {coach.bio && (
            <p className="mt-4 text-sm leading-relaxed text-white/50">{coach.bio}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
