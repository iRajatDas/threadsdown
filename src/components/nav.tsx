import React from "react";
import { Button } from "@/components/ui/button";
import { absoluteUrl } from "@/lib/utils";
import { allPages } from "contentlayer/generated";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const SHEET_SIDES = ["top"] as const;

type Navigation = (typeof SHEET_SIDES)[number];

export function Navigation() {
  const sortedPages = allPages
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="grid-cols-gap-2 grid">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" size={"lg"}>
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent
            side={side}
            className="mx-auto max-w-3xl rounded-b-3xl border bg-barcelona-tertiary-background"
          >
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Navigate to your desired tool with ease just click any menu item
                from below
              </SheetDescription>
            </SheetHeader>
            <ul className="grid grid-cols-1 gap-4 pt-5 text-base font-bold md:text-2xl lg:grid-cols-2">
              <li>
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="grid h-full w-full place-items-center rounded-xl border border-barcelona-elevated-border bg-barcelona-secondary-background bg-opacity-50 px-4 py-8 transition-all duration-300 ease-in-out hover:bg-opacity-25"
                  >
                    Home
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link
                    href="/video-downloader"
                    className="grid h-full w-full place-items-center rounded-xl border border-barcelona-elevated-border bg-barcelona-secondary-background bg-opacity-50 px-4 py-8 transition-all duration-300 ease-in-out hover:bg-opacity-25"
                  >
                    Video Downloader
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link
                    href="/photo-downloader"
                    className="grid h-full w-full place-items-center rounded-xl border border-barcelona-elevated-border bg-barcelona-secondary-background bg-opacity-50 px-4 py-8 transition-all duration-300 ease-in-out hover:bg-opacity-25"
                  >
                    Photo Downloader
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link
                    href="/dp-downloader"
                    className="grid h-full w-full place-items-center rounded-xl border border-barcelona-elevated-border bg-barcelona-secondary-background bg-opacity-50 px-4 py-8 transition-all duration-300 ease-in-out hover:bg-opacity-25"
                  >
                    DP Downloader
                  </Link>
                </SheetClose>
              </li>
            </ul>
            <div className="mt-10 flex lg:items-center flex-col lg:flex-row gap-4 lg:mt-5">
              {/* <SheetClose asChild>
                <Button type="submit">Close</Button>
              </SheetClose> */}
              <p>Pages: </p>
              <ul className="flex flex-col lg:items-center lg:space-x-4 font-medium text-barcelona-secondary-text lg:flex-row">
                {sortedPages.map((page) => {
                  let title: string;
                  if (
                    page.slugAsParams === "term-of-use" ||
                    page.slugAsParams === "privacy-policy"
                  ) {
                    title = page.title.replace(" for Insta Threads Down", "");
                  } else title = page.title;
                  return (
                    <li
                      key={page._id}
                      className="hover:text-barcelona-primary-text"
                    >
                      <Link href={absoluteUrl(page.slugAsParams)}>{title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
