"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MatchCard } from "@/components/cards/MatchCard";
import { StandingsTable } from "@/components/cards/StandingsTable";
import { NewsCard } from "@/components/cards/NewsCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { StatsSection } from "@/components/sections/StatsSection";
import { PlayerCarousel } from "@/components/sections/PlayerCarousel";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/animations";
import type { Match, Player, Standing, Product, NewsArticle } from "@/types";

interface HomeSectionsProps {
  featuredMatch: Match;
  featuredPlayers: Player[];
  upcomingMatches: Match[];
  standings: Standing[];
  products: Product[];
  newsArticles: NewsArticle[];
}

export function HomeSections({
  featuredMatch,
  featuredPlayers,
  upcomingMatches,
  standings,
  products,
  newsArticles,
}: HomeSectionsProps) {
  return (
    <>
      {/* Featured Match */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle label="The Game" title="Featured Match" align="center" />
          <div className="mx-auto max-w-2xl">
            <MatchCard match={featuredMatch} featured />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-court-darker py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Building Champions"
            title="Empower lives through basketball"
            subtitle="Hoops Elite is Chicago's premier basketball club — expert coaching, skill clinics, and championship culture since 2014."
          />
          <StatsSection />
        </div>
      </section>

      {/* Player Spotlight */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Player Spotlight"
            title="Meet our stars"
            subtitle="Elite athletes leading the charge on and off the court."
          />
          <PlayerCarousel players={featuredPlayers} />
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/players">View All Players</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Standings */}
      <section className="border-y border-white/10 bg-court-darker py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle label="Team Standing" title="League table" className="mb-0" />
            <Button asChild variant="ghost" className="shrink-0">
              <Link href="/standings">View full table →</Link>
            </Button>
          </div>
          <div className="mt-8">
            <StandingsTable standings={standings} compact />
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Match Schedule"
            title="Upcoming games"
            subtitle="Don't miss the action — catch our next matchups live."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </motion.div>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link href="/schedule">Full Schedule</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Shop Preview */}
      <section className="border-y border-white/10 bg-court-darker py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Club Shop"
            title="Gear up like a pro"
            subtitle="Premium basketball merchandise — jerseys, sneakers, and training equipment."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/shop">Visit Shop</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Latest News"
            title="From the court"
            subtitle="Stories, tips, and community updates from Hoops Elite."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {newsArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="ghost">
              <Link href="/news">Read All News →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="border-y border-white/10 bg-court-darker py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Partners" title="Our sponsors" align="center" />
          <SponsorsSection />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CTABanner />
        </div>
      </section>
    </>
  );
}
