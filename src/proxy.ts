import { type NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/login/manage-login";

export async function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.startsWith("/admin/login");
  //   O config + matcher já resolve isso, mas essa linha de baixo é só por garantia
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  //   Para não deslogar o user quando ele tenta fazer o post ou put, para dar tempo dele atualizar o cookie
  const isGetRequest = request.method === "GET";

  const shouldBeAuthenticated = isAdminPage && !isLoginPage;
  const shouldRedirect = shouldBeAuthenticated && isGetRequest;

  if (!shouldRedirect) {
    return NextResponse.next();
  }

  const jwtSession = request.cookies.get(
    process.env.LOGIN_COOKIE_NAME || "loginSession",
  )?.value;

  const isAuthenticated = await verifyJwt(jwtSession);
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: "/admin/:path*",
};
