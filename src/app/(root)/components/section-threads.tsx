"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn, timeAgo } from "@/lib/utils";
import { useThreadFormStore } from "@/lib/store";
import Link from "next/link";
function isPortrait(width: number, height: number) {
  return height > width;
}

const ThreadsSection = () => {
  const [mediaData, setMediaData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const threads = useThreadFormStore((state) => state.threads);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        setMediaData(threads);
        setLoading(false);
      } catch (err) {
        // setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [threads]);

  return (
    <div className="--mt-10 space-y-4 px-default py-4">
      <div className="divide-y divide-barcelona-media-outline [&_p:first-child]:text-lg [&_p:last-child]:text-slate-500">
        {mediaData?.length !== 0 ? (
          mediaData?.media?.map(
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
                    date={timeAgo(taken_at)}
                    content="Hello"
                    src={user.profile_pic_url}
                    downloadable={`${
                      process.env.NEXT_PUBLIC_APP_CDN
                    }/${encodeURIComponent(media.url)}`}
                  >
                    <div
                      className={cn(
                        "min-h-{20rem} relative mb-4 w-1/2 sm:w-1/3 md:w-1/2",
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
                          }/${encodeURIComponent(media.url)}`}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </Post>
                ) : type === "photo" ? (
                  <Post
                    caption={caption}
                    username={user.username}
                    date={timeAgo(taken_at)}
                    content="Hello"
                    src={user.profile_pic_url}
                    downloadable={`${
                      process.env.NEXT_PUBLIC_APP_CDN
                    }/${encodeURIComponent(media[0].url)}`}
                  >
                    <div
                      className={cn(
                        "min-h-{20rem} relative mb-4 w-full rounded-3xl border border-barcelona-elevated-border/10 sm:w-1/3 md:w-1/2 lg:w-3/4 xl:w-1/2 select-none",
                        thumbnail ? "z-10" : ""
                      )}
                    >
                      <Image
                        width={800}
                        height={800}
                        style={{ objectFit: "cover" }}
                        className="rounded-3xl pointer-events-none"
                        src={media[0].url}
                        alt="Image"
                      />
                    </div>
                  </Post>
                ) : type === "photos_and_videos" ? (
                  // n
                  <>
                    <div className="space-y-6">
                      {/* {<pre>{JSON.stringify(media)}</pre>} */}
                      {media.videos && media.videos.length > 0
                        ? media.videos.map((video, i) => (
                            <Post
                              key={i}
                              caption={caption}
                              username={user.username}
                              date={timeAgo(taken_at)}
                              content="Hello"
                              src={user.profile_pic_url}
                              downloadable={`${
                                process.env.NEXT_PUBLIC_APP_CDN
                              }/${encodeURIComponent(video.url)}`}
                            >
                              <div
                                className={cn(
                                  "min-h-{20rem} relative mb-4 w-1/2 sm:w-1/3 md:w-1/2",
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
                            date={timeAgo(taken_at)}
                            content="Hello"
                            src={user.profile_pic_url}
                            downloadable={`${
                              process.env.NEXT_PUBLIC_APP_CDN
                            }/${encodeURIComponent(photo.url)}`}
                          >
                            <div
                              className={cn(
                                "min-h-{20rem} relative mb-4 w-1/2 sm:w-1/3 md:w-1/2",
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
                  </>
                ) : // n
                type === "videos" ? (
                  <div className="space-y-6">
                    {media && media.length > 0
                      ? media.map((video) => (
                          <Post
                            key={video}
                            caption={caption}
                            username={user.username}
                            date={timeAgo(taken_at)}
                            content="Hello"
                            src={user.profile_pic_url}
                            downloadable={`${
                              process.env.NEXT_PUBLIC_APP_CDN
                            }/${encodeURIComponent(video.url)}`}
                          >
                            <div
                              className={cn(
                                "min-h-{20rem} relative mb-4 w-1/2 sm:w-1/3 md:w-1/2",
                                thumbnail ? "z-10" : "",
                                isPortrait(height, width)
                                  ? `${height}`
                                  : `${height}`
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
                            date={timeAgo(taken_at)}
                            content="Hello"
                            src={user.profile_pic_url}
                            downloadable={`${
                              process.env.NEXT_PUBLIC_APP_CDN
                            }/${encodeURIComponent(photo.url)}`}
                          >
                            <div
                              className={cn(
                                "min-h-{20rem} relative mb-4 w-1/2 sm:w-1/3 md:w-1/2",
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
        ) : (
          <>
            {loading && (
              <div className="space-y-5 rounded-2xl bg-white/5 p-4">
                <div className="h-24 rounded-lg bg-rose-100/10"></div>
                <div className="space-y-3">
                  <div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
                  <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
                  <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ThreadsSection;

interface Props extends React.HTMLProps<HTMLDivElement> {
  content: string;
  username: string;
  date: string;
  src: string;
  caption: string;
  children?: ReactNode;
  onClick?: () => void;
  downloadable?: string;
}

const Post = ({
  content,
  username,
  date,
  children,
  src,
  caption,
  onClick,
  downloadable,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToElement = () => {
    if (ref.current) {
      const offset = 278;
      const topPosition =
        ref.current.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToElement();
  }, []);

  return (
    <div className="flex flex-1 gap-x-4" ref={ref} {...props}>
      <div className="flex-shrink-0">
        <Image
          height="36"
          width="36"
          alt="rajatdas.me's profile picture"
          className="origin-center rounded-full object-cover"
          crossOrigin="anonymous"
          src="https://scontent.cdninstagram.com/v/t51.2885-19/357834101_977883033280721_3449271728947456340_n.jpg?stp=dst-jpg_s150x150&amp;_nc_ht=scontent.cdninstagram.com&amp;_nc_cat=105&amp;_nc_ohc=TIsz2OnSVLkAX-hiUTe&amp;edm=APs17CUBAAAA&amp;ccb=7-5&amp;oh=00_AfDfK8lfnAcHfe9DyZUm408kHnUDhxflp6x7feupohlBwg&amp;oe=64E1B1A2&amp;_nc_sid=10d13b"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex flex-1">
          <div className="flex flex-1 justify-between gap-x-1 text-base">
            <span className="font-bold text-barcelona-primary-text">
              @{username}
            </span>
            <span className="text-sm font-medium text-barcelona-secondary-text">
              {date}
            </span>
          </div>
          <div className="">{/* <DropdownMenuDemo /> */}</div>
        </div>
        <div
          className={cn(
            "relative block min-w-0 max-w-full overflow-y-visible whitespace-pre-line break-words text-sm text-barcelona-primary-text before:block before:h-0 before:content-[''] after:block after:h-0 after:content-[''] md:text-base",
            // "text-sm text-barcelona-primary-text md:py-2 md:text-base",
            caption === "" ? "hidden" : ""
          )}
        >
          {caption}
        </div>
        {children}
        <div>
          <div className="flex gap-x-10 text-base text-slate-100 xl:gap-x-14 [&_li:first-child]:hidden [&_li:first-child]:lg:flex [&_li:xl]:gap-x-3 [&_li]:flex [&_li]:items-center [&_li]:gap-x-2 ">
            <Link
              href={downloadable || ""}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full rounded-3xl bg-opacity-70 text-opacity-100"
              )}
            >
              Download
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
