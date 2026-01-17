import { findAllPostsAdmin } from "@/lib/queries";
import type { PostModel } from "@/models/post/post-model";
import clsx from "clsx";
import Link from "next/link";
import { DeletePostButton } from "./DeletePostButton";

export async function PostListAdmin() {
  const posts = (await findAllPostsAdmin()) as PostModel[];

  return (
    <div className="mb-16">
      {posts.map((post) => (
        <div
          key={post.id}
          className={clsx(
            "py-2 px-2",
            !post.published && "bg-slate-300",
            "flex gap-2 items-center justify-between",
          )}
        >
          <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

          {!post.published && (
            <span className="text-xs text-slate-600 italic">
              (Não Publicado)
            </span>
          )}
          <DeletePostButton id={post.id} title={post.title} />
        </div>
      ))}
    </div>
  );
}
