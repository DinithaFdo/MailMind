import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "avatar.vercel.sh",
      "via.placeholder.com",
      "images.unsplash.com",
      "img.clerk.com",
    ],
  },
  eslint: {
    // Warning only, don’t fail production build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
