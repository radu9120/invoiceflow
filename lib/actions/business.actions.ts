"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { CreateBusiness } from "@/schemas/invoiceSchema";
import { redirect } from "next/navigation";
import { BusinessDashboardPageProps, BusinessType, DashboardBusinessStats } from "@/types";
import { createActivity } from "./userActivity.actions";

export const createBusiness = async (formData: CreateBusiness) => {
  const { userId: author } = await auth();
  if (!author) redirect('/sign-in')

  const supabase = createSupabaseClient();

  const { data: business, error } = await supabase
    .from("Businesses")
    .insert({ ...formData, author })
    .select()
    .single()

  if (error || !business)
    throw new Error(error?.message || "Failed to create a business");


  await createActivity({
    user_id: author,
    business_id: business.id, // assuming this exists in the invoice schema
    action: "Created Business instance",
    target_type: "business",
    target_name: formData.name,
  });

  return business;
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
  const { userId: author } = await auth();

  if (!author) {
    redirect('/sign-in');
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

  const updatedBusiness: BusinessType = data

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

export const getBusiness = async ({ business_id } : BusinessDashboardPageProps) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("Businesses").select('id, name, email').eq('id', business_id).single();

  const { data: business, error } = await query;

  if (error) throw new Error(error.message);

  return business;
}


export const getBusinessStats = async ({ business_id } : BusinessDashboardPageProps) => {
  const supabase = createSupabaseClient();

  const { data: businessStats, error } = await supabase.rpc('get_business_stats', { p_business_id: business_id })
  if (error) throw new Error(error.message);

  return businessStats ? businessStats[0] : null
}

export const getDashboardStats = async (): Promise<DashboardBusinessStats[]> => {
  const { userId: author } = await auth();
  if (!author) redirect('/sign-in')

  const supabase = createSupabaseClient();
  const {data: dashboardStats, error } = await supabase.rpc('get_all_dashboard_stats', { p_author_id: author })

  if (error) throw new Error(error.message);

  return dashboardStats ?? []
}



