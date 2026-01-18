import type { PostModel } from "@/models/post/post-model";
import { notFound } from "next/navigation";
import { BASE_URL, REVALIDATE_MINUTES } from "./constants";

/**
 * Busca um post específico para o Admin.
 */
export async function findByIdAdmin(id: string): Promise<PostModel> {
  const res = await fetch(`${BASE_URL}/api/admin/posts/${id}`, {
    next: {
      tags: [`admin-post-${id}`],
      revalidate: REVALIDATE_MINUTES,
    },
  });

  if (res.status === 404) notFound();
  const json = await res.json();
  return json.data;
}

/**
 * Busca todos os posts para o Admin.
 */
export async function findAllPostsAdmin(): Promise<PostModel[]> {
  const res = await fetch(`${BASE_URL}/api/admin/posts`, {
    next: {
      tags: ["admin-posts"],
      revalidate: REVALIDATE_MINUTES,
    },
  });

  const json = await res.json();
  return json.data;
}

/**
 * Busca todos os posts publicados.
 */
export async function findAllPostsPublic(): Promise<PostModel[]> {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    next: {
      tags: ["posts"],
      revalidate: REVALIDATE_MINUTES,
    },
  });

  const json = await res.json();
  return json.data;
}

/**
 * Busca um post por slug.
 */
export async function findBySlugPublic(slug: string): Promise<PostModel> {
  const res = await fetch(`${BASE_URL}/api/posts/${slug}`, {
    next: {
      tags: [`post-${slug}`],
      revalidate: REVALIDATE_MINUTES,
    },
  });

  if (res.status === 404) notFound();
  const json = await res.json();
  return json.data;
}
