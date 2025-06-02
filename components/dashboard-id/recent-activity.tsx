import { Building, FileText, Clock } from "lucide-react";
import { Company, Invoice, Client } from "@/types";

interface RecentActivityProps {
  company: Company;
  invoices: Invoice[];
  clients: Client[];
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

export default function RecentActivity({
  company,
  invoices,
  clients,
  formatCurrency,
  formatDate,
}: RecentActivityProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
      <h2 className="text-xl font-bold text-header-text mb-6">
        Recent Activity
      </h2>

      {invoices.length === 0 && clients.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-secondary-text">
            No recent activity. Start by creating your first invoice or adding a
            client.
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
                Welcome to InvoiceFlow! • {formatDate(company.created_at)}
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
  );
}
