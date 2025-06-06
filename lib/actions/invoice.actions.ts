"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { CreateInvoice } from "@/schemas/invoiceSchema";
import { BusinessDashboardPageProps, GetAllClients } from "@/types";

export const createInvoice = async (formData: CreateInvoice) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Invoices")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create an invoice");

  return data[0];
};

//incorect, invoices must be selected by business id => clients id
export const getInvoicesByAuthor = async () => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Invoices")
    .select("*")
    .eq("author", author)
    .order("created_at", { ascending: false });

  if (error || !data)
    throw new Error(error?.message || "Failed to fetch invoices");

  return data;
};


export const getInvoicesList = async ({business_id, limit = 5, page = 1, searchTerm} : BusinessDashboardPageProps) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("Invoices").select().eq('business_id', business_id)

  if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`)
  }

  query = query.range((page-1) * limit, page * limit - 1)

  const { data: clients, error } = await query;

  if (error) throw new Error(error.message);

  return clients;
};

