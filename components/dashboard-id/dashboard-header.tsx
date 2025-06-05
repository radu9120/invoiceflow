import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Building, Settings, Crown, PlusIcon } from "lucide-react";
import { Company } from "@/types";
import PlanBadge from "./plan-badge";
import CustomModal from "../ModalsForms/CustomModal";
import InvoiceForm from "../Invoices/InvoiceForm";

interface DashboardHeaderProps {
  company: Company;
  userPlan: "free" | "pro" | "enterprise";
  canCreateInvoice: boolean;
  onCreateInvoice: () => void;
  onOpenSettings: () => void;
  formatDate: (dateString: string) => string;
}

export default function DashboardHeader({
  company,
  userPlan,
  canCreateInvoice,
  onCreateInvoice,
  onOpenSettings,
  formatDate,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-primary hover:text-primary-dark mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Companies
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <Building className="h-8 w-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-header-text">
                {company.name}
              </h1>
              <PlanBadge plan={userPlan} />
            </div>
            <p className="text-secondary-text">
              {company.email} • Created {formatDate(company.created_at)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CustomModal heading={"Invoice"} description={"Create invoice"} openBtnLabel={"Create Invoice"} btnVariant={"primary"} btnIcon={PlusIcon}>
            <InvoiceForm company_data={
              {
                address: company.address,
                email: company.email,
                name: company.name,
                logo: company.logo,
                phone: company.phone,
                vat: company.vat,
              }
            }>
              
            </InvoiceForm>
          </CustomModal>
          {/* <Button
            onClick={onCreateInvoice}
            disabled={!canCreateInvoice}
            className={`${
              canCreateInvoice
                ? "bg-gradient-to-r from-primary to-accent text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button> */}
          <Button
            onClick={onOpenSettings}
            variant="outline"
            className="border-blue-200"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          {userPlan === "free" && (
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
