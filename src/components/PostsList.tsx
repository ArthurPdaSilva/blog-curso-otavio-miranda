import { findAllPostsPublic } from "@/lib/queries";
import type { PostModel } from "@/models/post/post-model";
import { PostCoverImage } from "./PostCoverImage";
import { PostSummary } from "./PostSummary";

/*
  Notas:
  - `findAllPostsPublic` usa cache do React para evitar múltiplas chamadas.
  - Preferir rotas/SSG quando possível; aqui usamos cached query que ajuda em SSG.
  - `group` + `group-hover` permitem transições dependentes do pai (ex: imagem).
  - `priority: true` no `Image` prioriza carregamento para imagens importantes.
*/

export async function PostsList() {
  const posts = (await findAllPostsPublic()) as PostModel[];

  return (
    <div className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3">
      {posts.slice(1).map((post) => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className="flex flex-col gap-4 group" key={post.id}>
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
              postHeading="h2"
              postLink={postLink}
              post={{
                title: post.title,
                createdAt: post.createdAt,
                excerpt: post.excerpt,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
