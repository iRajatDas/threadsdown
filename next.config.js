const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "scontent.cdninstagram.com",
    ],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

module.exports = withContentlayer(nextConfig);
