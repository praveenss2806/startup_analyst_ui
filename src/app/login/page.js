import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

// Login page with "Continue with Google"
// - If already authenticated, redirect to the intended page or home
// - If unauthenticated, show a server-action button to start Google OAuth
export default async function LoginPage({ searchParams }) {
  const session = await auth();

  // If user is already authenticated, send them to the original target or home
  const callbackUrl =
    (typeof searchParams?.callbackUrl === "string" && searchParams.callbackUrl) ||
    "/";

  if (session?.user) {
    redirect(callbackUrl);
  }

  // Server action to trigger Google sign-in and preserve callback
  async function login() {
    "use server";
    await signIn("google", { redirectTo: callbackUrl });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-gray-500">
            Continue to access the Startup Analyst platform
          </p>
        </div>

        <form action={login} className="space-y-4">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/50"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.5c-.2 1.3-1.7 3.7-5.5 3.7-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.7C16.8 3 14.6 2 12 2 6.9 2 2.7 6.2 2.7 11.3S6.9 20.7 12 20.7c6.9 0 9.3-4.8 9.3-7.2 0-.5 0-.8-.1-1.2H12z"
              />
            </svg>
            Continue with Google
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-500">
          You will be redirected back to your original page after signing in.
        </p>
      </div>
    </main>
  );
}
