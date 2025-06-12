"use client";
import { DashboardBusinessStats } from "@/types";
import { Building, PlusIcon } from "lucide-react";
import BusinessCard from "./BusinessCard";
import CustomModal from "../ModalsForms/CustomModal"; // Ensure this path is correct
import { CreateBusiness } from "../Business/Forms/CreateBusiness";
import { useRouter } from "next/navigation";

export default function BusinessGrid({
  dashboardData,
}: {
  dashboardData: DashboardBusinessStats[];
}) {
  const router = useRouter();

  const handleBusinessCreated = () => {
    router.refresh();
  };

  if (dashboardData.length === 0) {
    return (
      <div className="text-center py-16">
        <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-header-text mb-2">
          No Companies Yet
        </h2>
        <p className="text-secondary-text mb-6">
          Create your first company to start managing invoices and clients.
        </p>
        <div className="flex justify-center">
          <CustomModal
            heading={"Create Your First Company"}
            description={"Set up your business profile to get started."}
            openBtnLabel={"Create Your First Company"}
            btnVariant={"primary"}
            btnIcon={PlusIcon}
          >
            <CreateBusiness />
          </CustomModal>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardData.map((company) => (
        <BusinessCard key={company.id} company={company} />
      ))}
      {/* You might want to add an "+ Add New Company" card here as well,
          if the user's plan allows creating more companies and totalBusinesses > 0.
          This would be similar to the CustomModal setup in DashboardHeader.
          For now, this example assumes DashboardHeader handles adding subsequent companies.
      */}
    </div>
  );
}
