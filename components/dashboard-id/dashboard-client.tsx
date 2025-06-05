"use client";

import { Company, Invoice, DashboardStats } from "@/types";
import { useState, useEffect } from "react";
import DashboardHeader from "./dashboard-header";
import StatsGrid from "./stats-grid";
import QuickActions from "./quick-actions";
import PlanLimitations from "./plan-limitation";
import InvoicesTable from "./invoice-table";
import RecentActivity from "./recent-activity";
import CreateInvoiceModal from "./create-invoice-modal";
import SettingsModal from "./settings-modal";
import { getInvoicesByAuthor } from "@/lib/actions/invoice.actions";

interface DashboardClientProps {
  company: Company;
}

export default function DashboardClient({ company }: DashboardClientProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPlan] = useState<"free" | "pro" | "enterprise">("free");
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

  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] =
    useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Fetch invoices when component mounts
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const fetchedInvoices = await getInvoicesByAuthor(); // No need for businessId
        setInvoices(fetchedInvoices);
        console.log("Fetched invoices:", fetchedInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Calculate stats when invoices change
  useEffect(() => {
    const calculateStats = () => {
      const totalInvoices = invoices.length;
      const paidInvoices = invoices.filter(
        (inv) => inv.status === "paid"
      ).length;

      // Fix: Remove "pending" since it's not in your Invoice status type
      const pendingInvoices = invoices.filter(
        (inv) => inv.status === "sent"
      ).length;

      const overdueInvoices = invoices.filter(
        (inv) => inv.status === "overdue"
      ).length;

      const totalRevenue = invoices
        .filter((inv) => inv.status === "paid")
        .reduce((sum, inv) => sum + (inv.amount || 0), 0);

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyRevenue = invoices
        .filter((inv) => {
          // Fix: Use 'createdDate' instead of 'created_at'
          const invDate = new Date(inv.createdDate);
          return (
            inv.status === "paid" &&
            invDate.getMonth() === currentMonth &&
            invDate.getFullYear() === currentYear
          );
        })
        .reduce((sum, inv) => sum + (inv.amount || 0), 0);

      setStats({
        totalInvoices,
        paidInvoices,
        pendingInvoices,
        overdueInvoices,
        totalRevenue,
        monthlyRevenue,
        totalClients: 0,
        activeClients: 0,
      });
    };

    calculateStats();
  }, [invoices]);

  const canCreateInvoice = () => {
    if (userPlan === "free") {
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

  const handleCreateInvoice = () => {
    if (canCreateInvoice()) {
      setIsCreateInvoiceModalOpen(true);
    } else {
      alert("Free plan allows only 1 invoice. Please upgrade to create more.");
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary-text">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <DashboardHeader
          company={company}
          userPlan={userPlan}
          canCreateInvoice={canCreateInvoice()}
          onCreateInvoice={handleCreateInvoice}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          formatDate={formatDate}
        />

        <StatsGrid stats={stats} formatCurrency={formatCurrency} />

        <QuickActions companyId={company.id} />

        <PlanLimitations userPlan={userPlan} invoicesLength={invoices.length} />

        <InvoicesTable
          invoices={invoices}
          canCreateInvoice={canCreateInvoice()}
          onCreateInvoice={handleCreateInvoice}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />

        <RecentActivity
          company={company}
          invoices={invoices}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </div>

      <CreateInvoiceModal
        isOpen={isCreateInvoiceModalOpen}
        onClose={() => setIsCreateInvoiceModalOpen(false)}
        userPlan={userPlan}
        invoicesLength={invoices.length}
        onCreateInvoice={(invoice) => {
          setInvoices([...invoices, invoice]);
          setStats((prev) => ({
            ...prev,
            totalInvoices: prev.totalInvoices + 1,
          }));
        }}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        company={company}
        formatDate={formatDate}
        invoicesLength={invoices.length}
      />
    </div>
  );
}
