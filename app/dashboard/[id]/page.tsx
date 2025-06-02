"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Plus,
  Building,
  Users,
  FileText,
  DollarSign,
  Calendar,
  TrendingUp,
  Eye,
  Edit,
  Settings,
  Crown,
  Loader2,
  Download,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Filter,
  Search,
  MoreVertical,
  X,
  Mail,
  Phone,
  MapPin,
  Save,
  Trash2,
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  plan: "free" | "pro" | "enterprise";
  invoices: number;
  clients: number;
  revenue: string;
  status: "active" | "inactive";
}

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
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

interface Client {
  id: string;
  name: string;
  email: string;
  totalInvoices: number;
  totalRevenue: number;
  status: "active" | "inactive";
}

interface DashboardStats {
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalClients: number;
  activeClients: number;
}

export default function CompanyDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [companyId, setCompanyId] = useState<string>("");
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalInvoices: 0,
    paidInvoices: 0,
    pendingInvoices: 0,
    overdueInvoices: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalClients: 0,
    activeClients: 0,
  });

  // Advanced Invoice creation modal state
  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] =
    useState(false);
  const [newInvoice, setNewInvoice] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    description: "",
    dueDate: "",
    items: [
      {
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ] as InvoiceItem[],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: "",
  });

  // Settings modal state
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editCompany, setEditCompany] = useState({
    name: "",
    plan: "free" as "free" | "pro" | "enterprise",
  });

  // Resolve params
  useEffect(() => {
    params.then((resolvedParams) => {
      setCompanyId(resolvedParams.id);
    });
  }, [params]);

  // Authentication check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Load company data
  useEffect(() => {
    if (companyId) {
      const loadCompanyData = async () => {
        try {
          const storedCompanies = localStorage.getItem("companies");
          let foundCompany = null;

          if (storedCompanies) {
            const companies = JSON.parse(storedCompanies);
            foundCompany = companies.find((c: Company) => c.id === companyId);
          }

          const mockCompany: Company = foundCompany || {
            id: companyId,
            name: `Company ${companyId}`,
            plan: "free",
            invoices: 0,
            clients: 0,
            revenue: "$0",
            status: "active",
          };

          const mockInvoices: Invoice[] = [];
          const mockClients: Client[] = [];

          setCompany(mockCompany);
          setEditCompany({
            name: mockCompany.name,
            plan: mockCompany.plan,
          });
          setInvoices(mockInvoices);
          setClients(mockClients);

          const totalInvoices = mockInvoices.length;
          const paidInvoices = mockInvoices.filter(
            (inv) => inv.status === "paid"
          ).length;
          const pendingInvoices = mockInvoices.filter(
            (inv) => inv.status === "sent"
          ).length;
          const overdueInvoices = mockInvoices.filter(
            (inv) => inv.status === "overdue"
          ).length;
          const totalRevenue = mockInvoices
            .filter((inv) => inv.status === "paid")
            .reduce((sum, inv) => sum + inv.amount, 0);

          const thisMonth = new Date().getMonth();
          const monthlyRevenue = mockInvoices
            .filter(
              (inv) =>
                inv.status === "paid" &&
                new Date(inv.createdDate).getMonth() === thisMonth
            )
            .reduce((sum, inv) => sum + inv.amount, 0);

          setStats({
            totalInvoices,
            paidInvoices,
            pendingInvoices,
            overdueInvoices,
            totalRevenue,
            monthlyRevenue,
            totalClients: mockClients.length,
            activeClients: mockClients.filter((c) => c.status === "active")
              .length,
          });

          setLoading(false);
        } catch (error) {
          console.error("Error loading company data:", error);
          router.push("/dashboard");
        }
      };

      loadCompanyData();
    }
  }, [companyId, router]);

  // Show loading while checking auth or loading company
  if (!isLoaded || !isSignedIn || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
          <p className="text-secondary-text">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white flex items-center justify-center">
        <div className="text-center">
          <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-header-text mb-2">
            Company Not Found
          </h1>
          <p className="text-secondary-text mb-6">
            The company you're looking for doesn't exist or you don't have
            access to it.
          </p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "free":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Free
          </span>
        );
      case "pro":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            <Crown className="h-3 w-3 mr-1" />
            Pro
          </span>
        );
      case "enterprise":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            <Crown className="h-3 w-3 mr-1" />
            Enterprise
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </span>
        );
      case "sent":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            <Send className="h-3 w-3 mr-1" />
            Sent
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Overdue
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            <Edit className="h-3 w-3 mr-1" />
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  const canCreateInvoice = () => {
    if (company.plan === "free") {
      return invoices.length < 1;
    }
    return true;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Advanced invoice creation functions
  const updateInvoiceItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ): void => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (field === "quantity" || field === "rate") {
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].rate;
    }

    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + newInvoice.tax;

    setNewInvoice({
      ...newInvoice,
      items: updatedItems,
      subtotal,
      total,
    });
  };

  const addInvoiceItem = (): void => {
    const newItem: InvoiceItem = {
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };

    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, newItem],
    });
  };

  const removeInvoiceItem = (index: number): void => {
    const updatedItems = newInvoice.items.filter((_, i) => i !== index);
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + newInvoice.tax;

    setNewInvoice({
      ...newInvoice,
      items: updatedItems,
      subtotal,
      total,
    });
  };

  const handleCreateInvoice = () => {
    if (
      !newInvoice.clientName.trim() ||
      !newInvoice.clientEmail.trim() ||
      !newInvoice.dueDate ||
      newInvoice.items.some((item) => !item.description.trim())
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const invoice: Invoice = {
      id: Date.now().toString(),
      number: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      clientName: newInvoice.clientName,
      clientEmail: newInvoice.clientEmail,
      clientPhone: newInvoice.clientPhone,
      clientAddress: newInvoice.clientAddress,
      amount: newInvoice.total,
      description: newInvoice.description,
      status: "draft",
      dueDate: newInvoice.dueDate,
      createdDate: new Date().toISOString().split("T")[0],
      items: newInvoice.items,
      subtotal: newInvoice.subtotal,
      tax: newInvoice.tax,
      total: newInvoice.total,
      notes: newInvoice.notes,
    };

    setInvoices([...invoices, invoice]);

    // Reset form
    setNewInvoice({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientAddress: "",
      description: "",
      dueDate: "",
      items: [
        {
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
      subtotal: 0,
      tax: 0,
      total: 0,
      notes: "",
    });

    setIsCreateInvoiceModalOpen(false);

    setStats((prev) => ({
      ...prev,
      totalInvoices: prev.totalInvoices + 1,
    }));
  };

  const handleUpdateCompany = () => {
    if (!editCompany.name.trim()) {
      alert("Company name is required");
      return;
    }

    const updatedCompany = {
      ...company,
      name: editCompany.name,
      plan: editCompany.plan,
    };

    setCompany(updatedCompany);

    const storedCompanies = localStorage.getItem("companies");
    if (storedCompanies) {
      const companies = JSON.parse(storedCompanies);
      const updatedCompanies = companies.map((c: Company) =>
        c.id === company.id ? updatedCompany : c
      );
      localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    }

    setIsSettingsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Companies
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-header-text">
                    {company.name}
                  </h1>
                  {getPlanBadge(company.plan)}
                </div>
                <p className="text-secondary-text">
                  Company Dashboard - Manage your business
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  if (canCreateInvoice()) {
                    setIsCreateInvoiceModalOpen(true);
                  } else {
                    alert(
                      "Free plan allows only 1 invoice. Please upgrade to create more."
                    );
                  }
                }}
                disabled={!canCreateInvoice()}
                className={`${
                  canCreateInvoice()
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
              <Button
                onClick={() => setIsSettingsModalOpen(true)}
                variant="outline"
                className="border-blue-200"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              {company.plan === "free" && (
                <Button className="bg-gradient-to-r from-primary to-accent text-white">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-header-text">
                {stats.totalInvoices}
              </span>
            </div>
            <h3 className="font-semibold text-header-text mb-1">
              Total Invoices
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600 font-medium">
                {stats.paidInvoices} paid
              </span>
              <span className="text-sm text-secondary-text">
                • {stats.pendingInvoices} pending
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-header-text">
                {formatCurrency(stats.totalRevenue)}
              </span>
            </div>
            <h3 className="font-semibold text-header-text mb-1">
              Total Revenue
            </h3>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">
                {formatCurrency(stats.monthlyRevenue)} this month
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-header-text">
                {stats.totalClients}
              </span>
            </div>
            <h3 className="font-semibold text-header-text mb-1">
              Total Clients
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600 font-medium">
                {stats.activeClients} active
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-header-text">
                {stats.overdueInvoices}
              </span>
            </div>
            <h3 className="font-semibold text-header-text mb-1">
              Overdue Invoices
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-red-600 font-medium">
                {stats.overdueInvoices > 0 ? "Needs attention" : "All good!"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href={`/dashboard/${company.id}/clients`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-header-text">
                    Manage Clients
                  </h3>
                  <p className="text-sm text-secondary-text">
                    View and edit client information
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href={`/dashboard/${company.id}/analytics`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-header-text">
                    View Analytics
                  </h3>
                  <p className="text-sm text-secondary-text">
                    Track revenue and business insights
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Plan Limitations for Free Users */}
        {company.plan === "free" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Crown className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Free Plan Limitations
                </h3>
                <p className="text-yellow-700 mb-4">
                  You're currently on the Free plan. You can create up to 1
                  invoice and manage 1 company.
                </p>
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-sm">
                    <span className="font-medium">Invoices: </span>
                    <span
                      className={
                        invoices.length >= 1 ? "text-red-600 font-semibold" : ""
                      }
                    >
                      {invoices.length}/1
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Clients: </span>
                    <span>Unlimited</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Companies: </span>
                    <span>1/1</span>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-primary to-accent text-white">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro - Unlimited Invoices
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* All Invoices */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-header-text">All Invoices</h2>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-blue-200">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="border-blue-200">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {invoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-header-text mb-2">
                No Invoices Yet
              </h3>
              <p className="text-secondary-text mb-6">
                Create your first invoice to start tracking payments and
                managing your business.
              </p>
              <Button
                onClick={() => {
                  if (canCreateInvoice()) {
                    setIsCreateInvoiceModalOpen(true);
                  } else {
                    alert(
                      "Free plan allows only 1 invoice. Please upgrade to create more."
                    );
                  }
                }}
                disabled={!canCreateInvoice()}
                className={`${
                  canCreateInvoice()
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Invoice
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-100">
                    <th className="text-left py-3 px-4 font-medium text-secondary-text">
                      Invoice
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-secondary-text">
                      Client
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-secondary-text">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-secondary-text">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-secondary-text">
                      Due Date
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-secondary-text">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-blue-50 hover:bg-blue-50/50"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-header-text">
                            #{invoice.number}
                          </p>
                          <p className="text-sm text-secondary-text">
                            {formatDate(invoice.createdDate)}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-header-text">
                            {invoice.clientName}
                          </p>
                          <p className="text-sm text-secondary-text">
                            {invoice.clientEmail}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-header-text">
                          {formatCurrency(invoice.amount)}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-header-text">
                          {formatDate(invoice.dueDate)}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-blue-100"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-blue-100"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-blue-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
          <h2 className="text-xl font-bold text-header-text mb-6">
            Recent Activity
          </h2>

          {invoices.length === 0 && clients.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-secondary-text">
                No recent activity. Start by creating your first invoice or
                adding a client.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-header-text">
                    Company "{company.name}" created
                  </p>
                  <p className="text-sm text-secondary-text">
                    Welcome to InvoiceFlow! • Just now
                  </p>
                </div>
              </div>
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center gap-4 p-4 bg-green-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-header-text">
                      Invoice #{invoice.number} created
                    </p>
                    <p className="text-sm text-secondary-text">
                      {formatCurrency(invoice.amount)} • {invoice.clientName} •{" "}
                      {formatDate(invoice.createdDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Advanced Create Invoice Modal */}
      {isCreateInvoiceModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-blue-100">
              <div>
                <h2 className="text-2xl font-bold text-header-text">
                  Create New Invoice
                </h2>
                <p className="text-secondary-text">
                  Generate a detailed invoice for your client
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCreateInvoiceModalOpen(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              {/* Free Plan Warning */}
              {company.plan === "free" && invoices.length >= 1 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800 mb-1">
                        Invoice Limit Reached
                      </h4>
                      <p className="text-sm text-red-700">
                        Free plan allows only 1 invoice. Upgrade to Pro to
                        create unlimited invoices.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Client Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-header-text mb-4">
                    Client Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Client Name *
                      </label>
                      <Input
                        value={newInvoice.clientName}
                        onChange={(e) =>
                          setNewInvoice({
                            ...newInvoice,
                            clientName: e.target.value,
                          })
                        }
                        className="w-full"
                        placeholder="Enter client name"
                        disabled={
                          company.plan === "free" && invoices.length >= 1
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={newInvoice.clientEmail}
                        onChange={(e) =>
                          setNewInvoice({
                            ...newInvoice,
                            clientEmail: e.target.value,
                          })
                        }
                        className="w-full"
                        placeholder="client@example.com"
                        disabled={
                          company.plan === "free" && invoices.length >= 1
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Phone
                      </label>
                      <Input
                        value={newInvoice.clientPhone}
                        onChange={(e) =>
                          setNewInvoice({
                            ...newInvoice,
                            clientPhone: e.target.value,
                          })
                        }
                        className="w-full"
                        placeholder="+1 (555) 123-4567"
                        disabled={
                          company.plan === "free" && invoices.length >= 1
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Address
                      </label>
                      <Textarea
                        value={newInvoice.clientAddress}
                        onChange={(e) =>
                          setNewInvoice({
                            ...newInvoice,
                            clientAddress: e.target.value,
                          })
                        }
                        className="w-full"
                        rows={3}
                        placeholder="Client address"
                        disabled={
                          company.plan === "free" && invoices.length >= 1
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-header-text mb-4">
                    Invoice Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Description
                      </label>
                      <Input
                        value={newInvoice.description}
                        onChange={(e) =>
                          setNewInvoice({
                            ...newInvoice,
                            description: e.target.value,
                          })
                        }
                        className="w-full"
                        placeholder="Invoice description"
                        disabled={
                          company.plan === "free" && invoices.length >= 1
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Due Date *
                      </label>
                      <Input
                        type="date"
                        value={newInvoice.dueDate}
                        onChange={(e) =>
                          setNewInvoice({
                            ...newInvoice,
                            dueDate: e.target.value,
                          })
                        }
                        className="w-full"
                        disabled={
                          company.plan === "free" && invoices.length >= 1
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-header-text">
                    Line Items
                  </h3>
                  <Button
                    onClick={addInvoiceItem}
                    size="sm"
                    className="bg-primary text-white"
                    disabled={company.plan === "free" && invoices.length >= 1}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="bg-white border border-blue-100 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-secondary-text">
                          Description
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-secondary-text">
                          Qty
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-secondary-text">
                          Rate
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-secondary-text">
                          Amount
                        </th>
                        <th className="w-16"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {newInvoice.items.map((item, index) => (
                        <tr key={index} className="border-t border-blue-100">
                          <td className="py-3 px-4">
                            <Input
                              value={item.description}
                              onChange={(e) =>
                                updateInvoiceItem(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full"
                              placeholder="Item description"
                              disabled={
                                company.plan === "free" && invoices.length >= 1
                              }
                            />
                          </td>
                          <td className="py-3 px-4">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateInvoiceItem(
                                  index,
                                  "quantity",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-20 text-center"
                              min="1"
                              disabled={
                                company.plan === "free" && invoices.length >= 1
                              }
                            />
                          </td>
                          <td className="py-3 px-4">
                            <Input
                              type="number"
                              value={item.rate}
                              onChange={(e) =>
                                updateInvoiceItem(
                                  index,
                                  "rate",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-24 text-right"
                              min="0"
                              step="0.01"
                              disabled={
                                company.plan === "free" && invoices.length >= 1
                              }
                            />
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-primary-text">
                            ${item.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            {newInvoice.items.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeInvoiceItem(index)}
                                className="text-red-600 hover:bg-red-50"
                                disabled={
                                  company.plan === "free" &&
                                  invoices.length >= 1
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="mt-6 flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary-text">Subtotal:</span>
                      <span className="text-primary-text">
                        ${newInvoice.subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Tax:</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={newInvoice.tax}
                          onChange={(e) => {
                            const tax = parseFloat(e.target.value) || 0;
                            const total = newInvoice.subtotal + tax;
                            setNewInvoice({
                              ...newInvoice,
                              tax,
                              total,
                            });
                          }}
                          className="w-20 text-right"
                          min="0"
                          step="0.01"
                          disabled={
                            company.plan === "free" && invoices.length >= 1
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-blue-100 pt-2">
                      <span className="text-header-text">Total:</span>
                      <span className="text-header-text">
                        ${newInvoice.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-header-text mb-4">
                  Notes
                </label>
                <Textarea
                  value={newInvoice.notes}
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      notes: e.target.value,
                    })
                  }
                  className="w-full"
                  rows={4}
                  placeholder="Add any additional notes or payment terms..."
                  disabled={company.plan === "free" && invoices.length >= 1}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-blue-100">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateInvoiceModalOpen(false)}
                  className="flex-1 border-blue-200"
                >
                  Cancel
                </Button>
                {company.plan === "free" && invoices.length >= 1 ? (
                  <Button className="flex-1 bg-gradient-to-r from-primary to-accent text-white">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                ) : (
                  <Button
                    onClick={handleCreateInvoice}
                    disabled={
                      !newInvoice.clientName.trim() ||
                      !newInvoice.clientEmail.trim() ||
                      !newInvoice.dueDate ||
                      newInvoice.items.some((item) => !item.description.trim())
                    }
                    className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Create Invoice
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-blue-100">
              <div>
                <h2 className="text-xl font-bold text-header-text">
                  Company Settings
                </h2>
                <p className="text-secondary-text text-sm">
                  Update your company information
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSettingsModalOpen(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Company Name *
                  </label>
                  <Input
                    value={editCompany.name}
                    onChange={(e) =>
                      setEditCompany({
                        ...editCompany,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter company name"
                    className="w-full"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Plan
                  </label>
                  <div className="flex items-center gap-2">
                    {getPlanBadge(editCompany.plan)}
                    <span className="text-sm text-secondary-text">
                      Current plan
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-primary mb-2">
                  Company Information
                </h4>
                <div className="text-sm text-secondary-text space-y-1">
                  <p>• Company ID: {company.id}</p>
                  <p>• Created: {new Date().toLocaleDateString()}</p>
                  <p>• Status: {company.status}</p>
                  <p>• Total Invoices: {invoices.length}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="flex-1 border-blue-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateCompany}
                  disabled={!editCompany.name.trim()}
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
