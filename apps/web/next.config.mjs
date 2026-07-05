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
