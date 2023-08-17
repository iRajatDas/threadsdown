const { withContentlayer } = require("next-contentlayer");

const CDN = process.env.NEXT_PUBLIC_APP_CDN;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      CDN,
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "getthreads.cdn-threads.workers.dev",
      "scontent.cdninstagram.com",
    ],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

module.exports = withContentlayer(nextConfig);
