import Link from "next/link";
import { Users, TrendingUp } from "lucide-react";

interface QuickActionsProps {
  companyId: string;
}

export default function QuickActions({ companyId }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Link href={`/dashboard/${companyId}/clients`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-header-text">Manage Clients</h3>
              <p className="text-sm text-secondary-text">
                View and edit client information
              </p>
            </div>
          </div>
        </div>
      </Link>

      <Link href={`/dashboard/${companyId}/analytics`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-header-text">View Analytics</h3>
              <p className="text-sm text-secondary-text">
                Track revenue and business insights
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
