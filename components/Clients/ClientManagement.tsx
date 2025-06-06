'use client'
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
    PlusIcon,
    FilterIcon,
} from "lucide-react";
import { ClientForm } from "@/components/Clients/ClientForm";
import ClientCard from "@/components/Clients/ClientCard";
import { useState } from "react";
import { ClientType } from "@/types";
import CustomModal from "../ModalsForms/CustomModal";
import CustomButton from "../ui/CustomButton";

export default function ClientManagement({clients, business_id}:{clients: ClientType[]; business_id: number}) {
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

    const openAddClientModal = (): void => {
        setIsAddClientModalOpen(true);
    };

    const closeAddClientModal = (): void => {
    setIsAddClientModalOpen(false);
    }

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
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border-blue-200 focus:ring-primary"
                        />
                        </div>
                        <CustomButton label={"Filter"} icon={FilterIcon} variant={"secondary"}/>
                    </div>
                    <CustomModal 
                        openBtnLabel="Add Client" 
                        description="Add a new client to your system"
                        heading="Add New Client"
                        btnIcon={PlusIcon}
                        btnVariant="primary"
                    >
                        <ClientForm business_id={business_id}/>
                    </CustomModal>
                </div>

                {/* Clients Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map((client) => (
                        <ClientCard client={client} key={client.id} />
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
                    {/* <p className="text-2xl font-bold text-header-text">
                        {clients.filter((c) => c.status === "active").length}
                    </p> */}
                    <p className="text-sm text-secondary-text">Active Clients</p>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
                    <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <FileText className="h-6 w-6 text-primary" />
                    </div>
                    {/* <p className="text-2xl font-bold text-header-text">
                        {clients.reduce((sum, client) => sum + client.invoices, 0)}
                    </p> */}
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
        

        {/* ...existing code... */}
        {/* Edit Client Modal */}
        {/* {isEditModalOpen && editingClient && (
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
        )} */}

        {/* Client Invoices Modal */}
        {/* {isInvoicesModalOpen && selectedClient && (
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
        )} */}

        {/* New Invoice Modal */}
        {/* {isNewInvoiceModalOpen && selectedClient && (
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
        )} */}
        </div>
    )
}
