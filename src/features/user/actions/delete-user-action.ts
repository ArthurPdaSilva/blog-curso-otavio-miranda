"use server";
import { deleteLoginSession } from "@/features/login/lib/manage-login";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getPublicUserFromApi } from "../lib/get-user";

type DeleteUserActionState = {
  errors: string[];
  success: boolean;
};

export async function deleteUserAction(): Promise<DeleteUserActionState> {
  const user = await getPublicUserFromApi();

  if (!user) {
    await deleteLoginSession();

    return {
      errors: ["Você precisa fazer login novamente"],
      success: false,
    };
  }

  const deleteUserResponse =
    await authenticatedApiRequest<DeleteUserActionState>(`/user/me`, {
      method: "DELETE",
    });

  if (!deleteUserResponse.success) {
    return {
      errors: deleteUserResponse.errors,
      success: false,
    };
  }

  await deleteLoginSession();
  updateTag("posts");
  redirect("/");
}
