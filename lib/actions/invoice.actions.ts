"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { CreateInvoice } from "@/schemas/invoiceSchema";
import { BusinessDashboardPageProps } from "@/types";
import { createActivity } from "./userActivity.actions";
import { redirect } from "next/navigation";

export const createInvoice = async (formData: CreateInvoice) => {
  const { userId: author } = await auth();
  if (!author) redirect('/sign-in')

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Invoices")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create an invoice");

  const invoice = data[0]

  await createActivity({
    user_id: author,
    business_id: formData.business_id, // assuming this exists in the invoice schema
    action: "Created invoice",
    target_type: "invoice",
    target_name: formData.invoice_number,    
  });

  return invoice;
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

  let query = supabase.from("Invoices").select("id, invoice_number, total, status, due_date").eq('business_id', business_id)

  if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`)
  }

  query = query.range((page-1) * limit, page * limit - 1)

  const { data: clients, error } = await query;

  if (error) throw new Error(error.message);

  return clients;
};

