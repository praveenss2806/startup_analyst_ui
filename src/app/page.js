import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StartupAnalystPlatform from "../components/startupAnalyst";

export default async function Home() {
  const session = await auth();

  // If not authenticated, send to the custom login page
  if (!session?.user) {
    redirect("/login");
  }

  // Authenticated users see the main app
  return <StartupAnalystPlatform />;
}
