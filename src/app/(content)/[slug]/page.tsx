import React from "react";
import { createReader } from "@keystatic/core/reader";
import config from "../../../../keystatic.config";

const Post = async ({ params }: { params: { slug: string } }) => {
  const reader = createReader(process.cwd(), config);
  const post = await reader.collections.posts.read(params.slug);
  console.log(JSON.stringify(reader, null, 2));
  console.log(JSON.stringify(post, null, 2));
  return (
    <article>
      <h1 className="text-xl md:text-system-24 md:leading-system-24 font-bold tracking-tight">
        {post?.title}
      </h1>
    </article>
  );
};

export default Post;
