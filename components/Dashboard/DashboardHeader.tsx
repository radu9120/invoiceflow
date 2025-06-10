'use client'
import { AlertTriangle, PlusIcon } from "lucide-react";
import CustomModal from "../ModalsForms/CustomModal";
import { BussinesForm } from "../Business/business-form";

export default function DashboardHeader({userPlan, totalBusinesses}:{userPlan: string; totalBusinesses: number}) {
    const limitReach = true
    return (
        <div className="flex items-center gap-6 justify-between">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-header-text mb-2">
                    Your Companies
                </h1>
                <p className="text-secondary-text">
                    Select a company to manage invoices, clients, and view analytics.
                </p>
            </div>
            <div className="flex items-center gap-3">
                {limitReach && (
                    <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">Limit reached</span>
                    </div>
                )}
                <CustomModal
                    heading={"Create new company"} 
                    description={" New Company"} 
                    openBtnLabel={"New Company"} 
                    btnVariant={"primary"} 
                    btnIcon={PlusIcon}
                    disabled={limitReach}
                    >
                    <BussinesForm/>
                </CustomModal>
            </div>
        </div>
    )
}
