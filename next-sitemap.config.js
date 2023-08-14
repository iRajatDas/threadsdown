const { allPosts } = require("contentlayer/generated");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://instathreadsdown.com",
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,

  transform: async (config, path) => {
    // Check if the path matches a ContentLayer post slug
    const matchedPost = allPosts.find((post) => post.slug === path);

    if (matchedPost) {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: matchedPost.date.toISOString(), // Use the actual date of the post
        alternateRefs: config.alternateRefs ?? [],
      };
    }

    // For other paths, use the default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => [
    // Add additional paths if needed
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
