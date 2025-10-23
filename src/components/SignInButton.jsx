import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex gap-4 ml-auto items-center">
        <p className="text-sky-600">{session.user.name}</p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn("google")}
      className="px-6 py-3 rounded-lg text-white font-semibold bg-[#0099ff] hover:bg-[#007acc] transition-colors shadow-lg"
    >
      Sign In with Google
    </button>
  );
}
