"use server";

import { verifyTeamCode } from "@/services/auth-service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginAction(prevState: any, formData: FormData) {
  const teamCode = formData.get("team_code") as string;
  const userCode = formData.get("user_code") as string;

  if (!teamCode || !userCode) {
    return { error: "Team code and User code are required" };
  }

  const result = await verifyTeamCode(teamCode, userCode);

  if (!result.success) {
    return { error: result.error };
  }

  const cookieStore = await cookies();
  cookieStore.set("mrts_team_id", result.team!.id);
  cookieStore.set("mrts_team_role", result.team!.role);

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("mrts_team_id");
  cookieStore.delete("mrts_team_role");

  redirect("/");
}
