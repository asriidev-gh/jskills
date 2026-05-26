import { AnimatedNavbar } from "@/components/layout/AnimatedNavbar";
import { Footer } from "@/components/layout/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <AnimatedNavbar />
      <main className="min-h-screen bg-court-dark">{children}</main>
      <Footer />
    </>
  );
}
