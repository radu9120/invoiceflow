import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { getDashboardStats } from "@/lib/actions/business.actions";
import { DashboardBusinessStats } from "@/types";
import Bounded from "@/components/ui/bounded";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import BusinessGrid from "@/components/Dashboard/BusinessGrid";
import BusinessAvailabilty from "@/components/Dashboard/BusinessAvailability";

export default async function Page() {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')

    let dashboardData: DashboardBusinessStats[] = []

    try {
        dashboardData = await getDashboardStats();
    } catch (error) {
        console.error("Error loading businesses:", error);
        return notFound();
    }

    return(
        <main>
            <Bounded>
                <DashboardHeader userPlan={"free"} totalBusinesses={dashboardData.length}/>
                <BusinessGrid dashboardData={dashboardData}/>
                <BusinessAvailabilty userPlan={"free"} companiesLengh={dashboardData.length} totalInvoices={dashboardData.reduce((acc, item) => acc + Number(item.totalinvoices), 0)}/>
            </Bounded>
        </main>
    )
}
