import type { PostModel } from "@/features/post/models/post-model";
import { notFound } from "next/navigation";

/**
 * Busca um post específico para o Admin.
 */
export async function findByIdAdmin(id: string): Promise<PostModel> {
  const res = await fetch(
    `${process.env.NEXT_BASE_URL}/api/admin/posts/${id}`,
    {
      next: {
        tags: [`admin-post-${id}`],
        revalidate: Number(process.env.NEXT_REVALIDATE_MINUTES),
      },
    },
  );

  if (res.status === 404) notFound();
  const json = await res.json();
  return json.data;
}

/**
 * Busca todos os posts para o Admin.
 */
export async function findAllPostsAdmin(): Promise<PostModel[]> {
  const res = await fetch(`${process.env.NEXT_BASE_URL}/api/admin/posts`, {
    next: {
      tags: ["admin-posts"],
      revalidate: Number(process.env.NEXT_REVALIDATE_MINUTES),
    },
  });

  const json = await res.json();
  return json.data;
}

/**
 * Busca todos os posts publicados.
 */
export async function findAllPostsPublic(): Promise<PostModel[]> {
  const res = await fetch(`${process.env.NEXT_BASE_URL}/api/posts`, {
    next: {
      tags: ["posts"],
      revalidate: Number(process.env.NEXT_REVALIDATE_MINUTES),
    },
  });

  const json = await res.json();
  return json.data;
}

/**
 * Busca um post por slug.
 */
export async function findBySlugPublic(slug: string): Promise<PostModel> {
  const res = await fetch(`${process.env.NEXT_BASE_URL}/api/posts/${slug}`, {
    next: {
      tags: [`post-${slug}`],
      revalidate: Number(process.env.NEXT_REVALIDATE_MINUTES),
    },
  });

  if (res.status === 404) notFound();
  const json = await res.json();
  return json.data;
}
