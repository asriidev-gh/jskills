import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPlayerBySlug, players } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";

interface PlayerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PlayerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) return createPageMetadata("Player Not Found");
  return createPageMetadata(
    player.name,
    `${player.position} · ${player.teamName} · ${player.ppg} PPG`
  );
}

export default async function PlayerDetailPage({ params }: PlayerPageProps) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) notFound();

  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/players">
            <ArrowLeft className="h-4 w-4" />
            Back to Players
          </Link>
        </Button>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={player.image}
              alt={player.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-court-dark via-transparent to-transparent" />
            <Badge className="absolute top-6 left-6 text-lg px-4 py-2">
              #{player.number}
            </Badge>
          </div>

          <div>
            <Badge variant="outline" className="mb-4">
              {player.position}
            </Badge>
            <h1 className="font-display text-display-md font-black uppercase text-white">
              {player.name}
            </h1>
            <p className="mt-2 text-xl text-accent-orange">{player.teamName}</p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: "PPG", value: player.ppg },
                { label: "RPG", value: player.rpg },
                { label: "APG", value: player.apg },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-court-card/80 p-4 text-center backdrop-blur-xl"
                >
                  <p className="font-display text-3xl font-black text-accent-orange">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-6 text-sm text-white/60">
              <span>Height: <strong className="text-white">{player.height}</strong></span>
              <span>Weight: <strong className="text-white">{player.weight}</strong></span>
            </div>

            <p className="mt-8 text-lg leading-relaxed text-white/70">{player.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
