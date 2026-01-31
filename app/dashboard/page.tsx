import { getCurrentTeam } from "@/services/auth-service";
import { getRequests } from "@/services/request-service";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const team = await getCurrentTeam();

  if (!team) {
    redirect("/");
  }

  const requests = await getRequests();

  return <DashboardClient team={team} requests={requests} />;
}
