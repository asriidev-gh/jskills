"use client";

import { motion } from "framer-motion";
import { Check, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPHP } from "@/lib/utils";
import { EnrollLink } from "@/components/shared/EnrollLink";
import type { TrainingPackage } from "@/types/clinic";
import { scaleIn } from "@/lib/animations";

interface PackageCardProps {
  pkg: TrainingPackage;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const showPrice = pkg.price > 0;

  return (
    <motion.div variants={scaleIn} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <Card
        className={`relative h-full overflow-hidden transition-all hover:border-accent-orange/30 hover:shadow-glow ${
          pkg.featured ? "border-accent-orange/30 ring-1 ring-accent-orange/20" : ""
        }`}
      >
        {pkg.featured && (
          <Badge className="absolute top-4 right-4 z-10">Popular</Badge>
        )}
        <CardContent className="flex h-full flex-col p-6">
          <Badge variant="outline" className="mb-3 w-fit capitalize">
            {pkg.type.replace("-", " ")}
          </Badge>
          <h3 className="font-display text-2xl font-black uppercase text-white">
            {pkg.name}
          </h3>
          {pkg.ages && (
            <p className="mt-1 text-sm text-accent-orange">{pkg.ages}</p>
          )}

          <div className="mt-4">
            {showPrice ? (
              <p className="font-display text-3xl font-black text-accent-orange">
                {pkg.priceLabel || formatPHP(pkg.price)}
              </p>
            ) : (
              <p className="text-lg font-semibold text-white/80">{pkg.priceLabel}</p>
            )}
            {pkg.sessions > 0 && (
              <p className="mt-1 text-sm text-white/50">
                {pkg.sessions} session{pkg.sessions > 1 ? "s" : ""}
                {pkg.validity && ` · ${pkg.validity}`}
                {pkg.period && ` · ${pkg.period}`}
              </p>
            )}
          </div>

          {pkg.description && (
            <p className="mt-4 text-sm text-white/60">{pkg.description}</p>
          )}

          <ul className="mt-4 flex-1 space-y-2">
            {pkg.skills?.map((skill) => (
              <li key={skill} className="flex items-start gap-2 text-sm text-white/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-orange" />
                {skill}
              </li>
            ))}
            {pkg.includes?.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-orange" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-xs text-white/40">
            {pkg.duration && (
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> {pkg.duration}
              </p>
            )}
            {pkg.schedule && (
              <p className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" /> {pkg.schedule}
              </p>
            )}
          </div>

          <Button asChild className="mt-6 w-full" variant={pkg.featured ? "default" : "outline"}>
            <EnrollLink packageId={pkg.id}>Enroll Now</EnrollLink>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
