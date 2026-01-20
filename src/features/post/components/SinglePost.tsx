import { SafeMarkdown } from "@/components/SafeMarkdown";
import { findPublicPostBySlugFromApi } from "@/features/post/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostDate } from "./PostDate";
import { PostHeading } from "./PostHeading";

type SinglePostProps = {
  params: Promise<{ slug: string }>;
};

export async function SinglePost({ params }: SinglePostProps) {
  const { slug } = await params;
  const postRes = await findPublicPostBySlugFromApi(slug);

  if (!postRes.success) {
    notFound();
  }

  const post = postRes.data;

  return (
    <article className="mb-16">
      <header className="group cursor-pointer flex flex-col gap-4">
        <Image
          className="rounded-xl"
          src={post.coverImageUrl}
          alt={post.title}
          width={1200}
          height={720}
          priority
        />
        <PostHeading href={`/post/${post.slug}`}>{post.title}</PostHeading>
        <p>
          {post.author.name} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className="text-xl mb-4 text-slate-600">{post.excerpt}</p>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
