import Link from "next/link";
import React from "react";
import IconThreads from "@/components/icons/icon-threads";
import { Button } from "./ui/button";
import { LuMenu } from "react-icons/lu";
import { Navigation } from "./nav";

const Header = () => {
  return (
    <div className="flex h-header-size shrink-0 items-center justify-between px-default lg:py-10 lg:mt-10">
      <Link href={"/"} className="group flex">
        <div
          className="mr-2 select-none transition-all duration-150 ease-in-out group-hover:scale-105"
          role="button"
          tabIndex={0}
        >
          <IconThreads className="h-6 w-6 fill-white" />
        </div>
        <p className="select-none text-lg font-semibold tracking-tight">
          Insta <strong className="font-bold">Threads</strong> Downloader
        </p>
      </Link>

      {/* <Button size="icon">
        <LuMenu className="h-5 w-5" />
      </Button> */}
      <Navigation/>
    </div>
  );
};

export default Header;
