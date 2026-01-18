"use server";

import { BASE_URL } from "@/lib/constants";
import type { PostModel } from "@/models/post/post-model";
import { asyncDelay } from "@/utils/async-delay";
import { logColor } from "@/utils/log-color";
import { updateTag } from "next/cache";

type DeletePostActionResult = {
  error: string;
};

export async function deletePostAction(
  id: string,
): Promise<DeletePostActionResult> {
  await asyncDelay(2000);
  logColor(String(id));

  if (!id || typeof id !== "string") {
    return {
      error: "Dados Inválidos",
    };
  }

  let post: undefined | PostModel;
  try {
    const res = await fetch(`${BASE_URL}/api/admin/posts/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    post = json.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }

    return {
      error: "Erro desconhecido",
    };
  }

  if (!post) {
    return {
      error: "Post não encontrado",
    };
  }

  updateTag("posts");
  updateTag("admin-posts");
  updateTag(`post-${post.slug}`);

  return {
    error: "",
  };
}
