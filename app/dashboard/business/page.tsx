import BusinessBashboard from '@/components/Business/BusinessBashboard'
import Bounded from '@/components/ui/bounded'
import { getBusiness } from '@/lib/actions/business.actions'
import { BusinessDashboardPageProps, BusinessParams } from '@/types'
import { auth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"
import { getBusinessStats } from '../../../lib/actions/business.actions';
import { getInvoicesList } from '@/lib/actions/invoice.actions'
import BusinessStats from '@/components/Business/BusinessStats'


export default async function Page({ searchParams } : {searchParams : Promise<BusinessParams>}) {
    const { userId } = await auth()
        if (!userId) redirect('/sign-in')

    
    const userPlan = 'free'
    const filter = await searchParams;

    const business_id = filter.business_id
    const name = filter.name

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
        invoices = await getInvoicesList({business_id: Number(business_id)})
    } catch (err) {
        console.error("Error fetching invoices:", err);
        return notFound();
    }

    return (
        <main>
            <Bounded>
                <BusinessBashboard business={business} userPlan={userPlan}/>
                <BusinessStats statistic={businessStats}/>
            </Bounded>
        </main>
    )
}
