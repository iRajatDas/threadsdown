"use client";

import { ReactNode, Suspense } from "react";
import { useThreadFormStore } from "@/lib/store";
import { LuLoader } from "react-icons/lu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  {
    username: "rajatdas.me",
    content: "Design and build templates",
    caption:
      "Improve your design skills by making projects. 1 every week, practice with me on Youtube. I use Figma, Tailwind CSS and Webflow.",
    date: "1h",
    src: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
    image:
      "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80",
  },
  {
    username: "rajatdas.me",
    content: "CSS is insane",
    caption:
      "Should designers code. Should you rename your Figma layers is the 1 billion…",
    date: "3h",
    src: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",

    image:
      "https://images.unsplash.com/photo-1692013170163-96ca39a02e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
  },
  {
    username: "rajatdas.me",
    content: "CSS is insane",
    caption:
      "Should designers code. Should you rename your Figma layers is the 1 billion…",
    date: "3h",
    src: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",

    video:
      "https://threads-3g3x.onrender.com/scontent.cdninstagram.com/v/t50.2886-16/10000000_978374769947694_1099918139477963337_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=DHz7TCxOuFgAX8HtNfZ&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfD06QOeKSap-NSwBqip98pw_0dnk2rSN1psEtKiNc3VdQ&oe=64DE6290&_nc_sid=10d13b",
  },
];

const ThreadsSection = () => {
  const threads = useThreadFormStore((state) => state.threads);

  return (
    <div className="px-default py-4 --mt-10 space-y-4">
      {/* <h2 className="text-3xl md:text-system-28 md:leading-system-28 font-extrabold tracking-tight">
        Download is Ready
      </h2> */}
      <Suspense fallback={<LuLoader className="animate-spin" />}>
        <div className="[&_p:last-child]:text-slate-500 [&_p:first-child]:text-lg divide-y divide-barcelona-media-outline">
          {items.map(
            ({ username, content, date, src, image, caption, video }, i) => (
              <article key={`username-${i}`} className="p-4- py-6">
                <Post
                  username={username}
                  content={content}
                  date={date}
                  src={src}
                  caption={caption}
                  onClick={() => console.log(image || video)}
                >
                  <div
                    className={cn(
                      "w-full relative min-h-{20rem} h-auto mb-4",
                      image ? "z-10" : ""
                    )}
                  >
                    {image ? (
                      <Image
                        // fill={true}
                        width={800}
                        height={800}
                        style={{ objectFit: "cover" }}
                        className="rounded-3xl"
                        src={image}
                        alt="Gradient"
                      />
                    ) : (
                      <video
                        // playsInline={true}
                        loop
                        muted
                        autoPlay
                        playsInline
                        preload="metadata"
                        crossOrigin="anonymous"
                        className="rounded-3xl"
                      >
                        <source src={video} type="video/mp4" />
                      </video>
                    )}
                  </div>
                </Post>
              </article>
            )
          )}
        </div>
      </Suspense>
      {/* <ThreadPost /> */}
      {/* <video
        src="http://localhost:3001/scontent.cdninstagram.com/v/t50.2886-16/10000000_978374769947694_1099918139477963337_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=DHz7TCxOuFgAX8xllhK&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDR53I1MfcCY99bGFTocQQb7gs2Nlwv-N6XwejxEI7fug&oe=64DD1110&_nc_sid=10d13b"
        crossOrigin="anonymous"
        controls
      ></video> */}
      {/* <p className="text-muted-foreground">Click Download to get started.</p> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      {/* {threads?.map((thread, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <Image
                src={thread.user.profile_pic_url}
                alt={`Profile pic of ${thread.user.username}`}
                className="w-10 h-10 rounded-full"
                height={98}
                width={98}
              />
              <span className="font-bold">{thread.user.username}</span>
            </div>
            <div className="mt-4">
              {thread.type === "photos" && (
                <div className="grid grid-cols-1 gap-4">
                  {thread.photos.map((photo, photoIndex) => (
                    <Image
                      key={photoIndex}
                      src={photo.url}
                      height={thread.height}
                      width={thread.width}
                      alt={`Photo ${photoIndex}`}
                      className="w-full"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))} */}
      {/* </div> */}
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
