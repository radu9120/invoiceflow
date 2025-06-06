interface CreateInvoiceHistory {
  invoice_number: string;
  company_details: string;
  bill_to: string;
  date: string;
  due_date: string;
  items: InvoiceItems[];
  subtotal: string;
  tax?: string;
  discount?: string;
  shipping?: string;
  total: string;
  notes: string;
  bank_details: string;
  logo: string;
}

interface InvoiceItems {
  description: string;
  unit_price: string;
  quantity: string;
  amount: string;
}

interface Company {
  id: string;
  name: string;
  email: string;
  address: string;
  phone?: string;
  vat?: number;
  logo?: string;
  status: string;
  created_at: string;
  author: string;
}

// Extended interface for dashboard usage i need this
export interface CompanyWithStats extends Company {
  plan: "free" | "pro" | "enterprise";
  invoices: number;
  clients: number;
  revenue: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate: string;
  createdDate: string;
  description: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
}

export interface DashboardStats {
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalClients: number;
  activeClients: number;
}

interface GetAllClients {
  limit?: number;
  page?: number;
  searchTerm?: string;
  business_id: number;
}

interface GetClient {
  client_id: number;
}

interface SearchParams {
  searchTerm?: string;
}

interface ClientType {
  id: number;
  name: string;
  email: string;
  address: string;
  phone?: string;
  business_id: number;
}

interface BusinessType {
  id: number;
  name: string;
  email: string;
  address: string;
  phone?: string;
  vat?: number
}
