export interface ClinicInfo {
  name: string;
  tagline: string;
  taglines: string[];
  mission: string[];
  audiences: string[];
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  certifications?: string[];
  specialty: string[];
  bio?: string;
  philosophy?: string;
  highlights?: string[];
}

export interface TrainingPackage {
  id: string;
  name: string;
  type: "1-on-1" | "group" | "program";
  price: number;
  priceLabel?: string;
  sessions: number;
  validity?: string;
  period?: string;
  includes?: string[];
  skills?: string[];
  schedule?: string;
  duration?: string;
  ages?: string;
  description?: string;
  featured?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  mapEmbed: string;
}

export interface ScheduleSlot {
  id: string;
  day: string;
  time: string;
  program: string;
  locationId: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: "training" | "action" | "group" | "events";
  objectPosition?: string;
  aspectRatio?: "landscape" | "portrait";
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: "camp" | "tournament" | "clinic";
  image?: string;
  imagePosition?: string;
}

export interface ContactInfo {
  coachName: string;
  phone: string;
  email: string;
  facebook?: string;
  locations: string[];
}

export type SkillLevel = "beginner" | "intermediate" | "advance";
export type Position = "PG" | "SG" | "SF" | "PF" | "C" | "Not sure";
