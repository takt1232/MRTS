import { createClient } from "@/lib/supabase";
import { MarketingRequest } from "@/types";
import { getCurrentTeam } from "./auth-service";

export async function getTasks(): Promise<MarketingRequest[]> {
  const supabase = await createClient();
  const currentTeam = await getCurrentTeam();

  if (!currentTeam) {
    throw new Error("Unauthorized");
  }

  let query = supabase.from("requests").select("*");

  // Role-Based Access Control (Server-Side Filtering)
  if (currentTeam.role === "requestor") {
    // Requestors only see their own team's requests
    query = query.eq("team_id", currentTeam.id);
  } else if (currentTeam.role === "admin") {
    // Admins see ALL requests (no filter added)
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }

  return data as MarketingRequest[];
}
