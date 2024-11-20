/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    path: "/api/media",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/api/media': ['./tmp/**/*'],
    },
  },
};

module.exports = nextConfig;
