interface Company {
  id: string;
  name: string;
  email: string;
  address: string;
  phone?: string;
  vat?: number;
  logo?: string;
  created_at: string;
  author: string;
}

// Extended interface for dashboard usage i need this
export interface CompanyWithStats {
  invoices: number;
  clients: number;
  revenue: string;
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

interface NewInvoicePageProps {
    searchParams: {
        business_id?: string
        client_id?: string
        from?: string
    }
}


interface BusinessStatistics {
  statistic: {
    total_invoices: number;
    total_paid_amount: string;
    total_overdue_invoices: number;
    total_clients: number;
    total_paid_invoices: number;
    total_pending_invoices: number;
    total_paid_amount_current_month: string;

  }
}

interface BusinessDashboardPageProps {
  business_id: number
  name?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
  filter?: string;
}


export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  tax: number;
  amount: number;
}

export interface Invoice {
  id: string;
  number: string;
  bill_to: ClientType
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate: string;
  createdDate: string;
  description: string;
  items: InvoiceItem[];
  subtotal: number;
  total: number;
  notes: string;
}

interface InvoiceListItem {
  id: string;
  invoice_number: string;
  total: number;
  status: string;
  due_date: string;

}

interface UserActivityLog {
  user_id: string;
  business_id?: number;
  action: 'Created invoice' | 'Updated invoice content' | 'Updated invoice status' | 'Created Business instance' | 'Updated business details';
  target_type: 'invoice' | 'business' | 'client';
  target_name?: string;
  metadata?: { from: string; to: string};
  created_at?: string;
}

interface GetBusinessActivityProps {
  business_id: number;
  limit?: number;
}