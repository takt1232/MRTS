import { createClient } from "@/lib/supabase";
import { Team } from "@/types";
import { cookies } from "next/headers";

export async function verifyTeamCode(teamCode: string, userCode: string) {
  const supabase = await createClient();

  const { data: team, error: teamError } = await supabase
    .from("users")
    .select("id, name")
    .eq("team_code", teamCode)
    .eq("user_code", userCode)
    .single();

  if (teamError || !team) {
    console.error("Team not found", teamError);
    return { success: false, error: "Invalid Team Code" };
  }

  // TODO: Verify userCode against a users table or specific logic
  // For now, we accept any non-empty userCode if the teamCode is valid

  // Polyfill role until it's in the DB
  const role = team.name;
  const teamWithRole: Team = { ...team, code: teamCode, role };

  // 2. Sign in Anonymously and store the team info in user_metadata
  const { data, error: authError } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        team_id: team.id,
        team_name: team.name,
      },
    },
  });

  if (authError) {
    console.error("Auth error", authError);
    return { success: false, error: authError.message };
  }

  return { success: true, team: teamWithRole };
}

export async function getCurrentTeam(): Promise<Team | null> {
  const cookieStore = await cookies();
  const teamId = cookieStore.get("mrts_team_id")?.value;

  if (!teamId) return null;

  const supabase = await createClient();
  const { data: team } = await supabase
    .from("users")
    .select("*")
    .eq("id", teamId)
    .single();

  if (!team) return null;

  // Polyfill role
  const role = team.role;

  return { ...team, role } as Team;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("mrts_team_id");
  cookieStore.delete("mrts_team_role");
}
