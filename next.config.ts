import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "via.placeholder.com",
      },
      {
        hostname: "www.tezuka.xyz",
      },
    ],
  },
};

export default nextConfig;
