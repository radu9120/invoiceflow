import { Button } from "@/components/ui/button";
import { Company } from "@/types";
import { Crown } from "lucide-react";

interface PlanLimitationsProps {
  userPlan: "free" | "pro" | "enterprise";
  companies: Company[];
}

export default function PlanLimitations({
  userPlan,
  companies,
}: PlanLimitationsProps) {
  const getCompanyLimitText = () => {
    if (userPlan === "free") {
      return `${companies.length}/1`;
    }
    return `${companies.length}/∞`;
  };

  return (
    <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Crown className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800 mb-2">
            {userPlan === "free"
              ? "Free Plan Limitations"
              : `${userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan`}
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
                {/* {companies.reduce((sum, c) => sum + c.invoices, 0)} */}
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
  );
}
