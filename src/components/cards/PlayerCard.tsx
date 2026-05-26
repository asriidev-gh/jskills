"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/shared/LazyImage";
import type { Player } from "@/types";
import { scaleIn } from "@/lib/animations";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <motion.div variants={scaleIn} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <Link href={`/players/${player.slug}`}>
        <Card className="group relative overflow-hidden border-white/10 transition-all duration-300 hover:border-accent-orange/40 hover:shadow-glow">
          <div className="relative aspect-[3/4] overflow-hidden">
            <LazyImage
              src={player.image}
              alt={player.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-court-dark via-court-dark/20 to-transparent" />
            <div className="absolute top-4 right-4">
              <Badge variant="outline">#{player.number}</Badge>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge variant="secondary" className="mb-2">
                {player.position}
              </Badge>
              <h3 className="font-display text-2xl font-black uppercase text-white">
                {player.name}
              </h3>
              <p className="text-sm text-white/60">{player.teamName}</p>
              <div className="mt-4 flex gap-4 text-xs text-white/50">
                <span>
                  <strong className="text-accent-orange">{player.ppg}</strong> PPG
                </span>
                <span>
                  <strong className="text-white">{player.rpg}</strong> RPG
                </span>
                <span>
                  <strong className="text-white">{player.apg}</strong> APG
                </span>
              </div>
            </div>
            <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-orange/20 opacity-0 transition-opacity group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5 text-accent-orange" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
