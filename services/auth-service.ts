import { createClient } from "@/lib/supabase";
import { Team, TeamRole } from "@/types";
import { cookies } from "next/headers";

export async function verifyTeamCode(teamCode: string, userCode: string) {
  const supabase = await createClient();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, name, role, team_code, user_code")
    .eq("team_code", teamCode)
    .eq("user_code", userCode)
    .single();

  console.log("verifyTeamCode attempt:", { teamCode, userCode });

  if (userError || !user) {
    console.error("Login database check failed:", userError || "No user found");
    return { success: false, error: "Invalid Team or User Code" };
  }

  console.log("User found:", user);

  const team: Team = {
    id: user.id,
    name: user.name || "User",
    code: user.team_code || teamCode,
    userCode: user.user_code || userCode,
    role: user.role as TeamRole,
  };

  // 2. Sign in Anonymously and store the team info in user_metadata
  const { error: authError } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        team_id: team.id,
        team_name: team.name,
        role: team.role,
      },
    },
  });

  if (authError) {
    console.error("Auth error", authError);
    return { success: false, error: authError.message };
  }

  return { success: true, team };
}

export async function getCurrentTeam(): Promise<Team | null> {
  const cookieStore = await cookies();
  const teamId = cookieStore.get("mrts_team_id")?.value;

  if (!teamId) return null;

  const supabase = await createClient();
  const { data: user } = await supabase
    .from("users")
    .select("id, name, role, team_code, user_code")
    .eq("id", teamId)
    .single();

  console.log("getCurrentTeam check for ID:", teamId);

  if (!user) {
    console.error("No user found in session check for ID:", teamId);
    return null;
  }

  console.log("User session validated:", user);

  return {
    id: user.id,
    name: user.name || "User",
    code: user.team_code || "",
    userCode: user.user_code || "",
    role: user.role as TeamRole,
  };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("mrts_team_id");
  cookieStore.delete("mrts_team_role");
}
