import InvoiceForm from "@/components/Invoices/InvoiceForm"
import Bounded from "@/components/ui/bounded"
import { getBusinessById } from "@/lib/actions/business.actions"
import { getClient, getClients } from "@/lib/actions/client.actions"
import { ClientType, NewInvoicePageProps } from "@/types"
import { auth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"




export default async function NewInvoice ({ searchParams }: NewInvoicePageProps) {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')

    const businessId = searchParams.business_id
    // const clientId = searchParams.client_id
    
    if (!businessId) return notFound()

    const business = await getBusinessById(businessId)
    if (!business) return notFound()

    // const client = clientId ? await getClient({client_id: Number(clientId)}) : null

    const clients: ClientType[] = await getClients({business_id: Number(businessId)})

    return(
        <main className="relative w-full min-h-[100vh]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-white z-0"/>
            <div className="absolute top-20 right-10 md:right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-blue-100/40 mix-blend-multiply blur-3xl"></div>
            <div className="absolute bottom-20 left-10 md:left-40 w-48 md:w-72 h-48 md:h-72 rounded-full bg-cyan-100/30 mix-blend-multiply blur-3xl"></div>
            <Bounded className="relative w-full z-10">
                <h1 className="text-5xl text-center">Invoice Generator</h1>
                <article className="bg-white rounded-xl mx-auto shadow-2xl max-w-4xl w-full p-6">                    
                    <InvoiceForm company_data={business} clients={clients}/>
                </article>
            </Bounded>
            
        </main>
    )
}
