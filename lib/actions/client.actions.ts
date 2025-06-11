"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { billToSchema, CreateClient } from "@/schemas/invoiceSchema";
import { GetAllClientsParams, GetClientParam } from "@/types";
import { redirect } from "next/navigation";
import { createActivity } from "./userActivity.actions";
import z from "zod";
import { revalidatePath } from "next/cache";

export const createClient = async (formData: CreateClient) => {
  const { userId: author } = await auth();
  if (!author) redirect("/sign-in");

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Clients")
    .insert({ ...formData })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a client");

  const client = data[0];

  await createActivity({
    user_id: author,
    business_id: formData.business_id, // assuming this exists in the invoice schema
    action: "Created Business instance",
    target_type: "client",
    target_name: formData.name,
  });

  return data[0];
};
export const updateClient = async (
  clientData: z.infer<typeof billToSchema> & { id: number | string }
) => {
  const { userId: author } = await auth();
  if (!author) {
    throw new Error("User not authenticated. Please sign in.");
  }

  const { id, ...dataToUpdate } = clientData;

  if (!id) {
    throw new Error("Client ID is required for an update.");
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Clients")
    .update(dataToUpdate)
    .eq("id", id)
    .eq("business_id", dataToUpdate.business_id)
    .select()
    .single();

  if (error || !data) {
    console.error("Supabase update client error:", error);
    throw new Error(error?.message || "Failed to update the client.");
  }

  await createActivity({
    user_id: author,
    business_id: data.business_id,
    action: "Updated Client instance",
    target_type: "client",
    target_name: data.name,
  });

  // Revalidate paths where this client's data might be displayed
  revalidatePath(`/dashboard/clients`);
  revalidatePath(`/dashboard/clients?business_id=${data.business_id}`);

  return data;
};

export const getAllClients = async ({
  business_id,
  limit = 10,
  page = 1,
  searchTerm,
}: GetAllClientsParams) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("Clients").select().eq("business_id", business_id);

  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: clients, error } = await query;

  if (error) throw new Error(error.message);

  return clients;
};

export const getClients = async ({ business_id }: GetAllClientsParams) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("Clients").select().eq("business_id", business_id);

  const { data: clients, error } = await query;

  if (error) throw new Error(error.message);

  return clients;
};

export const getClient = async ({ client_id }: GetClientParam) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("Clients").select().eq("id", client_id).single();

  const { data: client, error } = await query;

  if (error) throw new Error(error.message);

  return client;
};
