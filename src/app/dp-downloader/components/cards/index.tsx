"use client";

import { buttonVariants } from "@/components/ui/button";
import { useThreadFormStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

export const InstagramProfileCard = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const threads = useThreadFormStore((state) => state.threads);

  useLayoutEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        setProfileData(threads);
        setLoading(false);
      } catch (err) {
        // setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [threads]);

  if (
    profileData === null ||
    typeof profileData === "undefined" ||
    !profileData.hasOwnProperty("data")
  ) {
    return null;
  }

  return (
    <AnimatePresence presenceAffectsLayout>
      {profileData && (
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div
            key={profileData?.data?.xdt_user_by_username?.full_name}
            className="overflow-hidden rounded-lg px-default shadow-md"
          >
            <div className="rounded-2xl border border-barcelona-media-outline bg-barcelona-secondary-background px-default py-4 text-white">
              <div className="grid grid-cols-[minmax(0,1fr)_max-content] items-center gap-4">
                <div className="col-start-1 col-end-auto">
                  <div className="relative flex flex-wrap items-center gap-4">
                    <h2 className="relative line-clamp-1 min-w-0 overflow-y-visible whitespace-pre-line break-words text-system-24 font-bold text-barcelona-primary-text">
                      {profileData?.data?.xdt_user_by_username?.full_name}
                    </h2>
                    <span className="block max-w-full overflow-x-hidden overflow-y-hidden text-ellipsis whitespace-nowrap text-barcelona-secondary-text">
                      {profileData?.data?.xdt_user_by_username?.follower_count} followers
                    </span>
                  </div>
                  <div className="mt-1 block">
                    <div className="flex items-center">
                      <span
                        className="relative min-w-0 overflow-y-visible whitespace-pre-line break-words text-system-15 text-barcelona-primary-text"
                        dir="auto"
                      >
                        <span className="block max-w-full overflow-x-hidden overflow-y-hidden text-ellipsis whitespace-nowrap">
                          {profileData?.data?.xdt_user_by_username?.username}
                        </span>
                      </span>
                      <div className="ml-1">
                        <div
                          className="touch-manipulation rounded-xl bg-barcelona-tertiary-background px-2 py-1.5 text-[.6875rem] text-barcelona-secondary-text ease-in-out"
                          role="button"
                          tabIndex={0}
                        >
                          instathreadsdown.com
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-start-2 col-end-auto">
                  <div
                    className="relative ml-0 flex cursor-pointer touch-manipulation overflow-hidden rounded-full bg-transparent p-0 transition"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="h-16 w-16 md:h-20 md:w-20">
                      <div className="h-full w-full rounded-full bg-barcelona-tertiary-text">
                        <Image
                          height={84}
                          width={84}
                          alt={`${profileData?.data?.xdt_user_by_username?.username}'s profile picture`}
                          className="origin-center rounded-full object-cover"
                          src={
                            profileData?.data?.xdt_user_by_username?.hd_profile_pic_versions[1].url ??
                            profileData?.data?.xdt_user_by_username?.hd_profile_pic_versions[0].url ??
                            profileData?.data?.xdt_user_by_username?.profile_pic_url
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <span className="relative block min-w-0 max-w-full overflow-y-visible whitespace-pre-line break-words text-system-15 text-barcelona-primary-text before:block before:h-0 before:content-[''] after:block after:h-0 after:content-['']">
                  {profileData?.data?.xdt_user_by_username?.biography_with_entities.raw_text}
                </span>
              </div>
            </div>
          </div>

          <div className="px-default py-4">
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full rounded-3xl px-default"
              )}
              href={`${process.env.NEXT_PUBLIC_APP_CDN}/${encodeURIComponent(
                profileData?.data?.xdt_user_by_username?.hd_profile_pic_versions[1].url ??
                  profileData?.data?.xdt_user_by_username?.hd_profile_pic_versions[0].url ??
                  profileData?.data?.xdt_user_by_username?.profile_pic_url
              )}`}
            >
              Download HD DP
            </Link>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
};
