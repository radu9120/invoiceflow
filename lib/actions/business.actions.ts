"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { CreateBusiness } from "@/schemas/invoiceSchema";
import { redirect } from "next/navigation";

export const createBusiness = async (formData: CreateBusiness) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Businesses")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a business");

  return data[0];
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
