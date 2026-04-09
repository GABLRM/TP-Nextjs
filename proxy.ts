import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Routes qui nécessitent d'être connecté
const protectedRoutes = ["/cart"];

// Routes réservées aux admins
const adminRoutes = ["/admin"];

// Routes accessibles uniquement aux visiteurs non connectés
const authRoutes = ["/login", "/register"];

const AB_COOKIE = "ab_variant";
type ABVariant = "A" | "B";

function resolveABVariant(req: Parameters<Parameters<typeof auth>[0]>[0]): {
  variant: ABVariant;
  isNew: boolean;
} {
  // 1. Forçage via searchParam ?ab_prefetch=A|B
  const prefetch = req.nextUrl.searchParams.get("ab_prefetch");
  if (prefetch === "A" || prefetch === "B") {
    console.log(`[AB] forced via searchParam → ${prefetch}`);
    return { variant: prefetch, isNew: true };
  }

  // 2. Cookie existant
  const existing = req.cookies.get(AB_COOKIE)?.value;
  if (existing === "A" || existing === "B") {
    console.log(`[AB] existing cookie → ${existing}`);
    return { variant: existing, isNew: false };
  }

  // 3. Tirage aléatoire 50/50
  const drawn: ABVariant = Math.random() < 0.5 ? "A" : "B";
  console.log(`[AB] random draw → ${drawn}`);
  return { variant: drawn, isNew: true };
}

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

  // --- A/B testing ---
  const { variant, isNew } = resolveABVariant(req);
  const response = NextResponse.next();

  if (isNew) {
    response.cookies.set(AB_COOKIE, variant, {
      httpOnly: false, // lisible en JS côté client (DevTools Application)
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 jours
    });
  }

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
