"use client";

import { usePathname } from "next/navigation";
import { AnimatedNavbar } from "@/components/layout/AnimatedNavbar";
import { Footer } from "@/components/layout/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute =
    pathname === "/login" || pathname?.startsWith("/dashboard");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatedNavbar />
      <main className="min-h-screen bg-court-dark">{children}</main>
      <Footer />
    </>
  );
}
