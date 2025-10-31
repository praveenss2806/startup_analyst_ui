// Central NextAuth config (v5) for the app.
// Uses Google as the only provider and redirects unauthenticated users to /login.
// Ensure you set AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, and AUTH_SECRET in your environment.

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // Use JWT sessions (default in v5)
  session: { strategy: "jwt" },
  // Custom sign in page
  pages: { signIn: "/login" },
  // Allow non-standard host headers during local/dev
  trustHost: true,
  // This is used by the middleware to determine if the request is authorized
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
