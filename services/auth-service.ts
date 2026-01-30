import { createClient } from "@/lib/supabase";
import { Team } from "@/types";
import { cookies } from "next/headers";

export async function verifyTeamCode(
  code: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // 1. Validate code against DB
  const { data: team, error } = await supabase
    .from("teams")
    .select("*")
    .eq("code", code)
    .single();

  console.log(error);

  if (error || !team) {
    return { success: false, error: "Invalid Team Code" };
  }

  // 2. Create Session (using cookies)
  // implementing a simple cookie-based session for the team
  const cookieStore = await cookies();

  // In a real app, you might sign a JWT here.
  // For this pattern, we'll store the team_id and role securely enough for the demo.
  cookieStore.set("mrts_team_id", team.id, { httpOnly: true, secure: true });
  cookieStore.set("mrts_team_role", team.role, {
    httpOnly: true,
    secure: true,
  });

  return { success: true };
}

export async function getCurrentTeam(): Promise<Team | null> {
  const cookieStore = await cookies();
  const teamId = cookieStore.get("mrts_team_id")?.value;

  if (!teamId) return null;

  const supabase = await createClient();
  const { data: team } = await supabase
    .from("teams")
    .select("*")
    .eq("id", teamId)
    .single();

  return team as Team;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("mrts_team_id");
  cookieStore.delete("mrts_team_role");
}
