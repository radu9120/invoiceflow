import { DashboardStats } from "@/types";
import {
  FileText,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface StatsGridProps {
  stats: DashboardStats;
  formatCurrency: (amount: number) => string;
}

export default function StatsGrid({ stats, formatCurrency }: StatsGridProps) {
  return (
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
        <h3 className="font-semibold text-header-text mb-1">Total Invoices</h3>
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
        <h3 className="font-semibold text-header-text mb-1">Total Revenue</h3>
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
        <h3 className="font-semibold text-header-text mb-1">Total Clients</h3>
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
  );
}
