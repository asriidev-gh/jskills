"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { Standing } from "@/types";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StandingsTableProps {
  standings: Standing[];
  compact?: boolean;
}

export function StandingsTable({ standings, compact = false }: StandingsTableProps) {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-left text-xs font-bold uppercase tracking-wider text-white/50">
                  <th className="px-6 py-4">Pos</th>
                  <th className="px-6 py-4">Team</th>
                  <th className="px-4 py-4 text-center">W</th>
                  <th className="px-4 py-4 text-center">L</th>
                  {!compact && <th className="px-4 py-4 text-center">GB</th>}
                  <th className="px-6 py-4 text-center">PA</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, i) => (
                  <tr
                    key={row.teamId}
                    className={cn(
                      "border-b border-white/5 transition-colors hover:bg-white/5",
                      i === 0 && "bg-accent-orange/5"
                    )}
                  >
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                          row.position <= 3
                            ? "bg-gradient-accent text-white"
                            : "bg-white/10 text-white/70"
                        )}
                      >
                        {row.position}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/teams#${row.teamSlug}`}
                        className="font-semibold text-white hover:text-accent-orange transition-colors"
                      >
                        {row.teamName}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-center font-bold text-accent-orange">
                      {row.wins}
                    </td>
                    <td className="px-4 py-4 text-center text-white/60">{row.losses}</td>
                    {!compact && (
                      <td className="px-4 py-4 text-center text-white/60">
                        {row.gamesBehind === 0 ? "—" : row.gamesBehind}
                      </td>
                    )}
                    <td className="px-6 py-4 text-center text-white/60">{row.pointsAgainst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
