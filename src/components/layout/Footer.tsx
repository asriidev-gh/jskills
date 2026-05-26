import Link from "next/link";
import { Mail, MapPin, Phone, Share2 } from "lucide-react";
import { contact } from "@/lib/clinic-data";
import { Logo } from "@/components/shared/Logo";
import { ContactDeveloperButton } from "@/components/layout/ContactDeveloperModal";

const footerLinks = [
  { href: "/#about", label: "About" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#coaches", label: "Coach Edmar" },
  { href: "/#programs", label: "Programs" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#enroll", label: "Enroll" },
  { href: "/shop", label: "Shop" },
  { href: "/news", label: "Tips & Blog" },
  { href: "/#faq", label: "FAQs" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-court-darker">
      <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo size="lg" />
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Train skills mold character preach the Gospel. Basketball development
              for all ages and skill levels across Metro Manila.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-orange">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-orange">
              Locations
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              {contact.locations.map((loc) => (
                <li key={loc} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-orange" />
                  {loc}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-orange">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent-orange" />
                <a href={contact.phoneLink} className="hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent-orange" />
                <a href={`mailto:${contact.email}`} className="hover:text-white break-all">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-accent-orange" />
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:w-full">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} JSkills Basketball Clinic. All Rights Reserved.
            </p>
            <p className="text-xs text-white/40 italic">
              &ldquo;No longer I but Christ&rdquo;
            </p>
          </div>
          <ContactDeveloperButton />
        </div>
      </div>
    </footer>
  );
}
