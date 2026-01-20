"use server";
import { deleteLoginSession } from "@/features/login/lib/manage-login";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await deleteLoginSession();
  redirect("/");
}
