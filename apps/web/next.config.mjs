/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a minimal standalone server for Docker/VPS deploys.
  output: "standalone",
  reactStrictMode: true,
  images: {
    // Serve images directly (no server-side optimizer). The optimizer proxies
    // every image through the VPS, and Wikimedia 429-rate-limits bursts when a
    // page has 50+ photos, blanking them. Browsers load the CDN images fine.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Serve API-hosted college photo uploads under the site origin, so <img
  // src="/uploads/…"> works in dev (prod uses an nginx /uploads location).
  async rewrites() {
    const api = process.env.INTERNAL_API_URL || "http://localhost:4000";
    return [{ source: "/uploads/:path*", destination: `${api}/uploads/:path*` }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
