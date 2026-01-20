"use server";
import { getLoginSessionForApi } from "@/features/login/lib/manage-login";
import {
  PublicPostForApiSchema,
  UpdatePostForApiSchema,
  type PublicPostForApiDto,
} from "@/features/post/lib/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { makeRandomString } from "@/utils/make-random-string";
import { updateTag } from "next/cache";

type UpdatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
};

//Cuidado com as envs que coloca em props ou actions, pois isso é retornado para uma api pública acessível se tiver o id do next_action
export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    return {
      formState: prevState.formState,
      errors: ["ID inválido"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UpdatePostForApiSchema.safeParse(formDataToObj);

  const isAuthenticated = await getLoginSessionForApi();
  if (!isAuthenticated) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors: ["Faça login em outra aba antes de salvar."],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);
    return {
      errors,
      formState: PublicPostForApiSchema.parse(formDataToObj),
    };
  }

  const newPost = zodParsedObj.data;

  const updatePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!updatePostResponse.success) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors: updatePostResponse.errors,
    };
  }

  const post = updatePostResponse.data;

  updateTag("posts");
  updateTag("admin-posts");
  updateTag(`admin-post-${id}`);
  updateTag(`post-${post.slug}`);
  return {
    errors: [],
    formState: PublicPostForApiSchema.parse(post),
    success: makeRandomString(),
  };
}
