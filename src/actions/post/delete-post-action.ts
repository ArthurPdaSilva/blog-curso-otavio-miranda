"use server";
import { verifyLoginSession } from "@/lib/login/manage-login";
import type { PostModel } from "@/models/post/post-model";
import { updateTag } from "next/cache";

type DeletePostActionResult = {
  error: string;
};

export async function deletePostAction(
  id: string,
): Promise<DeletePostActionResult> {
  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return {
      error: "Faça login novamente em outra aba",
    };
  }

  if (!id || typeof id !== "string") {
    return {
      error: "Dados Inválidos",
    };
  }

  let post: undefined | PostModel;
  try {
    const res = await fetch(
      `${process.env.NEXT_BASE_URL}/api/admin/posts/${id}`,
      {
        method: "DELETE",
      },
    );
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
