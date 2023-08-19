"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useThreadFormStore } from "@/lib/store";

const ThreadsSection = () => {
  const [mediaData, setMediaData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const threads = useThreadFormStore((state) => state.threads);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMediaData(threads);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [threads]);

  // console.log(loading,mediaData);

  return (
    <div className="px-default py-4 --mt-10 space-y-4">
      <Suspense fallback={<LuLoader className="animate-spin" />}>
        <div className="[&_p:last-child]:text-slate-500 [&_p:first-child]:text-lg divide-y divide-barcelona-media-outline">
          {mediaData?.length !== 0
            ? mediaData?.media.map(
                (
                  {
                    user,
                    type,
                    media,
                    width,
                    height,
                    caption,
                    has_audio,
                    taken_at,
                    thumbnail,
                  },
                  i
                ) => (
                  <article key={`username-${i}`} className="p-4- py-6">
                    {type === "video" ? (
                      <Post
                        caption={caption}
                        username={user.username}
                        date="1h"
                        content="Hello"
                        src={user.profile_pic_url}
                      >
                        <div
                          className={cn(
                            "w-full relative min-h-{20rem} h-auto mb-4",
                            thumbnail ? "z-10" : ""
                          )}
                        >
                          <video
                            loop
                            muted
                            autoPlay
                            playsInline
                            preload="metadata"
                            crossOrigin="anonymous"
                            className="rounded-3xl"
                          >
                            <source
                              src={`${
                                process.env.NEXT_PUBLIC_APP_CDN
                              }/${encodeURIComponent(media[0].url)}`}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </Post>
                    ) : type === "photo" ? (
                      <Post
                        caption={caption}
                        username={user.username}
                        date="1h"
                        content="Hello"
                        src={user.profile_pic_url}
                      >
                        <div
                          className={cn(
                            "w-full relative min-h-{20rem} h-auto mb-4",
                            thumbnail ? "z-10" : ""
                          )}
                        >
                          <Image
                            width={800}
                            height={800}
                            style={{ objectFit: "cover" }}
                            className="rounded-3xl"
                            src={media[0].url}
                            alt="Image"
                          />
                        </div>
                      </Post>
                    ) : type === "photos_and_videos" ? (
                      // n
                      <div className="space-y-6">
                        {/* {<pre>{JSON.stringify(media)}</pre>} */}
                        {media.videos && media.videos.length > 0
                          ? media.videos.map((video, i) => (
                              <Post
                                key={i}
                                caption={caption}
                                username={user.username}
                                date="1h"
                                content="Hello"
                                src={user.profile_pic_url}
                              >
                                <div
                                  className={cn(
                                    "w-full relative min-h-{20rem} h-auto mb-4",
                                    thumbnail ? "z-10" : ""
                                  )}
                                >
                                  <video
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                    preload="metadata"
                                    crossOrigin="anonymous"
                                    className="rounded-3xl"
                                  >
                                    <source
                                      src={`${
                                        process.env.NEXT_PUBLIC_APP_CDN
                                      }/${encodeURIComponent(video.url)}`}
                                      type="video/mp4"
                                    />
                                  </video>
                                </div>
                              </Post>
                            ))
                          : null}
                        {media.photos &&
                          media.photos.map((photo, i) => (
                            <Post
                              key={i}
                              caption={caption}
                              username={user.username}
                              date="1h"
                              content="Hello"
                              src={user.profile_pic_url}
                            >
                              <div
                                className={cn(
                                  "w-full relative min-h-{20rem} h-auto mb-4",
                                  thumbnail ? "z-10" : ""
                                )}
                              >
                                <Image
                                  width={800}
                                  height={800}
                                  style={{ objectFit: "cover" }}
                                  className="rounded-3xl"
                                  src={photo.url}
                                  alt="Image"
                                />
                              </div>
                            </Post>
                          ))}
                      </div>
                    ) : // n
                    type === "videos" ? (
                      <div className="space-y-6">
                        {media && media.length > 0
                          ? media.map((video) => (
                              <Post
                                key={video}
                                caption={caption}
                                username={user.username}
                                date="1h"
                                content="Hello"
                                src={user.profile_pic_url}
                              >
                                <div
                                  className={cn(
                                    "w-full relative min-h-{20rem} h-auto mb-4",
                                    thumbnail ? "z-10" : ""
                                  )}
                                >
                                  <video
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                    preload="metadata"
                                    crossOrigin="anonymous"
                                    className="rounded-3xl"
                                  >
                                    <source
                                      src={`${
                                        process.env.NEXT_PUBLIC_APP_CDN
                                      }/${encodeURIComponent(video.url)}`}
                                      type="video/mp4"
                                    />
                                  </video>
                                </div>
                              </Post>
                            ))
                          : null}
                      </div>
                    ) : type === "photos" ? (
                      <div className="space-y-6">
                        {media && media.length > 0
                          ? media.map((photo) => (
                              <Post
                                key={photo}
                                caption={caption}
                                username={user.username}
                                date="1h"
                                content="Hello"
                                src={user.profile_pic_url}
                              >
                                <div
                                  className={cn(
                                    "w-full relative min-h-{20rem} h-auto mb-4",
                                    thumbnail ? "z-10" : ""
                                  )}
                                >
                                  <Image
                                    width={800}
                                    height={800}
                                    style={{ objectFit: "cover" }}
                                    className="rounded-3xl"
                                    src={photo.url}
                                    alt="Image"
                                  />
                                </div>
                              </Post>
                            ))
                          : null}
                      </div>
                    ) : // unknown
                    null}
                  </article>
                )
              )
            : null}
        </div>
      </Suspense>
    </div>
  );
};

export default ThreadsSection;

interface Props {
  content: string;
  username: string;
  date: string;
  src: string;
  caption: string;
  children?: ReactNode;
  onClick?: () => void;
}

const Post = ({
  content,
  username,
  date,
  children,
  src,
  caption,
  onClick,
  ...props
}: Props) => (
  <div className="flex flex-1 gap-x-4" {...props}>
    <div className="flex-shrink-0">
      <Image
        height="36"
        width="36"
        alt="rajatdas.me's profile picture"
        className="object-cover origin-center rounded-full"
        crossOrigin="anonymous"
        src="https://scontent.cdninstagram.com/v/t51.2885-19/357834101_977883033280721_3449271728947456340_n.jpg?stp=dst-jpg_s150x150&amp;_nc_ht=scontent.cdninstagram.com&amp;_nc_cat=105&amp;_nc_ohc=TIsz2OnSVLkAX-hiUTe&amp;edm=APs17CUBAAAA&amp;ccb=7-5&amp;oh=00_AfDfK8lfnAcHfe9DyZUm408kHnUDhxflp6x7feupohlBwg&amp;oe=64E1B1A2&amp;_nc_sid=10d13b"
      />
    </div>
    <div className="flex flex-col flex-1">
      <div className="flex flex-1">
        <div className="flex flex-1 gap-x-1 text-base">
          <span className="text-slate-200 font-bold">@{username}</span>
          <span className="text-slate-500 font-medium">{date}</span>
        </div>
        <div className="">{/* <DropdownMenuDemo /> */}</div>
      </div>
      <div className="text-muted-foreground text-base md:py-2 mb-4">
        {caption}
      </div>
      {children}
      <div>
        <div className="flex gap-x-10 xl:gap-x-14 text-base text-slate-100 [&_li:first-child]:hidden [&_li:first-child]:lg:flex [&_li]:flex [&_li]:items-center [&_li]:gap-x-2 [&_li:xl]:gap-x-3 ">
          <Button
            onClick={onClick}
            className="w-full rounded-3xl text-opacity-100 bg-opacity-70"
          >
            Download
          </Button>

          {/* <li className="">
            <HiOutlineChartBarSquare className="w-5 h-5" />
            20
          </li>
          <li>
            <HiOutlineChatBubbleOvalLeft className="w-5 h-5" />2
          </li>
          <li>
            <HiOutlineArrowPath className="w-5 h-5" />1
          </li>
          <li>
            <HiOutlineHeart className="w-5 h-5" />
            23
          </li>
          <li>
            <HiArrowUpTray className="w-5 h-5" />
          </li> */}
        </div>
      </div>
    </div>
  </div>
);
