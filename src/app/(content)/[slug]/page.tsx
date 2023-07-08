import React from "react";
import { createReader } from "@keystatic/core/reader";
import config from "../../../../keystatic.config";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import Banner from "@/keystatic/components/Banner";
import InlineCTA from "@/keystatic/components/InlineCTA";
import Divider from "@/keystatic/components/Divider";
import Image from "@/keystatic/components/Image";
import YouTubeEmbed from "@/keystatic/components/YouTubeEmbed";
import TweetEmbed from "@/keystatic/components/TweetEmbed";
import LoopingVideo from "@/keystatic/components/LoopingVideo";
import NextImage from "next/image";
import Testimonial from "@/keystatic/components/Testimonial";
import AvatarList from "@/keystatic/components/AvatarList";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { dateFormatter, readTime } from "@/lib/utils";

async function getSinglePostData(slug: string) {
  const reader = createReader("", config);
  // Get data for post matching current slug
  let post;
  try {
    post = await reader.collections.posts.readOrThrow(slug, {
      resolveLinkedFiles: true,
    });
  } catch (error) {
    notFound();
  }

  const authorsData = await Promise.all(
    post.authors.map(async (authorSlug) => {
      const author = await reader.collections.authors.read(authorSlug || "");
      return { ...author, slug: authorSlug };
    })
  );

  return {
    post: {
      ...post,
      slug,
    },
    authors: authorsData,
  };
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const { post } = await getSinglePostData(params.slug);

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [
        post.coverImage
          ? `/images/posts/${post.slug}/${post.coverImage}`
          : "/images/seo-image.png",
      ],
    },
  };
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const { post, authors } = await getSinglePostData(params.slug);
  const names = authors.reduce(
    (acc: string[], author) =>
      "name" in author ? [...acc, author.name as string] : acc,
    []
  );
  const formattedNames = new Intl.ListFormat("en-AU")
    .format(names)
    .replace("and", "&");
  return (
    <article>
      {/* <h1 className="text-xl md:text-system-24 md:leading-system-24 font-bold tracking-tight">
        {post.title}
      </h1> */}
      <div className="max-w-4xl mx-auto px-4 md:px-10">
        <div className="flex gap-3 items-center flex-wrap">
          {authors && <AvatarList authors={authors} />}
          <p className="font-semibold">{formattedNames}</p>
        </div>

        <div className="mt-4 flex justify-between text-muted-foreground">
          <span className="flex gap-1">
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
          </span>
        </div>

        <div className="mt-8 prose max-w-none prose-headings:text-barcelona-primary-text prose-p:text-barcelona-primary-text prose-ul:text-barcelona-primary-text prose-a:text-barcelona-link-text prose-strong:text-barcelona-primary-text">
          <h1 className="mt-4 text-3xl md:text-system-28 md:leading-system-28 font-extrabold tracking-tight">
            {post.title}
          </h1>
          <p className="text-lg">{post.summary}</p>
          {post.coverImage && (
            <div className="mt-10 not-prose md:-mx-24 rounded-2xl overflow-hidden border-0.5 border-barcelona-media-outline shadow-xl shadow-barcelona-secondary-background">
              <NextImage
                width={1536}
                height={800}
                src={`/images/posts/${post.slug}/${post.coverImage}`}
                alt={`${post.title} Cover image`}
                className="w-full rounded-md"
              />
            </div>
          )}
          <div className="mt-10">
            <DocumentRenderer
              document={post.content}
              componentBlocks={{
                inlineCta: (props) => (
                  <InlineCTA
                    title={props.title}
                    summary={props.summary}
                    linkButton={{
                      externalLink: props.externalLink,
                      href: props.href,
                      label: props.linkLabel,
                    }}
                  />
                ),
                divider: (props) => <Divider noIcon={props.noIcon} />,
                banner: (props) => (
                  <Banner
                    heading={props.heading}
                    bodyText={props.bodyText}
                    externalLink={{
                      href: props.externalLinkHref,
                      label: props.externalLinkLabel,
                    }}
                  />
                ),
                youtubeEmbed: (props) => (
                  <YouTubeEmbed youtubeLink={props.youtubeLink} />
                ),
                tweetEmbed: (props) => <TweetEmbed tweet={props.tweet} />,
                loopingVideo: (props) => (
                  <LoopingVideo src={props.src} caption={props.caption} />
                ),
                image: (props) => (
                  <Image
                    src={props.src}
                    alt={props.alt}
                    caption={props.caption}
                  />
                ),
                testimonial: (props) => (
                  <Testimonial
                    quote={props.quote}
                    author={props.author}
                    workplaceOrSocial={props.workplaceOrSocial}
                    socialLink={props.socialLink}
                  />
                ),
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
