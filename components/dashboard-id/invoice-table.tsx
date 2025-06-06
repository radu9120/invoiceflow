"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Plus,
  Eye,
  Download,
  MoreVertical,
  CheckCircle,
  Send,
  AlertTriangle,
  Edit,
  FilterIcon,
  SearchIcon,
} from "lucide-react";
import { Invoice } from "@/types";
import CustomButton from "../ui/CustomButton";

interface InvoicesTableProps {
  invoices: Invoice[];
  canCreateInvoice: boolean;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

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

export default function InvoicesTable({
  invoices,
  canCreateInvoice,
  formatCurrency,
  formatDate,
}: InvoicesTableProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-header-text">All Invoices</h2>
        <div className="flex items-center gap-3">
          <CustomButton label={"Filter"} icon={FilterIcon} variant={"secondary"}/>
          <CustomButton label={"Search"} icon={SearchIcon} variant={"secondary"}/>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-header-text mb-2">
            No Invoices Yet
          </h3>
          <p className="text-secondary-text mb-6">
            Create your first invoice to start tracking payments and managing
            your business.
          </p>
          <Button
            className={`${
              canCreateInvoice
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
                  {/* <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-header-text">
                        {invoice.clientName}
                      </p>
                      <p className="text-sm text-secondary-text">
                        {invoice.clientEmail}
                      </p>
                    </div>
                  </td> */}
                  <td className="py-4 px-4">
                    <p className="font-semibold text-header-text">
                      {formatCurrency(invoice.total)}
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
  );
}
