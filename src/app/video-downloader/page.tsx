import React from "react";
import EntrySection from "@/app/components/section-entry";
import FormSection from "@/app/components/section-from";
import AlertSection from "@/app/components/section-alert";
import FAQSection from "@/app/components/section-faq";
import ThreadsSection from "@/app/components/section-threads";

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
  title: "Download Videos, Photos & DP from Threads",
  description:
    "Threads Downloader is a tool to download Videos, Photos & DP from Threads. No Limit Downloads.",
  alternates: {
    canonical: "/video-downloader",
  },
};

const VideoDownloader = async () => {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .splice(0, 4);
  return (
    <>
      <EntrySection
        title="Threads Downloader"
        description="Download Videos, Photos & DP from Threads"
      />
      <FormSection />
      <ThreadsSection />
      <AlertSection />
      <FAQSection />
      <div className="mt-10 space-y-4 px-default py-4">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-system-28 md:leading-system-28">
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
                    <h2
                      className="line-clamp-2 text-2xl font-extrabold"
                      title={post.title}
                    >
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="line-clamp-3 text-muted-foreground">
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

export default VideoDownloader;
