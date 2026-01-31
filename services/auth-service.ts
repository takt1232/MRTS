import { createClient } from "@/lib/supabase";
import { Team } from "@/types";
import { cookies } from "next/headers";

export async function verifyTeamCode(code: string) {
  const supabase = await createClient();

  // 1. Verify the code exists in your 'teams' table
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("id, name")
    .eq("code", code)
    .single();

  if (teamError || !team) {
    return { success: false, error: "Invalid Team Code" };
  }

  // 2. Sign in Anonymously and store the team info in user_metadata
  const { data, error: authError } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        team_id: team.id,
        team_name: team.name,
      },
    },
  });

  if (authError) return { success: false, error: authError.message };

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
