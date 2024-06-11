import { absoluteUrl } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { allPages } from "contentlayer/generated";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const sortedPages = allPages
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <footer className="shrink-0 space-y-4 p-default text-muted-foreground">
      <ul className="flex items-center justify-center space-x-4">
        {sortedPages.map((page) => {
          let title: string;
          if (
            page.slugAsParams === "term-of-use" ||
            page.slugAsParams === "privacy-policy"
          ) {
            title = page.title.replace(" for Insta Threads Down", "");
          } else title = page.title;
          return (
            <li key={page._id}>
              <Link href={absoluteUrl(page.slugAsParams)}>{title}</Link>
            </li>
          );
        })}

        <li>
          <Link href="/ig/insta-dp-viewer">Instagram DP</Link>
        </li>
      </ul>
      <p className="text-center text-sm">
        <span>Give us a follow 👉 </span>
        <Link href={"/"} className="text-barcelona-primary-text">
          @rajatdas.me
        </Link>
        <span className="block">
          © 2023 - 2024{" "}
          <Link href={"/"} className="text-barcelona-link-text">
            InstaThreadsDown
          </Link>
        </span>
        <span className="block">
          <Link
            href={"https://github.com/iRajatDas"}
            className="inline-flex items-center py-2 gap-1 text-barcelona-primary-text"
          >
            <GitHubLogoIcon /> GitHub
          </Link>
        </span>
      </p>
      <p className="to-barcelona-secondary-text text-center text-sm">
        Not affiliated with Meta, Threads or any 3rd party.
      </p>
    </footer>
  );
};

export default Footer;
