import React from 'react'
import { Button } from '../ui/button'
import { DollarSign, Edit, Eye, FileText, Mail, MapPin, Phone, Plus, Users } from 'lucide-react'

export default function ClientCard({client}:{client : any}) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-header-text">
                            {client.name}
                        </h3>
                        {/* <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            client.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                        >
                            {client.status.charAt(0).toUpperCase() +
                            client.status.slice(1)}
                        </span> */}
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    
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
                    // onClick={() => openEditModal(client)}
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                </Button>
                <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent text-white"
                    // onClick={() => openNewInvoiceModal(client)}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Invoice
                </Button>
            </div>
        </div>
    )
}
