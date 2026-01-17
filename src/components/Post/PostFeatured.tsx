/** biome-ignore-all assist/source/organizeImports: false positive */
import { findAllPostsPublic } from "@/lib/queries";
import clsx from "clsx";
import { PostCoverImage } from "./PostCoverImage";
import { PostSummary } from "./PostSummary";

export async function PostFeatured() {
  const posts = await findAllPostsPublic();
  const post = posts[0];
  const postLink = `/post/${post.slug}`;

  return (
    <section
      className={clsx("grid grid-cols-1 gap-8 mb-16 group", "sm:grid-cols-2")}
    >
      <PostCoverImage
        imageProps={{
          src: post.coverImageUrl,
          alt: post.title,
          priority: true,
          width: 1200,
          height: 720,
        }}
        linkProps={{
          href: postLink,
        }}
      />

      <PostSummary
        postHeading="h1"
        postLink={postLink}
        post={{
          title: post.title,
          excerpt: post.excerpt,
          createdAt: post.createdAt,
        }}
      />
    </section>
  );
}
