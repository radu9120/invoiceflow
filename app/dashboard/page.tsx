"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Building,
  Users,
  FileText,
  DollarSign,
  Crown,
  Settings,
  Eye,
  Loader2,
  ArrowRight,
  X,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { BussinesForm } from "@/components/busineses/business-form";
import { getUserBusinesses } from "@/lib/actions/business.actions";

// TypeScript Types
interface Company {
  id: string;
  name: string;
  plan: "free" | "pro" | "enterprise";
  invoices: number;
  clients: number;
  revenue: string;
  status: "active" | "inactive";
  created_at: string;
  email: string;
  address: string;
  phone?: string;
  vat?: number;
  logo?: string;
  author: string;
}

const Dashboard = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [isNewCompanyModalOpen, setIsNewCompanyModalOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPlan, setUserPlan] = useState<"free" | "pro" | "enterprise">(
    "free"
  );
  const [justCreated, setJustCreated] = useState<string | null>(null);

  // Authentication check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Load user's companies from Supabase
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      loadCompanies();
    }
  }, [isLoaded, isSignedIn]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const businessData = await getUserBusinesses();

      // Transform Supabase data to match your Company interface
      const transformedCompanies: Company[] = businessData.map(
        (business: any) => ({
          id: business.id,
          name: business.name,
          plan: "free", // You might want to add this field to your Supabase table
          invoices: 0, // You'll calculate this later when you add invoices
          clients: 0, // You'll calculate this later when you add clients
          revenue: "$0", // You'll calculate this later from paid invoices
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
    } catch (error) {
      console.error("Error loading companies:", error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth or loading data
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

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "free":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Free
          </span>
        );
      case "pro":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            <Crown className="h-3 w-3 mr-1" />
            Pro
          </span>
        );
      case "enterprise":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            <Crown className="h-3 w-3 mr-1" />
            Enterprise
          </span>
        );
      default:
        return null;
    }
  };

  const canCreateCompany = () => {
    if (userPlan === "free") {
      return companies.length < 1; // Free plan: max 1 company
    }
    return true; // Pro/Enterprise: unlimited
  };

  const selectCompany = (companyId: string) => {
    router.push(`/dashboard/${companyId}`);
  };

  const getCompanyLimitText = () => {
    if (userPlan === "free") {
      return `${companies.length}/1`;
    }
    return `${companies.length}/∞`;
  };

  const handleCompanyCreated = async (newBusiness: any) => {
    // Reload companies from Supabase to get the latest data
    await loadCompanies();

    // Close modal
    setIsNewCompanyModalOpen(false);

    // Set just created flag
    setJustCreated(newBusiness.id);

    // Clear the flag after 5 seconds
    setTimeout(() => {
      setJustCreated(null);
    }, 5000);
  };

  const handleModalClose = () => {
    setIsNewCompanyModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-header-text mb-2">
                Your Companies
              </h1>
              <p className="text-secondary-text">
                Select a company to manage invoices, clients, and view
                analytics.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!canCreateCompany() && (
                <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Limit reached</span>
                </div>
              )}
              <Button
                onClick={() => setIsNewCompanyModalOpen(true)}
                disabled={!canCreateCompany()}
                className={`${
                  canCreateCompany()
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Company
              </Button>
            </div>
          </div>
        </div>

        {/* Success Message for New Company */}
        {justCreated && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-medium text-green-800">
                  Company Created Successfully!
                </h4>
                <p className="text-sm text-green-700">
                  Your new company has been created. Click on it below to start
                  managing invoices and clients.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Companies Grid */}
        {companies.length === 0 ? (
          <div className="text-center py-16">
            <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-header-text mb-2">
              No Companies Yet
            </h2>
            <p className="text-secondary-text mb-6">
              Create your first company to start managing invoices and clients.
            </p>
            <Button
              onClick={() => setIsNewCompanyModalOpen(true)}
              className="bg-gradient-to-r from-primary to-accent text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Company
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company.id}
                className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border transition-all cursor-pointer group ${
                  justCreated === company.id
                    ? "border-green-300 bg-green-50/50 shadow-green-200"
                    : "border-blue-100 hover:shadow-xl"
                }`}
                onClick={() => selectCompany(company.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        justCreated === company.id
                          ? "bg-gradient-to-br from-green-500 to-green-600"
                          : "bg-gradient-to-br from-primary to-accent"
                      }`}
                    >
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-header-text text-lg">
                          {company.name}
                        </h3>
                        {justCreated === company.id && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      {getPlanBadge(company.plan)}
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-5 w-5 transition-colors ${
                      justCreated === company.id
                        ? "text-green-600"
                        : "text-secondary-text group-hover:text-primary"
                    }`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-secondary-text">
                      Invoices
                    </span>
                    <div className="text-lg font-bold text-header-text">
                      {company.invoices}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-secondary-text">
                      Clients
                    </span>
                    <div className="text-lg font-bold text-header-text">
                      {company.clients}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-secondary-text">
                      Revenue
                    </span>
                    <div className="text-lg font-bold text-green-600">
                      {company.revenue}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                  <span className="text-sm text-secondary-text">
                    Created {new Date(company.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add edit company logic here
                      }}
                      className="hover:bg-blue-100"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectCompany(company.id);
                      }}
                      className="hover:bg-blue-100"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* "Just Created" Badge */}
                {justCreated === company.id && (
                  <div className="mt-4 bg-green-100 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">
                        🎉 Just created! Click to get started
                      </span>
                      <ArrowRight className="h-4 w-4 text-green-600 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Plan Limitations */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Crown className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-800 mb-2">
                {userPlan === "free"
                  ? "Free Plan Limitations"
                  : `${
                      userPlan.charAt(0).toUpperCase() + userPlan.slice(1)
                    } Plan`}
              </h3>
              <p className="text-yellow-700 mb-4">
                {userPlan === "free"
                  ? "Free plan allows 1 company with up to 1 invoice. Upgrade to Pro for unlimited companies and invoices."
                  : "You have unlimited access to all features."}
              </p>
              <div className="flex items-center gap-6 mb-4">
                <div className="text-sm">
                  <span className="font-medium">Companies: </span>
                  <span
                    className={
                      userPlan === "free" && companies.length >= 1
                        ? "text-red-600 font-semibold"
                        : ""
                    }
                  >
                    {getCompanyLimitText()}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Total Invoices: </span>
                  <span>
                    {companies.reduce((sum, c) => sum + c.invoices, 0)}
                    {userPlan === "free" ? "/1" : ""}
                  </span>
                </div>
              </div>
              {userPlan === "free" && (
                <Button className="bg-gradient-to-r from-primary to-accent text-white">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Company Modal */}
      {isNewCompanyModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl p-6 w-full">
            <div className="flex items-center justify-between p-6 border-b border-blue-100">
              <div>
                <h2 className="text-xl font-bold text-header-text">
                  Create New Company
                </h2>
                <p className="text-secondary-text text-sm">
                  Add a new company to manage separately
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleModalClose}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <BussinesForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
