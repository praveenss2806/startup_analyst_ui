import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Upload</h1>
      <p className="text-lg">
        Signed in as{" "}
        <span className="font-semibold">
          {session.user?.email ?? session.user?.name ?? "Unknown user"}
        </span>
      </p>
      <p className="text-gray-500">
        This is a placeholder page to complete the Google sign-in redirect.
      </p>
    </main>
  );
}
