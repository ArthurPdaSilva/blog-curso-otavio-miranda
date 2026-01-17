import { notFound } from "next/navigation";

const BASE_URL = process.env.BASE_API_URL ?? "http://localhost:3000";

// 30 min
const REVALIDATE_MINUTES = 30 * 60;

/**
 * Busca um post específico para o Admin.
 * Agora usa cache via fetch (100% compatível com Suspense + streaming).
 */
export async function findByIdAdmin(id: string) {
  const res = await fetch(`${BASE_URL}/api/admin/posts/${id}`, {
    next: {
      tags: [`admin-post-${id}`],
      revalidate: REVALIDATE_MINUTES,
    },
  });

  if (res.status === 404) notFound();
  return res.json();
}

/**
 * Busca todos os posts para o Admin.
 * Cache via fetch — evita bloquear Suspense.
 */
export async function findAllPostsAdmin() {
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
 * Compatível com Suspense, streaming e revalidateTag("posts").
 */
export async function findAllPostsPublic() {
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
 * Não bloqueia Suspense.
 */
export async function findBySlugPublic(slug: string) {
  const res = await fetch(`${BASE_URL}/api/posts/${slug}`, {
    next: {
      tags: [`post-${slug}`],
      revalidate: REVALIDATE_MINUTES,
    },
  });

  if (res.status === 404) notFound();
  return res.json();
}
