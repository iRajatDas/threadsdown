import { absoluteUrl } from "@/lib/utils";
import { allPages } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="shrink-0 space-y-4 p-default text-muted-foreground">
      <ul className="flex items-center justify-center space-x-4">
        {allPages.map((page) => (
          <li key={page._id}>
            <Link href={absoluteUrl(page.slugAsParams)}>{page.title}</Link>
          </li>
        ))}
      </ul>
      <p className="text-center text-sm">
        © 2023{" "}
        <Link href={"/"} className="text-barcelona-link-text">
          InstaThreadsDown
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
