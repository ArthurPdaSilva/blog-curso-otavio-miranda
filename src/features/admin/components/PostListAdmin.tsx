import ErrorMessage from "@/components/ErrorMessage";
import { findAllPostFromApiAdmin } from "@/features/post/lib/queries";
import clsx from "clsx";
import Link from "next/link";
import { DeletePostButton } from "./DeletePostButton";

export async function PostListAdmin() {
  const postsRes = await findAllPostFromApiAdmin();
  if (!postsRes.success) {
    console.log(postsRes.errors);

    return (
      <ErrorMessage
        contentTitle="Ei 😅"
        content="Tente fazer login novamente"
      />
    );
  }

  const posts = postsRes.data;
  if (posts.length <= 0) {
    return (
      <ErrorMessage contentTitle="Ei 😅" content="Bora criar algum post??" />
    );
  }

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
