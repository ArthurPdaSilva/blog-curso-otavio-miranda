"use server";
import { verifyLoginSession } from "@/features/login/lib/manage-login";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

type UploadImageActionResult = {
  url: string;
  error: string;
};

// Essa action cria uma rota pública. Então se o user pegar o next-action e fazer a request ele consegue acessar por fora e quebrar a segurança
export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = "", error = "" }) => ({ url, error });

  const isAuthenticated = await verifyLoginSession();

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

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || "uploads";
  const uploadFullPath = resolve(process.cwd(), "public", uploadDir);

  //recursive: Indicates whether parent folders should be created. If a folder was created, the path to the first created folder will be returned.
  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);
  const fileFullPath = resolve(uploadFullPath, uniqueImageName);
  await writeFile(fileFullPath, buffer);

  const imgServerUrl =
    process.env.IMAGE_SERVER_URL || "http://localhost:3000/uploads";
  const url = `${imgServerUrl}/${uniqueImageName}`;
  return makeResult({ url });
}
