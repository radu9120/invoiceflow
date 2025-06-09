"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { CreateBusiness } from "@/schemas/invoiceSchema";
import { redirect } from "next/navigation";
import { BusinessDashboardPageProps, DashboardBusinessStats } from "@/types";
import { createActivity } from "./userActivity.actions";

export const createBusiness = async (formData: CreateBusiness) => {
  const { userId: author } = await auth();
  if (!author) redirect('/sign-in')

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Businesses")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a business");

  const business = data[0]

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

export const getBusinessById = async (businessId: string) => {
  const { userId: author } = await auth();

  if (!author) {
    throw new Error("User not authenticated");
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Businesses")
    .select("*")
    .eq("id", businessId)
    .eq("author", author)
    .single();

  if (error) {
    throw new Error(error.message || "Failed to fetch business");
  }

  return data;
};

export const updateBusiness = async (
  businessId: string,
  updateData: Partial<CreateBusiness>
) => {
  const { userId: author } = await auth();

  if (!author) {
    throw new Error("User not authenticated");
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Businesses")
    .update(updateData)
    .eq("id", businessId)
    .eq("author", author)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to update business");
  }

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



