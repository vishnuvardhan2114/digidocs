import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/checkout", "/checkout/success", "/dashboard", "/profile"];

// Routes that should redirect to home if already authenticated
const authRoutes = ["/sign-in", "/sign-up"];

// Public routes (accessible to everyone)
const publicRoutes = ["/", "/services", "/about", "/contact"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user has auth session cookie
  const authCookie = request.cookies.get("auth_session");
  const isAuthenticated = !!authCookie;

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users from protected routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isAuthenticated && isProtectedRoute) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};

