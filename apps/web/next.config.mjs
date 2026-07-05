/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a minimal standalone server for Docker/VPS deploys.
  output: "standalone",
  reactStrictMode: true,
  images: {
    // Remote images (Unsplash placeholders now; swap for your CDN later).
    // Allow any https image host — college photos come from Wikimedia and the
    // colleges' own official websites (many different domains).
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
