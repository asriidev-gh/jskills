import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/schedule", destination: "/#schedule", permanent: false },
    ];
  },
};

export default nextConfig;
