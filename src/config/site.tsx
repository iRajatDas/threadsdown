type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Insta Threads Downloader",
  description:
    "Download Thread Videos and Photos In High Resolution For Free With Ease - Without Watermarks and Free Downloads",
  url: "https://instathreadsdown.com/",
  ogImage: "https://instathreadsdown.com/og.jpg",
  links: {
    twitter: "https://twitter.com/instaThreadsDown",
    github: "https://github.com/iRajatDas",
  },
};
