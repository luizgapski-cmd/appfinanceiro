import { NextRequest, NextResponse } from "next/server";
import { createProxyClient } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const { supabase } = createProxyClient(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/transacoes");
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/cadastro");

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
