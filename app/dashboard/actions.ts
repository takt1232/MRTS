"use server";

import { createRequest, updateRequest } from "@/services/request-service";
import { revalidatePath } from "next/cache";
import { MarketingRequest } from "@/types";

export async function createRequestAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const requester_name = formData.get("requester_name") as string;
  const requester_phone = formData.get("requester_phone") as string;
  const due_date = formData.get("due_date") as string;
  const priority = formData.get("priority") as MarketingRequest["priority"];

  try {
    await createRequest({
      title,
      description,
      requester_name,
      requester_phone,
      due_date: due_date || null,
      priority: priority || "medium",
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateRequestAction(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as MarketingRequest["status"];
  const priority = formData.get("priority") as MarketingRequest["priority"];
  const admin_notes = formData.get("admin_notes") as string;

  try {
    const payload: Partial<MarketingRequest> = {};
    if (title) payload.title = title;
    if (description) payload.description = description;
    if (status) payload.status = status;
    if (priority) payload.priority = priority;
    if (admin_notes) payload.admin_notes = admin_notes;

    await updateRequest(id, payload);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
