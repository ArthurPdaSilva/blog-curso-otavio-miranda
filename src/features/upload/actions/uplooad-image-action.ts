"use server";
import { getLoginSessionForApi } from "@/features/login/lib/manage-login";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

type UploadImageActionResult = {
  url: string;
  error: string;
};

// Essa action cria uma rota pública. Então se o user pegar o next-action e fazer a request ele consegue acessar por fora e quebrar a segurança
export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = "", error = "" }) => ({ url, error });

  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    return makeResult({ error: "Faça login novamente" });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: "Dados Inválidos" });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return makeResult({ error: "Arquivo Inválido" });
  }

  if (file.size > Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE)) {
    return makeResult({ error: "Arquivo muito grande" });
  }

  if (!file.type.startsWith("image/")) {
    return makeResult({ error: "Imagem inválida" });
  }

  const uploadResponse = await authenticatedApiRequest<{ url: string }>(
    `/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!uploadResponse.success) {
    return makeResult({ error: uploadResponse.errors[0] });
  }

  const url = `${process.env.IMAGE_SERVER_URL}${uploadResponse.data.url}`;
  return makeResult({ url });
}
