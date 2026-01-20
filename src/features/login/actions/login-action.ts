"use server";
import { createLoginSessionFromApi } from "@/features/login/lib/manage-login";
import { LoginSchema } from "@/features/login/lib/schema";
import { apiRequest } from "@/utils/api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { verifyHoneypotInput } from "@/utils/verify-honeypot-input";
import { redirect } from "next/navigation";

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const isBot = await verifyHoneypotInput(formData, 5000);

  if (isBot) {
    return {
      email: "",
      errors: ["nice"],
    };
  }

  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      email: "",
      errors: ["Login não permitido"],
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      email: "",
      errors: ["Dados inválidos"],
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const formEmail = formObj?.email?.toString() || "";
  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formEmail,
      errors: getZodErrorMessages(parsedFormData.error),
    };
  }

  const loginResponse = await apiRequest<{ accessToken: string }>(
    "/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!loginResponse.success) {
    return {
      email: formEmail,
      errors: loginResponse.errors,
    };
  }

  await createLoginSessionFromApi(loginResponse.data.accessToken);
  redirect("/admin/post");
}
