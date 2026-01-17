import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

const BASE_URL = process.env.BASE_API_URL ?? "http://localhost:3000";

/**
 * Busca um post específico para o Admin.
 * Cache no Next, Suspense-friendly, revalidável via tag.
 */
export async function findByIdAdmin(id: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag(`admin-post-${id}`);
  const res = await fetch(`${BASE_URL}/api/admin/posts/${id}`);

  if (res.status === 404) notFound();

  return res.json();
}

/**
 * Busca todos os posts para o Admin.
 * Cache server-side, Suspense-friendly e com tag própria.
 */
export async function findAllPostsAdmin() {
  "use cache";
  cacheLife("minutes");
  cacheTag("admin-posts");
  const res = await fetch(`${BASE_URL}/api/admin/posts`);

  const json = await res.json();
  return json.data;
}

/**
 * Busca todos os posts publicados.
 * Usa cache do Next (não React Cache), permite Suspense e revalidateTag("posts").
 */
export async function findAllPostsPublic() {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts");
  const res = await fetch(`${BASE_URL}/api/posts`);

  const json = await res.json();
  return json.data;
}

/**
 * Busca um post por slug.
 * Usa cache do Next, não cache React.
 */
export async function findBySlugPublic(slug: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag(`post-${slug}`);
  const res = await fetch(`${BASE_URL}/api/posts/${slug}`);

  if (res.status === 404) notFound();

  return res.json();
}
