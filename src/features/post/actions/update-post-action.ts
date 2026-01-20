"use server";
import { verifyLoginSession } from "@/features/login/lib/manage-login";
import {
  makePartialPublicPost,
  makePublicPostFromDb,
  type PublicPost,
} from "@/features/post/dto/post";
import { PostUpdateSchema } from "@/features/post/lib/schemas";
import type { PostModel } from "@/features/post/models/post-model";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { makeRandomString } from "@/utils/make-random-string";
import { updateTag } from "next/cache";

type UpdatePostActionState = {
  formState: PublicPost;
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
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ["Faça login em outra aba antes de salvar."],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost = {
    ...validPostData,
  };

  let post: PostModel | undefined;
  try {
    const res = await fetch(
      `${process.env.NEXT_BASE_URL}/api/admin/posts/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newPost),
      },
    );
    const json = await res.json();
    post = json.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ["Erro desconhecido"],
    };
  }

  if (!post) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ["Post não encontrado"],
    };
  }

  updateTag("posts");
  updateTag("admin-posts");
  updateTag(`admin-post-${id}`);
  updateTag(`post-${post.slug}`);
  return {
    errors: [],
    formState: makePublicPostFromDb(post),
    success: makeRandomString(),
  };
}
