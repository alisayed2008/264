import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  // Kept intentionally minimal for Phase 1. Image domains for property media
  // (MediaStorageProvider — ARCHITECTURE.md §12) get added once that provider
  // is chosen; nothing here should assume Vercel Blob, S3, or Cloudinary yet.
  images: {
    remotePatterns: [],
  },

  // Standard baseline headers — not a full CSP, which needs real external
  // domains (image/media provider, etc.) that haven't been chosen yet
  // (ARCHITECTURE.md §12). SECURITY.md doesn't name specific HTTP headers;
  // this is the simplest production-safe default in the meantime.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
