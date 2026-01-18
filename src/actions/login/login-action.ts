"use server";
import { createLoginSession, verifyPassword } from "@/lib/login/manage-login";
import { asyncDelay } from "@/utils/async-delay";
import { redirect } from "next/navigation";

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  await asyncDelay(5000); // Vou manter (atrasar brute force)

  if (!(formData instanceof FormData)) {
    return {
      username: "",
      error: "Dados inválidos",
    };
  }

  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  if (!username || !password) {
    return {
      username: "",
      error: "Digite o usuário e a senha",
    };
  }

  //   Aqui eu checaria se o usuário existe na base de dados
  const isUserNameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    String(process.env.LOGIN_PASS),
  );

  if (!isUserNameValid || !isPasswordValid) {
    return {
      username,
      error: "Usuarío ou senha inválidos",
    };
  }

  await createLoginSession(username);
  redirect("/admin/post");
}
