import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Routes qui nécessitent d'être connecté
const protectedRoutes = ["/cart"];

// Routes réservées aux admins
const adminRoutes = ["/admin"];

// Routes accessibles uniquement aux visiteurs non connectés
const authRoutes = ["/login", "/register"];

export const proxy = auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "admin";

  const isProtected = protectedRoutes.some((r) =>
    nextUrl.pathname.startsWith(r)
  );
  const isAdminRoute = adminRoutes.some((r) =>
    nextUrl.pathname.startsWith(r)
  );
  const isAuthRoute = authRoutes.some((r) => nextUrl.pathname.startsWith(r));

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
