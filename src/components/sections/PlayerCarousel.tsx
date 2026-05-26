"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PlayerCard } from "@/components/cards/PlayerCard";
import { carouselItem } from "@/lib/animations";
import type { Player } from "@/types";

interface PlayerCarouselProps {
  players: Player[];
}

export function PlayerCarousel({ players }: PlayerCarouselProps) {
  const [index, setIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = Math.max(0, players.length - visibleCount);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const visible = players.slice(index, index + visibleCount);

  return (
    <div className="relative">
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-accent-orange hover:text-accent-orange disabled:opacity-30"
          aria-label="Previous players"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={index >= maxIndex}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-accent-orange hover:text-accent-orange disabled:opacity-30"
          aria-label="Next players"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((player) => (
            <motion.div
              key={player.id}
              variants={carouselItem}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <PlayerCard player={player} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
