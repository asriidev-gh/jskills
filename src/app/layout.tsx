import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { baseMetadata } from "@/lib/metadata";
import { PageLayout } from "@/components/layout/PageLayout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${oswald.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-court-dark font-body text-white antialiased"
        suppressHydrationWarning
      >
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
