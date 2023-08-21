import React from "react";
import EntrySection from "../components/section-entry";
import FormSection from "../components/section-from";
import AlertSection from "../components/section-alert";
import FAQSection from "../components/section-faq";
import ThreadsSection from "../components/section-threads";

// import { allPosts } from "";
import { compareDesc } from "date-fns";
import Image from "next/image";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { LuChevronRight } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
  title: "Download DP, Photos & Videos from Threads",
  description:
    "Threads DP Photos Downloader is a tool to download DP, Photos & Videos from Threads. No Limit Downloads.",
  alternates: {
    canonical: "/dp-downloader",
  },
};

const profileData = {
  is_private: false,
  profile_pic_url:
    "https://scontent.cdninstagram.com/v/t51.2885-19/357834101_977883033280721_3449271728947456340_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=myAcPtBfnA4AX_r-UKk&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCHn6yXksQ70tfxlED7-32OEDNwrKN6dSyobeHeivP4Xg&oe=64E7A062&_nc_sid=10d13b",
  username: "rajatdas.me",
  hd_profile_pic_versions: [
    {
      height: 320,
      url: "https://scontent.cdninstagram.com/v/t51.2885-19/357834101_977883033280721_3449271728947456340_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=myAcPtBfnA4AX_r-UKk&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBDfjrJAwFCKijroregIM3_I1oBBN7TBUi__nPNQByigw&oe=64E7A062&_nc_sid=10d13b",
      width: 320,
    },
    {
      height: 640,
      url: "https://scontent.cdninstagram.com/v/t51.2885-19/357834101_977883033280721_3449271728947456340_n.jpg?stp=dst-jpg_s640x640&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=myAcPtBfnA4AX_r-UKk&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAbPfO5R9u7IQmOzWXNRD4yKiHpC4FHuWRTND_6l2GwVQ&oe=64E7A062&_nc_sid=10d13b",
      width: 640,
    },
  ],
  is_verified: false,
  biography:
    "👨‍💻 Web developer sharing coding tips & insights\n🌏 Delhi, India\n🔥 Tech enthusiast\n👇 Subscribe on YouTube\n#webdevelopment #codingtips #programmer",
  biography_with_entities: {
    entities: [],
    raw_text:
      "👨‍💻 Web developer sharing coding tips & insights\n🌏 Delhi, India\n🔥 Tech enthusiast\n👇 Subscribe on YouTube\n#webdevelopment #codingtips #programmer",
  },
  follower_count: 7,
  profile_context_facepile_users: null,
  bio_links: [{ url: "url" }],
  pk: "4194434228",
  full_name: "Rajat Das",
  id: null,
};

const DpDownloader = async () => {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .splice(0, 4);
  return (
    <>
      <EntrySection />
      <FormSection />
      <InstagramProfileCard profileData={profileData} />
      <ThreadsSection />
      <AlertSection />
      <FAQSection />
      <div className="px-default py-4 mt-10 space-y-4">
        <h2 className="text-3xl md:text-system-28 md:leading-system-28 font-extrabold tracking-tight">
          Our Blog
        </h2>
        <div className="space-y-6 py-6">
          {posts?.length ? (
            <>
              <div className="grid gap-10 sm:grid-cols-2">
                {posts.map((post, index) => (
                  <article
                    key={post._id}
                    className="group relative flex flex-col space-y-2"
                  >
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={804}
                        height={452}
                        className="rounded-md border bg-muted transition-colors"
                        priority={index <= 1}
                      />
                    )}
                    <h2 className="text-2xl font-extrabold">{post.title}</h2>
                    {post.description && (
                      <p className="text-muted-foreground line-clamp-3">
                        {post.description}
                      </p>
                    )}
                    {post.date && (
                      <p className="text-sm text-muted-foreground">
                        {formatDate(post.date)}
                      </p>
                    )}
                    <Link href={post.slug} className="absolute inset-0">
                      <span className="sr-only">View Article</span>
                    </Link>
                  </article>
                ))}
              </div>
              <hr className="mt-12" />
              <div className="flex justify-center py-6 lg:py-10">
                <Link
                  href="/blog"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "space-x-2"
                  )}
                >
                  <p>See all posts</p>
                  <LuChevronRight />
                </Link>
              </div>
            </>
          ) : (
            <p>No posts published.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DpDownloader;

const InstagramProfileCard = ({ profileData }) => {
  return (
    <article className="rounded-lg shadow-md px-default overflow-hidden">
      <div className="py-4 text-white px-default bg-barcelona-secondary-background border-barcelona-media-outline border rounded-2xl">
        <div className="grid items-center grid-cols-[minmax(0,1fr)_max-content] gap-4">
          <div className="col-start-1 col-end-auto">
            <div className="relative flex items-center gap-4">
              <h2 className="text-barcelona-primary-text min-w-0 overflow-y-visible break-words relative font-bold text-system-24 whitespace-pre-line">
                {profileData.full_name}
              </h2>
              <span className="whitespace-nowrap text-ellipsis overflow-x-hidden block max-w-full overflow-y-hidden text-barcelona-secondary-text">
                {profileData.follower_count} followers
              </span>
            </div>
            <div className="block mt-1">
              <div className="flex items-center">
                <span
                  className="min-w-0 overflow-y-visible break-words relative text-system-15 whitespace-pre-line text-barcelona-primary-text"
                  dir="auto"
                >
                  <span className="whitespace-nowrap text-ellipsis overflow-x-hidden block max-w-full overflow-y-hidden">
                    {profileData.username}
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
                    alt={`${profileData.username}'s profile picture`}
                    className="object-cover origin-center rounded-full"
                    src={
                      profileData.hd_profile_pic_versions[1].url ??
                      profileData.hd_profile_pic_versions[0].url ??
                      profileData.profile_pic_url
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <span className="block min-w-0 max-w-full overflow-y-visible break-words relative text-system-15 whitespace-pre-line text-barcelona-primary-text before:block before:content-[''] before:h-0 after:block after:content-[''] after:h-0">
            {profileData.biography_with_entities.raw_text}
          </span>
        </div>
      </div>
    </article>
  );
};
