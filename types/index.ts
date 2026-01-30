export type TeamRole = "requestor" | "admin";

export interface Team {
  id: string;
  name: string;
  code: string; // The shared access code
  role: TeamRole;
  created_at?: string;
}

export type RequestStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "rejected";

export interface MarketingRequest {
  id: string;
  title: string;
  description?: string;
  status: RequestStatus;
  team_id: string;
  created_at?: string;
  updated_at?: string;
}
