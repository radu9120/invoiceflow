import { Building, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Company } from "@/types";
import CompanyCard from "./company-card";

interface CompaniesGridProps {
  companies: Company[];
  justCreated: string | null;
  onSelectCompany: (id: string, name: string) => void;
}

export default function CompaniesGrid({
  companies,
  justCreated,
  onSelectCompany,
}: CompaniesGridProps) {
  if (companies.length === 0) {
    return (
      <div className="text-center py-16">
        <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-header-text mb-2">
          No Companies Yet
        </h2>
        <p className="text-secondary-text mb-6">
          Create your first company to start managing invoices and clients.
        </p>
        {/* <Button
          onClick={() => onSelectCompany("new")}
          className="bg-gradient-to-r from-primary to-accent text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Your First Company
        </Button> */}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          isJustCreated={justCreated === company.id}
          onSelect={() => onSelectCompany(company.id, company.name)}
        />
      ))}
    </div>
  );
}
