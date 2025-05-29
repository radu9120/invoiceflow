import Bounded from "@/components/ui/bounded"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const NewInvoice = async() => {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')

    return(
        <main>
            <Bounded>
                <article>
                    <h1>Invoice Generator</h1>
                </article>
            </Bounded>
        </main>
    )
}

export default NewInvoice;