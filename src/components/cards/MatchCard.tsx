"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Match } from "@/types";
import { scaleIn } from "@/lib/animations";

interface MatchCardProps {
  match: Match;
  featured?: boolean;
}

export function MatchCard({ match, featured = false }: MatchCardProps) {
  const isUpcoming = match.status === "upcoming";
  const homeScore = match.homeTeam.score;
  const awayScore = match.awayTeam.score;

  return (
    <motion.div variants={scaleIn} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <Card
        className={`group overflow-hidden transition-all duration-300 hover:border-accent-orange/30 hover:shadow-glow ${
          featured ? "border-accent-orange/20" : ""
        }`}
      >
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <Badge variant={isUpcoming ? "default" : "secondary"}>
              {isUpcoming ? "Upcoming" : "Final"}
            </Badge>
            <span className="text-xs text-white/40">{match.league}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/10 group-hover:border-accent-orange/50 transition-colors">
                <Image
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <span className="text-sm font-bold text-white">{match.homeTeam.name}</span>
              {!isUpcoming && homeScore !== undefined && (
                <span className="font-display text-3xl font-black text-accent-orange">
                  {homeScore}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center">
              {isUpcoming ? (
                <span className="font-display text-2xl font-black text-white/30">VS</span>
              ) : (
                <span className="text-xs text-white/40">—</span>
              )}
            </div>

            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/10 group-hover:border-accent-orange/50 transition-colors">
                <Image
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <span className="text-sm font-bold text-white">{match.awayTeam.name}</span>
              {!isUpcoming && awayScore !== undefined && (
                <span className="font-display text-3xl font-black text-white">
                  {awayScore}
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-4 text-xs text-white/50">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-accent-orange" />
              {formatDate(match.date)} · {match.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-accent-orange" />
              {match.venue}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
