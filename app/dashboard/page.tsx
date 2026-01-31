import { getCurrentTeam } from "@/services/auth-service";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const team = await getCurrentTeam();

  if (!team) {
    redirect("/");
  }

  return <DashboardClient team={team} />;
}
