"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Company } from "@/types";
import HeaderDashboard from "./bussines-header";
import SuccessMessage from "./success-message";
import CompaniesGrid from "./companies-grid";
import PlanLimitations from "./plan-limitation";
import CreateCompanyModal from "./company-modal";

interface DashboardClientProps {
  initialBusinesses: any[];
}

export default function DashboardClient({
  initialBusinesses,
}: DashboardClientProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPlan] = useState<"free" | "pro" | "enterprise">("free");
  const [justCreated, setJustCreated] = useState<string | null>(null);
  const [isNewCompanyModalOpen, setIsNewCompanyModalOpen] = useState(false);

  // Authentication check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Transform initial data
  useEffect(() => {
    if (initialBusinesses) {
      const transformedCompanies: Company[] = initialBusinesses.map(
        (business: any) => ({
          id: business.id,
          name: business.name,
          plan: "free",
          invoices: 0,
          clients: 0,
          revenue: "$0",
          status: business.status || "active",
          created_at: business.created_at,
          email: business.email,
          address: business.address,
          phone: business.phone,
          vat: business.vat,
          logo: business.logo,
          author: business.author,
        })
      );
      setCompanies(transformedCompanies);
      setLoading(false);
    }
  }, [initialBusinesses]);

  if (!isLoaded || !isSignedIn || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
          <p className="text-secondary-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const canCreateCompany = () => {
    if (userPlan === "free") {
      return companies.length < 1;
    }
    return true;
  };

  const handleCompanyCreated = (newBusiness: any) => {
    const newCompany: Company = {
      id: newBusiness.id,
      name: newBusiness.name,


      created_at: newBusiness.created_at,
      email: newBusiness.email,
      address: newBusiness.address,
      phone: newBusiness.phone,
      vat: newBusiness.vat,
      logo: newBusiness.logo,
      author: newBusiness.author,
    };

    setCompanies([...companies, newCompany]);
    setIsNewCompanyModalOpen(false);
    setJustCreated(newBusiness.id);

    setTimeout(() => {
      setJustCreated(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <HeaderDashboard
          canCreateCompany={canCreateCompany()}
          onCreateCompany={() => setIsNewCompanyModalOpen(true)}
        />

        <SuccessMessage
          justCreated={justCreated}
          onDismiss={() => setJustCreated(null)}
        />

        <CompaniesGrid
          companies={companies}
          justCreated={justCreated}
          onSelectCompany={(id, name) => router.push(`/dashboard/business?business_id=${id}&name=${name}`)}
        />

        <PlanLimitations userPlan={userPlan} companies={companies} />
      </div>

      <CreateCompanyModal
        isOpen={isNewCompanyModalOpen}
        onClose={() => setIsNewCompanyModalOpen(false)}
        onCompanyCreated={handleCompanyCreated}
      />
    </div>
  );
}
