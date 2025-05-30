import InvoiceForm from "@/components/InvoiceForm"
import Bounded from "@/components/ui/bounded"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const NewInvoice = async() => {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')

    return(
        <main className="relative w-full min-h-[100vh]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-white z-0"/>
            <div className="absolute top-20 right-10 md:right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-blue-100/40 mix-blend-multiply blur-3xl"></div>
            <div className="absolute bottom-20 left-10 md:left-40 w-48 md:w-72 h-48 md:h-72 rounded-full bg-cyan-100/30 mix-blend-multiply blur-3xl"></div>
            <Bounded className="relative z-10">
                <h1 className="text-5xl text-center">Invoice Generator</h1>
                <article>                    
                    <InvoiceForm/>
                </article>
            </Bounded>
            
        </main>
    )
}

export default NewInvoice;