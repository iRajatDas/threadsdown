import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const InstagramProfileCard = ({ profileData }) => {
  if (!profileData.hasOwnProperty("full_name")) {
    return null;
  }
  return (
    <div>
      <article className="rounded-lg shadow-md px-default overflow-hidden">
        <div className="py-4 text-white px-default bg-barcelona-secondary-background border-barcelona-media-outline border rounded-2xl">
          <div className="grid items-center grid-cols-[minmax(0,1fr)_max-content] gap-4">
            <div className="col-start-1 col-end-auto">
              <div className="relative flex items-center gap-4">
                <h2 className="text-barcelona-primary-text min-w-0 overflow-y-visible break-words relative font-bold text-system-24 whitespace-pre-line">
                  {profileData?.full_name}
                </h2>
                <span className="whitespace-nowrap text-ellipsis overflow-x-hidden block max-w-full overflow-y-hidden text-barcelona-secondary-text">
                  {profileData?.follower_count} followers
                </span>
              </div>
              <div className="block mt-1">
                <div className="flex items-center">
                  <span
                    className="min-w-0 overflow-y-visible break-words relative text-system-15 whitespace-pre-line text-barcelona-primary-text"
                    dir="auto"
                  >
                    <span className="whitespace-nowrap text-ellipsis overflow-x-hidden block max-w-full overflow-y-hidden">
                      {profileData?.username}
                    </span>
                  </span>
                  <div className="ml-1">
                    <div
                      className="bg-barcelona-tertiary-background touch-manipulation rounded-xl ease-in-out px-2 py-1.5 text-[.6875rem] text-barcelona-secondary-text"
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
                className="p-0 relative cursor-pointer flex ml-0 transition touch-manipulation bg-transparent rounded-full overflow-hidden"
                role="button"
                tabIndex={0}
              >
                <div className="h-16 w-16 md:h-20 md:w-20">
                  <div className="rounded-full h-full w-full bg-barcelona-tertiary-text">
                    <Image
                      height={84}
                      width={84}
                      alt={`${profileData?.username}'s profile picture`}
                      className="object-cover origin-center rounded-full"
                      src={
                        profileData?.hd_profile_pic_versions[1].url ??
                        profileData?.hd_profile_pic_versions[0].url ??
                        profileData?.profile_pic_url
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <span className="block min-w-0 max-w-full overflow-y-visible break-words relative text-system-15 whitespace-pre-line text-barcelona-primary-text before:block before:content-[''] before:h-0 after:block after:content-[''] after:h-0">
              {profileData?.biography_with_entities.raw_text}
            </span>
          </div>
        </div>
      </article>

      <div className="px-default py-4">
        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full rounded-3xl px-default"
          )}
          href={`${process.env.NEXT_PUBLIC_APP_CDN}/${encodeURIComponent(
            profileData?.hd_profile_pic_versions[1].url ??
              profileData?.hd_profile_pic_versions[0].url ??
              profileData?.profile_pic_url
          )}`}
        >
          Download HD DP
        </Link>
      </div>
    </div>
  );
};
