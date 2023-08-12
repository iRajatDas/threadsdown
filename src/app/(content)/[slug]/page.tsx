import React from "react";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata({
//   params,
//   searchParams,
// }: Props): Promise<Metadata> {
//   const postData = await getSinglePostData(params.slug);
//   if (!postData) {
//     // Handle the case when the post is not found
//     return {
//       metadataBase: new URL(
//         process.env.NODE_ENV === "development"
//           ? "http://localhost:3000"
//           : "https://instathreadsdown.com"
//       ),
//       title: "Post not found",
//       description: "The requested post was not found",
//       robots: {
//         index: false,
//         follow: true,
//         nocache: true,
//         googleBot: {
//           index: true,
//           follow: false,
//           noimageindex: true,
//           "max-video-preview": -1,
//           "max-image-preview": "large",
//           "max-snippet": -1,
//         },
//       },
//     };
//   }
//   const { post } = postData;

//   return {
//     metadataBase: new URL(
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3000"
//         : "https://instathreadsdown.com"
//     ),
//     title: post.title,
//     description: post.summary,
//     alternates: {
//       canonical: `/${post.slug}`,
//     },
//     openGraph: {
//       title: post.title,
//       description: post.summary,
//       images: [
//         post.coverImage
//           ? `/images/posts/${post.slug}/${post.coverImage}`
//           : "/images/seo-image.png",
//       ],
//     },
//     robots: {
//       index: true,
//       follow: true,
//       nocache: false,
//       googleBot: {
//         index: true,
//         follow: true,
//         noimageindex: false,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//   };
// }

const Post = async ({ params }: { params: { slug: string } }) => {
  // if (!postData) {
  //   // Handle the case when the post is not found
  //   return (
  //     <div
  //       className="h-full px-default py-4 md:py-12 grid place-items-center rounded-2xl"
  //       style={{
  //         backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23333' stroke-width='1' stroke-dasharray='6%2c 14' stroke-dashoffset='49' stroke-linecap='square'/%3e%3c/svg%3e");`,
  //       }}
  //     >
  //       <h2 className="text-xl md:text-system-32 md:leading-system-32 font-bold tracking-tight text-center">
  //         Post not found
  //       </h2>
  //     </div>
  //   );
  // }

  // const content = await post.content();

  // const names = authors.reduce(
  //   (acc: string[], author) =>
  //     "name" in author ? [...acc, author.name as string] : acc,
  //   []
  // );
  const formattedNames = new Intl.ListFormat("en-AU")
    .format(["Rajat Das", "Rajeev"])
    .replace("and", "&");
  return (
    <article>
      {/* <h1 className="text-xl md:text-system-24 md:leading-system-24 font-bold tracking-tight">
        {post.title}
      </h1> */}
      <div className="max-w-4xl mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between gap-2 bg-barcelona-secondary-background py-5 md:-mx-10 px-4 rounded-2xl border-0.5 border-barcelona-media-outline mt-4">
          <div className="flex gap-3 items-center flex-wrap">
            {/* {authors && <AvatarList authors={authors} />} */}
            <p className="font-semibold">{formattedNames}</p>
          </div>
          <div className="flex justify-between text-muted-foreground">
            {/* <span className="flex gap-1">
              {post.publishedDate && (
                <p className="">
                  {dateFormatter(post.publishedDate, "do MMM yyyy")}
                </p>
              )}
              {post.wordCount && post.wordCount !== 0 ? (
                <p className="text-muted-foreground">
                  · {readTime(post.wordCount)}
                </p>
              ) : null}
            </span> */}
          </div>
        </div>

        <div className="mt-8 prose-lg max-w-none prose-headings:text-barcelona-primary-text prose-p:text-barcelona-primary-text prose-ul:text-barcelona-primary-text prose-a:text-barcelona-link-text prose-strong:text-barcelona-primary-text">
          <h1 className="mt-4 text-3xl md:text-system-28 md:leading-system-28 font-extrabold tracking-tight">
            Test
          </h1>
          {/* <p className="text-base">{post.summary}</p> */}
          {/* {post.coverImage && (
            <div className="mt-10 not-prose md:-mx-24 rounded-2xl overflow-hidden border-0.5 border-barcelona-media-outline shadow-xl shadow-barcelona-secondary-background">
              <NextImage
                width={1536}
                height={800}
                src={`/images/posts/${post.slug}/${post.coverImage}`}
                alt={`${post.title} Cover image`}
                className="w-full rounded-md"
              />
            </div>
          )} */}
          <div className="mt-10"></div>
        </div>
      </div>
    </article>
  );
};

export default Post;
