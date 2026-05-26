"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Target,
  Users,
  MapPin,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { getHeadCoach, contact } from "@/lib/clinic-data";

export function FeaturedCoach() {
  const coach = getHeadCoach();

  return (
    <section id="coaches" className="scroll-mt-24 border-y border-white/10 bg-court-darker py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Your Coach"
          title="Meet Coach Edmar"
          subtitle="JSkills is led by one dedicated trainer — personal attention, structured development, and coaching rooted in skill and character."
          align="center"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Photo */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative lg:col-span-5"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-accent opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-accent-orange/30 shadow-glow">
              <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-court-dark via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-3xl font-black uppercase text-white">
                  {coach.name}
                </p>
                <p className="mt-1 text-sm font-medium text-accent-orange">{coach.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            {coach.philosophy && (
              <blockquote className="mb-6 border-l-4 border-accent-orange pl-5">
                <p className="font-display text-xl font-bold italic text-white md:text-2xl">
                  &ldquo;{coach.philosophy}&rdquo;
                </p>
                <p className="mt-2 text-sm text-white/40">Coaching philosophy</p>
              </blockquote>
            )}

            <p className="text-lg leading-relaxed text-white/70">{coach.bio}</p>
            <p className="mt-4 text-white/60">{coach.experience}</p>

            {coach.certifications && (
              <div className="mt-6 flex flex-wrap gap-2">
                {coach.certifications.map((cert) => (
                  <Badge key={cert} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent-orange">
                Training focus
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {coach.specialty.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {coach.highlights && (
              <ul className="mt-8 space-y-3">
                {coach.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-white/70">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg">
                <Link href="/#enroll">Train with Coach Edmar</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={contact.phoneLink}>
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </Link>
              </Button>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-white/40">
              <MapPin className="h-3.5 w-3.5 text-accent-orange" />
              {contact.locations.join(" · ")}
            </p>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 grid gap-4 sm:grid-cols-3"
        >
          {[
            {
              icon: Users,
              title: "1 Coach, Full Focus",
              text: "Every player trains directly with Coach Edmar — no rotating staff.",
            },
            {
              icon: Target,
              title: "Evaluation First",
              text: "Session 1 is assessment and a plan built for your goals.",
            },
            {
              icon: Award,
              title: "Skills + Character",
              text: "Basketball growth paired with discipline and faith-centered values.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-court-card/60 p-6 backdrop-blur-xl transition-colors hover:border-accent-orange/20"
            >
              <item.icon className="mb-3 h-8 w-8 text-accent-orange" />
              <h4 className="font-display font-bold uppercase text-white">{item.title}</h4>
              <p className="mt-2 text-sm text-white/50">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
