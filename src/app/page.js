"use client";
import StartupAnalystPlatform from "../components/startupAnalyst";
import SignInButton from "../components/SignInButton";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome to LetsAnalyse</h1>
        <p className="text-lg mb-8">Please sign in to continue.</p>
        <SignInButton />
      </div>
    );
  }

  return (
    <>
      <StartupAnalystPlatform />
    </>
  );
}
