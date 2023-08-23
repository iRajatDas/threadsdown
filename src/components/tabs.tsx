"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Tabs = () => {
  const pathname = usePathname();
  return (
    <div className="overflow-hidden rounded-2xl border bg-barcelona-secondary-background">
      <div className="flex items-center overflow-x-auto scrollbar-none">
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full whitespace-pre rounded-none py-6 hover:bg-barcelona-media-outline",
            pathname === "/" ? "bg-barcelona-media-outline" : ""
          )}
        >
          All Media
        </Link>
        <Link
          href={"/photo-downloader"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full whitespace-pre rounded-none py-6 hover:bg-barcelona-media-outline",
            pathname?.includes("photo-downloader")
              ? "bg-barcelona-media-outline"
              : ""
          )}
        >
          Photos
        </Link>
        <Link
          href={"/video-downloader"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full whitespace-pre rounded-none py-6 hover:bg-barcelona-media-outline",
            pathname?.includes("video-downloader")
              ? "bg-barcelona-media-outline"
              : ""
          )}
        >
          Videos
        </Link>
        <Link
          href={"/dp-downloader"}
          aria-disabled={true}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full whitespace-pre rounded-none py-6 hover:bg-barcelona-media-outline",
            pathname?.includes("dp-downloader")
              ? "bg-barcelona-media-outline"
              : ""
          )}
        >
          Threads DP
        </Link>
      </div>
    </div>
  );
};

export default Tabs;
