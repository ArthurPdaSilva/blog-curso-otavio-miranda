import type { PostModel } from "@/features/post/models/post-model";

export type PublicPost = Omit<PostModel, "updatedAt">;

export const makePartialPublicPost = (
  // Partial transforma todas as chaves em opcionais
  post?: Partial<PostModel>,
): PublicPost => {
  return {
    id: post?.id || "",
    slug: post?.slug || "",
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    author: post?.author || "",
    content: post?.content || "",
    coverImageUrl: post?.coverImageUrl || "",
    createdAt: post?.createdAt || "",
    published: post?.published || false,
  };
};

export const makePublicPostFromDb = (post: PostModel): PublicPost => {
  return makePartialPublicPost(post);
};
