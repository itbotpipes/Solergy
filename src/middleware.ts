import { NextResponse, type NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "solergy_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;

    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is already authenticated and visits /admin/login, redirect to /admin
  if (pathname === "/admin/login") {
    const sessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
