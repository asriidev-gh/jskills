export interface Team {
  id: string;
  name: string;
  slug: string;
  logo: string;
  city: string;
  founded: number;
  wins: number;
  losses: number;
  description: string;
  primaryColor: string;
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  number: number;
  position: string;
  teamId: string;
  teamName: string;
  image: string;
  height: string;
  weight: string;
  ppg: number;
  rpg: number;
  apg: number;
  bio: string;
  featured?: boolean;
}

export interface Match {
  id: string;
  date: string;
  time: string;
  venue: string;
  league: string;
  homeTeam: { id: string; name: string; logo: string; score?: number };
  awayTeam: { id: string; name: string; logo: string; score?: number };
  status: "upcoming" | "live" | "completed";
  featured?: boolean;
}

export interface Standing {
  position: number;
  teamId: string;
  teamName: string;
  teamSlug: string;
  wins: number;
  losses: number;
  gamesBehind: number;
  pointsAgainst: number;
}

export type ShopProductType = "jersey" | "shorts" | "socks" | "headband";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  productType?: ShopProductType;
  description?: string;
  badge?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  comments: number;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  icon: string;
}
