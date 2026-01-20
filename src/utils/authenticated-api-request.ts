import "server-only";
// `import 'server-only'` marks your module as only usable on the server

import { getLoginSessionForApi } from "@/features/login/lib/manage-login";
import { type ApiRequest, apiRequest } from "./api-request";

export async function authenticatedApiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  const jwtToken = await getLoginSessionForApi();

  if (!jwtToken) {
    return {
      success: false,
      errors: ["Usuário não autenticado"],
      status: 401,
    };
  }

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${jwtToken}`,
  };

  return apiRequest<T>(path, {
    ...options,
    headers,
  });
}
