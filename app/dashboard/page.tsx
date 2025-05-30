"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Send,
  MoreHorizontal,
  Download,
  X,
  Calendar,
  Building,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Save,
  Trash2,
} from "lucide-react";

// TypeScript Types
interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  client: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  amount: string;
  status: "paid" | "pending" | "overdue" | "draft";
  date: string;
  dueDate: string;
  description: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
}

interface Stats {
  totalRevenue: string;
  invoicesSent: number;
  activeClients: number;
  overdueInvoices: number;
}

const Dashboard = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      client: "Acme Corp",
      clientEmail: "contact@acme.com",
      clientPhone: "+1 (555) 123-4567",
      clientAddress: "123 Business St, New York, NY 10001",
      amount: "$2,500",
      status: "paid",
      date: "2024-01-15",
      dueDate: "2024-02-15",
      description: "Website Development Services",
      items: [
        {
          description: "Frontend Development",
          quantity: 1,
          rate: 1500,
          amount: 1500,
        },
        {
          description: "Backend API Development",
          quantity: 1,
          rate: 1000,
          amount: 1000,
        },
      ],
      subtotal: 2500,
      tax: 0,
      total: 2500,
      notes: "Thank you for your business!",
    },
    {
      id: "INV-002",
      client: "Tech Solutions",
      clientEmail: "hello@techsol.com",
      clientPhone: "+1 (555) 987-6543",
      clientAddress: "456 Tech Ave, San Francisco, CA 94102",
      amount: "$1,800",
      status: "pending",
      date: "2024-01-10",
      dueDate: "2024-02-10",
      description: "Mobile App Design",
      items: [
        { description: "UI/UX Design", quantity: 1, rate: 1200, amount: 1200 },
        {
          description: "Prototype Development",
          quantity: 1,
          rate: 600,
          amount: 600,
        },
      ],
      subtotal: 1800,
      tax: 0,
      total: 1800,
      notes: "Payment due within 30 days.",
    },
    {
      id: "INV-003",
      client: "Design Studio",
      clientEmail: "info@design.studio",
      clientPhone: "+1 (555) 456-7890",
      clientAddress: "789 Creative Blvd, Los Angeles, CA 90210",
      amount: "$3,200",
      status: "overdue",
      date: "2023-12-20",
      dueDate: "2024-01-20",
      description: "Brand Identity Package",
      items: [
        { description: "Logo Design", quantity: 1, rate: 800, amount: 800 },
        {
          description: "Brand Guidelines",
          quantity: 1,
          rate: 1200,
          amount: 1200,
        },
        {
          description: "Marketing Materials",
          quantity: 1,
          rate: 1200,
          amount: 1200,
        },
      ],
      subtotal: 3200,
      tax: 0,
      total: 3200,
      notes: "Complete brand identity package with all deliverables.",
    },
  ]);

  // Dummy data - replace with your Supabase data later
  const stats: Stats = {
    totalRevenue: "$12,450",
    invoicesSent: 24,
    activeClients: 8,
    overdueInvoices: 3,
  };

  const getStatusColor = (status: Invoice["status"]): string => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const openInvoiceModal = (invoice: Invoice): void => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const openEditModal = (invoice: Invoice): void => {
    setEditingInvoice({ ...invoice });
    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setEditingInvoice(null);
  };

  const markAsPaid = (invoiceId: string): void => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === invoiceId
          ? { ...invoice, status: "paid" as const }
          : invoice
      )
    );

    // Update selected invoice if it's the one being marked as paid
    if (selectedInvoice && selectedInvoice.id === invoiceId) {
      setSelectedInvoice({ ...selectedInvoice, status: "paid" });
    }
  };

  const updateInvoiceItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ): void => {
    if (!editingInvoice) return;

    const updatedItems = [...editingInvoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Recalculate amount for the item
    if (field === "quantity" || field === "rate") {
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].rate;
    }

    // Recalculate totals
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + editingInvoice.tax;

    setEditingInvoice({
      ...editingInvoice,
      items: updatedItems,
      subtotal,
      total,
      amount: `$${total.toLocaleString()}`,
    });
  };

  const addInvoiceItem = (): void => {
    if (!editingInvoice) return;

    const newItem: InvoiceItem = {
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };

    setEditingInvoice({
      ...editingInvoice,
      items: [...editingInvoice.items, newItem],
    });
  };

  const removeInvoiceItem = (index: number): void => {
    if (!editingInvoice) return;

    const updatedItems = editingInvoice.items.filter((_, i) => i !== index);
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + editingInvoice.tax;

    setEditingInvoice({
      ...editingInvoice,
      items: updatedItems,
      subtotal,
      total,
      amount: `$${total.toLocaleString()}`,
    });
  };

  const saveInvoice = (): void => {
    if (!editingInvoice) return;

    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === editingInvoice.id ? editingInvoice : invoice
      )
    );

    // Update selected invoice if it's being viewed
    if (selectedInvoice && selectedInvoice.id === editingInvoice.id) {
      setSelectedInvoice(editingInvoice);
    }

    closeEditModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-header-text mb-2">
              Dashboard
            </h1>
            <p className="text-secondary-text">
              Welcome back! Here's what's happening with your business.
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="border-blue-200">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Link href="/dashboard/invoices/new">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-cyan-500 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/dashboard/analytics" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all group-hover:border-green-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-text text-sm font-medium">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-header-text">
                    {stats.totalRevenue}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">
                  +12% from last month
                </span>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/invoices" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all group-hover:border-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-text text-sm font-medium">
                    Invoices Sent
                  </p>
                  <p className="text-2xl font-bold text-header-text">
                    {stats.invoicesSent}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 text-primary mr-1" />
                <span className="text-sm text-primary">+3 this week</span>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/clients" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all group-hover:border-purple-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-text text-sm font-medium">
                    Active Clients
                  </p>
                  <p className="text-2xl font-bold text-header-text">
                    {stats.activeClients}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
                <span className="text-sm text-purple-600">+2 new clients</span>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/invoices?status=overdue" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all group-hover:border-red-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-text text-sm font-medium">
                    Overdue
                  </p>
                  <p className="text-2xl font-bold text-header-text">
                    {stats.overdueInvoices}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <Clock className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">Needs attention</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 mb-8">
          <div className="p-6 border-b border-blue-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-header-text">
                Recent Invoices
              </h2>
              <Link href="/dashboard/invoices">
                <Button variant="outline" size="sm" className="border-blue-200">
                  View All
                </Button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-100">
                  <th className="text-left py-4 px-6 text-sm font-medium text-secondary-text">
                    Invoice
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-secondary-text">
                    Client
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-secondary-text">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-secondary-text">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-secondary-text">
                    Due Date
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-secondary-text">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-blue-50 hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <button
                        onClick={() => openInvoiceModal(invoice)}
                        className="font-medium text-primary hover:text-primary-dark transition-colors"
                      >
                        {invoice.id}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-primary-text">
                        {invoice.client}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-primary-text">
                        {invoice.amount}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-secondary-text">
                        {invoice.dueDate}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-100"
                          onClick={() => openInvoiceModal(invoice)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-100"
                          onClick={() => openEditModal(invoice)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-100"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/dashboard/invoices/new" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all group-hover:border-primary">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Plus className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-header-text">
                    Create Invoice
                  </h3>
                  <p className="text-sm text-secondary-text">
                    Generate a new invoice
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/clients" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all group-hover:border-primary">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-header-text">
                    Manage Clients
                  </h3>
                  <p className="text-sm text-secondary-text">
                    Add or edit clients
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/analytics" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all group-hover:border-primary">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-header-text">
                    View Analytics
                  </h3>
                  <p className="text-sm text-secondary-text">
                    Business insights
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* View Invoice Modal */}
      {isModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-blue-100">
              <div>
                <h2 className="text-2xl font-bold text-header-text">
                  Invoice {selectedInvoice.id}
                </h2>
                <p className="text-secondary-text">
                  {selectedInvoice.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                    selectedInvoice.status
                  )}`}
                >
                  {selectedInvoice.status.charAt(0).toUpperCase() +
                    selectedInvoice.status.slice(1)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeModal}
                  className="hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {/* Invoice Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* From Section */}
                <div>
                  <h3 className="text-lg font-semibold text-header-text mb-4">
                    From
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary-text">
                        Your Business Name
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-secondary-text" />
                      <span className="text-secondary-text">
                        hello@yourbusiness.com
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-secondary-text" />
                      <span className="text-secondary-text">
                        +1 (555) 000-0000
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-secondary-text mt-0.5" />
                      <span className="text-secondary-text">
                        123 Your Street, Your City, YS 12345
                      </span>
                    </div>
                  </div>
                </div>

                {/* To Section */}
                <div>
                  <h3 className="text-lg font-semibold text-header-text mb-4">
                    Bill To
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary-text">
                        {selectedInvoice.client}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-secondary-text" />
                      <span className="text-secondary-text">
                        {selectedInvoice.clientEmail}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-secondary-text" />
                      <span className="text-secondary-text">
                        {selectedInvoice.clientPhone}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-secondary-text mt-0.5" />
                      <span className="text-secondary-text">
                        {selectedInvoice.clientAddress}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-secondary-text">
                      Issue Date
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-primary-text">
                    {selectedInvoice.date}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-secondary-text">
                      Due Date
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-primary-text">
                    {selectedInvoice.dueDate}
                  </span>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-secondary-text">
                      Total Amount
                    </span>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    {selectedInvoice.amount}
                  </span>
                </div>
              </div>

              {/* Line Items */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-header-text mb-4">
                  Items
                </h3>
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
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index} className="border-t border-blue-100">
                          <td className="py-3 px-4 text-primary-text">
                            {item.description}
                          </td>
                          <td className="py-3 px-4 text-center text-secondary-text">
                            {item.quantity}
                          </td>
                          <td className="py-3 px-4 text-right text-secondary-text">
                            ${item.rate.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-primary-text">
                            ${item.amount.toLocaleString()}
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
                        ${selectedInvoice.subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-text">Tax:</span>
                      <span className="text-primary-text">
                        ${selectedInvoice.tax}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-blue-100 pt-2">
                      <span className="text-header-text">Total:</span>
                      <span className="text-header-text">
                        ${selectedInvoice.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedInvoice.notes && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-header-text mb-4">
                    Notes
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-secondary-text">
                      {selectedInvoice.notes}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-blue-100">
                <Button variant="outline" className="flex-1 border-blue-200">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-blue-200"
                  onClick={() => {
                    closeModal();
                    openEditModal(selectedInvoice);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Invoice
                </Button>
                {selectedInvoice.status !== "paid" && (
                  <Button
                    onClick={() => markAsPaid(selectedInvoice.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Paid
                  </Button>
                )}
                <Button className="flex-1 bg-gradient-to-r from-primary to-accent text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Send Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Invoice Modal */}
      {isEditModalOpen && editingInvoice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-blue-100">
              <div>
                <h2 className="text-2xl font-bold text-header-text">
                  Edit Invoice {editingInvoice.id}
                </h2>
                <p className="text-secondary-text">
                  Make changes to your invoice
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeEditModal}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              {/* Client Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-header-text mb-4">
                    Client Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Client Name
                      </label>
                      <Input
                        value={editingInvoice.client}
                        onChange={(e) =>
                          setEditingInvoice({
                            ...editingInvoice,
                            client: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={editingInvoice.clientEmail}
                        onChange={(e) =>
                          setEditingInvoice({
                            ...editingInvoice,
                            clientEmail: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Phone
                      </label>
                      <Input
                        value={editingInvoice.clientPhone}
                        onChange={(e) =>
                          setEditingInvoice({
                            ...editingInvoice,
                            clientPhone: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Address
                      </label>
                      <Textarea
                        value={editingInvoice.clientAddress}
                        onChange={(e) =>
                          setEditingInvoice({
                            ...editingInvoice,
                            clientAddress: e.target.value,
                          })
                        }
                        className="w-full"
                        rows={3}
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
                        value={editingInvoice.description}
                        onChange={(e) =>
                          setEditingInvoice({
                            ...editingInvoice,
                            description: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-text mb-1">
                          Issue Date
                        </label>
                        <Input
                          type="date"
                          value={editingInvoice.date}
                          onChange={(e) =>
                            setEditingInvoice({
                              ...editingInvoice,
                              date: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-text mb-1">
                          Due Date
                        </label>
                        <Input
                          type="date"
                          value={editingInvoice.dueDate}
                          onChange={(e) =>
                            setEditingInvoice({
                              ...editingInvoice,
                              dueDate: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">
                        Status
                      </label>
                      <select
                        value={editingInvoice.status}
                        onChange={(e) =>
                          setEditingInvoice({
                            ...editingInvoice,
                            status: e.target.value as Invoice["status"],
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
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
                      {editingInvoice.items.map((item, index) => (
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
                            />
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-primary-text">
                            ${item.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeInvoiceItem(index)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
                        ${editingInvoice.subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Tax:</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editingInvoice.tax}
                          onChange={(e) => {
                            const tax = parseFloat(e.target.value) || 0;
                            const total = editingInvoice.subtotal + tax;
                            setEditingInvoice({
                              ...editingInvoice,
                              tax,
                              total,
                              amount: `$${total.toLocaleString()}`,
                            });
                          }}
                          className="w-20 text-right"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-blue-100 pt-2">
                      <span className="text-header-text">Total:</span>
                      <span className="text-header-text">
                        ${editingInvoice.total.toLocaleString()}
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
                  value={editingInvoice.notes}
                  onChange={(e) =>
                    setEditingInvoice({
                      ...editingInvoice,
                      notes: e.target.value,
                    })
                  }
                  className="w-full"
                  rows={4}
                  placeholder="Add any additional notes or payment terms..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-blue-100">
                <Button
                  variant="outline"
                  onClick={closeEditModal}
                  className="flex-1 border-blue-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveInvoice}
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
