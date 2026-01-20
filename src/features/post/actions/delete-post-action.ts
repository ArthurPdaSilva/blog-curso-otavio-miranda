"use server";
import { getLoginSessionForApi } from "@/features/login/lib/manage-login";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { updateTag } from "next/cache";
import type { PublicPostForApiDto } from "../lib/schemas";

type DeletePostActionResult = {
  error: string;
};

export async function deletePostAction(
  id: string,
): Promise<DeletePostActionResult> {
  const isAuthenticated = await getLoginSessionForApi();

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

  const postResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!postResponse.success) {
    return {
      error: "Erro ao encontrar post",
    };
  }

  const deletePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!deletePostResponse.success) {
    return {
      error: "Erro ao apagar post",
    };
  }

  updateTag("posts");
  updateTag("admin-posts");
  updateTag(`post-${postResponse.data.slug}`);

  return {
    error: "",
  };
}
