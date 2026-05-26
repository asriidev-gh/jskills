import clinicData from "@/data/clinic.json";
import coachesData from "@/data/coaches.json";
import packagesData from "@/data/packages.json";
import locationsData from "@/data/locations.json";
import weeklyScheduleData from "@/data/weekly-schedule.json";
import faqsData from "@/data/faqs.json";
import testimonialsData from "@/data/testimonials.json";
import galleryData from "@/data/gallery.json";
import eventsData from "@/data/events.json";
import contactData from "@/data/contact.json";
import type {
  Coach,
  TrainingPackage,
  Location,
  ScheduleSlot,
  FAQ,
  Testimonial,
  GalleryItem,
  Event,
} from "@/types/clinic";

export const clinic = clinicData;
export const coaches = coachesData as Coach[];

export function getHeadCoach(): Coach {
  return coaches[0];
}
export const packages = packagesData as TrainingPackage[];
export const locations = locationsData as Location[];
export const weeklySchedule = weeklyScheduleData as ScheduleSlot[];
export const faqs = faqsData as FAQ[];
export const testimonials = testimonialsData as Testimonial[];
export const gallery = galleryData as GalleryItem[];
export const events = eventsData as Event[];
export const contact = contactData;

export function getOneOnOnePackages() {
  return packages.filter((p) => p.type === "1-on-1");
}

export function getProgramPackages() {
  return packages.filter((p) => p.type === "program" || p.type === "group");
}

export function getLocationById(id: string) {
  return locations.find((l) => l.id === id);
}
