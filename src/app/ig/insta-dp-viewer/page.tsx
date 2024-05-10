import React from "react";
import EntrySection from "@/app/components/section-entry";
import FormSection from "@/app/components/section-from";
import AlertSection from "@/app/components/section-alert";
// import FAQSection from "@/app/components/section-faq";

// import { allPosts } from "";
import { compareDesc } from "date-fns";
import Image from "next/image";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { LuChevronRight } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { Metadata } from "next";
import ThreadsSection from "@/app/components/section-threads";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
  alternates: {
    canonical: "/",
  },
};

const Homepage = async () => {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .splice(0, 4);
  return (
    <>
      <EntrySection
        title="Instagram Profile Picture Download"
        description="Download & View Instagram Profile Picture in HD"
      />
      <FormSection />
      <ThreadsSection />
      <AlertSection />

      <div className="mt-10 space-y-4 px-default py-4">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-system-28 md:leading-system-28">
          Why Insta DP Viewer?
        </h2>
        <article className="prose text-zinc-400 lg:prose-lg prose-headings:text-white">
          <p>
            You have lots of friends on Instagram and you followed them and you
            see their photos or video easily but when you want to see their
            Instagram profile and want to save them in your phone gallery and
            try to download them but you can’t save them because Instagram
            didn’t allow directly to download Instagram profile picture in your
            phone gallery.
          </p>
          <p>
            So, we have decided to serve you free and fast services and launch
            Insta DP Viewer which allows you to Instagram dp download directly
            in your phone gallery.
          </p>
          <p>
            Because we know we all loved memories and want to save them because
            when we miss our close friends, relatives and Cousins we want to see
            them.
          </p>
          <p>
            So, here insta dp viewer helps you to save you memories by
            downloading Instagram profile picture and see when you want to miss
            them in your phone or you can also download your own old memories
            which you uploaded in past.
          </p>
          <h2>Insta DP Viewer</h2>
          <p>
            Insta DP Viewer, why we called Insta DP Viewer. So here, Insta
            stands for Instagram and DP is stands for Desktop Profile (Profile
            Photo) and the viewer is knowing to visit the DP of your friend and
            family. The name of our Tool is not kept by us, it is given by you
            users, because most of our users search insta DP viewer for
            Instagram profile download.
          </p>
          <h2>Insta DP Download</h2>
          <p>
            You think downloading Insta DP is difficult. Ohh! Let forget, It is
            too old talks when the Instagram Profile Photo Downloading is
            difficult until we didn’t launch our tool. Our tool is solving you
            all problem regarding downloading any Instagram DP. Downloading
            Instagram DP is really simple to work you just copy the profile URL
            and paste it inside the input box of InstaThreadsDown and click the search
            button.
          </p>
          <p>
            We offer you 2 options after pasting the profile URL. First is the
            View button that helps you to show the Profile Picture in HD without
            downloading and the Second option is for downloading the profile
            picture. We provide you both options choose it which is suitable for
            you.
          </p>
        </article>
      </div>
      {/* <FAQSection /> */}

      <div className="mt-10 space-y-4 px-default py-4">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-system-28 md:leading-system-28">
          Read some articles
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

export default Homepage;
