"use client";
import { AlertTriangle, PlusIcon, Crown } from "lucide-react";
import CustomModal from "../ModalsForms/CustomModal"; // Ensure this path is correct
import { CreateBusiness } from "../Business/Forms/CreateBusiness";

export default function DashboardHeader({
  userPlan,
  totalBusinesses,
}: {
  userPlan: string;
  totalBusinesses: number;
}) {
  const isFreePlan = userPlan === "free";
  // Define paid plans based on your Clerk plan identifiers.
  // For simplicity, assuming any plan not 'free' is a paid plan.
  const isPaidPlan = !isFreePlan;

  const freePlanCompanyLimit = 1; // Your defined limit for the free plan

  // True if on free plan and at or over the limit
  const hasReachedFreeLimit =
    isFreePlan && totalBusinesses >= freePlanCompanyLimit;
  // True if on free plan and under the limit
  const canCreateOnFreePlan =
    isFreePlan && totalBusinesses < freePlanCompanyLimit;

  // Determine if the "New Company" button should be shown in the header:
  // - User is on a paid plan (implying they can create more)
  // - OR User is on a free plan and hasn't reached their limit
  // AND - There is at least one business already (BusinessGrid handles the "Create First" prompt)
  const showNewCompanyButtonInHeader =
    (isPaidPlan || canCreateOnFreePlan) && totalBusinesses > 0;

  // Determine if the "Limit Reached" warning and "Upgrade" button should be shown
  const showUpgradeElements = hasReachedFreeLimit;

  const handleBusinessCreated = () => {
    // Refresh will be handled by the modal closing and re-rendering
    window.location.reload();
  };

  const handleUpgradeClick = () => {
    window.location.href = "/pricing";
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 justify-between py-4 mb-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-header-text mb-1 sm:mb-2">
          Your Companies
        </h1>
        <p className="text-secondary-text">
          {totalBusinesses === 0
            ? "Get started by creating your first company."
            : "Select a company to manage invoices, clients, and view analytics."}
        </p>
      </div>

      {/* Action buttons container: only show if there are existing businesses OR if on a paid plan (which might allow creating from zero via header) */}
      {(totalBusinesses > 0 || isPaidPlan) && (
        <div className="flex items-center gap-3 mt-3 sm:mt-0 flex-wrap">
          {showUpgradeElements && (
            <>
              <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium">
                  Free plan limit reached
                </span>
              </div>
              <button
                onClick={handleUpgradeClick}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-lg hover:from-primary/90 hover:to-accent/90 transition-all whitespace-nowrap text-sm font-medium"
              >
                <Crown className="h-4 w-4" />
                <span>Upgrade Plan</span>
              </button>
            </>
          )}

          {/* Show "New Company" button if conditions are met and upgrade elements are not shown (upgrade takes precedence) */}
          {showNewCompanyButtonInHeader && !showUpgradeElements && (
            <CustomModal
              heading={"Create new company"}
              description={"Add another business profile to your account."}
              openBtnLabel={"New Company"}
              btnVariant={"primary"}
              btnIcon={PlusIcon}
            >
              <CreateBusiness />
            </CustomModal>
          )}
        </div>
      )}
    </div>
  );
}
