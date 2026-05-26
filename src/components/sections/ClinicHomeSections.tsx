"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Share2,
  Star,
  ChevronDown,
} from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ImageLightbox, GalleryThumb } from "@/components/shared/ImageLightbox";
import { FeaturedCoach } from "@/components/sections/FeaturedCoach";
import { PackageCard } from "@/components/cards/PackageCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { EnrollmentForm } from "@/components/sections/EnrollmentForm";
import { EnrollmentVideo } from "@/components/sections/EnrollmentVideo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  clinic,
  locations,
  weeklySchedule,
  faqs,
  testimonials,
  gallery,
  events,
  contact,
  getOneOnOnePackages,
  getProgramPackages,
  getLocationById,
} from "@/lib/clinic-data";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { Product } from "@/types";
import type { NewsArticle } from "@/types";

interface ClinicHomeSectionsProps {
  products: Product[];
  newsArticles: NewsArticle[];
}

export function ClinicHomeSections({ products, newsArticles }: ClinicHomeSectionsProps) {
  const [activeLocation, setActiveLocation] = useState(locations[0]?.id ?? "bgc");
  const [galleryFilter, setGalleryFilter] = useState<string>("events");
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.id ?? null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([]);

  const filteredGallery =
    galleryFilter === "all"
      ? gallery
      : gallery.filter((g) => g.category === galleryFilter);

  const openLightbox = (images: { src: string; alt: string }[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const galleryLightboxImages = filteredGallery.map((g) => ({ src: g.src, alt: g.alt }));
  const eventLightboxImages = events
    .filter((e) => e.image)
    .map((e) => ({ src: e.image!, alt: e.title }));

  const currentLocation = locations.find((l) => l.id === activeLocation);

  return (
    <>
      {/* 2. About */}
      <section id="about" className="scroll-mt-24 border-y border-white/10 bg-court-darker py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="About the Clinic"
            title={clinic.taglines[0]}
            subtitle={clinic.about.story}
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-white">Our Mission</h3>
              <ul className="mt-4 space-y-3">
                {clinic.mission.map((item) => (
                  <li key={item} className="flex gap-3 text-white/70">
                    <span className="text-accent-orange">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 rounded-2xl border border-accent-orange/20 bg-accent-orange/5 p-4">
                {clinic.taglines.map((line) => (
                  <p key={line} className="text-sm italic text-white/80">
                    &ldquo;{line}&rdquo;
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-white">
                What makes us different
              </h3>
              <ul className="mt-4 space-y-3">
                {clinic.about.differentiators.map((item) => (
                  <li key={item} className="text-white/60">{item}</li>
                ))}
              </ul>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-court-card/80 p-6 text-center backdrop-blur-xl">
                  <p className="font-display text-4xl font-black text-accent-orange">
                    {clinic.about.yearsExperience}+
                  </p>
                  <p className="mt-1 text-sm text-white/50">Years Experience</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-court-card/80 p-6 text-center backdrop-blur-xl">
                  <p className="font-display text-4xl font-black text-accent-orange">
                    {clinic.about.playersTrained}+
                  </p>
                  <p className="mt-1 text-sm text-white/50">Players Trained</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Gallery */}
      <section id="gallery" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Gallery" title="Training in action" align="center" />
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {["all", "training", "group", "events"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setGalleryFilter(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm capitalize transition-all",
                  galleryFilter === cat
                    ? "border-accent-orange text-accent-orange"
                    : "border-white/10 text-white/50 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredGallery.map((item, index) => (
              <GalleryThumb
                key={item.id}
                src={item.src}
                alt={item.alt}
                objectPosition={item.objectPosition ?? "center"}
                aspectClass={
                  item.aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                }
                onClick={() => openLightbox(galleryLightboxImages, index)}
              />
            ))}
          </div>

          <ImageLightbox
            images={lightboxImages}
            index={lightboxIndex}
            open={lightboxOpen}
            onOpenChange={setLightboxOpen}
            onIndexChange={setLightboxIndex}
          />
        </div>
      </section>

      {/* 4. Coach */}
      <FeaturedCoach />

      {/* 5. Programs */}
      <section id="programs" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Programs & Packages"
            title="Training that fits your goals"
            subtitle="1-on-1 packages, group training, and age-based programs — all skill levels welcome."
          />

          <h3 className="mb-6 font-display text-lg font-bold uppercase text-accent-orange">
            1-on-1 Coaching
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {getOneOnOnePackages().map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <h3 className="mb-6 mt-16 font-display text-lg font-bold uppercase text-accent-orange">
            Group & Age Programs
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {getProgramPackages().map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Schedule & Location */}
      <section id="schedule" className="scroll-mt-24 border-y border-white/10 bg-court-darker py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Schedule & Location"
            title="When & where we train"
            subtitle="Weekly schedule across BGC Taguig, Greenhills, and Quezon City."
          />

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-court-card/80 backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-white/50">
                    <th className="px-6 py-4">Day</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Program</th>
                    <th className="px-6 py-4">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map((slot) => (
                    <tr key={slot.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-6 py-4 font-semibold text-white">{slot.day}</td>
                      <td className="px-6 py-4 text-white/70">{slot.time}</td>
                      <td className="px-6 py-4 text-accent-orange">{slot.program}</td>
                      <td className="px-6 py-4 text-white/60">
                        {getLocationById(slot.locationId)?.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-6 flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setActiveLocation(loc.id)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                    activeLocation === loc.id
                      ? "border-accent-orange bg-accent-orange/10 text-accent-orange"
                      : "border-white/10 text-white/60 hover:border-white/20"
                  )}
                >
                  {loc.name}
                </button>
              ))}
            </div>
            {currentLocation && (
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <MapPin className="mb-3 h-6 w-6 text-accent-orange" />
                    <h3 className="font-display text-xl font-bold text-white">
                      {currentLocation.name}
                    </h3>
                    <p className="mt-2 text-white/60">{currentLocation.address}</p>
                    <p className="mt-4 text-sm text-white/40">
                      Exact court address shared upon enrollment confirmation.
                    </p>
                  </CardContent>
                </Card>
                <div className="overflow-hidden rounded-2xl border border-white/10 aspect-video min-h-[280px]">
                  <iframe
                    title={`Map — ${currentLocation.name}`}
                    src={currentLocation.mapEmbed}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Enrollment */}
      <section id="enroll" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Registration"
            title="Enroll today"
            subtitle="Choose your package, submit the form, and pay via GCash, BPI, or cash. Coach Edmar will confirm your first evaluation session."
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-stretch">
            <EnrollmentVideo />
            <EnrollmentForm />
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section id="testimonials" className="scroll-mt-24 border-y border-white/10 bg-court-darker py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Success Stories"
            title="What families are saying"
            align="center"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2"
          >
            {testimonials.map((t) => (
              <motion.div key={t.id} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-3 flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent-orange text-accent-orange" />
                      ))}
                    </div>
                    <p className="text-white/80">&ldquo;{t.quote}&rdquo;</p>
                    <p className="mt-4 font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-white/40">{t.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. FAQs */}
      <section id="faq" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle label="FAQs" title="Common questions" align="center" />
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-court-card/80"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-accent-orange transition-transform",
                      openFaq === faq.id && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === faq.id && (
                  <div className="border-t border-white/10 px-5 pb-5 pt-0">
                    <p className="pt-4 text-white/60 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="scroll-mt-24 border-y border-white/10 bg-court-darker py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Events & Camps"
            title="Special programs"
            subtitle="Summer clinics, tournaments, and intensive camps — dates updated regularly."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event, eventIndex) => (
              <Card
                key={event.id}
                className="group overflow-hidden transition-colors hover:border-accent-orange/30"
              >
                {event.image && (
                  <button
                    type="button"
                    onClick={() => openLightbox(eventLightboxImages, eventIndex)}
                    className="relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden"
                    aria-label={`View full size: ${event.title}`}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: event.imagePosition ?? "center top" }}
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-court-dark/90 via-court-dark/20 to-transparent" />
                    <Badge className="absolute top-4 left-4 capitalize">{event.type}</Badge>
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-1 text-[10px] uppercase tracking-wider text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                      Enlarge
                    </span>
                  </button>
                )}
                <CardContent className="p-6">
                  {!event.image && (
                    <Badge variant="outline" className="mb-3 capitalize">
                      {event.type}
                    </Badge>
                  )}
                  <h3 className="font-display text-lg font-bold uppercase text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-accent-orange">{event.date}</p>
                  <p className="mt-1 text-sm text-white/50">{event.location}</p>
                  <p className="mt-4 text-sm text-white/60">{event.description}</p>
                  <Button asChild variant="outline" className="mt-6 w-full" size="sm">
                    <Link href="/#enroll">Register Interest</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Club Shop */}
      <section id="shop" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Club Shop"
            title="Gear up like a pro"
            subtitle="Official JSkills apparel — jersey, shorts, socks & headband. Group members receive the club jersey with monthly training."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/40">
            Sample prices in Philippine Peso (₱). Contact Coach Edmar to order — GCash, BPI, or cash accepted.
          </p>
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link href="/shop">View Full Shop</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog / Tips */}
      <section id="blog" className="scroll-mt-24 border-y border-white/10 bg-court-darker py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Tips & Blog"
            title="Improve your game"
            subtitle="Drills, shooting tips, and training advice from our coaches."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {newsArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="ghost">
              <Link href="/news">Read All Tips →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 10. Contact */}
      <section id="contact" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Contact"
            title="Get in touch"
            subtitle="Call, message, or email Coach Edmar to book your evaluation session."
            align="center"
          />
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="flex gap-4 p-6">
                <Phone className="h-6 w-6 shrink-0 text-accent-orange" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40">Phone</p>
                  <a
                    href={contact.phoneLink}
                    className="mt-1 block text-lg font-semibold text-white hover:text-accent-orange"
                  >
                    {contact.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex gap-4 p-6">
                <Mail className="h-6 w-6 shrink-0 text-accent-orange" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 block text-white hover:text-accent-orange break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex gap-4 p-6">
                <Share2 className="h-6 w-6 shrink-0 text-accent-orange" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40">Facebook</p>
                  <a
                    href={contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-white hover:text-accent-orange"
                  >
                    {contact.facebookLabel}
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex gap-4 p-6">
                <MapPin className="h-6 w-6 shrink-0 text-accent-orange" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40">Locations</p>
                  <ul className="mt-2 space-y-1 text-white/80">
                    {contact.locations.map((loc) => (
                      <li key={loc}>{loc}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link href="/#enroll">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
