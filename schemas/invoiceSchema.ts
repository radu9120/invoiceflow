import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const phoneType = z
  .string()
  .regex(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number")
  .optional();

const itemSchema = z.object({
  description: z.string().min(1, { message: "Item description is required" }),
  unit_price: z.coerce
    .number()
    .min(1, { message: "Price per unit is required" }),
  quantity: z.coerce.number().min(1, { message: "Quantity is required" }),
  tax: z.coerce.number().optional(),
  amount: z.coerce.number().min(1, { message: "Ammount is required" }),
});

export const billToSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  address: z.string().min(1, { message: "Quantity is required" }),
  phone: phoneType,
  business_id: z.coerce.number().min(1, { message: "Business is required" }),
});

export type CreateClient = z.infer<typeof billToSchema>;

export const companySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  address: z.string().min(1, { message: "Quantity is required" }),
  phone: phoneType,
  vat: z.coerce.number().optional(),
  logo: z.string().optional() || undefined,
});

export type CreateBusiness = z.infer<typeof companySchema>;

export const formSchema = z.object({
  invoice_number: z.string().min(1, { message: "Invoice number is required." }),
  description: z
    .string()
    .min(1, { message: "Invoice description is required." }),
  company_details: companySchema,
  bill_to: billToSchema,
  issue_date: z.coerce.date({ required_error: "Invoice date is required." }),
  due_date: z.coerce.date({ required_error: "Due date is required." }),
  items: z.array(itemSchema).min(1, { message: "Min 1 item is required." }),
  subtotal: z.coerce.number(),
  discount: z.coerce.number().optional(),
  shipping: z.coerce.number().optional(),
  total: z.coerce.number(),
  notes: z.string().optional(),
  bank_details: z.string().optional(),
  logo: z.string().optional(),
  currency: z.string().min(1, { message: "Logo is required." }),
  client_id: z.number()
});

export type CreateInvoice = z.infer<typeof formSchema>;
