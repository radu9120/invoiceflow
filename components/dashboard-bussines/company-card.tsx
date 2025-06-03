import {
  Building,
  FileText,
  Users,
  DollarSign,
  ArrowRight,
  Settings,
  Eye,
  CheckCircle,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Company } from "@/types";

interface CompanyCardProps {
  company: Company;
  isJustCreated: boolean;
  onSelect: () => void;
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

export default function CompanyCard({
  company,
  isJustCreated,
  onSelect,
}: CompanyCardProps) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border transition-all cursor-pointer group ${
        isJustCreated
          ? "border-green-300 bg-green-50/50 shadow-green-200"
          : "border-blue-100 hover:shadow-xl"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isJustCreated
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
              {isJustCreated && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>
            {/* {getPlanBadge(company)} */}
          </div>
        </div>
        <ArrowRight
          className={`h-5 w-5 transition-colors ${
            isJustCreated
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
            {/* {company.invoices} */}
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
            {/* {company.clients} */}
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
            {/* {company.revenue} */}
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
              onSelect();
            }}
            className="hover:bg-blue-100"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isJustCreated && (
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
  );
}
