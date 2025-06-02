"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Users,
  Mail,
  MapPin,
  FileText,
  DollarSign,
  MoreHorizontal,
  Edit,
  Trash2,
  X,
  Eye,
  Phone,
  Save,
  Calendar,
  Building,
} from "lucide-react";

// TypeScript Types
interface Client {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  invoices: number;
  totalPaid: string;
  status: "active" | "inactive";
}

interface Invoice {
  id: string;
  clientId: number;
  amount: string;
  status: "paid" | "pending" | "overdue" | "draft";
  date: string;
  dueDate: string;
  description: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface NewInvoice {
  clientId: number;
  description: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
}

interface NewClient {
  name: string;
  email: string;
  address: string;
  phone: string;
  status: "active" | "inactive";
}

const ClientsPage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInvoicesModalOpen, setIsInvoicesModalOpen] = useState(false);
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "Acme Corp",
      email: "contact@acme.com",
      address: "123 Business St, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      invoices: 5,
      totalPaid: "$8,500",
      status: "active",
    },
    {
      id: 2,
      name: "Tech Solutions",
      email: "hello@techsol.com",
      address: "456 Tech Ave, San Francisco, CA 94102",
      phone: "+1 (555) 987-6543",
      invoices: 3,
      totalPaid: "$4,200",
      status: "active",
    },
    {
      id: 3,
      name: "Design Studio",
      email: "info@design.studio",
      address: "789 Creative Blvd, Los Angeles, CA 90210",
      phone: "+1 (555) 456-7890",
      invoices: 2,
      totalPaid: "$6,800",
      status: "active",
    },
    {
      id: 4,
      name: "Marketing Plus",
      email: "team@marketing.plus",
      address: "321 Marketing Dr, Chicago, IL 60601",
      phone: "+1 (555) 234-5678",
      invoices: 1,
      totalPaid: "$950",
      status: "inactive",
    },
  ]);

  // Dummy invoices data
  const [clientInvoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      clientId: 1,
      amount: "$2,500",
      status: "paid",
      date: "2024-01-15",
      dueDate: "2024-02-15",
      description: "Website Development Services",
    },
    {
      id: "INV-002",
      clientId: 1,
      amount: "$1,800",
      status: "pending",
      date: "2024-01-10",
      dueDate: "2024-02-10",
      description: "Mobile App Design",
    },
    {
      id: "INV-003",
      clientId: 2,
      amount: "$3,200",
      status: "overdue",
      date: "2023-12-20",
      dueDate: "2024-01-20",
      description: "Brand Identity Package",
    },
  ]);

  const [newInvoice, setNewInvoice] = useState<NewInvoice>({
    clientId: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    items: [{ description: "", quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: "",
  });

  const [newClient, setNewClient] = useState<NewClient>({
    name: "",
    email: "",
    address: "",
    phone: "",
    status: "active",
  });

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (client: Client): void => {
    setEditingClient({ ...client });
    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setEditingClient(null);
  };

  const openInvoicesModal = (client: Client): void => {
    setSelectedClient(client);
    setIsInvoicesModalOpen(true);
  };

  const closeInvoicesModal = (): void => {
    setIsInvoicesModalOpen(false);
    setSelectedClient(null);
  };

  const openNewInvoiceModal = (client: Client): void => {
    setSelectedClient(client);
    setNewInvoice({
      ...newInvoice,
      clientId: client.id,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 30 days from now
    });
    setIsNewInvoiceModalOpen(true);
  };

  const closeNewInvoiceModal = (): void => {
    setIsNewInvoiceModalOpen(false);
    setSelectedClient(null);
    setNewInvoice({
      clientId: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      items: [{ description: "", quantity: 1, rate: 0, amount: 0 }],
      subtotal: 0,
      tax: 0,
      total: 0,
      notes: "",
    });
  };

  const openAddClientModal = (): void => {
    setIsAddClientModalOpen(true);
  };

  const closeAddClientModal = (): void => {
    setIsAddClientModalOpen(false);
    setNewClient({
      name: "",
      email: "",
      address: "",
      phone: "",
      status: "active",
    });
  };

  const saveClient = (): void => {
    if (!editingClient) return;

    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === editingClient.id ? editingClient : client
      )
    );
    closeEditModal();
  };

  const addClient = (): void => {
    const newId = Math.max(...clients.map((c) => c.id)) + 1;
    const clientToAdd: Client = {
      id: newId,
      name: newClient.name,
      email: newClient.email,
      address: newClient.address,
      phone: newClient.phone,
      invoices: 0,
      totalPaid: "$0",
      status: newClient.status,
    };

    setClients((prevClients) => [...prevClients, clientToAdd]);
    closeAddClientModal();
  };

  const getStatusColor = (status: string): string => {
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

  const updateInvoiceItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ): void => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Recalculate amount for the item
    if (field === "quantity" || field === "rate") {
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].rate;
    }

    // Recalculate totals
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
    setNewInvoice({
      ...newInvoice,
      items: [
        ...newInvoice.items,
        { description: "", quantity: 1, rate: 0, amount: 0 },
      ],
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

  const createInvoice = (): void => {
    // Here you would save the invoice to your database
    console.log("Creating invoice:", newInvoice);
    closeNewInvoiceModal();
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
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-header-text">
                Client Management
              </h1>
              <p className="text-secondary-text mt-1">
                Manage your clients and their information.
              </p>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text h-4 w-4" />
              <Input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-blue-200 focus:ring-primary"
              />
            </div>
            <Button variant="outline" className="border-blue-200">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Button
            onClick={openAddClientModal}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-cyan-500 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-header-text">
                      {client.name}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        client.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {client.status.charAt(0).toUpperCase() +
                        client.status.slice(1)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openInvoicesModal(client)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-secondary-text" />
                  <span className="text-sm text-primary-text">
                    {client.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-secondary-text" />
                  <span className="text-sm text-primary-text">
                    {client.phone}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-secondary-text mt-0.5" />
                  <span className="text-sm text-primary-text">
                    {client.address}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-secondary-text">
                      Invoices
                    </span>
                  </div>
                  <span className="text-lg font-bold text-header-text">
                    {client.invoices}
                  </span>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-secondary-text">
                      Total
                    </span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {client.totalPaid}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-blue-200"
                  onClick={() => openEditModal(client)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-accent text-white"
                  onClick={() => openNewInvoiceModal(client)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Invoice
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-header-text">
                {clients.length}
              </p>
              <p className="text-sm text-secondary-text">Total Clients</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-header-text">
                {clients.filter((c) => c.status === "active").length}
              </p>
              <p className="text-sm text-secondary-text">Active Clients</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-header-text">
                {clients.reduce((sum, client) => sum + client.invoices, 0)}
              </p>
              <p className="text-sm text-secondary-text">Total Invoices</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-header-text">$20,450</p>
              <p className="text-sm text-secondary-text">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-blue-100">
              <div>
                <h2 className="text-2xl font-bold text-header-text">
                  Add New Client
                </h2>
                <p className="text-secondary-text">
                  Add a new client to your system
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeAddClientModal}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Company Name *
                  </label>
                  <Input
                    value={newClient.name}
                    onChange={(e) =>
                      setNewClient({
                        ...newClient,
                        name: e.target.value,
                      })
                    }
                    className="w-full"
                    placeholder="Company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={newClient.email}
                    onChange={(e) =>
                      setNewClient({
                        ...newClient,
                        email: e.target.value,
                      })
                    }
                    className="w-full"
                    placeholder="email@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={newClient.phone}
                    onChange={(e) =>
                      setNewClient({
                        ...newClient,
                        phone: e.target.value,
                      })
                    }
                    className="w-full"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Status
                  </label>
                  <select
                    value={newClient.status}
                    onChange={(e) =>
                      setNewClient({
                        ...newClient,
                        status: e.target.value as "active" | "inactive",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Address
                  </label>
                  <Textarea
                    value={newClient.address}
                    onChange={(e) =>
                      setNewClient({
                        ...newClient,
                        address: e.target.value,
                      })
                    }
                    className="w-full"
                    rows={3}
                    placeholder="123 Business St, City, State 12345"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-blue-100 mt-6">
                <Button
                  variant="outline"
                  onClick={closeAddClientModal}
                  className="flex-1 border-blue-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addClient}
                  disabled={!newClient.name || !newClient.email}
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-white disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ...existing code... */}
      {/* Edit Client Modal */}
      {isEditModalOpen && editingClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-blue-100">
              <div>
                <h2 className="text-2xl font-bold text-header-text">
                  Edit Client
                </h2>
                <p className="text-secondary-text">Update client information</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Company Name
                  </label>
                  <Input
                    value={editingClient.name}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        name: e.target.value,
                      })
                    }
                    className="w-full"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={editingClient.email}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        email: e.target.value,
                      })
                    }
                    className="w-full"
                    placeholder="email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={editingClient.phone}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        phone: e.target.value,
                      })
                    }
                    className="w-full"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Status
                  </label>
                  <select
                    value={editingClient.status}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        status: e.target.value as "active" | "inactive",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Address
                  </label>
                  <Textarea
                    value={editingClient.address}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        address: e.target.value,
                      })
                    }
                    className="w-full"
                    rows={3}
                    placeholder="123 Business St, City, State 12345"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-blue-100 mt-6">
                <Button
                  variant="outline"
                  onClick={closeEditModal}
                  className="flex-1 border-blue-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveClient}
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

      {/* Client Invoices Modal */}
      {isInvoicesModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-blue-100">
              <div>
                <h2 className="text-2xl font-bold text-header-text">
                  {selectedClient.name} - Invoices
                </h2>
                <p className="text-secondary-text">
                  View all invoices for this client
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeInvoicesModal}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              {/* Client Info Summary */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary-text">
                      {selectedClient.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary-text">
                      {selectedClient.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-primary-text font-medium">
                      Total: {selectedClient.totalPaid}
                    </span>
                  </div>
                </div>
              </div>

              {/* Invoices Table */}
              <div className="bg-white border border-blue-100 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-secondary-text">
                        Invoice ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-secondary-text">
                        Description
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-secondary-text">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-secondary-text">
                        Amount
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-secondary-text">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientInvoices
                      .filter(
                        (invoice) => invoice.clientId === selectedClient.id
                      )
                      .map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-t border-blue-100"
                        >
                          <td className="py-3 px-4 font-medium text-primary">
                            {invoice.id}
                          </td>
                          <td className="py-3 px-4 text-primary-text">
                            {invoice.description}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                invoice.status
                              )}`}
                            >
                              {invoice.status.charAt(0).toUpperCase() +
                                invoice.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-primary-text">
                            {invoice.amount}
                          </td>
                          <td className="py-3 px-4 text-right text-secondary-text">
                            {invoice.dueDate}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 pt-6 border-t border-blue-100 mt-6">
                <Button
                  variant="outline"
                  onClick={closeInvoicesModal}
                  className="flex-1 border-blue-200"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    closeInvoicesModal();
                    openNewInvoiceModal(selectedClient);
                  }}
                  className="bg-gradient-to-r from-primary to-accent text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      {isNewInvoiceModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-blue-100">
              <div>
                <h2 className="text-2xl font-bold text-header-text">
                  New Invoice for {selectedClient.name}
                </h2>
                <p className="text-secondary-text">
                  Create a new invoice for this client
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeNewInvoiceModal}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              {/* Client Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-header-text">Bill To:</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-primary-text">
                      {selectedClient.name}
                    </p>
                    <p className="text-sm text-secondary-text">
                      {selectedClient.email}
                    </p>
                    <p className="text-sm text-secondary-text">
                      {selectedClient.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-text">
                      {selectedClient.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Issue Date
                  </label>
                  <Input
                    type="date"
                    value={newInvoice.date}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        date: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-2">
                    Due Date
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
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="mb-6">
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
                            {newInvoice.items.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeInvoiceItem(index)}
                                className="text-red-600 hover:bg-red-50"
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
                <div className="mt-4 flex justify-end">
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
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-text mb-2">
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
                  rows={3}
                  placeholder="Add any additional notes or payment terms..."
                />
              </div>

              <div className="flex gap-3 pt-6 border-t border-blue-100">
                <Button
                  variant="outline"
                  onClick={closeNewInvoiceModal}
                  className="flex-1 border-blue-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={createInvoice}
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
