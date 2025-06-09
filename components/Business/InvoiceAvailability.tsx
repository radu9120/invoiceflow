import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface PlanLimitationsProps {
  userPlan: "free" | "pro" | "enterprise";
  invoicesLength: number;
}

export default function InvoiceAvailability({
  userPlan,
  invoicesLength,
}: PlanLimitationsProps) {
  if (userPlan !== "free") return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Crown className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800 mb-2">
            Free Plan Limitations
          </h3>
          <p className="text-yellow-700 mb-4">
            You're currently on the Free plan. You can create up to 1 invoice
            and manage 1 company.
          </p>
          <div className="flex items-center gap-6 mb-4">
            <div className="text-sm">
              <span className="font-medium">Invoices: </span>
              <span
                className={
                  invoicesLength >= 1 ? "text-red-600 font-semibold" : ""
                }
              >
                {invoicesLength}/1
              </span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Clients: </span>
              <span>Unlimited</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Companies: </span>
              <span>1/1</span>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent text-white">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Pro - Unlimited Invoices
          </Button>
        </div>
      </div>
    </div>
  );
}
