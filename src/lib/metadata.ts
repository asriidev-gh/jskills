import type { Metadata } from "next";
import { SITE_LOGO, SITE_NAME } from "@/lib/site";

const siteName = SITE_NAME;
const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://coach-edmar.vercel.app";
const siteUrl = siteOrigin;
const defaultDescription =
  "Play with excellence play with Purpose. Train skills, mold character, preach the Gospel. 1-on-1 and group basketball training in BGC, Greenhills, and Quezon City.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Skills Training Metro Manila`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "basketball training Manila",
    "basketball clinic Philippines",
    "JSkills",
    "Coach Edmar",
    "youth basketball training",
    "1-on-1 basketball coaching",
    "BGC basketball",
    "Greenhills basketball",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: `${siteOrigin}${SITE_LOGO}`,
        width: 800,
        height: 400,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: SITE_LOGO,
    apple: SITE_LOGO,
  },
};

export function createPageMetadata(
  title: string,
  description?: string
): Metadata {
  return {
    title,
    description: description || defaultDescription,
    openGraph: {
      title: `${title} | ${siteName}`,
      description: description || defaultDescription,
    },
  };
}
