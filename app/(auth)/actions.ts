"use server";

import { verifyTeamCode } from "@/services/auth-service";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const code = formData.get("code") as string;

  if (!code) {
    return { error: "Team code is required" };
  }

  const result = await verifyTeamCode(code);

  if (!result.success) {
    return { error: result.error };
  }

  redirect("/dashboard");
}
