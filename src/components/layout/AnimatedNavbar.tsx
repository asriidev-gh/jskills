"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { EnrollLink } from "@/components/shared/EnrollLink";
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#coaches", label: "Coach" },
  { href: "/#programs", label: "Programs" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/shop", label: "Shop" },
  { href: "/news", label: "Tips" },
  { href: "/#contact", label: "Contact" },
];

export function AnimatedNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={scrolled ? "scrolled" : "top"}
        variants={{
          top: {
            backgroundColor: "rgba(10, 10, 15, 0)",
            backdropFilter: "blur(0px)",
          },
          scrolled: {
            backgroundColor: "rgba(10, 10, 15, 0.9)",
            backdropFilter: "blur(20px)",
          },
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-colors"
        style={{
          borderBottomColor: scrolled ? "rgba(255, 107, 53, 0.15)" : "transparent",
        }}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo size="lg" />

          <div className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:block">
            <Button asChild size="sm">
              <EnrollLink>Enroll Now</EnrollLink>
            </Button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-white xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-court-dark/98 backdrop-blur-xl xl:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex h-full flex-col items-center justify-center gap-1 overflow-y-auto p-8"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-xl font-bold uppercase tracking-wide text-white hover:text-accent-orange"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6"
              >
                <Button asChild>
                  <EnrollLink>Enroll Now</EnrollLink>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
