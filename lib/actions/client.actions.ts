"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { CreateClient } from "@/schemas/invoiceSchema";
import { GetAllClients, GetClient } from "@/types";


export const createClient = async (formData: CreateClient) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Clients")
    .insert({ ...formData })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a client");

  return data[0];
};


export const getAllClients = async ({business_id, limit = 10, page = 1, searchTerm} : GetAllClients) => {
    const supabase = createSupabaseClient();

    let query = supabase.from("Clients").select().eq('business_id', business_id)

    if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
    }

    query = query.range((page-1) * limit, page * limit - 1)

    const { data: clients, error } = await query;

    if (error) throw new Error(error.message);

    return clients;
}

export const getClients = async ({business_id} : GetAllClients) => {
    const supabase = createSupabaseClient();

    let query = supabase.from("Clients").select().eq('business_id', business_id)

    const { data: clients, error } = await query;

    if (error) throw new Error(error.message);

    return clients;
}


export const getClient = async ({client_id} : GetClient) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("Clients").select().eq('id', client_id).single();

  const { data: client, error } = await query;

  if (error) throw new Error(error.message);

  return client;
}
