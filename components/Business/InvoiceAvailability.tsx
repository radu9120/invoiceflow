"use client"; // Add this if you're using router or other client-side hooks

import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter

interface PlanLimitationsProps {
  userPlan: "free" | "pro" | "enterprise";
  invoicesLength: number;
  companiesLength: number; // Add companiesLength prop
}

// Define limits for the free plan
const FREE_PLAN_INVOICE_LIMIT = 1;
const FREE_PLAN_COMPANY_LIMIT = 1;

export default function InvoiceAvailability({
  userPlan,
  invoicesLength,
  companiesLength, // Destructure companiesLength
}: PlanLimitationsProps) {
  const router = useRouter(); // Initialize router

  // This component is only for users on the "free" plan
  if (userPlan !== "free") {
    return null;
  }

  const hasReachedInvoiceLimit = invoicesLength >= FREE_PLAN_INVOICE_LIMIT;
  const hasReachedCompanyLimit = companiesLength >= FREE_PLAN_COMPANY_LIMIT;

  const handleUpgradeClick = () => {
    router.push("/pricing"); // Navigate to your pricing page
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Crown className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800 mb-1">
            Free Plan Limitations Reached
          </h3>
          <p className="text-sm text-yellow-700 mb-4">
            You're currently on the Free plan. Upgrade to unlock unlimited
            invoices and manage more companies.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mb-4 text-sm">
            <div>
              <span className="font-medium text-yellow-700">Invoices: </span>
              <span
                className={
                  hasReachedInvoiceLimit
                    ? "text-red-600 font-semibold"
                    : "text-yellow-700"
                }
              >
                {invoicesLength}/{FREE_PLAN_INVOICE_LIMIT}
              </span>
            </div>
            <div>
              <span className="font-medium text-yellow-700">Companies: </span>
              <span
                className={
                  hasReachedCompanyLimit
                    ? "text-red-600 font-semibold"
                    : "text-yellow-700"
                }
              >
                {companiesLength}/{FREE_PLAN_COMPANY_LIMIT}
              </span>
            </div>
            <div>
              <span className="font-medium text-yellow-700">Clients: </span>
              <span className="text-yellow-700">Unlimited</span>
            </div>
          </div>
          <Button
            onClick={handleUpgradeClick} // Add onClick handler
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Crown className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
