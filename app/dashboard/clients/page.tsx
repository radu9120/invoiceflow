import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

const ClientsPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Dummy data - replace with your Supabase data later
  const clients = [
    {
      id: 1,
      name: "Acme Corp",
      email: "contact@acme.com",
      address: "123 Business St, New York, NY",
      phone: "+1 (555) 123-4567",
      invoices: 5,
      totalPaid: "$8,500",
      status: "active",
    },
    {
      id: 2,
      name: "Tech Solutions",
      email: "hello@techsol.com",
      address: "456 Tech Ave, San Francisco, CA",
      phone: "+1 (555) 987-6543",
      invoices: 3,
      totalPaid: "$4,200",
      status: "active",
    },
    {
      id: 3,
      name: "Design Studio",
      email: "info@design.studio",
      address: "789 Creative Blvd, Los Angeles, CA",
      phone: "+1 (555) 456-7890",
      invoices: 2,
      totalPaid: "$6,800",
      status: "active",
    },
    {
      id: 4,
      name: "Marketing Plus",
      email: "team@marketing.plus",
      address: "321 Marketing Dr, Chicago, IL",
      phone: "+1 (555) 234-5678",
      invoices: 1,
      totalPaid: "$950",
      status: "inactive",
    },
  ];

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
              <input
                type="text"
                placeholder="Search clients..."
                className="pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary-text"
              />
            </div>
            <Button variant="outline" className="border-blue-200">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-cyan-500 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
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
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-secondary-text" />
                  <span className="text-sm text-primary-text">
                    {client.email}
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
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Link href={`/dashboard/invoices/new?client=${client.id}`}>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Invoice
                  </Button>
                </Link>
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
    </div>
  );
};

export default ClientsPage;
