import { authConfig } from "../../../../lib/auth";
import NextAuth from "next-auth/next";

console.log("Type of authConfig in route.js:", typeof authConfig);

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };