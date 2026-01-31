export type TeamRole =
  | "requestor"
  | "admin"
  | "marketing"
  | "sales"
  | "product";

export interface Team {
  id: string;
  name: string;
  code: string; // The team code (e.g., TEAM-SALES)
  userCode: string; // The specific user's login code
  role: TeamRole;
  created_at?: string;
}

export type RequestStatus =
  | "pending"
  | "approved"
  | "in_progress"
  | "completed"
  | "rejected";

export type PriorityLevel = "low" | "medium" | "high" | "urgent";

export interface MarketingRequest {
  id: string;
  created_at: string;
  updated_at: string;
  tracking_code: string;
  requester_name: string;
  requester_phone: string;
  department: string;
  title: string;
  description: string | null;
  due_date: string | null;
  status: RequestStatus;
  priority: PriorityLevel;
  assigned_to: string | null;
  admin_notes: string | null;
  final_assets: any[] | null;
  team_code: string | null;
}
