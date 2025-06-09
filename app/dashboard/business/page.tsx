import BusinessBashboard from '@/components/Business/BusinessBashboard'
import Bounded from '@/components/ui/bounded'
import { getBusiness } from '@/lib/actions/business.actions'
import { BusinessDashboardPageProps, UserActivityLog } from '@/types'
import { auth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"
import { getBusinessStats } from '../../../lib/actions/business.actions';
import { getInvoicesList } from '@/lib/actions/invoice.actions'
import BusinessStats from '@/components/Business/BusinessStats'
import QuickActions from '@/components/Business/QuickActions'
import InvoiceTable from '@/components/Business/InvoiceTable'
import RecentActivity from '@/components/Business/RecentActivity'
import { getRecentBusinessActivity } from '@/lib/actions/userActivity.actions'



export default async function Page({ searchParams } : {searchParams : Promise<BusinessDashboardPageProps>}) {
    const { userId } = await auth()
        if (!userId) redirect('/sign-in')

    
    const userPlan = 'free'
    const searchVars = await searchParams;
    const { business_id, name, page = "1", searchTerm = "", filter = "" } = await searchVars;

    // const business_id = searchVars.business_id
    // const name = searchVars.name

    console.log('business_id', business_id)
    console.log(name)
    if (!business_id || !name) return notFound()

    let business;
    try {
        business = await getBusiness({business_id: Number(business_id)});
    } catch (err) {
        console.error("Error fetching business:", err);
        return notFound();
    }
    
    if (business.name.toLowerCase().replace(/\s+/g, "%") !== name.toLowerCase().replace(/\s+/g, "%")) return notFound();

    let businessStats;
    try {
        businessStats = await getBusinessStats({ business_id: Number(business_id) });
    } catch (err) {
        console.error("Error fetching stats:", err);
        return notFound();
    }

    let invoices;

    try {
        invoices = await getInvoicesList({
            business_id: Number(business_id),
            page: Number(page),
            searchTerm,
            filter,
        })
    } catch (err) {
        console.error("Error fetching invoices:", err);
        return notFound();
    }

    let recentActivities: UserActivityLog[] = [];

    try {
        recentActivities = await getRecentBusinessActivity({ business_id: business_id });
    } catch (error) {
        console.error("Failed to load activity log:", error);
        // return notFound();
    }


    return (
        <main>
            <Bounded>
                <BusinessBashboard business={business} userPlan={userPlan}/>
                <BusinessStats statistic={businessStats}/>
                <QuickActions companyId={business_id} />
                <InvoiceTable invoices={invoices} business_id={business_id}/>
                {recentActivities.length > 0 && (
                    <RecentActivity recentActivities={recentActivities}/>
                )}                
            </Bounded>
        </main>
    )
}
