import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";

interface HeaderDashboardProps {
  canCreateCompany: boolean;
  onCreateCompany: () => void;
}

export default function HeaderDashboard({
  canCreateCompany,
  onCreateCompany,
}: HeaderDashboardProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-header-text mb-2">
            Your Companies
          </h1>
          <p className="text-secondary-text">
            Select a company to manage invoices, clients, and view analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!canCreateCompany && (
            <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Limit reached</span>
            </div>
          )}
          <Button
            onClick={onCreateCompany}
            disabled={!canCreateCompany}
            className={`${
              canCreateCompany
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
  );
}
