import ErrorMessage from "@/components/ErrorMessage";
import { findAllPostsAdmin } from "@/features/post/lib/schemas";
import clsx from "clsx";
import Link from "next/link";
import { DeletePostButton } from "./DeletePostButton";

export async function PostListAdmin() {
  const posts = await findAllPostsAdmin();

  if (posts.length <= 0)
    return (
      <ErrorMessage contentTitle="Ei 😅" content="Bora criar algum post??" />
    );

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
