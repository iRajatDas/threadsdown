import React from "react";
import EntrySection from "./components/section-entry";
import FormSection from "./components/section-from";
import AlertSection from "./components/section-alert";
import { Card } from "@/components/card";

import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import Link from "next/link";
import FAQSection from "./components/section-faq";
import { slug } from "@keystatic/core/dist/declarations/src/form/fields";

async function getAllPostData() {
  const reader = createReader(process.cwd(), config);
  const postSlugs = await reader.collections.posts.list();

  const postData = await Promise.all(
    postSlugs.map(async (slug: string) => {
      const post = await reader.collections.posts.readOrThrow(slug, {
        resolveLinkedFiles: true,
      });

      const authorsData = await Promise.all(
        post.authors.map(async (authorSlug) => {
          const author = await reader.collections.authors.read(
            authorSlug || ""
          );
          return { ...author, slug: authorSlug };
        })
      );

      return {
        ...post,
        slug,
        authors: authorsData,
      };
    })
  );

  return postData;
}

async function getSinglePostData(slug: string) {
  const reader = createReader(process.cwd(), config);
  const post = await reader.collections.posts.readOrThrow(slug, {
    resolveLinkedFiles: true,
  });

  const authorsData = await Promise.all(
    post.authors.map(async (authorSlug) => {
      const author = await reader.collections.authors.read(authorSlug || "");
      return { ...author, slug: authorSlug };
    })
  );

  const postData = {
    ...post,
    slug,
    authors: authorsData,
  };

  return postData;
}

const Homepage = async () => {
  const posts = await getAllPostData();
  return (
    <>
      <EntrySection />
      <FormSection />
      <AlertSection />
      <FAQSection />
      <div className="px-default py-4 mt-10 space-y-4">
        <h2 className="text-3xl md:text-system-28 md:leading-system-28 font-extrabold tracking-tight">
          Read some articles
        </h2>
        <div className="space-y-6">
          {posts.map((post, i) => {
            const firstAuthor = post.authors[0];
            return (
              <Card key={post.slug + i}>
                <Link href={`/${post.slug}`}>
                  <article className="px-default py-4">
                    <h2 className="z-20 text-lg font-bold duration-1000 lg:text-2xl text-zinc-200 group-hover:text-white font-display">
                      {post.title}
                    </h2>
                    <p>{firstAuthor.name}</p>
                  </article>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
