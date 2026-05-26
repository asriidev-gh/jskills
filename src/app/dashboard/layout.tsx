import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "Dashboard | JSkills Admin",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200/80 text-gray-900">
      <DashboardHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
