// Protect app routes with NextAuth middleware (v5)
// Excludes: /login, all /api routes, Next.js static/image assets, and favicon
// Uses callbacks.authorized from src/auth.js to determine if a user is authenticated.

export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
