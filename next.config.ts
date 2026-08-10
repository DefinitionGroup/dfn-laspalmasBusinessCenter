import type { NextConfig } from "next";
import path from "node:path";
import { legacyRedirects } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "laspalmasbusiness.center" }],
        destination: "https://www.laspalmasbusiness.center/es",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "laspalmasbusiness.center" }],
        destination: "https://www.laspalmasbusiness.center/:path*",
        permanent: true,
      },
      ...legacyRedirects.map((redirect) => ({ ...redirect, permanent: true })),
    ];
  },
};

export default nextConfig;
