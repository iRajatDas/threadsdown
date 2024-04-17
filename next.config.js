const { withContentlayer } = require("next-contentlayer");

const CDN = process.env.NEXT_PUBLIC_APP_CDN;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: [CDN, "scontent.cdninstagram.com"],
    remotePatterns: [
      {
        hostname: CDN ?? "https://cdn.instathreadsdown.com/",
      },
      {
        hostname: "scontent.cdninstagram.com",
      },
    ],
  },
};

module.exports = withContentlayer(nextConfig);
