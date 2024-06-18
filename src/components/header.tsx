"use client";
import Link from "next/link";
import React from "react";
import IconThreads from "@/components/icons/icon-threads";
// import { Button } from "./ui/button";
import { LuMenu, LuX } from "react-icons/lu";
// import { Navigation } from "./nav";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Button } from "./ui/button";

const Header = () => {
  const menuListRef = React.useRef<HTMLUListElement>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const menuList = menuListRef.current;

    if (isMenuOpen && menuListRef.current) {
      // add on click listener to child list items to close the menu
      const menuItems = menuList?.querySelectorAll("li");
      const closeMenu = () => setIsMenuOpen(false);
      menuItems?.forEach((item) => {
        item.addEventListener("click", closeMenu);
      });
    }

    return () => {
      const menuItems = menuList?.querySelectorAll("li");
      menuItems?.forEach((item) => {
        item.removeEventListener("click", () => setIsMenuOpen(false));
      });
    };
  }, [isMenuOpen]);

  return (
    <div className="flex h-header-size shrink-0 items-center justify-between px-default lg:mt-10 lg:py-10">
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

      <Button size="icon" onClick={() => setIsMenuOpen(true)}>
        <LuMenu className="h-5 w-5" />
      </Button>
      {/* <Navigation /> */}

      {/* Menu */}
      {/* <ul className="flex items-center gap-x-4 text-muted-foreground md:text-system-14 md:leading-system-14">
        <li className="hover:text-barcelona-primary-text">
          <Link href={"/"}>Threads Downloader</Link>
        </li>
        <li className="hover:text-barcelona-primary-text">
          <Link href={"/"}>Blogs</Link>
        </li>
        <li className="hover:text-barcelona-primary-text">
          <Link href={"/about"}>About</Link>
        </li>
        <li className="hover:text-barcelona-primary-text">
          <Link href={"/contact"}>Contact</Link>
        </li>
      </ul> */}

      <Dialog
        as="div"
        className="relative z-[51] lg:hidden"
        open={isMenuOpen}
        onClose={setIsMenuOpen}
        unmount={false}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-20 flex h-full w-full flex-col overflow-y-auto bg-barcelona-elevated-background py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-barcelona-primary-text">
                Navigation
              </h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <LuX className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 p-4">
              <ul
                className="grid grid-cols-1 gap-4 pt-5 text-base font-bold md:text-2xl lg:grid-cols-2"
                ref={menuListRef}
              >
                <li>
                  <Link
                    href="/"
                    className="grid h-full w-full place-items-center rounded-xl border border-barcelona-elevated-border bg-barcelona-secondary-background bg-opacity-50 px-4 py-8 transition-all duration-300 ease-in-out hover:bg-opacity-25"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="grid h-full w-full place-items-center rounded-xl border border-barcelona-elevated-border bg-barcelona-secondary-background bg-opacity-50 px-4 py-8 transition-all duration-300 ease-in-out hover:bg-opacity-25"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/video-downloader"
                    className="grid h-full w-full place-items-center rounded-xl border border-barcelona-elevated-border bg-barcelona-secondary-background bg-opacity-50 px-4 py-8 transition-all duration-300 ease-in-out hover:bg-opacity-25"
                  >
                    Video Downloader
                  </Link>
                </li>
                <li>
                  <Link
                    href="/photo-downloader"
                    className="grid h-full w-full place-items-center rounded-xl border border-barcelona-elevated-border bg-barcelona-secondary-background bg-opacity-50 px-4 py-8 transition-all duration-300 ease-in-out hover:bg-opacity-25"
                  >
                    Photo Downloader
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dp-downloader"
                    className="grid h-full w-full place-items-center rounded-xl border border-barcelona-elevated-border bg-barcelona-secondary-background bg-opacity-50 px-4 py-8 transition-all duration-300 ease-in-out hover:bg-opacity-25"
                  >
                    DP Downloader
                  </Link>
                </li>
              </ul>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Header;
