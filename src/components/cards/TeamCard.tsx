"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { Team } from "@/types";
import { scaleIn } from "@/lib/animations";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <motion.div variants={scaleIn} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <Link href={`/teams#${team.slug}`}>
        <Card className="group overflow-hidden transition-all duration-300 hover:border-accent-orange/30 hover:shadow-glow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 group-hover:border-accent-orange/50 transition-colors">
                <Image
                  src={team.logo}
                  alt={team.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-black uppercase text-white">
                  {team.name}
                </h3>
                <p className="text-sm text-white/50">{team.city} · Est. {team.founded}</p>
                <div className="mt-2 flex gap-3 text-sm">
                  <span className="text-accent-orange font-bold">{team.wins}W</span>
                  <span className="text-white/40">{team.losses}L</span>
                </div>
              </div>
            </div>
            <p className="mt-4 line-clamp-2 text-sm text-white/50">{team.description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
