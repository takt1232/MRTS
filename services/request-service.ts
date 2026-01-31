import { createClient } from "@/lib/supabase";
import { MarketingRequest, Team } from "@/types";
import { getCurrentTeam } from "./auth-service";

export async function getRequests(): Promise<MarketingRequest[]> {
  const supabase = await createClient();
  const currentTeam = await getCurrentTeam();

  if (!currentTeam) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase.rpc("get_requests", {
    p_user_code: currentTeam.userCode,
  });

  if (error) {
    throw new Error(`Failed to fetch requests: ${error.message}`);
  }

  return data as MarketingRequest[];
}

export async function createRequest(payload: {
  title: string;
  description: string;
  requester_name: string;
  requester_phone: string;
  due_date: string | null;
  priority: MarketingRequest["priority"];
}) {
  const supabase = await createClient();
  const currentTeam = await getCurrentTeam();

  if (!currentTeam) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase.rpc("create_request", {
    p_title: payload.title,
    p_description: payload.description,
    p_requester_name: payload.requester_name,
    p_requester_phone: payload.requester_phone,
    p_due_date: payload.due_date,
    p_priority: payload.priority,
    p_team_code: currentTeam.code,
    p_user_code: currentTeam.userCode,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as MarketingRequest;
}

export async function updateRequest(
  id: string,
  payload: Partial<MarketingRequest>,
) {
  const supabase = await createClient();
  const currentTeam = await getCurrentTeam();

  if (!currentTeam) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase.rpc("update_request", {
    p_id: id,
    p_payload: payload,
    p_user_code: currentTeam.userCode,
    p_team_code: currentTeam.code,
    p_is_admin: currentTeam.role === "admin",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as MarketingRequest;
}
