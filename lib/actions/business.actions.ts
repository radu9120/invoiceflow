"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { CreateBusiness } from "@/schemas/invoiceSchema";
import { redirect } from "next/navigation";
import {
  BusinessDashboardPageProps,
  BusinessType,
  DashboardBusinessStats,
} from "@/types";
import { createActivity } from "./userActivity.actions";
export const createBusiness = async (
  formData: CreateBusiness
): Promise<BusinessType | null> => {
  const { userId: author } = await auth();
  if (!author) redirect("/sign-in");

  const supabase = createSupabaseClient();
  // Retry the insert a couple of times in case of transient network errors
  let attemptError: any = null;
  let created: any = null;
  for (let i = 0; i < 2; i++) {
    try {
      const { data, error } = await supabase
        .from("Businesses")
        .insert({ ...formData, author })
        .select()
        .single();
      if (error) {
        attemptError = error;
        const msg = String(error?.message || error);
        const transient =
          /fetch failed|ENOTFOUND|ECONNREFUSED|EAI_AGAIN|ETIMEDOUT/i.test(msg);
        if (i === 1 || !transient) break; // don't retry non-transient
      } else {
        created = data;
        attemptError = null;
        break; // success
      }
    } catch (err: any) {
      attemptError = err;
      const msg = String(err?.message || err);
      const transient =
        /fetch failed|ENOTFOUND|ECONNREFUSED|EAI_AGAIN|ETIMEDOUT/i.test(msg);
      if (i === 1 || !transient) break;
    }
    // small backoff before retry
    await new Promise((r) => setTimeout(r, 250));
  }

  if (!created) {
    // Log a robust snapshot server-side and return null so the UI can show a friendly error
    try {
      console.error(
        "Supabase insert Businesses failed",
        JSON.stringify(
          {
            message: String(attemptError?.message || attemptError),
            status: attemptError?.status,
            details: attemptError?.details,
            hint: attemptError?.hint,
          },
          null,
          2
        )
      );
    } catch (_) {}
    return null;
  }

  // Best-effort activity log; don't fail the main operation if logging fails
  try {
    await createActivity({
      user_id: author,
      business_id: created.id, // assuming this exists in the invoice schema
      action: "Created Business instance",
      target_type: "business",
      target_name: formData.name,
    });
  } catch (logErr: any) {
    try {
      console.warn(
        "createActivity failed after business creation",
        JSON.stringify({ message: String(logErr?.message || logErr) })
      );
    } catch (_) {}
  }

  return created as BusinessType;
};

export const getUserBusinesses = async () => {
  const { userId: author } = await auth();

  if (!author) {
    redirect("/sign-in");
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Businesses")
    .select("*")
    .eq("author", author)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to fetch businesses");
  }

  return data || [];
};

export const getBusinessById = async (businessId: number) => {
  const { userId: author } = await auth();

  if (!author) {
    redirect("/sign-in");
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Businesses")
    .select("*")
    .eq("id", businessId)
    .single();

  if (error) {
    throw new Error(error.message || "Failed to fetch business");
  }

  return data as BusinessType;
};

export const updateBusiness = async (
  businessId: number,
  formData: Partial<CreateBusiness>
) => {
  console.log(
    `Server: updateBusiness called for ID ${businessId} with formData:`,
    formData
  ); // ADD THIS LOG
  const { userId: author } = await auth();

  if (!author) {
    redirect("/sign-in");
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Businesses")
    .update(formData)
    .eq("id", businessId)
    .select()
    .single();

  if (error) {
    console.error("Supabase error updating business:", error.message);
    throw new Error(error.message || "Failed to update business.");
  }

  if (!data) {
    // This could happen if the businessId or author didn't match an existing record
    console.warn(`No business found or updated for ID: ${businessId}.`);
    throw new Error("Business not found or user not authorized to update it.");
  }

  const updatedBusiness: BusinessType = data;

  await createActivity({
    user_id: author,
    business_id: updatedBusiness.id,
    action: "Updated business details",
    target_type: "business",
    // Use the potentially new name from formData, or fallback to existing if not updated
    target_name: formData.name || updatedBusiness.name,
  });

  return data;
};

export const getBusiness = async ({
  business_id,
}: BusinessDashboardPageProps) => {
  const supabase = createSupabaseClient();

  let query = supabase
    .from("Businesses")
    .select("id, name, email")
    .eq("id", business_id)
    .single();

  const { data: business, error } = await query;

  if (error) throw new Error(error.message);

  return business;
};

export const getBusinessStats = async ({
  business_id,
}: BusinessDashboardPageProps) => {
  const supabase = createSupabaseClient();

  try {
    const { data: businessStats, error } = await supabase.rpc(
      "get_business_stats",
      { p_business_id: business_id }
    );
    if (error) throw error;
    return businessStats ? businessStats[0] : null;
  } catch (e: any) {
    // Useful server-side context
    console.error("Supabase RPC get_business_stats failed", {
      business_id,
      message: e?.message,
      status: e?.status,
      details: e?.details,
      hint: e?.hint,
    });
    throw new Error(e?.message || "Failed to fetch business stats");
  }
};

export const getDashboardStats = async (): Promise<
  DashboardBusinessStats[]
> => {
  const { userId: author } = await auth();
  if (!author) redirect("/sign-in");

  const supabase = createSupabaseClient();
  try {
    // Inline retry (2 attempts) for transient network failures
    let rpcData: any = null;
    let rpcError: any = null;
    for (let i = 0; i < 2; i++) {
      try {
        const { data, error } = await supabase.rpc("get_all_dashboard_stats", {
          p_author_id: author,
        });
        rpcData = data;
        rpcError = error;
        break; // success path (even if error is non-network, we'll handle below)
      } catch (err: any) {
        const msg = String(err?.message || err);
        const transient =
          /fetch failed|ENOTFOUND|ECONNREFUSED|EAI_AGAIN|ETIMEDOUT/i.test(msg);
        if (i === 1 || !transient) throw err;
        await new Promise((r) => setTimeout(r, 250));
      }
    }

    if (rpcError) throw rpcError;
    return rpcData ?? [];
  } catch (e: any) {
    // Distinguish generic network error (fetch failed) from Supabase errors
    const isNetwork = /fetch failed|ENOTFOUND|ECONNREFUSED|EAI_AGAIN/i.test(
      String(e?.message || e)
    );
    // Log a robust snapshot of the error
    try {
      console.error(
        "Supabase RPC get_all_dashboard_stats failed",
        JSON.stringify(
          {
            author,
            message: String(e?.message || e),
            status: e?.status,
            details: e?.details,
            hint: e?.hint,
            isNetwork,
          },
          null,
          2
        )
      );
    } catch (_) {
      // do nothing if console fails
    }

    // Fallback: compute a minimal dashboard list without the RPC so the page can render
    try {
      const { data: businesses, error: bizErr } = await supabase
        .from("Businesses")
        .select("id, name, created_at")
        .eq("author", author)
        .order("created_at", { ascending: false });
      if (bizErr) throw bizErr;

      // For fallback, set counts to 0; optionally, we could query counts per business to be richer
      const fallback: DashboardBusinessStats[] = (businesses || []).map(
        (b: any) => ({
          id: b.id,
          name: b.name,
          totalinvoices: 0,
          totalrevenue: 0,
          totalclients: 0,
          created_on: b.created_at,
        })
      );
      return fallback;
    } catch (fallbackErr: any) {
      try {
        console.error(
          "Dashboard fallback query failed",
          JSON.stringify(
            { message: String(fallbackErr?.message || fallbackErr) },
            null,
            2
          )
        );
      } catch (_) {}
      if (isNetwork) {
        console.warn(
          "Dashboard is running in offline mode: returning empty stats array"
        );
        return [];
      }
      throw new Error(
        String(e?.message || e) || "Failed to load dashboard stats"
      );
    }
  }
};
