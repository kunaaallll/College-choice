/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a minimal standalone server for Docker/VPS deploys.
  output: "standalone",
  reactStrictMode: true,
  images: {
    // Remote images (Unsplash placeholders now; swap for your CDN later).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" }, // auto-fetched college photos
      { protocol: "https", hostname: "**.collegechoice.example" },
    ],
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
