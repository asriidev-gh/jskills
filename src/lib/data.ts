import teamsData from "@/data/teams.json";
import playersData from "@/data/players.json";
import matchesData from "@/data/matches.json";
import standingsData from "@/data/standings.json";
import productsData from "@/data/products.json";
import newsData from "@/data/news.json";
import sponsorsData from "@/data/sponsors.json";
import statsData from "@/data/stats.json";
import type {
  Team,
  Player,
  Match,
  Standing,
  Product,
  NewsArticle,
  Sponsor,
  StatCard,
} from "@/types";

export const teams = teamsData as Team[];
export const players = playersData as Player[];
export const matches = matchesData as Match[];
export const standings = standingsData as Standing[];
export const products = productsData as Product[];
export const news = newsData as NewsArticle[];
export const sponsors = sponsorsData as Sponsor[];
export const stats = statsData as StatCard[];

export function getTeamBySlug(slug: string) {
  return teams.find((t) => t.slug === slug);
}

export function getPlayerBySlug(slug: string) {
  return players.find((p) => p.slug === slug);
}

export function getNewsBySlug(slug: string) {
  return news.find((n) => n.slug === slug);
}

export function getFeaturedMatch() {
  return matches.find((m) => m.featured) || matches[0];
}

export function getFeaturedPlayers() {
  return players.filter((p) => p.featured);
}

export function getUpcomingMatches() {
  return matches.filter((m) => m.status === "upcoming");
}

export function getCompletedMatches() {
  return matches.filter((m) => m.status === "completed");
}
