import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-muted-foreground space-y-4 p-default shrink-0">
      <ul className="flex items-center space-x-4 justify-center">
        <li>Privacy</li>
        <li>Terms</li>
        <li>Disclosure</li>
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
